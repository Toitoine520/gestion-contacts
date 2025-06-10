function Header({toggleModal, nbDeContacts}){
    return <header className="header">
        <div className="container">
            <h3>Contacts ({nbDeContacts}) </h3>
            <button onClick={() => toggleModal(true)} className="btn">Ajouter un contact</button>
        </div>
    </header>;
}

export default Header