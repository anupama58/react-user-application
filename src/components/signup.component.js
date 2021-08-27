import React, { Component } from "react";

export default class SignUp extends Component {

    register(){
        console.log("state",this.state);
        fetch('http://localhost:3000/user/sign-up',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(this.state)
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp);
                localStorage.setItem("auth",JSON.stringify(resp.success.token));
                if(resp.success.token){
                    this.props.history.push('/login');
                }
            })
        })
    }

    render() {
        return (
                <div>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" onChange={(e)=>{this.setState({firstname:e.target.value})}}/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" onChange={(e)=>{this.setState({lastname:e.target.value})}}/>
                </div>

                <div className="form-group">
                    <label>User name</label>
                    <input type="text" className="form-control" placeholder="User name" onChange={(e)=>{this.setState({username:e.target.value})}}/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={(e)=>{this.setState({email:e.target.value})}} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={(e)=>{this.setState({password:e.target.value})}} placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Mobile</label>
                    <input type="number" className="form-control" onChange={(e)=>{this.setState({mobile:e.target.value})}} placeholder="Enter Mobile No." />
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={()=>this.register()}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </div>
        );
    }
}