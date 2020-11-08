import React, { Component } from "react";
import PetitionForm from "./PetitionForm";
import PetitionPanels from "./PetitionPanels";

class Container extends Component {
  state = {
    petitionData: "",
  };

  render() {
    return (
      <section className="petition container">
        <PetitionForm />
        <PetitionPanels petitionData={this.state.petitionData} />
      </section>
    );
  }
}

export default Container;
