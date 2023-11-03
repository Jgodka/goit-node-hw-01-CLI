import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

//Повертає масив контактів.
export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

//Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact || null;
};

//Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((c) => c.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const [result] = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

//Повертає об'єкт доданого контакту.
export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};
