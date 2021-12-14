import React from 'react'
import { Marker, Popup, Tooltip } from "react-leaflet";
import {IconLocation} from "./IconLocation";


const MarkersPopup = ({id,lat,lon}) => {
    return (
        <div>
            <Marker position={[lat,lon]} icon={IconLocation}>
                <Tooltip>Nodo Sensor: {id}</Tooltip>
                <Popup>Nodo Sensor: {id}, Lat: {lat}, Lon: {lon}</Popup>
            </Marker>
        </div>
    )
}

export default MarkersPopup
