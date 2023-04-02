import { body } from 'express-validator';

export const registerValidation = [
  body('fullName', 'Слишком короткое имя').isLength({ min: 2 }).isString(),
  body('email', 'Пожалуйста введите корректный email').isEmail(),
  body('password', 'Слишком короткий пароль').isLength({ min: 5 }),
  body('avatarURL', 'Введите корректную ссылку на аватар').optional().isURL(),
];
export const loginValidation = [
  body('email', 'Пожалуйста введите корректный email').isEmail(),
  body('password', 'Слишком короткий пароль').isLength({ min: 5 }),
];
export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите такст статьи').isLength({ min: 10 }).isString(),
  body('tags', 'Не верный формат тэгов (укажите массив)').optional().isArray(),
  body('imgUrl', 'Неверная ссылка на изображение').optional().isURL(),
];
