import React, { Component } from 'react';
import Context from './Context';

import { Link } from "react-router-dom";

class SequentialNavigation extends Component {

  prevMonth() {
    const {month,year} = this.props.params;
    return `/${ month === 1 ? year - 1 : year}/${month === 1  ? 12 : month - 1}/`;
  }

  nextMonth() {
    const {month,year} = this.props.params;
    return `/${ month === 12 ? year + 1 : year}/${month === 12  ? 1 : month + 1}/`;
  }

  render() {
    if (!this.props.params) {
      return null;
    }
    return (
      <div className="sequential-navigation">
        <Link className="sequential-navigation__button sequential-navigation__button--prev" to={this.prevMonth()}>&lt;</Link>
        <Link className="sequential-navigation__button sequential-navigation__button--next" to={this.nextMonth()}>&gt;</Link>
      </div>
    )
  } 
}
  
export default props => (
  <Context.Consumer>
    {({params}) => <SequentialNavigation 
      {...props} params={params}  />}
  </Context.Consumer>
);


