import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';

const FloatingHearts = ({isMobile,isFlower}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];
    const heartCount = isFlower ? (isMobile? 6 : 9) : 20;

    class Heart {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 10;
        this.speedX = Math.random() * 1 - 1.5;
        this.speedY = Math.random() * 1 + 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 + 2;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        if (this.y > canvas.height) {
          this.y = -50;
          this.x = Math.random() * canvas.width;
        }
        
        this.opacity -= 0.005;
        if (this.opacity <= 0) this.opacity = 0.7;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.font = `${this.size}px Arial`;
        ctx.fillText(isFlower ? '🌸' : '💖', -this.size / 2, this.size / 2); //🌸
        ctx.restore();
      }
    }

    for (let i = 0; i < heartCount; i++) {
      hearts.push(new Heart());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach(heart => {
        heart.update();
        heart.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default FloatingHearts;