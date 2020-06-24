import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Plot from 'react-plotly.js'

const Tools = (props) => {
  return (
    <div className='mt-5'>
    <h1>Total Stock Return Calculator</h1>
    <Form className='col-xs-3'>
      <FormGroup>
        <Label for="amount">Starting Amount:</Label>
        <Input
          type="number"
          name="amount"
          id="amount"
          placeholder="$1,000"
        />
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
        <Input
          type="number"
          name="rate"
          id="rate"
          placeholder="5.00%"
        />
      </FormGroup>
      <FormGroup>
        <Label for="grow">Years to Grow:</Label>
        <Input
          type="number"
          name="grow"
          id="grow"
          placeholder="10"
        />
      </FormGroup>
    </Form>
    <div className='' style={{width: '100%', height: '100%'}}>
      <Plot
        className="d-flex justify-content-center"
        useResizeHandler={true}
        style={{width: '100%', height: '100%'}}
        data={[
          {
            x: [1,2,3],
            y: [1,2,3],
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
