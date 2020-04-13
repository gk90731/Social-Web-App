import React, { Component } from 'react';
import css from './style.css';
import { FaBell, FaBed, FaBath,FaPauseCircle,FaHeart,FaUser, FaDollarSign, FaLandmark, FaAngleDown, FaTextHeight, FaLocationArrow, FaSearchLocation, FaCalendar, FaCalendarWeek, FaCalendarDay, FaFilter, FaDumpster, FaDrumSteelpan, FaStopCircle, FaPlayCircle, FaHandPointRight} from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {bindActionCreators} from 'redux';
import {AlterState} from '../../core/actions/actions';
import YelloButton from '../yellow_button';
let csrftokencookie = Cookies.get('csrftoken');
class UsersCard extends Component {
    state={
        csrftokencookie:csrftokencookie
    }
    componentWillReceiveProps(){

    }
    
    render()
     { 
        // console.log(Cookies.get('csrftoken'),"yeah cookie rtendered")
          return ( 
        <div className={css.ParentCard}>
            <div className={css.cardBox}>
                <div className={css.ContentContainer}>
                    <div>
                        <span className={css.Name}>{this.props.Name}</span>
                        <span className={css.Phone}>{this.props.Phone}</span>
                        <span className={css.Email}>{this.props.Email==""?"No Email":this.props.Email}</span>
                    </div>
                    <div className={css.Connect}>
                        <YelloButton label="Connect"/>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
function mapStateToProps(state) {
    return {
        Status: state.Status
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({AlterState: AlterState}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(UsersCard);