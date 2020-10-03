

-- Create a new database called 'notetaker'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT name
FROM sys.databases
WHERE name = N'notetaker'
)
CREATE DATABASE notetaker
GO

-- Create a new table called notes' in schema 'SchemaName'
-- Drop the table if it already exists
IF OBJECT_ID('SchemaName notes', 'U') IS NOT NULL
DROP TABLE SchemaName
notes
GO
-- Create the table in the specified schema
CREATE TABLE SchemaName notes
( notesId INT NOT NULL PRIMARY KEY, -- primary key column
    id [NVARCHAR]
(50) NOT NULL,
    title [NVARCHAR]
(50) NOT NULL

    -- specify more columns here
);
GO