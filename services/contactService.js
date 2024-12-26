import { Contact } from "../models/model.js";

export const createContactService = async (body) => {
  return Contact.create(body);
};

export const updateContactService = async (id, body) => {
  return Contact.update(body, { where: { id: id } });
};

export const getAllContactsService = async () => {
  return Contact.findAll({
    order: [['createdAt', 'DESC']],
  });
};


export const getContactByIdService = async (id) => {
  return Contact.findOne({
    where: { id: id }
      });
};

export const deleteContactByIdService = async (id) => {
    return Contact.destroy({
      where: { id: id }
    });
  };

export const deleteAllContactsService = async () => {
    return Contact.destroy({
      where: {},
      truncate: true
    });
  };
