import { useState } from 'react';
import './model.css'
import { supabase } from '../../App';

const Model = ({ close,data }) => {
    const [name,setName]=useState(data.user_name)
    const [bio,setBio]=useState(data.bio)
    const [phone,setPhone]=useState(data.phone)
    const [location,setLocation]=useState(data.location)
    console.log(data);
        
        
        const handleEditProfile= async()=>{
            const { error } = await supabase
            .from('profiles')
            .update({ user_name: name ,bio:bio,phone:phone,location:location})
            .eq('id', data.id)
            if(error){
                console.log(error);
            }
            window.location.reload()
        }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Edit Profile</h2>
        <form >
            <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder='Bio'value={bio} onChange={(e)=>setBio(e.target.value)}/>
            <input type="text" placeholder='Phone No.' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            <input type="text" placeholder='Location' value={location} onChange={(e)=>setLocation(e.target.value)}/>

        </form>
        <button onClick={close}>Close</button>
        <button onClick={handleEditProfile}>Submit</button>
      </div>
    </div>
  );
};

export default Model;
