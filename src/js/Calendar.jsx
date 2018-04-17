import React, { Component } from 'react';

import Context from './Context';
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
      updateContext: params => {
        if (!params.month) {
          params.month = 1;
        }
        this.setState({
          params: params
        })
      },
      params : null,
      setMonth: month => {this.setState({
        params: {
          month: parseInt(month),
          year: this.state.params.year
        }
      })},
      setYear: year => {this.setState({
        params: {
          year: parseInt(year),
          month: this.state.params.month
        }
      })}
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
      <Context.Provider value={this.state}>
        <section className="calendar">
          <Routing/>
        </section>
      </Context.Provider>
    )
  }
}

export default Calendar;
