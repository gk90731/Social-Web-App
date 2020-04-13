import React, { Component } from 'react';
import css from './style.css';
import { FaBell, FaBed, FaBath,FaPauseCircle,FaHeart,FaUser, FaDollarSign, FaLandmark, FaAngleDown, FaTextHeight, FaLocationArrow, FaSearchLocation, FaCalendar, FaCalendarWeek, FaCalendarDay, FaFilter, FaDumpster, FaDrumSteelpan, FaStopCircle, FaPlayCircle} from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {bindActionCreators} from 'redux';
import {AlterState} from '../../core/actions/actions';
let csrftokencookie = Cookies.get('csrftoken');
class Cards extends Component {
    state={
        csrftokencookie:csrftokencookie
    }
    componentDidMount(){
    }
    componentWillReceiveProps(){
        
    }
    
    render()
    
     { 
        // console.log(Cookies.get('csrftoken'),"yeah cookie rtendered")
        
          return (  
        <div className={css.ParentCard}>
            <div className={css.cardBox}>
                <div className={css.leftPart}>
                    <img src={String(this.props.Image)}/>

                </div>
                <div className={css.rightPart}>
                    <h5>{this.props.Title}</h5>
                    <p>{this.props.Content}</p>
                </div>
            </div>
            <br/>
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
export default connect(mapStateToProps, matchDispatchToProps)(Cards);