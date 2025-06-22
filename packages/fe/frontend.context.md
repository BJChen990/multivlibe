# Pages

The frontend project has the following pages:

## Repository

### List repositories page

URL: `/repositories`

List all the configured repositories in the project from the repository service, allowing user to add, edit, and delete repositories. The page should also allow user to select a repository to view its details.

By clicking on the "Add Repository" button, user will be redirected to the "Add Repository" page, which should be added later in a
separate PR.
Clicking on any repository will redirect user to the "Repository Details" page, which should be added later in a separate PR.

### Add repository page

URL: `/repositories/add`

Page for setting up the new repository, with the following fields:

- Repository URL: URL of the repository to be added.
- Repository Name: Optional name for the repository, otherwise the URL will be used as the name.
- Credentials: Optional credentials for the repository, if required. This can be a username and password or a token, depending on the repository type.

## Instances

### Instances overview page

URL: `/instances`

Displays all cloned instances grouped under their repository. Each group lists the repository name with its associated instances, or states that no instances exist for the repository.
Each instance entry displays its location and whether it is reserved for the user or currently occupied by a task.

