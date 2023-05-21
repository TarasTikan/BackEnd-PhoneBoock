const {emailShema} = require('../../JoiShems/index');
const { HttpError, transporter } = require('../../helpers');
const Users = require('../../models/userShema');
require('dotenv').config()
const recendVerifyEmail = async(req, res) => {
    const { error } = emailShema.validate(req.body);
    if(error) {
        throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації");
    }
    const {email} = req.body
    const user = await Users.findOne({email})
    if(!user) {
        throw HttpError(400, "missing required field email");
    }

    if(user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }
     const verifyEmail = {
       from: "taras0123@meta.ua",
       to: email,
       subject: "Verify email",
       html: `<a target="_blank" href="${process.env.BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify email</a>`,
     };
     transporter
       .sendMail(verifyEmail)
       .then((info) => console.log(info))
       .catch((err) => console.log(err));

       res.json({
         message: "Verification email sent",
       });
}

module.exports = recendVerifyEmail