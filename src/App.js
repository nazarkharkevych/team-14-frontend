import React, { useState, useEffect } from "react";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import LocationMarker from "./components/LocationMarker";
import SideBar from "./components/Sidebar";
import icons from './images/incons';
// import marks from './marks.json';

const App = () => {
  const [visiblePath, setVisiblePath] = useState({
    regular: false,
    inclusive: false
  });
  const [newPosition, setNewPosition] = useState(null);
  const [editedMark, setEditedMark] = useState(null);
  const [marks, setMarks] = useState([]);

  const mapCenter = [50.40131467149746, 30.63246659343737];
  const startPosition = [50.40113235969953, 30.636320114135746];

  const regularPath = [
    [50.40113235969953, 30.636320114135746],
    [50.40229833588288, 30.635842680931095],
    [50.40305056335951, 30.63648641109467],
    [50.40399766915728, 30.63549399375916],
    [50.40334119350525, 30.632575750350956],
    [50.40533452635472, 30.631309747695926],
  ];

  const inclusivePath = [
    [50.40113235969953, 30.636320114135746],
    [50.40229833588288, 30.635842680931095],
    [50.40186127766596, 30.633035578844378],
    [50.40334119350525, 30.632575750350956],
    [50.40533452635472, 30.631309747695926],
  ];

  useEffect(() => {
    fetch('https://team-14-backend-production-dd0b.up.railway.app/api/points/')
      .then(res => res.json())
      .then(data => setMarks(data))
  }, []);

  return (
    <div className="App">
    <SideBar setVisiblePath={setVisiblePath} newPosition={newPosition} editedMark={editedMark} marks={marks} />

      <MapContainer
        center={mapCenter}
        zoom={16}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {marks.length && marks.map(mark => (
          <Marker
            key={mark['_id']}
            alt={mark.name || "Точка інклюзивності"}
            position={mark.coordinates}
            icon={icons[mark.icon || 'iconTraffic']}
          >
           <Popup>
            {mark.name} <br />
            {mark.address} <br />
            Графік роботи: {mark.hours || 'відсутній'} <br />
            <br />
            {mark.features.map(feature => (
              <React.Fragment key={feature}>
                ✅ {feature} <br />
              </React.Fragment>
            ))}
            <br />
            Джерело: {mark.source}

            <br />

            <button
              className="btn btn-secondary btn-sm mt-3"
              onClick={() => setEditedMark(mark)}
            >
              Редагувати
            </button>
          </Popup>
          </Marker>
        ))}

        <Marker
          alt="Старт"
          position={startPosition}
        >
          <Popup>
            Стартова точка
          </Popup>
        </Marker>

        <LocationMarker
          setPosition={setNewPosition}
          newPosition={newPosition}
        />

        {visiblePath['regular'] && (
          <Polyline
            pathOptions={{ color: '#CD5C5C', weight: 8, }}
            positions={regularPath}
          />
        )}

        {visiblePath['inclusive'] && (
          <Polyline
            pathOptions={{ color: '#2E8B57', weight: 8, }}
            positions={inclusivePath}
          />
        )}
      </MapContainer>
    </div>
  )
};


export default App;
