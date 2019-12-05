# API data persistence with relational databases
## Ordering and limiting data in an SQL database query

tagged_headline: Ordering and limiting data in an SQL database query #sql #database #webdev #backend



In our previous article we have started introducing some database query done with the SQL language. 

To practice our skills we used a tool provided by W3 Schools, called
[Try SQL Tool](https://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all)

This tool provides a sample database with several tables and an interface to easily make SQL queries and pull up data inside a web browser.

Let's continue our exploration by finding out how to order data.

### Ordering data

Sometimes we need to retrieve data in a specific order. For this we use the ORDER BY operator:

```
SELECT * FROM Products ORDER BY price;
```

Here we retrieve all Products ordered by price. By default, the ordering is ascending (from small to large), but we can control the order with ASC or DESC (for ascending or descending):

```
SELECT * FROM Products ORDER BY price DESC;
```

We can also add multiple filter clauses in the same query. In the example below we first filter by price, which will limit our results, and then sort the filtered records in descending order by price: 

```
SELECT * FROM Products WHERE price > 50 ORDER BY price DESC;
```


### Limiting data

What if we want the 5 most expensive products?
One quick way of doing it is to order the products by price and then take the first 5 of them.

In this case, the LIMIT operator is our friend. It limits the returned record set by an arbitrary number:

```
SELECT * FROM Products ORDER BY price DESC LIMIT 5;
```

So far we have talked about reading data from existing database tables. But how do we insert data into a database?

In the next article we will show how to use SQL to add new data to a table. Stay tuned.
