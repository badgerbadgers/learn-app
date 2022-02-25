import React, { useEffect } from 'react';
import Layout from '../components/Layout';

const getData = async () => {
  let res = await fetch('/api/users.js');
  let data = await res.json();
  setUser(data);
}

function InputForm() {
  useEffect(() => {
    getData();
  }, [])

  return (
    <div>
      <Layout />
    </div>
  )
}

export default InputForm;