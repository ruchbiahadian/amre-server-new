import jimp from "jimp";
import jwt from "jsonwebtoken";
import { db } from "../connect.js"

export const compareImages = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    try {
        const userInfo = await new Promise((resolve, reject) => {
            jwt.verify(token, "secretkey", (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            });
        });

        const image1Buffer = req.files[0].buffer;
    const image2Buffer = req.files[1].buffer;

    try {
        const jimpImage1 = await jimp.read(image1Buffer);
        const jimpImage2 = await jimp.read(image2Buffer);

        const width1 = jimpImage1.getWidth();
        const height1 = jimpImage1.getHeight();
        const width2 = jimpImage2.getWidth();
        const height2 = jimpImage2.getHeight();

        if (width1 !== width2 || height1 !== height2) {
            // return "Images don't match";
            return res.status(200).json("Images don't match")
        }

        const threshold = Math.floor(width1 * height1 * 0.15); 

        let mismatchedPixels = 0;

        jimpImage1.scan(0, 0, width1, height1, function (x, y, idx) {
            const r1 = this.bitmap.data[idx];
            const g1 = this.bitmap.data[idx + 1];
            const b1 = this.bitmap.data[idx + 2];

            const r2 = jimpImage2.bitmap.data[idx];
            const g2 = jimpImage2.bitmap.data[idx + 1];
            const b2 = jimpImage2.bitmap.data[idx + 2];

            const pixelDiff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);

            if (pixelDiff > 0) {
            mismatchedPixels++;
            }
        });

        const mismatchPercentage = (mismatchedPixels / (width1 * height1)) * 100;

        if (mismatchedPixels > threshold || mismatchPercentage > 15) { // Adjust the threshold percentage as needed
            return res.status(200).json("Images don't match")
        } else {
            return res.status(200).json("Images match")
        }

    } catch (error) {
        console.log(error);
        res.status(500).json("Error comparing images");
    }

    } catch (error) {
        console.log(error);
        res.status(403).json("Token is not valid!");
    }
};



export const getInvoicePic = (req, res) =>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")

        jwt.verify(token, "secretkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!")

            const q = `SELECT invoicePic FROM reimbursements r WHERE r.acaraId = ? AND r.status = "Disetujui";`;

            db.query(q, req.params.acaraId, (err, data) =>{
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
        
        });
    });
};
