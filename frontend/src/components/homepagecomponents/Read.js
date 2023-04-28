import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Read = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const res = await axios.get("http://localhost:8081/user");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUser();
  }, []);

  console.log(user);

  return (
    <div>
      <div className="users">
        {user.map((user) => (
          <div key={user.id} className="user">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.password}</p>
            
          
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Read;
