import jwt from 'jsonwebtoken';

import UserModel from '../models/User.js'

export const login = async function (req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'Неверный логин или пароль' });
    }
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) {
      return res.status(404).json({ message: 'Неверный логин или пароль' });
    }
    const token = jwt.sign({ id: user._id }, 'vanusha12', { expiresIn: '72h' });
    const { password, ...userData } = user._doc;
    res.json({ userData, token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Не удалось авторизоваться' });
  }
};
export const register = async function (req, res) {
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
};
export const auth = async function (req, res) {
  try {
    const user = await UserModel.findById(req.id.id);
    if (!user) {
      return res.status(404).json({ message: 'Вы не авторизованы' });
    }
    const { password, ...userData } = user._doc;
    res.json(userData);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Не удалось проверить авторизацию' });
  }
};
