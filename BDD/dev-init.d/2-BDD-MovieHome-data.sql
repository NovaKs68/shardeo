use shardeo;

INSERT INTO `roles` (`id_role`, `name`, `permission`) VALUES
(1, 'utilisateur', 1),
(2, 'contributeur', 2),
(3, 'administrateur', 3);

INSERT INTO `users` (`id_user`, `first_name`, `last_name`, `email`, `password`, `id_role`) VALUES
(1, 'Jack', 'Blues', 'jack.blues@gmail.com', 'test', 1),
(2, 'utilisateur', 'utilisateur', 'utilisateur@gmail.com', 'utilisateur', 3),
(3, 'admin', 'administrateur', 'admin@gmail.com', 'admin', 3),
(4, 'contributeur', 'contributeur', 'contributeur@gmail.com', 'test', 2);

INSERT INTO `media` (`id_media`, `name_media`, `description_media`, `upload_date`) VALUES
(1, 'superMedia.png', 'C\'est un super media ca hein', '2019-02-10'),
(2, 'superFilm.mp4', 'C\'est un super film ca hein', '2021-01-02'),
(3, 'superPhoto.jpg', 'C\'est une super belle photo', '2020-09-24');

INSERT INTO `theme` (`id_theme`, `name`) VALUES
(1, 'Nature'),
(2, 'Soleil');

INSERT INTO `media_theme_junction` (`id_media`, `id_theme`) VALUES
(1, 2),
(2, 1);

INSERT INTO `publication` (`id_publication`, `title`, `title_black`, `description_publication`, `upload_date`, `number_view`, `number_like`, `id_media`) VALUES
(1, 'Couché de soleil', 1, 'Un beau couché de soleil', '2019-02-10', 25, 9, 1),
(2, 'Forêt appaisante', 1, 'Un forêt permettant de se ressourcer', '2021-04-19', 61, 18, 2);

INSERT INTO `comment` (`id_comment`, `content`, `id_publication`) VALUES
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
