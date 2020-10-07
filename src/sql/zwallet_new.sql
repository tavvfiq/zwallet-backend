-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 07, 2020 at 04:00 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zwallet`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `user_id` int(255) DEFAULT NULL,
  `contact_id` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`user_id`, `contact_id`) VALUES
(13, 17),
(13, 18),
(13, 19),
(13, 20),
(13, 21),
(13, 22),
(13, 23),
(13, 26),
(13, 27),
(13, 30),
(13, 31);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(255) NOT NULL,
  `sender_id` int(255) DEFAULT NULL,
  `receiver_id` int(255) DEFAULT NULL,
  `transaction_name` text DEFAULT NULL,
  `transaction_type` text DEFAULT NULL,
  `amount` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `sender_id`, `receiver_id`, `transaction_name`, `transaction_type`, `amount`, `notes`, `date`) VALUES
(114, NULL, 13, 'Top Up', 'in', '500', NULL, '2020-10-05 23:54:41'),
(115, NULL, 13, 'Top Up', 'in', '500', NULL, '2020-10-05 23:55:49'),
(116, NULL, 13, 'Top Up', 'in', '500', NULL, '2020-10-05 23:56:07'),
(117, NULL, 13, 'Top Up', 'in', '500', NULL, '2020-10-06 00:00:11'),
(118, NULL, 13, 'Top Up', 'in', '500', NULL, '2020-10-06 00:03:03'),
(119, NULL, 13, 'Top Up', 'in', '500', NULL, '2020-10-06 00:03:15'),
(120, NULL, 13, 'Top Up', 'in', '500', NULL, '2020-10-06 00:06:25'),
(121, NULL, 13, 'Top Up', 'in', '500', NULL, '2020-10-06 00:08:06'),
(122, NULL, 13, 'Top Up', 'in', '500', NULL, '2020-10-06 00:09:06'),
(123, NULL, 13, 'Top Up', 'in', '500', NULL, '2020-10-06 00:09:39'),
(124, 13, 20, 'Transfer', 'out', '10', NULL, '2020-10-06 04:15:44'),
(125, 13, 20, 'Transfer', 'out', '10', NULL, '2020-10-06 04:20:06'),
(126, 13, 20, 'Transfer', 'out', '10', NULL, '2020-10-06 04:21:15'),
(127, 13, 20, 'Transfer', 'out', '10', NULL, '2020-10-06 04:21:39'),
(128, 13, 20, 'Transfer', 'out', '10', NULL, '2020-10-06 04:29:02'),
(129, 13, 20, 'Transfer', 'out', '10', NULL, '2020-10-06 04:29:40'),
(130, 13, 20, 'Transfer', 'out', '10', NULL, '2020-10-06 04:29:59'),
(131, 20, 13, 'Transfer', 'out', '10', NULL, '2020-10-06 04:31:07'),
(132, 20, 13, 'Transfer', 'out', '10', NULL, '2020-10-06 04:31:21'),
(133, 20, 13, 'Transfer', 'out', '10', NULL, '2020-10-06 04:31:57'),
(134, 20, 13, 'Transfer', 'out', '10', NULL, '2020-10-06 04:32:03'),
(135, 20, 13, 'Transfer', 'out', '10', NULL, '2020-10-06 10:36:38'),
(136, 20, 13, 'Transfer', 'out', '10', NULL, '2020-10-06 10:36:49'),
(137, 20, 13, 'Transfer', 'out', '10', NULL, '2020-10-06 10:36:59'),
(138, 13, 26, 'Transfer', 'out', '1000000', NULL, '2020-10-06 10:45:58'),
(139, 13, 23, 'Transfer', 'out', '25000', '', '2020-10-06 10:50:06'),
(140, NULL, 13, 'Top Up', 'in', '1000000', NULL, '2020-10-07 01:22:26'),
(141, NULL, 13, 'Top Up', 'in', '1000000', NULL, '2020-10-07 01:23:57');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `pin` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `pin`) VALUES
(13, 'Taufiq Widi', 'taufiqwidinugroho@gmail.com', '$2b$10$xwCeFYQRzsqlj.MZoTTEduXOw8PlzwggGWN.E.JjE/GQbnbv3ZxsS', '123456'),
(14, 'Netflix', 'netflix@gmail.com', '$2b$10$kBpdALMf3PO0AKMo61kBwuZ6gVKq8vLFwEdTwU9kx4KUyk1lz6rhu', NULL),
(15, 'Spotify', 'spotify@gmail.com', '$2b$10$IxY4usj6IuZ.OUUHfx8BRO8E.qiEezfVdD.9TPb.w91.CdJAsUkni', NULL),
(17, 'Rudy Tabootie', 'rudy@gmail.com', '$2b$10$Pr53dpnRckW0p1QdX2iFJuiEekKv.XmsomkSDVHF7COV29bXMA0YO', NULL),
(18, 'Bill Gates', 'billeuyy@gmail.com', '$2b$10$TlkbizTKodfaJPxG1ccmJeO1FbWKjOh7luSfrg2BQbr5jlMWIvdpu', NULL),
(19, 'Robert Chandler', 'robertchan@gmail.com', '$2b$10$aZji9aq/jw8UjmL5ZyC6wOIxh868d0wWKCfBSSnzzaU0LU8/UJCnO', NULL),
(20, 'Samuel Suhi', 'samsuh@gmail.com', '$2b$10$JPcS1mVAb8BD.BVQdRssHubXosMUzTSm8VZK5M1Oup72oYJhIhXFe', NULL),
(21, 'Bobby Sammy', 'bobis@gmail.com', '$2b$10$emq47zvi7kNbIVvi/KdM5.0lNJqJlwHRf0yJr403hOnijCrCggUQC', NULL),
(22, 'Momo Taro', 'momotar@gmail.com', '$2b$10$mI2ZCrA3EU9tqSmYIvKkEu/uxlAo9GUKCgjR0PlXeHqcrihJ5xrwG', NULL),
(23, 'Jessica Can', 'jessicacan@gmail.com', '$2b$10$fOHyMi1HczVa3/GOBiGRLOQSMAsvLlX5OnIJLIo7njGbBVcSUu5di', NULL),
(24, 'Razor Back', 'razor@mail.com', '$2b$10$riq9c7VR15pg.R1ZtY8VEubtMVQOHgGlve7srRi9WCEIlGKCMtbMe', NULL),
(25, 'Markus Rudin', 'markus.rudin@yuhuu.co.id', '$2b$10$DKxJemo.JnSwP0uyj/C9vOQhSXkhvNO8E5HV7fzylOlQWYdNiUM8u', NULL),
(26, 'Nama Lengkap', 'pradiptaratu@Qeren.hotmail.com', '$2b$10$mIgEqVEpvDHlkiucQCplee3z30t1mWtLl8tfUeAmY6yYiQVs4kjEy', '123456'),
(27, 'Mark Zuckerberg', 'markzuckerberg@facebook.com', '$2b$10$1NW8ygrEQYFeX.tTjfV.POYUBKqqIIr7FZz2GHVqkqsd0uHD5uL5m', '020498'),
(28, 'Test Hehe', 'test@mail.com', '$2b$10$36yI9bOo3yml27qqtdUcyez1klX2CzZgwPP8eprLqzxHfep7HjMKG', '123456'),
(29, 'Huhu Haha', 'haha@mail.co.id', '$2b$10$.qTbu1GV3..v/N9POZUYGOXVfI5jDDVWq9hriDB68JIKmiF0KU/oq', '080808'),
(30, 'Ucup Junaedi', 'ucupcupcup@yuhuu.co.id', '$2b$10$8evnLz3v.T3nBsmz8V75quE8nnBqF61HifU6HkrM6OR1/aqQU7Uhi', '000000'),
(31, 'Krispo Krispi', 'krispi98@yahoo.com', '$2b$10$4wMFW1Wbrwo05Eur9vwCI.CNeUAvhMvKImItP9zJx34WNNfyMwhAa', '123456'),
(32, 'Utomo Danarjati', 'utomooo@mail.com', '$2b$10$dD.ac5XqEOZhgmSCpi0kc.S5X9Fmz2SGME3kWxlaxWBBYI1NegOqO', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `user_detail`
--

CREATE TABLE `user_detail` (
  `user_id` int(255) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `phone_number` text DEFAULT NULL,
  `balance` text DEFAULT NULL,
  `num_of_contact` int(255) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_detail`
