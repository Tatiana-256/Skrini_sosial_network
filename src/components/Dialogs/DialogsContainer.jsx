import {addMessageActionCreator} from "../../redux/dialogs-reducer.ts";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect.js";
import {compose} from "redux";

let mapStateToProps = state => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData,
        newMessageText: state.dialogsPage.newMessageText
    };
};

let mapDispatchToProps = dispatch => {
    return {
        addMessage: addNewMessage => {
            dispatch(addMessageActionCreator(addNewMessage));
        }
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);