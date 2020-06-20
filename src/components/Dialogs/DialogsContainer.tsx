import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect.js";
import {compose, Dispatch} from "redux";
import {dialogActions, dialogType, messageType} from "../../redux/dialogs-reducer";
import {postType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {ActionCreatorType} from "../../redux/profile-reducer";

type mapStateToPropsType = {
    dialogsData: Array<dialogType>,
    messagesData: Array<messageType>,
    newMessageText: messageType


}
type mapDispatchToPropsType = {
    addMessage: (NewMessage: string) => void

}

type DispatchType = Dispatch<ActionCreatorType>


let mapStateToProps = (state: any): mapStateToPropsType => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData,
        newMessageText: state.dialogsPage.newMessageText
    };
};

let mapDispatchToProps = (dispatch: DispatchType): mapDispatchToPropsType => {
    return {
        addMessage: addNewMessage => {
            // @ts-ignore
            dispatch(dialogActions.addMessageActionCreator(addNewMessage));
        }
    };
};

export default compose(
    connect<mapStateToPropsType, mapDispatchToPropsType, null, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);
