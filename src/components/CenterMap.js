/* eslint-disable react/prop-types */
import React from 'react';
import { useMapEvents } from 'react-leaflet';

const CenterMap = ({ mark }) => {
  const map = useMapEvents('click')

  return (
    <button className='center-btn' onClick={() => map.flyTo({lat: mark.coordinates[0], lng: mark.coordinates[1]})}>
      {`${mark.name} ${mark.address}`}
    </button>
  )
};

export default CenterMap;
