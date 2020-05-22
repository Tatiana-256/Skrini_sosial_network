import React, {Component} from "react";
import classes from "./FormsControls.module.css";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {fieldValidatorType} from "../../utils/validators/validators";


type FormControlPropsType = {
  meta: WrappedFieldMetaProps
}



const FormControl: React.FC< FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div
            className={classes.form_control + " " + (hasError ? classes.error : "")}
        >
            <div>{children}</div>
            {hasError && <span>{error}</span>}
        </div>
    );
};


export const Textarea: React.FC<WrappedFieldProps> = props => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            {" "}
            <textarea className={classes.text} {...input} {...restProps} />
        </FormControl>
    );
};

export const Input: React.FC<WrappedFieldProps> = props => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            {" "}
            <input {...input} {...restProps} />
        </FormControl>
    );
};

export const createField = (
    placeholder: string | undefined,
    name: string,
    component: React.FC<WrappedFieldProps>,
    className: any,
    validate: Array<fieldValidatorType>,
    props = {},
    text = ""
) => {
    return (
        <div>
            <Field
                placeholder={placeholder}
                className={className}
                component={component}
                name={name}
                validate={validate}
                {...props}
            />
            {text}
        </div>
    );
};
