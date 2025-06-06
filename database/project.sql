-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `baiviet`
--

DROP TABLE IF EXISTS `baiviet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baiviet` (
  `bai_viet_id` int NOT NULL AUTO_INCREMENT,
  `tieu_de` varchar(255) NOT NULL,
  `noi_dung` text,
  `nguoi_dung_id` int DEFAULT NULL,
  `thoi_gian_dang` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bai_viet_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `baiviet_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoidung` (`nguoi_dung_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baiviet`
--

LOCK TABLES `baiviet` WRITE;
/*!40000 ALTER TABLE `baiviet` DISABLE KEYS */;
/*!40000 ALTER TABLE `baiviet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `binhluan`
--

DROP TABLE IF EXISTS `binhluan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `binhluan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `bai_viet_id` int DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  `noi_dung` text NOT NULL,
  `thoi_gian_phan_hoi` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`binh_luan_id`),
  KEY `bai_viet_id` (`bai_viet_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `binhluan_ibfk_1` FOREIGN KEY (`bai_viet_id`) REFERENCES `baiviet` (`bai_viet_id`) ON DELETE CASCADE,
  CONSTRAINT `binhluan_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoidung` (`nguoi_dung_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `binhluan`
--

LOCK TABLES `binhluan` WRITE;
/*!40000 ALTER TABLE `binhluan` DISABLE KEYS */;
/*!40000 ALTER TABLE `binhluan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhgia`
--

DROP TABLE IF EXISTS `danhgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danhgia` (
  `danh_gia_id` int NOT NULL AUTO_INCREMENT,
  `bai_viet_id` int NOT NULL,
  `nguoi_dung_id` int NOT NULL,
  `huu_ich` tinyint(1) NOT NULL,
  `thoi_gian_danh_gia` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`danh_gia_id`),
  UNIQUE KEY `bai_viet_id` (`bai_viet_id`,`nguoi_dung_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `danhgia_ibfk_1` FOREIGN KEY (`bai_viet_id`) REFERENCES `baiviet` (`bai_viet_id`) ON DELETE CASCADE,
  CONSTRAINT `danhgia_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoidung` (`nguoi_dung_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhgia`
--

LOCK TABLES `danhgia` WRITE;
/*!40000 ALTER TABLE `danhgia` DISABLE KEYS */;
/*!40000 ALTER TABLE `danhgia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoidung`
--

DROP TABLE IF EXISTS `nguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoidung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `ten_nguoi_dung` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `ngay_sinh` date DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidung`
--

LOCK TABLES `nguoidung` WRITE;
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tailieu`
--

DROP TABLE IF EXISTS `tailieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tailieu` (
  `tai_lieu_id` int NOT NULL AUTO_INCREMENT,
  `ten_tai_lieu` varchar(255) NOT NULL,
  `duong_dan` varchar(500) NOT NULL,
  `bai_viet_id` int DEFAULT NULL,
  `thoi_gian_tai` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tai_lieu_id`),
  KEY `bai_viet_id` (`bai_viet_id`),
  CONSTRAINT `tailieu_ibfk_1` FOREIGN KEY (`bai_viet_id`) REFERENCES `baiviet` (`bai_viet_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tailieu`
--

LOCK TABLES `tailieu` WRITE;
/*!40000 ALTER TABLE `tailieu` DISABLE KEYS */;
/*!40000 ALTER TABLE `tailieu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-30 19:58:16
