import { useEffect, useRef, useState } from 'react'
import './App.css';
import { Stack, Typography, Box, Divider, Grow, CircularProgress } from '@mui/material';
import logoFile from "./assets/logoFile.png"
import savethedateImg from "./assets/savethedate.png"
import theFlowerImg from "./assets/theflower.png"
import leafImg from "./assets/leaf.png"
import groomBrideImg from "./assets/groom_bride.png"
import groomEuImg from "./assets/gromEU.png"
import brideEuImg from "./assets/brideEU.png"
import flowerBloomImg from "./assets/flowerBloom.png"
import flowerImg from "./assets/flower.png"
import leafBigImg from "./assets/leafBig.png"
import flowerOneImg from "./assets/flowerOne.png"
import treeImg from "./assets/tree.png"
import flowerFlowImg from "./assets/flowerFlow.png"
import restaurantImg from "./assets/restaurant.png"

import '@fontsource/great-vibes';
import '@fontsource/prata';
import '@fontsource-variable/buenard';
import '@fontsource-variable/caveat';
import '@fontsource-variable/inter';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import { RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import slide1 from './assets/slide/bia album.png';
import slide2 from './assets/slide/Project_01.jpg';
import slide3 from './assets/slide/Project_02.jpg';
import slide4 from './assets/slide/Project_03.jpg';
import slide5 from './assets/slide/Project_04.jpg';
import slide6 from './assets/slide/Project_05.jpg';
import slide7 from './assets/slide/Project_06.jpg';
import slide8 from './assets/slide/Project_07.jpg';
import slide9 from './assets/slide/Project_08.jpg';

import gallery1 from './assets/gallery/OMG_6257.JPG';
import gallery2 from './assets/gallery/OMG_6737.JPG';
import gallery3 from './assets/gallery/OMG_6898.png';
import gallery4 from './assets/gallery/OMG_6917.JPG';
import gallery5 from './assets/gallery/OMG_7060.png';
import gallery6 from './assets/gallery/OMG_7075.JPG';
import gallery7 from './assets/gallery/OMG_7154.JPG';
import gallery8 from './assets/gallery/OMG_7252.JPG';
import gallery9 from './assets/gallery/OMG_7392.png';
import gallery10 from './assets/gallery/OMG_7416.png';

import CountdownTimer from './CountdownTimer';
import FloatingHearts from './FloatingHeart';
import Calendar from './Calendar';
import Footer from './Footer';

const slides = [
  { id: 1, content: 'Slide 1', image: slide1 },
  { id: 2, content: 'Slide 2', image: slide2 },
  { id: 3, content: 'Slide 3', image: slide3 },
  { id: 4, content: 'Slide 4', image: slide4 },
  { id: 5, content: 'Slide 5', image: slide5 },
  { id: 6, content: 'Slide 6', image: slide6 },
  { id: 7, content: 'Slide 7', image: slide7 },
  { id: 8, content: 'Slide 8', image: slide8 },
  { id: 9, content: 'Slide 9', image: slide9 }
];

const images = [
    { key: 'photo1', src: gallery1, width: 1, height: 1.5, alt: 'Image 1' },
    { key: 'photo2', src: gallery2, width: 1, height: 1.5, alt: 'Image 2' },
    { key: 'photo3', src: gallery3, width: 1, height: 1.5, alt: 'Image 3' },
    { key: 'photo4', src: gallery4, width: 1, height: 1.5, alt: 'Image 4' },
    { key: 'photo5', src: gallery5, width: 1, height: 1.5, alt: 'Image 5' },
    { key: 'photo6', src: gallery6, width: 1, height: 1.5, alt: 'Image 6' },
    { key: 'photo7', src: gallery7, width: 1, height: 1.5, alt: 'Image 7' },
    { key: 'photo8', src: gallery8, width: 1, height: 1.5, alt: 'Image 8' },
    { key: 'photo9', src: gallery9, width: 1, height: 1.5, alt: 'Image 9' },
    { key: 'photo10', src: gallery10, width: 1, height: 1.5, alt: 'Image 10' },
  ];

  const imageSources = [
    logoFile,
    savethedateImg,
    theFlowerImg,
    leafImg,
    groomBrideImg,
    groomEuImg,
    brideEuImg,
    flowerBloomImg,
    flowerImg,
    leafBigImg,
    flowerFlowImg,
    flowerOneImg,
    treeImg,
    restaurantImg,
    ...slides.map(slide => slide.image),
    ...images.map(image => image.src)
  ];

function OpenCard({deviceType}) {
  const [lang, setLang] = useState('VI');
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(-1);

  const swiperRef = useRef(null);

  const handleZoomChange = (swiper, scale) => {
    if (scale > 1) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  };

  const [visibleSections, setVisibleSections] = useState({
    section1: false,
    section2: false,
    section3: false,
  });

  const sectionRefs = {
    section1: useRef(null),
    section2: useRef(null),
    section3: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  useEffect(() => {
    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    Promise.all(imageSources.map(src => preloadImage(src)))
      .then(() => {
        setIsLoading(false);
        setIsMounted(true); 
      })
      .catch((err) => {
        console.warn('Some images failed to load:', err);
        setIsLoading(false);
        setIsMounted(true);
      });
  }, []);

  useEffect(() => {
    if (!isLoading && isMounted) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => ({
                ...prev,
                [entry.target.id]: true,
              }));
            }
          });
        },
        { threshold: 0.3 }
      );

      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.observe(ref.current);
      });

      return () => {
        Object.values(sectionRefs).forEach((ref) => {
          if (ref.current) observer.unobserve(ref.current);
        });
      };
    }
  }, [isLoading, isMounted]);

  if (isLoading) {
    return (
      <>
        <FloatingHearts isMobile={deviceType=="Mobile"} isFlower={true}/>
        <CircularProgress sx={{ color: '#d83536' }} size={60} />
      </>
    );
  }

  return (
  <div>
    <Stack direction="row" sx={{overflow: 'hidden'}} mb={2}>
       <Stack sx={{width:"100%", alignItems:"center",justifyItems:"center", background:"#fff6f7", position: 'relative'}}>
          <Stack sx={{position: 'absolute', width: deviceType == "Mobile" ? "98%" : "85%", alignItems:"center",justifyItems:"center"}}>
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,5 Q10,1 20,5 T40,5 T60,5 T80,5 T100,5"
                fill="none"
                stroke="#f6b5c0"
                strokeWidth="0.1"
              />
            </svg>
          </Stack>
          <Stack id="home" direction="row" display={"flex"} justifyContent={"flex-start"} sx={{position: 'absolute'}} ml={deviceType == "Mobile"? -4 : 4} mt={-2} width={"90%"}>
           <img src={theFlowerImg} alt="logo" style={{width: deviceType == "Mobile" ? (window.innerHeight > window.innerWidth ? "30vw" : "20vw") : "15vw"}}/>
          </Stack>
          <Stack direction="row" display={"flex"} justifyContent={"flex-end"} sx={{position: 'absolute'}} mr={10} mt={deviceType == "Mobile"? 0 : 2} width={"80%"}>
           <img src={leafImg} alt="logo" style={{width: deviceType == "Mobile"? (window.innerHeight > window.innerWidth? "10vw" : "20vw") : "5vw"}}/>
          </Stack>
          <Stack  sx={{width: deviceType == "Mobile" ? "95%" : "85%", alignItems:"center",justifyItems:"center", borderLeft:"1px solid #f4a3b1", borderRight:"1px solid #f4a3b1", backgroundColor:"#fcfbf9"}} mb={4}>
            <Stack direction={"column"} mt={5} mb={2} alignItems={"center"} >
                 <img src={logoFile} alt="logo" style={{width: deviceType == "Mobile" ? "35%" : "25%"}}/> 
            </Stack>
            <Box sx={{ width: deviceType == "Mobile" ? window.innerHeight > window.innerWidth ? "94vw" : "80vw" :"70vw", mx: 'auto'}}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 1,
                  overflow: 'hidden',
                  boxShadow: '0 -10px 10px -5px #fff3f3, 0 10px 10px -5px #fff3f3',
                  borderTop: " 2px solid #fff3f3",
                  borderBottom: " 2px solid #fff3f3",
                  '& .swiper-slide': {
                    filter: 'blur(2px)',
                    transition: 'filter 0.3s ease',
                  },
                  '& .swiper-slide-active': {
                    filter: 'blur(0)',
                  },
                }}
              >
                <Swiper
                  modules={[EffectFade, Zoom, Autoplay]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  zoom={{ maxRatio: 3, minRatio: 1 }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  navigation={true}
                  loop={true}
                  slidesPerView={1}
                  speed={2000}
                  style={{ height: deviceType == "Mobile" ? (window.innerHeight > window.innerWidth ?  "82vh" : "100vh") : (window.innerHeight > window.innerWidth ?  "50vh" : "75vh"), borderRadius:"16px" }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    swiper.on('zoomChange', handleZoomChange);
                  }}
                >
                  {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                      <div className="swiper-zoom-container">
                        <img
                          src={slide.image}
                          alt={slide.content}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'scale-down',
                            userSelect: 'none' 
                          }}
                        />
                    </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            </Box>
            <Typography sx={{fontFamily:'"Caveat Variable", cursive', color:"black", fontSize:""}}>{lang == "VI" ? "Anh đã đi tìm cả thế giới rộng lớn, nhưng chỉ khi thấy em là anh mới muốn dừng lại." : "oh there you are. i've been looking all over for you"}</Typography>
            <Divider  width="30%" color="black"/>

            <Stack id="time" mt={6} direction="column" alignItems={"center"} sx={{position: 'relative', border:"5px solid #fff3f3", borderRadius:"16px", width: deviceType == "Mobile" ? "96%" : "90%", pt:4, pb:4}} >
              <img
                src={treeImg}
                alt="flower"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '10%',
                  height: '30%',
                }}
              />
              <Box ref={sectionRefs.section1} id="section1" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grow in={visibleSections.section1} timeout={1000}>
                  <div>
                    <Typography sx={{fontFamily: '"Great Vibes", cursive', color:"#d83536", fontSize:"5vw"}}>Đăng Khoa   &   Cao Đào</Typography>
                  </div>
                </Grow>
              </Box>
              <Box ref={sectionRefs.section2} id="section2" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grow in={visibleSections.section2} timeout={1000} style={{ transitionDelay: visibleSections.section2 ? '200ms' : '0ms' }}>
                  <div>
                    <Stack mt={-1} direction="row" justifyContent={"center"} alignItems={"center"} spacing={1} width={deviceType == "Mobile" ? "98%" : "100%"}>
                      <img src={groomEuImg} alt="logo" style={{width: "10%"}}/> 
                      <Stack direction="row" spacing={1} width={"70%"} justifyContent={"center"} alignItems={"center"}>
                        <Typography sx={{fontFamily: '"Inter Variable", sans-serif', color:"black", fontSize:"2vw",fontWeight:"normal"}}>{lang == "VI" ? "Chúng tôi trân trọng báo tin về lễ thành hôn diễn ra vào ngày" : "We joyfully announce our marriage on"}</Typography>
                        <Stack  direction="column" alignItems={"center"} mb={0}>
                          <Typography mt={-2} ml={-1} mb={1} sx={{fontFamily: '"Buenard Variable", serif', color:"#c32b34", fontSize:"2.5vw", fontWeight:"bold"}}>30.11</Typography>
                          {/* <Typography mt={deviceType == "Mobile" ? -0.5 : -2} sx={{fontFamily: '"Buenard Variable", serif', color:"#c32b34", fontSize:"2.5vw", fontWeight:"bold"}}>―</Typography> */}
                          <Typography mt={deviceType == "Mobile" ? -0.5 : -2} ml={1} sx={{fontFamily: '"Buenard Variable", serif', color:"#c32b34", fontSize:"2.5vw", fontWeight:"bold"}}>2025</Typography>
                        </Stack>
                      </Stack>
                      <img src={brideEuImg} alt="logo" style={{width:"10%"}}/> 
                    </Stack>
                  </div>
                </Grow>
              </Box>
              <Box ref={sectionRefs.section3} id="section3" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grow in={visibleSections.section3} timeout={1000} style={{ transitionDelay: visibleSections.section3 ? '400ms' : '0ms' }}>
                  <div>
                    <Stack direction="column" alignItems={"center"} mb={0}>
                      <img src={savethedateImg} alt="logo" style={{width: deviceType == "Mobile" ? "35%" : "20%"}}/> 
                      <CountdownTimer isMobile={deviceType == "Mobile"} lang={lang}/>
                    </Stack>
                  </div>
                </Grow>
              </Box>
            </Stack>

            <Stack id="gallery" mt={6} direction="column" alignItems={"center"} sx={{position: 'relative', border:"5px solid #fff3f3", borderRadius:"16px", width: deviceType == "Mobile" ? "96%" : "90%", pt:4, pb:4}} >
              <img
                src={flowerBloomImg}
                alt="flower"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '15%',
                  height: '20%',
                }}
              />
              <img
                src={leafBigImg}
                alt="flower"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '15%',
                  height: '10%',
                }}
              />
              <Typography sx={{fontFamily:'"Caveat Variable", cursive', color:"#c32b34", fontSize:"2em"}}>{lang == "VI" ? "Những Khoảnh Khắc Ngọt Ngào 📸 " : "sweet moments captured 📸 "}</Typography>
              <Stack sx={{ p: 1, width:"98%",backgroundColor:"white" }} >
                <FloatingHearts isMobile={deviceType=="Mobile"} isFlower={true}/>
                <RowsPhotoAlbum
                  photos={images}
                  padding={15}
                  spacing={15}
                  rowConstraints={100}
                  onClick={({ index: currentIndex }) => setIndex(currentIndex)}
                />
                <Lightbox
                  open={index >= 0}
                  close={() => setIndex(-1)}
                  index={index}
                  slides={images.map((photo) => ({ src: photo.src }))}
                />
              </Stack>
            </Stack>

            <Stack id="event" mt={6} direction="column" alignItems={"center"} sx={{position: 'relative', border:"5px solid #fff3f3", borderRadius:"16px", width: deviceType == "Mobile" ? "96%" : "90%", pt:4, pb:4}} >
              <img
                src={flowerOneImg}
                alt="flower"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: deviceType == "Mobile" && window.innerHeight > window.innerWidth ? "10%" : '10%',
                  height: '12%',
                }}
              />
              <img
                src={flowerFlowImg}
                alt="flower"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: deviceType == "Mobile" && window.innerHeight > window.innerWidth ? "15%" : '10%',
                  height: '8%',
                }}
              />
              <Typography sx={{fontFamily:'"Caveat Variable", cursive', color:"black", fontSize:"1.8em"}}>{lang == "VI" ? "- Sự Kiện -" : "- Event -"}</Typography>
              <Typography sx={{fontFamily:'"Caveat Variable", cursive', color:"#c32b34", fontSize:"2.2em"}}>{lang == "VI" ? "⌛ Khi nào & Ở đâu 💒" : "⌛ When & Where 💒"}</Typography>
              <Stack direction={"column"} mt={5} mb={2} alignItems={"center"} sx={{ width:"100%"}}>
                <Stack direction={deviceType == "Mobile" || window.innerWidth < 500 ? "column" : "row"} sx={{ width:"100%"}}>
                  <Calendar isMobile={deviceType == "Mobile" || window.innerWidth < 500} lang={lang}/>
                  <Stack direction={deviceType == "Mobile" || window.innerWidth < 500 ? "column" : "row"} mt={0} mb={1} spacing={1} alignItems={"center"} border="2px solid #f9c2c6" borderRadius={"20px"} margin={2}>
                    <Stack direction={"column"} textAlign={"start"} padding={1}>
                      <Typography sx={{fontSize: '1em', fontWeight: 'normal',fontFamily:'"Inter Variable", sans-serif'}}>{lang == "VI" ? "HÔN LỄ ĐƯỢC CỬ HÀNH TẠI TƯ GIA" : "THE WEDDING CEREMONY WILL BE HELD AT THE BRIDGE'S RESIDENCE"}</Typography>
                      <a
                        href="https://maps.app.goo.gl/SsFxvmNFH6DpQz8z5"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '1em',
                          color: 'blue',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          fontFamily: '"Inter Variable", sans-serif'
                        }}
                        onMouseOver={(e) => (e.target.style.color = 'red')}
                        onMouseOut={(e) => (e.target.style.color = 'blue')}
                      >
                        (<LocationOnOutlinedIcon/>{lang == "VI" ? "NHÀ BÈ, TP.HỒ CHÍ MINH" : "NHA BE, HCM CITY"})
                      </a>
                      <Typography sx={{fontSize: '1em', fontWeight: 'bold', fontFamily:'"Inter Variable", sans-serif'}}>{lang == "VI" ? "VÀO LÚC 7:00" : "AT 7:00 AM"}</Typography>
                      <Typography sx={{fontSize: '1em', fontWeight: 'bold', fontFamily:'"Inter Variable", sans-serif'}}>{lang == "VI" ? "CHỦ NHẬT | NGÀY 30 . 11 . 2025" : "ON SUNDAY, NOVEMBER 30, 2025"}</Typography>
                      {lang == "VI" &&
                      <Typography sx={{fontSize: '1em', fontFamily:'"Inter Variable", sans-serif'}}>(NHẰM NGÀY 11 THÁNG 10 NĂM ẤT TỴ)</Typography>
                      }
                    </Stack>
                    <img src={groomBrideImg} alt="logo" style={{width: "30%", height:"60%"}}/> 
                  </Stack>
                </Stack>
                <Stack direction={deviceType == "Mobile" ? "column" : "row"} width={"98%"}>
                  <Stack direction={deviceType == "Mobile" ? "column" : "row"} width={"100%"} p={2} mt={0} mb={1} spacing={2} alignItems={"center"} border="2px solid #f9c2c6" borderRadius={"20px"}>
                    <img src={restaurantImg} alt="logo" style={{width: "40%", height:"60%"}}/> 
                    <Stack direction={"column"} textAlign={"start"} padding={2}>
                      <Typography sx={{fontSize: '1em', fontWeight: 'normal', fontFamily:'"Inter Variable", sans-serif'}}>{lang == "VI" ? "TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH ĐẾN DỰ BUỔI TIỆC CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI TẠI KHÁCH SẠN" : "CORDIALLY INVITE YOU TO JOIN OUR FAMILIES IN CELEBRATING OUR WEDDING RECEPTION AT HOTEL"}</Typography>
                      <Typography sx={{fontFamily:'"Prata", serif', fontSize: '1.5em', fontWeight: 'bold', color:"red"}}>MERPERLE CRYSTAL PALACE</Typography>
                      <Typography sx={{fontSize: '0.8em', fontFamily:'"Inter Variable", sans-serif'}}>{lang == "VI" ? "SẢNH DIAMOND - TẦNG 3" : "DIAMOND HALL - 3RD FLOOR"}</Typography>
                      <a
                        href="https://maps.app.goo.gl/aXu877tqB9295BxQ9"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '1em',
                          color: 'blue',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          // fontFamily: '"Caveat Variable", cursive'
                        }}
                        onMouseOver={(e) => (e.target.style.color = 'red')}
                        onMouseOut={(e) => (e.target.style.color = 'blue')}
                      >
                        <Typography sx={{fontFamily: '"Inter Variable", sans-serif'}}><LocationOnOutlinedIcon color="blue"/>{lang == "VI" ? "13 NGUYỄN LƯƠNG BẰNG, PHÚ MỸ HƯNG, QUẬN 7, TP.HCM" : "13 NGUYEN LUONG BANG STREET, PHU MY HUNG, DISTRICT 7, HCM CITY"}</Typography>
                      </a>
                      <Typography sx={{fontSize: '1em', fontWeight: 'bold', fontFamily:'"Inter Variable", sans-serif'}}>{lang == "VI" ? "GIỜ ĐÓN KHÁCH: 11:00" : "WELCOME GUEST: 11:00 AM"}</Typography>
                      <Typography sx={{fontSize: '1em', fontWeight: 'bold', fontFamily:'"Inter Variable", sans-serif'}}>{lang == "VI" ? "KHAI TIỆC: 12:00" : "TOASTING: 12:00 PM"}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Stack mb={4} width="100%" height="50vh" justifyContent={"center"} alignItems={"center"}>
              <Typography sx={{ color:"#bb3e32", fontSize:lang == "VI" ? "1.2em":"2em", fontFamily: '"Caveat Variable", cursive'}}>{lang == "VI" ? "SỰ HIỆN DIỆN CỦA QUÝ KHÁCH LÀ NIỀM VINH HẠNH CHO GIA ĐÌNH CHÚNG TÔI" : "YOUR PRESENCE WILL BE OUR GREATEST HONOR."}</Typography>
              {lang == "VI" && <Typography sx={{ color:"#bb3e32", fontSize:"1.2em", fontFamily: '"Caveat Variable", cursive'}}>RẤT HÂN HẠNH ĐƯỢC ĐÓN TIẾP!</Typography>}
              <img src={flowerImg} alt="logo" style={{width: deviceType == "Mobile" ? "20%" : "10%", height:"60%"}}/>
            </Stack>
          </Stack>
        </Stack>
    </Stack>
    <Footer 
      isMobile={deviceType == "Mobile"} 
      lang={lang}
      onLanguageChange={setLang}
    />
  </div>
)};

export default OpenCard;