import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Fade } from "reactstrap";
import Plot from "react-plotly.js";
import axios from "axios";

const Tools = (props) => {
  const [firstCurr, setFirstCurr] = useState("");
  const [secondCurr, setSecondCurr] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  const toggle = () => setFadeIn(!fadeIn);

  const onChangeFirstCurr = (e) => {
    setFirstCurr(e.target.value);
  };

  const onChangeSecondCurr = (e) => {
    setSecondCurr(e.target.value);
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
          parseFloat(res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
        );
      })
      .catch((err) => console.log(err));
    toggle();
  };

  return (
    <div className="mt-5 container">
      <h1>Exchange Rates</h1>
      <p>
        Enter currency codes below to get the current exchange rate.
      </p>
      <p>You can find a list of currency codes <a href="https://www.iban.com/currency-codes">here.</a></p>
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
        <p className='pt-3'>TO</p>
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
      <h1 className="mt-4">Investment Calculator</h1>
      <Form inline className="form-group-row">
        <FormGroup>
          <Label for="amount">Starting Amount:</Label>
          <Input type="number" name="amount" id="amount" placeholder="$1,000" />
        </FormGroup>
        <FormGroup>
          <Label for="contribution">Additional Contribution:</Label>
          <Input
            type="number"
            name="contribution"
            id="contribution"
            placeholder="$100"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Period:</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>Weekly</option>
            <option>Bi-Weekly</option>
            <option>Quarterly</option>
            <option>Semi-Annually</option>
            <option>Annually</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="rate">Rate of Return:</Label>
          <Input type="number" name="rate" id="rate" placeholder="5.00%" />
        </FormGroup>
        <FormGroup>
          <Label for="grow">Years to Grow:</Label>
          <Input type="number" name="grow" id="grow" placeholder="10" />
        </FormGroup>
      </Form>

      <div className="" style={{ width: "100%", height: "100%" }}>
        <Plot
          className="d-flex justify-content-center"
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          data={[
            {
              x: [1, 2, 3],
              y: [1, 2, 3],
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
