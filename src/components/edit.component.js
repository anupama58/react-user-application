import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Edit extends Component {
    constructor(props){
        super(props)
        this.state ={
            items:[],
            isloaded:false,
        }
    }


    componentDidMount(){
        const userId = this.props.match.params.id;//another way of fetching id 
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

    update(){
        console.log("state",this.state);
        console.log("state",this.state);
        const userId = this.props.match.params.id
        fetch('http://localhost:3000/user/'+userId+'/update',{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(this.state)
        }).then((result)=>{
            result.json().then((resp)=>{
                this.props.history.push({
                    pathname: '/thankyou',
                    state:{userId:userId}
                });
               
            })
        })
        
    }
    render(){
        const userData = this.state.items
        return (
            <div>
                <h2>Update profile details</h2>
                <label>First name</label>
                <input type="text" defaultValue={userData.firstName} className="form-control"  onChange={(e)=>{this.setState({firstName:e.target.value})}}/><br/>
                <label>Last name</label>
                <input type="text" defaultValue={userData.lastName} className="form-control"/><br/>
                <label>User name</label>
                <input type="text" defaultValue={userData.userName} disabled={true} className="form-control"/><br/>
                <label>Email Id</label>
                <input type="text" defaultValue={userData.emailId} disabled={true} className="form-control"/><br/>
                <label>Mobile No.</label>
                <input type="text" defaultValue={userData.mobileNo} className="form-control"/><br/>
                <button className="btn btn-primary btn-block" onClick={()=>this.update()}>Update</button>

            </div>
        )
    }
}
export default Edit;