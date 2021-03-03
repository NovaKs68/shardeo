use shardeo;

INSERT INTO `roles` (`id_role`, `name`, `permission`) VALUES
(1, 'utilisateur', 1),
(2, 'contributeur', 2),
(3, 'administrateur', 3);

INSERT INTO `users` (`id_user`, `first_name`, `last_name`, `email`, `password`, `banner`, `title_black`, `id_role`) VALUES
(1, 'Jack', 'Blues', 'jack.blues@gmail.com', 'test', 'superBanner.png', 0, 1),
(2, 'utilisateur', 'utilisateur', 'utilisateur@gmail.com', 'utilisateur', 'genialBanner.png', 1, 3),
(3, 'admin', 'administrateur', 'admin@gmail.com', 'admin', 'imageBelle.jpg', 0, 3),
(4, 'contributeur', 'contributeur', 'contributeur@gmail.com', 'test', 'imageVolcan.jpg', 1, 2);

INSERT INTO `media` (`id_media`, `name_file`, `title`, `description_media`, `upload_date`, `number_view`, `number_like`) VALUES
(1, 'http://localhost:4200/api/files/image1.jpg', 'Media', 'C\'est un super media ca hein', '2019-02-10', 11, 2),
(2, 'http://localhost:4200/api/files/image2.jpg', 'Film', 'C\'est un super film ca hein', '2021-01-02', 1072, 364),
(3, 'http://localhost:4200/api/files/image3.jpg', 'Photo', 'C\'est une super belle photo', '2020-09-24', 841351, 5423),
(4, 'http://localhost:4200/api/files/image4.jpg', 'Couché de soleil', 'Un beau couché de soleil', '2019-02-10', 9, 1),
(5, 'http://localhost:4200/api/files/image5.jpg', 'Forêt appaisante', 'Un forêt permettant de se ressourcer', '2021-04-19', 18, 2),
(6, 'http://localhost:4200/api/files/image6.jpg', 'Couché de soleil', 'Un beau couché de soleil', '2019-02-10', 9, 1),
(7, 'http://localhost:4200/api/files/image7.jpg', 'Forêt appaisante', 'Un forêt permettant de se ressourcer', '2021-04-19', 18, 2),
(8, 'http://localhost:4200/api/files/image8.jpg', 'Forêt appaisante', 'Un forêt permettant de se ressourcer', '2021-04-19', 18, 2);


INSERT INTO `theme` (`id_theme`, `name`) VALUES
(1, 'Nature'),
(2, 'Soleil'),
(3, 'Draw');

INSERT INTO `media_theme_junction` (`id_media`, `id_theme`) VALUES
(1, 2),
(2, 1),
(3, 3),
(3, 2),
(4, 1),
(5, 3),
(5, 1),
(6, 1),
(6, 2),
(7, 1),
(7, 2),
(7, 3),
(8, 1);

INSERT INTO `comment` (`id_comment`, `content`, `id_media`) VALUES
(1, 'J\'aime pas trop ce poste', 1),
(2, 'Trop bien j\'adore !!!', 1),
(3, 'On se connait non ?', 2);

INSERT INTO `album` (`id_album`, `title`, `title_black`, `upload_date`, `description_album`) VALUES
(1, 'Inspiration de nature', 1, '2021-01-01', 'Une playlist regroupant plein de photos sur la nature.'),
(2, 'La beauté du soleil', 0, '2020-07-09', 'Vous pourrez trouver tous les plus beaux contenus sur le soleil ici.');

INSERT INTO `album_media_junction` (`id_album`, `id_media`) VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(2, 3);

INSERT INTO `album_theme_junction` (`id_album`, `id_theme`) VALUES
(1, 1),
(2, 2);
