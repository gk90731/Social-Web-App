import React, {Component} from 'react';
import UserProfileCard from '../../components/userProfile_card/index';
import css from './style.css';
import HomeNavBar from '../../components/home_navbar';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {myUserDetail} from '../../core/actions/actions';
class UserProfileContainer extends Component {  

    state={
        UserDetail:null,
    }


    getUserDetail = () =>{this.props.myUserDetail()}

    componentDidMount(){
        this.getUserDetail();
    }



    render() {
        return (
        <>
        <HomeNavBar history={this.props.history}/>
        <div className={css.ParentCard}>
        {this.props["Status"]["MY_USER_DETAIL"]!=undefined?
        this.props["Status"]["MY_USER_DETAIL"].map((Details)=><UserProfileCard Phone={Details.phone}
                                                                               FirstName={Details.first_name}
                                                                               LastName={Details.last_name}
                                                                               Email={Details.email}
                                                                               Connect={false}/>)
        :null}
        </div>
        </>
        );
    }
}



//function receive data as props on axios call
function mapStateToProps(state) {
    return {
        Status: state.Status
    };
}

//function to send data for axios call
function matchDispatchToProps(dispatch){
    return bindActionCreators({myUserDetail: myUserDetail}, dispatch);
}

//connect function -- empowering the component by glueing the mapStateToProps and matchDispatchToProps
export default connect(mapStateToProps, matchDispatchToProps)(UserProfileContainer);