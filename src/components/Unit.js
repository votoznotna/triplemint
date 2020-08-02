import React from 'react';
import PhotoGallery from './PhotoGallery';


const cardWrap = {
    height: '100%',
    width: '100%',
    position: 'relative',
    display: 'block',
    zIndex: '0'
}

const listingCard = {
    height: '100%',
    width: '100%',
    margin: '0',
    padding: '0',
    border: '1px solid #d8d8d8',
    backgroundColor: '#fff',
    backgroundImage: 'url(\'../assets/light-pattern.png\')',
    backgroundRepeat: 'repeat',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    cursor: 'pointer',
    position: 'relative'
}

const dataStyle = {
    height: '30%',
    width: '100%',
    padding: '10px 30px 10px 10px',
    color: '#404040',
    textAlign: 'left',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    borderTop: '1px solid #d8d8d8',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: '0'

}

const locationStyle = {
    order: '1',
}

const addressStyle = {
    margin: '0',
    fontSize: '18px',
    whiteSpace: 'normal',
    color: '#404040'
}

const neighborhoodStyle = {
    margin: '0',
    fontSize: '14px',
    whiteSpace: 'normal',
    color: '#767676'
}

const listInfoStyle = {
    order: '2'
}

const priceStyle = {
    margin: '0',
    fontSize: '16px',
    color: '#404040'
}

const summaryStyle = {
    margin: '0',
    fontSize: '14px',
    color: '#767676'
}

const Unit = ({data}) => {

    const currencyFormat = (number) => {
        return number && ('$' + number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
    }
    return (
        <div style={cardWrap}>
            <div style={listingCard}>
                <PhotoGallery photos={data.unit.dyn_images} uid={data.unit.id}></PhotoGallery>
                <div style={dataStyle}>
                    <div style={locationStyle}>
                        <p style={addressStyle}>
                            <span>{data.address}</span>
                        </p>
                        <p style={neighborhoodStyle}>
                            <span>{data.unit.building.region.text}</span>
                        </p>
                    </div>
                    <div style={listInfoStyle}>
                        <p style={priceStyle}>
                            <span>{currencyFormat(data.price)}</span>
                        </p>
                        <p style={summaryStyle}>
                            <span>{`${data.unit.bedrooms} BD, `}</span>
                            <span>{`${data.unit.bathrooms} BA, `}</span>
                            <span>{`${data.unit.surface} SF, `}</span>
                            <span>{`${data.unit.building.type.toUpperCase()}`}</span>
                        </p>
                    </div>
               </div>
            </div>
        </div>

    );
};

export default Unit;