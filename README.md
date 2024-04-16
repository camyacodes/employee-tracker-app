# Employee Tracker

## Description
This repo is for a command-line application used to manage a company's employee database, using Node.js, MySQL, and Inquirer.

LIVE DEMO: https://drive.google.com/file/d/1EbPelo9oTSIc4W9YH0quBUAriEszRTmy/view?usp=sharing
![image](https://github.com/camyacodes/employee-tracker-app/assets/87587644/00b9c51e-629f-46cd-aa34-b10cfb26047a)



## User Story 
AS A business owner<br />
I WANT to be able to view and manage the departments, roles, and employees in my company<br />
SO THAT I can organize and plan my business<br />

## Video Demonstration 
<!-- https://drive.google.com/file/d/1na6jlH68PWwrLA7c1tLm_MictMdoprtQ/view -->

## Technologies 

**Runtime:** Node.js

**Lanuage:** MySQL, Javascript

**Dependencies:** 

    "console.table": "^0.10.0",
    "dotenv": "^16.3.1",
    "inquirer": "^8.0.0",
    "mysql2": "3.6.3"

## Installation

Download this repository or fork and clone it to your local device.<br />
Run an `npm install` to install all of the dependencies.<br />
Create a `.env` file and add your MySQL password to it:
```
SQL_PW="<password>"
```
## Usage

Begin by running the following commands in your MySQL shell terminal:
```
mysql -u root -p
```
Create the database:
```
SOURCE db/db.sql
```
then source the schema file:
```
SOURCE db/schema.sql;
```
Finally seed the database:
```
SOURCE db/seeds.sql;
```
Then in your node terminal start the application by running:
```
node server.js
```

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
