# E-Commerce-backend
API made for E-Commerce backend.

## Made With

- NodeJs
- MongoDB and Mongoose
- Express Js

## Endpoints
Endpoints have been made for User, Product and Order.

<br>

## For USER
<b>POST REQUEST</b>
- /user/signup -> For Signup of User
- /user/login  -> For logging in the user. Generates a token which can be used to get the details (in '/me' router)
<br>

<b>GET REQUEST</b>
- /user/me -> Get user detail by passing the generated token in the Header.
- /user/all -> Get details of all the user

<b>PUT REQUEST</b>
- /user/:id -> Updating details of the user

<b>DELETE REQUEST</b>
- /user/:id -> delete User details with the help of id


<br>

## For PRODUCTS
<b>POST REQUEST</b>
- /products/addProducts -> Adding Products (Method 1)
- /products/add  -> Adding Products (Method 2)
<br>

<b>GET REQUEST</b>
- /products/all -> Get details of all the products.
- /products/getByCategory -> Get Different Product Category
- /products/:id -> Get product details by id

<b>PUT REQUEST</b>
- /products/:id -> Updating Product Details

<b>DELETE REQUEST</b>
- /products/:id -> delete Product details with the help of id



<br>

## For ORDERS
<b>POST REQUEST</b>
- /order/addOrder -> Creation of an order
<br>

<b>GET REQUEST</b>
- /order/:id -> Get a particular order detail

<b>PUT REQUEST</b>
- /order/:id -> Updating Order Details

<b>DELETE REQUEST</b>
- /order/:id -> delete Order details with the help of id.
