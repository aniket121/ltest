import React from 'react';
import TextField from 'material-ui/TextField';
import { Field } from 'redux-form';

const color = '#6908A1';

// Wrapped material component in order to style globally all text fields
const styles = {
  underlineStyle: {
    backgroundColor: color,
    borderColor: color
  },
  hintStyle: {},
  floatingLabelStyle: {},
  floatingLabelFocusStyle: {
    color
  }
};

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />;

export const ReduxTextField = ({ name = '', label = '', ...props }) =>
  <Field
    name={name}
    component={renderTextField}
    label={label}
    underlineFocusStyle={styles.underlineStyle}
    hintStyle={styles.hintStyle}
    floatingLabelStyle={styles.floatingLabelStyle}
    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
    {...props}
  />;

export const LivepinTextField = ({
  name,
  label,
  hint,
  value,
  onChange,
  ...props
}) =>
  <TextField
    name={name}
    hintText={hint}
    floatingLabelText={label}
    underlineFocusStyle={styles.underlineStyle}
    hintStyle={styles.hintStyle}
    floatingLabelStyle={styles.floatingLabelStyle}
    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
    value={value}
    onChange={onChange}
    {...props}
  />;

export default LivepinTextField;
