import React, {Component} from 'react';
import UserProfileCard from '../../components/userProfile_card/index';
import css from './style.css';
import HomeNavBar from '../../components/home_navbar';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {myUserDetail} from '../../core/actions/actions';
import UsersCard from '../../components/users_card'
class UsersContainer extends Component {  

    state={
        UserDetail:null,
    }


    getUserDetail = () =>{this.props.myUserDetail()}

    componentDidMount(){
        this.getUserDetail();
        this.setState({UserDetail:this.props["Status"]["USER_BY_FILTER"]})
    }
    componentWillReceiveProps(props){
        this.setState({UserDetail:props["Status"]["USER_BY_FILTER"]})
    }


    render() {
        console.log(this.state.UserDetail+"User page")
        return (
        <>
        <HomeNavBar history={this.props.history}/>
        <div className={css.users_card}>
        {this.state.UserDetail!=null?
          this.state.UserDetail.map((Detail)=><UsersCard Name={Detail.first_name+" "+Detail.last_name}
                                                        Phone={Detail.phone}
                                                        Email={Detail.email}/>)
        :<h4>No User Found</h4>}
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
export default connect(mapStateToProps, matchDispatchToProps)(UsersContainer);