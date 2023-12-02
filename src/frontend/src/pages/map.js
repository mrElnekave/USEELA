import {
    useJsApiLoader,
    GoogleMap,
    MarkerF,
    Marker,
    Polyline,
    InfoWindow
  } from '@react-google-maps/api'
  import React from 'react';
  import { useRef, useState, useEffect } from 'react'
  import Navbar from '../components/Navbar'
  
  const center = { lat: 34.068920, lng: -118.445183 };
  const containerStyle = {width: '400px', height: '400px'};
  
  function Map({newlatlng, showAnswer, answerPosition, isFullScreen, dist}) {
      const [markerPosition, setMarkerPosition] = useState(center);
      const [distance, setDistance] = useState(0);
      
      useEffect(()=>{
        setDistance(dist);
      },[dist]);

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
        console.log("map's lon: " + latLng.lng);
        newlatlng(latLng.lat, latLng.lng);
      };

      const mapStyle = isFullScreen ? { transform: 'scale(1)', opacity: 1, } : containerStyle;
      const Center = isFullScreen ? {lat: answerPosition.lat, lng: answerPosition.lng} : center;
      
      return (
          <div className="map" style={mapStyle}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={Center}
                zoom={15}
                onClick={handleMapClick}
                options={{streetViewControl: false}}
            >
                <Marker
                    position={markerPosition}
                    draggable={true}
                    onDragEnd={handleMapClick}
                />
                {showAnswer && (
                    <>
                        <Marker
                        position = {answerPosition}
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                        }}
                        />
                        {isFullScreen && (
                            <>
                                <Polyline 
                                    path={[
                                        {lat: markerPosition.lat, lng: markerPosition.lng},
                                        {lat: answerPosition.lat, lng: answerPosition.lng}
                                    ]}
                                    options={{
                                        strokeColor: "#000",
                                        strokeOpacity: 1,
                                        strokeWeight: 2,
                                        geodesic: true,
                                    }}
                                />
                                <InfoWindow position={{lat:(markerPosition.lat + answerPosition.lat)/2, lng:(markerPosition.lng + answerPosition.lng)/2}}>
                                    <div>
                                        <p>Distance: {distance}m</p>
                                    </div>
                                </InfoWindow>
                            </>
                        )}
                    </>
                )}
            </GoogleMap>
          </div>
      );
  }
  
  export default Map;