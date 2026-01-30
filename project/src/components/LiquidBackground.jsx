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
      
      const isMobile = width < 768;
      
      particles = [];
      // Reduce particle count significantly on mobile for performance
      const particleCount = isMobile ? 6 : 12; 
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: isMobile ? Math.random() * 80 + 60 : Math.random() * 150 + 100, // Smaller blobs on mobile
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
    
    // Add touch support for mobile interaction
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const update = () => {
        // ... (Existing Desktop Update Logic) ...
        ctx.clearRect(0, 0, width, height);

        // ... particle physics ...
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - (window.lastScrollY || currentScrollY);
        window.lastScrollY = currentScrollY;

        particles.forEach((p) => {
             // ... physics ...
             if (Math.abs(scrollDelta) > 0) {
                p.vy -= scrollDelta * 0.01;
                p.vx += (Math.random() - 0.5) * Math.abs(scrollDelta) * 0.005;
             }
             p.x += p.vx;
             p.y += p.vy;
             
             // Wrap around
             if (p.x < -p.size) p.x = width + p.size;
             if (p.x > width + p.size) p.x = -p.size;
             if (p.y < -p.size) p.y = height + p.size;
             if (p.y > height + p.size) p.y = -p.size;

             // Mouse attraction
             const dx = mouse.x - p.x;
             const dy = mouse.y - p.y;
             const dist = Math.sqrt(dx*dx + dy*dy);
             if (dist < 400) {
                const angle = Math.atan2(dy, dx);
                p.vx += Math.cos(angle) * 0.05;
                p.vy += Math.sin(angle) * 0.05;
             }
             
             p.vx *= 0.98;
             p.vy *= 0.98;
             
             // Keep moving
             if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.5;
             if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.5;

             ctx.beginPath();
             ctx.fillStyle = p.color;
             ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
             ctx.fill();
        });

        // Cursor Blob
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
            if (angle === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(6, 182, 212, 0.8)"; 
        ctx.fill();

        animationFrameId = requestAnimationFrame(update);
    };
    
    // Mobile Specific "Update on Scroll Only" function
    const updateMobile = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        const currentScrollY = window.scrollY;
        // Parallax effect: Shift particles based on scroll
        const scrollDelta = currentScrollY - (window.lastMobileScrollY || currentScrollY);
        window.lastMobileScrollY = currentScrollY;

        particles.forEach((p) => {
            // Simple Parallax Move (No physics loop)
            p.y -= scrollDelta * 0.2; 
            
            // Wrap around
            if (p.y < -p.size) p.y = height + p.size;
            if (p.y > height + p.size) p.y = -p.size;

            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Simple circle cursor on mobile (no morphing)
        if (mouse.x > 0) {
          ctx.beginPath();
          ctx.fillStyle = "rgba(6, 182, 212, 0.8)";
          ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
          ctx.fill();
        }
    }

    if (canvas.width < 768) {
        // Mobile Mode: Draw once, then update only on scroll/touch
        updateMobile(); 
        window.addEventListener('scroll', () => requestAnimationFrame(updateMobile));
        window.addEventListener('touchmove', (e) => {
            handleTouchMove(e);
            requestAnimationFrame(updateMobile);
        });
    } else {
        // Desktop Mode: Full Physics Loop
        update(); 
    }

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
