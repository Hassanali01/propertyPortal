import React, { Component, useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import img from "../../Assets/2.webp";
import { Card } from "react-bootstrap";
import { consts } from "react-elastic-carousel";
import "./slider.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import originURL from "../../url";

function Sliders() {
  const location = useLocation();

  
  // Houses_Property

  const [appartments, setAppartments] = useState([]);
  const [houses, setHouses] = useState([]);
  var urlAppartments =
    `${originURL}/properties?propertyType=Flat&page=1&limit=8`;
  var urlHouses =
    `${originURL}/properties?propertyType=House&page=1&limit=8`;

  const fetchDATA = async () => {
    try {
      const resAppartments = await axios.get(urlAppartments);
      setAppartments(resAppartments.data.results);

      const resHouses = await axios.get(urlHouses);
      setHouses(resHouses.data.results);

      console.log("houses", resHouses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDATA();
  }, []);

  // state = {
  //   items: [
  //     { id: 1, title: "Property For Sale", price: "PKR1234556" },
  //     { id: 2, title: "Appartment For Sale", price: "PKR1234556" },
  //     { id: 3, title: "Property For Rent", price: "PKR1234556" },
  //     { id: 4, title: "Appartment for sale", price: "PKR1234556" },
  //     { id: 5, title: "Plot for Sale", price: "PKR1234556" },
  //     { id: 6, title: "Plot for Sale", price: "PKR1234556" },
  //     { id: 7, title: "Plot for Sale", price: "PKR1234556" },
  //     { id: 8, title: "Plot for Sale", price: "PKR1234556" },
  //   ],
  // };
  const image = 'http://192.168.100:8001/images'
  return (
    <>
      <div style={{ margin: "20px 70px", marginTop: "60px" }}>
        <Link
          to="/propertylisting"
          state={{
            propertyType: "Flat",
          }}
          className="sliderlink"
        >
          <h6 style={{ fontWeight: "700", fontSize: "25px", width:"13%", color:"green" }}> Appartments</h6>
        </Link>
      </div>

      <Carousel
        itemsToShow={4}
        itemPadding={[0, 4]}
        itemPosition={consts.START}
      >
        {/* {items.map(item => <div key={item.id}>{item.title}</div>)} */}

        {appartments.map((item) => {
          return (
            <>
              <div className="mx-2 ">
                <div key={item.id}>
                  <Card className="cards" >
                    <Link
                      to="propertylisting/propertyDetail"
                      state={{
                        item: item,
                      }}
                      style={{ textDecoration: "none", color: "#444" }}
                    >
                      <Card.Img
                        src={image}
                        style={{ width: "330px", height: "230px", objectFit: "cover" }}
                      />
                      <Card.Body className="body">
                        <Card.Title className="title">
                          {" "}
                          <p className="price">{item.Price}</p>
                        </Card.Title>
                        <Card.Text>
                          {/* <p style={{fontSize:"15px",fontWeight:"semi-bold"}}>{item.title}</p> */}

                          <p className="mb-0 p-0">{item.Title}</p>
                          <div className="icn">
                            <div>
                              <i class="fa-solid fa-bath"></i>&nbsp;{item["Bath(s)"]}
                            </div>
                            <div className="px-2">
                              <i class="fa-solid fa-bed"></i>&nbsp;{item["Bedroom(s)"]}
                            </div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Link>

                  </Card>
                </div>
              </div>
            </>
          );
        })}
      </Carousel>

      <div style={{ margin: "20px 70px", }}>
        <Link
          to="/propertylisting"
          state={{
            propertyType: "House",
          }}
          className="sliderlink"
        >
          <h6 style={{ fontWeight: "700", fontSize: "25px",color:"green", width:"7%" }}>
            {" "}
            Houses
          </h6>
        </Link>
      </div>
      <Carousel
        itemsToShow={4}
        itemPadding={[0, 4]}
        itemPosition={consts.START}
      >
        {/* {items.map(item => <div key={item.id}>{item.title}</div>)} */}

        {houses.map((item) => {
          return (
            <>
              <div className="mx-2 ">
                <div key={item.id}>
                  <Card className="cards">
                    <Link
                      to="propertylisting/propertyDetail"
                      state={{
                        item: item,
                      }}
                      style={{ textDecoration: "none", color: "#444" }}
                    >
                      <Card.Img
                        src={item.img}
                        style={{ width: "330px", height: "230px", objectFit: "cover" }}
                      />

                      <Card.Body className="body">
                        <Card.Title className="title">
                          {" "}
                          <p className="price">{item.Price}</p>
                        </Card.Title>
                        <Card.Text>
                          {/* <p style={{fontSize:"15px",fontWeight:"semi-bold"}}>{item.title}</p> */}

                          <p className="mb-0 p-0">{item.Title}</p>
                          <div className="icn">
                            <div>
                              <i class="fa-solid fa-bath"></i>&nbsp;{item["Bath(s)"]}
                            </div>
                            <div className="px-2">
                              <i class="fa-solid fa-bed"></i>&nbsp;{item["Bedroom(s)"]}
                            </div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Link>

                  </Card>
                </div>
              </div>
            </>
          );
        })}
      </Carousel>
    </>
  );
}

export default Sliders;
