# Please write frequently used commands in git with example

Sure, here are some frequently used Git commands along with examples:

1. **Initialize a Repository:**
   ```bash
   git init
   ```
   Initialize a new Git repository in the current directory.

2. **Clone a Repository:**
   ```bash
   git clone <repository-url>
   ```
   Clone a remote repository to your local machine. For example:
   ```bash
   git clone https://github.com/user/repo.git
   ```

3. **Add Files to Staging Area:**
   ```bash
   git add <file1> <file2> ...
   ```
   Stage specific files for the next commit.

4. **Commit Changes:**
   ```bash
   git commit -m "Your commit message"
   ```
   Commit staged changes with a descriptive message.

5. **Check Status:**
   ```bash
   git status
   ```
   View the status of your working directory and staging area.

6. **View Commit History:**
   ```bash
   git log
   ```
   Display the commit history.

7. **Create a New Branch:**
   ```bash
   git branch <branch-name>
   ```
   Create a new branch at the current commit.

8. **Switch Branches:**
   ```bash
   git checkout <branch-name>
   ```
   Switch to the specified branch.

9. **Merge Branches:**
   ```bash
   git merge <branch-name>
   ```
   Merge changes from `<branch-name>` into the current branch.

10. **Pull Changes from Remote Repository:**
    ```bash
    git pull
    ```
    Fetch and merge changes from the remote repository to your local repository.

11. **Push Changes to Remote Repository:**
    ```bash
    git push
    ```
    Push committed changes from your local repository to the remote repository.

12. **Fetch Changes from Remote Repository:**
    ```bash
    git fetch
    ```
    Download objects and refs from another repository.

13. **Discard Changes in Working Directory:**
    ```bash
    git checkout -- <file>
    ```
    Discard changes in the working directory for a specific file.

14. **Undo Last Commit:**
    ```bash
    git reset --soft HEAD~1
    ```
    Undo the last commit, keeping changes in the staging area.

15. **Stash Changes:**
    ```bash
    git stash
    ```
    Temporarily store changes in a stash.

These are just a few of the many Git commands available. Each command has various options and use cases, so it's beneficial to explore the Git documentation or use `git --help` for more information on each command.

Certainly! Here are a few more Git commands along with examples:

16. **View Remote Repositories:**
    ```bash
    git remote -v
    ```
    Display the names and URLs of remote repositories.

17. **Add Remote Repository:**
    ```bash
    git remote add <name> <url>
    ```
    Add a new remote repository with the specified name and URL.

18. **Remove Remote Repository:**
    ```bash
    git remote remove <name>
    ```
    Remove the remote repository with the specified name.

19. **Rename a Branch:**
    ```bash
    git branch -m <old-name> <new-name>
    ```
    Rename the current branch from `<old-name>` to `<new-name>`.

20. **Delete a Branch:**
    ```bash
    git branch -d <branch-name>
    ```
    Delete the specified branch. Use `-D` to force delete.

21. **Create and Checkout New Branch:**
    ```bash
    git checkout -b <branch-name>
    ```
    Create a new branch with the specified name and switch to it.

22. **Show Differences Between Branches:**
    ```bash
    git diff <branch1> <branch2>
    ```
    Show the differences between two branches.

23. **Show Changes in a Specific Commit:**
    ```bash
    git show <commit-hash>
    ```
    Display the changes introduced by the specified commit.

24. **Amend the Last Commit:**
    ```bash
    git commit --amend
    ```
    Modify the last commit (for example, to add forgotten files or update the commit message).

25. **Reset Staging Area to Last Commit:**
    ```bash
    git reset HEAD
    ```
    Unstage all changes in the staging area.

26. **Revert Changes Introduced by a Commit:**
    ```bash
    git revert <commit-hash>
    ```
    Create a new commit that undoes the changes introduced by the specified commit.

27. **List Stashes:**
    ```bash
    git stash list
    ```
    List all stashes in the repository.

28. **Apply a Stash:**
    ```bash
    git stash apply <stash-name>
    ```
    Apply changes from the specified stash.

29. **Clean Untracked Files:**
    ```bash
    git clean -n
    ```
    Preview untracked files to be deleted.
    ```bash
    git clean -f
    ```
    Delete untracked files from the working directory.

30. **Find Where a Commit is Referenced:**
    ```bash
    git branch --contains <commit-hash>
    ```
    List all branches containing the specified commit.

These commands cover various scenarios and operations commonly performed in Git. Experimenting with these commands in a safe environment can help you become more proficient with Git.


# git rename branch command

To rename a branch in Git, you can use the following commands:

```bash
# Rename the local branch
git branch -m <old-branch-name> <new-branch-name>

# Push the renamed branch to the remote repository
git push origin -u <new-branch-name>
```

Replace `<old-branch-name>` with the current name of the branch you want to rename, and `<new-branch-name>` with the new name you want to give to the branch.

After renaming the local branch, you need to push the changes to the remote repository. The `-u` option is used to set up a tracking relationship between the local and remote branch. This allows you to use `git push` and `git pull` without specifying the branch name and remote.

Keep in mind that renaming a branch might affect collaborators if they have the old branch name in their local repositories. It's a good practice to communicate such changes with your team to avoid confusion.

Note: If you're renaming the branch you are currently on, you may encounter an error. In that case, switch to a different branch first, then perform the renaming.


# git cherry-pick commnad

The `git cherry-pick` command is used to apply changes from a specific commit on one branch to another branch. It takes the changes introduced by the given commit and applies them as a new commit on the current branch. Here's the basic syntax:

```bash
git cherry-pick <commit-hash>
```

Replace `<commit-hash>` with the hash of the commit you want to apply. You can find the commit hash by using `git log`.

Here are a few additional options and considerations:

- **Cherry-pick a Range of Commits:**
  ```bash
  git cherry-pick <start-commit>^..<end-commit>
  ```
  This applies all commits from `start-commit` to `end-commit` (excluding `start-commit` itself).

- **Cherry-pick into a Specific Branch:**
  ```bash
  git cherry-pick <commit-hash> -e <branch-name>
  ```
  This applies the changes to the specified branch instead of the current branch.

- **Interactive Mode:**
  ```bash
  git cherry-pick -i <commit-hash>
  ```
  This opens the commit in interactive mode, allowing you to edit the commit message and choose which changes to apply.

- **Cherry-pick with a Different Parent:**
  ```bash
  git cherry-pick -x <commit-hash>
  ```
  This appends a line to the commit message indicating the original commit's hash, which can be useful for reference.

- **Cherry-pick and Preserve the Original Committer:**
  ```bash
  git cherry-pick --signoff <commit-hash>
  ```
  This adds a "Signed-off-by" line to the commit message, preserving the original author's information.

Remember that conflicts might occur during the cherry-pick process, especially if the changes in the commit being picked conflict with changes in the target branch. In such cases, you will need to resolve the conflicts manually.

Always be cautious when using `git cherry-pick`, especially on shared branches, as it introduces new commits and can alter the commit history. Communicate with your team before applying changes in this way.


