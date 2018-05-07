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

function welcome(){
    console.log("You are viewing Bamazon supervisor mode");
    connection.query("Select * from products", function(err, res){
        if(err) throw err;
        listLength = res.length;
    });
    inquirer.prompt([{
        name: "toDo",
        type: "list",
        message: "What would you like to do today?",
        choices: [
            "1. View Products for sale",
            "2. View low-inventory products",
            "3. Add inventory",
            "4. Add a new product"
        ]
    }]). then(function(answer){
        switch(answer.toDo){
            case "1. View Products for sale": {
                viewProducts();
                break;
            }
            case "2. View low-inventory products": {
                viewLowInventory();
                break;
            }
            case "3. Add inventory": {
                addInventory();
                break;
            }
            case "4. Add a new product": {
                addProduct();
                break;
            }
            default: {
                console.log("Something went wrong.");
                connection.end();
            }
        }
    })
};

function viewProducts() {
    connection.query(
        "SELECT * FROM products", function(err, res) {
            if(err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id + ". Product Name: " + res[i].product_name + " || Cost: " + res[i].price + " || " + res[i].stock_quantity + " in stock.");
              };
              welcome();
        }
    );
};

function viewLowInventory() {
    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
            if(err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id + ". Product Name: " + res[i].product_name + " || Cost: " + res[i].price + " || " + res[i].stock_quantity + " in stock.");
              };
              welcome();
        }
    );
};

function addInventory() {
    inquirer.prompt([{
        name: "toAdd",
        type: "input",
        message: "Please enter the ID number of the item to which you'd like to add inventory."
    },
    {
        name: "howMany",
        type: "input",
        message: "How many would you like to add?"
    }]).then(function(answer) {
        var toAdd = parseInt(answer.toAdd);
        var howMany = parseInt(answer.howMany);
        if(!parseInt(answer.toAdd)){
            console.log("Please only enter the ID number of the product.");
            welcome();
        } else if (toAdd < 1 || toAdd > listLength){
            console.log("That number doesn't match one of our products. Please try harder");
            welcome();
        } else{
            if (!parseInt(answer.howMany)){
                console.log("'How many' means enter a number, Einstein");
                welcome();
            } else {
                connection.query("select * from products where id = ?", [toAdd], function(err, res){
                    if (err) throw err;
                    var newInv = res[0].stock_quantity + howMany;
                    connection.query("update products set ? where ?", [{stock_quantity: newInv},{id: toAdd}], function(err){
                        if(err) throw err;
                        console.log("Inventory successfully added");
                        welcome();
                    })
                })
            }
        };
    })
};

function addProduct() {
    inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message:"Enter a name for your product."
        },
        {
            name: "department_name",
            type: "input",
            message: "Enter the department your product is in."
        },
        {
            name: "price",
            type: "input",
            message: "Enter the price of your product."
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "How many of this product are you initially stocking?"
        }
    ]).then(function(answer) {
        if(!parseFloat(answer.price) || !parseInt(answer.stock_quantity)){
            console.log("The price and quantity need to be numbers");
            welcome();
        } else{
            connection.query("INSERT into PRODUCTS (product_name, department_name, price, stock_quantity) values (?, ?, ?, ?)",
                                [answer.product_name, answer.department_name, parseFloat(answer.price), parseInt(answer.stock_quantity)],
                                function(err){
                                    if(err) throw err;
                                    console.log("Product successfully added.");
                                    welcome();
                                }
                                );
        }
    })
};