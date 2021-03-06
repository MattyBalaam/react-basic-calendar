import React, { Component } from 'react';
import Context from './Context';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class DropDownNavigation extends Component {

  setMonth = ({value}) => {
    this.props.dispatch({
      type: 'SETMONTH',
      month: value,
    })
  }

  setYear = ({value}) => {
    this.props.dispatch({
      type: 'SETYEAR',
      year: value,
    });  
  }

  render() {
    const {params, months, years} = this.props;
    return (
      <div className="dropdown-navigation">
        <Select
          name="month-select"
          className="dropdown-navigation__menu"
          value={params ? params.month : 0}
          onChange={this.setMonth}
          options={months.map((label,value) => ({ value: value + 1, label}))}
        />
        <Select
          name="years-select"
          className="dropdown-navigation__menu"
          value={params ? params.year : 10}
          onChange={this.setYear}
          options={years.map(label => ({ value:label, label }))}
        />
      </div>
    )
  } 
}
  
export default props => (
  <Context.Consumer>
    {({dispatch, months, years, params}) => <DropDownNavigation 
      {...props} dispatch={dispatch} 
      years={years} months={months} 
      params={params}  />}
  </Context.Consumer>
);