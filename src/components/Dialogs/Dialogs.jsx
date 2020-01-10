import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Redirect } from "react-router-dom";

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

  // if (!props.isAuth) return <Redirect to={"/Login"} />;

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs_items}>{dialogsElements}</div>
      <div className={classes.message_items}>
        {messageElements}
        <div>
          <textarea
            placeholder="Enter your message"
            onChange={onMessageChange}
            ref={newMessage}
            value={props.newMessageText}
          ></textarea>
          <div>
            <button onClick={addMessage}>Add new message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
