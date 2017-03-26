SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";




CREATE TABLE `ci_sessions` (
  `id` varchar(128) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `data` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `ci_sessions` (`id`, `ip_address`, `timestamp`, `data`) VALUES
('db1ff68da9e351b8dc08c4d08fe7025add460dc1', '192.168.3.60', 1488438094, 0x7573727c733a353a2261646d696e223b7077647c733a33323a223564373933666335623030613233343863336662396162353965356361393861223b70726d7c733a353a2261646d696e223b6c616e677c733a323a227275223b),
('e671a9db69ca3a085cc68f2bc977bc60a1278805', '192.168.3.50', 1488807657, 0x7573727c733a31303a224445534b544f502d5043223b7077647c733a33323a223230663564636538663837613739643933623731303465353830373934323562223b70726d7c733a343a2275736572223b6c616e677c733a323a22616d223b),
('d61f6671699d1b46013bb167e0a1945def803db1', '192.168.3.60', 1488433723, ''),
('f1f22bbfbdf86c890769a850fe36ed84b5d92489', '192.168.3.60', 1488433856, ''),
('50256ceb474fb2eb4ee23709c5367aa837091af1', '192.168.3.60', 1488433894, ''),
('d7babe2540fc434718a6174f79a5ec4c25ad0ef2', '192.168.3.60', 1488433950, ''),
('66a831292ab65ec82b864bdefd439e8cec714c88', '192.168.3.60', 1488434034, ''),
('e990ebda4dd8030cb9cb3c64e0b48c3241614ba0', '192.168.3.60', 1488434427, ''),
('1f4bde5d6f4876028cb2d7e1a618b196f2c0d613', '192.168.3.60', 1488434456, ''),
('ef619055cefe32fca73fdcfe3e7c83b9a0ac8cd2', '192.168.3.60', 1488434469, ''),
('c92d20727e6166bc5b7513ce13670822f2fd1819', '192.168.3.60', 1488434511, ''),
('82c22faf9443e507a094590b75a9224fd35bb7f5', '192.168.3.60', 1488434525, ''),
('eae7875128f6e35ace246d4daf943bd4e64dfc0a', '192.168.3.60', 1488434547, ''),
('9ffc1286ad77c8e3d51d93d3bbd59bf5a4d94675', '192.168.3.60', 1488435855, ''),
('f60d1cd50ec7587acebce92ba1b817f025378718', '192.168.3.50', 1488446249, 0x7573727c733a353a226173686f74223b7077647c733a33323a223230663564636538663837613739643933623731303465353830373934323562223b70726d7c733a343a2275736572223b6c616e677c733a323a227275223b),
('a7edc9aff004a076dc1954ebc2b2536f704d285e', '192.168.3.60', 1488438092, ''),
('72a27229db20445e51694b5ab2b47fec2337ca67', '192.168.3.60', 1488442660, ''),
('beecc431b5b287f78de45245102f9e74ff615994', '192.168.3.60', 1488442668, ''),
('11b10331008f23a84e3887b03425234c71f0f89b', '192.168.3.60', 1488442688, ''),
('0a74109a78cc0e7d01a486f334ebf580613c47bc', '192.168.3.60', 1488442704, ''),
('84cef7963330f08d51cbfcc07a082867064faac4', '192.168.3.60', 1488461087, ''),
('412588f4efeeefaf72ba6d170100d2e590e5cc6b', '192.168.3.60', 1488870430, 0x7573727c733a353a22617274616b223b7077647c733a33323a223564373933666335623030613233343863336662396162353965356361393861223b70726d7c733a343a2275736572223b6c616e677c733a323a22616d223b),
('a8460f08307bd6e87596a495fcab9a664f8a5861', '192.168.3.50', 1488543534, 0x7573727c733a353a22617274616b223b7077647c733a33323a223564373933666335623030613233343863336662396162353965356361393861223b70726d7c733a343a2275736572223b6c616e677c733a323a22616d223b),
('41b643970f4507a91fdf8a55339bf1c4fa5746c8', '192.168.3.60', 1488865692, ''),
('1798b0084ec6e5fa30f7f6a954c651338898c879', '::1', 1488870332, ''),
('3646dbc90bbbaba4e2b181c7104b999b3c1ad053', '::1', 1488870332, '');



CREATE TABLE `file` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `keywords` text NOT NULL,
  `src` varchar(255) NOT NULL,
  `type_name` varchar(100) NOT NULL,
  `type_id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `free` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO `file` (`id`, `name`, `description`, `keywords`, `src`, `type_name`, `type_id`, `parent_id`, `question_id`, `number`, `free`) VALUES
(73, 'Դաս1', '', 'Դաս1  ', '01129_1487318149', 'video', 1, 129, 0, 1, 'off'),
(75, 'Դաս2', '', 'Դաս2  ', '01129_1487320084', 'video', 1, 129, 0, 3, 'off'),
(77, 'Դաս 2', '', 'Դաս 2  ', '05129_1487324201', 'html', 5, 129, 0, 2, 'off'),
(78, '', '', '', '', 'seperator', 0, 129, 0, 12, 'off'),
(80, 'Գույներ', '', 'Գույներ  ', '01129_1487570923', 'video', 1, 129, 0, 2, 'off'),
(81, 'ուլունքներ', '', 'ուլունքներ  ', '05129_1487571129', 'html', 5, 129, 0, 6, 'off'),
(84, 'ըստ նկարի լրացնել', '', 'ըստ նկարի լրացնել  ', '05129_1487572896', 'html', 5, 129, 0, 23, 'off'),
(86, '', '', '', '', 'seperator', 0, 129, 0, 30, 'off'),
(87, 'ինտերակտիվ', '', 'ինտերակտիվ  ', '05129_1487663379', 'html', 5, 129, 0, 31, 'off'),
(88, 'Հարց', '', '', '', 'question', 6, 129, 63, 1, 'off'),
(90, 'Հարց', '', '', '', 'question', 6, 106, 65, 1, 'off'),
(91, 'Հարց', '', '', '', 'question', 6, 129, 66, 3, 'off'),
(92, 'vidio', '', 'vidio  ', '01125_1488195706', 'video', 1, 125, 0, 1, 'off'),
(103, 'Հարց', '', '', '', 'question', 6, 129, 67, 1, 'off');



CREATE TABLE `messages_room` (
  `id` int(11) NOT NULL,
  `sender` varchar(50) NOT NULL,
  `recipient` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `timestamp` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `messages_room` (`id`, `sender`, `recipient`, `message`, `timestamp`) VALUES
(1, 'sveta', 'artak', 'hi', 1481615144),
(2, 'artak', 'sveta', 'barev', 1481714053),
(3, 'artak', 'ani', 'sdgwet', 1481714222),
(4, 'artak', 'sveta', 'rty', 1481714237),
(5, 'artak', 'ani', 'դֆհդֆհ', 1482829310),
(6, 'ani', 'arasg', 'shfjsbfj', 1486714952),
(7, 'ani', 'arasg', 'hghvgc', 1486714994),
(8, 'ani', 'artak', 'ggfd', 1486715017);



CREATE TABLE `position` (
  `id` int(11) NOT NULL,
  `position` varchar(255) NOT NULL,
  `keywords` varchar(255) NOT NULL,
  `parent_id` int(11) UNSIGNED NOT NULL,
  `position_group` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `position` (`id`, `position`, `keywords`, `parent_id`, `position_group`) VALUES
(102, 'ԴՊՐՈՑԱԿԱՆ', 'ԴՊՐՈՑԱԿԱՆ', 0, 1),
(105, 'Ֆիզիկա', 'Ֆիզիկա', 102, 0),
(106, '7-րդ դասարան', '7-րդ դասարան', 105, 0),
(115, 'Երկրաչափություն', 'Երկրաչափություն', 102, 0),
(116, 'Մաթեմատիկա', 'Մաթեմատիկա', 102, 0),
(120, 'Թեմա 1', 'Թեմա 1', 106, 0),
(124, '8-րդ դասարան', '8-րդ դասարան', 105, 0),
(125, '9-րդ դասարան', '9-րդ դասարան', 105, 0),
(127, 'Թեմա 2', 'Թեմա 2', 106, 0),
(128, '1-ին դասարան', '1-ին դասարան', 116, 0),
(129, 'Դաս 1: Գույներ', 'Գույներ բանալի', 128, 1),
(131, 'նոր թեմա', 'նոր թեմա նոր բանալի', 105, 0);



CREATE TABLE `pupil_data` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `lesson_id` varchar(100) NOT NULL,
  `lesson_name` varchar(100) NOT NULL,
  `question_result` int(10) NOT NULL,
  `interactive_result` int(10) NOT NULL,
  `timestamp` int(11) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `position_id` int(11) NOT NULL,
  `question_type` int(11) NOT NULL,
  `question` text NOT NULL,
  `answers` varchar(255) NOT NULL,
  `correct_answer` int(11) NOT NULL,
  `hint_lessons_id` varchar(50) NOT NULL,
  `question_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO `questions` (`id`, `position_id`, `question_type`, `question`, `answers`, `correct_answer`, `hint_lessons_id`, `question_id`) VALUES
(49, 73, 1, 'harc', 'pat1|pat2', 1, '75|75', 0),
(50, 102, 1, 'harc', 'pat1|pat2|pat3|pat4|pat5|pat6', 5, '', 0),
(51, 102, 1, 'tyi', 'toty|toto', 2, '', 0),
(52, 73, 1, 'հարց', 'պատ1|պատ2|պատ3', 3, '', 0),
(62, 129, 1, 'sdg', 'we|twet|we|asdf|sfasf|asf', 4, '82|73|80|80|85|75', 0),
(64, 129, 1, 'gshs', 'dhsdh|sdhsdh', 2, '75|75', 63),
(66, 129, 1, 'asf', 'asg|asgu', 2, '92|92', 66),
(73, 129, 1, 'Հարց', 'պատասխան1|պատասխան2|պատասխան3 ճիշտ է|պատասխան4', 3, '73|80|75|92', 67);



CREATE TABLE `teachers_data` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `start_time` varchar(5) NOT NULL,
  `end_time` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO `teachers_data` (`id`, `username`, `lesson_id`, `start_time`, `end_time`) VALUES
(8, 'ani', 73, '00:04', '00:14'),
(18, 'ani', 73, '00:10', '01:20'),
(20, 'ani', 73, '00:06', '00:08'),
(23, 'ani', 82, '00:06', '00:08'),
(24, 'ani', 82, '00:06', '00:09'),
(25, 'ani', 73, '00:12', '00:15');



CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(35) NOT NULL,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `status` varchar(40) NOT NULL,
  `gender` varchar(40) NOT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `activation_code` varchar(100) NOT NULL,
  `activation` varchar(100) NOT NULL,
  `permission` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `users` (`id`, `username`, `password`, `first_name`, `last_name`, `status`, `gender`, `age`, `email`, `activation_code`, `activation`, `permission`) VALUES
(1, 'artak', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'Artak', 'Gevorgyan', 'pupil', 'male', 0, 'arta@yahoo.com', 'J7MdheyiarlDGY85', 'yes', 'user'),
(2, 'abraham', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'apo', 'azganun', 'teacher', 'male', 50, 'asf@mail.ru', '', 'yes', 'user'),
(4, 'admin', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'Vardan', 'aas', 'teacher', 'male', 0, 'admin@yahoo.com', '', 'yes', 'admin'),
(5, 'ani', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'ani', 'asdsgasg', 'teacher', 'female', 0, 'ani@mail.ru', '', 'yes', 'user'),
(52, 'vahram', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'varham3', 'aramyan', 'pupil', 'male', 0, 'g.artak@yahoo.com', 'rLPxa2kMOpgDd5uT', 'yes', 'user'),
(53, 'ManArm', '3072f2cba5d16084fbfcc7408cd0da64', 'Armen', 'Manvelyan', 'teacher', 'male', 0, 'amanvelyan@compass.am', 'ldLiWzEAaSTyQbwN', 'yes', 'user'),
(55, 'asgasg', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'shd', 'sjsdjhsdh', 'pupil', 'male', 1, 'agas@mail.ru', 'nTcbEY65ZxeIDHAQ', 'no', 'user'),
(56, 'arasg', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'dgdshshd', 'sdgs', 'teacher', 'female', 5, 'asd@mail.eu', 'MoeIarL1PthxbGcz', 'no', 'user'),
(57, 'karine', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'fasdghsd', 'hshsdh', 'pupil', 'male', 1, 'sssdh@mail.ru', '5geGMplhaVH0rUYW', 'no', 'user'),
(58, 'andranik', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'sdfhd', 'jdfjdfjdf', 'teacher', 'female', 6, 'affas@mail.ru', 'gW7HCEV9zYjePirD', 'no', 'user'),
(59, 'aaaaaaa', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'hdj', 'dfjdj', 'pupil', 'male', 12, 'sdfh@mail.ru', 'S49oKzuALiJeMYWI', 'no', 'user'),
(60, 'fgsdhsdh', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'sdg', 'sdhsh', 'pupil', 'female', 19, 'asdfrsssssssssssssssssssssss@mail.ru', 'lKhGsOUMEtA1rXxg', 'no', 'user'),
(61, 'asgasgasgasg', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'ssdhsh', 'sdhshdsdh', 'pupil', 'male', 11, 'asgfasjgkajgkjajgkjaskgjaskgjkasgjk@mail.ru', 'rRho5ELZkjMuTSVQ', 'no', 'user'),
(62, '98-fc-11-50-0d-e5', '5d793fc5b00a2348c3fb9ab59e5ca98a', '', 'sfdf', 'pupil', 'male', 6, 'df@mail.ru', 'rRho5ELZkjMuTSVQ', 'yes', 'user'),
(63, 'DESKTOP-PC', '20f5dce8f87a79d93b7104e58079425b', 'DESKTOP', 'DESKTOP', 'DESKTOP', 'DESKTOP', 7, 'NONE', 'NONE', 'yes', 'user'),
(64, 'ashot', '20f5dce8f87a79d93b7104e58079425b', 'DESKTOP', 'DESKTOP', 'DESKTOP', 'DESKTOP', 7, 'DESKTOP', 'DESKTOP', 'yes', 'user'),
(65, 'albert', '5d793fc5b00a2348c3fb9ab59e5ca98a', 'albert', 'galstyan', 'pupil', 'male', 7, 'albert@yahoo.com', '1X5N2AOum96BZC8z', 'yes', 'user'),
(66, 'artur', '20f5dce8f87a79d93b7104e58079425b', 'DESKTOP', 'DESKTOP', 'DESKTOP', '', 0, '', '', 'yes', 'user');



CREATE TABLE `users_license_code` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `license_code` varchar(20) NOT NULL,
  `position_id` int(11) NOT NULL,
  `position_parent_id` int(11) NOT NULL,
  `timestamp` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `time_end` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO `users_license_code` (`id`, `username`, `license_code`, `position_id`, `position_parent_id`, `timestamp`, `time_end`) VALUES
(1, 'vahram', '', 124, 105, 1487312850, 1489904850),
(2, 'admin', '', 102, 0, 1487313137, 1489905137),
(3, 'asgasg', '', 102, 0, 1487313218, 1489905218),
(4, 'ani', '', 129, 111, 1487313492, 1489905492),
(5, 'artak', '', 129, 128, 1487318711, 1489910711),
(6, 'artak', '', 129, 128, 1487318711, 1489910711),
(7, 'ManArm', '', 129, 128, 1487573414, 1490165414);


ALTER TABLE `ci_sessions`
  ADD KEY `ci_sessions_timestamp` (`timestamp`);


ALTER TABLE `file`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `messages_room`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `position`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `pupil_data`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `teachers_data`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);


ALTER TABLE `users_license_code`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

ALTER TABLE `messages_room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

ALTER TABLE `pupil_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

ALTER TABLE `teachers_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

ALTER TABLE `users_license_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
