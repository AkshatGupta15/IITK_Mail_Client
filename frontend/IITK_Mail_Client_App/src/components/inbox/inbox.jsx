import React, { useState } from 'react'

const Inbox = () => {
    const [data,setData]=useState([]);
    const getData=()=>{
        fetch("../../Mails.json"
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            console.log(response)
            return response.json();
          })
          .then(function(myJson) {
            console.log(myJson);
            setData(myJson)
          });
      }
  return (
    <div>inbox
        <button onClick={getData}>GetData</button>
    </div>
  )
}

export default Inbox