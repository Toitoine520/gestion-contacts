import { Link } from "react-router-dom";

function Contact({ contact }) {
    return (
        <Link to={`/contacts/${contact.id}`} href="#id" className="contact__item">
            <div className="contact__header">
                <div className="contact__image">
                    <img src={contact.photoUrl} alt={contact.nom}/>
                </div>
                <div className="contact__details">
                    <p className="contact_name"> {contact.nom}</p>
                </div>
            </div>
            <div className="contact__body">
                <p className="contact__email"> {contact.email} </p>
                <p className="contact__telephone"> {contact.telephone} </p>
                <p className="contact__pays"> {contact.pays} </p>
                <p className="contact__status"> {contact.status} </p>
            </div>
        </Link>
    );
}

export default Contact