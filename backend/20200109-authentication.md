# Introduction to API Authentication
## Why it's important to always hash your passwords 

In this article we'll talk about API authentication and why it's important to hash a password before saving it to a database.

As you know, if we stored plain text passwords in a database they would be available for anyone to see and use for all sorts of nefarious purposes.

It's very important, from a security standpoint, that all passwords stored in a database be encrypted in a way that makes them difficult or nearly impossible to guess.

Usually, this is achieved by sending the password string entered by a user during registration through an algorithm that generates a hash from the password.
A hash is a seemingly random combination of letters and numbers that is considered hard to decrypt by a potential attacker.

We can see an example of how hashing works using an online tool like Passwords Generator https://passwordsgenerator.net/sha256-hash-generator/

If we enter a password in this tool, it generates a hash using the SHA256 algorithm and shows what the hashed string would look like.

[image]

For example, if we enter the string "password" we would get this hash:

```
5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8
```

If we enter the string "password1" we would get a totally different hash:

```
0B14D501A594442A01C6859541BCB3E8164D183D32937B851835442F69D5C94E
```

No matter how long our input string is, we always get a hash of the same length, that always corresponds to the inputted password.

### Hashes by themselves are not that secure, though

At first sight, it may seem that hashing a string is a very secure way to encrypt a password, but this is not always true.

Of course, hashing is better than using a plain text string.

But the problem is that since any particular string, no matter how complex or long it is, always generates the same exact hash, hackers have over time compiled tables of hashes and their corresponding un-hashed strings, called rainbow tables.

When hackers get access to a hashed password, they look up the hash in the rainbow table and often they are able to find the corresponding plain text string.

We can test this out by ourselves with a tool like https://crackstation.net/

If we enter the hash of "password1" that we have encrypted above, Crack Station easily finds out that not only it corresponds to the string "password1", but also the type of hash we have used (SHA256).

Even if I am using the hash of a less obvious password, like "redturtles", it still gets found out immediately by Crack Station.

[image]

### Salts

One way to sidestep this problem is to use what is called a "salt" when hashing a password.

A salt is a string known only to the server that introduces an element of randomness to the password hashing mechanism.

When the server encrypts a password with a tool like bcrypt, it adds a "salt" to the hashed password, and re-hashes the whole thing several more times.

This generates a more secure hash in the end, that hopefully is very hard for a hacker to decrypt.

We'll stop here for now. In future articles we'll show how to create an authentication system that uses the bcrypt library to hash passwords.

