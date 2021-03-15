import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Tooltip,  } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// import { createControlComponent } from '@react-leaflet/core'
// import { Control } from 'leaflet'

function Maps({data, configuration}) {
    return (
        <div>
            <MapContainer center={[3.4620923, -76.4893959]} zoom={13} scrollWheelZoom={true} style={{width:'100%', height:'500px', marginBottom:'7%'}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[3.4992192, -76.4876476]}>
                    <Popup>Popup for Marker</Popup>
                    <Tooltip>Tooltip for Marker</Tooltip>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Maps
