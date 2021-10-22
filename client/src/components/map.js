import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
function Map(){
    return (
        <GoogleMap defaultZoom={13} defaultCenter={{ lat: 43.6532, lng: -79.3832}}
        />     
    )
}

const CityMap = withScriptjs(withGoogleMap(Map));

export default CityMap;