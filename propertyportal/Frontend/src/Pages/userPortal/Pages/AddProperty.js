import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ButtonGroup,
  Button,
  Form,
  Table,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import PhoneInput from "react-phone-input-2";
import Tabs from "react-bootstrap/Tabs";
import "./property.css";
import { RMIUploader } from "react-multiple-image-uploader";
import ReactSelect from "react-select";
import { Country, City } from "country-state-city";
const AddProperty = () => {
  const btnActivestyle = {
    backgroundColor: "rgb(231, 243, 239)",
    color: "rgb(0, 159, 43)",
    padding: "10px 15px",
    borderRadius: "24px",
    border: "1px solid rgb(0, 159, 43) !important",
    borderColor: "rgb(0, 159, 43)",
    outline: "none",
    //    outlineColor:"rgb(0, 159, 43)"
  };

  const [selectedBtn, setSelectedBtn] = useState(1);
  const [tabbtn, settabbtn] = useState(1);
  const [country, setcountry] = useState(null);
  const [bedbtn, setbedbtn] = useState(null);
  const [bathbtn, setbathbtn] = useState(null);
  const [city, setcity] = useState(null);
  const [key, setKey] = useState("home");
  const [areaUnit, setAreaUnit] = useState("squareMeters");
  const [areaInput, setAreaInput] = useState();
  const [imageFiles, setImageFiles] = useState([]);
  const [visible, setVisible] = useState(false);
  const [areaOfProperty, setAreaOfProperty] = useState({
    squareFoot: 0,
    squareMeters: 0,
    squareYard: 0,
    Marla: 0,
    Kanal: 0,
  });
  //add property states
  const [addproperty,setaddproperty] = useState({
   Title:"",
   Price:parseInt(""),
   Type:"",
   city:"",
   Purpose:"",
   Area:parseInt(""),
   subtype:"",
   Description:"",
   Bedrooms:parseInt(""),
   propertyImages:imageFiles,
   email:"",
   Auther:""
   
   
  })
  const handleAreaChange = (e) => {
    var tempArea = areaOfProperty;

    tempArea[`${areaUnit}`] = parseFloat(e.target.value);

    var areaInSquareMeter = 0;

    switch (areaUnit) {
      case "squareFoot":
        areaInSquareMeter = tempArea[`${areaUnit}`] / 10.764;
        break;
      case "squareYard":
        areaInSquareMeter = tempArea[`${areaUnit}`] * 0.836126983;
        break;
      case "Marla":
        areaInSquareMeter = tempArea[`${areaUnit}`] * 25.29285263;
        break;
      case "Kanal":
        areaInSquareMeter = tempArea[`${areaUnit}`] * 505.8570526;
        break;
      default:
        areaInSquareMeter = tempArea[`${areaUnit}`];
    }

    tempArea.squareFoot = parseFloat(
      (areaInSquareMeter * 10.76391042).toFixed(4)
    );
    tempArea.squareMeters = parseFloat(areaInSquareMeter.toFixed(4));
    tempArea.squareYard = parseFloat((areaInSquareMeter * 1.19599).toFixed(4));
    tempArea.Marla = parseFloat((areaInSquareMeter * 0.03954).toFixed(4));
    tempArea.Kanal = parseFloat((areaInSquareMeter * 0.00197684).toFixed(4));

    setAreaOfProperty(tempArea);
  };

  const handleUnitChange = (e) => {
    var tempArea = areaOfProperty;

    let areaUnit = e.target.value;

    tempArea[`${areaUnit}`] = parseFloat(areaInput);

    var areaInSquareMeter = 0;

    switch (areaUnit) {
      case "squareFoot":
        areaInSquareMeter = tempArea[`${areaUnit}`] / 10.764;
        break;
      case "squareYard":
        areaInSquareMeter = tempArea[`${areaUnit}`] * 0.836126983;
        break;
      case "Marla":
        areaInSquareMeter = tempArea[`${areaUnit}`] * 25.29285263;
        break;
      case "Kanal":
        areaInSquareMeter = tempArea[`${areaUnit}`] * 505.8570526;
        break;
      default:
        areaInSquareMeter = tempArea[`${areaUnit}`];
    }

    tempArea.squareFoot = parseFloat(
      (areaInSquareMeter * 10.76391042).toFixed(4)
    );
    tempArea.squareMeters = parseFloat(areaInSquareMeter.toFixed(4));
    tempArea.squareYard = parseFloat((areaInSquareMeter * 1.19599).toFixed(4));
    tempArea.Marla = parseFloat((areaInSquareMeter * 0.03954).toFixed(4));
    tempArea.Kanal = parseFloat((areaInSquareMeter * 0.00197684).toFixed(4));

    setAreaOfProperty(tempArea);
  };
  //upload images;

  const handleSetVisible = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data) => {
    setImageFiles(data);
  };
  const onSelect = (data) => {
    console.log("Select files", data);
  };
  const onRemove = (id) => {
    console.log("Remove image id", id);
  };
  //add property fucntion
  useEffect(() => {
    setcountry(Country.getCountryByCode("PK"));
    console.log(Country.getCountryByCode("PK"));
  }, [selectedBtn, tabbtn]);
  return (
    <>
      <Container fluid style={{ marginTop: "100px" }}>
        <div style={{ padding: "0 12%" }}>
          <Card className="my-3 p-5" style={{ borderRadius: "10px" }}>
            <Row>
              <Col xs="2">
                {/* <i class="fa-solid fa-house" style={{fontSize:'30px'}}></i><br></br> */}
                <h5>Location and Purpose</h5>
              </Col>
              <Col xxl="10" xs="10">
                <div className="d-flex">
                  <i
                    className="fa-solid fa-circle-check px-2"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <div>
                    <h5>Select Purpose</h5>
                  </div>
                </div>
                <div
                  className="my-3 d-flex radiobutton "
                  // style={{ width: "100%" }}
                >
                  {/* <ButtonGroup
                    disableElevation
                    // style={{ width: "40%" }}
                    variant="contained"
                    color="primary"
                  > */}
                  <div>
                    <Button
                      //   color={selectedBtn === 1 ? classes.color : "success"}
                      onClick={() => setSelectedBtn(1)}
                      style={
                        selectedBtn === 1
                          ? btnActivestyle
                          : {
                              backgroundColor: "rgb(255, 255, 255)",
                              color: "#272b41",
                              padding: "10px 15px",
                              border: "1px solid rgb(221, 221, 221);",
                              borderColor: " rgb(221, 221, 221)",
                              borderRadius: "24px",
                              outline: "none",
                            }
                      }
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <i className="fa-solid fa-house-circle-check"></i>
                        <span className="px-1">Sell</span>
                      </div>
                    </Button>
                  </div>
                  <div>
                    <Button
                      style={
                        selectedBtn === 2
                          ? btnActivestyle
                          : {
                              backgroundColor: "rgb(255, 255, 255)",
                              color: "#272b41",
                              padding: "10px 15px",
                              border: "1px solid rgb(221, 221, 221);",
                              borderColor: "rgb(221, 221, 221)",
                              borderRadius: "24px",
                              outline: "none",
                            }
                      }
                      onClick={() => setSelectedBtn(2)}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <i className="fa-solid fa-house-circle-check"></i>
                        <span className="px-1">Rent</span>
                      </div>
                    </Button>
                  </div>
                  {/* </ButtonGroup> */}
                </div>
                <Row className="my-4">
                  <Col xs="10">
                    <div className="d-flex">
                      <i
                        className="fa-solid fa-circle-check px-2"
                        style={{ fontSize: "20px" }}
                      ></i>
                      <div>
                        <h5>Select PropertyType</h5>
                      </div>
                    </div>
                    <div>
                      <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                        defaultActiveKey={1}
                        // justify
                      >
                        <Tab eventKey="home" title="Home">
                          <div
                            className="my-3 d-flex radiobutton"
                            // style={{ width: "52%" }}
                          >
                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(1)}
                                style={
                                  tabbtn === 1
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">House</span>
                                </div>
                              </Button>
                            </div>

                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(2)}
                                style={
                                  tabbtn === 2
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Flat</span>
                                </div>
                              </Button>
                            </div>

                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(3)}
                                style={
                                  tabbtn === 3
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Upper Portion</span>
                                </div>
                              </Button>
                            </div>
                          </div>
                          <div
                            className="my-3 d-flex radiobutton "
                            // style={{ width: "52%" }}
                          >
                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(4)}
                                style={
                                  tabbtn === 4
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Lower Portion</span>
                                </div>
                              </Button>
                            </div>

                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(5)}
                                style={
                                  tabbtn === 5
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Farm House</span>
                                </div>
                              </Button>
                            </div>

                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(6)}
                                style={
                                  tabbtn === 6
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Room</span>
                                </div>
                              </Button>
                            </div>
                          </div>
                          <div
                            className="my-3 d-flex radiobutton "
                            // style={{ width: "52%" }}
                          >
                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(7)}
                                style={
                                  tabbtn === 7
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Penthouse</span>
                                </div>
                              </Button>
                            </div>
                          </div>
                        </Tab>
                        <Tab eventKey="plots" title="Plots">
                          <div
                            className="my-3 d-flex radiobutton"
                            // style={{ width: "45%" }}
                          >
                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(8)}
                                style={
                                  tabbtn === 8
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Residential Plot</span>
                                </div>
                              </Button>
                            </div>

                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(9)}
                                style={
                                  tabbtn === 9
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Commercial Plots</span>
                                </div>
                              </Button>
                            </div>
                          </div>
                          <div
                            className="my-3 d-flex radiobutton "
                            // style={{ width: "60%" }}
                          >
                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(10)}
                                style={
                                  tabbtn === 10
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">
                                    Agricultual Plots
                                  </span>
                                </div>
                              </Button>
                            </div>
                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(11)}
                                style={
                                  tabbtn === 11
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Industrial Plots</span>
                                </div>
                              </Button>
                            </div>

                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(12)}
                                style={
                                  tabbtn === 12
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Plot File</span>
                                </div>
                              </Button>
                            </div>
                          </div>
                          <div
                            className="my-3 d-flex justify-content-between"
                            // style={{ width: "52%" }}
                          >
                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(13)}
                                style={
                                  tabbtn === 13
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Plot Form</span>
                                </div>
                              </Button>
                            </div>
                          </div>
                        </Tab>
                        <Tab eventKey="commercial" title="Commercial">
                          <div
                            className="my-3 d-flex radiobutton"
                            // style={{ width: "62%" }}
                          >
                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(14)}
                                style={
                                  tabbtn === 14
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Office</span>
                                </div>
                              </Button>
                            </div>

                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(15)}
                                style={
                                  tabbtn === 15
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Shop</span>
                                </div>
                              </Button>
                            </div>

                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => setSelectedBtn(16)}
                                style={
                                  selectedBtn === 16
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Warehouse</span>
                                </div>
                              </Button>
                            </div>
                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(17)}
                                style={
                                  tabbtn === 17
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Factory</span>
                                </div>
                              </Button>
                            </div>
                          </div>
                          <div
                            className="my-3 d-flex  radiobutton"
                            // style={{ width: "30%" }}
                          >
                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(18)}
                                style={
                                  tabbtn === 18
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Building</span>
                                </div>
                              </Button>
                            </div>

                            <div>
                              <Button
                                //   color={selectedBtn === 1 ? classes.color : "success"}
                                onClick={() => settabbtn(19)}
                                style={
                                  tabbtn === 19
                                    ? btnActivestyle
                                    : {
                                        backgroundColor: "rgb(255, 255, 255)",
                                        color: "#272b41",
                                        padding: "10px 15px",
                                        border: "1px solid rgb(221, 221, 221);",
                                        borderColor: " rgb(221, 221, 221)",
                                        borderRadius: "24px",
                                        outline: "none",
                                      }
                                }
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <i className="fa-solid fa-house-circle-check"></i>
                                  <span className="px-1">Other</span>
                                </div>
                              </Button>
                            </div>
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xxl="10" xs="10">
                    <div className="d-flex">
                      <i
                        className="fa-solid fa-circle-check px-2"
                        style={{ fontSize: "20px" }}
                      ></i>
                      <div>
                        <h5>Location</h5>
                      </div>
                    </div>
                    <div style={{ width: "100%" }}>
                      <div className="my-2">
                        <ReactSelect
                          placeholder="city"
                          options={City.getCitiesOfCountry(country?.isoCode)}
                          getOptionLabel={(options) => {
                            return options["name"];
                          }}
                          name="city"
                          value={city}
                          // onChange={(item, e) => {
                          //   onCountry(item, e.name);
                          //   setSelectedCity(item);
                          // }}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          <Card className="my-3 p-5" style={{ borderRadius: "10px" }}>
            <Row className="my-3">
              <Col xs="2">
                <h5>Price And Area</h5>
              </Col>
              <Col xxl="10" xs="10">
                <Col xxl="10" xs="10">
                  <div className="d-flex">
                    <i
                      className="fa-solid fa-circle-check px-2"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <div>
                      <h5>Area Size</h5>
                    </div>
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ width: "100%" }}
                  >
                    <div style={{ width: "70%" }}>
                      <Form.Control
                        type="number"
                        className="mt-0"
                        placeholder="Enter Area"
                        onChange={async (e) => {
                          setAreaInput(e.target.value);
                          handleAreaChange(e);
                        }}
                        required
                      ></Form.Control>
                    </div>
                    <div style={{ width: "20%" }}>
                      <Form.Select
                        className="p-2"
                        onChange={(e) => {
                          setAreaUnit(e.target.value);

                          handleUnitChange(e);
                        }}
                        required
                      >
                        <option value="squareMeters">Square Meters</option>
                        <option value="squareFoot">Square Foot</option>
                        <option value="squareYard">Square Yard</option>
                        <option value="Marla">Marla</option>
                        <option value="Kanal">Kanal</option>
                      </Form.Select>
                    </div>
                  </div>

                  <div>
                    <Table>
                      <thead>
                        <tr>
                          <th>Area</th>
                          <th>Unit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{areaOfProperty.squareMeters}</td>
                          <td>Square Meter</td>
                        </tr>
                        <tr>
                          <td>{areaOfProperty.squareFoot}</td>
                          <td>Square Foot</td>
                        </tr>
                        <tr>
                          <td>{areaOfProperty.squareYard}</td>
                          <td>Square Yard</td>
                        </tr>

                        <tr>
                          <td>{areaOfProperty.Marla}</td>
                          <td>Marla</td>
                        </tr>
                        <tr>
                          <td>{areaOfProperty.Kanal}</td>
                          <td>Kanal</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ width: "100%" }}
                  >
                    <div style={{ width: "70%" }}>
                      <Form.Control
                        type="number"
                        className="mt-0"
                        placeholder="Enter Price"
                        required
                      ></Form.Control>
                    </div>
                    <div style={{ width: "20%" }}>
                      <Form.Select
                        className="p-2"
                        required
                        defaultValue={"PKR"}
                        disabled
                      >
                        <option value="PKR" disabled selected>
                          PKR
                        </option>
                      </Form.Select>
                    </div>
                  </div>
                </Col>
              </Col>
            </Row>
          </Card>
          <Card className="my-3 p-5" style={{ borderRadius: "10px" }}>
            <Row className="my-3">
              <Col xs="2">
                <h5>Feature and Amenities</h5>
              </Col>

              <Col xxl="10" xs="10">
                <div className="d-flex">
                  <i
                    className="fa-solid fa-circle-check px-2"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <div>
                    <h5>Bedrooms</h5>
                  </div>
                </div>
                <div className="d-flex radiobutton w-100">
                  <div className="">
                    <Button
                      //   color={selectedBtn === 1 ? classes.color : "success"}
                      onClick={() => setbedbtn("studio")}
                      style={
                        bedbtn == "studio"
                          ? btnActivestyle
                          : {
                              backgroundColor: "rgb(255, 255, 255)",
                              color: "#272b41",
                              padding: "10px 15px",
                              border: "1px solid rgb(221, 221, 221);",
                              borderColor: " rgb(221, 221, 221)",
                              borderRadius: "24px",
                              outline: "none",
                            }
                      }
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <i className="fa-solid fa-house-circle-check"></i>
                        <span className="px-1">Studio</span>
                      </div>
                    </Button>
                  </div>
                  <div>
                    <Button
                      className="ml-2"
                      //   color={selectedBtn === 1 ? classes.color : "success"}
                      onClick={() => setbedbtn(1)}
                      style={
                        bedbtn === 1
                          ? btnActivestyle
                          : {
                              backgroundColor: "rgb(255, 255, 255)",
                              color: "#272b41",
                              padding: "10px 15px",
                              border: "1px solid rgb(221, 221, 221);",
                              borderColor: " rgb(221, 221, 221)",
                              borderRadius: "24px",
                              outline: "none",
                            }
                      }
                    >
                      <span className="px-1">1</span>
                    </Button>
                  </div>
                  <div>
                    <Button
                      //   color={selectedBtn === 1 ? classes.color : "success"}
                      onClick={() => setbedbtn(2)}
                      style={
                        bedbtn === 2
                          ? btnActivestyle
                          : {
                              backgroundColor: "rgb(255, 255, 255)",
                              color: "#272b41",
                              padding: "10px 15px",
                              border: "1px solid rgb(221, 221, 221);",
                              borderColor: " rgb(221, 221, 221)",
                              borderRadius: "24px",
                              outline: "none",
                            }
                      }
                    >
                      <span>2</span>
                    </Button>
                  </div>

                  <div>
                    <Button
                      //   color={selectedBtn === 1 ? classes.color : "success"}
                      onClick={() => setbedbtn(3)}
                      style={
                        bedbtn === 3
                          ? btnActivestyle
                          : {
                              backgroundColor: "rgb(255, 255, 255)",
                              color: "#272b41",
                              padding: "10px 15px",
                              border: "1px solid rgb(221, 221, 221);",
                              borderColor: " rgb(221, 221, 221)",
                              borderRadius: "24px",
                              outline: "none",
                            }
                      }
                    >
                      <span>3</span>
                    </Button>
                  </div>
                  <div>
                    <Button
                      //   color={selectedBtn === 1 ? classes.color : "success"}
                      onClick={() => setbedbtn(4)}
                      style={
                        bedbtn === 4
                          ? btnActivestyle
                          : {
                              backgroundColor: "rgb(255, 255, 255)",
                              color: "#272b41",
                              padding: "10px 15px",
                              border: "1px solid rgb(221, 221, 221);",
                              borderColor: " rgb(221, 221, 221)",
                              borderRadius: "24px",
                              outline: "none",
                            }
                      }
                    >
                      <span>4</span>
                    </Button>
                  </div>
                  <div>
                    <Button
                      //   color={selectedBtn === 1 ? classes.color : "success"}
                      onClick={() => setbedbtn(5)}
                      style={
                        bedbtn === 5
                          ? btnActivestyle
                          : {
                              backgroundColor: "rgb(255, 255, 255)",
                              color: "#272b41",
                              padding: "10px 15px",
                              border: "1px solid rgb(221, 221, 221);",
                              borderColor: " rgb(221, 221, 221)",
                              borderRadius: "24px",
                              outline: "none",
                            }
                      }
                    >
                      <span>5</span>
                    </Button>
                  </div>
                  <div>
                    <Button
                      //   color={selectedBtn === 1 ? classes.color : "success"}
                      onClick={() => setbedbtn(6)}
                      style={
                        bedbtn === 6
                          ? btnActivestyle
                          : {
                              backgroundColor: "rgb(255, 255, 255)",
                              color: "#272b41",
                              padding: "10px 15px",
                              border: "1px solid rgb(221, 221, 221);",
                              borderColor: " rgb(221, 221, 221)",
                              borderRadius: "24px",
                              outline: "none",
                            }
                      }
                    >
                      <span>6</span>
                    </Button>
                  </div>
                  <div>
                    <Button
                      //   color={selectedBtn === 1 ? classes.color : "success"}
                      onClick={() => setbedbtn(7)}
                      style={
                        bedbtn === 7
                          ? btnActivestyle
                          : {
                              backgroundColor: "rgb(255, 255, 255)",
                              color: "#272b41",
                              padding: "10px 15px",
                              border: "1px solid rgb(221, 221, 221);",
                              borderColor: " rgb(221, 221, 221)",
                              borderRadius: "24px",
                              outline: "none",
                            }
                      }
                    >
                      <span>7</span>
                    </Button>
                  </div>
                </div>
                <div className="d-flex radiobutton my-3">
                  <div>
                    <Button
                      //   color={selectedBtn === 1 ? classes.color : "success"}
                      onClick={() => setbedbtn(8)}
                      style={
                        bedbtn === 8
                          ? btnActivestyle
                          : {
                              backgroundColor: "rgb(255, 255, 255)",
                              color: "#272b41",
                              padding: "10px 15px",
                              border: "1px solid rgb(221, 221, 221);",
                              borderColor: " rgb(221, 221, 221)",
                              borderRadius: "24px",
                              outline: "none",
                            }
                      }
                    >
                      <span>8</span>
                    </Button>
                  </div>
                  <div>
                    <Button
                      //   color={selectedBtn === 1 ? classes.color : "success"}
                      onClick={() => setbedbtn(9)}
                      style={
                        bedbtn === 9
                          ? btnActivestyle
                          : {
                              backgroundColor: "rgb(255, 255, 255)",
                              color: "#272b41",
                              padding: "10px 15px",
                              border: "1px solid rgb(221, 221, 221);",
                              borderColor: " rgb(221, 221, 221)",
                              borderRadius: "24px",
                              outline: "none",
                            }
                      }
                    >
                      <span>9</span>
                    </Button>
                  </div>
                  <div>
                    <Button
                      //   color={selectedBtn === 1 ? classes.color : "success"}
                      onClick={() => setbedbtn(10)}
                      style={
                        bedbtn === 10
                          ? btnActivestyle
                          : {
                              backgroundColor: "rgb(255, 255, 255)",
                              color: "#272b41",
                              padding: "10px 15px",
                              border: "1px solid rgb(221, 221, 221);",
                              borderColor: " rgb(221, 221, 221)",
                              borderRadius: "24px",
                              outline: "none",
                            }
                      }
                    >
                      <span>10</span>
                    </Button>
                  </div>
                  <div>
                    <Button
                      //   color={selectedBtn === 1 ? classes.color : "success"}
                      onClick={() => setbedbtn(11)}
                      style={
                        bedbtn === 11
                          ? btnActivestyle
                          : {
                              backgroundColor: "rgb(255, 255, 255)",
                              color: "#272b41",
                              padding: "10px 15px",
                              border: "1px solid rgb(221, 221, 221);",
                              borderColor: " rgb(221, 221, 221)",
                              borderRadius: "24px",
                              outline: "none",
                            }
                      }
                    >
                      <span>10+</span>
                    </Button>
                  </div>
                </div>
                <Col xxl="10" xs="10">
                  <div className="d-flex">
                    <i
                      className="fa-solid fa-circle-check px-2"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <div>
                      <h5>Bathrooms</h5>
                    </div>
                  </div>
                  <div className="d-flex radiobutton w-100">
                    <div>
                      <Button
                        className="ml-2"
                        //   color={selectedBtn === 1 ? classes.color : "success"}
                        onClick={() => setbathbtn(1)}
                        style={
                          bathbtn === 1
                            ? btnActivestyle
                            : {
                                backgroundColor: "rgb(255, 255, 255)",
                                color: "#272b41",
                                padding: "10px 15px",
                                border: "1px solid rgb(221, 221, 221);",
                                borderColor: " rgb(221, 221, 221)",
                                borderRadius: "24px",
                                outline: "none",
                              }
                        }
                      >
                        <span className="px-1">1</span>
                      </Button>
                    </div>
                    <div>
                      <Button
                        //   color={selectedBtn === 1 ? classes.color : "success"}
                        onClick={() => setbathbtn(2)}
                        style={
                          bathbtn === 2
                            ? btnActivestyle
                            : {
                                backgroundColor: "rgb(255, 255, 255)",
                                color: "#272b41",
                                padding: "10px 15px",
                                border: "1px solid rgb(221, 221, 221);",
                                borderColor: " rgb(221, 221, 221)",
                                borderRadius: "24px",
                                outline: "none",
                              }
                        }
                      >
                        <span>2</span>
                      </Button>
                    </div>
                    <div>
                      <Button
                        //   color={selectedBtn === 1 ? classes.color : "success"}
                        onClick={() => setbathbtn(3)}
                        style={
                          bathbtn === 3
                            ? btnActivestyle
                            : {
                                backgroundColor: "rgb(255, 255, 255)",
                                color: "#272b41",
                                padding: "10px 15px",
                                border: "1px solid rgb(221, 221, 221);",
                                borderColor: " rgb(221, 221, 221)",
                                borderRadius: "24px",
                                outline: "none",
                              }
                        }
                      >
                        <span>3</span>
                      </Button>
                    </div>
                    <div>
                      <Button
                        //   color={selectedBtn === 1 ? classes.color : "success"}
                        onClick={() => setbathbtn(4)}
                        style={
                          bathbtn === 4
                            ? btnActivestyle
                            : {
                                backgroundColor: "rgb(255, 255, 255)",
                                color: "#272b41",
                                padding: "10px 15px",
                                border: "1px solid rgb(221, 221, 221);",
                                borderColor: " rgb(221, 221, 221)",
                                borderRadius: "24px",
                                outline: "none",
                              }
                        }
                      >
                        <span>4</span>
                      </Button>
                    </div>
                    <div>
                      <Button
                        //   color={selectedBtn === 1 ? classes.color : "success"}
                        onClick={() => setbathbtn(5)}
                        style={
                          tabbtn === 5
                            ? btnActivestyle
                            : {
                                backgroundColor: "rgb(255, 255, 255)",
                                color: "#272b41",
                                padding: "10px 15px",
                                border: "1px solid rgb(221, 221, 221);",
                                borderColor: " rgb(221, 221, 221)",
                                borderRadius: "24px",
                                outline: "none",
                              }
                        }
                      >
                        <span>5</span>
                      </Button>
                    </div>
                    <div>
                      <Button
                        //   color={selectedBtn === 1 ? classes.color : "success"}
                        onClick={() => setbathbtn(6)}
                        style={
                          bathbtn === 6
                            ? btnActivestyle
                            : {
                                backgroundColor: "rgb(255, 255, 255)",
                                color: "#272b41",
                                padding: "10px 15px",
                                border: "1px solid rgb(221, 221, 221);",
                                borderColor: " rgb(221, 221, 221)",
                                borderRadius: "24px",
                                outline: "none",
                              }
                        }
                      >
                        <span>6</span>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Col>
            </Row>
          </Card>
          <Card className="my-3 p-5" style={{ borderRadius: "10px" }}>
            <Row className="my-3">
              <Col xs="2">
                {/* <i class="fa-solid fa-house" style={{fontSize:'30px'}}></i><br></br> */}
                <h5>Ad </h5>
                <h5>Information</h5>
              </Col>
              <Col xxl="6" xs="6">
                <div className="d-flex">
                  <i
                    className="fa-solid fa-circle-check px-2"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <div>
                    <h5>Title</h5>
                  </div>
                </div>
                <Form.Control type="text" />
                <Row>
                  <Col>
                    <div className="d-flex">
                      <i
                        className="fa-solid fa-circle-check px-2"
                        style={{ fontSize: "20px" }}
                      ></i>
                      <div>
                        <h5>Description</h5>
                      </div>
                    </div>
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "100px", resize: "none" }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          <Card className="my-3 p-5" style={{ borderRadius: "10px" }}>
            <Row className="my-3">
              <Col xs="2">
                {/* <i class="fa-solid fa-house" style={{fontSize:'30px'}}></i><br></br> */}
                <h5>Property </h5>
                <h5>Images and</h5>
                <h5>Videos</h5>
              </Col>
              <Col xxl="10" xs="10">
                <div className="d-flex">
                  <i
                    className="fa-solid fa-circle-check px-2"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <div>
                    <h5>Upload Images of your property</h5>
                  </div>
                </div>
                <RMIUploader
                  isOpen={visible}
                  hideModal={hideModal}
                  onSelect={onSelect}
                  onUpload={onUpload}
                  onRemove={onRemove}
                />
              </Col>
            </Row>
          </Card>
          <Card className="my-2 p-5" style={{ borderRadius: "10px" }}>
            <Row className="my-3">
              <Col xs="2">
                <h5>Contact</h5>
                <h5>Information</h5>
              </Col>
              <Col xxl="7" xs="10">
                <div className="d-flex">
                  <i
                    className="fa-solid fa-circle-check px-2"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <div>
                    <h5>Email</h5>
                  </div>
                </div>
                <div>
                  <Form.Control />
                </div>
                <Row className="my-3">
                  <Col>
                    <div className="d-flex">
                      <i
                        className="fa-solid fa-circle-check px-2"
                        style={{ fontSize: "20px" }}
                      ></i>
                      <div>
                        <h5>Mobile</h5>
                      </div>
                    </div>
                    <div>
                      <div>
                        <PhoneInput
                          id="form"
                          inputProps={{
                            name: "phone",
                            required: true,
                            autoFocus: true,
                          }}
                          name="phone"
                          country={"pk"}
                          enableSearch={true}
                          // onChange={(phone,e)=>{onPhone(phone,e.name); console.log(e)}}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="d-flex">
                      <i
                        className="fa-solid fa-circle-check px-2"
                        style={{ fontSize: "20px" }}
                      ></i>
                      <div>
                        <h5>Landline</h5>
                      </div>
                    </div>
                    <div>
                      <div>
                        <PhoneInput
                          id="form"
                          inputProps={{
                            name: "phone",
                            required: true,
                            autoFocus: true,
                          }}
                          name="phone"
                          country={"pk"}
                          enableSearch={true}
                          // onChange={(phone,e)=>{onPhone(phone,e.name); console.log(e)}}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default AddProperty;
