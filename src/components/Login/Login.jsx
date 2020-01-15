import React from "react";
import classes from "./Login.module.css";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls/FormsControls";
import { required } from "../utils/validators/validators";

const Login = props => {
  const onSubmit = FormData => {};
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
            placeholder={"Login"}
            className={classes.input}
            component={Input}
            name={"login"}
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

export default Login;
