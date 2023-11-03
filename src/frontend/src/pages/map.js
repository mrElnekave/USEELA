import {
    useJsApiLoader,
    GoogleMap,
    MarkerF,
  } from '@react-google-maps/api'
  import { useRef, useState } from 'react'
  import Navbar from '../components/Navbar'
  
  const center = { lat: 34.068920, lng: -118.445183 }
  
  function Map() {
      const { isLoaded } = useJsApiLoader({
          id:"google-maps-script",
          googleMapsApiKey: process.env.REACT_GOOGLE_MAP_KEY,
          libraries: ['places'],
      })
      if (!isLoaded) {
          return <div></div>
      } 
      const onLoad = (marker) => {
          console.log(marker.getPosition().lat())
          console.log(marker.getPosition().lng())
  
      }
      const dragged = (marker) => {
          console.log(marker.latLng.lat())
          console.log(marker.latLng.lng())
      }
      
      return (
          <div className="map">
            <Navbar></Navbar>
            <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}>
            <MarkerF onLoad={onLoad} position={{
            lat: center.lat,
            lng: center.lng,
        }} draggable={true} onDragEnd={dragged}></MarkerF>
            </GoogleMap>
          </div>
      )
  }
  
  
  
  export default Map;