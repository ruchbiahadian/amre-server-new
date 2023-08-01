-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: amre
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `noTelp` varchar(20) DEFAULT NULL,
  `instansi` varchar(50) DEFAULT NULL,
  `jenis` varchar(50) NOT NULL,
  `tahun` int NOT NULL,
  `domisili` varchar(100) DEFAULT NULL,
  `password` varchar(300) NOT NULL,
  `profilePic` varchar(300) DEFAULT NULL,
  `role` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Brasco','Brasco N','4444','amik','brasco',2023,'Sukaresmi, Garut','$2a$10$vStWF26ZeG0TXM9IHpK7GeythfmOS1qJICvTeVI98yArG/.mldRUq','1690846157113absenDBP14.png',3),(3,'rubi','rubi','082321283813','amik','rubi',2121,'Sukaresmi, Garut','$2a$10$CeU56LXdb.akkbEB/HAR9eXwVp229GiGrb2OyPl2Ayzn/VLz/WyIC','1689446829957nazki.jpg',3),(37,'admin','admin','Belum diisi','Belum diisi','admin',2022,'Belum diisi','$2a$10$0S6TfIyJq0LqeV3X0F9/r.88rysjIFxywOGPNaIExQKO1UMqrF/7q','16906189259393.jpg',1),(42,'ahmad','Ahmad','Belum diisi','Belum diisi','ahmad',2023,'Belum diisi','$2a$10$cvXvvMc251ES1bB2VDJmKuPUmo84TdNBpWUY2slDl0MrmcwzMe/CS','16906577484473.jpg',3),(43,'fahal','fahal','Belum diisi','co','msi',2022,'Belum diisi','$2a$10$635wfdtGP2tqTA4opzYLR.st9Zir1kFaNFOBFgqSDbMvNEmDRrgNC','default.jpg',3),(46,'yusuf','Yusuf Rahardi','22','amik bandung','belum diisi',2023,'belum diisi','$2a$10$toQU7aXzSgL7n4hy/IW3r.60fSE5oe46VBfJ0CePJhV6wiAFiqgTW','16908423358172.jpg',2),(47,'aji','aji','belum diisi','belum diisi','belum diisi',0,'belum diisi','$2a$10$N8u0JOU0tWRXVtXuFIS5Fe3VZVjXOUlljRSOzuO42p0B3IZUpuyRS','default.jpg',2),(48,'kiki','kiki','belum diisi','belum diisi','belum diisi',0,'belum diisi','$2a$10$ZnL.OKiKkb2dB6wSRuL0w.1a6hXoPfYOx8X4Qkk7YhJ7riJKskJci','default.jpg',2),(49,'cob','cob','belum diisi','belum diisi','belum diisi',0,'belum diisi','$2a$10$N8ak.4WigT6sk6CSS/8NSu5V755qY9JfcM/.ksWs4GpHuuoTyUi4S','default.jpg',2),(50,'dada','dada','belum diisi','belum diisi','belum diisi',0,'belum diisi','$2a$10$3E3zrCIgTXUuur8TtRMU2.4andNNZ7rUmjaLCYbVuT4MEWQaQVPDa','default.jpg',2),(51,'ivan','ivan','Belum diisi','Belum diisi','ivan',2023,'Belum diisi','$2a$10$BErPDKeVD1FLlrxD/n6IgOIRm1MVlFB/FwGQxuNuw.Iz/JzChTbHm','default.jpg',3);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-01 14:19:00
