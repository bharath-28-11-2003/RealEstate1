import React from 'react'
import { Popup } from 'react-leaflet'
import { Marker } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { Icon } from 'leaflet'
import marker from ""

import "./pin.scss";


const myIcon = new Icon({
  iconUrl: "/location.png",
  iconSize: [32,32]
 })
const Pin = ({item}) => {
  return (
    <Marker position={[item.latitude,item.longitude]} icon={myIcon}>
        <Popup>
           <div className="popupContainer">
           <img src={item.img} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
           </div>
        </Popup>
    </Marker>
 
  )
}

export default Pin