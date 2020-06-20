import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../common/FormsControls/FormsControls";
import {required, maxLengthCreator} from "../utils/validators/validators";
import {dialogType, messageType} from "../../redux/dialogs-reducer";
import {loginFormDataValuesType, loginFormDataValuesTypesKeys} from "../Login/Login";

type PropsDialogsType = {
    dialogsData: Array<dialogType>,
    messagesData: Array<messageType>,
    addMessage: (message: messageType) => void
}

const Dialogs = (props: PropsDialogsType) => {
    let dialogsElements = props.dialogsData.map(dialog => {
        return (
            <DialogItem
                name={dialog.name}
                id={dialog.id}
            />
        );
    });

    let messageElements = props.messagesData.map(message => {
        return <Message message={message.message} key={Math.random().toString()}/>;
    });

    let addNewMessage = (values: NewMessageFormType) => {
        props.addMessage(values.message);
    };


    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs_items}>{dialogsElements}</div>
            <div className={classes.message_items}>{messageElements}</div>
            <AddMessageReduxForm onSubmit={addNewMessage}/>
        </div>
    );
};

const maxLength100 = maxLengthCreator(100);


type PropsAddMessageType = {
    handleSubmit: () => void
}


type NewMessageFormType = {
    message: messageType
}
export type FormDataValuesTypesKeys = Extract<keyof NewMessageFormType, string>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<FormDataValuesTypesKeys>("Message", "message", Textarea, classes.message_input, [required, maxLength100])}
            <div>
                <button className={classes.message_input}>Add new message</button>
            </div>
        </form>
    );
};

const AddMessageReduxForm = reduxForm<NewMessageFormType>({
    form: "dialogAddMessageForm"
})(AddMessageForm);

export default Dialogs;
