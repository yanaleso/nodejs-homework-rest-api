const express = require('express')

const ctrl = require("../../controllers/auth")
const { ctrlWrapper } = require("../../helpers")
const { validateBody, authenticate, upload } = require("../../middlewares")
const {schemas} = require("../../models/user")

const router = express.Router()

router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify))
router.post("/verify", validateBody(schemas.verifyEmailSchema), ctrlWrapper(ctrl.resendEmail))
router.post("/login", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.login))
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent))
router.post("/logout", authenticate, ctrlWrapper(ctrl.logout))
router.patch('/', authenticate, validateBody(schemas.updateSubscriptionSchema), ctrlWrapper(ctrl.updateSubscription))
router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))

module.exports = router