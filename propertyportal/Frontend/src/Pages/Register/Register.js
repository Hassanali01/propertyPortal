import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import img1 from "../../Assets/1.webp";
import img2 from "../../Assets/2.webp";
import img3 from "../../Assets/3.webp";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import SignUpContainer from "./../../Components/SignUp/SignUpContainer"

const Register = ({handleShow}) => {
  return (
    <>
      <div className="header"></div>

      {/* <Container style={{ marginTop: "20px", marginBottom: "50px" }}>
        <Card className=" px-5" style={{ border: "none" }}>
          <div className=""> */}
      
          <MuiThemeProvider>


<SignUpContainer handleShow={handleShow}/>



          </MuiThemeProvider>




          {/* </div>
        </Card>
      </Container> */}
    </>
  );
};

export default Register;
