import Contact from "./Contact";

function ContactList({ data, currentPage, getAllContacts }){
    return <main className="main">
        {data?.content?.length === 0 && <div>Aucun Contact</div>}

        <ul className="contact__list">

            {data?.content?.length > 0 && data.content.map(contact => <Contact contact={contact} key={contact.id}></Contact>)}
            
        </ul>

        {data?.content?.length > 0 && data?.totalPages > 1 &&
            <div className="pagination">
                <a href="#vide" onClick={() => getAllContacts(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>
                    &laquo; Page précédente
                </a>
                <a href="#vide" onClick={() => getAllContacts(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>
                    Page suivante &raquo;
                </a>
            </div>}

    </main>;
}

export default ContactList