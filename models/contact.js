const { Schema, model } = require('mongoose')
const Joi = require("joi")

const {handleSaveErrors} = require("../helpers")

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
}, {versionKey: false, timestamps: true})

contactSchema.post("save", handleSaveErrors)

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})
  
const schemas = {
    addSchema,
    updateFavoriteSchema
}
const Contact = model("contact", contactSchema)

module.exports = {
    Contact,
    schemas,
}