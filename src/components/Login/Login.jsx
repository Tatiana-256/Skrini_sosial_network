import React from "react";
import classes from "./Login.module.css";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls/FormsControls";
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

const LoginForm = props => {
  return (
    <div className={classes.form}>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field
            placeholder={"Email"}
            className={classes.input}
            component={Input}
            name={"email"}
            validate={[required]}
          />
        </div>
        <div>
          <Field
            placeholder={"Password"}
            className={classes.input}
            component={Input}
            name={"password"}
            validate={[required]}
            type={"password"}
          />
        </div>
        <div>
          <Field
            type={"checkbox"}
            component={Input}
            name={"rememberMe"}
            validate={[required]}
          />{" "}
          remember me
        </div>
        {props.error && <div className={classes.error}>{props.error}</div>}
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
