import L from 'leaflet';
import icon from './traffic-light-solid.svg'
import landmark from './landmark-solid.svg'
import shop from './supermarket.svg'
import restroom from './restroom.svg'
import elevator from './elevator.svg'

const iconTraffic = new L.Icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

const iconLandmark = new L.Icon({
    iconUrl: landmark,
    iconRetinaUrl: landmark,
    iconSize: new L.Point(30, 30),
    className: 'leaflet-div-icon'
});

const iconShop = new L.Icon({
    iconUrl: shop,
    iconRetinaUrl: shop,
    iconSize: new L.Point(30, 30),
    className: 'leaflet-div-icon'
});

const iconRestroom = new L.Icon({
    iconUrl: restroom,
    iconRetinaUrl: restroom,
    iconSize: new L.Point(30, 30),
    className: 'leaflet-div-icon'
});

const iconElevator = new L.Icon({
    iconUrl: elevator,
    iconRetinaUrl: elevator,
    iconSize: new L.Point(30, 30),
    className: 'leaflet-div-icon'
});

export default {
    iconTraffic,
    iconLandmark,
    iconShop,
    iconRestroom,
    iconElevator,
};
