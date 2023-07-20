import moment from "moment/moment.js";
import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT news.*,  users.nama, users.profilePic FROM news JOIN users ON news.userId= users.id ORDER BY news.createdAt DESC;`;

            db.query(q, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};

export const addPosts = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = "INSERT INTO news (`desc`, `img`, `createdAt`, `userId`) VALUES (?)";

            const values = [
                req.body.desc,
                req.body.img,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                userInfo.id
            ];

            db.query(q, [values], (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json("Post has been created");
        
        });
    });
};

export const deletePost = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = "DELETE FROM news WHERE `id`=? AND `userId` = ?";

            db.query(q, [req.params.id, userInfo.id], (err, data) =>{
                if (err) return res.status(500).json(err);
                if (data.affectedRows>0) return res.status(200).json("Post has been deleted");
                return res.status(403).json("You can delete only your post")
                
        
        });
    });
};

export const updatePost = (req, res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = "UPDATE news SET `desc`=?, `img`=?, `createdAt`=? WHERE id = ?"

            console.log("desc" + req.body.desc)

            db.query(q, [
                req.body.desc,
                req.body.img,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                req.body.id
            ], (err, data) =>{
                if(err) res.status(500).json(err)
                if(data.affectedRows > 0) return res.json("Updated!")
                return res.status(403).json("You can update only your post!")
            });
            

        })
 }