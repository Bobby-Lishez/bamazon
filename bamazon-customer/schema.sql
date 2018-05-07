create database bamazon;
use bamazon;
create table products (
	id int(10) auto_increment,
    product_name varchar(30) NOT NULL,
    department_name varchar(30) NOT NULL,
    price double NOT NULL,
    stock_quantity int(4) NOT NULL,
    primary key(id)
);

insert into products (product_name, department_name, price, stock_quantity) 
values ("Red Crayon", "Warm Tones", 5.00, 10);

insert into products (product_name, department_name, price, stock_quantity) 
values ("Orange Crayon", "Warm Tones", 3.50, 20);

insert into products (product_name, department_name, price, stock_quantity) 
values ("Yellow Crayon", "Warm Tones", 6.25, 15);

insert into products (product_name, department_name, price, stock_quantity) 
values ("Green Crayon", "Cool Tones", 2.00, 25);

insert into products (product_name, department_name, price, stock_quantity) 
values ("Blue Crayon", "Cool Tones", 4.50, 18);

insert into products (product_name, department_name, price, stock_quantity) 
values ("Indigo Crayon", "Fictional Tones", 5.10, 1);

insert into products (product_name, department_name, price, stock_quantity) 
values ("Purple Crayon", "Cool Tones", 25.00, 6);

insert into products (product_name, department_name, price, stock_quantity) 
values ("Brown Crayon", "Lukewarm Tones", .25, 10);

insert into products (product_name, department_name, price, stock_quantity) 
values ("Black Crayon", "Absense of Tones", 7.00, 8);

insert into products (product_name, department_name, price, stock_quantity) 
values ("Grey Crayon", "British Tones", 4.19, 14);
