import React from "react";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import PasswordStr from "./PasswordStr";
import "./signup.css";
import { useState, useEffect } from "react";
import "react-notifications/lib/notifications.css";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { components } from "react-select";
import ReactSelect from "react-select";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
const Options = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};
const Option = [
  { value: "individual", label: "Individual" },
  { value: "owner/investor", label: "Owner/Investor" },
  { value: "tenant", label: "Tenant" },
  { value: "corporate investor", label: "Corporate Investor" },
  { value: "listing admin", label: "Listing Admin" },
  { value: "yellow", label: "Yellow" },
  { value: "moetgage broker", label: "Moetgage Broker" },
  { value: "partner", label: "Partner" },
  { value: "property/asset manager", label: "Property/Asset Manager" },
  { value: "researcher", label: "Researcher" },
];

const SignUpForm = ({
  history,
  onSubmit,
  onChange,
  errors,
  user,
  score,
  btnTxt,
  type,
  pwMask,
  onPwChange,
  handleShow,
  onCountry,
  onSignupAs,
  onPhone,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [signupas, setsignupas] = useState(null);
  useEffect(() => {
    console.log(Country.getAllCountries());

    console.log(City.getCitiesOfCountry(selectedCountry?.isoCode));
  }, [selectedCountry, signupas]);
  return (
    <div className="loginBox">
      <h1>Sign Up</h1>
      <br />
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

      <form onSubmit={onSubmit}>
        <div>
          <TextField
            fullWidth
            name="email"
            floatingLabelText="Email"
            value={user.email}
            onChange={onChange}
            errorText={errors.email}
          />{" "}
          <br />
          <TextField
            type={type}
            fullWidth
            name="password"
            floatingLabelText="password"
            value={user.password}
            onChange={onPwChange}
            errorText={errors.password}
          />{" "}
          <br />
          <div className="pwStrRow">
            {score >= 1 && (
              <div>
                <PasswordStr score={score} />
                <FlatButton
                  className="pwShowHideBtn"
                  label={btnTxt}
                  onClick={pwMask}
                  style={{
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
              </div>
            )}
          </div>
          <TextField
            fullWidth
            type={type}
            name="pwconfirm"
            floatingLabelText="confirm password"
            value={user.pwconfirm}
            onChange={onChange}
            errorText={errors.pwconfirm}
          />
          <TextField
            fullWidth
            name="fullname"
            floatingLabelText="Name"
            value={user.fullname}
            onChange={onChange}
            errorText={errors.name}
          />{" "}
          <br />
          <div className="my-3">
            <ReactSelect
              options={Country.getAllCountries()}
              getOptionLabel={(options) => {
                return options["name"];
              }}
              getOptionValue={(options) => {
                return options["name"];
              }}
              name="country"
              placeholder="Country"
              value={selectedCountry}
              onChange={(item, e) => {
                onCountry(item, e.name);
                setSelectedCountry(item);
              }}
            />
          </div>
          <div className="my-3">
            <ReactSelect
              placeholder="city"
              options={City.getCitiesOfCountry(selectedCountry?.isoCode)}
              getOptionLabel={(options) => {
                return options["name"];
              }}
              name="city"
              value={selectedCity}
              onChange={(item, e) => {
                onCountry(item, e.name);
                setSelectedCity(item);
              }}
            />
          </div>
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
              onChange={(phone, e) => {
                onPhone(phone, e.name);
                console.log(e);
              }}
            />
          </div>
          <br />
          <div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
              }}
            >
              <strong className="my-2" style={{ textAlign: "start" }}>
                {" "}
                <label className="mb-0 ">SingnUp As a</label>{" "}
              </strong>
              <div>
              
                <ReactSelect
                   placeholder="signup as a"
                  options={Option}
                  getOptionLabel={(options) => {
                    return options["label"];
                  }}
                  
                 
                  name="signupas"
                  value={signupas}
                  onChange={(item,e) => {
                    setsignupas(e.label);
                    onSignupAs(item.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              margin: "10px 0px",
            }}
          >
            <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} />
          </div>
        </div>
        <br />
        <RaisedButton
          className="signUpSubmit"
          primary={true}
          type="submit"
          label="Register"
        />
      </form>
      <p>
        Aleady have an account? <br />
        <Link to="/home" className="item" onClick={handleShow}>
          Log in here
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
