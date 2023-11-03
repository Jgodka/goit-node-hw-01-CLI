import { program } from "commander";
import * as contactService from "./contacts.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactService.listContacts();
      return console.table(allContacts); // ...

    case "get":
      const oneContacts = await contactService.getContactById(id);
      return console.log(oneContacts); // ... id

    case "add":
      const newContact = await contactService.addContact(name, email, phone);
      return console.log(newContact); // ... name email phone

    case "remove":
      const deletContact = await contactService.removeContact(id);
      return console.log(deletContact); // ... id

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

invokeAction(options);
