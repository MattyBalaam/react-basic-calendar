import React, { Component } from 'react';

import Context from './Context';
import reducer from './Reducer';
import Routing from './Routing';

import {getAllDaysOfWeek, getAllMonthsOfYear, get20yearsEachWay} from './utilities/dates';
import {updateHistory} from './utilities/history'; 

const paramsEqual = (a, b) => {
  if (a === null) {
    return false;
  }
  return a.month === b.month && a.year === b.year;
}

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

  shouldComponentUpdate(nextProps, nextState) {
    if (paramsEqual(this.state.params, nextState.params )) {
      return false;
    }
    updateHistory(nextState.params);
    return true;
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
