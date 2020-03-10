# Creating a virtual environment in Python

Like in many other languages, Python gives us the possibility to create an environment specific for each project we work on.

Why is this desirable?

If we run many different Python projects inside the same environment, there will be instances where dependencies for different projects will clash with each other and create many other problems.

By keeping each project isolated and create a virtual environment for each one of them, we avoid this problem

A virtual environment also helps if in the future we need to transfer one particular project to another machine. By specifying the exact library versions the project runs on, we can recreate the project on any machine exactly as it was specified originally.

Python 3 has a module called venv that can be used to create a virtual environment.

We first create a project directory that will contain all our files and libraries. Inside the project directory we can then use Python 3 to create the virtual environment by running this command:

```
python3 -m venv .venv
```

The -m flag calls the venv module as a script.

We then pass a directory name to the venv script, where the environment will be saved.
We name this directory .venv in this case, but it could be called anything. We prefer to prefix the directory name with a dot, so it won't be shown when we list the files in the project directory.

When we issue the command, the .venv directory will be created and it will include a configuration file called pyven.cfg pointing to the Python version that has created the environment.

The command also creates a bin subdirectory with a symlink to the Python binaries used when we call the python command.

To activate the virtual environment, we need to issue this command:

```
$ source .venv/bin/activate
```

We can verify the virtual environment is activated by looking at the modified prompt in our terminal window:

```
(.venv) $
```

If we now check which version of Phyton is active, we see that it's the version specified in the virtual environment:

```
which python
/.venv/bin/python
```

If we install or upgrade packages in the virtual environment, they will be installed only inside the virtual environment, and won't affect the default system Python, or any other projects.

To deactivate the virtual environment, we issue the `deactivate` command at the prompt, and we'll be taken to the regular system shell prompt.

```
(.venv) $ deactivate
$
```

If we need to remove the whole virtual environment from a project, we can just delete the .venv directory.

To show all the various options available to the venv command, we can call venv with the -h flag.

```
python3 -m venv -h
```

Now that we know how to create a brand new virtual environment we can use it to build awesome Python applications.
