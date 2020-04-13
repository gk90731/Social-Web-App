// *
// *
// * myUsername    =  to handle onChange for username
// * myPassword    =  to handle onChange for password
// * handleSubmit  =  to handle onClick of Login button
// * onChangeValue =  used as props for chlid component to handle change in input boxes
// * onSubmit      =  used as props for chlid component to handle click of login button
// *
// *

import React, {Component} from 'react';
import css from './style.css';
import { FaEnvelope, FaKey, FaPhone, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import RedButton from '../../components/red_button';
import InputBox from '../../components/input_box';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login} from '../../core/actions/actions';
import Alert from 'react-bootstrap/Alert';
class Login extends Component {  
    state = {
          phoneNumber:"",
          password:"",
          phoneNumberValidator:null,
          passwordValidator:null,
          showNotification:false,
          showNotificationMsg:"",
        }
    

    componentDidMount(){
        if (localStorage.getItem("userToken")!=undefined){
            this.props.history.push("/");
        } 
    }
    componentWillReceiveProps(props){
        console.log(props.Status["USER_LOGIN"][1])
        if (props.Status["USER_LOGIN"][1] === 200){
            localStorage.setItem('userToken', props.Status["USER_LOGIN"][0]) ;
                this.props.history.push("/home");
        }
        else{
            console.log("jdhsfjhsdjkfkjdskjfjdskfjkdjskfjksdjfkksdjfkjdkfjdkfjkdjfkdjkfsjk")
            this.setState({showNotification:true,showNotificationMsg:"Something went wrong"})
        }
    }

    myUsername = e => this.setState({phoneNumber: e.target.value},()=>{this.myUsernameValidator()});
    myPassword = e => this.setState({password: e.target.value},()=>{this.mypasswordValidator()});
    myUsernameValidator = () =>{
        this.state.phoneNumber.match(/^\d{10}$/) === null 
        ? this.setState({phoneNumberValidator:false}) 
        : this.setState({phoneNumberValidator:true})
    }
    mypasswordValidator = () =>{
           this.state.password=="" 
           ?this.setState({passwordValidator:false})
           :this.setState({passwordValidator:true})
    }
    render() {
        // console.log(this.state.passwordValidator)
        // console.log(this.props)
        return (
        <div style={{backgroundImage: `url(${"/media/post_images/gaura.jpg"})`,height:"800px",backgroundPosition:"center",backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
        <div className="container">
                <div className={css.loginBox_notification}>
                {this.state.showNotification
                    ?<Alert onClose={()=>{this.setState({showNotification:false})}} variant="danger" dismissible>
                        <Alert.Heading>{this.state.showNotificationMsg}</Alert.Heading>
                        <p>
                            Please try again.
                        </p>
                        </Alert>
                    :null}
                </div>
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6">
                  <div className={css.loginbox}>
                      <p>Sign in</p>
                      <div className={css.loginemail}>
                          <FaPhone className={css.loginBox_EnvelopeIcon}/>
                          <div className={css.loginemail_input}>
                            <InputBox type="text" placeholder="Phone Number" onChangeValue={this.myUsername}/>
                          </div>
                          {this.state.phoneNumberValidator==true
                          ?<FaThumbsDown className={css.loginBox_ThumbIcon}/>
                          :this.state.phoneNumberValidator==null
                          ?null
                          :<FaThumbsUp className={css.loginBox_ThumbIcon}/>}
                      </div>
                      <div className={css.loginpass}>
                          <FaKey className={css.loginBox_KeyIcon}/>
                          <div className={css.loginemail_input}>
                            <InputBox type="password" placeholder="Password" onChangeValue={this.myPassword}/>
                          </div>
                          {this.state.passwordValidator==true
                          ?<FaThumbsDown className={css.loginBox_ThumbIcon}/>
                          :this.state.passwordValidator==null
                          ?null
                          :<FaThumbsUp className={css.loginBox_ThumbIcon}/>}
                      </div>
                      <div className={css.forgotpass}>
                          <p>Forgot Password?</p>
                      </div>
                      <div className={css.loginbutton}>
                        <RedButton type="submit" label="Login" onSubmit={() => this.props.login(this.state.phoneNumber,
                                                                                                this.state.password)}/>
                      </div>
                  </div>
                </div>
                <div className="col-md-3">
                
                </div>
            </div>
        </div>
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
    return bindActionCreators({login: login}, dispatch);
}

//connect function -- empowering the component by glueing the mapStateToProps and matchDispatchToProps
export default connect(mapStateToProps, matchDispatchToProps)(Login);