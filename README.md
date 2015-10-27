# Watson Starter Apps
This repository contains the Watson starter apps listed in the Bluemix Catalog.

Started apps included in this repository:
 * Personality Insights - Java
 * Personality Insights - Nodejs  

![starter apps](http://s17.postimg.org/bqcusezfj/Screen_Shot_2015_07_03_at_5_28_11_PM.png)


## Updading starter apps in Bluemix

This instructions will help you build and deploy starter apps in bluemix. The boilerples are just Bluemix applications.  
Once they are running in Bluemix, you just need to use `cloud-cli` to register `metadata.json` files.

1. Install the [cf][cf] command-line tool. You need to have a [.cfignore](.cfignore)) file.
1. Install the cloud-cli command-line tool.
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
1. Compile the starter app code and generate the war package using ant.

    ```sh
    ant
    ```

1. Deploy your app:
    ```sh
    cf push starter-apps-wps -p build/watson-starter-apps-{date}.war
    ```
    Where `{date}` is the current date as `yyyy-MM-dd`  
    Make sure you are a developer in the space and organization where you want to push the app

1. Register each starter app by doing
    ```sh
    cloud-cli deregister-template "${starterapp-name}"
    cloud-cli register-template "${starter-app-name}" \
    -url "http://starter-apps-wps.mybluemix.net/${starter-app-name}/metadata.json"
    ```

1. List the existing starter app templates
    ```sh
    cloud-cli templates
    ```

**Note:** It may take up to 15 minutes for Bluemix to update the starter apps in the UI and back-end services.

### Files

The starter app sandobox application contains the following contents:

*   build/

    This WAR file is actually the application itself. It is the only file that'll be pushed to and run on the Bluemix cloud. Every time your application code is updated, you'll need to regenerate this WAR file and push to Bluemix again. See the next section on detailed steps.

*   app/

    This directory contains the the applications that will be expose as starter apps. The content inside this directory is all you need to generate the starter app and include the metadata.js file.

*   build.xml

    This file allows you to easily build your application using Ant. It will generate a starter apps-wps.war file based on the apps/ directory

*   create-dump-server.sh

	This file runs on UNIX and create a git repository that is needed by bluemix to recognize the app

*   web.xml

	This file is used in the starter apps-wps.war

[cf]: https://github.com/cloudfoundry/cli
