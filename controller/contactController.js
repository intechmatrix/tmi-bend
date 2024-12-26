import { HttpStatus } from "../config/httpStatusCodes.js";
import { contactService } from "../services/index.js";

import { sendEmailToAdmin } from '../utils/nodemailer.js'; // Adjust the path if necessary to import the sendEmailToAdmin function


export const createContact = async (req, res, next) => {
  
    try {
      const {
        fullName,
        email,
        phoneNumber,
        institution,
        message,
        active,
      } = req.body;
  
      if (!fullName || !email || !phoneNumber || !institution || !message) {
        return res
          .status(HttpStatus.BAD_REQUEST_400)
          .json({ error: "Please provide all the required information" });
      }
  
      
  
      // Proceed to create the contact
      const contact = await contactService.createContactService({
        fullName,
        email,
        phoneNumber,
        institution, message,
        active,
         });

         // Send email to admin with the contact form data
    // await sendEmailToAdmin(contact);
    await sendEmailToAdmin('contact', contact);


  
      res.json({ message: "Contact created successfully", contact });
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: "Internal server error" });
    }
  };


export const viewAllContact = async (req, res, next) => {
  
    try {
      
  
      // Fetch and return all contact queries
      const contact = await contactService.getAllContactsService();
      res.json({ contact });
    } catch (error) {
      console.error('Error viewing contact queries:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };
  

export const viewContact = async (req, res, next) => {

  try {
      const { id } = req.params;

            
   
      // Find ContactQuery by id
      const contact = await contactService.getContactByIdService(id);
      if (!contact) {
          return res.status(HttpStatus.NOTFOUND_404).json({ error: 'contactQuery not found' });
      }

      res.json({ contact });
  } catch (error) {
      console.error('Error viewing contactQuery:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};


export const deleteContact = async (req, res, next) => {
  
  try {
    const { id } = req.params;

   
    // Find contact query by id
    const contact = await contactService.getContactByIdService(id);
    if (!contact) {
      return res.status(HttpStatus.NOTFOUND_404).json({ error: 'ContactQuery not found' });
    }

   
    // Delete ContactQuery
    await contactService.deleteContactByIdService(id);

    res.json({ message: 'ContactQuery deleted successfully' });
  } catch (error) {
    console.error('Error deleting ContactQuery:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const deleteAllContact = async (req, res) => {
    
  try {
     
     
      // Find all ContactQuery and delete them
      const contacts = await contactService.getAllContactsService();
      
      for (const contact of contacts) {
       
          await contactService.deleteContactByIdService(contact.id);
      }

      res.json({ message: 'All contactQueries deleted successfully' });
  } catch (error) {
      console.error('Error deleting all contactQueries:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};
    
  