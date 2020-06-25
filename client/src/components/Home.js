import React, { useState, useEffect } from "react";
import { Alert, Input, Form, FormGroup, Label } from "reactstrap";
import axios from "axios";
import Plot from "react-plotly.js";

const Home = () => {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [stockSymbol, setStockSymbol] = useState("AMZN");

  const changeStockSymbol = (e) => {
    e.preventDefault();
    setStockChartXValues([]);
    setStockChartYValues([]);
    setStockSymbol(document.getElementById("search").value.toUpperCase());
  };

  useEffect(() => {
    const apiKey = "ATV02GHO65FWCYOC";
    let apiCall = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${apiKey}`;

    axios
      .get(apiCall)
      .then((res) => {
        console.log(res);
        for (var key in res.data["Time Series (Daily)"]) {
          setStockChartXValues((prevArr) => [...prevArr, key]);
          setStockChartYValues((prevArr) => [
            ...prevArr,
            res.data["Time Series (Daily)"][key]["1. open"],
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stockSymbol]);

  // axios
  //   .get("http://localhost:3001/user")
  //   .then((res) => {
  //     setData(res.data)
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return (
    <div>
      <Form
        className="d-flex justify-content-center"
        onSubmit={changeStockSymbol}
      >
        <FormGroup>
          <Label for="search"></Label>
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Enter symbol..."
          />
        </FormGroup>
      </Form>
      <div>
      <Plot
        className="d-flex justify-content-center"
        useResizeHandler={true}
        style={{width: '100%', height: '100%'}}
        data={[
          {
            x: stockChartXValues,
            y: stockChartYValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
        ]}
        layout={{ title: `${stockSymbol}`, autosize: true }}
      />
      </div>
      <div>
      <Plot
        className="d-flex justify-content-center"
        useResizeHandler={true}
        style={{width: '100%', height: '100%'}}
        data={[
          {
            x: stockChartXValues,
            y: stockChartYValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
        ]}
        layout={{ title: `${stockSymbol}`, autosize: true }}
      />
      </div>
    </div>
  );
};

export default Home;
