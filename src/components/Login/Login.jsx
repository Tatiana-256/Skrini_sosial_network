import React from "react";
import classes from "./Login.module.css";
import { reduxForm } from "redux-form";
import { Input, createField } from "../common/FormsControls/FormsControls";
import { required } from "../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";

const Login = props => {
  const onSubmit = formData => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div className={classes.form}>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const LoginForm = ({ handleSubmit, error }) => {
  return (
    <div className={classes.form}>
      <form onSubmit={handleSubmit}>
        {createField("Email", "email", Input, classes.input, [required])}
        {createField("Password", "password", Input, classes.input, [required], {
          type: "password"
        })}
        {createField(
          null,
          "rememberMe",
          Input,
          null,
          null,
          { type: "checkbox" },
          "remember me"
        )}
        {error && <div className={classes.error}>{error}</div>}
        <div>
          <button className={classes.but}>Login</button>
        </div>
      </form>
    </div>
  );
};

const LoginReduxForm = reduxForm({
  form: "login"
})(LoginForm);

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});
export default connect(mapStateToProps, { login })(Login);
