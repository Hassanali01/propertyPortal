import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import img from "./item1.jpg";
import "./single.css";
import Carousel from "react-elastic-carousel";
import { consts } from "react-elastic-carousel";
import { useLocation, useParams } from "react-router-dom";
import { images } from "./index";
import img1 from "../../Assets/2.webp";
import styled from "styled-components";
import icon from '../../Assets/tick.png'


import Map from 'react-map-gl';
import { Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';


var axios = require('axios');

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGFuaXlhbGtoYWxpZCIsImEiOiJjbDZicGl2NHcwMjJnM2NxYjRoMzFsMmNjIn0._b-McTeRzbPoh-HVaPJwUQ'; // Set your mapbox token here



const SingleProperty = () => {
  const item = useLocation();

  console.log("testvalue", item);

  const propDetail = item.state.item;

  const [coordinates, setCoordinates] = useState([])


  useEffect(() => {
    
    
  var config = {
    method: 'get',
    url: `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(propDetail.DetailLocation)}&apiKey=7629540bd57b4f15a58ef6e06dcef7c7`,
    headers: {}
  };

  axios(config)
    .then(function (response) {
      if (!coordinates[0]){
      setCoordinates(response.data.features[0].geometry.coordinates)}
      console.log(response.data.features[0].geometry.coordinates);
    })
    .catch(function (error) {
      console.log(error);
    });

  }, [coordinates]);


  


  return (
    <div style={{}}>
      <div style={{ paddingTop: "100px", marginBottom: "0px" }}>
        <Container>
          <Row>
            <Col xs={8}>
              <Card className="maincard">
                <Card.Title className="title">
                  <div>
                    <p className="proptitle">{propDetail.Title}</p>
                    <p className="address">{propDetail.DetailLocation}</p>
                    <hr style={{ marginTop: "2px", color: "#444" }}></hr>
                  </div>
                </Card.Title>

                <Carousel
                  itemsToShow={1}
                  itemPadding={[0, 4]}
                  itemPosition={consts.CENTER}
                >
                  {propDetail.propertyImages &&
                    propDetail.propertyImages.map((pi) => (
                      <div>
                        <Card.Img
                          src={pi}
                          className="img"
                          style={{ width: "800px", height: "500px" }}
                        />
                      </div>
                    ))}

                  <div>
                    <Card.Img
                      src={images.img2}
                      className="img"
                      style={{ width: "800px", height: "500px" }}
                    />

                    
                  </div>
                </Carousel>

                <Card.Body>
                  <div className="cardflex">
                    <div className="innerflex">
                      <div>
                        <i class="fa-solid fa-bath"></i>
                      </div>
                      <div>{propDetail["Bath(s)"]}&nbsp;Bath</div>
                    </div>
                    <div className="innerflex">
                      <div>
                        {" "}
                        <i class="fa-solid fa-bed"></i>
                      </div>
                      <div>{propDetail["Bedroom(s)"]}&nbsp;Rooms</div>
                    </div>
                    <div className="innerflex">
                      <div>
                        {" "}
                        <i class="fa-solid fa-arrow-up-short-wide"></i>
                      </div>
                      <div>{propDetail.Area}</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="contact">
                <Card.Title>
                  <div style={{ marginTop: "20px" }}>
                    <p style={{ marginBottom: "0px" }}></p>
                  </div>
                </Card.Title>
                <Card className="handle">
                  <Card.Body className="handle">
                    <Card.Text>
                      <div
                        className=" mt-3 inner bg-success"
                        style={{ borderRadius: "4px" }}
                      >
                        <Card.Title>
                          <div
                            className="price"
                            style={{ fontSize: "25px", fontWeight: "bold" }}
                          >
                            {" "}
                            {propDetail.Price}
                          </div>
                        </Card.Title>
                      </div>
                      <Card className="card2main">
                        <Card.Title>
                          <div className="overview">
                            <p> Contact Details</p>
                          </div>
                        </Card.Title>
                        <Card.Body className="detailflex2a">
                          <div style={{ width: "100%" }}>
                            <div style={{ display: "flex" }}>
                              <div style={{ width: "40%" }}>
                                <i class="fa-solid fa-user"></i>&nbsp;Owner
                              </div>
                              <div style={{ width: "60%" }}>{propDetail.postedBy ? propDetail.postedBy :"Muhammad Noman"}</div>
                            </div>
                          </div>
                          <br></br>
                        </Card.Body>
                        <Card.Body className="detailflexa mt-2 ">
                          <div style={{ width: "100%" }}>
                            <div style={{ display: "flex" }}>
                              <div style={{ width: "40%" }}>
                                (<i class="fa-solid fa-phone"></i>)&nbsp;Phone
                              </div>
                              <div style={{ width: "60%" }}> +923114550743</div>
                            </div>
                          </div>
                          <br></br>
                        </Card.Body>
                        <Card.Body className="detailflex2a mt-2 ">
                          <div style={{ width: "100%" }}>
                            <div style={{ display: "flex" }}>
                              <div style={{ width: "40%" }}>
                                <i class="fa-solid fa-envelope"></i>&nbsp;Email
                              </div>
                              <div style={{ width: "60%" }}>
                                numanrajpoot62@gmail.com
                              </div>
                            </div>
                          </div>
                          <br></br>
                        </Card.Body>
                        <Card.Body className="detailflexa mt-2 mb-2">
                          <div style={{ width: "100%" }}>
                            <div style={{ display: "flex" }}>
                              <div style={{ width: "40%" }}>
                                <i class="fa-solid fa-location-dot"></i>{" "}
                                &nbsp;Location
                              </div>
                              <div style={{ width: "60%" }}>
                                {propDetail.Location ? propDetail.Location :"N/A"}
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                        <Card.Body className="detailflex2a mt-2 mb-2">
                          <div style={{ width: "100%" }}>
                            <div style={{ display: "flex" }}>
                              <div style={{ width: "40%" }}>
                                <i class="fa-solid fa-clock"></i> &nbsp;Added
                              </div>
                              <div style={{ width: "60%" }}>{propDetail.Added ? propDetail.Added :"N/A"}</div>
                            </div>
                          </div>
                        </Card.Body>
                        <hr></hr>
                      </Card>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <Card className="card2main">
                <Card.Title>
                  <div className="overview">
                    <p>Details</p>
                  </div>
                </Card.Title>
                <Card.Body className="detailflex">
                  <div style={{ width: "50%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "40%" }}>Type</div>
                      <div style={{ width: "60%" }}>{propDetail.Type ? propDetail.Type :"N/A"}</div>
                    </div>
                  </div>
                  <div style={{ width: "50%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "40%" }}>Area</div>
                      <div style={{ width: "60%" }}>{propDetail.Area}</div>
                    </div>
                  </div>
                  <br></br>
                </Card.Body>
                <Card.Body className="detailflex2 mt-2 ">
                  <div style={{ width: "50%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "40%" }}>Price</div>
                      <div style={{ width: "60%" }}>{propDetail.Price}</div>
                    </div>
                  </div>
                  <div style={{ width: "50%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "40%" }}>Purpose</div>
                      <div style={{ width: "60%" }}>{propDetail.Purpose}</div>
                    </div>
                  </div>
                  <br></br>
                </Card.Body>
                <Card.Body className="detailflex mt-2 ">
                  <div style={{ width: "50%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "40%" }}>Location</div>
                      <div style={{ width: "60%" }}>
                        {propDetail.Location ? propDetail.Location :"N/A"}
                      </div>
                    </div>
                  </div>
                  <div style={{ width: "50%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "40%" }}>Bedroom(s)</div>
                      <div style={{ width: "60%" }}>{propDetail["Bedroom(s)"] ? propDetail["Bedroom(s)"] :"N/A"}</div>
                    </div>
                  </div>
                  <br></br>
                </Card.Body>
                <Card.Body className="detailflex2 mt-2 mb-2">
                  <div style={{ width: "50%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "40%" }}>Bath(s)</div>
                      <div style={{ width: "60%" }}>{propDetail["Bath(s)"] ? propDetail["Bath(s)"] :"N/A"}</div>
                    </div>
                  </div>
                  <div style={{ width: "50%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "40%" }}>Added</div>
                      <div style={{ width: "60%" }}>{propDetail.Added ? propDetail.Added :"N/A"}</div>
                    </div>
                  </div>
                </Card.Body>
                <hr></hr>
              </Card>
            </Col>
          </Row>

          <div className="mb-5">
            <Row>
              <Col xs={8}>
                <Card className="maincard">
                  <Card.Title>
                    <div
                      className="font-bold overview"
                      style={{ padding: "10px" }}
                    >
                      <p>Description</p>
                    </div>
                  </Card.Title>
                  <Card.Body>
                    <div style={{ textAlign: "justify" }}>
                      {propDetail.Description}
                    </div>
                  </Card.Body>
                  <hr></hr>
                </Card>
              </Col>
            </Row>
          </div>
          <div className="mb-5">
            <Row>
              <Col xs={8}>
                <Card className="maincard">
                  <Card.Title>
                    <div
                      className="font-bold overview"
                      style={{ padding: "10px" }}
                    >
                      <p>Amenities</p>
                    </div>
                  </Card.Title>
                  {propDetail["Main Features"] ? (
                    <Card.Body className="over3">
                      <div className="overview2">
                        <div className="amenities">
                          <div
                            className="mainfeatures"
                            style={{ marginRight: "20px", width: "30%" }}
                          >
                            <h3>Main Features</h3>
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {propDetail["Main Features"].map((i, index) => {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    padding: "0px 20px",
                                    width: "200px",
                                    textAlign: "justify",
                                  }}
                                >
                                  <h6>{i}</h6>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  ) : (
                    ""
                  )}
                  {propDetail.Rooms ? <Card.Body className="over3 mt-2">
                    <div className="overview2">
                      <div className="amenities">
                        <div
                          className="mainfeatures"
                          style={{ marginRight: "25px", width: "30%" }}
                        >
                          <h3>Rooms</h3>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {propDetail.Rooms.map((i, index) => {
                            return (
                              <div
                                key={index}
                                style={{
                                  padding: "0px 20px",
                                  width: "200px",
                                  textAlign: "justify",
                                }}
                              >
                                <h6>{i}</h6>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Card.Body>:""
                  }
                  {propDetail["Bussiness And Communication"] ?
                  <Card.Body className="over3 mt-2">
                    <div className="overview2">
                      <div className="amenities">
                        <div
                          className="mainfeatures"
                          style={{ marginRight: "25px", width: "30%" }}
                        >
                          <h3>Bussiness And Communication</h3>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {propDetail["Bussiness And Communication"].map((i, index) => {
                            return (
                              <div
                                key={index}
                                style={{
                                  padding: "0px 20px",
                                  width: "200px",
                                  textAlign: "justify",
                                }}
                              >
                                <h6>{i}</h6>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Card.Body>:""
                  }
                  {propDetail["Community Features"] ?
                  <Card.Body className="over3 mt-2">
                    <div className="overview2">
                      <div className="amenities">
                        <div
                          className="mainfeatures"
                          style={{ marginRight: "25px", width: "30%" }}
                        >
                          <h3>Community Features</h3>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {propDetail["Community Features"].map((i, index) => {
                            return (
                              <div
                                key={index}
                                style={{
                                  padding: "0px 20px",
                                  width: "200px",
                                  textAlign: "justify",
                                }}
                              >
                                <h6>{i}</h6>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Card.Body>:""
                   }
                 { propDetail["Nearby Locations and Other Facilities"] ?
                 <Card.Body className="over3 mt-2">
                    <div className="overview2">
                      <div className="amenities">
                        <div
                          className="mainfeatures"
                          style={{
                            marginRight: "25px",
                            width: "30%",
                            textAlign: "justify",
                          }}
                        >
                          <h3>Nearby Locations and Other Facilities</h3>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {propDetail["Nearby Locations and Other Facilities"].map((i, index) => {
                            return (
                              <div
                                key={index}
                                style={{
                                  padding: "0px 20px",
                                  width: "200px",
                                  textAlign: "justify",
                                }}
                              >
                                <h6>{i}</h6>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Card.Body>:""
                 }
                  {propDetail["Other Facilities\n"] ? 
                    <Card.Body className="over3 mt-2">
                      <div className="overview2">
                        <div className="amenities">
                          <div
                            className="mainfeatures"
                            style={{ marginRight: "25px", width: "30%" }}
                          >
                            <h3>Other Facilities</h3>
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {propDetail["Other Facilities\n"].map(
                              (i, index) => {
                                return (
                                  <div
                                    key={index}
                                    style={{
                                      padding: "0px 20px",
                                      width: "200px",
                                      textAlign: "justify",
                                    }}
                                  >
                                    <h6>{i}</h6>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </Card.Body> : ""
                    
                  }


                </Card>
              </Col>
            </Row>
          </div>

          {console.log("coordinates", coordinates)}

        {coordinates[0] &&  <Map
      initialViewState={{
        longitude: coordinates[0],
        latitude: coordinates[1],
        zoom: 14
      }}
      style={{width: 600, height: 400, marginLeft:"7%",  marginBottom:"10%"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}

    ><Marker longitude={coordinates[0]} latitude={coordinates[1]} color="red" /></Map>}
        </Container>
      </div>
    </div>
  );
};

export default SingleProperty;
