# Store Actions example

Managing state in our applications sometimes can get quite messy, more in Angular in which we use RxJs which
can lead to very large chains of observables 🔗. So in scenarios where we have a few actions we may want to
separate responsibilities. And this pattern is great for that. For this example I have a very simple app
that uses the [JSON Placeholder API](https://jsonplaceholder.typicode.com/) and here we fetch, find, create &
delete posts 👨‍💻.

These seem like really simple actions, but in real world scenarios we just don't need to fetch the data, we
also may need to manage loading, logs, execute side effects, catch errors, etc... 🫠 So maybe at the beginning
it could be manageable but in the long run we will end with huge classes that would be very hard to extend,
refactor or fix in the future.

## Structure

As this is an angular application here we are using services and dependency injection, but realistically it
can be used without injecting stuff, it's just the ✨angular way✨. The important files to check out are the
following:

- `app.component`: Main component, has a reference of the **Invoker** which in our case is the `posts-store.service.`
- `posts-http.service`: Service which makes the HTTP calls to the API
- `posts-store.service`: Store service which contains the state & functions to modify it. Is the **Invoker**,
  and contains an instance of all the commands needed.
- `commands/`: Folder in which all the **commands** are. In this case our **commands** are actions.
- `posts.command`: Abstract class which contains the structure that all the posts commands should follow, also has
  some shared logic.

## Pros & Cons

### Pros

- Follows the **Single Responsibility** principle 1️⃣.
- Allows the **Separation of Concerns** ➗.
- Avoids having tons of files (in patterns like the one used in `@ngrx/store`) or having huge classes 🙃.
- Allows sharing common functions between commands 🃏.

### Cons

- If used incorrectly we could end up with a ton of repeated code .
- It may complicate some things if we define very strict abstract classes (example: the payload argument in the execute function).
- This pattern may be or not be flexible. Read the next section.

## The Pattern's flexibility

In the theory we need to define the commands as the **base class**, inside our invoker. But these removes a ton
of flexibility. We could just define the type as the class itself, and then we could abstract even more logic inside each command.
But this could also lead us to adding non-related logic in these classes, defeating the whole purpose of the pattern.

**Example:** If I have a confirmation pop-up before deleting something, I could add the logic to open the pop-up inside
the command, also the logic to close it and lastly the logic to **execute** the action. I could add these open(), close()
base functions to the base class but not all actions may need to open/close a pop-up. So it's kinda confusing.

Also, the `execute()` function in some cases may need an argument/payload. Like in a form for creating a resource, but in other cases
we may not need any payload at all, like when we want to fetch all the resources. So here we could use a type like the `unknown` in our
base class, but that would mean that when we want to call the execute command we will not have any type-checking.

A work-around this is to define the base command class with generics for these arguments, return types or anything we need in all of
our commands. But idk dear reader, this could also end up with a lot of generics which would look terrible 🤢.

Still, it's one of my favorite design patterns, but to use it we have to "flexibilize" 🤣 it a lot, which isn't bad, patterns
are not written in stone, we have to use them in our convenience. I also haven't found a scenario in which defining the commands as the base
class in the invoker could benefit in any way. Maybe if we want to interchange them based on a condition or something (that would actually
be so cool), so for the time being I am just using the base command class to follow a naming convention between my commands' functions 🤷‍♂️.

## Run the project locally

The project is functional (well not really a project, more like an example), you first have to install the
dependencies with `npm install`, install angular (recommended, but I think that it is not necessary), and lastly
run the project with either `npm run start` or `ng serve`;

Any feedback will be gladly received 😁, just consider that this example application may contain some bugs and
not all conditions may be handled. And this is because its purpose is not to be a whole application, just an
example of the use of this design pattern.
