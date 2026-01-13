import { useState, useRef, useEffect } from "react";
import "./SearchUser.css";
import { supabase } from "../../App";
import contact from '../../assets/contact.png'
import { useNavigate } from "react-router-dom";

export default function SearchUsers() {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [profileId, setProfileId] = useState("");
    const boxRef = useRef();
    const navigate=useNavigate()    
    useEffect(() => {
        const loadProfile = async () => {
        const { data } = await supabase
        .from("profiles")
        .select("*")

        setUsers(data);
        };
        
        loadProfile();
    }, []);
  const filtered = users.filter(u =>
    u.user_name.toLowerCase().includes(query.toLowerCase())
    
);
console.log(filtered)

  useEffect(() => {
    const handler = (e) => {
      if (!boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openProfile=()=>{
    console.log(profileId);
    if(profileId!=""){
        navigate(`/user/${profileId}`)
        setProfileId("")
        window.location.reload()
    }
  }
  useEffect(()=>{
    openProfile()
  },[profileId])
  return (
    <div className="search-box" ref={boxRef}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
      />

      {open && (
        <div className="search-dropdown">
          {filtered.length === 0 ? (
            <div className="empty">No results</div>
          ) : (
            filtered.map(user => (
              <div className="item" id={user.id} key={user.id}onClick={(e)=>{setProfileId(e.target.id)}} >
                {user.user_pic===null?<img src={contact}/>:<img src={user.user_pic} />
            }
                <div>
                  <b>{user.user_name}</b>
                  <span>{user.bio}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
