import { body } from "express-validator";


export const registerValidation = [
   body('fullName','Слишком короткое имя').isLength({min:2}).isString(),
   body('email','Пожалуйста введите корректный email').isEmail(),
   body('password','Слишком короткий пароль').isLength({min:5}),
   body('avatarURL','Введите корректную ссылку на аватар').optional().isURL()
]
export const loginValidation = [
   body('email','Пожалуйста введите корректный email').isEmail(),
   body('password','Слишком короткий пароль').isLength({min:5}),
]