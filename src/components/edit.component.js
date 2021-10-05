import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from '../utils/axiosHelper';

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            isloaded: false,
        }
    }


    async componentDidMount() {
        const userId = parseInt(this.props.match.params.id);//another way of fetching id 

        const editUserResponse = await api.post('', {
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
            variables: {
                id: userId,
            }
        });
        const {
            id,
            firstName,
            lastName,
            userName,
            emailId,
            mobileNo } = editUserResponse.user;
        this.setState({
            isloaded: true,
            items: editUserResponse.user
        });
    }

    async update() {
        const { firstname,lastname,mobile} = this.state;
        console.log(this.state);
        const userId = parseInt(this.props.match.params.id)
        const updateResponse = await api.post('', {
            query: `
                mutation updateUser($id:Int,$firstname:String,$lastname:String,$mobile:String){
                    updateUser(id:$id,firstname:$firstname,lastname:$lastname,mobile:$mobile){
                        message,
                        result
                    }
                }`,
            variables: {
                id: userId,
                firstname:firstname,
                lastname:lastname,
                mobile:mobile
            }
        });
        console.log(updateResponse.updateUser);
        const {message,result} = updateResponse.updateUser;
 
        this.setState({
            isloaded: true,
            result: result
        });
        if(result){
            this.props.history.push({
                pathname: '/thankyou',
                state: { userId: userId }
            });
        }


        // fetch('http://localhost:3000/user/' + userId + '/update', {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(this.state)
        // }).then((result) => {
            
        // })


    }
    render() {
        const userData = this.state.items
        return (
            <div>
                <h2>Update profile details</h2>
                <label>First name</label>
                <input type="text" defaultValue={userData.firstName} className="form-control" onChange={(e) => { this.setState({ firstName: e.target.value }) }} /><br />
                <label>Last name</label>
                <input type="text" defaultValue={userData.lastName} className="form-control" onChange={(e)=>{this.setState({lastname:e.target.value}) }}/><br />
                <label>User name</label>
                <input type="text" defaultValue={userData.userName} disabled={true} className="form-control" /><br />
                <label>Email Id</label>
                <input type="text" defaultValue={userData.emailId} disabled={true} className="form-control" /><br />
                <label>Mobile No.</label>
                <input type="text" defaultValue={userData.mobileNo} className="form-control" onChange={(e)=>{this.setState({mobile:e.target.value}) }}/><br />
                <button className="btn btn-primary btn-block" onClick={() => this.update()}>Update</button>

            </div>
        )
    }
}
export default Edit;