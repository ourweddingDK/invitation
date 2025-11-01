import React, { useEffect, useRef, useState } from 'react';
import './Footer.css';
import HomeIcon from '@mui/icons-material/Home';
import { Typography } from '@mui/material';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CollectionsIcon from '@mui/icons-material/Collections';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import backgroundMusic from './assets/A-Thousand-Years.mp3'
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const Footer = ({isMobile, lang, onLanguageChange}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Autoplay error:', error);
      });
    }
  }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const toggleAudio = () => {
        if (isPlaying) {
        audioRef.current.pause();
        } else {
        audioRef.current.play().catch((error) => console.log('Autoplay error:', error));
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (audioRef.current) {
        audioRef.current.volume = 0.5;
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight/2;
        setIsFooterVisible(scrollPosition > viewportHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
      onLanguageChange(lang === 'EN' ? 'VI' : 'EN');
    };

    return (
        <footer className={`footer ${isFooterVisible ? 'visible' : 'hidden'}`}>
        <div className="footer-links">
            <button className="audio-button" onClick={toggleAudio}>
             {isPlaying ? (!isMobile ? <Typography display={"flex"} alignItems={"center"} justifyContent={"center"} textAlign={"center"}><StopCircleIcon sx={{color:"black"}}/>{lang == "VI" ? "Dừng♫" : "Pause♫"}</Typography> : <Typography display={"flex"} alignItems={"center"} justifyContent={"center"} textAlign={"center"} sx={{color:"black"}}><StopCircleIcon/>♪</Typography>) : (!isMobile ? <Typography display={"flex"} alignItems={"center"} justifyContent={"center"} textAlign={"center"}><PlayCircleIcon sx={{color:"black"}}/>{lang == "VI" ? "Phát♫" : "Play♫"}</Typography> : <Typography display={"flex"} alignItems={"center"} justifyContent={"center"} textAlign={"center"} sx={{color:"black"}}><PlayCircleIcon/>♪</Typography>)}
            </button>
            <button onClick={() => scrollToSection('home')}>{!isMobile ?<Typography display={"flex"} alignItems={"center"} justifyContent={"center"} textAlign={"center"}><HomeIcon/>{lang == "VI" ? "Slide" : "Home"}</Typography>:<HomeIcon/>}</button>
            <button onClick={() => scrollToSection('time')}>{!isMobile ?<Typography display={"flex"} alignItems={"center"} justifyContent={"center"} textAlign={"center"}><HourglassBottomIcon/>{lang == "VI" ? "Ngày giờ" : "Time"}</Typography>:<HourglassBottomIcon/>}</button>
            <button onClick={() => scrollToSection('gallery')}>{!isMobile ?<Typography display={"flex"} alignItems={"center"} justifyContent={"center"} textAlign={"center"}><CollectionsIcon/>{lang == "VI" ? "Album" : "Gallery"}</Typography>:<CollectionsIcon/>}</button>
            <button onClick={() => scrollToSection('event')}>{!isMobile ?<Typography display={"flex"} alignItems={"center"} justifyContent={"center"} textAlign={"center"}><EventAvailableIcon/>{lang == "VI" ? "Sự kiện" : "Gallery"}</Typography>:<EventAvailableIcon/>}</button>
            <button
              onClick={toggleLanguage}
              className="language-toggle"
              aria-label={`Switch to ${lang === 'EN' ? 'Vietnamese' : 'English'}`}
            >
              <span className={`lang ${lang === 'VI' ? 'active' : ''}`}>VI</span>
              <span className="separator">|</span>
              <span className={`lang ${lang === 'EN' ? 'active' : ''}`}>EN</span>

              <span
                className="slider"
                style={{
                  transform: lang === 'EN' ? 'translateX(100%)' : 'translateX(0)'
                }}
              />
            </button>
        </div>
        <audio ref={audioRef} loop preload="none">
        <source src={backgroundMusic} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
        </footer>
    );
};

export default Footer;