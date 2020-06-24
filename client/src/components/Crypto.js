import React from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Plot from 'react-plotly.js'

const Tools = (props) => {
  return (
    <div className='mt-5'>
    <h1>Crypto Currency Exchange Rates</h1>
    <Form inline>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="exampleEmail" className="mr-sm-2">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="examplePassword" className="mr-sm-2">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" />
      </FormGroup>
      <Button>Submit</Button>
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
