import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import {
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Button,
} from "reactstrap";
import axios from "axios";

const MyWatchlist = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [stockSymbol, setStockSymbol] = useState("");
  const [stocks, setStocks] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const onChangeStockSymbol = (e) => {
    setStockSymbol(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "/user/my-watchlist",
      headers: {
        Authorization: `Bearer ${localStorage.usertoken}`,
      },
      data: {
        stockSymbol: stockSymbol,
      },
    }).then((res) => console.log(res));
  };

  useEffect(() => {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);

    if (localStorage.usertoken) {
      setName(decoded.name);
      setEmail(decoded.email);
    } else {
      setMessage(
        <Alert color="danger">
          You must create an account and log in to access this feature.
        </Alert>
      );
    }

    axios
      .get("/user/my-watchlist", {
        headers: {
          Authorization: `Bearer ${localStorage.usertoken}`,
        },
      })
      .then(
        (res) => {
          setStocks(res.data.watchlist);
          setDataLoaded(true);
        },
        (err) => {
          console.log(err);
        }
      );
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      axios({
        method: "post",
        url: "/user/api/my-watchlist",
        headers: {
          Authorization: `Bearer ${localStorage.usertoken}`,
        },
        data: {
          stocks: stocks.map((stock) => stock.name).join(),
        },
      }).then((res) => {
        setStockData(Object.values(res.data));
      });
    }
  }, [dataLoaded]);

  const tableRow = stockData.map((stock) => {
    console.log(stockData)
    return (
      <tr>
        <th scope="row">{stockData.indexOf(stock) + 1}</th>
        <td>{stock.quote.companyName}</td>
        <td>{stock.quote.symbol}</td>
        <td>${stock.quote.close}</td>
        <td>
          <Button color="danger">Delete</Button>
        </td>
      </tr>
    );
  });

  return (
    <div className="mt-5 container">
      <h1>My Watchlist</h1>
      <p>Add up to five stocks of your choice and view their current prices.</p>
      <Form className="d-flex justify-content-center" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="search"></Label>
          <Input
            type="text"
            name="add"
            id="add"
            placeholder="Add stock symbol..."
            value={stockSymbol}
            onChange={onChangeStockSymbol}
          />
        </FormGroup>
      </Form>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableRow}</tbody>
      </Table>
    </div>
  );
};

export default MyWatchlist;
