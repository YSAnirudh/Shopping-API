# Shopping-API
API with 2 microservices

!!!! MAKE SURE YOU HAVE ALL THE NPM PACKAGES INSTALLED !!!!

There are a few HardCoded Products
To use the product microservice, 
  1) from the root of the repo, cd products
  2) npm start (Server runs on PORT = 5050 if no .env.PRODUCT_PORT is SET)
  3) Wait for mongoose to connect
  4) Issue requests 
    - GET /rest/v1/products - Gets all the products stored in the database
    !! NOT USED FOR ASSIGNMENT !!
    - POST /rest/v1/products - To create a new Product
    - POST /rest/v1/products/update - To update an existing Product
    req.body = {
        productId:'',
        category:'',
        productName:'',
        productModel:'',
        price:'',
        availableQuantity:'',
    }

There are a few HardCoded Users
To use the usercart microservice,
  1) from the root of the repo, cd usercart
  2) npm start (Server runs on PORT = 5051 if no .env.USERCART_PORT is SET)
  3) Wait for mongoose to connect
  4) Issue requests
    - GET /rest/v1/users/<user>/cart - Gets the items in the cart of <user>
    - PUT /rest/v1/users/<user>/cart - Adds or update the cart of the <user> based on product availability.
    !! NOT USED FOR ASSIGNMENT !!
    - PUT /rest/v1/users/<user> - Adds the user to the user list (no req.body required)
    - GET /rest/v1/users - Gets the uuids of all the users present
    req.body = {
        productId:'',
        quantity:''
    }
