-- CodeMetrics Database Setup Script
-- Run this script in PostgreSQL to create the database

-- Create database
CREATE DATABASE codemetrics;

-- Connect to the database
\c codemetrics;

-- The tables will be auto-created by Hibernate when the application starts
-- This is just to create the database itself

-- Verify database creation
SELECT current_database();
