import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';


import './user.css'
const AddImage = () => {
    const [inputs, setInputs] = useState({
        name:"",img:""
    })

    let val;
    const handleChange = (e)=>{
        val = e.target.value;
        setInputs({...inputs,name:val});
    }

    const uploadImage = (e)=>{
        console.log(e.target.files[0]);
        val = e.target.files[0];
        setInputs({...inputs,'img':val});
    }
    const email = localStorage.getItem('email');

    const sendData = async ()=>{
        if(!inputs.name || !inputs.img){
            alert("Both the fields are required to be filled");
        }else{
            if(inputs.img.type == "image/jpeg" || inputs.img.type == "image/jpg" || inputs.img.type == "image/png"){
                const url = '/api/addImage';
                let formdata = new FormData();
                formdata.append('img',inputs.img,inputs.img.name);
                formdata.append('name',inputs.name);
                formdata.append('email',email);
                let res = await axios.post(url,formdata);
                if(res.status==200){
                    alert("Image has been added successfully");
                }else{
                    alert("image not added");
                }
            }else{
                alert("image should be of type jpeg jpg or png")
            }
        }
    }


    return (
        <div>
            <Navbar />
            <section className='container'>
                <div className="heading text-center">Add Your Image</div>
                <div className="text-danger text-center mt-3">Image and name are required to be filled</div>
                <input type="text" placeholder='name of image' id='name' name='name' onChange={handleChange} />
                <input type="file" placeholder='name of image' id='image' name='image' onChange={uploadImage} />
                <div className="btn btnSolid w-100 mt-3" onClick={sendData}>Add Image</div>
            </section>
            <Footer />
        </div>
    )
}

export default AddImage