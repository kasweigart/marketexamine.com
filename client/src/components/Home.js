import React, { useState, useEffect } from "react";
import { Input, Form, FormGroup, Label, Alert } from "reactstrap";
import axios from "axios";
import Plot from "react-plotly.js";

const Home = () => {
  const [stockChartXValues, setStockChartXValues] = useState([]);

  const [stockChartOpenYValues, setStockChartOpenYValues] = useState([]);
  const [stockChartHighYValues, setStockChartHighYValues] = useState([]);
  const [stockChartLowYValues, setStockChartLowYValues] = useState([]);
  const [stockChartCloseYValues, setStockChartCloseYValues] = useState([]);

  const [stockChartSMAYValues, setStockChartSMAYValues] = useState([]);

  const [stockChartEMAYValues, setStockChartEMAYValues] = useState([]);

  const [stockSymbol, setStockSymbol] = useState("");
  const [title, setTitle] = useState("VOO");

  const [message, setMessage] = useState('')

  const onChangeStockSymbol = (e) => {
    setStockSymbol(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setStockChartXValues([]);

    setStockChartOpenYValues([]);
    setStockChartHighYValues([]);
    setStockChartLowYValues([]);
    setStockChartCloseYValues([]);

    const stockData = {
      stockSymbol,
    };

    axios
      .post("/home/api/price", stockData)
      .then((res) => {
        // console.log(res.data);
        setTitle(res.data["Meta Data"]["2. Symbol"].toUpperCase());
        for (var key in res.data["Time Series (Daily)"]) {
          setStockChartXValues((prevArr) => [...prevArr, key]);
          setStockChartOpenYValues((prevArr) => [
            ...prevArr,
            res.data["Time Series (Daily)"][key]["1. open"],
          ]);
          setStockChartHighYValues((prevArr) => [
            ...prevArr,
            res.data["Time Series (Daily)"][key]["2. high"],
          ]);
          setStockChartLowYValues((prevArr) => [
            ...prevArr,
            res.data["Time Series (Daily)"][key]["3. low"],
          ]);
          setStockChartCloseYValues((prevArr) => [
            ...prevArr,
            res.data["Time Series (Daily)"][key]["4. close"],
          ]);
        }
      })
      .catch((err) => console.log(err));

      axios
      .post("/home/api/sma", stockData)
      .then((res) => {
        // console.log(res.data);
        let dataObj = ((Object.values(res.data["Technical Analysis: SMA"])).reverse()).slice(2351)
        for (var key in dataObj) {
          setStockChartXValues((prevArr) => [...prevArr, key]);
          setStockChartSMAYValues((prevArr) => [...prevArr, dataObj[key].SMA]);
        }
      })
      .catch((err) => console.log(err));

      axios
      .post("/home/api/ema", stockData)
      .then((res) => {
        // console.log(res.data);
        let dataObj = ((Object.values(res.data["Technical Analysis: EMA"])).reverse()).slice(2351)
        for (var key in dataObj) {
          setStockChartXValues((prevArr) => [...prevArr, key]);
          setStockChartEMAYValues((prevArr) => [...prevArr, dataObj[key].EMA]);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!localStorage.usertoken) {
      setMessage(<Alert className='mt-3' color="success">Sign up to start your own stock watch-list!</Alert>)
    }

    axios
      .get("/home/api")
      .then((res) => {
        console.log(res.data);
        for (var key in res.data["Time Series (Daily)"]) {
          setStockChartXValues((prevArr) => [...prevArr, key]);
          setStockChartOpenYValues((prevArr) => [
            ...prevArr,
            res.data["Time Series (Daily)"][key]["1. open"],
          ]);
          setStockChartHighYValues((prevArr) => [
            ...prevArr,
            res.data["Time Series (Daily)"][key]["2. high"],
          ]);
          setStockChartLowYValues((prevArr) => [
            ...prevArr,
            res.data["Time Series (Daily)"][key]["3. low"],
          ]);
          setStockChartCloseYValues((prevArr) => [
            ...prevArr,
            res.data["Time Series (Daily)"][key]["4. close"],
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/home/api/sma")
      .then((res) => {
        // console.log(res.data);
        let dataObj = ((Object.values(res.data["Technical Analysis: SMA"])).reverse()).slice(2351)
        for (var key in dataObj) {
          // setStockChartXValues((prevArr) => [...prevArr, key]);
          setStockChartSMAYValues((prevArr) => [...prevArr, dataObj[key].SMA]);
        }
      })
      .catch((err) => console.log(err));

      axios
      .get("/home/api/ema")
      .then((res) => {
        // console.log(res.data);
        let dataObj = ((Object.values(res.data["Technical Analysis: EMA"])).reverse()).slice(2351)
        for (var key in dataObj) {
          // setStockChartXValues((prevArr) => [...prevArr, key]);
          setStockChartEMAYValues((prevArr) => [...prevArr, dataObj[key].EMA]);
        }
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className="container">
    {message}
      <Form className="d-flex justify-content-center" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="search"></Label>
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Enter stock symbol..."
            value={stockSymbol}
            onChange={onChangeStockSymbol}
          />
        </FormGroup>
      </Form>
      <div>
        <Plot
          className="d-flex justify-content-center"
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          data={[
            {
              name: `${title} (Daily)`,
              x: stockChartXValues,
              close: stockChartCloseYValues,
              decreasing: { line: { color: "red" } },
              high: stockChartHighYValues,
              increasing: { line: { color: "#00FF00" } },
              line: { color: "blue" },
              low: stockChartLowYValues,
              open: stockChartOpenYValues,
              type: "candlestick",
              xaxis: "x",
              yaxis: "y",
            },
            {
              name: "SMA(20)",
              x: stockChartXValues,
              y: stockChartSMAYValues,
              type: "path",
              line: { shape: "spline", smoothing: 1.3 },
              mode: "lines",
              marker: { color: "blue" },
            },
            {
              name: "EMA(20)",
              x: stockChartXValues,
              y: stockChartEMAYValues,
              type: "path",
              line: { shape: "spline", smoothing: 1.3 },
              mode: "lines",
              marker: { color: "orange" },
            },
          ]}
          layout={{
            title: `${title} Daily Price, SMA(20), EMA(20)`,
            autosize: true,
            dragmode: "zoom",
            margin: { r: 10, t: 25, b: 40, l: 60 },
            xaxis: {
              autorange: true,
              title: "Date",
              type: "date",
            },
            yaxis: {
              type: "linear",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Home;
