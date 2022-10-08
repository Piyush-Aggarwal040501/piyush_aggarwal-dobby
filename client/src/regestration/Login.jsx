import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";

import {Inputs} from './Inputs';

  

import { MdEmail } from "react-icons/md";
import { BsLockFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";


import './sinLog.css'


export const Login = () => {
    const navigate = useNavigate();
    
    let logo = '/images/logo.png';
    const [invalidUsernameOrPassword, setInvalidUsernameOrPassword] = useState('none')
    const [serverError, setServerError] = useState('none');
    const [emptyInput, setEmptyInput] = useState('none');

    const [input, setInput] = useState({
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
        {icon: <MdEmail />,type:'text',placeholder:'email',name:'email',value:input.email},
        {icon: <BsLockFill />,type:'password',placeholder:'Password',name:'password',value:input.password}
    ]

    const sendData = async (e)=>{
        e.preventDefault();
        const {password,email} = input;
        if(!email || !password){
            alert("important to fill all the details");
        }else{
            const fetchedData = await fetch('api/login',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    email:email,password:password
                })
            });
            if(!fetchedData){
                alert("some error in loging your account. Please try again later");
            }else{
                if(fetchedData.status === 200){
                    navigate('/user');
                    window.location.reload();
                }else if(fetchedData.status === 404){
                    alert("Invalid email or password");
                }else{
                    alert("some error in loging your account. Please try again later");
                }
            }
        }
    }

  return (
    <div id="login" className="sinLogBox">
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
                <button className="btn btnSolid bgBtn" onClick={sendData}>Log In</button>
                <div className="mt-3 text-center">
                    Don't have an account? <Link className="ms-2 link" to="/signup"> Sign Up</Link>
                </div>
            </div>
        </form>
    </div>
  );
};
