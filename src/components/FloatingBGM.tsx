import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

const BGMContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0.75;

  &:hover {
    transform: scale(1.05);
    opacity: 1;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  
  svg {
    display: block;
  }
`;

const MuteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#666">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
  </svg>
);

const MusicNoteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#666" style={{ transform: 'translateX(-1.5px)' }}>
    <path d="M22,3l-10,2.5v11.13c-0.66-0.39-1.44-0.63-2.25-0.63C7.68,16,6,17.68,6,19.75S7.68,23.5,9.75,23.5 c2.04,0,3.7-1.63,3.75-3.66V9.82l8-2v6.82c-0.66-0.39-1.44-0.63-2.25-0.63c-2.07,0-3.75,1.68-3.75,3.75S17.18,21.5,19.25,21.5 c2.04,0,3.7-1.63,3.75-3.66V3z"/>
  </svg>
);

export default function FloatingBGM() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(`${import.meta.env.BASE_URL}bgm.mp3`);
    audioRef.current.loop = true;

    const tryPlay = () => {
      if (audioRef.current && audioRef.current.paused) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              window.removeEventListener('click', tryPlay);
              window.removeEventListener('touchstart', tryPlay);
              window.removeEventListener('scroll', tryPlay);
            })
            .catch((error) => {
              console.log('Autoplay blocked by browser. Waiting for interaction.', error);
            });
        }
      }
    };

    tryPlay();

    window.addEventListener('click', tryPlay);
    window.addEventListener('touchstart', tryPlay);
    window.addEventListener('scroll', tryPlay, { once: true });

    return () => {
      window.removeEventListener('click', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('scroll', tryPlay);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error('Audio play failed:', error);
          });
      }
    }
  };

  return (
    <BGMContainer onClick={togglePlay}>
      <IconWrapper>
        {isPlaying ? <MusicNoteIcon /> : <MuteIcon />}
      </IconWrapper>
    </BGMContainer>
  );
}
