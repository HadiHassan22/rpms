import React, { Component } from "react";
import PetitionInfoPanel from "./PetitionInfoPanel";
import PetitionHistoryPanel from "./PetitionHistoryPanel";

class PetitionPanels extends Component {
  render() {
    return (
      <section className="petition-panels">
        <PetitionInfoPanel />
        <PetitionHistoryPanel />
      </section>
    );
  }
}

export default PetitionPanels;
