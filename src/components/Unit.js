import React from 'react';
import PhotoGallery from './PhotoGallery';

const Unit = ({data}) => {

    const currencyFormat = (number) => {
        return number && ('$' + number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
    }

    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12" >
            <div className="card mb-2">
                <div style={{padding: 0}} className="card-body text-center">
                    <div  className="d-block mb-2 h-100">
                        <PhotoGallery photos={data.unit.dyn_images} uid={data.unit.id}></PhotoGallery>
                    </div>
                    <div className="h7 mb-2">{data.address}</div>
                    <div className="h8 card-subtitle mb-2 text-muted">{data.unit.building.region.text}</div>
                    <div className="h8 card-subtitle">{currencyFormat(data.price)}</div>
                    <div className="h8 card-text mb-2">{`${data.unit.bedrooms} BD, ${data.unit.bathrooms} BA, ${data.unit.surface} SF, ${data.unit.building.type.toUpperCase()}`}</div>
                </div>
            </div>
        </div>
    );
};

export default Unit;