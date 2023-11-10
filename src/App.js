import React, { useState } from "react";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import LocationMarker from "./components/LocationMarket";

export const App = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="App">
      <div
        className="App__sidebar d-flex flex-column flex-shrink-0 p-3 text-black position-absolute z-2"
      >
        <h2 className="text-center pb-4">
          Карта Інклюзивності
        </h2>

        <button
          className="btn btn-secondary"
          onClick={() => setActive(true)}
        >
          Знайти точку
        </button>

        {!active
          ? (
            <button
              className="btn btn-secondary"
              onClick={() => setActive(true)}
            >
              Прокласти звичайний маршрут
            </button>
          )
          : (
            <>
              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Звідки</span>
                </div>
                <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
              </div>

              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Куди</span>
                </div>
                <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
              </div>

              <button
                className="btn btn-secondary"
                onClick={() => setActive(true)}
              >
                Прокласти
              </button>
            </>
          )}

        <button className="btn btn-primary">
          Прокласти інклюзивний маршрут
        </button>
      </div>
      <MapContainer
        center={[50.40131467149746, 30.63246659343737]}
        zoom={16}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          alt="Інклюзивне Сільпо"
          position={[50.40541083251623, 30.63147954054484]}
        >
          <Popup>
            Сільпо <br />
            Київ, Просп. Григоренка Петра, 23 <br />
            Графік роботи: 07:30-23:00 <br />
            <br />
            ✅ Вхід в рівень з тротуаром <br />
            ✅ Пандус <br />
            <br />
            Джерело: Сільпо
          </Popup>
        </Marker>

        <Marker
          alt="Інклюзивний світлофор"
          position={[50.40186127766596, 30.633035578844378]}
        >
          <Popup>
            Світлофорні обʼєкти, на яких реалізовані заходи безбар`єрного середовища <br />
            <br />
            ✅ Понижений бордюр <br />
            ✅ Тактильна плитка <br />
            ✅ Світлофор зі звуковим сигналом <br />
            <br />
            Джерело: Департамент транспортної інфраструктури
          </Popup>
        </Marker>
        <LocationMarker />
      </MapContainer>
    </div>
  )
};


export default App;
