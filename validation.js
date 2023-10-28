import { body } from "express-validator";
///-------проверяем волидацию строк для регистрации-------
export const registerValidation = [
  body("email", "не веррный формат почты").isEmail(),
  body("password", "Пароль дложен быть минимум 5 символов").isLength({
    min: 5,
  }),
  body("fullName", "укажите настоящее имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверныя ссылка на аватарку").optional().isURL(),
];

///-------проверяем волидацию строк для входа на страницу-------
export const loginValidation = [
  body("email", "не веррный формат почты").isEmail(),
  body("password", "Пароль дложен быть минимум 5 символов").isLength({
    min: 5,
  }),
];

///-------проверяем волидацию строк для входа на страницу-------
export const postCreaterValidation = [
  body("title", "Введите заголовок статььи").isLength({ min: 3 }).isString(),
  body("text", "Введите тескт статьи")
    .isLength({
      min: 3,
    })
    .isString(),
  body("tags", "Неверный формат тэгов").optional(),
  body("imageUrl", "Неверная ссылка на изображение").optional(),
];
