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
import multer from "multer";

const app = express()

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, req.uploadPath)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post("/api/uploadProfile", (req, res) => {
  const uploadPath = '../client/public/profile';
  
  req.uploadPath = uploadPath;
  
  upload.single("file")(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const file = req.file;
    res.status(200).json(file.filename);
  });
});

app.post("/api/uploadInvoice", (req, res) => {
  const uploadPath = '../client/public/invoice';
  
  req.uploadPath = uploadPath;
  
  upload.single("file")(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const file = req.file;
    res.status(200).json(file.filename);
  });
});

app.post("/api/upload", (req, res) => {
  const uploadPath = '../client/public/news';
  
  req.uploadPath = uploadPath;
  
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

app.listen(8800, () =>{
    console.log("API is working!")
});