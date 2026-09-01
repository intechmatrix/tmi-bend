import { Service, Testimonial, Portfolio, Team, Client } from "../models/model.js";
import { uploadImage, deleteImage } from "../services/cloudinary.js";
import { dbIsConnected } from "../utils/database.js";
import { jsonStore } from "../utils/jsonStore.js";
import fs from "fs";

const models = {
  service: Service,
  testimonial: Testimonial,
  portfolio: Portfolio,
  team: Team,
  client: Client,
};

export const getAll = async (req, res) => {
  const { type } = req.params;
  const Model = models[type];

  if (!Model) return res.status(400).json({ message: "Invalid type" });

  if (!dbIsConnected) {
    const data = jsonStore.getAll(type);
    return res.status(200).json(data);
  }

  try {
    const data = await Model.findAll({ where: { active: true } });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOne = async (req, res) => {
  const { type, id } = req.params;
  const Model = models[type];

  if (!Model) return res.status(400).json({ message: "Invalid type" });

  if (!dbIsConnected) {
    const data = jsonStore.getOne(type, id);
    if (!data) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(data);
  }

  try {
    const data = await Model.findByPk(id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBySlug = async (req, res) => {
  const { slug } = req.params;

  if (!dbIsConnected) {
    const data = jsonStore.getBySlug("service", slug);
    if (!data) return res.status(404).json({ message: "Service not found" });
    return res.status(200).json(data);
  }

  try {
    const data = await Service.findOne({ where: { slug, active: true } });
    if (!data) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  const { type } = req.params;
  const Model = models[type];
  if (!Model) return res.status(400).json({ message: "Invalid type" });

  try {
    const payload = { ...req.body };
    
    if (req.files) {
      const file = req.files.image || req.files.logo;
      if (file) {
        const result = await uploadImage(file.tempFilePath, type);
        payload.image = result.secure_url;
        payload.logo = result.secure_url;
      }
    }

    // Handle features/benefits if they are coming as stringified JSON
    if (payload.features && typeof payload.features === "string") {
      payload.features = JSON.parse(payload.features);
    }
    if (payload.benefits && typeof payload.benefits === "string") {
      payload.benefits = JSON.parse(payload.benefits);
    }

    if (!dbIsConnected) {
      const data = jsonStore.create(type, payload);
      return res.status(201).json(data);
    }

    const data = await Model.create(payload);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  const { type, id } = req.params;
  const Model = models[type];
  if (!Model) return res.status(400).json({ message: "Invalid type" });

  try {
    const payload = { ...req.body };

    if (req.files) {
      const file = req.files.image || req.files.logo;
      if (file) {
        const result = await uploadImage(file.tempFilePath, type);
        payload.image = result.secure_url;
        payload.logo = result.secure_url;
      }
    }

    if (payload.features && typeof payload.features === "string") {
      payload.features = JSON.parse(payload.features);
    }
    if (payload.benefits && typeof payload.benefits === "string") {
      payload.benefits = JSON.parse(payload.benefits);
    }

    if (!dbIsConnected) {
      const data = jsonStore.update(type, id, payload);
      if (!data) return res.status(404).json({ message: "Not found" });
      return res.status(200).json(data);
    }

    const data = await Model.findByPk(id);
    if (!data) return res.status(404).json({ message: "Not found" });

    await data.update(payload);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  const { type, id } = req.params;
  const Model = models[type];
  if (!Model) return res.status(400).json({ message: "Invalid type" });

  if (!dbIsConnected) {
    const success = jsonStore.remove(type, id);
    if (!success) return res.status(404).json({ message: "Not found" });
    return res.status(200).json({ message: "Deleted successfully" });
  }

  try {
    const data = await Model.findByPk(id);
    if (!data) return res.status(404).json({ message: "Not found" });
    
    await data.update({ active: false }); // Soft delete
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
