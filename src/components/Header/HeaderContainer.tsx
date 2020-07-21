import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component {
    render() {
        // @ts-ignore
        return <Header {...this.props} />;
    }
}

type mapStateToPropsType = {
    isAuth: boolean,
    login: string | null,
}
type mapDispatchToPropsType = {
    logout: () => void
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect<mapStateToPropsType, mapDispatchToPropsType, null, AppStateType>(mapStateToProps, {logout})(HeaderContainer);
