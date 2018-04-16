import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import DropDownNavigation from './DropDownNavigation';
import SequentialNavigation from './SequentialNavigation';
import Month from './Month';

import TransitionSwitch from './utilities/TransitionSwitch';
import { getTodaysDateParams } from './utilities/dates';
import { GlobalHistory } from './utilities/history';

class CalendarRouting extends Component {

  render() {
    const currentKey = window.location.pathname.split('/').join('m') || '/';
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <>
          <GlobalHistory />
          <DropDownNavigation />
          <SequentialNavigation />
          <TransitionSwitch className="switch-class" key={currentKey}  >
            <Route path="/:year/:month" component={Month} />
            <Route path="/" component={HomeRedirect} />
          </TransitionSwitch>
        </>
      </Router>
    )
  }
}

const HomeRedirect = ()=> {
  const {year, month} = getTodaysDateParams()
  return (
    <Redirect to={`/${year}/${parseInt(month+1)}`}/> // urls are not as index
  )
}

export default CalendarRouting;
