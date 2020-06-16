import React from 'react';
import { Toast, ToastBody, ToastHeader, Container, Row, Col, ButtonGroup, Button } from 'reactstrap';
import Plot from 'react-plotly.js' 

const Markets = (props) => {
  return (
    <div>
    <Container>
    <Row>
    <Col className='mt-4'>
    <ButtonGroup style={{width: '600px'}}>
      <Button>1D</Button>
      <Button>5D</Button>
      <Button>1MTH</Button>
      <Button>3MTH</Button>
      <Button>YTD</Button>
      <Button>1YR</Button>
      <Button>3YR</Button>
      <Button>5YR</Button>
      <Button>10YR</Button>
    </ButtonGroup>
    <Plot className=''
        data={[
        {
            type: 'bar',
            x: ['2016','2017','2018'],
            y: [500,600,700],
            base: [-500,-600,-700],
            hovertemplate: '%{base}',
            marker: {
            color: 'red'
            },
            name: 'expenses'
        },
        {
            type: 'bar',
            x: ['2016','2017','2018'],
            y: [300,400,700],
            base: 0,
            marker: {
            color: 'blue'
            },
            name: 'revenue'
        }]}
        layout={{width: 600, height: 600, title: 'Sector YTD Performace'}}
        config={{responsive: true}}
      />
    </Col>
    <Col>
      <div className="p-3 my-2 rounded d-flex justify-content-end">
        <Toast>
          <ToastHeader>
            Information Technology
          </ToastHeader>
          <ToastBody>
          </ToastBody>
        </Toast>
      </div>
    <div className="p-3 my-2 rounded d-flex justify-content-end">
        <Toast>
          <ToastHeader>
            Consumer Discretionary
          </ToastHeader>
          <ToastBody>
          </ToastBody>
        </Toast>
      </div>
      <div className="p-3 my-2 rounded d-flex justify-content-end">
        <Toast>
          <ToastHeader>
            Communcation Services
          </ToastHeader>
          <ToastBody>
          </ToastBody>
        </Toast>
      </div>
      <div className="p-3 my-2 rounded d-flex justify-content-end">
        <Toast>
          <ToastHeader>
            Health Care
          </ToastHeader>
          <ToastBody>
          </ToastBody>
        </Toast>
      </div>
      <div className="p-3 my-2 rounded d-flex justify-content-end">
        <Toast>
          <ToastHeader>
            Consumer Staples
          </ToastHeader>
          <ToastBody>
          </ToastBody>
        </Toast>
      </div>
      <div className="p-3 my-2 rounded d-flex justify-content-end">
        <Toast>
          <ToastHeader>
            Real Estate
          </ToastHeader>
          <ToastBody>
          </ToastBody>
        </Toast>
      </div>
      <div className="p-3 my-2 rounded d-flex justify-content-end">
        <Toast>
          <ToastHeader>
            Utilities
          </ToastHeader>
          <ToastBody>
          </ToastBody>
        </Toast>
      </div>
      <div className="p-3 my-2 rounded d-flex justify-content-end">
        <Toast>
          <ToastHeader>
            Materials
          </ToastHeader>
          <ToastBody>
          </ToastBody>
        </Toast>
      </div>
      <div className="p-3 my-2 rounded d-flex justify-content-end">
        <Toast>
          <ToastHeader>
            Industrials
          </ToastHeader>
          <ToastBody>
          </ToastBody>
        </Toast>
      </div>
      <div className="p-3 my-2 rounded d-flex justify-content-end">
        <Toast>
          <ToastHeader>
            Financials
          </ToastHeader>
          <ToastBody>
          </ToastBody>
        </Toast>
      </div>
      <div className="p-3 my-2 rounded d-flex justify-content-end">
        <Toast>
          <ToastHeader>
            Energy
          </ToastHeader>
          <ToastBody>
          </ToastBody>
        </Toast>
      </div>
      </Col>
      </Row>
      </Container>
      </div>
  );
};

export default Markets;