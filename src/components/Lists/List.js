import React, { useState, useEffect } from 'react';
import axios from 'axios';

const List = ({ match }) => {
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/lists/${match.params.id}`);
      setList(res.data);
    };
    fetchList();
  }, [match.params.id]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{list && list.name}</h1>
      {list && list.responseCodes.map((code) => (
        <div key={code.code} style={{ margin: '20px' }}>
          <h2>{code.code}</h2>
          <img src={code.imageUrl} alt={`Dog for ${code.code}`} />
        </div>
      ))}
    </div>
  );
};

export default List;
