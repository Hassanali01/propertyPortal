import React from "react";
import { Card, Form, Button, Container, Table, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { RMIUploader } from "react-multiple-image-uploader";
import Modal from "react-bootstrap/Modal";
import NotificationManager from "react-notifications/lib/NotificationManager";

import CurrencyInput from "react-currency-input-field";


import axios from "axios";
import "./add.css";
import originURL from "../../url";


import ReactMapboxGl  from 'react-mapbox-gl';

import DrawControl from 'react-mapbox-gl-draw';

// Don't forget to import the CSS
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { Marker } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g'
});



const RequestProperty = () => {

  // Map functions

  const onDrawCreate = ({ features }) => {
    setCoordinates(features[0].geometry.coordinates[0])
    console.log("coordinates",coordinates)
    console.log(features);
  };

  const onDrawUpdate = ({ features }) => {
    setCoordinates(features[0].geometry.coordinates[0])

    console.log(features);
  };





  const prefix = "PKR ";
  const [minPrice, setMinPrice] = useState(null);

  const handleChangeMinPrice = (e) => {
    console.log(e.target.value)
    e.preventDefault();
    const { value = "" } = e.target;
    const parsedValue = value.replace(/[^\d.]/gi, "");
    setMinPrice(parsedValue);
  };

  const [maxPrice, setMaxPrice] = useState(null);

  const handleChangeMaxPrice = (e) => {
    e.preventDefault();
    const { value = "" } = e.target;
    const parsedValue = value.replace(/[^\d.]/gi, "");
    setMaxPrice(parsedValue);
  };

  const handleOnBlurMinPrice = () => setMinPrice(Number(minPrice).toFixed(2));
  const handleOnBlurMaxPrice = () => setMaxPrice(Number(maxPrice).toFixed(2));


  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [propetyType, setPropertyType] = useState("");
  const [city, setCity] = useState("");
  const [purpose, setPurpose] = useState("");
  const [areaInput, setAreaInput] = useState();
  const [bedrooms, setBedrooms] = useState("1");
  const [washrooms, setWashrooms] = useState("1");
  const [landArea, setLandArea] = useState("");
  const [kitchen, setKitchen] = useState("1");
  const [storeRooms, setStoreRooms] = useState("1");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [visible, setVisible] = useState(false);

  //Form Data

  const [purposeData, setPurposeData] = useState([]);
  const [propertyTypeData, setPropertyTypeData] = useState([]);
  const [propertySubtypeData, setPropertySubtypeData] = useState([]);
  const [propertyFeatures, setPropertyFeatures] = useState([]);
  const [feature, setFeature] = useState("");





  // Area input 

  const [areaUnit, setAreaUnit] = useState("squareMeters")

  const [areaOfProperty, setAreaOfProperty] = useState({
    squareFoot: 0,
    squareMeters: 0,
    squareYard: 0,
    Marla: 0,
    Kanal: 0
  })


  const handleAreaChange = (e) => {

    var tempArea = areaOfProperty

    tempArea[`${areaUnit}`] = parseFloat(e.target.value)

    var areaInSquareMeter = 0;

    switch (areaUnit) {
      case "squareFoot":
        areaInSquareMeter = tempArea[`${areaUnit}`] / 10.764
        break;
      case "squareYard":
        areaInSquareMeter = tempArea[`${areaUnit}`] * 0.836126983
        break;
      case "Marla":
        areaInSquareMeter = tempArea[`${areaUnit}`] * 25.29285263
        break;
      case "Kanal":
        areaInSquareMeter = tempArea[`${areaUnit}`] * 505.8570526
        break;
      default:
        areaInSquareMeter = tempArea[`${areaUnit}`]
    }

    tempArea.squareFoot = parseFloat((areaInSquareMeter * 10.76391042).toFixed(4))
    tempArea.squareMeters = parseFloat((areaInSquareMeter).toFixed(4))
    tempArea.squareYard = parseFloat((areaInSquareMeter * 1.19599).toFixed(4))
    tempArea.Marla = parseFloat((areaInSquareMeter * 0.03954).toFixed(4))
    tempArea.Kanal = parseFloat((areaInSquareMeter * 0.00197684).toFixed(4))

    setAreaOfProperty(tempArea)

  }



  const handleUnitChange = (e) => {

    var tempArea = areaOfProperty

    let areaUnit = e.target.value

    tempArea[`${areaUnit}`] = parseFloat(areaInput)

    var areaInSquareMeter = 0;

    switch (areaUnit) {
      case "squareFoot":
        areaInSquareMeter = tempArea[`${areaUnit}`] / 10.764
        break;
      case "squareYard":
        areaInSquareMeter = tempArea[`${areaUnit}`] * 0.836126983
        break;
      case "Marla":
        areaInSquareMeter = tempArea[`${areaUnit}`] * 25.29285263
        break;
      case "Kanal":
        areaInSquareMeter = tempArea[`${areaUnit}`] * 505.8570526
        break;
      default:
        areaInSquareMeter = tempArea[`${areaUnit}`]
    }

    tempArea.squareFoot = parseFloat((areaInSquareMeter * 10.76391042).toFixed(4))
    tempArea.squareMeters = parseFloat((areaInSquareMeter).toFixed(4))
    tempArea.squareYard = parseFloat((areaInSquareMeter * 1.19599).toFixed(4))
    tempArea.Marla = parseFloat((areaInSquareMeter * 0.03954).toFixed(4))
    tempArea.Kanal = parseFloat((areaInSquareMeter * 0.00197684).toFixed(4))

    setAreaOfProperty(tempArea)
  }

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${originURL}/addproperty/purpose`);
      setPurposeData(res.data.getpurpose);
      const res2 = await axios.get(`${originURL}/addproperty/propertytype`);
      setPropertyTypeData(res2.data.getType);
    }
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // features form data

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;

    var value = "";
    if (event.target.type == "checkbox") {
      value = event.target.checked;
    } else {
      value = event.target.value;
    }
    console.log("value", value);
    setInputs((values) => ({ ...values, [name]: value }));

    console.log("inputeeeeee", inputs);
  };



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

  //upload images

  // converting base64 to blob
  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  function imagetoblob(ImgId) {
    var ImageURL = document.getElementById(ImgId).getAttribute("src");
    // Split the base64 string in data and contentType
    var block = ImageURL.split(";");
    // Get the content type of the image
    var contentType = block[0].split(":")[1]; // In this case "image/gif"
    // get the real base64 content of the file
    var realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."
    // Convert it to a blob to upload
    return b64toBlob(realData, contentType);
  }

  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleSubmit = async (event) => {
    // event.preventDefault()
    const formData = new FormData();

    for (let i = 0; i < event.length; i++) {
      formData.append("uploadedImages", event[i].file);
    }

    try {
      const response = await axios({
        method: "post",
        url: `${originURL}/properties/addproperty`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);





  // Map Coordinates

  const [coordinates, setCoordinates] = useState([]);



  return (
    <>
      <div style={{ marginTop: "100px", padding: "20px 200px" }}>
        <Container>
          <Card className="p-5 res">
            <Card.Title
              style={{
                backgroundColor: "#198754",
                color: "#fff",
                fontSize: "17px",
                padding: "7px 3px",
                borderRadius: "3px",
              }}
            >
              PURPOSE, PROPERTY TYPE AND CITY
            </Card.Title>
            <Card style={{ border: "none" }}>
              <Form
                noValidate
                onSubmit={async (e) => {

                  e.preventDefault();

                  if (localStorage.getItem("loggedIn") == "false" || !localStorage.getItem("loggedIn")) {
                    NotificationManager.error("Please Login first to Add property");

                    return
                  }

                  const formData = new FormData();

                  formData.append("Title", title);
                  formData.append("Type", propetyType);
                  formData.append("city", city);
                  formData.append("Purpose", purpose);
                  formData.append("Area", `${areaInput} ${areaUnit}`);
                  formData.append("storeroom", storeRooms);
                  formData.append("DetailLocation", location);
                  formData.append("Description", description);
                  formData.append("Coordinates", coordinates);

                  // formData.append("postedBy", new Date())


                  try {
                    const response = await axios({
                      method: "post",
                      url: `${originURL}/properties/requestproperty`,
                      data: formData,
                      headers: { "Content-Type": "multipart/form-data" },
                    });

                    console.log("response", response);

                    NotificationManager.success("Property Added Successfully");

                  } catch (error) {
                    console.log(error);
                    NotificationManager.error('Something went Wrong, Please try again')

                  }
                }}
              >
                <div>
                  <div className="d-flex justify-content-between">
                    <div className="ff" style={{ width: "40%" }}>
                      {/* purpose code start */}
                      <div>
                        <Form.Label className="mt-3">Purpose:</Form.Label>
                        <Form.Select
                          className="select"
                          onChange={(e) => setPurpose(e.target.value)}
                          required
                        >
                          <option value="" disabled selected>
                            purpose
                          </option>
                          {purposeData.map((p) => (
                            <option>{p.purpose}</option>
                          ))}
                        </Form.Select>
                      </div>

                      <div>
                        <Form.Label className="mt-3 select">City</Form.Label>
                        <Form.Select
                          onChange={(e) => setCity(e.target.value)}
                          required
                        >
                          <option value="" disabled selected>
                            Select The City
                          </option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Lahore">Lahore</option>
                          <option value="Karachi">Karachi</option>

                          <option value="" disabled>
                            Punjab Cities
                          </option>
                          <option value="Ahmed Nager Chatha">
                            Ahmed Nager Chatha
                          </option>
                          <option value="Ahmadpur East">Ahmadpur East</option>
                          <option value="Ali Khan Abad">Ali Khan Abad</option>
                          <option value="Alipur">Alipur</option>
                          <option value="Arifwala">Arifwala</option>
                          <option value="Attock">Attock</option>
                          <option value="Bhera">Bhera</option>
                          <option value="Bhalwal">Bhalwal</option>
                          <option value="Bahawalnagar">Bahawalnagar</option>
                          <option value="Bahawalpur">Bahawalpur</option>
                          <option value="Bhakkar">Bhakkar</option>
                          <option value="Burewala">Burewala</option>
                          <option value="Chillianwala">Chillianwala</option>
                          <option value="Chakwal">Chakwal</option>
                          <option value="Chichawatni">Chichawatni</option>
                          <option value="Chiniot">Chiniot</option>
                          <option value="Chishtian">Chishtian</option>
                          <option value="Daska">Daska</option>
                          <option value="Darya Khan">Darya Khan</option>
                          <option value="Dera Ghazi Khan">
                            Dera Ghazi Khan
                          </option>
                          <option value="Dhaular">Dhaular</option>
                          <option value="Dina">Dina</option>
                          <option value="Dinga">Dinga</option>
                          <option value="Dipalpur">Dipalpur</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Ferozewala">Ferozewala</option>
                          <option value="Fateh Jhang">Fateh Jang</option>
                          <option value="Ghakhar Mandi">Ghakhar Mandi</option>
                          <option value="Gojra">Gojra</option>
                          <option value="Gujranwala">Gujranwala</option>
                          <option value="Gujrat">Gujrat</option>
                          <option value="Gujar Khan">Gujar Khan</option>
                          <option value="Hafizabad">Hafizabad</option>
                          <option value="Haroonabad">Haroonabad</option>
                          <option value="Hasilpur">Hasilpur</option>
                          <option value="Haveli Lakha">Haveli Lakha</option>
                          <option value="Jatoi">Jatoi</option>
                          <option value="Jalalpur">Jalalpur</option>
                          <option value="Jattan">Jattan</option>
                          <option value="Jampur">Jampur</option>
                          <option value="Jaranwala">Jaranwala</option>
                          <option value="Jhang">Jhang</option>
                          <option value="Jhelum">Jhelum</option>
                          <option value="Kalabagh">Kalabagh</option>
                          <option value="Karor Lal Esan">Karor Lal Esan</option>
                          <option value="Kasur">Kasur</option>
                          <option value="Kamalia">Kamalia</option>
                          <option value="Kamoke">Kamoke</option>
                          <option value="Khanewal">Khanewal</option>
                          <option value="Khanpur">Khanpur</option>
                          <option value="Kharian">Kharian</option>
                          <option value="Khushab">Khushab</option>
                          <option value="Kot Addu">Kot Addu</option>
                          <option value="Jauharabad">Jauharabad</option>
                          <option value="Lahore">Lahore</option>
                          <option value="Lalamusa">Lalamusa</option>
                          <option value="Layyah">Layyah</option>
                          <option value="Liaquat Pur">Liaquat Pur</option>
                          <option value="Lodhran">Lodhran</option>
                          <option value="Malakwal">Malakwal</option>
                          <option value="Mamoori">Mamoori</option>
                          <option value="Mailsi">Mailsi</option>
                          <option value="Mandi Bahauddin">
                            Mandi Bahauddin
                          </option>
                          <option value="Mian Channu">Mian Channu</option>
                          <option value="Mianwali">Mianwali</option>
                          <option value="Multan">Multan</option>
                          <option value="Murree">Murree</option>
                          <option value="Muridke">Muridke</option>
                          <option value="Mianwali Bangla">
                            Mianwali Bangla
                          </option>
                          <option value="Muzaffargarh">Muzaffargarh</option>
                          <option value="Narowal">Narowal</option>
                          <option value="Nankana Sahib">Nankana Sahib</option>
                          <option value="Okara">Okara</option>
                          <option value="Renala Khurd">Renala Khurd</option>
                          <option value="Pakpattan">Pakpattan</option>
                          <option value="Pattoki">Pattoki</option>
                          <option value="Pir Mahal">Pir Mahal</option>
                          <option value="Qaimpur">Qaimpur</option>
                          <option value="Qila Didar Singh">
                            Qila Didar Singh
                          </option>
                          <option value="Rabwah">Rabwah</option>
                          <option value="Raiwind">Raiwind</option>
                          <option value="Rajanpur">Rajanpur</option>
                          <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Sadiqabad">Sadiqabad</option>
                          <option value="Safdarabad">Safdarabad</option>
                          <option value="Sahiwal">Sahiwal</option>
                          <option value="Sangla Hill">Sangla Hill</option>
                          <option value="Sarai Alamgir">Sarai Alamgir</option>
                          <option value="Sargodha">Sargodha</option>
                          <option value="Shakargarh">Shakargarh</option>
                          <option value="Sheikhupura">Sheikhupura</option>
                          <option value="Sialkot">Sialkot</option>
                          <option value="Sohawa">Sohawa</option>
                          <option value="Soianwala">Soianwala</option>
                          <option value="Siranwali">Siranwali</option>
                          <option value="Talagang">Talagang</option>
                          <option value="Taxila">Taxila</option>
                          <option value="Toba Tek Singh">Toba Tek Singh</option>
                          <option value="Vehari">Vehari</option>
                          <option value="Wah Cantonment">Wah Cantonment</option>
                          <option value="Wazirabad">Wazirabad</option>
                          <option value="" disabled>
                            Sindh Cities
                          </option>
                          <option value="Badin">Badin</option>
                          <option value="Bhirkan">Bhirkan</option>
                          <option value="Rajo Khanani">Rajo Khanani</option>
                          <option value="Chak">Chak</option>
                          <option value="Dadu">Dadu</option>
                          <option value="Digri">Digri</option>
                          <option value="Diplo">Diplo</option>
                          <option value="Dokri">Dokri</option>
                          <option value="Ghotki">Ghotki</option>
                          <option value="Haala">Haala</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Islamkot">Islamkot</option>
                          <option value="Jacobabad">Jacobabad</option>
                          <option value="Jamshoro">Jamshoro</option>
                          <option value="Jungshahi">Jungshahi</option>
                          <option value="Kandhkot">Kandhkot</option>
                          <option value="Kandiaro">Kandiaro</option>
                          <option value="Karachi">Karachi</option>
                          <option value="Kashmore">Kashmore</option>
                          <option value="Keti Bandar">Keti Bandar</option>
                          <option value="Khairpur">Khairpur</option>
                          <option value="Kotri">Kotri</option>
                          <option value="Larkana">Larkana</option>
                          <option value="Matiari">Matiari</option>
                          <option value="Mehar">Mehar</option>
                          <option value="Mirpur Khas">Mirpur Khas</option>
                          <option value="Mithani">Mithani</option>
                          <option value="Mithi">Mithi</option>
                          <option value="Mehrabpur">Mehrabpur</option>
                          <option value="Moro">Moro</option>
                          <option value="Nagarparkar">Nagarparkar</option>
                          <option value="Naudero">Naudero</option>
                          <option value="Naushahro Feroze">
                            Naushahro Feroze
                          </option>
                          <option value="Naushara">Naushara</option>
                          <option value="Nawabshah">Nawabshah</option>
                          <option value="Nazimabad">Nazimabad</option>
                          <option value="Qambar">Qambar</option>
                          <option value="Qasimabad">Qasimabad</option>
                          <option value="Ranipur">Ranipur</option>
                          <option value="Ratodero">Ratodero</option>
                          <option value="Rohri">Rohri</option>
                          <option value="Sakrand">Sakrand</option>
                          <option value="Sanghar">Sanghar</option>
                          <option value="Shahbandar">Shahbandar</option>
                          <option value="Shahdadkot">Shahdadkot</option>
                          <option value="Shahdadpur">Shahdadpur</option>
                          <option value="Shahpur Chakar">Shahpur Chakar</option>
                          <option value="Shikarpaur">Shikarpaur</option>
                          <option value="Sukkur">Sukkur</option>
                          <option value="Tangwani">Tangwani</option>
                          <option value="Tando Adam Khan">
                            Tando Adam Khan
                          </option>
                          <option value="Tando Allahyar">Tando Allahyar</option>
                          <option value="Tando Muhammad Khan">
                            Tando Muhammad Khan
                          </option>
                          <option value="Thatta">Thatta</option>
                          <option value="Umerkot">Umerkot</option>
                          <option value="Warah">Warah</option>
                          <option value="" disabled>
                            Khyber Cities
                          </option>
                          <option value="Abbottabad">Abbottabad</option>
                          <option value="Adezai">Adezai</option>
                          <option value="Alpuri">Alpuri</option>
                          <option value="Akora Khattak">Akora Khattak</option>
                          <option value="Ayubia">Ayubia</option>
                          <option value="Banda Daud Shah">
                            Banda Daud Shah
                          </option>
                          <option value="Bannu">Bannu</option>
                          <option value="Batkhela">Batkhela</option>
                          <option value="Battagram">Battagram</option>
                          <option value="Birote">Birote</option>
                          <option value="Chakdara">Chakdara</option>
                          <option value="Charsadda">Charsadda</option>
                          <option value="Chitral">Chitral</option>
                          <option value="Daggar">Daggar</option>
                          <option value="Dargai">Dargai</option>
                          <option value="Darya Khan">Darya Khan</option>
                          <option value="Dera Ismail Khan">
                            Dera Ismail Khan
                          </option>
                          <option value="Doaba">Doaba</option>
                          <option value="Dir">Dir</option>
                          <option value="Drosh">Drosh</option>
                          <option value="Hangu">Hangu</option>
                          <option value="Haripur">Haripur</option>
                          <option value="Karak">Karak</option>
                          <option value="Kohat">Kohat</option>
                          <option value="Kulachi">Kulachi</option>
                          <option value="Lakki Marwat">Lakki Marwat</option>
                          <option value="Latamber">Latamber</option>
                          <option value="Madyan">Madyan</option>
                          <option value="Mansehra">Mansehra</option>
                          <option value="Mardan">Mardan</option>
                          <option value="Mastuj">Mastuj</option>
                          <option value="Mingora">Mingora</option>
                          <option value="Nowshera">Nowshera</option>
                          <option value="Paharpur">Paharpur</option>
                          <option value="Pabbi">Pabbi</option>
                          <option value="Peshawar">Peshawar</option>
                          <option value="Saidu Sharif">Saidu Sharif</option>
                          <option value="Shorkot">Shorkot</option>
                          <option value="Shewa Adda">Shewa Adda</option>
                          <option value="Swabi">Swabi</option>
                          <option value="Swat">Swat</option>
                          <option value="Tangi">Tangi</option>
                          <option value="Tank">Tank</option>
                          <option value="Thall">Thall</option>
                          <option value="Timergara">Timergara</option>
                          <option value="Tordher">Tordher</option>
                          <option value="" disabled>
                            Balochistan Cities
                          </option>
                          <option value="Awaran">Awaran</option>
                          <option value="Barkhan">Barkhan</option>
                          <option value="Chagai">Chagai</option>
                          <option value="Dera Bugti">Dera Bugti</option>
                          <option value="Gwadar">Gwadar</option>
                          <option value="Harnai">Harnai</option>
                          <option value="Jafarabad">Jafarabad</option>
                          <option value="Jhal Magsi">Jhal Magsi</option>
                          <option value="Kacchi">Kacchi</option>
                          <option value="Kalat">Kalat</option>
                          <option value="Kech">Kech</option>
                          <option value="Kharan">Kharan</option>
                          <option value="Khuzdar">Khuzdar</option>
                          <option value="Killa Abdullah">Killa Abdullah</option>
                          <option value="Killa Saifullah">
                            Killa Saifullah
                          </option>
                          <option value="Kohlu">Kohlu</option>
                          <option value="Lasbela">Lasbela</option>
                          <option value="Lehri">Lehri</option>
                          <option value="Loralai">Loralai</option>
                          <option value="Mastung">Mastung</option>
                          <option value="Musakhel">Musakhel</option>
                          <option value="Nasirabad">Nasirabad</option>
                          <option value="Nushki">Nushki</option>
                          <option value="Panjgur">Panjgur</option>
                          <option value="Pishin Valley">Pishin Valley</option>
                          <option value="Quetta">Quetta</option>
                          <option value="Sherani">Sherani</option>
                          <option value="Sibi">Sibi</option>
                          <option value="Sohbatpur">Sohbatpur</option>
                          <option value="Washuk">Washuk</option>
                          <option value="Zhob">Zhob</option>
                          <option value="Ziarat">Ziarat</option>
                        </Form.Select>
                      </div>
                      {/* location code end */}
                    </div>
                    <div className="" style={{ width: "40%" }}>
                      {/* type code start */}
                      <div>
                        <div>
                          <br />
                          <Form.Label className="mt-3">
                            PropertyType:
                          </Form.Label>
                          <div
                            onChange={async (e) => {

                              setPropertyType(e.target.value);
                              const res2 = await axios.get(
                                `${originURL}/addproperty/propertysubtype/${e.target.value}`
                              );

                              setPropertySubtypeData(res2.data.detail);
                              document.querySelector('.propertySubtype').value = ""

                              setInputs({})

                            }}
                          >
                            {propertyTypeData.map((p) => (
                              <>
                                <input
                                  type="radio"
                                  value={`${p._id}`}
                                  name="propertyType"
                                />{" "}
                                {p.propertyType} &nbsp;
                              </>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* type code end */}

                      {/* subtype start */}
                      <div>
                        <div>
                          <Form.Label className="mt-3 select">
                            Property Subtype
                          </Form.Label>

                          <Form.Select

                            className="propertySubtype"

                            onClick={async (e) => {

                              setPropertyType(e.target.value)

                              const idOfSubtype = propertySubtypeData.filter((psd) => psd.propertysubtype == e.target.value)[0]._id

                              setInputs({})

                            }}
                            required
                          >
                            <option value="" disabled selected>
                              Select Subtype
                            </option>

                            {propertySubtypeData &&
                              propertySubtypeData.map((p) => (
                                <option>{p.propertysubtype}</option>
                              ))}
                          </Form.Select>
                        </div>
                      </div>
                      {/* subtype end */}
                    </div>
                  </div>
                  <br></br>
                  <br></br>
                  <h5>Features of Property:</h5>
                  <div className="d-flex justify-content-center">
                    {/* add  feature start */}
                    <div>


                      <table class="table" style={{ width: "55vw", border: "solid", borderWidth: "1px" }}>
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Feature</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {propertyFeatures && propertyFeatures.map((p, index) =>
                            <tr>
                              <th scope='row'>
                                <span style={{ marginRight: "0%" }}>
                                  {index + 1}.
                                </span>
                              </th>
                              <td>
                                <span>
                                  {p.featurename}
                                </span>
                              </td>

                              <td>
                                <Button style={{ color: "red", backgroundColor: "white", borderColor: "white" }} onClick={() => {
                                  // await axios.delete(`${originURL}/addproperty/feature/${p._id}`)
                                  var temp = propertyFeatures

                                  temp.splice(index, 1)

                                  setPropertyFeatures([...temp])
                                  console.log(propertyFeatures)
                                }}>
                                  <i className="bi bi-trash" variant="success"></i>
                                </Button>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                      {
                        <Button
                          onClick={() => {

                            handleShow()

                          }
                          }
                          style={{
                            backgroundColor: "#198754",
                            color: "#fff",
                            border: "none",
                          }}
                        >
                          Add Feature
                        </Button>}
                      <Modal
                        style={{ marginTop: "30vh", }}
                        show={show}

                        onHide={handleClose}
                        animation={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Add Property Feature</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <br />
                          <div className="d-flex justify-content-center">




                            <textarea style={{ width: "80%" }} onChange={(e) => setFeature(e.target.value)}></textarea>


                          </div>

                          <br />
                          <br />


                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button
                            onClick={() => {
                              try {

                                var temp = propertyFeatures;
                                temp.push({ featurename: feature })
                                setPropertyFeatures(temp)
                                console.log(propertyFeatures)
                                handleClose();
                              } catch (err) {
                                console.log(err);
                              }
                            }}
                          >
                            Add Feature
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    {/* add feature end */}
                  </div>
                  {/* property specs and price start */}
                  <br></br>
                  <div className="mt-4">
                    <Card.Title
                      style={{
                        backgroundColor: "#198754",
                        color: "#fff",
                        fontSize: "17px",
                        padding: "7px 3px",
                        borderRadius: "3px",
                      }}
                    >
                      PROPERTY SPECS AND PRICE
                    </Card.Title>
                    <br></br>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <Form.Label>Area:</Form.Label>
                          <Form.Control type="number" onChange={async (e) => {
                            setAreaInput(e.target.value)
                            handleAreaChange(e)
                          }} required></Form.Control>
                        </div>
                        <br></br>
                        <div>
                          <Form.Label>Unit:</Form.Label>
                          <Form.Select onChange={(e) => {
                            setAreaUnit(e.target.value)

                            handleUnitChange(e)

                          }} required>
                            <option value="squareMeters">Square Meters</option>
                            <option value="squareFoot">Square Foot</option>
                            <option value="squareYard">Square Yard</option>
                            <option value="Marla">Marla</option>
                            <option value="Kanal">Kanal</option>
                          </Form.Select>
                        </div>
                      </div>
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
               
                      <br></br>
                      <div>
                        <Form.Label>Price Range</Form.Label>
                        <CurrencyInput
                          style={{ color: "black" }}
                          prefix={prefix}
                          name="currencyInput"
                          id="currencyInput"
                          data-number-to-fixed="2"
                          data-number-stepfactor="100"
                          value={minPrice}
                          placeholder="Minimum Price"
                          onChange={handleChangeMinPrice}
                          onBlur={minPrice > 0 ? handleOnBlurMinPrice : null}
                          allowDecimals
                          decimalsLimit="2"
                          intlConfig={{ locale: 'en-IN', currency: 'INR' }}

                          disableAbbreviations
                        />
                        <CurrencyInput
                          style={{ color: "black" }}
                          prefix={prefix}
                          name="currencyInput"
                          id="currencyInput"
                          data-number-to-fixed="2"
                          data-number-stepfactor="100"
                          value={maxPrice}
                          placeholder="Maximum Price"
                          onChange={handleChangeMaxPrice}
                          onBlur={maxPrice > 0 ? handleOnBlurMaxPrice : null}
                          allowDecimals
                          decimalsLimit="2"
                          intlConfig={{ locale: 'en-IN', currency: 'INR' }}

                          disableAbbreviations
                        />
                      </div>
                    </div>
                  </div>


                </div>
                <br></br>
                {/* title and description portion start */}
                <div className="mt-4">
                  <Card.Title
                    style={{
                      backgroundColor: "#198754",
                      color: "#fff",
                      fontSize: "17px",
                      padding: "7px 3px",
                      borderRadius: "3px",
                    }}
                  >
                    PROPERTY TITLE, DESCRIPTION AND ADDRESS
                  </Card.Title>
                  <div className="mt-3 ff">

                    <div>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        placeholder="Title"
                        className="dd"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      ></Form.Control>
                    </div>
                    <div>
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="text" as="textarea" onChange={(e) => setDescription(e.target.value)} rows={3} required></Form.Control>
                    </div>
                    <div>
                    <Form.Label>Select your desired location:</Form.Label>
                    <div>
                   {coordinates[0] && coordinates.map((c)=>
                   
                   <div>
                                    
                    {c[0]} &nbsp; {c[1]}</div>)}
                    
                  </div>
                   
                   {/* {console.log("new",coordinates[0][1][0])} */}
                    <Map
                      style="mapbox://styles/mapbox/streets-v9"
                      containerStyle={{
                        height: '60vh',
                        width: '90%',
                        margin:"auto",
                        marginTop:"10px",
                        marginBottom:"10px"

                      }}
                      center= {[ 74.32938, 31.499]}
                      zoom={[11]}
                    >
                      <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} />
                     

                    </Map>
                    </div>
                    <div>
                      <Form.Label>Address</Form.Label>
                      <Form.Control placeholder="address" onChange={(e) => setLocation(e.target.value)} required></Form.Control>
                    </div>
                  </div>
                </div>

                <Button variant="success" className="mt-3" type="submit" >
                  Request Property
                </Button>
              </Form>
            </Card>
          </Card>
        </Container>

 
      </div>
    </>
  );
};

export default RequestProperty;
