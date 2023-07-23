import moment from "moment/moment.js";
import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getLaporan = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")
            
            const q = `SELECT
            rm.status AS rm_status,
            rm.kategori,
            SUM(rm.nominal) AS total_nominal,
            u.nama,
            r.nomor,
            r.bank,
            rm.acaraId   
          FROM reimbursements rm
          JOIN users u ON rm.userId = u.id
          JOIN rekening r ON rm.userId = r.userId
          WHERE rm.status = "Disetujui" AND rm.acaraId = ?
          GROUP BY rm.userId, rm.acaraId, rm.status, rm.kategori, u.nama, r.nomor, r.bank, rm.acaraId;          
          `;

            db.query(q, req.params.acaraId, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};