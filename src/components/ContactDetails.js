import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getContactById } from "../api/ContactService";

function ContactDetails({ updateContact, updateImage }) {
  const inputRef = useRef();
  const [contact, setDonneesContact] = useState({
    nom: "",
    email: "",
    telephone: "",
    pays: "",
    status: "",
    urlImage: "",
  });
  /**
   * id récupéré dans l'url
   *
   * */
  const { id: idContact } = useParams();

  const fetchContactById = async (id) => {
    try {
      const { data } = await getContactById(id);
      setDonneesContact(data);
    } catch (error) {
      console.error(
        "Le sdonnées du coontact n'ont pas pu être récupérées" + error
      );
    }
  };

  useEffect(() => {
    fetchContactById(idContact);
  }, [idContact]);

  return (
    <>
      <Link className="link" to={"/"}>
        Retour
      </Link>
      <div className="border-s-violet-100 infos-contact flex items-center justify-center">
        <img src={contact.urlImage || null} alt={contact.nom} />

        <div className="nom-contact bg-gray-600">{contact.nom}</div>
        <div className="pays-contact bg-red-400">{contact.email}</div>
        <div className="email-contact">{contact.telephone}</div>
        <div className="telephone-contact">{contact.pays}</div>
        <div className="status-contact">{contact.status}</div>
      </div>

      <form style={{ display: "none" }}>
        <input type="file" ref={inputRef}></input>
      </form>
    </>
  );
}

export default ContactDetails;
