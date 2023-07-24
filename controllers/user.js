import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res)=>{
   const userId = req.params.userId;
   const q = "SELECT * FROM users JOIN rekening ON users.id = rekening.userId WHERE users.id = ?" 

//    const q = "SELECT * FROM users JOIN rekening ON users.id = rekening.userId WHERE users.id = ?" 

   db.query(q, [userId], (err,data)=>{
    if (err) return res.status(500).json(err)
    const {password, ...info} = data[0];
    return res.json(info)   
   })
}

export const updateUserProfile = (req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

         
            const q = "UPDATE users SET `profilePic`=?  WHERE id = ?"

            db.query(q, [
                req.body.profilePic,
                userInfo.id
            ]), (err, data) =>{
                if(err) res.status(500).json(err)
                if(data.affectedRows > 0) return res.json("Updated!")
                return res.status(403).json("You can update only your post!")
            }

        })
 }



export const updateUserTexts = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "UPDATE users SET `email`=?, `nama`=?, `noTelp`=?, `instansi`=?, `jenis`=?, `tahun`=?,`domisili`=? WHERE id = ?";
        const q_2 = "UPDATE rekening SET `nomor`=?,`bank`=?,`namaRek`=? WHERE userId = ?";

        db.query(q, [
            req.body.email,
            req.body.nama,
            req.body.noTelp,
            req.body.univ,
            req.body.jenis,
            req.body.tahun,
            req.body.domisili,
            userInfo.id
        ], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) {
                db.query(q_2, [
                    req.body.nomor,
                    req.body.bank,
                    req.body.namaRek,
                    userInfo.id
                ], (err, data) => {
                    if (err) return res.status(500).json(err);
                    if (data.affectedRows > 0) {
                        return res.status(200).json("updated");
                    } else {
                        return res.status(403).json("You can update only your post!");
                    }
                });
            } else {
                return res.status(403).json("You can update only your post!");
            }
        });
    });
};


