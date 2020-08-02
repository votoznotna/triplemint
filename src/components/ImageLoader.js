/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';

const ImageLoader = ({src, style, id}) => {
    const [showStyle, setShowStyle] = useState({zIndex: -1});

    useEffect(() => {
        const loadingImage = new Image();
        const handleLoad = () => {
            setShowStyle({zIndex: 1});
        }
        loadingImage.addEventListener('load', () => handleLoad);
        loadingImage.src = src;
        return () => loadingImage.removeEventListener('load', handleLoad);
      }, [src]);

    return (
        <>
            <img style={{...style, ...showStyle}} key={id} src={src} alt="Unit view"></img>
        </>
    );

};

export default ImageLoader;