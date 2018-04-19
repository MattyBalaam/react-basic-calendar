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
        <Route exact path="/" component={HomeRedirect} />
        <Route path="/:year/:month" component={Month} />
        <Route path="/:year" component={Month} />
      </TransitionSwitch>
    </>
    )
  }
} 

const HomeRedirect = props => (
  <Context.Consumer>
    {({dispatch}) => {
      const params = getTodaysDateParams();
      dispatch({ type: 'UPDATEPARAMS', params: params })
      return (
        <Redirect {...props} to={`/${params.year}/${params.month}`}/>
      )
    }}}
  </Context.Consumer>
);


export default CalendarRouting;
