import React from "react";
import Spinner from "./Spinner";
import Status from "./Status";
import Table from './Table';
import "./styles.css";

const API_ENDPOINT = "http://starlord.hackerearth.com/TopSellingGames";

function ErrorMessage() {
  return (
    <div className="error">
      <h3>Error in fetching data</h3>
      <h4>
        This may occur if you're running the app on codesandbox due to Mixed Content error. <br/><br/>
        The API at {API_ENDPOINT} is served using http only, while codesandbox is served in https. <br/><br/>
        Newer browsers block this behaviour by default. Older versions will allow this by enabling Insecure content for the site. <br/><br/>

        Please download the repo and run this locally to view the app: <a href="https://github.com/pavish/top-selling-games-react">https://github.com/pavish/top-selling-games-react</a>
      </h4>
    </div>
  )
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: Status.FETCHING,
      gameRankList: []
    };
  }

  componentDidMount() {
    fetch(API_ENDPOINT)
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
        {this.state.status === Status.FETCHING && <Spinner/>}
        {this.state.status === Status.FETCHED && <Table gameRankList={this.state.gameRankList}/>}
        {this.state.status === Status.ERROR && <ErrorMessage/>}
      </div>
    );
  }
}
