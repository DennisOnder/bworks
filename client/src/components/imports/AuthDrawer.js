import React from "react";

export default class AuthDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleLogin = () => {
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(data);
  };
  handleRegister = () => {
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      profilePicture: this.state.profilePicture,
      email: this.state.email,
      confirmPassword: this.state.confirmPassword,
      password: this.state.password
    };
    console.log(data);
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <div
        className="auth__drawer"
        id="auth__drawer"
        style={
          this.props.type === "login"
            ? { position: "fixed", right: "0" }
            : { position: "fixed", left: "0" }
        }
      >
        {this.props.type === "login" ? (
          <React.Fragment>
            <div id="auth__drawer__wrapper" className="auth__drawer__wrapper">
              <input
                onChange={this.onChange}
                type="text"
                className="auth__drawer__wrapper__input"
                name="email"
                placeholder="Email:"
              />
              <input
                onChange={this.onChange}
                type="text"
                className="auth__drawer__wrapper__input"
                name="password"
                placeholder="Password:"
              />
              <button
                className="auth__drawer__wrapper__button"
                onClick={this.handleLogin}
              >
                Log In
              </button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div id="auth__drawer__wrapper" className="auth__drawer__wrapper">
              <input
                onChange={this.onChange}
                type="text"
                className="auth__drawer__wrapper__input"
                name="firstName"
                placeholder="First Name:"
              />
              <input
                onChange={this.onChange}
                type="text"
                className="auth__drawer__wrapper__input"
                name="lastName"
                placeholder="Last Name:"
              />
              <input
                onChange={this.onChange}
                type="text"
                className="auth__drawer__wrapper__input"
                name="profilePicture"
                placeholder="Profile Picture:"
              />
              <input
                onChange={this.onChange}
                type="text"
                className="auth__drawer__wrapper__input"
                name="email"
                placeholder="Email:"
              />
              <input
                onChange={this.onChange}
                type="text"
                className="auth__drawer__wrapper__input"
                name="password"
                placeholder="Password:"
              />
              <input
                onChange={this.onChange}
                type="text"
                className="auth__drawer__wrapper__input"
                name="confirmPassword"
                placeholder="Confirm Password:"
              />
              <button
                className="auth__drawer__wrapper__button"
                onClick={this.handleRegister}
              >
                Sign up
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
