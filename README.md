# Watson Developer Cloud - Boilerplates

Boilerplates for IBM Watson Services.  
 1. Personality Insights - Java
 2. Personality Insights - Nodejs  
![boilerplates](http://s17.postimg.org/bqcusezfj/Screen_Shot_2015_07_03_at_5_28_11_PM.png)


## Updading Boilerplates in Bluemix

This instructions will help you build and deploy boilerplates in bluemix. The boilerples are just Bluemix applications.  
Once they are running in Bluemix, you just need to use `cloud-cli` to register `metadata.json` files.

1. Install the [cf][cf] command-line tool. You need to have a [.cfignore](.cfignore)) file.
1. Install the [cloud-cli][cloud_cli] command-line tool.
1. Connect to Bluemix with cf:

    ```sh
    cf api https://ace.ng.bluemix.net
    ```

1. Log into Bluemix with cf:

    ```sh
    cf login -u ${username}
    cf target -o ${org} -s ${space}
    ```

1. Connect to Bluemix with cloud-cli:

    ```sh
    cloud-cli target https://ace.ng.bluemix.net
    ```

1. Log into Bluemix with cloud-cli:

    ```sh
    cloud-cli login
    ```
1. Compile the boilerplate code and generate the war package using ant.

    ```sh
    ant
    ```

1. Delete the existing boilerplates

    ```sh
    cf delete boilerplates-wps
    ```

1. Deploy your app:
    ```sh
    cf push boilerplates-wps -p build/boilerplates-wps.war
    ```

Make sure you are a developer in the space and organization where you want to push the app

1. Register each boilerplate by doing
    ```sh
    cloud-cli deregister-template "${boilerplate_name}"
    cloud-cli register-template "${boilerplate_name}" \
    -url "http://boilerplates-wps.stage1.mybluemix.net/${boilerplate_name}/metadata.json"
    ```

1. List the existing boilerplate templates
    ```sh
    cloud-cli templates
    ```

**Note:** It may take up to 15 minutes for Bluemix to update the boilerplates in the UI and back-end services.

### Files

The boilerplate sandobox application contains the following contents:

*   build/

    This WAR file is actually the application itself. It is the only file that'll be pushed to and run on the Bluemix cloud. Every time your application code is updated, you'll need to regenerate this WAR file and push to Bluemix again. See the next section on detailed steps.

*   app/

    This directory contains the the applications that will be expose as boilerplates. The content inside this directory is all you need to generate the boilerplate and include the metadata.js file.

*   build.xml

    This file allows you to easily build your application using Ant. It will generate a boilerplates-wps.war file based on the apps/ directory

*   create-dump-server.sh

	This file runs on UNIX and create a git repository that is needed by bluemix to recognize the app

*   web.xml

	This file is used in the boilerplates-wps.war

[cloud_cli]: https://www.stage1.ng.bluemix.net/docs/cli/cloudcli.html
[cf]: https://github.com/cloudfoundry/cli