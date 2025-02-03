
# Blogs-Manage

The backend of the Blog-manage application is designed to manage blogs of the particular registered user and fliter blogs efficiently.

#### The project follows the modular pattern, organizing the code into separate, reusable modules for improved maintainability and scalability. 

#### Live Link :
https://assignment-3-roan-pi.vercel.app/api/

## Features

#### **Operations (User):**

**1. Register:**
User can register by name,email and password.

**2. LogIn:**
User can login by email and password and generate a authentication token.

**3. Create A Blog:**
Registered and authenticated User can create a blog.

**4.Update A Blog:**
Registered and authenticated User can update a blog.

**5.Delete A Blog:**
Registered and authenticated User can delete a blog.


**\*Filtering\*\***:
Blogs can be filtered and sorted.

#### **Operations (Admin):**

**1. LogIn:**
Admin can login by email and password and generate a authentication token.

**2. Block A User:**
Admin can block a user.

**3. Delete a blog:**
Admin can delete a blog.

#### **Blogs-Manage API Endpoints**

### \*Register

**Endpoint:**
/api/auth/register

**Method:** POST

### \*Login

**Endpoint:**
/api/auth/login

**Method:** POST

### \*Create a blog

**Endpoint:**
/api/blogs

**Method:** POST

### \*Update a blog

**Endpoint:**
/api/blogs/:id

**Method:** PATCH

### \*Delete a blog

**Endpoint:**
/api/blogs/:bikeID

**Method:** DELETE

### \*Get all blogs

**Endpoint:**
/api/blogs

**Method:** GET

### \*Admin Block a User

**Endpoint:**
/api/admin/users/:useId/block

**Method:** PATCH

### \*Admin Delete a blog

**Endpoint:**
/api/admin/blogs/:id

**Method:** DELETE
