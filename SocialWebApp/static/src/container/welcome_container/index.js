import React, {Component} from 'react';
import Welcome from '../../components/welcome/index';
class WelcomeContainer extends Component {  
    
    render() {
        return (
        <div style={{backgroundImage: `url(${"static/assets/social_network_copy.png"})`,height:"760px",backgroundPosition:"center",backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
            <Welcome/>
      </div>
        );
    }
}
export default WelcomeContainer;