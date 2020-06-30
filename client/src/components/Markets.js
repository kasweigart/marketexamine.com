import React, { useState, useEffect, useRef } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  ButtonGroup,
  Button,
} from "reactstrap";
import Plot from "react-plotly.js";
import axios from "axios";


//REWRITE CONTENT WITH LOOPS AND JSX. TOO MUCH COPY AND PASTE. VERY MESSY!


const Markets = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Real-Time Performance");
  const [commServices, setCommServices] = useState("");
  const [consumerDisc, setConsumerDisc] = useState("");
  const [consumerStaples, setConsumerStaples] = useState("");
  const [energy, setEnergy] = useState("");
  const [financials, setFinancials] = useState("");
  const [healthCare, setHealthCare] = useState("");
  const [industrials, setIndustrials] = useState("");
  const [infoTech, setInfoTech] = useState("");
  const [materials, setMaterials] = useState("");
  const [realEstate, setRealEstate] = useState("");
  const [utilities, setUtilities] = useState("");
  const [marketChartXValues, setMarketChartXValues] = useState([]);
  const [marketChartYValues, setMarketChartYValues] = useState([]);
  const [marketData, setMarketData] = useState({});
  const dataRef = useRef(marketData);

  useEffect(() => {
    axios
      .get("/markets/api")
      .then((res) => {
        console.log(res.data);
        setMarketData(res.data);
        setInfoTech(
          res.data["Rank A: Real-Time Performance"]["Information Technology"]
        );
        setCommServices(
          res.data["Rank A: Real-Time Performance"]["Communication Services"]
        );
        setConsumerDisc(
          res.data["Rank A: Real-Time Performance"]["Consumer Discretionary"]
        );
        setConsumerStaples(
          res.data["Rank A: Real-Time Performance"]["Consumer Staples"]
        );
        setEnergy(res.data["Rank A: Real-Time Performance"].Energy);
        setFinancials(res.data["Rank A: Real-Time Performance"].Financials);
        setHealthCare(res.data["Rank A: Real-Time Performance"]["Health Care"]);
        setIndustrials(res.data["Rank A: Real-Time Performance"].Industrials);
        setMaterials(res.data["Rank A: Real-Time Performance"].Materials);
        setRealEstate(res.data["Rank A: Real-Time Performance"]["Real Estate"]);
        setUtilities(res.data["Rank A: Real-Time Performance"].Utilities);
        setMarketChartXValues(
          Object.entries(res.data["Rank A: Real-Time Performance"]).map(
            ([key, value]) => {
              return key;
            }
          )
        );
        setMarketChartYValues(
          Object.entries(res.data["Rank A: Real-Time Performance"]).map(
            ([key, value]) => {
              return value;
            }
          )
        );
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    dataRef.current = marketData;
  });

  const trimPercent = (param) => {
    return param.substring(0, param.length - 1);
  };

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <p
        className="pl-4 mb-0 pt-2"
        style={{ backgroundColor: "#6c757d", color: "#00FF00" }}
      >
        Real-time Data
      </p>
      <Navbar color="secondary" light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="">
                Information Technology
                <p
                  style={{
                    color: trimPercent(infoTech) > 0 ? "#00FF00" : "red",
                  }}
                >
                  {infoTech}
                </p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">
                Consumer Discretionary
                <p
                  style={{
                    color: trimPercent(consumerDisc) > 0 ? "#00FF00" : "red",
                  }}
                >
                  {consumerDisc}
                </p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">
                Communcation Services
                <p
                  style={{
                    color: trimPercent(commServices) > 0 ? "#00FF00" : "red",
                  }}
                >
                  {commServices}
                </p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">
                Health Care
                <p
                  style={{
                    color: trimPercent(healthCare) > 0 ? "#00FF00" : "red",
                  }}
                >
                  {healthCare}
                </p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">
                Consumer Staples
                <p
                  style={{
                    color: trimPercent(consumerStaples) > 0 ? "#00FF00" : "red",
                  }}
                >
                  {consumerStaples}
                </p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">
                Real Estate
                <p
                  style={{
                    color: trimPercent(realEstate) > 0 ? "#00FF00" : "red",
                  }}
                >
                  {realEstate}
                </p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">
                Utilities
                <p
                  style={{
                    color: trimPercent(utilities) > 0 ? "#00FF00" : "red",
                  }}
                >
                  {utilities}
                </p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">
                Materials
                <p
                  style={{
                    color: trimPercent(materials) > 0 ? "#00FF00" : "red",
                  }}
                >
                  {materials}
                </p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">
                Industrials
                <p
                  style={{
                    color: trimPercent(industrials) > 0 ? "#00FF00" : "red",
                  }}
                >
                  {industrials}
                </p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">
                Financials
                <p
                  style={{
                    color: trimPercent(financials) > 0 ? "#00FF00" : "red",
                  }}
                >
                  {financials}
                </p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">
                Energy
                <p
                  style={{ color: trimPercent(energy) > 0 ? "#00FF00" : "red" }}
                >
                  {energy}
                </p>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <div className="container justify-content-center mt-4">
        <ButtonGroup>
          <Button
            id="RT"
            onClick={() => {
              setTitle("Real-Time Performance");
              setMarketChartXValues(
                Object.entries(
                  dataRef.current["Rank A: Real-Time Performance"]
                ).map(([key, value]) => {
                  return key;
                })
              );
              setMarketChartYValues(() =>
                Object.entries(
                  dataRef.current["Rank A: Real-Time Performance"]
                ).map(([key, value]) => {
                  return value;
                })
              );
            }}
          >
            RT
          </Button>
          <Button
            id="1D"
            onClick={() => {
              setTitle("1 Day Performance");
              setMarketChartXValues(
                Object.entries(
                  dataRef.current["Rank H: 3 Year Performance"]
                ).map(([key, value]) => {
                  return key;
                })
              );
              setMarketChartYValues(() =>
                Object.entries(
                  dataRef.current["Rank H: 3 Year Performance"]
                ).map(([key, value]) => {
                  return value;
                })
              );
            }}
          >
            1D
          </Button>
          <Button
            id="5D"
            onClick={() => {
              setTitle("5 Day Performance");
              setMarketChartXValues(
                Object.entries(
                  dataRef.current["Rank C: 5 Day Performance"]
                ).map(([key, value]) => {
                  return key;
                })
              );
              setMarketChartYValues(
                Object.entries(
                  dataRef.current["Rank C: 5 Day Performance"]
                ).map(([key, value]) => {
                  return value;
                })
              );
            }}
          >
            5D
          </Button>
          <Button
            id="1M"
            onClick={() => {
              setTitle("1 Month Performance");
              setMarketChartXValues(
                Object.entries(
                  dataRef.current["Rank D: 1 Month Performance"]
                ).map(([key, value]) => {
                  return key;
                })
              );
              setMarketChartYValues(() =>
                Object.entries(
                  dataRef.current["Rank D: 1 Month Performance"]
                ).map(([key, value]) => {
                  return value;
                })
              );
            }}
          >
            1M
          </Button>
          <Button
            id="3M"
            onClick={() => {
              setTitle("3 Month Performance");
              setMarketChartXValues(
                Object.entries(
                  dataRef.current["Rank E: 3 Month Performance"]
                ).map(([key, value]) => {
                  return key;
                })
              );
              setMarketChartYValues(() =>
                Object.entries(
                  dataRef.current["Rank E: 3 Month Performance"]
                ).map(([key, value]) => {
                  return value;
                })
              );
            }}
          >
            3M
          </Button>
          <Button
            id="YTD"
            onClick={() => {
              setTitle("1 Day Performance");
              setMarketChartXValues(
                Object.entries(
                  dataRef.current["Rank F: Year-to-Date (YTD) Performance"]
                ).map(([key, value]) => {
                  return key;
                })
              );
              setMarketChartYValues(() =>
                Object.entries(
                  dataRef.current["Rank F: Year-to-Date (YTD) Performance"]
                ).map(([key, value]) => {
                  return value;
                })
              );
            }}
          >
            YTD
          </Button>
          <Button
            id="1Y"
            onClick={() => {
              setTitle("1 Year Performance");
              setMarketChartXValues(
                Object.entries(
                  dataRef.current["Rank G: 1 Year Performance"]
                ).map(([key, value]) => {
                  return key;
                })
              );
              setMarketChartYValues(() =>
                Object.entries(
                  dataRef.current["Rank G: 1 Year Performance"]
                ).map(([key, value]) => {
                  return value;
                })
              );
            }}
          >
            1Y
          </Button>
          <Button
            id="3Y"
            onClick={() => {
              setTitle("3 Year Performance");
              setMarketChartXValues(
                Object.entries(
                  dataRef.current["Rank H: 3 Year Performance"]
                ).map(([key, value]) => {
                  return key;
                })
              );
              setMarketChartYValues(() =>
                Object.entries(
                  dataRef.current["Rank H: 3 Year Performance"]
                ).map(([key, value]) => {
                  return value;
                })
              );
            }}
          >
            3Y
          </Button>
          <Button
            id="5Y"
            onClick={() => {
              setTitle("5 Year Performance");
              setMarketChartXValues(
                Object.entries(
                  dataRef.current["Rank I: 5 Year Performance"]
                ).map(([key, value]) => {
                  return key;
                })
              );
              setMarketChartYValues(() =>
                Object.entries(
                  dataRef.current["Rank I: 5 Year Performance"]
                ).map(([key, value]) => {
                  return value;
                })
              );
            }}
          >
            5Y
          </Button>
          <Button
            id="10Y"
            onClick={() => {
              setTitle("10 Year Performance");
              setMarketChartXValues(
                Object.entries(
                  dataRef.current["Rank J: 10 Year Performance"]
                ).map(([key, value]) => {
                  return key;
                })
              );
              setMarketChartYValues(() =>
                Object.entries(
                  dataRef.current["Rank J: 10 Year Performance"]
                ).map(([key, value]) => {
                  return value;
                })
              );
            }}
          >
            10Y
          </Button>
        </ButtonGroup>
        <Plot
          className=""
          data={[
            {
              type: "bar",
              x: marketChartXValues,
              y: marketChartYValues,
              marker: {
                color: "#007bff",
              },
            },
          ]}
          layout={{
            title: `${title}`,
            autosize: true,
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default Markets;
