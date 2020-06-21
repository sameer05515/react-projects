import React ,{ Component} from 'react';
import topicMgmtInstance from '../axios';

class Views extends Component{
    render(){
        
            return(
                <div> {this.props.title}</div>
            );
        
    }
}


export default Views;