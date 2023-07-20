import { db } from "../connect.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";
  
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists!");
  
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  
      const q = "INSERT INTO users (`email`, `nama`, `noTelp`, `univ`,  `jenis`, `tahun`, `domisili`, `password`, `profilePic`) VALUES (?)";
  
      const values = [
        req.body.email,
        req.body.nama,
        "Belum diisi",
        "Belum diisi",
        req.body.jenis,
        req.body.tahun,
        "Belum diisi",
        hashedPassword,
        "default.jpg"
      ];
  
      let insertedId;
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        insertedId = data.insertId;
  
        const q_2 = "INSERT INTO rekening (`nomor`, `bank`, `namaRek`, `userId`) VALUES (?)";
  
        const values_2 = [
          "Belum diisi",
          "Belum diisi",
          "Belum diisi",
          insertedId
        ];
  
        db.query(q_2, [values_2], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json({ id: insertedId, message: "User has been created." });
        });
      });
    });
  };
  

export const login = (req, res) =>{

    const q = "SELECT * FROM users WHERE email = ?";

    const tokenDuration = (3600000 * 2);
    const expirationDate = new Date(Date.now() + tokenDuration);

    db.query(q, [req.body.email], (err, data) =>{
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("User not found!");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if(!checkPassword) return res.status(400).json("Wrong password")

        const token = jwt.sign({id:data[0].id}, "secretkey")

        const {password, ...others} = data[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
            expires: expirationDate,
          }).status(200).json(others);
    });
};

export const logout = (req, res) => {
    res.clearCookie('accessToken', {
      sameSite: 'none',
      secure: true
    }).status(200).json('User has been logged out!');
  };