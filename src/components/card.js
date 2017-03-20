import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../action_creators';

class Card extends Component {
  componentDidUpdate() {
    this._guess.focus();
  }

  handleSubmitClick = (event) => {
    event.preventDefault();
    const guess = this._guess.value;
    this._guess.value = "";
    this.props.guess(guess);
    this._guess.focus();
  }

  handleHintClick = (event) => {
    event.preventDefault();
    this.props.hint();
  }

  render() {
    const person = this.props.person;
    return (
      <div className="card">
        <div className="person-title" id={person.getIn(['person_id']) + "-title"}>
          Who is this?
        </div>
        <img src={person.getIn(['0','image_url'])}
             height="150"
             width="150"
             alt="Who is this?"
        />
        <form className="guess" onSubmit={this.handleSubmitClick}>
          <input type="text" ref={input => this._guess = input} />
          <input type="submit" value="Guess!" label="Guess!" />
        </form>
        <form className="hint" onSubmit={this.handleHintClick}>
          <input type="submit" value="Hints!" label="Hints!" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    person: state.get('activePerson'),
    hint: state.get('hint')
  };
}

export const CardContainer = connect(mapStateToProps, actionCreators)(Card);
