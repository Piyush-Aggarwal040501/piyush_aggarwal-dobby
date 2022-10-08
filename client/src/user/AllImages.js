import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import ImageCard from './ImageCard'
import {AiOutlinePlus} from 'react-icons/ai'
import Loading from '../components/Loading'
import './user.css'


const AllImages = () => {

    const [username, setUsername] = useState("");
    const [imagesArray, setImagesArray] = useState([]);
    const [loading, setLoading] = useState(true);

    const [input, setInput] = useState("");

    const handleChange = (e)=>{
        setInput(e.target.value);
    }

    const getData = async ()=>{
        setLoading(true);
        const res = await fetch('/api/userDetails',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                details:"getting details"
            })
        })
        if(res.status==200){
            let {data} = await res.json();
            setUsername(data.username);
            localStorage.setItem("email",data.email);
            setImagesArray(data.images);
            setLoading(false);
        }else{
            setLoading(false);
            alert("unable to laod");
        }
    }

    useEffect(() => {
        getData();
    }, [])
    

    return (
        <div>
            <Navbar />
                {loading 
                    ?<Loading />
                    :<section className='container'>
                        <div className="heading text-center mb-2">{username} 's studio</div>
                        <input type="text" id='searchBar' placeholder='search here' onChange={handleChange} />
                        <div className="imagesBox d-flex">
                            {imagesArray.length == 0
                            ?<div className='heading text-center' style={{color:'gray'}}>No Images</div>
                            :imagesArray.filter((items)=>{
                                if(items.name.toLowerCase().includes(input.toLowerCase())){
                                    return true
                                }
                                return false;
                            }).map((items)=>(
                                <ImageCard image={items.image} name={items.name} />
                            ))}
                        </div>
                        <Link to="/user/addImage" id="addImageIcon">
                            <AiOutlinePlus />
                        </Link>
                    </section>
                }
            <Footer />
        </div>
    )
}

export default AllImages