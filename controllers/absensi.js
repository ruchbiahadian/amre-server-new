import moment from "moment/moment.js";
import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getPengajuan = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT absensi.*, users.email, users.nama, users.noTelp, users.univ, users.jenis, users.tahun
            FROM absensi JOIN users ON absensi.userId = users.id
            WHERE absensi.status = "Diajukan"
            ORDER BY absensi.createdAt DESC;`;

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

            const q = `SELECT absensi.*, users.email, users.nama, users.noTelp, users.univ, users.jenis, users.tahun
            FROM absensi JOIN users ON absensi.userId = users.id
            WHERE absensi.status = "Disetujui"
            ORDER BY absensi.createdAt DESC;`;

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

            const q = `SELECT absensi.*, users.email, users.nama, users.noTelp, users.univ, users.jenis, users.tahun
            FROM absensi JOIN users ON absensi.userId = users.id
            WHERE absensi.status = "Ditolak"
            ORDER BY absensi.createdAt DESC;`;

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

export const getAbsen = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const userId = req.params.userId;

            const q = `SELECT * FROM absensi ORDER BY absensi.createdAt DESC;`

            db.query(q, userId, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const addAbsen = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = "INSERT INTO absensi (`createdAt`, `absencePic`,  `status`, `kategori`, `userId`, `acaraId`) VALUES (?)";

            const values = [
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                req.body.absencePic,
                req.body.status,
                req.body.kategori,
                userInfo.id,
                req.body.acaraId
            ];

            db.query(q, [values], (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json("Reimbursement has been created");
        
        });
    });
};

export const updateAbsen = (req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

         
            const q = "UPDATE absensi SET `createdAt`=?, `absencePic`=?, `status`=?, `kategori`=? WHERE id = ?"

            db.query(
                q,
                [
                  moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                  req.body.absencePic,
                  req.body.status,
                  req.body.kategori,
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

 export const checkAbsen = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = ` SELECT (SELECT maxAbsen FROM acara WHERE id = ? ) 
            AS max_absen, SUM(CASE WHEN acaraId = ? THEN createdAt ELSE NULL END) 
            AS created_at FROM absensi ab WHERE ab.userId = ? AND acaraId = ?;`;

            db.query(q, 
                [
                    req.params.acaraId,
                    req.params.acaraId,
                    userInfo.id,
                    req.params.acaraId
                ], 
            (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};
  
