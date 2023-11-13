# Employee Tracker

## Description
This repo is for a command-line application used to manage a company's employee database. 

## User Story 
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Technologies

- Node.js
- MySQL
- dotenv
- Inquirer
- console.table

## Video Demonstration 
https://drive.google.com/file/d/1na6jlH68PWwrLA7c1tLm_MictMdoprtQ/view

## 🛠 Technologies 

**Runtime:** Node.js

**Lanuage:** Javascript

**Dependencies:** 

    "console.table": "^0.10.0",
    "inquirer": "^8.2.4",
    "mysql2": "^3.0.1",


## 💾 Installation

With the package.json file, use jest to excute the tests in the terminal by the following command:
```
npm i
```

## Usage

To excute MySQL shell in the terminal by the following command:
```
mysql -u root
```
or if you have a password for database try:
```
mysql -u root -p
```
then source the schema file:
```
SOURCE db/schema.sql;
```
To seed the database:
```
SOURCE db/seeds.sql;
```
To run the application:
```
node server.js
```

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)