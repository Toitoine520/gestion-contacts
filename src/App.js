import './App.css';

import { useEffect, useState } from 'react';

import ContactList from './components/ContactList';
import Header from './components/Header';
import { getContacts } from './api/ContactService';
import { Navigate, Route, Router, Routes } from 'react-router-dom';

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  const getAllContacts = async (page = 0, size = 10) => {
    try {

      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);
      console.log(data);

    } catch (error) {
      console.warn(error);
    }
  }

  const toggleModal = (show) => {
    console.log("clicked");
   };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div className="App">
      <h1>Gestionnaire de contacts</h1>
      <Header toggleModal={toggleModal} nbDeContacts={data.totalElements} />
        <Routes>
          <Route path='/' element={<Navigate to="/contacts" />} ></Route>
          <Route path='/contacts' element={ <ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts}/> } />
        </Routes>
    </div>
  );
}

export default App;
