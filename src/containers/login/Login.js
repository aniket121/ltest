import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'components/TextField';
import SignInProviders from 'components/SignInProviders';
import LoaderButton from 'components/LoaderButton';
import Error from 'components/Error';
import config from 'config';
import styles from './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      showEmailForm: false,
      error: '',
      username: '',
      password: ''
    };
  }

  shouldDisableButton = () => {
    const { username, password, isLoading } = this.state;
    return !username || !password || isLoading;
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.setState({
      isLoading: true,
      error: ''
    });

    const results = await this.props.loginUser(username, password);
    if (results) {
      this.setState({
        isLoading: false,
        error: results.message
      });
    }
  };

  handleEmailLogin = () => {
    this.setState({ showEmailForm: true });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  renderProviders() {
    return (
      <form className={styles.form}>
        <SignInProviders
          message="Log in with"
          handleGoogleLogin={this.props.loginWithGoogle}
          handleFacebookLogin={this.props.loginWithFacebook}
          handleEmailLogin={this.handleEmailLogin}
        />
      </form>
    );
  }

  renderEmailForm() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <p>LOG IN WITH EMAIL</p>
        <TextField
          name="username"
          label="Email"
          hint="test@example.com"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <TextField
          name="password"
          label="Password"
          hint=""
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
        />

        {this.state.error && <Error message={this.state.error} />}

        <LoaderButton
          disabled={this.shouldDisableButton()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Login"
          loadingText="Logging in…"
        />

        <Divider />

        <div
          className={styles.Link}
          onClick={() => this.setState({ showEmailForm: false })}
        >
          Log in with Social
        </div>
      </form>
    );
  }

  render() {
    return (
      <div className={styles.Login}>
        <p className={styles.welcome}>Welcome back!</p>
        <Paper className={styles.formWrapper}>
          {this.state.showEmailForm
            ? this.renderEmailForm()
            : this.renderProviders()}
        </Paper>
      </div>
    );
  }
}

export default withRouter(Login);
