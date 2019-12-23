import {
  addMessageActionCreator,
  updateNewMessageChangeActionCreator
} from "../../redux/dialogs-reducer.js";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";

let mapStateToProps = state => {
  return {
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData,
    newMessageText: state.dialogsPage.newMessageText
  };
};

let mapDispatchToProps = dispatch => {
  return {
    addMessage: () => {
      dispatch(addMessageActionCreator());
    },
    onMessageChange: text => {
      dispatch(updateNewMessageChangeActionCreator(text));
    }
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
