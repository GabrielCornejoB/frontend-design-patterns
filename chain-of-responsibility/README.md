# Files Upload example

File uploading usually requires quite a bit of steps before sending them in requests or whatever your
application needs. You have to validate: size, name, type, etc... Because the HTML way is really flexible,
and it is better to guarantee that only files that follow our business logic are sent or processed.

That's why I think this is a really great scenario for this pattern. Here I am applying the following
validations/transformations to the submitted files:

1. Validate `FileList` is not `null`
2. Validate `FileList` is not empty
3. Transform native `FileList` object into a `File[]` for easier further manipulation
4. Validate the name of each file
5. Validate the extension of each file (it can be further validated)
6. Validate the size of each file
7. Add a timestamp to the name of each file

Kinda a lot of validations for just uploading some simple files, right?

## Structure

All the app logic is in the `app.component.ts` file, which listens to the input event changes and updates
the UI accordingly. All the file upload transformations can be found in the `files-upload/` folder, which has the
following files:

- `files-upload.handler.ts`: Contains the contract that each step of the chain (handler) has to follow. And also has some default behavior for when the chain ends.
- `files-upload-payload.model.ts`: Here is the "payload" or "request" that is sent to each handler. I created a custom class because I wanted to return an object with the properties `{result, error}`. But this is not part of the Chain of Responsibility pattern. You could just return the `FileList` object.
- `handlers/`: Folder containing all the specific handlers.
- `index.ts`: Builds the chain into the `FilesUpload` handler which establishes the order in which the validations/transformations will be executed.

## Pros & Cons

### Pros

- The chain of validation/transformation can be **re-ordered** depending on the necessity. It also can be created dynamically from requests or events.
- Mitigation to **really large functions** which multiple paths.
- **Easier testability** (even though in this example I didn't create any test, it would be way more organized because each handler could have its own test file). It also helps follow the **single responsibility principle**.
- The chain can be **extended easily** if new conditions or transformations need to be applied.

## Cons

- If the chain is relatively small then this would be an **over-kill** and would make the code larger unnecessarily.
- The resultant object needs to be the same type as the initial object (you could create a payload class which contains both objects, so you can have a different result).
- Not all requests are going to pass through all the steps of the chain.

## Run the project locally

The project is functional (well not really a project, more like an example), you first have to install the
dependencies with `npm install`, install angular (recommended, but I think that it is not necessary), and lastly
run the project with either `npm run start` or `ng serve`;

Any feedback will be gladly received 😁, just consider that maybe some of those validations aren't as rigorous
as they could be. Those are just examples to demonstrate the usage of this design pattern.
