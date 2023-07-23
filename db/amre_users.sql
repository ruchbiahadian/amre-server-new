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
  `univ` varchar(50) DEFAULT NULL,
  `jenis` varchar(50) NOT NULL,
  `tahun` int NOT NULL,
  `domisili` varchar(100) DEFAULT NULL,
  `password` varchar(300) NOT NULL,
  `profilePic` varchar(300) DEFAULT NULL,
  `role` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'brasco','Brasco N','2222','amik','brasco',2023,'Sukaresmi, Garut','$2a$10$WpNOQMjk/7oav5tZnBYFyO2BkHCa5DeVyNFOsTsiP0Y26zUDBWNby','1689445454841beAproo.jpg',NULL),(3,'rubi','rubi','082321283813','amik','rubi',2121,'Sukaresmi, Garut','$2a$10$CeU56LXdb.akkbEB/HAR9eXwVp229GiGrb2OyPl2Ayzn/VLz/WyIC','1689446829957nazki.jpg',NULL),(33,'cocomeli','admin','Belum diisi','Belum diisi','',0,'Belum diisi','$2a$10$bLBjnaXz9/2B1fjwJUhLKOtZ5vrHfUvaisZ5zU.D54//O3dbgwsoa','default.jpg',NULL),(37,'admin','admin','Belum diisi','Belum diisi','admin',2022,'Belum diisi','$2a$10$mjL5tZq6YWeAr9DmelqWvuGeut9vHUzcQPhGUn3gyrVa4i1N1D/hi','default.jpg',1);
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

-- Dump completed on 2023-07-23 23:04:34
