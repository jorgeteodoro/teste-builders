import services from '../services/services';
import {APIKEY} from '../constants/constants';
import React, { useEffect, useState } from "react";
import WeatherCardComponent from '../components/WeatherCardComponent';

export default function PrevisaoTempo() {
 
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [timeStamp, setTimeStamp] = useState([]);
  const [data, setData] = useState([]);

  const getData = async() => {


    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(function(pos) {
        // console.log(pos);
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        setTimeStamp(pos.timestamp)
      });
    }

    const dataFromAxios =  await services.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=pt&appid=${APIKEY}`)
    setData(dataFromAxios.data);
  }

  // const getLocation =async () => {
    
  //   if (navigator.geolocation) {
      
  //     navigator.geolocation.getCurrentPosition(function(pos) {
  //       console.log(pos);
  //       setLatitude(pos.coords.latitude);
  //       setLongitude(pos.coords.longitude);
  //       setTimeStamp(pos.timestamp)
  //     });
  //   }
  // }

  useEffect(() => {
   
      // getLocation();
      
      if (latitude && longitude) {
        getData();
      }
     
}, [latitude, longitude])

// useEffect(() => {
//   if (latitude && longitude) {
//     getData();
//   }
// }, [data])

return (
  <div className="App">
    {data ? (
      <WeatherCardComponent weatherData={data} event={getData}/>
    ): (
      <div>Não foi possível carregar os dados.</div>
    )}
  </div>
);
};