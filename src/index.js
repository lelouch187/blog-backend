import express from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { loginValidation, registerValidation } from './validation.js';
import UserModel from './models/User.js';
import { checkValidationErrors } from './utils/checkValidation.js';

const app = express();
const PORT = 4444;

app.use(express.json());

app.post('/auth/register', registerValidation, checkValidationErrors, async function (req, res) {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      password: passwordHash,
      avatarURL: req.body.avatarURL,
    });
    const user = await doc.save();
    const token = jwt.sign({ id: user._id }, 'vanusha12', { expiresIn: '72h' });
    const { password, ...userData } = user._doc;
    res.json({ userData, token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Не удалось зарегистрироваться' });
  }
});
app.post('/auth/login', loginValidation, checkValidationErrors, async function (req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'Неверный логин или пароль' });
    }
    const checkPassword =await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) {
      return res.status(404).json({ message: 'Неверный логин или пароль' });
    }
    const token = jwt.sign({id:user._id},'vanusha12',{expiresIn:'72h'})
    const {password, ...userData} = user._doc
    res.json({userData, token})
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Не удалось авторизоваться' });
  }
});

function start() {
  try {
    app.listen(PORT, () => console.log('Server start'));
    mongoose
      .connect(
        'mongodb+srv://admin:vanusha12@cluster0.ppmiq1w.mongodb.net/blog?retryWrites=true&w=majority',
      )
      .then(() => console.log('DB Start'));
  } catch (e) {
    console.log(e);
  }
}
start();
