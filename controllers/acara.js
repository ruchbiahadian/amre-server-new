import {db} from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getAcara = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT * FROM acara ORDER BY acara.createdAt DESC;`;

            db.query(q, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

 export const updateAcara = (req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = "UPDATE acara SET `namaAcara` = ?, `reimbursement_status` = ?, `plafon` = ?, `absensi_status` = ?, `maxAbsen` = ?, `createdAt` = ? WHERE id = ?;"

            db.query(q, [
                  req.body.namaAcara,
                  req.body.reimbursement_status,
                  req.body.plafon,
                  req.body.absensi_status,
                  req.body.maxAbsen,
                  moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                  req.body.id,
            ], (err, data) =>{
                if(err) res.status(500).json(err)
                if(data.affectedRows > 0) return res.json("Updated!")
                return res.status(403).json("You can update only your post!")
            });
            

        })
 }

 export const acaraHapus = (req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

         
            const q = "DELETE FROM acara WHERE id = ?"

            db.query(q, req.params.id,
                 (err, data) => {
                  if (err) return res.status(500).json(err);
                  if (data.affectedRows > 0) return res.json("Updated!");
                  return res.status(403).json("You can update only your reimbursement!");
                }
              );

        })
 }