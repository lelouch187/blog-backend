import express from 'express';
import mongoose from 'mongoose';


import { loginValidation, registerValidation } from './validation.js';
import { checkValidationErrors } from './utils/checkValidation.js';
import { checkAuth } from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js'

const app = express();
const PORT = 4444;

app.use(express.json());

app.get('/auth/me', checkAuth, UserController.auth);
app.post('/auth/register', registerValidation, checkValidationErrors, UserController.register);
app.post('/auth/login', loginValidation, checkValidationErrors, UserController.login);

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
