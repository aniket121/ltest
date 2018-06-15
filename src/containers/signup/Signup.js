import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import SignInProviders from 'components/SignInProviders';
import Paper from 'material-ui/Paper';
import TextField from 'components/TextField';
import Divider from 'material-ui/Divider';
import LoaderButton from 'components/LoaderButton';
import Error from 'components/Error';
import config from 'config';
import styles from './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      newUser: null,
      showEmailForm: false,
      error: ''
    };
  }

  shouldDisableButton = () => {
    const { username, password, confirmPassword, isLoading } = this.state;
    return !username || !password || password !== confirmPassword || isLoading;
  };

  shouldDisableConfirmationButton() {
    const { confirmationCode, isLoading } = this.state;
    return !confirmationCode || isLoading;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await this.signup(
        this.state.username,
        this.state.password
      );
      this.setState({ newUser });
    } catch (e) {
      console.error(e.message);
      this.setState({ error: e.message });
    }

    this.setState({ isLoading: false });
  };

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({
      isLoading: true,
      error: ''
    });

    try {
      await this.confirm(this.state.newUser, this.state.confirmationCode);
      const userToken = await this.authenticate(
        this.state.newUser,
        this.state.username,
        this.state.password
      );

      this.props.signupUser({
        userToken,
        profile: {
          email: this.state.username
        }
      });
    } catch (e) {
      console.error(e);
      this.setState({
        isLoading: false,
        error: e.message
      });
    }
  };

  signup(username, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    const attributeEmail = new CognitoUserAttribute({
      Name: 'email',
      Value: username
    });

    return new Promise((resolve, reject) =>
      userPool.signUp(
        username,
        password,
        [attributeEmail],
        null,
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result.user);
        }
      )
    );
  }

  confirm(user, confirmationCode) {
    return new Promise((resolve, reject) =>
      user.confirmRegistration(confirmationCode, true, function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      })
    );
  }

  authenticate(user, username, password) {
    const authenticationData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(result.getIdToken().getJwtToken()),
        onFailure: err => reject(err)
      })
    );
  }

  handleEmailLogin = () => {
    this.setState({ showEmailForm: true });
  };

  renderConfirmationForm() {
    return (
      <form className={styles.form} onSubmit={this.handleConfirmationSubmit}>
        <TextField
          name="confirmationCode"
          label="Confirmation Code"
          type="text"
          value={this.state.confirmationCode}
          onChange={this.handleChange}
        />

        {this.state.error && <Error message={this.state.error} />}

        <LoaderButton
          disabled={this.shouldDisableConfirmationButton()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderProviders() {
    return (
      <form className={styles.form}>
        <SignInProviders
          message="Sign up with"
          handleGoogleLogin={this.props.loginWithGoogle}
          handleFacebookLogin={this.props.loginWithFacebook}
          handleEmailLogin={this.handleEmailLogin}
        />
      </form>
    );
  }

  renderForm() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <p>SIGN UP WITH EMAIL</p>
        <TextField
          name="username"
          label="Email"
          hint="test@example.com"
          type="email"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={this.state.confirmPassword}
          onChange={this.handleChange}
        />

        {this.state.error && <Error message={this.state.error} />}

        <LoaderButton
          disabled={this.shouldDisableButton()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />

        <div
          className={styles.Link}
          onClick={() => this.setState({ showEmailForm: false })}
        >
          Sign up with Social
        </div>
      </form>
    );
  }

  renderEmailForm() {
    return this.state.newUser === null
      ? this.renderForm()
      : this.renderConfirmationForm();
  }

  render() {
    const { showEmailForm } = this.state;
    return (
      <div className={styles.Signup}>
        <p className={styles.welcome}>First time to Livepin?</p>
        <Paper className={styles.formWrapper}>
          {showEmailForm ? this.renderEmailForm() : this.renderProviders()}
        </Paper>
      </div>
    );
  }
}

export default withRouter(Signup);
