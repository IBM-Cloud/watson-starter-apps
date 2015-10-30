# How to contribute

Third-party/individual patches are crucial for keeping our starter apps up to
date and current.  We need you to help! We want to keep it as easy as possible
to contribute changes. There are a few guidelines that we need contributors to
follow so that we can have a chance of keeping on top of things.

## Patch vs new starter app

What is the difference between a patch and a new starter app?

A patch is basically a fix to one of the existing starter app's.  It could be
a CSS, Javascript, HTML, dependency, or etc patch.  It doesn't really matter
what it is as its not a new starter app.

A new starter app is a new application that demonstrates a particular service
or language in Bluemix.  It could be something as simple as a starter app for
Erlang or something really complicated that uses 5 services.  The sky is really
limitless here.

So step 1 is decided if you are contributing a patch or a new starter app

## Getting Started

* Make sure you have a [GitHub account](https://github.com/signup/free)
* Submit a ticket for your issue, assuming one does not already exist.
  * Clearly describe the issue including steps to reproduce when it is a bug.
  * Make sure you fill in the earliest version that you know has the issue.
* Fork the repository on GitHub

## Making Changes

* Fork the project
* Create a topic branch from where you want to base your work.
  * This is usually the master branch.
  * Only target release branches if you are certain your fix must be on that
    branch.
  * To quickly create a topic branch based on master; `git checkout -b
    fix/master/my_contribution master`. Please avoid working directly on the
    `master` branch.
* Make commits of logical units.
* Check for unnecessary whitespace with `git diff --check` before committing.
* Make sure your commit messages are in the proper format.

````
    Insert short and precise description of your change

    Insert link to issue that you opened here

    Describe the patch or new application here
````

* Make sure you have tested your change!

## Creating a new starter app

Please open an issue first before starting work on a new starter app.  The
IBM Bluemix Developer Advocate team would like to review your suggestion
before you start your work.

## Checklist for getting your new app accepted
* Following the [naming convention](quickstart.md#naming-convention)
* Add a relative link to [README.MD](README.MD) in alphabetical order to your
new start app in the repo
* Create a [`metadata.json`](quickstart.md#app-metdata) for your new start app


## Submitting Changes

* Push your changes to a topic branch in your fork of the repository.
* Submit a pull request to the repository in the puppet labs organization.
* The dev advocate team looks at Pull Requests on a regular basis in a weekly triage
  meeting that we hold in a public Google Hangout.
* After feedback has been given we expect responses within two weeks. After two
  weeks we may close the pull request if it isn't showing any activity.
