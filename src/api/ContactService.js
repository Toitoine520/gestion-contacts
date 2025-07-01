import axios from "axios"

const URL_API = "http://localhost:8080/contacts"

export async function postSaveContact(contact) {
    return await axios.post(URL_API, contact);
}

export async function getContacts(page = 0, size = 9) {
  return await axios.get(`${URL_API}?page=${page}&size=${size}`);
}

/**
 * Requète à l'API pou récupérer l'utilisateur
 * @param {id} id identifiant créé par défaut à la création dans la bdd
 * @returns Retourne l'utilisateur avec l'identifiant donné
 */
export async function getContactById(id) {
    return await axios.get(`${URL_API}/${id}`);
}
export async function updateContact(contact) {
    return await axios.post(URL_API, contact);
}

export async function updatePhoto(formData) {
    return await axios.put(`${URL_API}/photo`, formData);
}

export async function deleteContactById(id) {
    return await axios.delete(`${URL_API}/${id}`);
}