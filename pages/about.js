import React, { useState, useRef, useEffect } from 'react';
import { nombreDeCancion, urlDeCancion, urlDeImagen } from './exportacion';
// import {tema} from './api/message.js'

const ReproductorDeMusica = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    useEffect(() => {
        setDuration(audioRef.current.duration);
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    return (
        <div>
            <img src={urlDeImagen} alt='Portada del álbum' />
            <h2>{nombreDeCancion}</h2>
            <audio src={urlDeCancion} ref={audioRef} />
            <button onClick={handlePlayPause}>
                {isPlaying ? 'Pausar' : 'Reproducir'}
            </button>
            <div>
                Tiempo transcurrido: {currentTime.toFixed(2)} / {duration.toFixed(2)}
            </div>
        </div>
    );
};

export default ReproductorDeMusica;

