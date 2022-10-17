const express = require('express')

const ctrl = require("../../controllers/auth")
const { ctrlWrapper } = require("../../helpers")
const { validateBody, authenticate } = require("../../middlewares")
const {schemas} = require("../../models/user")

const router = express.Router()

router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))
router.post("/login", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.login))
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))
router.post("/logout", authenticate, ctrlWrapper(ctrl.logout))
router.patch('/', authenticate, validateBody(schemas.updateSubscriptionSchema), ctrlWrapper(ctrl.updateSubscription))

module.exports = router