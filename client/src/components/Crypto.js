import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import Plot from "react-plotly.js";
import axios from "axios";

const Tools = (props) => {
  const [cryptoSymbol, setCryptoSymbol] = useState("");
  const [cryptoValue, setCryptoValue] = useState("");
  const [fcasRating, setFacsRating] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get("/crypto/api")
      .then((res) => {
        setTitle(
          res.data["Crypto Rating (FCAS)"]["1. symbol"].bold() +
            " " +
            res.data["Crypto Rating (FCAS)"]["2. name"]
        );
        setCryptoValue(res.data["Crypto Rating (FCAS)"]["4. fcas score"]);
        setFacsRating(res.data["Crypto Rating (FCAS)"]["3. fcas rating"]);
      })
      .catch((err) => console.log(err));
  }, []);

  const onChangeCryptoSymbol = (e) => {
    setCryptoSymbol(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cryptoData = {
      cryptoSymbol,
    };

    axios
      .post("/crypto/api", cryptoData)
      .then((res) => {
        setTitle(
          res.data["Crypto Rating (FCAS)"]["1. symbol"].bold() +
            " " +
            res.data["Crypto Rating (FCAS)"]["2. name"]
        );
        setCryptoValue(res.data["Crypto Rating (FCAS)"]["4. fcas score"]);
        setFacsRating(res.data["Crypto Rating (FCAS)"]["3. fcas rating"]);
        setCryptoValue("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-5 container">
      <h1>Fundamental Crypto Asset Score (FCAS)</h1>
      <Form
        className="d-flex justify-content-center mb-3"
        onSubmit={handleSubmit}
      >
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="text" className="mr-sm-2"></Label>
          <Input
            type="text"
            name="text"
            id="exampleEmail"
            placeholder="Enter crypto symbol..."
            value={cryptoSymbol}
            onChange={onChangeCryptoSymbol}
          />
        </FormGroup>
      </Form>
      <div className="" style={{ width: "100%", height: "100%" }}>
        <Plot
          className="d-flex justify-content-center"
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          data={[
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: cryptoValue,
              title: { text: fcasRating },
              type: "indicator",
              mode: "gauge+number",
              gauge: { axis: { range: [null, 1000] } },
            },
          ]}
          layout={{ title: title, autosize: true }}
        />
      </div>
    </div>
  );
};

export default Tools;
