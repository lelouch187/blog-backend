import express from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { registerValidation } from './validation.js';
import UserModel from './models/User.js';

const app = express();
const PORT = 4444;

app.use(express.json());

app.post('/auth/register', registerValidation, async function (req, res) {
  try {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      console.log(errorValidation);
      return res.status(400).json(errorValidation.array());
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    const doc = new UserModel({
      fullName:req.body.fullName,
      email:req.body.email,
      password:passwordHash,
      avatarURL:req.body.avatarURL
    })
    const user = await doc.save()
    const token = jwt.sign({id:user._id}, 'vanusha12',{expiresIn:'72h'})
    const {password, ...userData} = user._doc
    res.json({userData, token})
  } catch (e) {
   console.log(e)
   res.status(500).json({message:'Не удалось зарегистрироваться'})
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
