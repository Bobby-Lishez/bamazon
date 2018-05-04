//dependencies
var mySQL = require("mysql");
var inquirer = require("inquirer");

//initialization
var connection = mySQL.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "asdf1234",
  database: "bamazon"
});
connection.connect(function(err){
    if (err) throw (err);
    welcome();
});

//function to present the available products at the beginning
function welcome() {
    console.log("Welcome to Bamazon. Here are our available products:");
    connection.query(
        "SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log("Product Name: " + res[i].product_name + " || Cost: " + res[i].price + " || " + res[i].stock_quantity + " in stock.");
              }
        }
    )
};