import React from "react";
import { Container, Row, Col, Card, Button, Dropdown } from "react-bootstrap";
import originURL from "../../url";

import axios from "axios";
import { useState, useEffect } from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import img1 from "../../Assets/1.webp";
import img2 from "../../Assets/2.webp";
import img3 from "../../Assets/3.webp";
import { Link, useLocation } from "react-router-dom";
const PropertyListing = (props) => {
  const location = useLocation();

  console.log("location", location)
  // Houses_Property

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const [count, setCount] = useState(0)
  const [search, setSearch] = useState(location.state? location.state.search? location.state.search:"" : "");

  var url = "";

  if (location.state) {
    if (location.state.purpose || location.state.propertyType) {
      if (location.state.hasOwnProperty('purpose')) {
        url = `${originURL}/properties?propertyType=all_properties&purpose=${location.state.purpose}&page=${page}&limit=20&title=${search}`;
      }
      else {
        url = `${originURL}/properties?propertyType=${location.state.propertyType}&page=${page}&limit=20&title=${search}`;
      }
    }
    if (location.state.search){
      url = `${originURL}/properties?propertyType=all_properties&page=${page}&limit=20&title=${search}`;
    }
  }
  else {
    url = `${originURL}/properties?propertyType=all_properties&page=${page}&limit=20&title=${search}`;
  }

  

  const fetchDATA = async () => {
    try {
      const res = await axios.get(url);
      const properties = res.data.results;
      setData(properties);
      setCount(res.data.count)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDATA();
    console.log(data);
  }, [page,location.state]);




  return (
    <>
      <div className="header">
        <div className='d-flex justify-content-center'>
          <div style={{ marginTop: "15%", opacity: "0.9" }}>
            <input value={`${search}`} style={{ width: "300px", height:"38px", borderRadius:"5px", borderColor:"white" }} onChange={(e) => setSearch(e.target.value)}></input>
            <Button variant="success" className='ms-2' onClick={() => {
              url = `${originURL}/properties?propertyType=${location.state ? location.state.propertyType : "all_properties"}&page=${page}&limit=20&title=${search}`
              fetchDATA();
            }
            }>Search</Button>
            <br />
            {/* <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Property Type
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Flat</Dropdown.Item>
                <Dropdown.Item href="#/action-2">House</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </div>
        </div>
      </div>

      <Container style={{ marginTop: "20px", marginBottom: "50px" }}>
        <Card className=" px-5" style={{ border: "none" }}>
          <div className="">
            {" "}
            <p className="" style={{ fontSize: "30px", fontWeight: "700", color: "green" }}>
              {location.state ? 
              location.state.purpose? location.state.purpose:
              location.state.propertyType ? location.state.propertyType :"Propertie" : "Property Listing"}s
            </p>
          </div>
          <Row className="  mb-5" >
            {data.map((item) => {
              return (
                <>
                  <Col className="items" lg="3" key={item._id} style={{marginBottom:"15px"}}>
                    <Card style={{ width: "18rem", borderRadius:"8px" }}>
                      <Link
                        to="propertyDetail"
                        state={{
                          item: item
                        }}
                        style={{
                          textDecoration: "none",
                          color: "#444"
                        }}>
                        <Card.Img
                          variant="top"
                          src={item.img}
                          alt="propertypic"
                          className="img"
                        />
                        <Card.Body>
                          <Card.Title>
                            {" "}
                            <div>
                              {" "}
                              {item.Price ? (
                                <p
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                    color: "green",
                                  }}
                                >
                                  {item.Price}
                                </p>
                              ) : (
                                "-"
                              )}
                            </div>
                          </Card.Title>
                          <Card.Text>
                            <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                              {item.Title}
                            </p>
                            <div
                              style={{ display: "flex", justifyContent: "start" }}
                            >
                              <div>
                                <i class="fa-solid fa-bath"></i>
                                &nbsp;
                                {item["Bath(s)"]}
                              </div>
                              <div className="px-2">
                                <i class="fa-solid fa-bed"></i>
                                &nbsp;
                                {item["Bedroom(s)"]}
                              </div>
                            </div>
                          </Card.Text>
                        </Card.Body>
                      </Link>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </Card>
      </Container>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "50px",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={parseInt(count / 20)}
            size="large"
            onChange={(e, p) => {
              console.log("eeeeeeeee", p);
              setPage(p);
            }}
          />
        </Stack>
      </div>

      <div className="d-flex justify-content-center pb-5 pt-2">
        <div style={{fontWeight:"700", fontSize:"18px"}}>Still can't find what you're looking for? <Link to="/requestproperty">Request a property</Link>.</div>
      </div>
    </>
  );
};

export default PropertyListing;
