import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Plot from "react-plotly.js";
import axios from "axios";

const Tools = (props) => {
  const [firstCurr, setFirstCurr] = useState("");
  const [secondCurr, setSecondCurr] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");

  const [amount, setAmount] = useState("");
  const [contribution, setContribution] = useState("");
  const [period, setPeriod] = useState("");
  const [rateOfReturn, setRateOfReturn] = useState("");
  const [yearsToGrow, setYearsToGrow] = useState("");
  const [investment, setInvestment] = useState("");
  const [investmentXValues, setInvestmentXValues] = useState([]);
  const [investmentYValues, setInvestmentYValues] = useState([]);

  const onChangeFirstCurr = (e) => {
    setFirstCurr(e.target.value);
  };

  const onChangeSecondCurr = (e) => {
    setSecondCurr(e.target.value);
  };

  const onChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const onChangeContribution = (e) => {
    setContribution(e.target.value);
  };

  const onChangePeriod = (e) => {
    setPeriod(e.target.value);
  };

  const onChangeRateOfReturn = (e) => {
    setRateOfReturn(e.target.value);
  };

  const onChangeYearsToGrow = (e) => {
    setYearsToGrow(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const exchangeData = {
      firstCurr,
      secondCurr,
    };

    axios
      .post("/tools/api", exchangeData)
      .then((res) => {
        console.log(res);
        setExchangeRate(
          parseFloat(
            res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleInvestSubmit = (e) => {
    e.preventDefault();

    let periodInterval;

    if (period == "Weekly") {
      periodInterval = 52;
    }
    if (period == "Bi-Weekly") {
      periodInterval = 26;
    }
    if (period == "Monthly") {
      periodInterval = 12;
    }
    if (period == "Quarterly") {
      periodInterval = 3;
    }
    if (period == "Semi-Annually") {
      periodInterval = 2;
    }
    if (period == "Annually") {
      periodInterval = 1;
    }

    setInvestment(
      "$" +
        (
          amount *
          (1 + rateOfReturn / 100 / periodInterval) **
            (periodInterval * yearsToGrow)
        ).toFixed(2)
    );

    setInvestmentXValues(() => {
      let yearsArr = [];
      for (let i = 1; i <= yearsToGrow; i++) {
        yearsArr.push(i)
      }
      return yearsArr
    })
  };

  return (
    <div className="mt-5 container">
      <h1>Exchange Rates</h1>
      <p>Enter currency codes below to get the current exchange rate.</p>
      <p>
        You can find a list of currency codes{" "}
        <a href="https://www.iban.com/currency-codes">here.</a>
      </p>
      <Form inline className="mb-2" onSubmit={handleSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="currency" className="mr-sm-2"></Label>
          <Input
            type="text"
            name="currency"
            id="currency"
            placeholder="USD"
            onChange={onChangeFirstCurr}
            value={firstCurr}
          />
        </FormGroup>
        <p className="pt-3">TO</p>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="currency2" className="mr-sm-2"></Label>
          <Input
            type="text"
            name="currency2"
            id="currency2"
            placeholder="EUR"
            onChange={onChangeSecondCurr}
            value={secondCurr}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
      <h1>{exchangeRate}</h1>
      <h1 className="mt-2">Compound Interest Calculator</h1>
      <Form inline className="form-group-row" onSubmit={handleInvestSubmit}>
        <FormGroup className="mb-3">
          <Label for="amount">Starting Amount:</Label>
          <Input
            type="number"
            name="amount"
            id="amount"
            placeholder="$1,000"
            className="m-2"
            onChange={onChangeAmount}
            value={amount}
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <Label for="exampleSelect">Period:</Label>
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            className="m-2"
            value={period}
            onChange={onChangePeriod}
            placeholder=""
          >
            <option selected="selected">Select Period</option>
            <option>Weekly</option>
            <option>Bi-Weekly</option>
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Semi-Annually</option>
            <option>Annually</option>
          </Input>
        </FormGroup>
        <FormGroup className="mb-3">
          <Label for="rate">Rate of Return:</Label>
          <Input
            type="number"
            name="rate"
            id="rate"
            placeholder="5.00%"
            className="m-2"
            value={rateOfReturn}
            onChange={onChangeRateOfReturn}
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <Label for="grow">Years to Grow:</Label>
          <Input
            type="number"
            name="grow"
            id="grow"
            placeholder="10"
            className="m-2"
            value={yearsToGrow}
            onChange={onChangeYearsToGrow}
          />
        </FormGroup>
        <Button className="mb-3">Submit</Button>
      </Form>
      <h1>{investment}</h1>
      <div className="" style={{ width: "100%", height: "100%" }}>
        <Plot
          className="d-flex justify-content-center"
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          data={[
            {
              x: investmentXValues,
              y: [1,2,3,4,5,6,7,8,9,10],
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
            },
          ]}
          layout={{ title: `Your Investment`, autosize: true }}
        />
      </div>
    </div>
  );
};

export default Tools;
