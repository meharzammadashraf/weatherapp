import React, { useState, useEffect } from "react"
import { Button, Spinner, Card, InputGroup, Form, Container, Row, Col } from "react-bootstrap"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCloudSun, faWalkieTalkie } from "@fortawesome/free-solid-svg-icons";
const Home = () => {
  const cloudimg = {"partly-cloudy-day": faCloudSun, "cloudy": faCloud, "clear-day": faCloudSun}
  const [allData, setAllData] = useState()
  const [cityname, setCityname] = useState()
  const [headername, setHeadername] = useState()
  const [errorAaya, setErrorAaya] = useState("")
  const [isloading, setIsloading] = useState(false)
  async function check() {
    if(cityname){
    try {
      setIsloading(true)
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityname}?unitGroup=us&key=4K2U46HY7EZT9MEFJGT2MM423&contentType=json`)
    const data = await response.json();
    setErrorAaya("")
    setHeadername(cityname)
    setAllData(data)
    console.log('data', data.days[0])
    setIsloading(false)
  } catch (error) {
    setIsloading(false)
    setAllData("")
    setErrorAaya("Please enter the correct city name...")
    }}
    else{
      setAllData("")
      setErrorAaya("Please enter city name...")
    }
  }

  return (

    <>


      {/* <Card style={{ width: '28rem' }}> */}
      <Card>

        <Card.Body>
          <Card.Title className="text-center">{headername ? headername.toUpperCase() : ""} WEATHER</Card.Title>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Enter your city name:</InputGroup.Text>
            <Form.Control
              placeholder="city name here..."
              aria-label="cityName"
              aria-describedby="basic-addon1"
              value={cityname}
              onChange={(e) => setCityname(e.target.value)}
            />
            <InputGroup.Text className="bg-primary text-light" style={{cursor:'pointer'}} onClick={check}>Search</InputGroup.Text>
          </InputGroup>
          <Card.Text>
            {
              isloading 
              ? 
              <Container>
                <Row className="text-center">
                  <Col>   
              <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner> 
                  </Col>
                </Row>
              </Container>
            : 
            <Container>
              <Row className= "justify-content-md-center">
                <Col className="text-danger" xs={12}>{errorAaya}</Col>
                { 
                allData ?
                  allData.days.slice(0, 7).map((item, index)=>{
                    const dateLoop = new Date(item.datetime)
                    var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
                    const a = item.icon
                    console.log("cloudimg[item.icon]", cloudimg[a])
                    return(
                      <Col key={index} xs="auto" md="auto" lg="auto">
                      {days[dateLoop.getDay()]} <br/>
                      <FontAwesomeIcon icon={cloudimg[a]}/>
                      <i className= {cloudimg[item.icon]}></i> <br/>
                      {((parseFloat(item.temp)-32)/1.8).toFixed(1)}° <br/>

                      </Col>
                    )
                  }) :
                  ""
                }
              </Row>
            </Container>
            }
            {/* <Container>
              <Row className= "justify-content-md-center">
                <Col className="text-danger" xs={12}>{errorAaya}</Col>
                { 
                allData ?
                  allData.days.slice(0, 7).map((item, index)=>{
                    const dateLoop = new Date(item.datetime)
                    var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
                    const a = item.icon
                    console.log("cloudimg[item.icon]", cloudimg[a])
                    return(
                      <Col key={index} xs="auto" md="auto" lg="auto">
                      {days[dateLoop.getDay()]} <br/>
                      <FontAwesomeIcon icon={cloudimg[a]}/>
                      <i className= {cloudimg[item.icon]}></i> <br/>
                      {((parseFloat(item.temp)-32)/1.8).toFixed(1)}° <br/>

                      </Col>
                    )
                  }) :
                  ""
                }
              </Row>
            </Container> */}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
export default Home