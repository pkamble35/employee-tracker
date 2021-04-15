DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT ,
  manager_id INT ,
  PRIMARY KEY (id)
);
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT ,
  PRIMARY KEY (id)
);
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE manager (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (name) VALUES ("sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Legal");


INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 150000.00,1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 100000.00,1);

INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 150000.00,2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 120000.00,1);

INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 120000.00,2);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Team Lead", 120000.00,3);

INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 120000.00,3);


INSERT INTO manager (name) VALUES ("Ashley Rodriguez");
INSERT INTO manager (name) VALUES ("John Doe");
INSERT INTO manager (name) VALUES ("Sarah Lourd");

INSERT INTO EMPLOYEE (first_name,last_name,role_id,manager_id) VALUES ("John", "Doe",1,1);
INSERT INTO EMPLOYEE (first_name,last_name,role_id,manager_id) VALUES ("Mike", "Chan",2,2);
INSERT INTO EMPLOYEE (first_name,last_name,role_id,manager_id) VALUES ("Tom", "Allen",7,3);