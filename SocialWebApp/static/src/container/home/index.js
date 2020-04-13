import React, { Component } from 'react';
import css from './style.css';
import HomeNavBar from '../../components/home_navbar/index';
import Filter from '../../components/filter/index';
import Cards from '../../components/cards/index';
import Cookies from 'js-cookie';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getPosts} from '../../core/actions/actions';
var csrftokencookie = Cookies.get('csrftoken');
class Home extends Component {
  state ={
    getPosts:null,
  }
  getPostsApiCall = () =>{this.props.getPosts()} //api call to get the Posts for News Feed
  componentDidMount(){
    this.getPostsApiCall();
  }
  
  componentWillReceiveProps(props){
    this.setState({getPosts:props["Status"]["GET_POSTS"]})
  }
  
  render() {
    console.log(this.state.getPosts+"Its from home")
    return (
        <>
        <HomeNavBar history={this.props.history}/>
        <div className={css.CardsContainers}>
          {this.state.getPosts!=null?
          this.state.getPosts.map((Post)=><Cards Title={Post.title}
                                                  Content={Post.content}
                                                  Image={Post.image}/>)
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
  return bindActionCreators({getPosts: getPosts}, dispatch);
}


//connect function -- empowering the component by glueing the mapStateToProps and matchDispatchToProps
export default connect(mapStateToProps, matchDispatchToProps)(Home);

