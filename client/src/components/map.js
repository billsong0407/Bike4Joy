import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

const Map = withScriptjs(withGoogleMap((props) =>
    <GoogleMap defaultZoom={props.zoom} defaultCenter={{ lat: props.lat, lng: props.lng}}>
        {props.mapData.map(parking => (
            <Marker 
                key={parking.properties._id}
                position={{
                    lat: parking.geometry.coordinates[1],
                    lng: parking.geometry.coordinates[0],
                }}
            />
        ))} 
    </GoogleMap>
));

export default Map;