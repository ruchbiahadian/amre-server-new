import {db} from "../connect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getPendaftar = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT * FROM pendaftaran;`;

            db.query(q, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const hapusPendaftar = (req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

         
            const q = "DELETE FROM pendaftaran WHERE id = ?"

            db.query(q, req.params.id,
                 (err, data) => {
                  if (err) return res.status(500).json(err);
                  if (data.affectedRows > 0) return res.json("Updated!");
                  return res.status(403).json("You can update only your reimbursement!");
                }
              );

        })
 }

 export const resetPassword = (req, res)=>{
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in!")

      jwt.verify(token, "secretkey", (err, userInfo)=>{
          if(err) return res.status(403).json("Token is not valid!")

          const q = "UPDATE users SET `password`=?  WHERE id = ?"

          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(req.body.email, salt);

          db.query(q, [hashedPassword, req.body.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Updated!");
            return res.status(403).json("You can update only your post!");
          });          

      })
}


 export const terimaPendaftar = (req, res) => {

      const q = "INSERT INTO users (`email`, `nama`, `noTelp`, `instansi`,  `jenis`, `tahun`, `domisili`, `password`, `profilePic`, `role`) VALUES (?)";
  
      const values = [
        req.body.email,
        req.body.nama,
        "Belum diisi",
        "Belum diisi",
        req.body.jenisMagang,
        req.body.tahunMagang,
        "Belum diisi",
        req.body.password,
        "default.jpg",
        3
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
    };

export const getDaftarAkun = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT id, email, nama, jenis, tahun FROM users WHERE users.role = 3;`;

            db.query(q, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const hapusDaftarAkun = (req, res)=>{
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in!")

      jwt.verify(token, "secretkey", (err, userInfo)=>{
          if(err) return res.status(403).json("Token is not valid!")

       
          const q = "DELETE FROM users WHERE id = ?"

          db.query(q, req.params.id,
               (err, data) => {
                if (err) return res.status(500).json(err);
                if (data.affectedRows > 0) return res.json("Updated!");
                return res.status(403).json("You can update only your reimbursement!");
              }
            );

      })
}