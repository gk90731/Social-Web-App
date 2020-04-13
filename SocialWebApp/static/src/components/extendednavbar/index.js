import React, { Component } from 'react';
import css from './style.css';
import { FaBell, FaHeart, FaUser, FaUserCircle,FaAngleDown, FaSearch } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logout,userByFilter} from '../../core/actions/actions';
import {HashRouter as Router, Route, Switch, Redirect,Link} from "react-router-dom";
import InputBox from '../../components/input_box';
class ExtendedNavBar extends Component {
  state={
    searchItem:null
  }
  handleLogout = () => {
    var csrftokencookie = Cookies.get('csrftoken');
    this.props.logout(csrftokencookie); 
    // console.log(csrftokencookie)  
  }
  handleSearchChange = (e) => {
    this.setState({searchItem:e.target.value})
  }
  handleSearchClick = () =>{
    var csrftokencookie = Cookies.get('csrftoken');
    this.props.userByFilter(this.state.searchItem,csrftokencookie); 
  }
  componentDidMount(){
    
    
    
  }
  componentWillReceiveProps(props){
    if (props.Status["USER_LOGOUT"]!=undefined){
      if (props.Status["USER_LOGOUT"][0]["status"] === 200){
        localStorage.clear() ;
        if(this.props.history && this.props.history.push)
        this.props.history.push("/");
      }
      }
      // if (props.Status["USER_BY_FILTER"]!=undefined){
      //   if (props.Status["USER_BY_FILTER"][0]["status"] === 200){
      //     if(this.props.history && this.props.history.push)
      //     this.props.history.push("/users");
      //   }
      //   }
  }
  render() 
  {
    console.log(this.props.Status +"hiiiiiiiiiiiiiiii ia ma ")
      
    return (
        <div>
          <div className={css.myExtendedNavBar}>
              
            <ul className={css.ul2}>
                {/* since ul1 className is applied once */}
                <li><img src={"static/assets/logo.png"} alt=""/></li>
                <li><div className={css.new_verticalbar}></div></li>
                <li className={css.new_house_price}>SocailWeb App</li>
            </ul>
              <div className={css.searchBox}>
                <input className={css.searchInput} placeholder="search people" onChange={this.handleSearchChange}/>
                <Link className={css.Link} to="/users"><FaSearch className={css.searchIcon} onClick={this.handleSearchClick}/></Link>
              </div>

            <ul className={css.ul3}>
                <li className={css.ul3_bell}><FaBell className={css.ul3_bellIcon} /><span className={css.badge}><p>5</p></span></li>
                <li className={css.ul3_User}><FaUserCircle id="UncontrolledPopover" className={css.ul3_UserCircleIcon} /></li>
                <UncontrolledPopover placement="bottom" target="UncontrolledPopover" className={css.PopOver}>
                  <PopoverHeader onClick={this.handleLogout}>LogOut</PopoverHeader>
                  <Link className={css.Link} to="/userProfile"><PopoverHeader >My Profile</PopoverHeader></Link>
                  <PopoverHeader >Connection Profile</PopoverHeader>
                  {/* <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody> */}
                </UncontrolledPopover>
            </ul>
          </div>
          {/* <div className={css.recomendation_box}>
            <div className={css.recomendation_card}>
              <span className={css.Card_Phone}>9801319162</span>
              <span className={css.Card_Name}>Kumar Gaurav</span>
              <span className={css.Card_Label}>From your Connection</span>
              <hr/>
            </div>
            <div className={css.recomendation_card}>
              <span className={css.Card_Phone}>9801319162</span>
              <span className={css.Card_Name}>Kumar Gaurav</span>
              <span className={css.Card_Label}>From your Connection</span>
              <hr/>
            </div>
          </div> */}
        </div>
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
  return bindActionCreators({logout: logout,userByFilter : userByFilter}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(ExtendedNavBar);

