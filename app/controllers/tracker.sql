-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2017 at 02:57 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `advertisecategory`
--

CREATE TABLE `advertisecategory` (
  `Id` int(11) NOT NULL,
  `advertiseMode` varchar(200) NOT NULL,
  `advertiseName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `advertisements`
--

CREATE TABLE `advertisements` (
  `adId` int(11) NOT NULL,
  `adCategory` varchar(100) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `adLocation` varchar(250) DEFAULT NULL,
  `assignedTo` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `projectId` varchar(100) DEFAULT NULL,
  `vehicleId` varchar(100) DEFAULT NULL,
  `creationDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `advertisevehicles`
--

CREATE TABLE `advertisevehicles` (
  `vehicleId` int(11) NOT NULL,
  `vehicleNo` varchar(150) DEFAULT NULL,
  `registrationNo` varchar(200) DEFAULT NULL,
  `driverId` varchar(100) DEFAULT NULL,
  `driverName` varchar(250) DEFAULT NULL,
  `vehicleType` varchar(100) DEFAULT NULL,
  `projectId` varchar(100) DEFAULT NULL,
  `assistantId` varchar(100) DEFAULT NULL,
  `assitantName` varchar(250) DEFAULT NULL,
  `attachDate` date DEFAULT NULL,
  `vehicleDoc` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `projectId` int(11) NOT NULL,
  `projectName` varchar(250) DEFAULT NULL,
  `advertiseCategory` text,
  `advertiseLocations` text,
  `startDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `projectManager` varchar(250) DEFAULT NULL,
  `creationDate` date DEFAULT NULL,
  `projectStatus` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `userdetail`
--

CREATE TABLE `userdetail` (
  `userType` varchar(100) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL,
  `dateTime` datetime DEFAULT NULL,
  `fullName` varchar(200) DEFAULT NULL,
  `contactNo` varchar(100) DEFAULT NULL,
  `emailId` varchar(250) DEFAULT NULL,
  `Address` text,
  `state` varchar(250) DEFAULT NULL,
  `district` varchar(150) DEFAULT NULL,
  `block` varchar(150) DEFAULT NULL,
  `postalCode` varchar(50) DEFAULT NULL,
  `aadharNo` varchar(50) DEFAULT NULL,
  `panNo` varchar(50) DEFAULT NULL,
  `profilePic` varchar(200) DEFAULT NULL,
  `aadharCopy` varchar(200) DEFAULT NULL,
  `advertiseId` int(11) NOT NULL,
  `driverLicense` varchar(100) DEFAULT NULL,
  `driverLicenseDoc` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `usertype`
--

CREATE TABLE `usertype` (
  `id` int(11) NOT NULL,
  `userType` varchar(150) NOT NULL,
  `permission` text NOT NULL,
  `dateTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usertype`
--

INSERT INTO `usertype` (`id`, `userType`, `permission`, `dateTime`) VALUES
(1, 'Admin', '', '2017-03-28 10:24:00'),
(2, 'Admin', '', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advertisecategory`
--
ALTER TABLE `advertisecategory`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `advertisements`
--
ALTER TABLE `advertisements`
  ADD PRIMARY KEY (`adId`);

--
-- Indexes for table `advertisevehicles`
--
ALTER TABLE `advertisevehicles`
  ADD PRIMARY KEY (`vehicleId`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`projectId`);

--
-- Indexes for table `userdetail`
--
ALTER TABLE `userdetail`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `usertype`
--
ALTER TABLE `usertype`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `advertisecategory`
--
ALTER TABLE `advertisecategory`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `advertisements`
--
ALTER TABLE `advertisements`
  MODIFY `adId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `advertisevehicles`
--
ALTER TABLE `advertisevehicles`
  MODIFY `vehicleId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `projectId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `usertype`
--
ALTER TABLE `usertype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
