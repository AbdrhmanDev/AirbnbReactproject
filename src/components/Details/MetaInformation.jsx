import React from 'react'
import './Details.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
const MetaInformation = ({ address, images }) => {

  const isValidCoordinates = Array.isArray(address?.coordinates) &&
  address.coordinates.length === 2 &&
  typeof address.coordinates[0] === 'number' &&
  typeof address.coordinates[1] === 'number';

const position = isValidCoordinates
  ? [address.coordinates[1], address.coordinates[0]]
  : [30.033333, 31.233334];


  const customIcon = new L.Icon({
    iconUrl: images?.[0],
    iconSize: [50, 50],
    iconAnchor: [30, 70],
    popupAnchor: [0, -40],
    className: "adsads21"
  });

  return (
    <>
      <div className="row justify-content-center mt-3 m-2 border-top pt-4 w-md-75">
        <div className="col-12 col-lg-9">
          <h6>Where you’ll be</h6>
          <span>Saint-Mandé, Île-de-France, France</span>
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "450px", width: "100%" }}
            className="rounded-2"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={customIcon}>
              <Popup>{address?.city} {address?.country}</Popup>
            </Marker>
          </MapContainer>

          <div className="mt-3 m-3">
            <span>
              We verified that this listing’s location is accurate..
            </span>
            <span>
              <button
                type="button"
                className="btn-dark border-0 bg-body ms-2 p-0 text-decoration-underline"
              >
                Learn more
              </button>
            </span>
            <div className="border-top pt-2 w-100 mt-3 m-auto">
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
          </div>
        </div>
      </div>
    </>
  )
}

export default MetaInformation