const { HttpError } = require("../../helpers");
const Users = require("../../models/userShema")

const verifyEmail = async(req, res) => {
const { verificationToken } = req.params;
const user = await Users.findOne({ verificationToken });
if(!user) {
    throw HttpError(404, "User not found");
}

await Users.findByIdAndUpdate(user._id, {verify: true, verificationToken: ""})

res.json({ message: "Verification successful" });
}

module.exports = verifyEmail