import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";

import {Inputs} from './Inputs';

  

import { BsFillPersonFill } from "react-icons/bs";
import { BsLockFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";


import './sinLog.css'



export const Signup = () => {
    const navigate = useNavigate();
    
    let logo = '/images/logo.png';

    const [input, setInput] = useState({
        username:"",
        email:"",
        password:"",
    })
    let name,value;
    const handleInput = (e)=>{
        name = e.target.name;
        value = e.target.value;
        setInput({...input,[name]:value});
    }


    const inputArray = [
        {icon: <BsFillPersonFill />,type:'text',placeholder:'Username',name:'username',value:input.username},
        {icon: <MdEmail />,type:'email',placeholder:'Email',name:'email',value:input.email},
        {icon: <BsLockFill />,type:'password',placeholder:'Password',name:'password',value:input.password}
    ]

    const sendData = async (e)=>{
        e.preventDefault();
        const {username,password,email} = input;
        if(!email || !username || !password){
            alert("important to fill all the details");
        }else{
            const fetchedData = await fetch('api/signup',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    username:username,email:email,password:password
                })
            });
            if(!fetchedData){
                alert("some error in creating account. Please try again later");
            }else{
                if(fetchedData.status === 201){
                    navigate('/user');
                   window.location.reload();
                }else if(fetchedData.status === 203){
                    alert("Email already exist. Login to continue");
                }else{
                    alert("some error in creating account. Please try again later");
                }
            }
        }
    }

  return (
    <div id="signup" className="sinLogBox">
        <form method="POST" className="container d-flex flex-column justify-content-center">
            <div className="box my-1">
                <div className="logo my-4">
                    <div>
                        <img src={logo} alt="Uploader" />
                    </div>
                </div>
                {inputArray.map((input,index)=>(
                    <Inputs input={input} index={index} page='login' handleInput={handleInput} />
                ))}
                <button className="btn btnSolid bgBtn" onClick={sendData}>Create Account</button>
                <div className="mt-3 text-center">
                    Alreafy have an account have an account? <Link className="ms-2 link" to="/"> Log In</Link>
                </div>
            </div>
        </form>
    </div>
  );
};
