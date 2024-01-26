// AdminPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Fetch user list or any other admin-related data
    const fetchUserList = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getUserList'); // Create a new route for getting user list
        setUserList(response.data);
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };

    fetchUserList();
  }, []);

  return (
    <div>
      <h3>Welcome to Admin Page</h3>
      <h4>User List:</h4>
      <ul>
        {userList.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
