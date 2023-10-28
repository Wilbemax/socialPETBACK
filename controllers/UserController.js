import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModule from '../models/User.js'

export const register = async (req, res) => {
  try {
    

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    const doc = new UserModule({
      email: req.body.email,
      passswordHash: hash,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passswordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {}
};

export const login = async (req, res) => {
  try {
    const user = await UserModule.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "пользователь не найден",
        s,
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passswordHash
    );

    if (!isValidPass) {
      return res.status(404).json({
        message: "Не верный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passswordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "не удолось авторизоваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModule.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    const { passswordHash, ...userData } = user._doc;

    res.send(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Появилась ошибка на стадии поиска пользователя",
    });
  }
};


