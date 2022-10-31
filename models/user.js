const { Schema, model } = require('mongoose')
const Joi = require("joi")

const {handleSaveErrors} = require("../helpers")

const subscriptionOptions = ["starter", "pro", "business"]

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscriptionOptions,
    default: "starter"
  },
  avatarURL: String,
  token: String
}, {versionKey: false, timestamps: true})

userSchema.post("save", handleSaveErrors)

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
})
const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptionOptions).required(),
})
  
const schemas = {
  registerSchema,
  updateSubscriptionSchema
}
const User = model("user", userSchema)

module.exports = {
    User,
    schemas,
}