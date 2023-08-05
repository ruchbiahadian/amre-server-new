import { db } from "../connect.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const q = "SELECT email FROM (SELECT email FROM pendaftaran WHERE email = ? UNION SELECT email FROM users WHERE email = ?) AS mix;";

  db.query(q, [req.body.email, req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Email sudah terdaftar atau anda dalam proses menunggu persetujuan admin");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO pendaftaran (`email`, `nama`, `jenisMagang`, `tahunMagang`,  `password`) VALUES (?)";

    const values = [
      req.body.email,
      req.body.nama,
      req.body.jenis,
      req.body.tahun,
      hashedPassword,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({message: "User mengajukan pendaftaran, menunggu persetujuan admin!" });
    });
  });
};

  

export const login = (req, res) =>{

    const q = "SELECT * FROM users WHERE email = ?";

    const tokenDuration = (3600000 * 6);
    const expirationDate = new Date(Date.now() + tokenDuration);

    db.query(q, [req.body.email], (err, data) =>{
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("Email tidak ditemukan!");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if(!checkPassword) return res.status(400).json("Password salah!")

        const token = jwt.sign({id:data[0].id}, "secretkey")

        // const {password, ...others} = data[0];
        const userWithoutPassword = { ...data[0] };
        delete userWithoutPassword.password;

        res.cookie("accessToken", token, {
            httpOnly: true,
            expires: expirationDate,
            sameSite: 'none', 
            secure: true,     
          }).status(200).json(userWithoutPassword);
    });
};

export const logout = (req, res) => {
    res.clearCookie('accessToken', {
      sameSite: 'none',
      secure: true
    }).status(200).json('User has been logged out!');
  };