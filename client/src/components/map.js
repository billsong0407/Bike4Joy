import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';

import "../css/map.css";

function CustomMap(props) {
    // declare state for clicking the marker on the map
    const [selectedPlace, setSelectedPlace] = useState(null)

    // use effects when a key is pressed
    useEffect(() => {
        const listener = e => {
        if (e.key === "Escape") {
            setSelectedPlace(null);
        }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);
    return (
        // Google Map Initialization 
        <GoogleMap defaultZoom={props.zoom} defaultCenter={{ lat: props.lat, lng: props.lng}}>
            {props.mapData.map(parking => (
                // Place markers on map 
                <Marker 
                    key={parking.properties._id}
                    // Based on latitude and longitude of the place 
                    position={{
                        lat: parking.geometry.coordinates[1],
                        lng: parking.geometry.coordinates[0],
                    }}
                    // events when clicked on a marker
                    onClick={() => {
                        setSelectedPlace(parking)
                    }}
                />
            ))} 
            {/* if a marker is selected, display info window */}
            {selectedPlace && (
                <InfoWindow
                    // info window open at clicked location
                    position = {{
                        lat: selectedPlace.geometry.coordinates[1],
                        lng: selectedPlace.geometry.coordinates[0],
                    }}
                    // after clicking the close button
                    onCloseClick={() => {
                        setSelectedPlace(null);
                    }}
                >
                    {/* Display location information */}
                    <div className="infoWindow" style={{fontWeight: 'bold', color: 'blue'}}>
                        <p>{selectedPlace.properties.ADDRESS_FULL}</p>
                        <p>{selectedPlace.properties.POSTAL_CODE}</p>
                        <p>{selectedPlace.properties.PARKING_TYPE}</p>
                        <p>Capacity: {selectedPlace.properties.BICYCLE_CAPACITY}</p>
                        {props.showLink && (
                            <p><a href="./single">More Details</a></p>
                        )}
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>

    )
}

const Map = withScriptjs(withGoogleMap(CustomMap));

export default Map;