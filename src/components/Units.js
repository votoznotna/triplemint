import React from 'react';
import Unit from './Unit';

const unitsStyle = {
  display: 'grid',
  gridAutoRows: '360px',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gridGap: '10px',
  padding: '10px',
  position: 'relative',
  outline: 'none'
}

const Units = ({data}) => {
  return (
    <>
        <div style={unitsStyle}>
            {data && data.filter(model => !!model.unit.dyn_images.length).map(model => 
                <Unit data={model} key={`unit_${model.id}`}></Unit>
            )}
        </div>
    </>
  );
};

export default Units;