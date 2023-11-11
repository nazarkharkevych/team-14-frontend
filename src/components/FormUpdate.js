/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

const initBoxes = {
  'Пандус': false,
  'Ліфт': false,
  'Світлофор зі звуковим сигналом': false,
  'Вай-Фай': false,
  'Тактильна плитка': false,
  'Понижений бордюр': false,
  'Вбиральня для людей з інвалідністю': false,
};

const FormUpdate = ({ editedMark }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState(initBoxes);

  const onBoxChange = (e) => {
    setFeatures(prev => ({
      ...prev,
      [e.target.name]: e.target.checked
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://team-14-backend-production-dd0b.up.railway.app/api/points/', {
      method: 'patch',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        name: name,
        description: description,
        features: Object.entries(features).filter(([key, value]) => {
          if (value) {
            return true
          }

          return false
        }).map(entrie => entrie[0]),
       })
    })
    .then(res => console.log(res))
      .catch(err => console.log(err))
      .finally(() => {
        setFeatures(initBoxes);
        setName('');
        setDescription('');
      })
  }

  useEffect(() => {
    if (editedMark) {
      setName(editedMark.name);
      setDescription(editedMark.description);
      setFeatures(prev => {
        const res = {...initBoxes};

        for(const param of editedMark.features) {
          res[param] = !res[param]
        }

        return res;
      })
    }
  }, [editedMark]);

  return (
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Назва</label>
          <div className="col-sm-10">
            <input type="text"
              className="form-control"
              id="inputEmail3"
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Опис</label>
          <div className="col-sm-10">
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
        </div>

        <fieldset className="row mb-3">
          <legend className="col-form-label pt-0">
            Особливості місця
          </legend>

          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck1" name='Пандус' checked={features['Пандус']} onChange={onBoxChange}/>
                <label className="form-check-label" htmlFor="gridCheck1">
                  Пандус
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck2" name='Ліфт' checked={features['Ліфт']} onChange={onBoxChange}/>
                <label className="form-check-label" htmlFor="gridCheck2">
                  Ліфт
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck3" name='Світлофор зі звуковим сигналом' checked={features['Світлофор зі звуковим сигналом']} onChange={onBoxChange}/>
                <label className="form-check-label" htmlFor="gridCheck3">
                  Світлофор зі звуковим сигналом
              </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck4" name='Вай-Фай' checked={features['Вай-Фай']} onChange={onBoxChange}/>
                <label className="form-check-label" htmlFor="gridCheck4">
                  Вай-Фай
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck5" name='Тактильна плитка' checked={features['Тактильна плитка']} onChange={onBoxChange}/>
                <label className="form-check-label" htmlFor="gridCheck5">
                  Тактильна плитка
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck6" name='Понижений бордюр' checked={features['Понижений бордюр']} onChange={onBoxChange}/>
                <label className="form-check-label" htmlFor="gridCheck6">
                  Понижений бордюр
                </label>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck7" name='Вбиральня для людей з інвалідністю' checked={features['Вбиральня для людей з інвалідністю']} onChange={onBoxChange}/>
                <label className="form-check-label" htmlFor="gridCheck7">
                  Вбиральня для людей з інвалідністю
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary">Зберегти</button>
      </form>
  )
}

export default FormUpdate;
