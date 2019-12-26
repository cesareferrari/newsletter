# Joining database tables
## How to display records from different database tables with SQL

tagged_headline: Using SQL to display related data from two tables #database #sql #api #webdev #backend


In this article we'll introduce the concept of foreign keys in a database.
Let's look at an example in order to understand this concept.

In previous articles we played with SQL queries using something called "W3 Schools SQL Try It" tool, that we can find here: https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all

This tool provides us with a database and several tables, like Products, Customers, Categories, and so on, so we can try out different SQL queries and learn how to select and display records.

Let's select all records from the table Products:

```
SELECT * FROM Products;
```

This query brings up a bunch of Product records with several attributes, organized in columns:

[image fk1.png]

The first column, labeled ID, represents the primary key of this table. As we have seen before, the role of the primary key is to identify uniquely each record in a table. A primary key is typically a unique integer but it can be any value, as long as it's unique.

In the Products table, we also notice some descriptive columns like product name, units and price, specific to each product.

A couple of other columns are different, though. SupplierId and CategoryId only contain an integer, and as we can guess, they somehow refer to records inside other tables: Suppliers and Categories, respectively.

ID fields in the Products table, that refer to other tables are called foreign keys, because they refer to a separate (or foreign) entity.

### The role of foreign keys

But why do we even refer to other tables for this kind of information? After all, a supplier is specific to a product and its information could easily be stored inside the Products table, in a Supplier column.

Well, if each product had only one supplier, it would probably make sense to keep supplier data in one table. But typically, in the real world, several products may come from the same supplier, and we would have to enter the same supplier data in several records inside the Products table.

This means we would have the same, repeated information thoughout our database table. 
This is not a best practice. If our supplier changed address, we would have to update the address information in several places in our table, and this would not be very efficient if there are thousands of records.

By creating a separate table for Suppliers (and product Categories), we can have a better separation of concerns. The Suppliers table can have all the data it needs and can change it at any time. The Products table, on the other hand, is only concerned with the supplier id to find the supplier for its products, no matter what data the supplier keeps.


### Finding and displaying connected data

We have just seen that keeping data in separate but related tables has its advantages.  But, how do we access data in two different tables?

Let's say we want to display a list of products showing the supplier name next to each product. How can we find the right supplier for each product? 

This is where the concept of a multi-table query comes into play. We can collect data from different tables with a SQL statement called JOIN. Here's how we use it.

We know, by looking at our database schema, that the Products table has a column called ProductName and the Suppliers table has a column called SupplierName.

We also know that Products has a SupplierID column, that acts as a foreign key to join Products and Suppliers.

Based on this knowledge, We can write a statement that joins these two tables by the SupplierID column, with this syntax:


```
SELECT ProductName, SupplierName 
FROM Products 
JOIN Suppliers
ON Products.SupplierID = Suppliers.SupplierID;
```

Let's take a close look at what happened in the query above.

We first select the two columns we want displayed: ProductName and SupplierName.  Since these columns belong to two different tables we must specify which tables they come from. They come from Products and Suppliers, so we join the two tables, with the JOIN statement.

But we can't stop here. We also need to specify the conditions of the join, that is, we must tell SQL which column to use to join the tables.

Since we know that both table have a SupplierId column that contains the same key, we specify this condition after the ON statement on the last line. 

The expression Products.SupplierID means the SupplierID column of the Products table. In the same way, Suppliers.SupplierID means the SupplierID column of the Suppliers table.

The resulting SQL statement describes exactly which columns we want, which tables we need to connect (or join) and which columns in each table we want to use as the basis of the join.


These are the records pulled up by the query:

[image fk2.png]

