-- DROP DATABASE IF EXISTS skillshub;
-- CREATE DATABASE skillshub;

/* 
Automatic execution when the server startups:
*/

ALTER TABLE User
CHANGE COLUMN createdAt createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN updatedAt updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ;
