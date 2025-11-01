import React, { useState, useEffect } from 'react';
import { Typography, Box, Divider, Stack } from '@mui/material';
import '@fontsource-variable/caveat';

const targetDate = new Date('2025-11-30T00:00:00').getTime();

const CountdownTimer = ({isMobile, lang}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => time.toString().padStart(2, '0');

  return (
    <Box sx={{ p: 1, textAlign: 'center', touchAction: 'pan-x pan-y pinch-zoom', width:"100%"}}>
      <Stack  direction ="row" sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',gap: '8px',width:"100%"}}>
        <Box direction="row" border={"2px solid #f4a3b1"} borderRadius={"16px"}>
          <Typography sx={{fontFamily: '"Caveat Variable", cursive', color: '#ce2835', fontSize: '2rem', padding: "0 8px", fontSize:isMobile ? "2.5em":"3em" }}>{formatTime(timeLeft.days)}</Typography>
          <Divider color="black"/>
          <Typography variant="body1" sx={{fontFamily: '"Caveat Variable", cursive', color: 'grey' }}>{lang == "VI" ? "Ngày" : "Days"}</Typography>
        </Box>
        <Typography variant="h6" sx={{fontFamily: '"Caveat Variable", cursive', color: 'black', marginBottom: '0px' }}>:</Typography>
        <Box direction="row" border={"2px solid #f4a3b1"} borderRadius={"16px"}>
          <Typography sx={{fontFamily: '"Caveat Variable", cursive', color: '#ce2835', fontSize: '2rem', padding: "0 8px", fontSize:isMobile ? "2.5em":"3em" }}>{formatTime(timeLeft.hours)}</Typography>
          <Divider color="black"/>
          <Typography variant="body1" sx={{fontFamily: '"Caveat Variable", cursive', color: 'grey' }}>{lang == "VI" ? "Giờ" : "Hours"}</Typography>
        </Box>
        <Typography variant="h6" sx={{fontFamily: '"Caveat Variable", cursive', color: 'black', marginBottom: '0px' }}>:</Typography>
        <Box direction="row" border={"2px solid #f4a3b1"} borderRadius={"16px"}>
          <Typography  sx={{fontFamily: '"Caveat Variable", cursive', color: '#ce2835', fontSize: '2rem', padding: "0 8px", fontSize:isMobile ? "2.5em":"3em" }}>{formatTime(timeLeft.minutes)}</Typography>
          <Divider color="black"/>
          <Typography variant="body1" sx={{fontFamily: '"Caveat Variable", cursive', color: 'grey' }}>{lang == "VI" ? "Phút" : "Mins"}</Typography>
        </Box>
        <Typography variant="h6" sx={{fontFamily: '"Caveat Variable", cursive', color: 'black', marginBottom: '0px' }}>:</Typography>
        <Box direction="row" border={"2px solid #f4a3b1"} borderRadius={"16px"}>
          <Typography  sx={{fontFamily: '"Caveat Variable", cursive', color: '#ce2835', fontSize: '2rem', padding: "0 8px", fontSize:isMobile ? "2.5em":"3em" }}>{formatTime(timeLeft.seconds)}</Typography>
          <Divider color="black"/>
          <Typography variant="body1" sx={{fontFamily: '"Caveat Variable", cursive', color: 'grey' }}>{lang == "VI" ? "Giây" : "Secs"}</Typography>
        </Box>
      </Stack>
      {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
        <Typography variant="h4" color="success" sx={{fontFamily: '"Caveat Variable", cursive', mt: 2 }}>
          🎉 🎉 🎉 🥂🥂 🎉 🎉 🎉
        </Typography>
      )}
    </Box>
  );
};

export default CountdownTimer;