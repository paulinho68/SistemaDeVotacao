-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/

-- Host: 127.0.0.1
-- Tempo de geração: 25-Jun-2020 às 08:50
-- Versão do servidor: 10.4.13-MariaDB
-- versão do PHP: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE DATABASE desafio_signoweb;


CREATE TABLE `enquetes` (
  `id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `enquetes_opcoes` (
  `id` int(11) NOT NULL,
  `enquetes_id` int(11) NOT NULL,
  `opcoes_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `opcoes` (
  `id` int(11) NOT NULL,
  `quantidade_votos` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `status` (`id`, `nome`, `slug`) VALUES
(1, 'Não Iniciada', 'nao-iniciada'),
(2, 'Em Andamento', 'andamento'),
(3, 'Finalizada', 'finalizada');

ALTER TABLE `enquetes`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `enquetes_opcoes`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `opcoes`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `enquetes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;


ALTER TABLE `enquetes_opcoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;


ALTER TABLE `opcoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;


ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
