import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "./imports/Sidebar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBoards } from "../actions/boardActions";
import isLoggedIn from "../functions/isLoggedIn";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getBoards();
  }
  render() {
    if (isLoggedIn()) {
      return (
        <div className="dashboard" id="dashboard">
          <Sidebar />
          <h1>Dashboard</h1>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

Dashboard.propTypes = {
  getBoards: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  boards: state.board.all,
  errors: state.error
});

export default connect(
  mapStateToProps,
  { getBoards }
)(Dashboard);
