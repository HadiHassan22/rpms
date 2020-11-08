import React, { Component } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";

import axios from "axios";
import { response } from "express";

class PetitionForm extends Component {
  // default state values
  state = {
    numberInput: "1",
    type: "capacity",
  };

  componentDidMount() {
    this.refreshSavedPetition();
  }

  refreshSavedPetition = () => {
    if (localStorage.getItem("number")) {
      axios
        .post("/api/petition", {
          number: localStorage.getItem("number"),
          type: localStorage.getItem("type"),
        })
        .then((d) => {
          localStorage.setItem("CurrentPetitionData", JSON.stringify(d.data));
        });
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  saveFormData = (event) => {
    event.preventDefault();
    axios
      .post("api/petition", {
        number: this.state.numberInput,
        type: this.state.type,
      })
      .then((response) => {
        let petitionData = response.data;
        this.saveToLocalStorage(petitionData);
      });
  };

  saveToLocalStorage = (petitionData) => {
    localStorage.setItem("number", this.state.numberInput);
    localStorage.setItem("type", this.state.type);
    localStorage.setItem("CurrentPetitionData", JSON.stringify(petitionData));
  };

  saveToMongo = (event) => {
    axios
      .post("/api/weatherMongo", {
        number: this.state.numberInput,
        type: this.state.type,
      })
      .then((response) => {
        let petitionData = response.data;
      });
  };

  render() {
    return (
      <Form className="petition-form" onSubmit={this.saveToMongo}>
        <Row type="flex" justify="center" align="center" className="number">
          <Col>
            <span>Petition Number: </span>
            <Form.Control
              name="numberInput"
              type="text"
              placeholder="Enter number"
              onChange={this.onChange}
              className="numberInput"
            />
          </Col>
        </Row>

        <Row type="flex" justify="center" align="center">
          <Col span={4}>
            <ButtonGroup toggle>
              <ToggleButton
                key={"C"}
                type="radio"
                variant="secondary"
                name="type"
                value={"capacity"}
                checked={this.state.type === "capacity"}
                onChange={this.onChange}
              >
                Capacity
              </ToggleButton>
              <ToggleButton
                key={"F"}
                type="radio"
                variant="secondary"
                name="type"
                value={"co-requisite"}
                checked={this.state.type === "co-requisite"}
                onChange={this.onChange}
              >
                Co-requisite
              </ToggleButton>
            </ButtonGroup>
          </Col>
        </Row>

        <Row type="flex" justify="center" align="center">
          <Col span={4}>
            <Button className="save-btn" variant="primary" type="submit">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default PetitionForm;
