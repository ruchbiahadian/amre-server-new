import moment from "moment/moment.js";
import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getPengajuan = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT absensi.*, users.email, users.nama, users.noTelp, users.univ, users.jenis, users.tahun,
            acara.namaAcara, acara.maxAbsen FROM absensi 
            JOIN users ON absensi.userId = users.id JOIN acara on absensi.acaraId = acara.id 
            WHERE absensi.status = "Diajukan"
            ORDER BY acara.createdAt DESC;`;

            db.query(q, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const absensiTerima = (req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

         
            const q = "UPDATE absensi SET `status`= ? WHERE id = ?"

            db.query(
                q,
                [
                "Disetujui",
                req.body.id
                ],
                 (err, data) => {
                  if (err) return res.status(500).json(err);
                  if (data.affectedRows > 0) return res.json("Updated!");
                  return res.status(403).json("You can update only your reimbursement!");
                }
              );

        })
 }

 export const absensiTolak = (req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

         
            const q = "UPDATE absensi SET `status`= ? WHERE id = ?"

            db.query(
                q,
                [
                "Ditolak",
                req.body.id
                ],
                 (err, data) => {
                  if (err) return res.status(500).json(err);
                  if (data.affectedRows > 0) return res.json("Updated!");
                  return res.status(403).json("You can update only your reimbursement!");
                }
              );

        })
 }

 export const getDisetujui = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT absensi.*, users.email, users.nama, users.noTelp, users.univ, users.jenis, users.tahun,
            acara.namaAcara, acara.maxAbsen FROM absensi 
            JOIN users ON absensi.userId = users.id JOIN acara on absensi.acaraId = acara.id 
            WHERE absensi.status = "Disetujui"
            ORDER BY acara.createdAt DESC;`;

            db.query(q, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const getDitolak = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT absensi.*, users.email, users.nama, users.noTelp, users.univ, users.jenis, users.tahun,
            acara.namaAcara, acara.maxAbsen FROM absensi 
            JOIN users ON absensi.userId = users.id JOIN acara on absensi.acaraId = acara.id 
            WHERE absensi.status = "Ditolak"
            ORDER BY acara.createdAt DESC;`;

            db.query(q, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const deleteAbsensi = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = "DELETE FROM absensi WHERE `id`=?";

            db.query(q, req.params.id, (err, data) =>{
                if (err) return res.status(500).json(err);
                if (data.affectedRows>0) return res.status(200).json("Post has been deleted");
                return res.status(403).json("You can delete only your post")
                
        
        });
    });
};