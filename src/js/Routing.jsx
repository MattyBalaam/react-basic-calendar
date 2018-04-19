import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Context from './Context';
import DropDownNavigation from './DropDownNavigation';
import SequentialNavigation from './SequentialNavigation';
import Month from './Month';

import TransitionSwitch from './utilities/TransitionSwitch';
import { getTodaysDateParams } from './utilities/dates';
import { GlobalHistory } from './utilities/history';

class CalendarRouting extends Component {

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Routing/>
      </Router>
    )
  }
}

class Routing extends Component {

  render () {
    return (
      <>
        <GlobalHistory />
        <DropDownNavigation />
        <SequentialNavigation />
        <TransitionSwitch className="switch-class" key={window.location}  >
          <Route exact path="/" component={HomeRedirectWithContext} />
          <Route path="/:year/:month" component={Month} />
          <Route path="/:year" component={Month} />
        </TransitionSwitch>
      </>
    )
  }
} 

const HomeRedirectWithContext = props => (
  <Context.Consumer>
    {({dispatch}) => <HomeRedirect {...props} dispatch={dispatch} />}
  </Context.Consumer>
);


class HomeRedirect extends Component {
  constructor(props) {
    super(props)
    const params = getTodaysDateParams();
    this.props.dispatch({ type: 'UPDATEPARAMS', params })
    this.state = {
      to: `/${params.year}/${params.month}`,
    };
  }

  render(){
    return (
      <Redirect {...this.props} to={this.state.to} />
    )
  }
}


export default CalendarRouting;
