import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import img from "./item1.jpg";
import "./single.css";
import Carousel from "react-elastic-carousel";
import { consts } from "react-elastic-carousel";
import { useLocation, useParams } from "react-router-dom";
import { images } from "./index";
import img1 from "../../Assets/2.webp";
import styled from "styled-components";

const SingleProperty = () => {
  const item = useLocation();

  console.log("testvalue", item);

  const propDetail = item.state.item;

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
                {/* {/ <Card.Img src={propDetail.img} alt="property_img" className='cardimg ' style={{ width: "800px", height: "500px", backgroundSize: "cover" }} /> /} */}

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

                    <div className="icon">
                      <div>
                        <i className="fa-solid fa-camera">&nbsp;&nbsp;8</i>
                      </div>
                    </div>

                    <div className="icon icon2">
                      <i className="fa-solid fa-location-dot">
                        &nbsp;&nbsp;Lahore
                      </i>
                    </div>
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
                              <div style={{ width: "60%" }}>Muhammad Noman</div>
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
                                {propDetail.city}
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
                              <div style={{ width: "60%" }}>2 Hours Ago</div>
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
                      <div style={{ width: "60%" }}>House</div>
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
                      <div style={{ width: "60%" }}>{propDetail.Type}</div>
                    </div>
                  </div>
                  <br></br>
                </Card.Body>
                <Card.Body className="detailflex mt-2 ">
                  <div style={{ width: "50%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "40%" }}>Location</div>
                      <div style={{ width: "60%" }}>
                        DC Colony, Gujranwala, Punjab
                      </div>
                    </div>
                  </div>
                  <div style={{ width: "50%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "40%" }}>Bedroom(s)</div>
                      <div style={{ width: "60%" }}>6</div>
                    </div>
                  </div>
                  <br></br>
                </Card.Body>
                <Card.Body className="detailflex2 mt-2 mb-2">
                  <div style={{ width: "50%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "40%" }}>Bath(s)</div>
                      <div style={{ width: "60%" }}>5</div>
                    </div>
                  </div>
                  <div style={{ width: "50%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "40%" }}>Added</div>
                      <div style={{ width: "60%" }}>2 Hours Ago</div>
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
                  {/* className='overview' */}
                  <Card.Title>
                    <div
                      className="font-bold overview"
                      style={{ padding: "10px" }}
                    >
                      <p>Description</p>
                    </div>
                  </Card.Title>
                  <Card.Body>
                    <div style={{ lineHeight: "1.5", textAlign: "justify" }}>
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
                  <Card.Body className="over3">
                    <div className="overview2">
                      <div className="amenities">
                        <div className="mainfeatures" style={{marginRight:"20px"}}>
                          <h3>Main Features</h3>
                        </div>
                        <div style={{display:"flex",flexWrap:"wrap"}}>
                          {
                            propDetail["Main Features"].map((i,index)=>{
                              return(<div key={index} style={{padding:"0px 20px",width:"250px"}}><h6>{i}</h6></div>)
                            })
                          }
                        </div>                        
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Body className="over3 mt-2">
                    <div className="overview2">
                      <div className="amenities">
                        <div className="mainfeatures">
                          <h3>Rooms</h3>
                        </div>
                        <div>
                          <div>
                            <h6>Bedrooms: 4</h6>
                          </div>
                          <div>
                            <h6>Drawing Room</h6>
                          </div>
                          <div>
                            <h6>Study Room</h6>
                          </div>
                          <div>
                            <h6>Store Rooms: 1</h6>
                          </div>
                          <div>
                            <h6>Laundry Room</h6>
                          </div>
                        </div>
                        <div>
                          <div>
                            <h6>Bathrooms: 5</h6>
                          </div>
                          <div>
                            <h6>Dining Room</h6>
                          </div>
                          <div>
                            <h6>Prayer Room</h6>
                          </div>
                          <div>
                            <h6>Steam Room</h6>
                          </div>
                          <div>
                            <h6>Other Rooms</h6>
                          </div>
                        </div>
                        <div>
                           <div><h6>Servant Quarters: 1</h6></div>
                           <div><h6>Kitchens: 1</h6></div>
                           <div><h6>Powder Room</h6></div>
                           <div><h6>Lounge or Sitting Room</h6></div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SingleProperty;
