import React, { Component} from 'react';
import { Link } from 'react-router-dom';

class Home extends Component{
    constructor(props){
        super(props)
    
        this.state ={
            items:[],
            isloaded:false,
        }
    }

    componentDidMount(){
        const userId = this.props.location.state.userId
        console.log(userId);
        fetch('http://localhost:3000/user/'+userId+'/edit',{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
        })
        .then(res=>res.json())
        .then(result => {
            this.setState({
                isloaded:true,
                items:result
            });
        });

    }
    render(){

       const {items} = this.state;
       const isLoaded = this.state.isloaded;
       if(!isLoaded){
           return <div>Loading...</div>
       }else{
            return(
                <div>
                <ul>
                    <div>Welcome {items.firstName} {items.lastName}
                     <h6>Please check your details as below</h6> 
                    </div>
                    <li key={items.id}><p>{items.userName}</p></li>
                    <li><p>{items.emailId}</p></li>
                    <li><p>{items.mobileNo}</p></li>                    
                </ul>
                <Link to={items.id+"/edit"}>
                <button className="btn btn-primary btn-block">Edit</button></Link>
                </div>
                
            )
       }
    }
}

export default Home;