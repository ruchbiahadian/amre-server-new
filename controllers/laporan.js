import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getLaporan = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")
            
            const q = `SELECT
                            rm.status AS rm_status,
                            SUM(rm.nominal) AS total_nominal,
                            u.nama,
                            r.nomor,
                            r.bank,
                            rm.acaraId,
                            a.namaAcara
                        FROM reimbursements rm
                        JOIN users u ON rm.userId = u.id
                        JOIN rekening r ON rm.userId = r.userId
                        JOIN acara a ON rm.acaraId = a.id
                        WHERE rm.status = "Disetujui" AND rm.acaraId = ?
                        GROUP BY rm.userId, rm.acaraId, rm.status, u.nama, r.nomor, r.bank, rm.acaraId          
          `;

            db.query(q, req.params.acaraId, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const getTotalReim = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")
            
            const q = `SELECT SUM(nominal) AS total FROM reimbursements WHERE acaraId = ? and status = "Disetujui"`;

            db.query(q, req.params.acaraId, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const getAbsen = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")
            
            const q = `SELECT ab.createdAt, ab.status, u.email, u.nama, ac.namaAcara 
                        FROM absensi ab 
                        JOIN users u ON  ab.userId = u.id 
                        JOIN acara ac ON ab.acaraId = ac.id 
                        WHERE ab.acaraId = ? AND ab.status = "Disetujui"`;

            db.query(q, req.params.acaraId, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};