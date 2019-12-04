# API data persistence
## Introduction to relational databases and SQL queries

tagged_headline: Introducing relational databases and SQL queries #sql #database #webdev #backend



The concept of data persistence is central when developing an API.
When our application stops running and we start it up again we want the data managed by  our application to still be there, in the same state we have left it.

Data persistence can be achieved in different ways. In this article we will talk about one way of keeping data around using relational databases. 

In relational databases, the data is stored in tables, which means in a row and column format, where the columns represent properties on a particular object and the rows represent instances of that object with values for those properties.  

Think of a table as a spreadsheet, with rows and columns of data.

If you have to work with different objects, like Customers, Orders, Products, etc., those would be considered different tables.

Imagine you have to set up an order management system. You would have a table that represents Customers, for example, one customer for each row.
Each Customer would also have properties, like name, email address, telephone, etc. Each of the Customers table columns would represent one of these properties.

You would also have additional tables that represent other entities in the system, like Products, Orders, and so on. Columns in those tables would represent different properties on those objects.


### W3 Schools Try SQL Tool

When we query relational databases, or add data to them, we use a language called SQL. SQL is an acronym for Structured Query Language, and it's the standard language for relational database management systems.  

SQL is mostly standardized, but there are slightly different implementations for each database vendor, although the basic commands work pretty much the same everywhere.

One way to get familiar with SQL is to use the W3 Schools SQL Tool.
It's an environment that lets you use SQL to query a database with several fictitious tables already set up for practice.

You can access the tool here:

https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all.


### Sample queries

Let's use the tool to make a simple query. 
Our tool provides a table called Customers, with some sample data. Let's show all the rows and columns in this table.

```
SELECT * FROM Customers;
```

In this query, the * means "all", so it's like we are saying select all from the
table Customers. Notice that SQL statements are terminated with a semicolon.

This query will pull up all the customers in the table, and will also show the table headers. If this query is too broad and we want to reduce the amount of data we get back, we can always select only the columns we are interested in by specifying the exact column names we need.

This will pull up data from the CustomerName and Address columns only:

```
SELECT CustomerName, Address FROM Customers;
```

We can further limit the data by being even more specific in our selection by adding a filter with the operator WHERE. 

For example, we can select only customers that live in London with this query:

```
SELECT CustomerName, Address FROM Customers WHERE City = "London";
```

One thing to note in SQL is that it reads very much like the English language.
The query above can be worded like this:

```
Select customer name and address from the table Customers where the city is London.
```

Since SQL is a computer language, we can use typical constructs to make our filters even more targeted.

For example, we can use the != operator to signify "not equal" and the LIKE operator to matches substrings.

This next query shows an example:

```
SELECT CustomerName, Address FROM Customers where City != "London" AND
CustomerName LIKE "qu%";
```

This will select the following data:

```
CustomerName     Address
------------     --------------------------------- 
Que Delícia      Rua da Panificadora, 12
Queen            Cozinha Alameda dos Canàrios, 891
QUICK-Stop       Taucherstraße 10

---
```

Note that LIKE takes a string that starts with the characters we specify "qu" and can have any other characters after that (represented by the wildcard % symbol).
Also, LIKE is case-insensitive.

There's not better way to learn something than practice it, so I urge you to practice a few queries to get a hang of the language.

I will talk more about relational databases and SQL queries in following articles.




