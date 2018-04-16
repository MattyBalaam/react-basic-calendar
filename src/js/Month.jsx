import React, { Component } from 'react';
import Context from './Context';
import PropTypes from 'prop-types';
import DateFns from 'date-fns';

import {getDisplayDatesFromParams, getFormattedMonth} from './utilities/dates';


class Month extends Component {

  state = {};

  static getDerivedStateFromProps = (nextProps, prevState) => {

    const nextMatchParams = getParamsInt(nextProps.match.params)
    if (!nextProps.params ) {
      nextProps.updateContext(nextMatchParams);
      return false;
    }
    
    const nextPropsParams = getParamsInt(nextProps.params)
    if (!prevState.params ||
      nextPropsParams.month !== prevState.params.month 
      || nextPropsParams.year !== prevState.params.year)  {
      return {
        params: nextPropsParams,
        dates: getDisplayDatesFromParams(nextPropsParams),
      } 
    }

    if (nextMatchParams.month !== prevState.params.month
        || nextMatchParams.year !== prevState.params.year)  {
      nextProps.updateContext(nextMatchParams);
    }

    return false;
  }

  render() {
    if (!this.props.params) {
      return null
    }
    return (<View {...this.props} dates={this.state.dates} />)
  }
}

const View = (props) => (
  <>
    <h1 className="calendar__title">{ getFormattedMonth(props.params.month) } {props.params.year}</h1>
    <div className="calendar__month">
      <CalendarHeader days={props.days}/>
      <CalendarMonth dates={props.dates}/>
    </div>
  </>  
)

const CalendarHeader = ({days}) => (
  <ul className="calendar__header calendar__grid">
    {days.map((day, i) => (
      <li key={i} className={`header__item header__item--${i}`}>{day}</li>
    ))}
  </ul>
);

const CalendarMonth = ({dates}) => (
  <ul className="calendar__month calendar__grid date__list">
    {dates.map(date => (<CalendarDay key={date.date} date={date}/>))}    
  </ul>
);

const CalendarDay = ({date}) => (
  <li className={`date__item${date.isOverflow ? ' date__item--is-overflow' : ''}`}>
    <p>{DateFns.getDate(date.date)} {date.isStart ? 'start' : ''} {date.isEnd ? 'end' : ''}</p>
  </li>
)

const getParamsInt = ({month,year}) => {
  return {
    month: parseInt(month),
    year: parseInt(year),
  }
}

CalendarHeader.propTypes = {
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
  params: PropTypes.arrayOf(PropTypes.numbers),
  updateContext: PropTypes.func,
}

export default props => (
  <Context.Consumer>
    {({updateContext, params, days}) => <Month {...props} updateContext={updateContext} params={params} days={days} />}
  </Context.Consumer>
);
