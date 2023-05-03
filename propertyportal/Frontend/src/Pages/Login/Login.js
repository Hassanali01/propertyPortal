import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import {UserLogin} from '../../Redux/apicall';
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userSelector } from "../../Redux/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import UserSDK from "../../Redux/apicall";
import { loginStart, loginSuccess, loginFailure } from "../../Redux/userSlice";
const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const credientials = {
    email,
    password,
  };

  const handleSubmit = async (e) => {
    console.log("i am clicked");
    e.preventDefault();

    let sdk = new UserSDK();

    try {
      dispatch(loginStart());
      const user = await sdk.UserLogin(credientials);
      dispatch(loginSuccess(user.data));
      localStorage.setItem("user",JSON.stringify(user.data))
      const status = sdk.checkAuth(user.status);
      console.log(status);
      if (status) {
        NotificationManager.success("Authenticated");
        navigate("/");
      }

      console.log(user);
    } catch (error) {
      dispatch(loginFailure());
      NotificationManager.error(JSON.stringify(error.message));
      console.log(error);
    }
  };
  // user && navigate('/')

  return (
    <>
      <Container style={{ width: "40%", marginTop: "10%" }}>
        <div
          className=" p-3 py-4"
          style={{ boxShadow: "9px 9px 30px 6px rgba(0,0,0,0.1)" }}
        >
          <div className="d-flex justify-content-center">
            <div
              className="rounded-circle"
              style={{
                color: "#ffff",
                padding: "13px 33px ",
                fontSize: "62px",
                backgroundColor: "rgb(29 161 99)",
              }}
            >
              <i className="fa-regular fa-user"></i>
            </div>
          </div>
          <div
            className="mt-3"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <h4>Login To Your Account</h4>
            </div>
            <div className="w-100">
              <Form>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="my-2 w-50">
                    <Form.Control
                      placeholder="Email"
                      name="email"
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                  <div className="my-2 w-50">
                    <Form.Control
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-between w-50">
                    <div>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Remember Me
                      </label>
                    </div>
                    <div>
                      <p>Forgot Password</p>
                    </div>
                  </div>
                  <div className="my-2 w-50 ">
                    <Button
                      variant="success"
                      type="submit"
                      className="w-100"
                      id="hoverlogin"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </Container>
    </>
  );
};

export default Login;
