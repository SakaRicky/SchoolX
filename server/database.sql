CREATE DATABASE schoolx;

-- \c into schoolx database

CREATE TABLE Students (
    id BIGSERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    dateOfBirth Date NOT NULL,
    gender VARCHAR(7),
    classId INT FOREIGN KEY, -- should exist first
    fathersName VARCHAR(50),
    fathersPhone VARCHAR(50),
    fathersOccupation VARCHAR(50),
    mothersName VARCHAR(50),
    mothersPhone VARCHAR(50),
    mothersOccupation VARCHAR(50)
);

CREATE TABLE Customers (
    id INT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    address_street INT NOT NULL,
    adreess_town VARCHAR(25) NOT NULL,
);