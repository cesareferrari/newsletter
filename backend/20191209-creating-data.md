# API data persistence with relational databases
## Create, update and delete data with SQL

tagged_headline: How to create, update and delete data with SQL #sql #database #webdev #backend

cover_image: https://ferrariwebdevelopment.s3.us-east-2.amazonaws.com/assets/20191209-creating-data.jpeg



We have seen how to retrieve data from a database. Let's now look at how to create data.

The main command to remember is `INSERT`.

`INSERT` needs to know which table we are inserting data into.
Once it knows the table we are working with, it also needs to know which fields (or columns) we want to add data to, for that table.
So, we need to specify table, columns, and data that goes into the columns.

We include both column names and data into parenthesis, making sure that the values order matches the fields order.
Here's an example:

```
INSERT INTO Customers (CustomerName, ContactName, City) VALUES ('My Customer', 'John Smith', 'Los Angeles');
```

Note that even though tables typically have an `ID` field, we don't have to assign this `ID` ourselves. An `ID` is usually assigned automatically to a record by the database itself.

I say "*usually*" because, depending on how the database is set up, we might have to assign IDs ourselves, but most of the time we don't have to worry about `ID` fields.

### Updating data

Updating data means modify records that already exist in the database. This is the "*U*" in `CRUD` (Create, Read, Update, Delete).

The `SQL` command for updating records is `UPDATE`.

We follow the same pattern as creating data. We first specify the table we want to work with and then we describe how we want to update it using `SET`.

To find the record to update we use a `WHERE` clause in this example:

```
UPDATE Customers SET Address = "123 Main St." WHERE CustomerName = "My Customer";
```

What would happen if we didn't include a `WHERE` clause and specify records to find?

If we didn't find a particular record or records to update, the database would have assumed we wanted to update "*all*" the records.

This following statement sets the Address field for "*all*" customers to "123 Main St.", which is probably not what we want:

```
// Updates ALL the records!

UPDATE Customers SET Address = "123 Main St.";
```

### Deleting data

To complete our `CRUD` tour, we now shall see how to delete data. As you may imagine by now, deleting data is handled by the `DELETE` command.

As for updating, we need to first find the records to delete using some filtering clause, and then we apply `DELETE` to the resulting records.

```
DELETE FROM Customers WHERE CustomerId = 92;
```

### Query builders

We mentioned before that each database may implement the SQL language in a slightly different way.

This means that, if we are building an API that connects to a database, we would need to build queries that conform to that one specific database.

If we decided to use a different database later, we would then have to make changes to all our queries to reflect the SQL used in the new database.

This scenario is not ideal. As API builder we would rather not be involved with database implementation details, but concentrate more on our application business logic.

As it turns out, there are tools that abstract away specific database implementations, and let us concentrate on our application, knowing that the tools themselves will take care of creating the correct SQL query for each specific database we might use.

These tools are called query builders and we will look at them in following articles.