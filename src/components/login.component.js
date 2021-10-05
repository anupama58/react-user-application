import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import api from '../utils/axiosHelper';

class Login extends Component {
    constructor(){
        super()
        this.state={
            isRegister:false
        };
        this.api = api;
    }

    /**
     * @summary 
     */
    async login() {
        console.log("state",this.state);
        const { username, password } = this.state;
        const userLoginResponse = await api.post('', {
            query: `
                mutation userLogin($username:String!,$password:String!){
                    userLogin(username:$username,password:$password){
                        message,
                        token,
                        code
                    }
                }`, 
            variables:{
                username:username,
                password:password
            }
        });

        const { message, token, code  } = userLoginResponse.userLogin;
        this.setState({
            isRegister: code === 200 ? true : false,
        });

        if(this.state.isRegister && token){
            localStorage.setItem("auth",JSON.stringify(token));
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-','+').replace('-','/');
            const tokenData =JSON.parse(window.atob(base64))
            const userId =tokenData.userId;  
            console.log(userId);                  
            this.props.history.push({
                pathname: '/home',
                state:{userId:userId}
            });
        }
    }
    // login(){
    //     console.log("state",this.state);
    //     fetch('http://localhost:3000/user/login',{
    //         method:"POST",
    //         headers:{
    //             "Content-Type":"application/json",
    //         },
    //         body:JSON.stringify(this.state)
    //     }).then((result)=>{
    //         result.json().then((resp)=>{
    //             this.setState({
    //                 isRegister:true,
    //             });
    //             localStorage.setItem("auth",JSON.stringify(resp.success.token));
    //             if(resp.success.token){
    //                 const base64Url = resp.success.token.split('.')[1];
    //                 const base64 = base64Url.replace('-','+').replace('-','/');
    //                 const tokenData =JSON.parse(window.atob(base64))
    //                 const userId =tokenData.userId;  
    //                 console.log(userId);                  
    //                 this.props.history.push({
    //                     pathname: '/home',
    //                     state:{userId:userId}
    //                 });
    //             }
               
    //         })
    //     })
    // }

    isDisabled(){
        if(this.state.username && this.state.username!=''){
            if(this.state.password && this.state.password!=''){
                return false;
            }else{
                return true;
            }
        }else{
            return true;
        }
    }

    render() {
        var auth = JSON.parse(localStorage.getItem('auth'))

        return (
            
            <div>
                
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>User name</label>
                    <input type="username" className="form-control" placeholder="Enter user name"  onChange={(e)=>{this.setState({username:e.target.value})}}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={(e)=>{this.setState({password:e.target.value})}}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button className="btn btn-primary btn-block" onClick={()=>this.login()} disabled={this.isDisabled()}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </div>
        );
    }
}
export default Login;