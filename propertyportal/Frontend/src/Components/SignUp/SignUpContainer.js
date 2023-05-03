import React, { Component } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import originURL from "../../url.js";
import SignUpForm from "./SignUpForm.js";
import "react-notifications/lib/notifications.css";
const axios = require("axios");
const FormValidators = require("./Validate");
const validateSignUpForm = FormValidators.validateSignUpForm;

const zxcvbn = require("zxcvbn");

class SignUpContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        fullname: "",
        email: "",
        password: "",
        pwconfirm: "",
        phone: "",
        country: "",
        city: "",
        signupas: "",
      },
      btnTxt: "show",
      type: "password",
      score: "0",
    };

    this.pwMask = this.pwMask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCountry = this.handleCountry.bind(this);

    this.submitSignup = this.submitSignup.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.pwHandleChange = this.pwHandleChange.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    // this.phone = this.phone.bind(this)
    this.handlesignupas = this.handlesignupas.bind(this)
  }
  handlesignupas(event){
    console.log(event)
    this.setState({
      user:{...this.state.user,signupas:event}
    })
  }
  handleCountry(event, name) {
    console.log("i am a event", event);
    const field = name;
    if (field === "country") {
      this.setState({
        user: { ...this.state.user, country: event.name },
      });
    }
    if (field === "city") {
      this.setState({
        user: { ...this.state.user, city: event.name },
      });
    }
  }

  handlePhone(event) {
    this.setState({
      user: { ...this.state.user, phone: event },
    });
  }

  async handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;

    if (field === "image") {
      user[field] = await this.uploadImage(event);

      console.log("state", this.state);

      this.setState({
        user,
      });

      return;
    }

    user[field] = event.target.value;

    this.setState({
      user,
    });
  }

  pwHandleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
    });

    if (event.target.value === "") {
      this.setState((state) =>
        Object.assign({}, state, {
          score: "null",
        })
      );
    } else {
      var pw = zxcvbn(event.target.value);
      this.setState((state) =>
        Object.assign({}, state, {
          score: pw.score + 1,
        })
      );
    }
  }

  submitSignup(user) {
    // var params = { username: user.usr, password: user.pw, email: user.email };
    console.log("user", user);
    axios
      .post(`${originURL}/auth/register`, {
        fullname: user.fullname,
        email: user.email,
        password: user.pw,
        isAdmin: false,
        city: user.city,
        phone: user.phone,
        country: user.country,
      })
      .then((res) => {
        NotificationManager.success("User registered successfully!");
        window.location.reload();
       
      })
      .catch((err) => {
        console.log("Sign up data submit error: ", err);
        NotificationManager.error(JSON.stringify(err));
      });
  }

  validateForm(event) {
    console.log("event", event);
    console.log("submit", event);
    event.preventDefault();
    var payload = validateSignUpForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {},
      });
      var user = {
        fullname: this.state.user.fullname,
        email: this.state.user.email,
        pw: this.state.user.password,
        city: this.state.user.city,
        country: this.state.user.country,
        phone: this.state.user.phone,
        signupas:this.state.user.signupas
      };
      this.submitSignup(user);
    } else {
      const errors = payload.errors;
      console.log(errors);
      this.setState({
        errors,
      });
    }
  }

  pwMask(event) {
    event.preventDefault();
    this.setState((state) =>
      Object.assign({}, state, {
        type: this.state.type === "password" ? "input" : "password",
        btnTxt: this.state.btnTxt === "show" ? "hide" : "show",
      })
    );
  }

  convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  async uploadImage(event) {
    const file = event.target.files[0];
    const base64 = await this.convertBase64(file);
    console.log("base64", base64);
    document.getElementById("avatar").src = `${base64}`;

    return base64;
    // avatar.src = base64;
    // textArea.innerText = base64;
  }

  render() {
    return (
      <div>
        <SignUpForm
          onSubmit={this.validateForm}
          onChange={this.handleChange}
          onPwChange={this.pwHandleChange}
          errors={this.state.errors}
          user={this.state.user}
          score={this.state.score}
          btnTxt={this.state.btnTxt}
          type={this.state.type}
          pwMask={this.pwMask}
          handleShow={this.props.handleShow}
          onCountry={this.handleCountry}
          onPhone={this.handlePhone}
          onSignupAs = {this.handlesignupas}
        />

        <div style={{ paddingBottom: "200px", paddingTop: "33px" }}>
          <div className="registerText">
            <h4>Register Now, It’s Free!</h4>
            <br></br>
            <p>
              Post your properties on Zameen.com and directly expose them to
              thousands of potential investors, tenants, buyers, agents &
              brokers and other interested parties.<br></br>
              <br></br> Save your favourite properties in your members panel to
              view them later at your convenience.<br></br>
              <br></br> Use Zameen.com's integrated e-mail facility to track
              your potential buying & rental leads.<br></br>
              <br></br> Set-up property email alerts providing you latest
              listings of properties instantly as they appear on Zameen.com.
              <br></br>
              <br></br> Search the exact kind of property you are looking for,
              including hundreds of developments, residential & commercial
              properties, homes, villas, apartments, plots, shops, offices,
              complete buildings & floors, warehouses, factories and labour
              camps.
            </p>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpContainer;
