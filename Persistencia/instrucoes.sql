CREATE DATABASE sistema;

USE sistema;

CREATE TABLE author(
    author_id INT NOT NULL AUTO_INCREMENT,
    author_name VARCHAR(100) NOT NULL,
    CONSTRAINT pk_author PRIMARY KEY(author_id)
);

CREATE TABLE book(
    book_id INT NOT NULL AUTO_INCREMENT,
    book_title VARCHAR(100) NOT NULL,
    book_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    book_published DATE,
    author_id INT NOT NULL,
    CONSTRAINT pk_book PRIMARY KEY(book_id),
    CONSTRAINT fk_book_author FOREIGN KEY(author_id) REFERENCES author(author_id)
);