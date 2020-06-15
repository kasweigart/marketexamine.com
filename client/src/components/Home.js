
import React, { useState, useEffect } from 'react';
import {  Alert, Input, Form, FormGroup, Label} from 'reactstrap';
import axios from 'axios'
import Plot from 'react-plotly.js' 

const Home = () => {

  const [stockChartXValues, setStockChartXValues] = useState([])
  const [stockChartYValues, setStockChartYValues] = useState([])
  
  
    const apiKey = 'ATV02GHO65FWCYOC'
    let stockSymbol = 'AMZN'
    let apiCall = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${apiKey}`

    useEffect(() => {
      axios.get(apiCall)
        .then(res => {
          console.log(res)
          for (var key in res.data['Time Series (Daily)']) {
             setStockChartXValues(prevArr => [...prevArr, key])
              setStockChartYValues(prevArr => [...prevArr, res.data['Time Series (Daily)'][key]['1. open']])
              
      }
    })
        .catch(err => {
          console.log(err)
    })
      
    }, [])

    
  

  return (
    <div>
    <Alert color='warning mt-3'>
      This site is currently under construction.
    </Alert>
      <Plot
      className='d-flex justify-content-center'
          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 720, height: 720, title: `${stockSymbol}`, }}
        />
        </div>
  );
};

export default Home;