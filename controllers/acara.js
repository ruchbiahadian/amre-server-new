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

export const updateAcara = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const updateQuery =
        "UPDATE acara SET `namaAcara` = ?, `reimbursement_status` = ?, `plafon` = ?, `absensi_status` = ?, `maxAbsen` = ?, `createdAt` = ? WHERE id = ?";
      const { namaAcara, reimbursement_status, plafon, absensi_status, maxAbsen, id } = req.body;
  
      db.beginTransaction((err) => {
        if (err) return res.status(500).json(err);
  
        db.query(
          updateQuery,
          [
            namaAcara,
            reimbursement_status,
            plafon,
            absensi_status,
            maxAbsen,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            id,
          ],
          (err, data) => {
            if (err) {
                console.error("step 0:", err);
              db.rollback(() => res.status(500).json(err));
            } else {
              const tempTableQuery = `  CREATE TEMPORARY TABLE temp_total_sum AS
                                        SELECT acaraId, userId, SUM(nominal) AS current_sum
                                        FROM reimbursements
                                        WHERE acaraId = ? AND (status = "Disetujui" OR status = "Diajukan")
                                        GROUP BY acaraId, userId;`;
  
              db.query(tempTableQuery, id, (err) => {
                if (err) {
                    console.error("step 1:", err);
                  db.rollback(() => res.status(500).json(err));
                } else {
                  const updateReimbursementQuery = `UPDATE reimbursements rm
                                JOIN temp_total_sum t ON rm.acaraId = t.acaraId AND rm.userId = t.userId
                                SET rm.nominal = rm.nominal * ? / t.current_sum
                                WHERE rm.acaraId = ? AND (rm.status = "Disetujui" OR rm.status = "Diajukan");`;
  
                  db.query(updateReimbursementQuery, [plafon, id], (err) => {
                    if (err) {
                        console.error("step 2:", err);
                      db.rollback(() => res.status(500).json(err));
                    } else {
                      const dropTempTableQuery = "DROP TEMPORARY TABLE temp_total_sum;";
                      db.query(dropTempTableQuery, (err) => {
                        if (err) {
                            console.error("step 3", err);
                          db.rollback(() => res.status(500).json(err));
                        } else {
                          db.commit((err) => {
                            if (err) return res.status(500).json(err);
                            return res.json("Updated!");
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          }
        );
      });
    });
  };



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

 export const addAcara = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = "INSERT INTO acara (`namaAcara`, `reimbursement_status`, `plafon`, `absensi_status`, `maxAbsen`, `createdAt`) VALUES (?)";

            const values = [
                req.body.namaAcara,
                req.body.reimbursement_status,
                req.body.plafon,
                req.body.absensi_status,
                req.body.maxAbsen,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
            ];

            db.query(q, [values], (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json("Reimbursement has been created");
        
        });
    });
};

export const activeAcara = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT id, namaAcara FROM acara WHERE reimbursement_status = "Aktif";`;

            db.query(q, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const nonActiveAcara = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT id, namaAcara FROM acara WHERE reimbursement_status = "Nonaktif";`;

            db.query(q, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const activeAcaraAbsence = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT * FROM acara WHERE absensi_status = "Aktif";`;

            db.query(q, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};