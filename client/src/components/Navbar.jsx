import React from 'react'
import { Link,useNavigate} from 'react-router-dom'

import "./components.css"

const Navbar = () => {
    const navigate = useNavigate();

    const logout = async ()=>{
        const res = await fetch('/api/logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "content-Type":"application/json"
            },
            Credentials:'include'
        })
        if(res.status==200){
            navigate("/");
            window.location.reload();
        }else{
            alert("some problem in logout");
        }
    }

    return (
        <nav id='navbar'>
            <Link to="/user">
                <img src="/images/logo.png" alt="" />
            </Link>
            <div className="btn" id='logoutBtn' onClick={logout}>Logout</div>
        </nav>
    )
}

export default Navbar