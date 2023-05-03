import React, { useEffect, useState } from "react";
import "./home.css";
import Sliders from "../../Components/Slider/Slider";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import ReactSelect from "react-select";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CurrencyFormat from "react-currency-format";
import {userSelector} from '../../Redux/userSlice';
import {useSelector,useStore} from 'react-redux'
const Home = () => {
  const [search, setSearch] = useState("");
  const [country, setcountry] = useState(null);
  const [cities, setcities] = useState(null);
  const [properties, setproperties] = useState([]);
  const [show, setshow] = useState(false);
  const [filterresult, setfilteredresults] = useState([]);
  const [loading, setloading] = useState(false);
  const [activefilter, setactivefilter] = useState(false);

  const url = "http://192.168.100.13:8001/properties";
const store = useStore().getState();
console.log("store",store)
  const getproperties = async () => {
    try {
      const resp = await axios.get(url);
     resp && setproperties(resp.data.properties);
      console.log(resp)
    } catch (error) {
      console.log(error);
    }
  };
  //filteration
  const [filter, setfilter] = useState({
    minprice: null,
    maxprice: null,
    minArea: null,
    maxArea: null,
    minbed: null,
    city: "",
    purpose: "",
    page: 1,
  });
  console.log(filter);
  const handleFilter = (e) => {
    e.preventDefault();
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setfilter({ ...filter, [name]: value });
  };
  const filterurl = `http://192.168.100.13:8001/properties/filterproperties?purpose=${filter.purpose}&page=${filter.page}&minArea=${filter.minArea}&maxArea=${filter.maxArea}&minprice=${filter.minprice}&maxprice=${filter.maxprice}&minbed=${filter.minbed}&city=${filter.city}`;
  console.log(filterurl);
  const filteredResult = async (e) => {
    e.preventDefault();
    try {
      console.log(loading);
      setloading(true);
      const res = await axios.get(filterurl);
      setfilteredresults(res.data.searchresults);
      setactivefilter(true);
      setTimeout(() => {
        console.log("i am called");
        setloading(false);
      }, 3000);

      console.log(loading);
    } catch (error) {
      console.log(error);
    }
  };
  const user  = useSelector(state => state.user);
  useEffect(() => {
    setcountry(Country.getCountryByCode("PK"));
    setcities(City.getCitiesOfCountry("PK"));
   
    console.log("main page",user)
    // getpropreties();
    // filteredResult();
  }, [search, activefilter]);
  const beds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <div className="header">
        {/* <div className="d-flex justify-content-center">
          <div style={{ marginTop: "15%", opacity: "0.9" }}>
            <input
              style={{
                width: "300px",
                height: "38px",
                borderRadius: "5px",
                borderColor: "white",
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
            <Link
              to="/propertyListing"
              state={{
                search: search,
              }}
            >
              <Button
                variant="success"
                className="ms-2"
                onClick={() => {
                  console.log("search: ", search);
                }}
              >
                Search
              </Button>
            </Link>
            <br />
          </div>
        </div> */}
        <Container
          className="rounded"
          style={{
            width: "50%",
            top: "46%",
            position: "relative",
            background: "white",
            padding: "10px",
          }}
        >
          <Form onSubmit={(e) => filteredResult(e)}>
            <Row>
              <Col sm="3">
                <strong>
                  <Form.Label className="m-0">Purpose</Form.Label>
                </strong>
                <Form.Select
                  name="purpose"
                  value={filter.purpose}
                  onChange={(e) => handleFilter(e)}
                >
                  <option disabled selected hidden value={""}>
                    Please Select
                  </option>
                  <option value={"For Rent"}>For Rent</option>
                  <option value={"For Sale"}>For Sale</option>
                </Form.Select>
              </Col>
              <Col sm="3">
                <strong>
                  <Form.Label className="m-0">Min Price</Form.Label>
                </strong>
                <Form.Control
                  type="Number"
                  placeholder="min price"
                  className="text-black m-0"
                  name="minprice"
                  value={filter.minprice}
                  onChange={(e) => handleFilter(e)}
                ></Form.Control>
              </Col>
              <Col sm="3">
                <strong>
                  <Form.Label className="m-0">Max Price</Form.Label>
                </strong>

                <Form.Control
                  type="Number"
                  placeholder="max price"
                  className="text-black m-0"
                  onChange={(e) => handleFilter(e)}
                  name="maxprice"
                  value={filter.maxprice}
                ></Form.Control>
              </Col>
              <Col sm="3">
                <strong>
                  <Form.Label className="m-0">City</Form.Label>
                </strong>
                <ReactSelect
                  options={cities}
                  getOptionLabel={(options) => {
                    return options["name"];
                  }}
                  onChange={(item) => setfilter({ ...filter, city: item.name })}
                />
              </Col>
            </Row>
            <Row className="my-2">
              <Col sm="3">
                <strong>
                  <Form.Label className="mb-0">MinArea</Form.Label>
                </strong>
                <Form.Control
                  type="Number"
                  placeholder="in Marla"
                  className="m-0"
                  name="minArea"
                  value={filter.minArea}
                  onChange={(e) => handleFilter(e)}
                ></Form.Control>
              </Col>
              <Col sm="3">
                <strong>
                  <Form.Label className="mb-0">MaxArea</Form.Label>
                </strong>
                <Form.Control
                  type="Number"
                  placeholder="in Marla"
                  className="m-0"
                  name="maxArea"
                  value={filter.maxArea}
                  onChange={(e) => handleFilter(e)}
                ></Form.Control>
              </Col>
              <Col sm="3">
                <strong>
                  <Form.Label className="mb-0">Bed Rooms</Form.Label>
                </strong>
                <Form.Select
                  type="Number"
                  className="m-0"
                  name="minbed"
                  value={filter.minbed}
                  onChange={(e) => handleFilter(e)}
                >
                  <option disabled selected hidden value={""}>
                    Please Select
                  </option>
                  {beds.map((d, i) => {
                    return <option key={i}>{d}</option>;
                  })}
                </Form.Select>
              </Col>
              {/* <Col sm="3">
              <strong>
                <Form.Label className="mb-0">Property Type</Form.Label>
              </strong>
              <Form.Select
                type="Number"
                name="type"
                value={filter.type}
                className="m-0"
                onChange={(e) => handleFilter(e)}
              >
                <option disabled selected hidden value={""}>Please Select</option>
                <option>Houses</option>
                <option>Commercial</option>
              </Form.Select>
            </Col> */}
            </Row>
            <Row className="justify-content-end my-2">
              <Col sm="3">
                <Button variant="success" className="w-100" type="submit">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <div style={{ padding: "0px 167px", marginBottom: "50px" }}>
        {" "}
        {/* <Sliders /> */}
        {activefilter && (
          <Container>
            <Row className="my-2">
              <h3 className="text-center">Search Results</h3>
              {filterresult?.length > 0 ? (
                filterresult.map((d, i) => {
                  return (
                    <>
                      <Col sm="3" className="my-2">
                        <Card>
                          <Card.Img
                            variant="top"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-OwZBZtkUvRkHaZ5nY0F7Jl09-vPqE35XMA&usqp=CAU"
                          />
                          <Card.Body>
                            <Card.Title>
                              <strong>
                                <CurrencyFormat
                                  value={d.Price}
                                  thousandSeparator={true}
                                  prefix={"PKR"}
                                  displayType={"text"}
                                />
                              </strong>
                            </Card.Title>
                          </Card.Body>
                          <div className=" px-3">
                            <div className="d-flex justify-content-between">
                              <div>
                                <strong>
                                  <p style={{ fontSize: "15px" }}>
                                    Purpose: {d.Purpose}
                                  </p>
                                </strong>
                              </div>
                              <div>
                                <strong>
                                  <p style={{ fontSize: "15px" }}>
                                    Type: {d.Type}
                                  </p>
                                </strong>
                              </div>
                            </div>
                            <div>
                              <strong>
                                <p style={{ fontSize: "15px" }}>
                                  Area: {d.Area} Marla
                                </p>
                              </strong>
                            </div>
                            <div>
                              <strong>
                                <p style={{ fontSize: "15px" }}>
                                  BedRoom(s): {d["Bedroom(s)"]}
                                </p>
                              </strong>
                            </div>
                            <div>
                              <strong>
                                <p style={{ fontSize: "15px" }}>
                                  City: {d.city}
                                </p>
                              </strong>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    </>
                  );
                })
              ) : (
                <>
                  {activefilter && (
                    <h3 className="text-center">No Search Results Found </h3>
                  )}
                </>
              )}
            </Row>
          </Container>
        )}
        <Container>
          <h3 className="text-center">All Results</h3>
          <Row className="my-2">
            {properties.map((d, i) => {
              return (
                <>
                  <Col sm="3" className="my-2">
                    <Card>
                      <Card.Img
                        variant="top"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-OwZBZtkUvRkHaZ5nY0F7Jl09-vPqE35XMA&usqp=CAU"
                      />
                      <Card.Body>
                        <Card.Title>
                          <strong>
                            <CurrencyFormat
                              value={d.Price}
                              thousandSeparator={true}
                              prefix={"PKR"}
                              displayType={"text"}
                            />
                          </strong>
                        </Card.Title>
                      </Card.Body>
                      <div className=" px-3">
                        <div className="d-flex justify-content-between">
                          <div>
                            <strong>
                              <p style={{ fontSize: "15px" }}>
                                Purpose: {d.Purpose}
                              </p>
                            </strong>
                          </div>
                          <div>
                            <strong>
                              <p style={{ fontSize: "15px" }}>Type: {d.Type}</p>
                            </strong>
                          </div>
                        </div>
                        <div>
                          <strong>
                            <p style={{ fontSize: "15px" }}>
                              Area: {d.Area} Marla
                            </p>
                          </strong>
                        </div>
                        <div>
                          <strong>
                            <p style={{ fontSize: "15px" }}>
                              BedRoom(s): {d["Bedroom(s)"]}
                            </p>
                          </strong>
                        </div>
                        <div>
                          <strong>
                            <p style={{ fontSize: "15px" }}>City: {d.city}</p>
                          </strong>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </Container>
        {loading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </div>
    </>
  );
};

export default Home;
