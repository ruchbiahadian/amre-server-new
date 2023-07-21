import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getJenis = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT * FROM jenis_reimbursement;`;

            db.query(q, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const jenisReimsHapus = (req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

         
            const q = "DELETE FROM jenis_reimbursement WHERE id = ?"

            db.query(q, req.params.id,
                 (err, data) => {
                  if (err) return res.status(500).json(err);
                  if (data.affectedRows > 0) return res.json("Updated!");
                  return res.status(403).json("You can update only your reimbursement!");
                }
              );

        })
 }

 export const jenisReimsTambah = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = "INSERT INTO jenis_reimbursement (`namaJenis`) VALUES (?)";

            db.query(q, req.body.texts, (err, data) =>{
                
                if (err){
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(409).json("Reimbursement already exists!");
                      }
                    return res.status(500).json(err);
                } 
                return res.status(200).json("Reimbursement has been created");
        
        });
    });
};