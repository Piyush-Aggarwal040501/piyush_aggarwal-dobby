// importing librarirs 
import react,{useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";



// importing all pages or components 
import {Login} from './regestration/Login';
import {Signup} from './regestration/Signup';
import AllImages from './user/AllImages';
import AddImage from './user/AddImage';

import './App.css'




function App() {


	return (
		<div>
		
		<BrowserRouter>
			<div>
				<Routes>
					<Route exact path="/" element={<Login />} />
					<Route exact path="/signup" element={<Signup />} />
					<Route exact path="/user" element={<AllImages />} />
					<Route exact path="/user/addImage" element={<AddImage />} />
				</Routes>
			</div>
		</BrowserRouter>
		</div>
	);
}

export default App;
