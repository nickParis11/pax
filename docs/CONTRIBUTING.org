* Overview
This project uses a linear history workflow, i.e., /rebase/ instead of /merge/.

* Style Guide
This project uses the Airbnb style guide. Refer to: https://github.com/airbnb/javascript.

* Build
TravisCI runs tests on all pull requests.

Merged requests are deployed via the pax-ci microservice. Please visit: https://github.com/pax-atlantica/pax-ci.

* Definitions
|----------+--------------------------|
| TERM     | REPO                     |
|----------+--------------------------|
| Upstream | pax/pax                  |
| Origin   | your github/pax          |
| Local    | Local files in git.      |
|----------+--------------------------|

* Workflow
** 1. Update the local master branch.
#+BEGIN_SRC bash
git checkout master
git pull --rebase upstream master
#+END_SRC

** 2. Create a new feature-branch, or check out an existing one. 
#+BEGIN_SRC bash
git checkout -b feature-branch-name
#+END_SRC

** 3. Edit your code, commit and pull from upstream/master regularly.
#+BEGIN_SRC bash
git status
git add
git commit
#+END_SRC

** 4. Make sure you are still up-to-date with master before pushing. 
#+BEGIN_SRC bash
git pull --rebase upstream master
#+END_SRC

** 5. Push your branch to github.
*RUN ESLINT BEFORE PUSHING*

#+BEGIN_SRC bash
git push origin feature-branch
#+END_SRC

** 6. Make a pull request on github.
*FOLLOW GIT COMMIT MESSAGE GUIDELINES FOR YOUR PULL REQUEST*
Title should have a Prefix + Explanation.
Use the imperative tense.

*** Rejected
If your pull request was rejected, return to step 3.

*** Merged
Update your local master branch, then your github master branch.
#+BEGIN_SRC bash
git checkout master
git pull --rebase upstream master
git push origin master -f
#+END_SRC

* Git Commit Style

|----------+-----------------------------------------------+-----------------------------------|
| Prefix   | Explanation                                   | Example                           |
|----------+-----------------------------------------------+-----------------------------------|
| Add      | Create a capability                           | feature, test, dependency         |
| Bump     | Increase the version of something             | dependency                        |
| Cut      | Remove a capability                           | feature, test, dependency         |
| Document | Refactor of documentation                     | help files                        |
| Fix      | Fix an issue                                  | bug, typo, accident, misstatement |
| Make     | Change the build process, tooling, or infra   |                                   |
| Optimize | Refactor of performance                       | speed up code                     |
| Refactor | A code change that MUST be just a refactoring |                                   |
| Reformat | Refactor of formatting                        | omit whitespace                   |
| Start    | Begin doing something                         | create a feature flag             |
| Stop     | End doing something                           | remove a feature flag             |
|----------+-----------------------------------------------+-----------------------------------|

* Git Resources
[[https://chris.beams.io/posts/git-commit/][How to Write a Git Commit Message]], Chris Beams
[[https://github.com/k88hudson/git-flight-rules][Git Flight Rules]]
