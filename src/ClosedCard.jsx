import React from 'react';
import { Box } from '@mui/material';
import blossomImg from "./assets/index.png"
import ringImg from "./assets/ring.png"
import savethedateImg from "./assets/savethedate.png"
import flowerFlowImg from "./assets/peach.png"
import tapImg from "./assets/tap.png"
import '@fontsource/prata';
import '@fontsource-variable/buenard';
import '@fontsource-variable/caveat';

const ClosedCard = ({ deviceType, onClick }) => {
  return (
    <Box
      sx={{
        width:deviceType == "Mobile" && window.innerHeight < window.innerWidth ? "90%" : window.innerHeight < window.innerWidth ? "50vh" : "80vw",
        height: "100%",
      borderRadius: '20px',
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      transformStyle: 'preserve-3d',
      '&:hover': {
        transform: 'translateY(-10px) rotateY(5deg) rotateX(5deg)',
        boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
      },
      '&:active': {
        transform: 'scale(0.98)',
      },
    }}
    onClick={onClick}
    >
      <svg
        position="absolute"
        width="100%"
        height="100%"
        viewBox="0 0 350 500"
        style={{
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <defs>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#fff5f4', stopOpacity: 1 }} /> 
            <stop offset="100%" style={{ stopColor: '#fce8e7', stopOpacity: 0.2 }} />#fce8e7
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="350"
          height="500"
          fill="url(#cardGradient)"
          rx="10"
          ry="10"
        />

        <path
            d="M10,10 h330 v480 h-330 v-480 Z"
            stroke="#cc0000"
              strokeWidth="2"
              fill="none"
          />
        <image 
          href={blossomImg}
          x="250"
          y="-40"
          width="100"
          height="200"
          viewBox="0 0 20 20"
        />
        <image
          href={ringImg}
          x="120"
          y="300"
          width="100"
          height="120"
          preserveAspectRatio="xMidYMin slice"
        />
        <image
          href={savethedateImg}
          x="80"
          y="30"
          width="200"
          height="200"
          viewBox="0 0 100 100"
        />
        <image
          href={flowerFlowImg}
          x="0"
          y="400"
          width="110"
          height="110"
          viewBox="0 0 50 50"
        />
       
        <text x="40%" y="44%" style={{fontFamily: '"Buenard Variable", serif', fill: '#f8b8b7', fontSize: '5em', textAnchor: 'middle'}} dx="-8">30.11</text>
        <text x="60%" y="64%"  style={{fontFamily: '"Buenard Variable", serif', fill: '#f8b8b7', fontSize: '5em', textAnchor: 'middle'}} dy="-16" dx="-8">2025</text>
        <text
          x="50%"
          y="50%"
          fontFamily='"Prata", serif'
          fill="#d83536"
          fontWeight="w600"
          fontSize="1.8em"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Đăng Khoa & Cao Đào
        </text>
        <g
          transform="translate(175, 450)"
          style={{
            cursor: 'pointer',
          }}
        >
          <circle
            cx="0"
            cy="0"
            r="20"
            fill="#d83536" 
            stroke="#ffb6c1"
            strokeWidth="2"
            style={{
              transition: 'transform 0.2s',
            }}
          />
          {/* <text
            x="0"
            y="5"
            textAnchor="middle"
            fontSize="16"
            fill="white"
            style={{
              pointerEvents: 'none',
            }}
          >
            Open
          </text> */}
          <image
            href={tapImg}
            x="-15"
            y="-15"
            style={{
              color: 'white',
              fill: 'currentColor'
            }}
            width="30"
            height="30"
            viewBox="0 0 30 30"
          />
        </g>
      </svg>
    </Box>
  );
};

export default ClosedCard;