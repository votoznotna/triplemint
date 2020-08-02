import React, { useState } from 'react';

const photoShow = {
    display: 'block'
}

const photoHide = {
    display: 'none'
}

const imgStyle = { 
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    margin: '0',
    padding: '0',
    border: '0'
};

const photoArrowSvg = {
    display: 'block',
    fill: 'rgb(255, 255, 255)',
    height: '24px',
    width: '24px'
}

const thumbnailStyle = {
    overflow: 'hidden',
    height: '70%',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    top: '0',
    zIndex: '0',
}

const cardSwiperContainerStyle = {
    height: '100%'
}

const swiperWrapperStyle = {
    // transitionDuration: '0ms',
    // transform: 'translate3d(-328px, 0px, 0px)',
    position: 'relative',
    height: '100%',
    width: '100%',
    zIndex: '1',
    display: 'flex',
    boxSizing: 'content-box'
}


const buttonArrowLeftStyle = {
    order: '1',
    left: '0',
    background: 'linear-gradient(to left, transparent 0%, rgba(0, 0, 0, 0.25) 100%)'
}

const buttonArrowRightStyle = {
    order: '2',
    right: '0',
    background: 'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.25) 100%)'
}

const arrowWrapStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    right: '0',
    left: '0',
    top: '0',
    bottom: '0'
}

const buttonArrowStyle = {
    width: '18%',
    height: '70%',
    padding: '0',
    border: '0',
    cursor: 'pointer',
    outline: 'none',
    pointerEvents: 'auto',
    position: 'absolute',
    bottom: '30%'
}

const swiperSlideStyle = {
    flexShrink: '0',
    position: 'relative',
    transitionProperty: 'transform'
}

const pictureStyle = {
    height: '100%',
    width: '100%',
    margin: '0',
    padding: '0'
}


const PhotoGallery = ({photos, uid}) => {
    const [photoIndex, setPhotoIndex] = useState(0);
    const IMG_BASE = `https://dyn-images.triplemint.com/production/images/unit/${uid}/x486`;

    const selectUnit = () => {
    }

    const selectPrevPhoto = () => {
        setPhotoIndex(photoIndex === 0 ? photos.length - 1 : photoIndex -  1);
    }

    const selectNextPhoto = () => {
        setPhotoIndex(photoIndex === photos.length - 1 ? 0 : photoIndex +  1);
    }

    return (
        <>
            <div style={thumbnailStyle}>
                <div style={cardSwiperContainerStyle}>
                    <div style={swiperWrapperStyle}>
                    { photos.map((photo, index) => 
                        ( 
                        <div style={ photoIndex === index ? {...swiperSlideStyle, ...photoShow} :  {...swiperSlideStyle, ...photoHide} } key={`swiper_slide_${uid}_${index}`}>
                            <picture style={pictureStyle} key={`picture_${uid}_${index}`}>
                                <img style={imgStyle} onClick={() => selectUnit()} key={`photo_${uid}_${index}`}  src={`${IMG_BASE}/${photo.key}.${photo.extension}`} alt="Unit view"></img>
                            </picture>
                        </div>
                        ) 
                    )}
                    </div>
                </div>
            </div>
            <button onClick={() => selectPrevPhoto()} type="button" style={{...buttonArrowStyle, ...buttonArrowLeftStyle}} >
                <div style={arrowWrapStyle} >
                    <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false" style={photoArrowSvg}>
                        <path fillRule="evenodd" d="M13.703 16.293a1 1 0 1 1-1.415 1.414l-7.995-8a1 1 0 0 1 0-1.414l7.995-8a1 1 0 1 1 1.415 1.414L6.413 9l7.29 7.293z"></path>
                    </svg>
                </div>
            </button>
            <button onClick={() => selectNextPhoto()} type="button" style={{...buttonArrowStyle, ...buttonArrowRightStyle}} >
                <div style={arrowWrapStyle} >
                    <svg viewBox="0 0 18 18" role="img" aria-label="Next" focusable="false" style={photoArrowSvg}>
                        <path fillRule="evenodd" d="M4.293 1.707A1 1 0 1 1 5.708.293l7.995 8a1 1 0 0 1 0 1.414l-7.995 8a1 1 0 1 1-1.415-1.414L11.583 9l-7.29-7.293z"></path>                
                    </svg>
                </div>
            </button>
        </>
    );
};

export default PhotoGallery;