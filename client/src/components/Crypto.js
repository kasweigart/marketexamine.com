import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Plot from "react-plotly.js";

const Tools = (props) => {
  return (
    <div className="mt-5">
      <h1>Fundamental Crypto Asset Score (FCAS)</h1>
      <Form>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">
          </Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Enter crypto symbol..."
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
              value: 450,
              title: { text: "Health" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 1000] } },
            },
          ]}
          layout={{ title: `BTC`, autosize: true }}
        />
      </div>
    </div>
  );
};

export default Tools;
