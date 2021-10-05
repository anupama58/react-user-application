import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axiosHelper';

class Home extends Component{
    constructor(props){
        super(props)
    
        this.state ={
            items:[],
            isloaded:false,
        }
    }

    async componentDidMount(){
        const userId = this.props.location.state.userId
        const singleUserResponse = await api.post('', {
            query: `
                query user($id:Int!){
                    user(id:$id){
                        id,
                        firstName,
                        lastName,
                        userName,
                        emailId,
                        mobileNo
                    }
                }`,
            variables:{
                id:userId,
            }
        });
        const {                         
            id,
            firstName,
            lastName,
            userName,
            emailId,
            mobileNo  } = singleUserResponse.user;
            this.setState({
                        isloaded:true,
                        items:singleUserResponse.user
                    });
        // console.log(userId);
        // fetch('http://localhost:3000/user/'+userId+'/edit',{
        //     method:"GET",
        //     headers:{
        //         "Content-Type":"application/json",
        //     },
        // })
        // .then(res=>res.json())
        // .then(result => {
        //     this.setState({
        //         isloaded:true,
        //         items:result
        //     });
        // });

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