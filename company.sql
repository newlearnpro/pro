-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Сен 15 2016 г., 14:28
-- Версия сервера: 10.1.9-MariaDB
-- Версия PHP: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


--
-- База данных: `company`
--

-- --------------------------------------------------------

--
-- Структура таблицы `ci_sessions`
--

CREATE TABLE `ci_sessions` (
  `id` varchar(40) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `data` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ci_sessions`
--

INSERT INTO `ci_sessions` (`id`, `ip_address`, `timestamp`, `data`) VALUES
('15d45f28e19a4b728f8d752fff02ec909e893dcd', '::1', 1472554525, 0x6c616e677c733a323a22656e223b),
('1c8eb15963fafa8a363c8b3ac1a76e0e9c3b9ff3', '192.168.3.108', 1472560705, 0x6c616e677c733a323a227275223b),
('30418f7fe87357811d1ab8778e42c8d6e0ff6267', '::1', 1472539901, 0x6c616e677c733a323a22616d223b),
('3137730bbf1f6211f59e426373f26356e1283e4b', '::1', 1472727713, 0x6c616e677c733a323a22616d223b),
('33db138143d2ebc2029bd2f8b17364697c19ce11', '::1', 1473231270, 0x6c616e677c733a323a22656e223b7573727c733a353a2261646d696e223b7077647c733a33323a223564373933666335623030613233343863336662396162353965356361393861223b70726d7c733a353a2261646d696e223b),
('350de47b0d2ddbe7d726ef3d05c55ba8c6596007', '::1', 1471950450, 0x6c616e677c733a323a22616d223b),
('4f8fdbd3782bf8441bc94dec13b1420215044ea2', '::1', 1473229529, 0x6c616e677c733a323a22656e223b7573727c733a353a2261646d696e223b7077647c733a33323a223564373933666335623030613233343863336662396162353965356361393861223b70726d7c733a353a2261646d696e223b),
('5515b81b18b8ff0d0070c4cfbf689972f0ff572a', '::1', 1473156173, 0x6c616e677c733a323a22656e223b7573727c733a353a2261646d696e223b7077647c733a33323a223564373933666335623030613233343863336662396162353965356361393861223b70726d7c733a353a2261646d696e223b),
('606a9959cf81202000409f955e161828d7579843', '::1', 1472554785, 0x6c616e677c733a323a22656e223b7573727c733a353a2261646d696e223b7077647c733a33323a223564373933666335623030613233343863336662396162353965356361393861223b),
('6d99135aecfefc409524693f53ad4dacc9c3592a', '::1', 1472726884, 0x6c616e677c733a323a22616d223b),
('6eb17ccdb9a8f6ae590ba500da1bc95c2b9b2564', '::1', 1472626793, 0x6c616e677c733a323a22616d223b),
('a22160a84f8f7c14327de2ad75261238cfb4ea05', '192.168.3.108', 1472626072, 0x6c616e677c733a323a227275223b),
('a95ca7c11c4496a16f0a1a6a66602274df9e7378', '::1', 1472451291, ''),
('b00a7ccb47119363ba874f8c813a1f49ebfe652a', '::1', 1473229887, 0x6c616e677c733a323a22656e223b7573727c733a353a2261646d696e223b7077647c733a33323a223564373933666335623030613233343863336662396162353965356361393861223b70726d7c733a353a2261646d696e223b),
('b753f1d419ec57d297eca3d35f0b74d1410eb94f', '::1', 1473060602, 0x6c616e677c733a323a22656e223b7573727c733a353a2261646d696e223b7077647c733a33323a223564373933666335623030613233343863336662396162353965356361393861223b70726d7c733a353a2261646d696e223b),
('c0004b32eee7f2583ead3eefbdbc32004aae65de', '::1', 1473941877, 0x6c616e677c733a323a22656e223b7573727c733a373a226162726168616d223b7077647c733a33323a223564373933666335623030613233343863336662396162353965356361393861223b70726d7c733a343a2275736572223b),
('d08f827765fa97d50fd1a36c2da5b7cda8365273', '::1', 1473854583, 0x6c616e677c733a323a227275223b),
('ebcd21220fcf5c6a1c6cd8dec15820ce0fd35920', '::1', 1473228251, 0x6c616e677c733a323a227275223b),
('f14e7d371904a339fa454a225eff44fb74e979a5', '::1', 1473928469, 0x6c616e677c733a323a227275223b),
('f89e1c2fa211bb136024f043f2ab0a2101539e84', '::1', 1473058260, 0x6c616e677c733a323a227275223b),
('f9c4de10ba3e01a5710349398dc7979edaf3c69e', '::1', 1473942447, 0x6c616e677c733a323a227275223b7573727c733a353a22617274616b223b7077647c733a33323a223564373933666335623030613233343863336662396162353965356361393861223b70726d7c733a343a2275736572223b),
('ff86b745b801795c79068a2198a19338fe81aa2c', '::1', 1473938619, 0x6c616e677c733a323a227275223b7573727c733a333a22616e69223b7077647c733a33323a223564373933666335623030613233343863336662396162353965356361393861223b70726d7c733a343a2275736572223b);

-- --------------------------------------------------------

--
-- Структура таблицы `messages_room`
--

CREATE TABLE `messages_room` (
  `id` int(11) NOT NULL,
  `sender` varchar(50) NOT NULL,
  `recipient` varchar(50) NOT NULL,
  `message` varchar(50) NOT NULL,
  `time` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `messages_room`
--

INSERT INTO `messages_room` (`id`, `sender`, `recipient`, `message`, `time`) VALUES
(94, 'artak', 'abraham', '111', '15-09-2016 10:26:39'),
(95, 'artak', 'vardan', '222', '15-09-2016 10:26:45'),
(96, 'artak', 'karen', '333', '15-09-2016 10:26:48'),
(97, 'abraham', 'artak', '444', '15-09-2016 10:33:00'),
(98, 'abraham', 'ani', 'tyty', '15-09-2016 10:34:04'),
(99, 'artak', 'ani', 'բարև Անի', '15-09-2016 10:35:39'),
(100, 'artak', 'admin', 'ռտ', '15-09-2016 11:37:41'),
(101, 'artak', 'abraham', 'ռտ', '15-09-2016 11:37:55'),
(102, 'ani', 'vardan', 'vb', '15-09-2016 12:26:15'),
(103, 'abraham', 'artak', 'բա տես', '15-09-2016 02:16:15');

-- --------------------------------------------------------

--
-- Структура таблицы `position`
--

CREATE TABLE `position` (
  `id` int(11) UNSIGNED NOT NULL,
  `position` varchar(50) NOT NULL,
  `description` text,
  `custom_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `position`
--

INSERT INTO `position` (`id`, `position`, `description`, `custom_id`) VALUES
(1, ' ', NULL, 1),
(2, ' dfhdfh', NULL, 1),
(3, 'ery', NULL, 1),
(4, 'rt', NULL, 1),
(5, 'rt', NULL, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(35) NOT NULL,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `img_src` text NOT NULL,
  `position` varchar(255) NOT NULL,
  `position_id` int(100) NOT NULL,
  `permission` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `first_name`, `last_name`, `email`, `img_src`, `position`, `position_id`, `permission`) VALUES
(1, 'artak', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'zxvzxvdfg', 'sdgsg', 'arta@yahoo.com', '', '', 0, 'user'),
(2, 'abraham', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'afsgasgasg', 'asgasgasgasggaasgag', 'asf@mail.ru', '', '', 0, 'user'),
(3, 'artur', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'Artur', 'Hak', 'amm@mail.ru', '', '', 0, 'user'),
(4, 'vardan', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'Vardan', 'aas', 'vardan@yahoo.com', '', '', 0, 'user'),
(5, 'ani', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'ani', 'asdsgasg', 'ani@mail.ru', '', '', 0, 'user'),
(6, 'anna', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'anna', 'asfaf', 'anna@mail.ru', '', '', 0, 'user'),
(7, 'bbb', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'ասգա', 'սգասգասգ', 'bbb@mail.ru', '', '', 0, 'user'),
(8, 'admin', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'sdgsdg', 'sdgsdh', 'admin@mail.ru', '', '', 0, 'admin'),
(9, 'karen', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'karen', 'vardanyan', 'rrrrrrrwerw@mail.ru', '', '', 0, ''),
(10, 'nyuton', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'nyuton', 'vardanyan', 'asd@mail.ru', '', '', 0, '');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `ci_sessions`
--
ALTER TABLE `ci_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ci_sessions_timestamp` (`timestamp`);

--
-- Индексы таблицы `messages_room`
--
ALTER TABLE `messages_room`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `messages_room`
--
ALTER TABLE `messages_room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;
--
-- AUTO_INCREMENT для таблицы `position`
--
ALTER TABLE `position`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
