import React from 'react'
import { useState } from 'react';
const TestCard = () => {
  const [inputA, setInputA] = useState({ myInput: "" }); 
  console.log(inputA)
  return (
    <div className="container"> 
 <div className="row mt-5 text-center"> 
 <div className="col-6"> 
 <input 
 onChange={(event) => { 
 setInputA({ ...inputA, myInput: event.target.value
  });
 }} 
 name="myInput" 
 type="text" 
 /> 
 </div> 
 </div> 
 </div> 
 ); 
  
}

export default TestCard