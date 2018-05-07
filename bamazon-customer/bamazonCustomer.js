//dependencies
var mySQL = require("mysql");
var inquirer = require("inquirer");


//initialization
var listLength = 0;
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
            if(err) throw err;
            listLength = res.length;
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id + ". Product Name: " + res[i].product_name + " || Cost: " + res[i].price + " || " + res[i].stock_quantity + " in stock.");
              };
              mainPrompt();
        }
    );
};

//function to get the user's choice of item
function mainPrompt(){
    inquirer.prompt([
        {
            name: "toBuy",
            type: "input",
            message: "Enter the ID number of the product you wish to buy."
             }
    ]).then(function(answer){
        //console.log(answer);
        //console.log("type of answer.toBuy: " + typeof(answer.toBuy));
        var toBuy = parseInt(answer.toBuy);
        //console.log("type of toBuy: " + typeof(toBuy));
        if(!parseInt(answer.toBuy)){
            console.log("Please only enter the ID number of the product.");
            mainPrompt();
        } else if (toBuy < 1 || toBuy > listLength){
            console.log("That number doesn't match one of our products. Please try harder");
            mainPrompt();
        } else{
        connection.query(
            "SELECT * FROM products WHERE id = ?", [answer.toBuy], function(err, res){
                if (err) throw err;
                buy(res[0]);
            });
        };
    })
};

function buy(product){
    //console.log("You are buying: " + product);
    //First, ask the user how many to buy
    inquirer.prompt([
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
        }
    ]).then(function(answer){
        //console.log(answer);
        var buyQty = parseInt(answer.quantity);
        if(product.stock_quantity < buyQty || !typeof(buyQty) == "number") {
            console.log("Sorry, we don't have that many of that product.");
            mainPrompt();
        } else {
            console.log("Your total will be $" + (buyQty * product.price) + ".");
            var newQty = product.stock_quantity - buyQty;
            connection.query(
                "UPDATE products SET ? WHERE ?", [{stock_quantity: newQty}, {id: product.id}], function(err){
                    if (err) throw err;
                    console.log("Thank you!");
                    connection.end();
                }
            );
        }   
    })
}