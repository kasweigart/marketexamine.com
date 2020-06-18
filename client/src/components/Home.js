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
      <Plot
        className="d-flex justify-content-center"
        data={[
          {
            x: stockChartXValues,
            y: stockChartYValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
        ]}
        layout={{ width: 720, height: 720, title: `${stockSymbol}` }}
      />
    </div>
  );
};

export default Home;
