import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getReim = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT
                        status,
                        COUNT(*) AS count,
                        SUM(nominal) AS total_nominal
                            FROM
                                reimbursements
                            WHERE
                                userId = ? AND status IN ('Disetujui', 'Ditolak', 'Diajukan')
                            GROUP BY
                                status`;

            db.query(q, req.params.id, (err, data) =>{
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

            const q = `SELECT
                        status,
                        COUNT(*) AS count
                            FROM
                                absensi
                            WHERE
                                userId = ? AND status IN ('Disetujui', 'Ditolak', 'Diajukan')
                            GROUP BY
                                status`;

            db.query(q, req.params.id, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const getReimAdmin = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT
                        status,
                        COUNT(*) AS count,
                        SUM(nominal) AS total_nominal
                            FROM
                                reimbursements
                            WHERE
                                status IN ('Disetujui', 'Ditolak', 'Diajukan')
                            GROUP BY
                                status`;

            db.query(q, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const getAbsenAdmin = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT
                        status,
                        COUNT(*) AS count
                            FROM
                                absensi
                            WHERE
                                status IN ('Disetujui', 'Ditolak', 'Diajukan')
                            GROUP BY
                                status`;

            db.query(q, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};