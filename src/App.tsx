import React, { Component } from "react";
import DataStreamer, { ServerRespond } from "./DataStreamer";
import Graph from "./Graph";
import "./App.css";

interface IState {
  data: ServerRespond[];
  showGraph: boolean;
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      showGraph: false,
    };
  }

  renderGraph() {
    if (this.state.showGraph) {
      return <Graph data={this.state.data} />;
    }
  }

  async getDataFromServer() {
    try {
      const serverResponds = await DataStreamer.getData();
      this.setState({
        data: serverResponds,
        showGraph: true,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Bank Merge & Co Task 3</header>
        <div className="App-content">
          <button
            className="btn btn-primary Stream-button"
            onClick={() => {
              this.getDataFromServer();
            }}
          >
            Start Streaming Data
          </button>
          <div className="Graph">{this.renderGraph()}</div>
        </div>
      </div>
    );
  }
}    

export default App;
