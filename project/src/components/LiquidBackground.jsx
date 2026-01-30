import { useEffect, useRef, useState } from 'react';

const LiquidBackground = () => {
  const canvasRef = useRef(null);
  const [filterDeviation, setFilterDeviation] = useState(40);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let particles = [];
    const mouse = { x: -1000, y: -1000 };
    let isMobile = false;

    // Mobile resolution scale factor
    let dpr = 1;

    const init = () => {
      isMobile = window.innerWidth < 768;
      
      // OPTIMIZATION: Downscale canvas on mobile
      dpr = isMobile ? 0.5 : 1; 
      setFilterDeviation(isMobile ? 20 : 40); 

      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      
      // Reset & Scale
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      particles = [];

      if (isMobile) {
        // MOBILE: 3 Fixed Morphing Blobs with Parallax
        // Simple parallax adds depth without heavy physics calculations
        
        // Blob 1: Top Right
        particles.push({
            x: window.innerWidth * 0.8,
            y: window.innerHeight * 0.2,
            initialY: window.innerHeight * 0.2, // Remember start pos for parallax
            color: "rgba(6, 182, 212, 0.6)", // Cyan
            size: 130,
            phase: 0,
            parallaxSpeed: 0.1 // Slow movement
        });
        
        // Blob 2: Middle Left
        particles.push({
            x: window.innerWidth * 0.1,
            y: window.innerHeight * 0.5,
            initialY: window.innerHeight * 0.5,
            color: "rgba(59, 130, 246, 0.6)", // Blue
            size: 140, 
            phase: Math.PI / 2,
            parallaxSpeed: 0.15 // Slightly faster
        });

        // Blob 3: Bottom center-ish
        particles.push({
            x: window.innerWidth * 0.6,
            y: window.innerHeight * 0.85,
            initialY: window.innerHeight * 0.85,
            color: "rgba(45, 212, 191, 0.6)", // Teal
            size: 120,
            phase: Math.PI,
            parallaxSpeed: 0.08 // Slowest
        });

      } else {
          // DESKTOP: 12 Floating Physics Particles
          const particleCount = 12; 
          for (let i = 0; i < particleCount; i++) {
            particles.push({
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              vx: (Math.random() - 0.5) * 1.5,
              vy: (Math.random() - 0.5) * 1.5,
              size: Math.random() * 150 + 100,
              color: `hsla(${Math.random() * 60 + 180}, 80%, 75%, 0.8)` 
            });
          }
      }
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    // Add touch support for mobile interaction (Optional here as we removed physics, but good for cursor)
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const update = () => {
        // Shared Clean
        ctx.clearRect(0, 0, width / dpr, height / dpr);

        if (isMobile) {
             // MOBILE RENDER MODE: Fixed Blobs, Morphing + Parallax
             const t = Date.now() * 0.001; 
             const scrollY = window.scrollY;

             particles.forEach((p, i) => {
                 // Apply Simple Parallax
                 // Blobs move up slightly as you scroll down
                 p.y = p.initialY - (scrollY * p.parallaxSpeed);

                 ctx.beginPath();
                 const segments = 20; // Low poly for speed
                 const step = (Math.PI * 2) / segments;
                 
                 for (let angle = 0; angle <= Math.PI * 2; angle += step) {
                     // Simple harmonic wobble
                     const wobble = Math.sin(angle * 3 + t + p.phase) * 10 
                                  + Math.cos(angle * 2 - t) * 8;
                     
                     const r = p.size + wobble;
                     const x = p.x + Math.cos(angle) * r;
                     const y = p.y + Math.sin(angle) * r;
                     
                     if (angle === 0) ctx.moveTo(x, y);
                     else ctx.lineTo(x, y);
                 }
                 ctx.closePath();
                 ctx.fillStyle = p.color;
                 ctx.fill();
             });

        } else {
            // DESKTOP RENDER MODE: Full Physics
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - (window.lastScrollY || currentScrollY);
            window.lastScrollY = currentScrollY;

            particles.forEach((p) => {
                // Scroll Interaction
                if (Math.abs(scrollDelta) > 0) {
                    p.vy -= scrollDelta * 0.01; 
                    p.vx += (Math.random() - 0.5) * Math.abs(scrollDelta) * 0.005;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < -p.size) p.x = window.innerWidth + p.size;
                if (p.x > window.innerWidth + p.size) p.x = -p.size;
                if (p.y < -p.size) p.y = window.innerHeight + p.size;
                if (p.y > window.innerHeight + p.size) p.y = -p.size;

                // Mouse
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 400) {
                    const angle = Math.atan2(dy, dx);
                    p.vx += Math.cos(angle) * 0.05; 
                    p.vy += Math.sin(angle) * 0.05;
                }
                
                // Friction
                p.vx *= 0.98;
                p.vy *= 0.98;
                if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.5;
                if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.5;

                ctx.beginPath();
                ctx.fillStyle = p.color; 
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Desktop Cursor
            const t = Date.now() * 0.0015; 
            ctx.beginPath();
            const baseRadius = 80;
            for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
                const h1 = Math.sin(angle * 2 + t) * 10;
                const h2 = Math.cos(angle * 3 - t * 0.8) * 8;
                const h3 = Math.sin(angle * 5 + t * 1.5) * 4;
                const r = baseRadius + h1 + h2 + h3;
                const x = mouse.x + Math.cos(angle) * r;
                const y = mouse.y + Math.sin(angle) * r;
                if (angle === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = "rgba(6, 182, 212, 0.8)"; 
            ctx.fill();
        }

        animationFrameId = requestAnimationFrame(update);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    init();
    update();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* SVG Filter for the Gooey Liquid Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation={filterDeviation} result="blur" />
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
