import React, { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet'

function LocationMarker() {
  const [position, setPosition] = useState(null)
  useMapEvents({
    click(e) {
      console.log(e)
      setPosition(e.latlng)
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Стартова точка</Popup>
    </Marker>
  )
}

export default LocationMarker;