import { body } from "express-validator";


export const registerValidation = [
   body('fullName').isLength({min:2}).isString(),
   body('email').isEmail(),
   body('password').isLength({min:5}),
   body('avatarURL').optional().isURL()
]