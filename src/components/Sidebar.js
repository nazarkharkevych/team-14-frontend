/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import Form from './Form';
import marks from '../marks.json';
import CenterMap from './CenterMap';

function SideBar({ setVisiblePath, newPosition, editedMark }) {
  const [input, setInput] = useState('');

  const filteredMarks = useMemo(() => {
    return marks.filter(({ name, address, description }) => {
      if (name.includes(input)
        || address.includes(input)
        || description.includes(input)) {
        return true;
      }

      return false; 
    })
  }, [input]);

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div
      className="App__sidebar d-flex flex-column flex-shrink-0 p-3 text-black position-absolute z-2"
    >
      <h2 className="text-center pb-4">
        Карта Інклюзивності
      </h2>

      <button className="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-search" aria-expanded="false" aria-controls="collapse-search">
        Пошук точки
      </button>

      <div className="collapse mb-3" id="collapse-search">
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">Адреса</span>
          </div>
          <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={input} onChange={onChangeInput} />
        </div>

        <ul>
          {filteredMarks.map(mark => (
            <li key={mark.id}>
              <CenterMap mark={mark} />
            </li>
          ))}
        </ul>

        <button
            className="btn btn-success w-100"
            onClick={() => {}}
          >
            Шукати
        </button>
      </div>

      <button
        type="button"
        className="btn btn-success w-100"
        onClick={() => {
          setVisiblePath((prev) => ({
            ...prev,
            regular: true
          }))
        }}
      >
        Прокласти звичайний маршрут
      </button>

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setVisiblePath(prev => ({
          ...prev,
          inclusive: true
        }))}
      >
        Прокласти інклюзивний маршрут
      </button>

      {(newPosition || editedMark) && (
        <>
          <h2 className='text-center mb-3'>
            Додати мітку
          </h2>

          <Form editedMark={editedMark} newPosition={newPosition}/>
        </>
      )}
    </div>
  )
}

export default SideBar;
