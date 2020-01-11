# Hashed password format
## How a password hashed with bcryptjs is stored in the database

tagged_headline: How a hashed password is stored #bcrypt #express #api #webdev #backend



In the previous article we learned how to use the bcryptjs Node module in an Express application in order to encrypt the password entered by a user on registration.

After applying the bcrypt.hashSync() method in this way:

```
bcrypt.hashSync(userData.password, 10);
```

this is what was saved to the database:

```
password: $2a$10$roDcAEvy5dk3L4dvGQNnK.XUJLdloNbuRVh6PmgKpOHhF1fctny3G
```

### Hash string format

It turns out that this saved string is not just a random jumbled string of characters. 
bcryptjs actually creates a hashed password in a very specific format. Let's learn a little bit more about it.

You may notice dollar symbols ($) inside the string:

```
$2a$10$roDcAEvy5dk3L4dvGQNnK.XUJLdloNbuRVh6PmgKpOHhF1fctny3G
^  ^  ^
```

These $ symbols separate the string into three parts.

The first part (2a), is the version of bcrypt that was used to hash this string.

The second part (10) is the number of rounds we specified as a second parameter to hashSync(). 

If you remember from the previous article, this number is the exponent in a formula that indicates how many times the password needs to be re-hashed. 10 tells bcryptjs to re-hash the hash "2 at the power of 10" times.

The next part of the string, the 22 bits after the last $ symbol, is the random salt used by bcryptjs when hashing the password.

```
$2a$10$roDcAEvy5dk3L4dvGQNnK.XUJLdloNbuRVh6PmgKpOHhF1fctny3G
       ^^^^^^^^^^^^^^^^^^^^^^ 
```

Wouldn't this be a security flaw, though? What if a potential hacker accesses the database and learns what the salt is?

It turns out it's OK if a potential hacker knows the salt, because you need to know both the salt and the original password in order to recreate the actual hash. A potential hacker wouldn't know the original password if all they got was the hash stored in the database.

The role of the salt is to add something extra to the password before it gets hashed.

The user and the server know two different pieces of information that need to be combined to work appropriately. It's kind of having two separate keys that need to be turned together when opening a door. If you only turn one key or the other, but not both at the same time, the door won't open.

The user knows the original password, and the server knows the salt. It's only by combining those two separate pieces of information, and by running them through the hashing algorithm, that it's possible to create the hashed password.

### Verifying the password

But what happens when the user comes back, and re-enters the password into the system? How does bcrypt verify that the password is correct?

When bcryptjs needs to verify that the entered password is correct, it goes through a process of taking the password entered, applying the salt (taken from the string saved in the database), re-hashing a number of times specified again in the string saved in the database, and comparing the last part of the saved string to the result of the hashing process. 

If the two final strings match, it means that the password was entered correctly, because there's no way two different passwords generate the same hash, like we have demonstrated in the previous article.

In the next article we'll see exactly how to validate a password using bcryptjs in our application.
