import React, {Component} from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
import * as data from '../data/bike_parking.json';
const Map = withScriptjs(withGoogleMap((props) =>
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 43.6532, lng: -79.3832}}>

        {data.features.map(parking => (
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
       
    // <GoogleMap defaultZoom={12} defaultCenter={{ lat: 43.6532, lng: -79.3832}}>
    //     {props.data.features.map(parking => (
    //         <Marker 
    //             key={parking.properties._id}
    //             position={{
    //                 lat: parking.geometry.coordinates[1],
    //                 lng: parking.geometry.coordinates[0],
    //             }}
    //         />
    //     ))}    
    // </GoogleMap>


//  = withScriptjs(withGoogleMap(Map));

export default Map;