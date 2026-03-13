import logo from './logo.svg';
import './App.css';
import FileUpload from './component/FileUpload';
import axios from 'axios';
import { payloadCreation } from './utility/createPayload.js';
import { useEffect, useState } from 'react';
import Search from './component/search/Search.jsx';
import Table from './component/table/Table.jsx';
import Layout from './component/layout/Layout.jsx';
function App() {
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
