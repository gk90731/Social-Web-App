import React, { Component } from 'react';
import css from './style.css';
import ExtendedNavBar from '../../components/extendednavbar';
import { FaDollarSign, FaBed, FaBath, FaTimes, FaLandmark, FaImage, FaPhone } from 'react-icons/fa';
import YellowButton from '../../components/yellow_button';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {HashRouter as Router, Route, Switch, Redirect,Link} from "react-router-dom";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {newPost} from '../../core/actions/actions';
import axios from 'axios';

class AddPost extends Component {
    state={
        PostTitle:"",
        Content:"",
        Image:null,
        IsVisibilityAll:true,
        csrftokencookie:""
    }
    componentDidMount(){
        var csrftokencookie = Cookies.get('csrftoken');
        this.setState({csrftokencookie:csrftokencookie})
    }
    
    myPostTitle = e => this.setState({PostTitle:e.target.value});
    myContent = e => this.setState({Content:e.target.value})
    myImage = e => {this.setState({Image:e.target.files[0]})};
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        let form_data = new FormData();
        form_data.append('image', this.state.Image, this.state.Image.name);
        form_data.append('title', this.state.PostTitle);
        form_data.append('content', this.state.Content);
        form_data.append('isVisibilityAll', this.state.IsVisibilityAll);
        let url = 'http://localhost:8000/posts/';
        axios.post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization':"Token "+String(localStorage.getItem('userToken'))
          }
        })
            .then(res => {
              console.log(res);
              res.status==201?this.props.history.push("/home"):null;
            })
            .catch(err => console.log(err))
      };
    

    componentWillReceiveProps(props){
        if (this.props.propertyList["propertyList"]!=undefined){
            if (this.props.propertyList["propertyList"][1] === 201){
                this.setState({creationStatus:201})
            }}
     }
    render() {
            if (this.state.creationStatus === 201){
                return <><Redirect to='/home' /> {()=>this.setState({creationStatus:null})}</>
            }
            // console.log(this.state.Image)
            // console.log(this.state.IsVisibilityAll)

      return (
        
          <div style={{backgroundImage: `url(${"static/frontend/BgImage2.png"})`,height:"850px",backgroundPosition:"center",backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
              <ExtendedNavBar history={this.props.history}/>
              <div className="container">
                  <div className="row">
                      
                        <div className={css.addproperty_box}>
                            <div className={css.cancel}>
                            <Link className={css.Link} to="/home"><FaTimes className={css.addPropertyBox_CancelIcon}/></Link>
                            </div>
                            <div className={css.AddProperty_heading}>
                                <p>Post New</p>
                            </div>
                            <div>
                            <div className={css.upper_half}>
                            <div className={css.bedroom}>
                                <input type="text" placeholder="Enter Title Of your Post" onChange={this.myPostTitle} required/>
                            </div>
                            </div>
                            <div className={css.description}>
                                <p>Content <span className={css.Description_Span}>Max 1000 letters</span></p>
                                <textarea onChange={this.myContent} name="" id=""></textarea>
                            </div>
                            
                            <div className={css.upload}>
                                <input type="file"
                                        id="image"  onChange={this.myImage} />
                            </div>

                            <div className={css.select_option} id="Selections" onChange={(e)=>{this.setState({IsVisibilityAll: e.target.value})}}>
                                <p>Select who can see ?</p>
                                <div>
                                <input type="radio" id="Only_Friends" name="select" value="false" 
                                />&nbsp;&nbsp;
                                <label for="Only_Friends">Only Friends</label>
                                </div>

                                <div>
                                <input type="radio" id="All" name="select" value="true" 
                                />&nbsp;&nbsp;
                                <label for="All">All</label>
                                </div>

                            </div>

                            <div className={css.addProperty_yellowbutton}>
                                <i><YellowButton label="Publish" onSubmit={this.handleSubmit}/></i>
                            </div>
                        </div>
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
    return bindActionCreators({newPost: newPost}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(AddPost);