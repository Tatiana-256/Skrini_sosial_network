import React from "react";
import classes from "./Login.module.css";
import {InjectedFormProps, reduxForm} from "redux-form";
import {Input, createField} from "../common/FormsControls/FormsControls";
import {required} from "../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type mapStatePropsType = {
    isAuth: boolean
}


type mapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

type PropsType = mapStatePropsType & mapDispatchPropsType


export type loginFormDataValuesType = {
    email: string, password: string, rememberMe: boolean
}

type loginFormDataValuesTypesKeys = Extract<keyof loginFormDataValuesType, string>


const Login: React.FC<PropsType> = props => {
    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    };

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>;
    }
    return (
        <div className={classes.form}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

const LoginForm: React.FC<InjectedFormProps<loginFormDataValuesType>> = ({handleSubmit, error}) => {
    return (
        <div className={classes.form}>
            <form onSubmit={handleSubmit}>
                {createField<loginFormDataValuesTypesKeys>("Email", "email", Input, classes.input, [required])}
                {createField<loginFormDataValuesTypesKeys>("Password", "password", Input, classes.input, [required], {
                    type: "password"
                })}
                {createField<loginFormDataValuesTypesKeys>(
                    undefined,
                    "rememberMe",
                    Input,
                    null,
                    [],
                    {type: "checkbox"},
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

const LoginReduxForm = reduxForm<loginFormDataValuesType>({
    form: "login"
})(LoginForm);

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});
export default connect(mapStateToProps, {login})(Login);
