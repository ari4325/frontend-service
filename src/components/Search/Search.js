import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Search.css';

const Search = () => {
  const [filter, setFilter] = useState('');
  const [results, setResults] = useState([]);

  const authContext = useContext(AuthContext);
  const { token } = authContext;

  const navigate = useNavigate();

  const onChange = (e) => setFilter(e.target.value);

  const onSearch = async () => {
    const res = await axios.get(`http://localhost:5000/api/dogs/${filter}`);
    setResults(res.data);
  };

  const onSave = async () => {
    const listName = `List for ${filter}`;
    const body = {
      name: listName,
      responseCodes: results,
    };
    await axios.post(`${process.env.REACT_APP_API_URL}/api/lists`, body, {
      headers: {
        Authorization: `${token}`,
      },
    });
    alert('List saved');
  };

  const onViewList = async () => {
    navigate('/lists');
  };

  return (
    <div className="search-container">
      <h1>Search</h1>
      <input
        type="text"
        value={filter}
        onChange={onChange}
        className="search-input"
      />
      <button onClick={onSearch} className="search-button">
        Search
      </button>
      <div className="results-container">
        {results.map((result) => (
          <div key={result.code} className="result-item">
            <h2>{result.code}</h2>
            <img src={result.imageUrl} alt={`Dog for ${result.code}`} />
          </div>
        ))}
      </div>
      <button onClick={onSave} className="save-button">
        Save List
      </button>
      <button onClick={onViewList} className="view-button">
        View Lists
      </button>
    </div>
  );
};

export default Search;
