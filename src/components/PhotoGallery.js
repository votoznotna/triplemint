import React, { useState } from 'react';

const photo = {
    position: 'relative',
    heigh: '100%',
    overflow: 'hidden'
};

const photoArrow = {
    ouline: 'none',
    fontSize: '2em',
    position: 'absolute',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: 'white',
    margin: '0',
    top: '50%',
    transform: 'translateY(-50%)'
};

const photoShow = {
    display: 'block'
}

const photoHide = {
    display: 'none'
}

const leftPhotoArrow = { left: '2%' };
const rightPhotoArrow = { right: '2%' };
const imgStyle = { 
    width: '100%',
    objectFit: 'cover'
};

const photoArrowSvg = {
    display: 'block',
    fill: 'rgb(255, 255, 255)',
    height: '24px',
    width: '24px'
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
            <div style={photo}>
                <div onClick={() => selectPrevPhoto()} style={{...photoArrow, ...leftPhotoArrow}}>
                    <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false" style={photoArrowSvg}>
                        <path fillRule="evenodd" d="M13.703 16.293a1 1 0 1 1-1.415 1.414l-7.995-8a1 1 0 0 1 0-1.414l7.995-8a1 1 0 1 1 1.415 1.414L6.413 9l7.29 7.293z"></path>
                    </svg>
                </div>
                { photos.map((photo, index) => 
                    ( 
                        <img className="img-fluid img-thumbnail" style={ photoIndex === index ? {...imgStyle, ...photoShow} :  {...imgStyle, ...photoHide} } onClick={() => selectUnit()} key={`photo_${uid}_${index}`}  src={`${IMG_BASE}/${photo.key}.${photo.extension}`} alt="Unit view"></img>
                    ) 
                )}
                <div onClick={() => selectNextPhoto()}  style={{...photoArrow, ...rightPhotoArrow}}>
                    <svg viewBox="0 0 18 18" role="img" aria-label="Next" focusable="false" style={photoArrowSvg}>
                        <path fillRule="evenodd" d="M4.293 1.707A1 1 0 1 1 5.708.293l7.995 8a1 1 0 0 1 0 1.414l-7.995 8a1 1 0 1 1-1.415-1.414L11.583 9l-7.29-7.293z"></path>                
                    </svg>
                </div>
            </div>
        </>
    );
};

export default PhotoGallery;