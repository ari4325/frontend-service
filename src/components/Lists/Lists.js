import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import '../../Lists.css';

const Lists = () => {
  const [lists, setLists] = useState([]);
  const authContext = useContext(AuthContext);
  const { token } = authContext;

  useEffect(() => {
    const fetchLists = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/lists`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setLists(res.data);
    };
    fetchLists();
  }, [token]);

  const deleteList = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/lists/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    setLists(lists.filter((list) => list._id !== id));
  };

  return (
    <div className="lists-container">
      <h1>Lists</h1>
      {lists.map((list) => (
        <div key={list._id} className="list-item">
          <h2>{list.name}</h2>
          <div className="response-codes">
            {list.responseCodes.map((item, index) => (
              <img key={index} src={item.imageUrl} alt={`Dog for ${item.code}`} />
            ))}
          </div>
          <button onClick={() => deleteList(list._id)} className="delete-button">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Lists;
