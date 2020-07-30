import React from 'react';
import Unit from './Unit';

const Units = ({data}) => {
  return (
    <>
        <div className="row">
            {data && data.filter(model => !!model.unit.dyn_images.length).map(model => 
                <Unit data={model} key={`unit_${model.id}`}></Unit>
            )}
        </div>
    </>
  );
};

export default Units;