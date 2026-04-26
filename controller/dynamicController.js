import { Service, Testimonial, Portfolio } from "../models/model.js";
import { uploadImage, deleteImage } from "../services/cloudinary.js";
import fs from "fs";

const models = {
  service: Service,
  testimonial: Testimonial,
  portfolio: Portfolio,
};

export const getAll = async (req, res) => {
  const { type } = req.params;
  const Model = models[type];

  if (!Model) return res.status(400).json({ message: "Invalid type" });

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
    
    if (req.files && req.files.image) {
      const file = req.files.image;
      const result = await uploadImage(file.tempFilePath, type);
      payload.image = result.secure_url;
    }

    // Handle features/benefits if they are coming as stringified JSON
    if (payload.features && typeof payload.features === "string") {
      payload.features = JSON.parse(payload.features);
    }
    if (payload.benefits && typeof payload.benefits === "string") {
      payload.benefits = JSON.parse(payload.benefits);
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
    const data = await Model.findByPk(id);
    if (!data) return res.status(404).json({ message: "Not found" });

    const payload = { ...req.body };

    if (req.files && req.files.image) {
      const file = req.files.image;
      const result = await uploadImage(file.tempFilePath, type);
      payload.image = result.secure_url;
      // Ideally delete old image from cloudinary here if data.image exists
    }

    if (payload.features && typeof payload.features === "string") {
      payload.features = JSON.parse(payload.features);
    }
    if (payload.benefits && typeof payload.benefits === "string") {
      payload.benefits = JSON.parse(payload.benefits);
    }

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

  try {
    const data = await Model.findByPk(id);
    if (!data) return res.status(404).json({ message: "Not found" });
    
    await data.update({ active: false }); // Soft delete
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
