DROP DATABASE IF EXISTS shardeo;
CREATE DATABASE IF NOT EXISTS shardeo;
USE shardeo;

CREATE USER IF NOT EXISTS 'willemintom'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON shardeo . * TO 'willemintom'@'%';

CREATE TABLE roles (
    id_role SMALLINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    permission SMALLINT NOT NULL,
    PRIMARY KEY (id_role),
    CONSTRAINT roles_ak
        UNIQUE (name, permission)
)
Engine = INNODB;

CREATE TABLE users (
    id_user SMALLINT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_role SMALLINT NOT NULL,
    PRIMARY KEY (id_user),
    UNIQUE (email),
    CONSTRAINT fk_users_id_role
        FOREIGN KEY (id_role)
        REFERENCES roles(id_role)
        ON DELETE CASCADE
)
Engine = INNODB;

CREATE TABLE media (
    id_media SMALLINT NOT NULL,
    name_media VARCHAR(255) NOT NULL,
    description_media VARCHAR(255) NOT NULL,
    upload_date DATE NOT NULL,
    PRIMARY KEY (id_media)
)
Engine = INNODB;

CREATE TABLE theme (
    id_theme SMALLINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_theme)
)
Engine = INNODB;

CREATE TABLE media_theme_junction (
    id_media SMALLINT NOT NULL,
    id_theme SMALLINT NOT NULL,
    CONSTRAINT media_theme_pk
        PRIMARY KEY (id_media, id_theme),
    CONSTRAINT media_theme_junction_media_fk
        FOREIGN KEY (id_media)
        REFERENCES media (id_media),
    CONSTRAINT theme_fk
        FOREIGN KEY (id_theme)
        REFERENCES theme (id_theme)
)
Engine = INNODB;

CREATE TABLE publication (
    id_publication SMALLINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    title_black BIT(1) NOT NULL,
    description_publication VARCHAR(255) NOT NULL,
    upload_date DATE NOT NULL,
    number_view SMALLINT NOT NULL,
    number_like SMALLINT NOT NULL,
    id_media SMALLINT NOT NULL,
    PRIMARY KEY (id_publication),
    CONSTRAINT fk_id_publication_id_media
            FOREIGN KEY (id_media)
            REFERENCES media(id_media)
            ON DELETE CASCADE
)
Engine = INNODB;

CREATE TABLE comment (
    id_comment SMALLINT NOT NULL AUTO_INCREMENT,
    content VARCHAR(255) NOT NULL,
    id_publication SMALLINT NOT NULL,
    PRIMARY KEY (id_comment),
    CONSTRAINT fk_publication_id_publication
           FOREIGN KEY (id_publication)
           REFERENCES publication(id_publication)
           ON DELETE CASCADE
)
Engine = INNODB;

CREATE TABLE album (
    id_album SMALLINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    title_black BIT(1) NOT NULL,
    upload_date DATE NOT NULL,
    description_album VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_album)
)
Engine = INNODB;

CREATE TABLE album_media_junction (
    id_album SMALLINT NOT NULL,
    id_media SMALLINT NOT NULL,
    CONSTRAINT album_media_pk
        PRIMARY KEY (id_album, id_media),
    CONSTRAINT album_media_fk
        FOREIGN KEY (id_album)
        REFERENCES album (id_album),
    CONSTRAINT media_fk
        FOREIGN KEY (id_media)
        REFERENCES media (id_media)
)
Engine = INNODB;

CREATE TABLE album_theme_junction (
    id_album SMALLINT NOT NULL,
    id_theme SMALLINT NOT NULL,
    CONSTRAINT theme_pk
        PRIMARY KEY (id_album, id_theme),
    CONSTRAINT album_theme_junction_theme_fk
        FOREIGN KEY (id_album)
        REFERENCES album (id_album),
    CONSTRAINT album_theme_junction_album_fk
        FOREIGN KEY (id_theme)
        REFERENCES theme (id_theme)
)
Engine = INNODB;
