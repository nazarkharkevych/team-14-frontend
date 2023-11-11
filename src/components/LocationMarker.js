/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet'

const LocationMarker = ({ setPosition, newPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng)
    },
  });

  return newPosition === null ? null : (
    <Marker position={newPosition}>
      <Popup>
        Нова точка <br />
        {newPosition.lat} <br/>
        {newPosition.lng}
      </Popup>
    </Marker>
  )
}

export default LocationMarker;
