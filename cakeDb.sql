CREATE DATABASE cakedb;

USE cakedb;
------------------------
DROP TABLE tblcustomer;
CREATE TABLE IF NOT EXISTS tblCustomer(
cust_id INT(11) NOT NULL,
cust_email VARCHAR(50),
cust_password VARCHAR(100),
cust_phone VARCHAR(25),
cust_dob DATETIME,
cust_address VARCHAR(100),
cust_gender varchar(10)
); 

ALTER TABLE `tblCustomer`
  ADD PRIMARY KEY (`cust_id`);
  
INSERT INTO 
tblcustomer (cust_id,cust_email,cust_password,cust_phone,cust_dob,cust_address) 
VALUES(1,'reshav@gmail.com','12345678','9867236616','1999-09-15 07:58:01','imadol,Lalitpur');
SELECT * FROM tblcustomer;
truncate tblcustomer;
-- ALTER TABLE `tbl_emoji_selections`
  -- ADD CONSTRAINT `fk_tbl_emoji_selections_emoji_id` FOREIGN KEY (`emoji_id`) REFERENCES `tbl_emojis` (`emoji_id`),
  -- ADD CONSTRAINT `fk_tbl_emoji_selections_emp_id` FOREIGN KEY (`emp_id`) REFERENCES `tbl_employees` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE;
