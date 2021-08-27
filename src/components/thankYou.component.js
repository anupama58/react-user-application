import React, { Component } from "react";
import { Link } from 'react-router-dom';


class ThankYou extends Component {
    constructor(props){
        super(props)
        
    }

    render(){
        const userId = this.props.location.state.userId
        console.log(userId,"kjk");
        return(
            <div>
                <h1>Your details are updated successfully!</h1>
                <Link to={{pathname:"/home",state:{userId:userId}}}>
                <button className="btn btn-primary btn-block">Home</button></Link>
            </div>
        )
    }
}

export default ThankYou;