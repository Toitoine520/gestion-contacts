import './App.css';

import { useEffect, useRef, useState } from 'react';

import ContactList from './components/ContactList';
import Header from './components/Header';
import { getContacts, postSaveContact } from './api/ContactService';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  //popup formulaire
  const modalRef = useRef();
  // ref de la photo chargée
  const fileRef = useRef();
  // données contacts
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  // photo chargée
  const [file, setFile] = useState(undefined);
  //template utilisateur vide
  const [valeursContact, setValeursContact] = useState({
    nom: '',
    email: '',
    telephone: '',
    pays: '',
    status: '',
  });

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

  // affichage de la popup
  const toggleModal = (show) => {
    show ? modalRef.current.showModal() : modalRef.current.close();
  };
  
  // Récupère les infos du champ rempli et les rentre un objet "values"  
  const onChange = (e) => {
    setValeursContact({ ...valeursContact, [e.target.name]: e.target.value });
    console.log(valeursContact);
  }

  // à l'initialisation
  useEffect(() => {
    getAllContacts();
  }, []);

  /**
   * Enregistrement d'un nouveau contact
   * 
   * @param {} event 
   */
  const enregistrerNouveauContact = async (event) => {
    event.preventDefault(); //evite le rafraichissement de la page
    try {
      const sauvegarde = await postSaveContact(valeursContact);
      console.log(sauvegarde);
    } catch (error) {
      console.log(error)
    }
  }

  return (
  <>
    <div className="App">
      <h1>Gestionnaire de contacts</h1>
      <Header toggleModal={toggleModal} nbDeContacts={data.totalElements} />
        <Routes>
          <Route path='/' element={<Navigate to="/contacts" />} ></Route>
          <Route path='/contacts' element={ <ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts}/> } />
        </Routes>
    </div>

    {/* Modal */}
    <dialog ref={modalRef} className="modal" id="modal">
    <div className="modal__header">
      <h3>New Contact</h3>
      <i onClick={() => toggleModal(false)} className="bi bi-x-lg">X</i>
    </div>
    <div className="divider"></div>
    <div className="modal__body">
      
      <form onSubmit={enregistrerNouveauContact}>
        <div className="user-details">
          <div className="input-box">
            <span className="details">Nom</span>
            <input type="text" value={valeursContact.name} onChange={onChange} name='nom' required />
          </div>
          <div className="input-box">
                <span className="details">Email</span>
            <input type="email" value={valeursContact.email} onChange={onChange} name='email' required />
          </div>
          <div className="input-box">
            <span className="details">Téléphone</span>
            <input type="text" value={valeursContact.phone} onChange={onChange} name='telephone' required />
          </div>
          <div className="input-box">
            <span className="details">Pays</span>
            <input type="text" value={valeursContact.address} onChange={onChange} name='pays' required />
          </div>
          <div className="input-box">
            <span className="details">Statut</span>
            <input type="text" value={valeursContact.status} onChange={onChange} name='status' required />
              </div>
              
          <div className="file-input">
            <span className="details">Photo de Profil</span>
                <input type="file" accept='.png, .jpeg, .jpg' onChange={(event) => setFile(event.target.files[0])} ref={fileRef} required/>
          </div>
              
        </div>
            
        <div className="form_footer">
          <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Annuler</button>
          <button type='submit' className="btn">Enregistrer</button>
        </div>
      </form>
          
    </div>
    </dialog>
  </>
  );
}

export default App;
