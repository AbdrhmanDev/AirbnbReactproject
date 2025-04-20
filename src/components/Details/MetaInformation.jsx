import React from 'react'
import './Details.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
const MetaInformation = ({ address,images }) => {

    const position = address?.coordinates
        ? [address.coordinates[1], address.coordinates[0]]
        : [30.033333, 31.233334];
    console.log(address.coordinates);
    const customIcon = new L.Icon({
        iconUrl: images?.[0], 
        iconSize: [50, 50],       
        iconAnchor: [30, 70],    
        popupAnchor: [0, -40], 
        className:"adsads21"    
    });

    return (
        <>
            <div className="row mt-3 border-top pt-4 w-75 m-auto">
                <h6>Where you’ll be</h6>
                <span>Saint-Mandé, Île-de-France, France
                </span>
                <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position} icon={customIcon}>
                        <Popup>{address.city} {address.country}</Popup>
                    </Marker>
                </MapContainer>
                <div className="mt-3">
                    <span>
                        We verified that this listing’s location is accurate..
                    </span>
                    <span>
                        <button type="button" className="btn-dark border-0 bg-body ms-2 p-0  text-decoration-underline">
                            Learn more</button>
                    </span>
                </div>
            </div>

            <div className="mt-5 border-top pt-4 w-75 m-auto">
                <h4>Neighborhood highlights</h4>
                <span>A lot of shops around, restaurants, Vincennes wood
                </span>

                <div className="mt-3">
                    <span>
                        <button type="button" className="btn-dark border-0 bg-body ms-2 p-0  text-decoration-underline">
                            Show more</button> <span>  </span>
                    </span>
                </div>
            </div>
        </>
    )
}

export default MetaInformation