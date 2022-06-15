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
    console.log('entrou dados');
    const dataFromAxios =  await services.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`)
    setData(dataFromAxios.data);
  }

  const getLocation =async () => {
    
    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(function(pos) {
        console.log(pos);
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        setTimeStamp(pos.timestamp)
      });
    }
  }

  useEffect(() => {
   
      getLocation();
      
      if (data) {
        getData();
      }
     
}, [data])
// useEffect(() => {
//   if (latitude && longitude) {
//     getData();
//   }
// })

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