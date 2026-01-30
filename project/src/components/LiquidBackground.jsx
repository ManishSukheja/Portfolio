import { useEffect, useRef } from 'react';

const LiquidBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let particles = [];
    const mouse = { x: -1000, y: -1000 };

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      particles = [];
      const particleCount = 15; 
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 150 + 100, // Much larger blobs
          // Soft pastel gradients for light theme liquid
          color: `hsla(${Math.random() * 60 + 180}, 80%, 75%, 0.8)` 
        });
      }
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const update = () => {
        // Clear with a slight trail effect or clean clear
        ctx.clearRect(0, 0, width, height);
        
        // We will draw particles and let the CSS/SVG filter handle the "goo" liquid effect
        
        // Scroll Interaction - Liquid Momentum
        const currentScrollY = window.scrollY;
        // Calculate speed of scroll
        const scrollDelta = currentScrollY - (window.lastScrollY || currentScrollY);
        window.lastScrollY = currentScrollY;

        // Mouse Follower Blob
        particles.forEach((p, i) => {
            // Apply Scroll Force (Liquid Drag)
            // When scrolling down, drag liquid up slightly (inertia)
            if (Math.abs(scrollDelta) > 0) {
                p.vy -= scrollDelta * 0.01; 
                // Add slight turbulence/wobble on fast scroll
                p.vx += (Math.random() - 0.5) * Math.abs(scrollDelta) * 0.005;
            }

            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Bounce
            if (p.x < -p.size) p.x = width + p.size;
            if (p.x > width + p.size) p.x = -p.size;
            if (p.y < -p.size) p.y = height + p.size;
            if (p.y > height + p.size) p.y = -p.size;

            // Interactive Flow - Mouse Attraction
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 400) {
                const angle = Math.atan2(dy, dx);
                // Gentle attraction
                p.vx += Math.cos(angle) * 0.05; 
                p.vy += Math.sin(angle) * 0.05;
            }

            // Speed limit and damping (friction)
            p.vx *= 0.98; // Slightly more friction for heavy liquid feel
            p.vy *= 0.98;
            
            // Keep them moving randomly if stopped
            if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.5;
            if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.5;

            ctx.beginPath();
            ctx.fillStyle = p.color; // Consistent color
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw Organic Wobbly Mouse Blob - Smoother & Slower for better merging
        const t = Date.now() * 0.0015; // Much slower for viscous feel
        ctx.beginPath();
        const baseRadius = 80;
        
        for (let angle = 0; angle <= Math.PI * 2; angle += 0.05) {
            
            // Harmonic 1: Oval distortion (Slow breathing)
            const h1 = Math.sin(angle * 2 + t) * 10;
            
            // Harmonic 2: Triangular wobble (Gentle rotation)
            // Reduced amplitude to prevent 'snapping' when merging
            const h2 = Math.cos(angle * 3 - t * 0.8) * 8;
            
            // Harmonic 3: Very subtle variation
            const h3 = Math.sin(angle * 5 + t * 1.5) * 4;

            // Combined radius with less extreme variance
            const r = baseRadius + h1 + h2 + h3;
            
            const x = mouse.x + Math.cos(angle) * r;
            const y = mouse.y + Math.sin(angle) * r;
            
            if (angle === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(6, 182, 212, 0.8)"; 
        ctx.fill();

        animationFrameId = requestAnimationFrame(update);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    init();
    update();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* SVG Filter for the Gooey Liquid Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
          <feColorMatrix 
            in="blur" 
            mode="matrix" 
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -9" 
            result="goo" 
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
      </svg>

      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-[#f0f9ff]"
        style={{ overflow: 'hidden' }}
      >
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ filter: 'url(#goo)', opacity: 0.8 }} 
        />
      </div>
    </>
  );
};

export default LiquidBackground;
