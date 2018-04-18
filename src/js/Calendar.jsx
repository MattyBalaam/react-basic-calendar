import React, { Component } from 'react';

import Context from './Context';
import reducer from './Reducer';
import Routing from './Routing';

import {getAllDaysOfWeek, getAllMonthsOfYear, get20yearsEachWay} from './utilities/dates';
import getHistory from './utilities/history'; 

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      days: getAllDaysOfWeek(),
      months: getAllMonthsOfYear(),
      years: get20yearsEachWay(),
      params : null,
    };
  }

  componentDidUpdate() {
    this.updateHistory();
  }

  updateHistory() {
    getHistory().push(`/${this.state.params.year}/${(this.state.params.month)}`);
  }

  render() {
    return (
      <Context.Provider value={{
        ...this.state,
        dispatch: action => {
          this.setState(state => reducer(state, action));
        }
      }}>
        <section className="calendar">
          <Routing/>
        </section>
      </Context.Provider>
    )
  }
}

export default Calendar;
