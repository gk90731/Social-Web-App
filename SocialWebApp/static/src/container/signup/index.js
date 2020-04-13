import React, { Component } from 'react';
import css from './style.css';
import {FaEnvelope, FaKey, FaUser, FaLock, FaPhone, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import RedButton from '../../components/red_button';
import InputBox from '../../components/input_box';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {signup} from '../../core/actions/actions';
import Alert from 'react-bootstrap/Alert';
class SignUp extends Component {
     
    state = {
        FirstName:"",
        LastName:"",
        PhoneNumber:"",
        Email:"",
        Password:"",
        FirstNameValidator:null,
        LastNameValidator:null,
        PhoneNumberValidator:null,
        EmailValidator:null,
        PasswordValidator:null,
        showNotification:false,
        showNotificationMsg:""
    }

    componentDidMount(){
        if (localStorage.getItem("userToken")!=undefined){
            this.props.history.push("/");
        } 
    }

    componentWillReceiveProps(props){
        if (props.Status["USER_SIGNUP"][0] === 201){
                this.props.history.push("/login");
        }
        else{
            this.setState({showNotification:true,showNotificationMsg:"Something went wrong"})
        }
    }
    

    // data collectors from input boxes
    myFirstName = e => this.setState({FirstName: e.target.value},()=>{this.myFirstNameValidator()});
    myLastName = e => this.setState({LastName: e.target.value},()=>{this.myLastNameValidator()});
    myPhoneNumber = e => this.setState({PhoneNumber: e.target.value},()=>{this.myPhoneNumberValidator()});
    myEmail = e => this.setState({Email: e.target.value},()=>{this.myEmailValidator()});
    myPassword = e => this.setState({Password: e.target.value},()=>{this.myPasswordValidator()});


    // validators for input boxes 
    myFirstNameValidator = () =>{
        this.state.FirstName.match(/^[a-zA-Z ]*$/) === null 
        ? this.setState({FirstNameValidator:false}) 
        : this.setState({FirstNameValidator:true})
    }
    myLastNameValidator = () =>{
        this.state.LastName.match(/^[a-zA-Z ]*$/) === null 
        ? this.setState({LastNameValidator:false}) 
        : this.setState({LastNameValidator:true})
    }
    myPhoneNumberValidator = () =>{
        this.state.PhoneNumber.match(/^\d{10}$/) === null 
        ? this.setState({PhoneNumberValidator:false}) 
        : this.setState({PhoneNumberValidator:true})
    }
    myEmailValidator = () =>{
        this.state.Email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/) === null 
        ? this.setState({EmailValidator:false}) 
        : this.setState({EmailValidator:true})
    }
    myPasswordValidator = () =>{
        this.state.Password=="" 
        ?this.setState({PasswordValidator:false})
        :this.setState({PasswordValidator:true})
    }


  render() {

    return (
        <div style={{backgroundImage: `url(${"static/assets/Waste.jpg"})`,height:"800px",backgroundPosition:"center",backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
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
                    <div className={css.SignUp_box}>
                        <p className={css.SignUp_title}>Sign up</p>

                        <div className={css.SignUp_username}>
                            <FaUser className={css.SignUp_box_UserIcon}/>
                            <div className={css.SignUp_InputBox}>
                            <InputBox type="text" placeholder="First Name" onChangeValue={this.myFirstName}/>

                            {this.state.FirstNameValidator==true
                            ?<FaThumbsDown className={css.loginBox_ThumbIcon}/>
                            :this.state.FirstNameValidator==null
                            ?null
                            :<FaThumbsUp className={css.loginBox_ThumbIcon}/>}

                            </div>
                        </div>

                        <div className={css.SignUp_username}>
                            <FaUser className={css.SignUp_box_UserIcon}/>
                            <div className={css.SignUp_InputBox}>
                            <InputBox type="text" placeholder="Last Name" onChangeValue={this.myLastName}/>

                            {this.state.LastNameValidator==true
                            ?<FaThumbsDown className={css.loginBox_ThumbIcon}/>
                            :this.state.LastNameValidator==null
                            ?null
                            :<FaThumbsUp className={css.loginBox_ThumbIcon}/>}

                            </div>
                        </div>

                        <div className={css.SignUp_username}>
                            <FaPhone className={css.SignUp_box_UserIcon}/>
                            <div className={css.SignUp_InputBox}>
                            <InputBox type="text" placeholder="Phone Number" onChangeValue={this.myPhoneNumber}/>

                            {this.state.PhoneNumberValidator==true
                            ?<FaThumbsDown className={css.loginBox_ThumbIcon}/>
                            :this.state.PhoneNumberValidator==null
                            ?null
                            :<FaThumbsUp className={css.loginBox_ThumbIcon}/>}

                            </div>
                        </div>

                        <div className={css.SignUp_email}>
                            <FaEnvelope className={css.SignUp_box_UserIcon} />
                            <div className={css.SignUp_InputBox}>
                            <InputBox type="text" placeholder="youremail@domain.com" onChangeValue={this.myEmail}/>

                            {this.state.EmailValidator==true
                            ?<FaThumbsDown className={css.loginBox_ThumbIcon}/>
                            :this.state.EmailValidator==null
                            ?null
                            :<FaThumbsUp className={css.loginBox_ThumbIcon}/>}

                            </div>
                        </div>

                        <div className={css.SignUp_pass}>
                            <FaKey className={css.SignUp_box_KeyIcon}/>
                            <div className={css.SignUp_InputBox}>
                            <InputBox type="password" placeholder="password" onChangeValue={this.myPassword}/>

                            {this.state.PasswordValidator==true
                            ?<FaThumbsDown className={css.loginBox_ThumbIcon}/>
                            :this.state.PasswordValidator==null
                            ?null
                            :<FaThumbsUp className={css.loginBox_ThumbIcon}/>}

                            </div>
                        </div>

                        {/* <div className={css.SignUp_confirmpass}>
                            <FaLock className={css.SignUp_box_LockIcon}/>
                            <div className={css.SignUp_InputBox}><InputBox type="password" placeholder="Confirm password" /></div>
                        </div> */}

                        <div className={css.SignUp_button}>
                            <RedButton  type="submit" label="Sign - up"
                            onSubmit={() => this.props.signup(this.state.PhoneNumber,
                                                             this.state.Email,
                                                             this.state.FirstName,
                                                             this.state.LastName,
                                                             this.state.Password)}/>
                        </div>

                        <p className={css.Already_account}>Already have an account, <span className={css.Already_accountSpan}>Log-in</span></p>
                        <p className={css.terms_conditions}>
                            By signing up I accept the <span className={css.terms_conditionsSpan1}>Terms & Conditions</span> and <span className={css.terms_conditionsSpan2}>Privacy Policy</span>
                        </p>
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
    return bindActionCreators({signup: signup}, dispatch);
}



export default connect(mapStateToProps, matchDispatchToProps)(SignUp);