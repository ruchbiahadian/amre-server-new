import moment from "moment/moment.js";
import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getReim = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const userId = req.params.userId;

            const q = `SELECT reimbursements.* , rekening.nomor, rekening.bank, rekening.namaRek FROM reimbursements 
            JOIN rekening ON reimbursements.userId = rekening.userId 
            WHERE reimbursements.userId = ? ORDER BY reimbursements.createdAt DESC;`;

            db.query(q, userId, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const getPengajuan = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT reimbursements.* , rekening.nomor, rekening.bank, rekening.namaRek, users.nama, users.email, users.jenis, users.tahun FROM reimbursements 
            JOIN rekening ON reimbursements.userId = rekening.userId JOIN users ON reimbursements.userId = users.id
            WHERE reimbursements.status = "Diajukan" ORDER BY reimbursements.createdAt DESC `;

            db.query(q, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const getDisetujui = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT reimbursements.* , rekening.nomor, rekening.bank, rekening.namaRek, users.nama, users.email, users.jenis, users.tahun FROM reimbursements 
            JOIN rekening ON reimbursements.userId = rekening.userId JOIN users ON reimbursements.userId = users.id
            WHERE reimbursements.status = "Disetujui" ORDER BY reimbursements.createdAt DESC `;

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

            const q = `SELECT reimbursements.* , rekening.nomor, rekening.bank, rekening.namaRek, users.nama, users.email, users.jenis, users.tahun FROM reimbursements 
            JOIN rekening ON reimbursements.userId = rekening.userId JOIN users ON reimbursements.userId = users.id
            WHERE reimbursements.status = "Ditolak"  ORDER BY reimbursements.createdAt DESC`;

            db.query(q, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const addReim = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = "INSERT INTO reimbursements (`status`, `createdAt`, `kategori`, `nominal`, `jenis`, `invoicePic`, `userId`) VALUES (?)";

            const values = [
                req.body.status,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                req.body.kategori,
                req.body.nominal,
                req.body.jenis,
                req.body.invoicePic,
                userInfo.id
            ];

            db.query(q, [values], (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json("Reimbursement has been created");
        
        });
    });
};

export const updateReim = (req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

         
            const q = "UPDATE reimbursements SET `status`=?, `createdAt`=?, `kategori`=?, `nominal`=?, `jenis`=?, `invoicePic`=?  WHERE id = ?"

            db.query(
                q,
                [
                  req.body.status,
                  moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                  req.body.kategori,
                  req.body.nominal,
                  req.body.jenis,
                  req.body.invoicePic,
                  req.body.id,
                ],
                (err, data) => {
                  if (err) return res.status(500).json(err);
                  if (data.affectedRows > 0) return res.json("Updated!");
                  return res.status(403).json("You can update only your reimbursement!");
                }
              );

        })
 }

 export const reimTerima = (req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

         
            const q = "UPDATE reimbursements SET `status`= ? WHERE id = ?"

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

 export const reimTolak = (req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

         
            const q = "UPDATE reimbursements SET `status`= ? WHERE id = ?"

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


export const deleteReim = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = "DELETE FROM reimbursements WHERE `id`=?";

            db.query(q, req.params.id, (err, data) =>{
                if (err) return res.status(500).json(err);
                if (data.affectedRows>0) return res.status(200).json("Post has been deleted");
                return res.status(403).json("You can delete only your post")
                
        
        });
    });
};