import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

const Dialogs = props => {
  let dialogsElements = props.dialogsData.map(dialog => {
    return (
      <DialogItem
        name={dialog.name}
        id={dialog.id}
        key={dialog.id}
        image={dialog.image}
      />
    );
  });

  let messageElements = props.messagesData.map(message => {
    return <Message message={message.message} key={message.id} />;
  });

  let newMessage = React.createRef();

  let addMessage = () => {
    props.addMessage();
  };

  let onMessageChange = newMessage => {
    let text = newMessage.target.value;
    props.onMessageChange(text);
  };

  let addNewMessage = values => {
    props.addMessage(values.message);
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs_items}>{dialogsElements}</div>
      <div className={classes.message_items}>{messageElements}</div>
      <AddMessageReduxForm onSubmit={addNewMessage} />
    </div>
  );
};

const AddMessageForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={"textarea"}
        className={classes.message_input}
        // onChange={onMessageChange}
        // ref={newMessage}
        // value={props.newMessageText}
        name={"message"}
        placeholder="Message"
      />
      <div>
        <button className={classes.message_input}>Add new message</button>
      </div>
    </form>
  );
};

const AddMessageReduxForm = reduxForm({
  form: "dialogAddMessageForm"
})(AddMessageForm);

export default Dialogs;
