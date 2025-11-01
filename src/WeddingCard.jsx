import React, { useState } from 'react';
import { Box } from '@mui/material';
import ClosedCard from './ClosedCard';
import OpenCard from './OpenCard';
import FloatingHearts from './FloatingHeart';

const WeddingCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const checkDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const width = window.innerWidth;

    if (/mobile/i.test(userAgent) || width < 768) {
      return "Mobile";
    } else if (/tablet|ipad|android(?!.*mobile)/i.test(userAgent) || (width >= 768 && width < 1024)) {
      return "Tablet";
    } else {
      return "Computer";
    }
  };

  const deviceType = checkDevice();
  return (
  <>{!isOpen ?
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FloatingHearts isMobile={deviceType=="Mobile"} isFlower={false} />
      <Box
        sx={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        <ClosedCard deviceType={deviceType} onClick={() => setIsOpen(true)} />
      </Box>
    </Box>
    :<OpenCard deviceType={deviceType}/>}</>
  );
};

export default WeddingCard;