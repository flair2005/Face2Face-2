
import React from 'react';
import Header from './Header.jsx';
import ChatRoom from './ChatRoom.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';

import PreferencesForm from './PreferencesForm.jsx';
import MatchList from './MatchList.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      showPreferencesField: false,
      showMatchList: false
    }

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleMatchListClick = this.handleMatchListClick.bind(this);
  }

  handleUserChange(objValue) {
    this.setState({profile: objValue});
    // axios post request to update database
    let userPutRoute = '/api/profiles/' + this.state.profile.id;
    axios.put(userPutRoute, this.state.profile)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleMatchListClick() {
    this.setState({showMatchList:true});
  }

  componentDidMount() {
  let that = this;
  axios.get('/api/user')
    .then(function(response) {
      that.setState({profile: response.data});
    })
    .catch(function(error) {
      console.log(error);
    });
  }
//className="btn btn-primary btn-lg btn-block"
  render() {
    if(this.state.profile.prefAge_min ) {
      return (
        <div>



            <div>
              <div className="row">
                <Header profile={this.state.profile} show={this.handleMatchListClick}/>
              </div>
              <div className="row">
                <Link to={{pathname: '/lobby', state: {profile: this.state.profile}}}><button className="toVidChatLobbyButton" type="button" >Make A Connection</button></Link>
              </div>
            </div>

        </div>
      )
    } else {
      return (
        <div>
          <Header />
          <h1>This is the Prefs page</h1>
          <PreferencesForm user={this.state.profile} onUserChange={this.handleUserChange} />
        </div>
      )
    }
  }
}

export default Home
