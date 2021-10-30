import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';

function CustomMap(props) {
    const [selectedPlace, setSelectedPlace] = useState(null)

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
        <GoogleMap defaultZoom={props.zoom} defaultCenter={{ lat: props.lat, lng: props.lng}}>
            {props.mapData.map(parking => (
                <Marker 
                    key={parking.properties._id}
                    position={{
                        lat: parking.geometry.coordinates[1],
                        lng: parking.geometry.coordinates[0],
                    }}
                    onClick={() => {
                        setSelectedPlace(parking)
                    }}
                />
            ))} 
            {selectedPlace && (
                <InfoWindow
                    position = {{
                        lat: selectedPlace.geometry.coordinates[1],
                        lng: selectedPlace.geometry.coordinates[0],
                    }}
                    onCloseClick={() => {
                        setSelectedPlace(null);
                    }}
                >
                    <div style={{fontWeight: 'bold', color: 'blue'}}>
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