--

INSERT INTO `user_detail` (`user_id`, `image`, `phone_number`, `balance`, `num_of_contact`) VALUES
(NULL, NULL, NULL, NULL, 0),
(13, '/images/images-1601980753002-taufiqwidi.jpg', '081284544654', '2000891', 11),
(14, '/images/images-netflix.jpg', NULL, '299000', 0),
(15, '/images/images-spotify.jpg', NULL, '325000', 0),
(NULL, NULL, NULL, NULL, 0),
(17, '/images/images-rudytabootie.png', NULL, '312000', 0),
(18, '/images/images-billgates.jpeg', NULL, '1526873', 0),
(19, '/images/images-robertchandler.png', NULL, '522500', 0),
(20, '/images/images-samuelsuhi.png', NULL, '399980', 0),
(21, '/images/images-bobbysammy.png', NULL, '42235', 0),
(22, '/images/images-momotaro.png', NULL, '289750', 0),
(23, '/images/images-jessicacan.png', NULL, '66471', 0),
(24, NULL, NULL, NULL, 0),
(25, NULL, NULL, NULL, 0),
(26, '/images/images-namalengkap.jpg', NULL, '1003000', 0),
(27, NULL, NULL, '500', 0),
(28, NULL, NULL, NULL, 0),
(29, NULL, NULL, NULL, 0),
(30, NULL, NULL, '50000', 0),
(31, NULL, NULL, NULL, 1),
(32, NULL, NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `contact_id` (`contact_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_detail`
--
ALTER TABLE `user_detail`
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contacts_ibfk_2` FOREIGN KEY (`contact_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `user_detail` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `user_detail` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_detail`
--
ALTER TABLE `user_detail`
  ADD CONSTRAINT `user_detail_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
