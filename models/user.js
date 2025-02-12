const { Schema, model } = require('mongoose')
const Joi = require("joi")

const {handleSaveErrors} = require("../helpers")

const subscriptionOptions = ["starter", "pro", "business"]

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
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
  token: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, {versionKey: false, timestamps: true})

userSchema.post("save", handleSaveErrors)

const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
})
const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
})
const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptionOptions).required(),
})
const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
})
  
const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  verifyEmailSchema
}
const User = model("user", userSchema)

module.exports = {
    User,
    schemas,
}