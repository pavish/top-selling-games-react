import React from "react";
import Spinner from "./Spinner";
import Status from "./Status";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: Status.FETCHING,
      gameRankList: [],
      data: []
    };
  }

  componentDidMount() {
    fetch("http://starlord.hackerearth.com/TopSellingGames")
      .then(response => response.json())
      .then(data => {
        this.setState({
          status: Status.FETCHED
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          status: Status.ERROR
        });
      });
  }

  render() {
    return (
      <div className="App">
        Top Selling Games 2020
        {this.state.status}
        {this.state.status !== Status.FETCHED && <Spinner />}
      </div>
    );
  }
}
