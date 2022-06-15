import React from 'react';
import '../styles/styles.css';
import moment from 'moment';

const WeatherCardComponent = ({weatherData, event}) => (
  <div className="main">
    <div>
        <p className="day">Data e Hora: {moment(weatherData?.coord.dt).format("DD/MM/YYYY HH:mm:ss")}</p>
      </div>
      <p className="header">{weatherData?.name}</p>
      {weatherData?.weather ? (
       <div>
           <p className="day">Céu: {weatherData?.weather[0].description}</p>
        </div>
        ): (<div></div>)
      }
      <div>
        <p className="day">Vento: {weatherData?.wind?.speed}</p>
      </div>
      <div>
        <p className="temp">Temperatura: {weatherData.main?.temp} &deg;C</p>
      </div>
      <div>
        <button onClick={event}>Atualizar Dados</button>
      </div>
  </div>
)

export default WeatherCardComponent;