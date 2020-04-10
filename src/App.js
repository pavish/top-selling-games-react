import React from "react";
import Spinner from "./Spinner";
import Status from "./Status";
import Table from './Table';
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: Status.FETCHING,
      gameRankList: []
    };
  }

  componentDidMount() {
    fetch("http://starlord.hackerearth.com/TopSellingGames")
      .then(response => response.json())
      .then(data => {
        this.setState({
          gameRankList: data,
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
        <h1>
          Top Selling Games of all time
        </h1>
        {this.state.status === Status.FETCHING && <Spinner />}
        {this.state.status === Status.FETCHED && <Table gameRankList={this.state.gameRankList}/>}
        {this.state.status === Status.ERROR && <h3 className="error">Error in fetching data</h3>}
      </div>
    );
  }
}
