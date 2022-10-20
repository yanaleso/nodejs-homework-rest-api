const { User } = require("../../models/user")
const { RequestError } = require("../../helpers")

const updateSubscription = async (req, res) => {
  const { _id: owner } = req.user
  const result = await User.findByIdAndUpdate(owner, req.body, {new: true})
  if (!result) {
    throw RequestError(404, "Not found")
  }
  res.status(200).json(result)
}

module.exports = updateSubscription