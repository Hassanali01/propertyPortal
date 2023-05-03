import React from "react";
import { useState } from "react";
import { Navbar, Container, Nav, Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import "./header.css";
import avatar from "./avatar.webp";
import originURL from "../../url";
import NotificationManager from "react-notifications/lib/NotificationManager";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import "react-notifications/lib/notifications.css";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../Redux/userSlice";
import { logout } from "../../Redux/userSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const Header = () => {
  const user = useSelector(userSelector);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlelogout = () => {
    dispatch(logout());
    handleClose();
  };

 
  const dispatch = useDispatch();


  return (
    <div>
      <Navbar bg="success" expand="lg" className="text-white" fixed={"top"} >
        <Container>
          <Navbar.Brand className="br">
            <Link to={"/"} className="br">
              <div style={{ width: "180px" }}>
                <i
                  className="fa-solid fa-house text-white "
                  style={{ fontSize: "20px" }}
                ></i>
                <span className="text-white " style={{ marginLeft: "4px" }}>
                  PropertyHub
                </span>
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto text-white">
              <Nav.Link>
                <Link
                  to={"/rentalproperties"}
                  state={{ purpose: "For Rent" }}
                  className="item"
                >
                  Rent
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to={"/propertylisting"}
                  state={{ purpose: "For Sale" }}
                  className="item"
                >
                  Buy
                </Link>
              </Nav.Link>
              <Nav.Link>
                <a href="/" className="item">
                  Sell
                </a>
              </Nav.Link>
              <Nav.Link>
                <Link to={"/propertylisting"} className="item">
                  Properties
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={"/requestedpropertylisting"} className="item">
                  Requested Properties
                </Link>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <Link to={"/addproperty"} className="add">
                  <span>Add Property</span>
                </Link>
              </Nav.Link>
              {user ? (
                <>
                  <p
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0px",
                      cursor: "pointer",
                      padding: "8px 15px",
                      backgroundColor: "white",
                      borderRadius: "21px",
                      
                    }}
                  >
                  <div className="d-flex justify-content-between  align-items-center" style={{width:'180px',color:'black'}}>
                  <div>
                  {user.details.fullname}
                  </div> 
                  <div className="">
                      <Avatar  sx={{ width: 28, height: 28 }}/>
                    </div>
                  </div>
                  </p>

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handlelogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Nav.Link>
                    <Link to="/login" className="item">
                      Login
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/register" className="item">
                      {" "}
                      Signup
                    </Link>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <NotificationContainer />
    </div>
  );
};

export default Header;
