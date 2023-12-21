import { TileLayer, useMapEvents } from "react-leaflet";
import Pbf from "pbf";
import { VectorTile } from "vector-tile";
import React, { useState } from "react";

//функція робить запит на api лун за координатами,
//проксі пробував, бо виникає помилка cors

const fetcher = (coords) => {
  const {x, y, z} = coords;
  console.log(coords);

  // const localProxyUrl = 'https://proxy.cors.sh/';
  const resourceUrl
    = `https://misto.lun.ua/external-tiles/data/usefulmapv2/${z}/${x}/${y}.pbf`;

  const fullUrl = '' + resourceUrl;

  fetch(
    fullUrl,
    {
      mode: 'cors',
      // headers: {
      //   'x-cors-api-key': 'temp_dbcf064057c4b477916513d5537b6199'
      // }
    }
   )
    .then(res => {
      console.log(res);
      if (!res.ok) {
        throw new Error(`Failed to fetch PBF file. Status: ${res.status}`);
      }

      return res.arrayBuffer();
    })
    .then(buffer => console.log(buffer))
    .catch(error => {
      console.error('Error fetching resource:', error);
    });
}

//за ідеєю компонент має повертати наші точки з api на карту
const GetTiles = () => {
  const [url, setUrl] = useState('');

  //отримуємо координати під час драг івенту
  const map = useMapEvents({
    drag: async (e) => {
      const latLng = map.mouseEventToLatLng(e.originalEvent)
      const zoom = Math.min(map.getZoom(), 14);

      const tileSize = {
        x: 256,
        y: 256
      };
      const pixelPoint = map.project(latLng, zoom).floor();
      const coords = pixelPoint.unscaleBy(tileSize).floor();
      coords.z = zoom;

      const {x, y, z} = coords;

    setUrl(
      `https://misto.lun.ua/external-tiles/data/usefulmapv2/${z}/${x}/${y}.pbf`
    );

      // const pbfData = fetcher(coords);

      // const pbf = new Pbf(pbfData);
      // const vectorTile = new VectorTile(pbf);
      // const layers = vectorTile.layers;
      // console.log(pbf);
    }
  })

  return  (
    //пробував просто додати TileLayer одразу з лінком на api, але теж не працює 
    null
    // <TileLayer
    //   url={url}
    // />
  )
};

export default GetTiles;
