const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(25);
const description = Joi.string().min(3).max(30);
const isActive = Joi.boolean().default(true);
const imageUrl = Joi.string().uri();

const createCategorySchema = Joi.object({
  name: name.required(),
  description: description.required(),
  isActive: isActive.required(),
  imageUrl: imageUrl.required()
});

const updateCategorySchema = Joi.object({
  name: name,
  description: description,
  isActive: isActive,
  imageUrl: imageUrl
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }
