import express from "express";
import authRoutes from "./routes/auth.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/users.js"
import postsRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import reimbusementRoutes from "./routes/reimbursements.js"
import rekeningRoutes from "./routes/rekenings.js"
import jenisReims from "./routes/jenisReims.js"
import acaraRoutes from "./routes/acaras.js"
import absensiRoutes from "./routes/absensis.js"
import akunRoutes from "./routes/akuns.js"
import laporanRoutes from "./routes/laporans.js"
import dashboardRoutes from "./routes/dashboards.js"
import invoiceRoutes from "./routes/invoices.js"
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

const app = express()

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cors({
        // origin: "http://localhost:3000",
        origin: "https://amre.netlify.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);
app.use(cookieParser());

const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, req.uploadPath)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const upload = multer({ storage: storage })

const uploadPathProfile = path.join(__dirname, '/client/public/profile');

app.post("/api/uploadProfile", (req, res) => {
  
  req.uploadPath = uploadPathProfile;
  
  upload.single("file")(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const file = req.file;
    res.status(200).json(file.filename);
  });
});

const uploadPathInvoice = path.join(__dirname, '/client/public/invoice');

app.post("/api/uploadInvoice", (req, res) => {

  req.uploadPath = uploadPathInvoice;
  
  upload.single("file")(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const file = req.file;
    res.status(200).json(file.filename);
  });
});

const uploadPathAbsence = path.join(__dirname, '/client/public/absence');

app.post("/api/uploadAbsence", (req, res) => {
  
  req.uploadPath = uploadPathAbsence;
  
  upload.single("file")(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const file = req.file;
    res.status(200).json(file.filename);
  });
});

const uploadPathNews = path.join(__dirname, '/client/public/news');

app.post("/api/upload", (req, res) => {
  
  req.uploadPath = uploadPathNews;
  
  upload.single("file")(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const file = req.file;
    res.status(200).json(file.filename);
  });
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reims", reimbusementRoutes);
app.use("/api/rekening", rekeningRoutes);
app.use("/api/jenisReims", jenisReims);
app.use("/api/acara", acaraRoutes);
app.use("/api/absensi", absensiRoutes);
app.use("/api/akun", akunRoutes);
app.use("/api/laporan", laporanRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/invoice", invoiceRoutes);

app.use('/api/profilefile', express.static(uploadPathProfile));
app.use('/api/invoicefile', express.static(uploadPathInvoice));
app.use('/api/absencefile', express.static(uploadPathAbsence));
app.use('/api/newsfile', express.static(uploadPathNews));

app.listen(port, () =>{
    console.log("API is working!")
});