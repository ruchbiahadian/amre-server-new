import moment from "moment/moment.js";
import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getRekening = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const userId = req.params.userId;

            const q = `SELECT * FROM rekening WHERE rekening.userId = ? ;`;

            db.query(q, userId, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};