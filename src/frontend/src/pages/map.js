import {
    useJsApiLoader,
    GoogleMap,
    MarkerF,
    Marker
  } from '@react-google-maps/api'
  import React from 'react';
  import { useRef, useState } from 'react'
  import Navbar from '../components/Navbar'
  
  const center = { lat: 34.068920, lng: -118.445183 };
  const containerStyle = {width: '400px', height: '400px'};
  
  function Map({newlatlng}) {
      const [markerPosition, setMarkerPosition] = useState(center);
      
      const { isLoaded } = useJsApiLoader({
          id:"google-maps-script",
          libraries: ['places'],
      })
      if (!isLoaded) {
          return <div></div>
      } 

      const handleMapClick = (event) =>{
        const latLng = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        setMarkerPosition(latLng);
        newlatlng(latLng.lat, latLng.lng);
      };

      
      return (
          <div className="map">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onClick={handleMapClick}
                options={{streetViewControl: false}}
            >
                <Marker
                    position={markerPosition}
                    draggable={true}
                    onDragEnd={handleMapClick}
                />
            </GoogleMap>
          </div>
      );
  }
  
  export default Map;