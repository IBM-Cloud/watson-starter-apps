# Conversational Agent: Movie Assistant [![Build Status](https://travis-ci.org/watson-developer-cloud/conversational-agent-application-starter-kit.svg?branch=master)](https://travis-ci.org/watson-developer-cloud/conversational-agent-application-starter-kit)

This application is an **Application Starter Kit** (ASK) that is
designed to get you up and running quickly with a common industry pattern, and to provide information about best practices around Watson services. This application was created to highlight the combination of the [Dialog][dialog] and [Natural Language Classifier][classifier] (NLC) services as a [Conversational Agent](#about-the-conversational-agent-pattern). This application can serve as the basis for your own applications that follow that pattern. Another application that demonstrates this pattern is the [What's in Theaters](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/gallery.html#whats-in-theaters) application that is available in the Watson Developer Cloud website's [Application Gallery](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/gallery.html).

Give it a try! Click the button below to fork the repository that contains the source code for this application into IBM DevOps Services, which then deploys your own copy of this application on Bluemix automatically:

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/watson-developer-cloud/conversational-agent-application-starter-kit)

You can see a version of this app that is already running by clicking
[here](https://conversational-agent-application-starter-kit.mybluemix.net/).

**IMPORTANT:**
  1. The application uses mock data for movie suggestions until you provide an API Key for [themoviedb.com](https://www.themoviedb.org/documentation/api) in your application's source code, which you can not do when using the **Deploy to Bluemix** button. See [step 10](#step10) in the [Getting Started](#getting-started) section for information about getting and using an API key in an application that you create and deploy manually.
  2. When the application is first run, it will automatically train a classifier for the Natural Language Classifier service. This process takes about 20 minutes. While the classifier is being trained, the user can only interact with the Dialog service.

## Table of Contents
  - [How this app works](#how-this-app-works)
  - [Getting Started](#getting-started)
  - [Running the application locally](#running-the-application-locally)
  - [About the Conversational Agent pattern](#about-the-conversational-agent-pattern)
    - [When to use this pattern](#when-to-use-this-pattern)
    - [Best practices](#best-practices)
    - [Reference information](#reference-information)
      - [Dialog](#dialog)
      - [Natural Language Classifier](#natural-language-classifier)
  - [User interface in this sample application](#user-interface-in-this-sample-application)
  - [Troubleshooting](#troubleshooting)

### How this app works

This app provides a conversational interface that lets users search for movies based on a set of criteria. The dialog system is built to understand natural language related to searching and selecting movies. For example, "I'd like to see a recent R rated drama" returns the names of all R-rated dramas that have been released in the last 30 days.

This application's dialog system also understands variations of text, which allows users to phrase their responses in many different ways. For example, the system might ask, "Do you want to watch an upcoming movie or one that's playing tonight?" The user can reply with "tonight" or "Show me movies playing currently," and the system understands that the user wants to know about current movies.

The conversation is designed to obtain three pieces of information before searching the movie repository:

* Recency: The system determines whether users want to know about currently playing movies or upcoming movies
* Genre: The system understands movie genres, such as action, comedy, and horror
* Rating: The system understands movie ratings, such as G, PG-13, and R

Users can search across all genres and ratings by answering "no" to the corresponding questions.

## Getting started
The application is written in [Node.js](http://nodejs.org/) and uses [npm](https://www.npmjs.com/).  Instructions for downloading and installing these are included in the following procedure.

**Important:** If you used the `Deploy to Bluemix` button to deploy an instance of this application to Bluemix automatically, you will have to delete that application and the services that it used before you can build and deploy an application manually. You can use the `cf apps` command to see the instances of the Dialog and NLC services that your application uses, use the `cf delete application-name` command to delete the application, and use the `cf delete-services service-name` command to delete each of the Dialog and NLC service instance that the application used.

The following instructions explain how to [fork the project on GitHub](https://help.github.com/articles/fork-a-repo/) and push that fork to Bluemix using the `cf` command-line interface (CLI) for Cloud Foundry. If you want to run the application locally, see the next section, [Running the application locally](#running-the-application-locally):

  1. Log into GitHub and fork the project repository. Clone your fork to a folder on your local system and change to that folder.

  2. Create a Bluemix account. [Sign up][sign_up] in Bluemix or use an existing account. Watson services in beta are free to use, as are GA services in the standard plan below a certain usage threshold.

  3. If it is not already installed on your system, download and install the [Cloud-foundry CLI][cloud_foundry] tool.

  4. If it is not already installed on your system, install [Node.js](http://nodejs.org/). Installing Node.js will also install the `npm` command.  Make sure to use node version ```4.2.1``` as specified in ```package.json``` or you may run into problems like installation issues.

  5. If it is not already installed on your system, install Python from your system's repository or from the [Python.org site](https://www.python.org/downloads/release/python-2711/).

  <a name="step6"></a>
  6. Edit the `manifest.yml` file in the folder that contains your fork and replace `application-name` with a unique name for your copy of the application. The name that you specify determines the application's URL, such as `application-name.mybluemix.net`. The relevant portion of the `manifest.yml` file looks like the following:

    ```yml
    applications:
    - services:
      - dialog-service
      - classifier-service
      name: application-name
      command: npm start
      path: .
      memory: 512M
    ```

  7. Connect to Bluemix by running the following commands in a terminal window:

    ```sh
    $ cf api https://api.ng.bluemix.net
    $ cf login -u <your-Bluemix-ID> -p <your-Bluemix-password>
    ```

  8. Create an instance of the Dialog service in Bluemix by running the following command:

    ```sh
    $ cf create-service dialog standard dialog-service
    ```
    **Note:** You will see a message that states "Attention: The plan `standard` of service `dialog` is not free.  The instance `dialog-service` will incur a cost.  Contact your administrator if you think this is in error.". The first 1000 API calls per month to the Dialog service are free under the standard plan, so there will be no charge if you remain below this limit.

   9. Create an instance of the Natural Language Classifier service in Bluemix by running the following command:

    ```sh
    $ cf create-service natural_language_classifier standard classifier-service
    ```
    **Note:** You will see a message that states "Attention: The plan `standard` of service `natural_language_classifier` is not free.  The instance `classifier-service` will incur a cost.  Contact your administrator if you think this is in error.". The first NLC instance that you create is free under the standard plan, so there will be no change if you only create a single classifier instance for use by this application.

  <a name="step10"></a>
  10. Sign up at [themoviedb.com][the_movie_db] and get an [API key][the_movie_db_api_key].

  11. Add the API key from [themoviedb.com][the_movie_db] to the app by editing the line 29 of the file `api/services.js` to read:

    ```js
    var TMDB_API_KEY = process.env.TMDB_API_KEY || <Your themoviedb.com API Key>;
  	```
  12. Push the updated application live by running the following command:

    ```sh
    $ cf push
    ```

The first time it runs, the application can take up to 20 minutes to train the classifier based on data from [themoviedb.com][the_movie_db]. It will also create the following files in your source directory:

  * A dialog flow using: `training/dialog_and_classifier.xml` and writes the dialog id to the file `/training/dialog_id`
  * A classifier using: `training/classifier_training.csv` and writes classifier id to the file `/training/classifier_id`

You should not need to reference these, but if you do, you can retrieve these ids at `application-name.mybluemix.net/api/services`, where `application-name` is the name that you gave your application in [step 6](#step6) of the previous list. The response will be similar to:

```json
{
  "dialog_id": "24045716-d5cc-4748-afed-a4ea0287b737",
  "classifier_id": "563C46x19-nlc-3140"
}
```

## Running the application locally

First, make sure that you followed steps 1 through 11 in the [previous section](#getting-started) and that you are still logged in to Bluemix. Next:

  1. Create a `.env.js` file in the root directory of the project with the following content:

  ```js
  module.exports = {
  TMDB_API_KEY: 'TMDB API KEY HERE',
  VCAP_SERVICES: JSON.stringify({
    dialog: [{
      credentials: {
        url: 'https://gateway.watsonplatform.net/dialog/api',
        username: 'DIALOG USERNAME HERE',
        password: 'DIALOG PASSWORD HERE'
      }
    }],
    natural_language_classifier: [{
      credentials: {
        url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
        username: 'NATURAL LANGUAGE CLASSIFIER USERNAME HERE',
        password: 'NATURAL LANGUAGE CLASSIFIER PASSWORD HERE'
      }
    }]
  })
  };
  ```

  2. Copy the `username`, `password`, and `url` credentials from your `dialog-service` and `classifier-service` services in Bluemix to the previous file. To see the service credentials for each of your service instances, run the following command, replacing `<application-name>` with the name of the application that you specified in your `manifest.yml` file:

    ```sh
    $ cf env <application-name>
    ```
   Your output should contain a section like the following:

    ```sh
    System-Provided:
    {
    "VCAP_SERVICES": {
      "dialog": [{
        "credentials": {
          "url": "<url>",
          "password": "<password>",
          "username": "<username>"
        },
        "label": "dialog",
        "name": "dialog-service",
        "plan": "standard"
     }]
    }
    }
    ```

  3. Install any dependencies that a local version of your application requires:

    ```sh
    $ npm install
    ```

  4. Install Gulp globally if not already

    ```sh
    $ npm install -g gulp
    ```

  5. Start the application by running:

    ```sh
    $ gulp
    ```
  6. Open [http://localhost:5000](http://localhost:5000) to see the running application.

## About the Conversational Agent pattern

First, make sure you read the [Reference Information](#reference-information) to understand the services that are involved in this pattern. This reference information will explain common terminology for these services such as `classifier`, `confidence scores`, `intents`, `training`, and so on.

The following image shows a flow diagram for a Conversational Agent using the Natural Language Classifier and the Dialog service:
<p align="center">
  <img src="docs/demo_architecture.png"/>
</p>

### Using the Dialog service and the Natural Language Classifier service

Since the Dialog service uses expert rules to match user inputs to intents, the service typically has high accuracy. The Natural Language Classifier service is a statistical system that yields high recall.  The combination of the Dialog and Natural Language Classifier services therefore creates a high precision, high accuracy system.

For a given input, a trained Natural Language Classifier responds with a list of intent classes and the corresponding confidence scores. Dialog only uses the top two classes to decide how to proceed with the conversation. The following checks are performed by the Dialog service:

 * The USER_INTENT from the Classifier service is considered valid when class(0).confidence >= upper_confidence_threshold.
 * Ask user to confirm the USER_INTENT when upper_confidence_threshold >= class(0).confidence > lower_confidence_threshold.
 * Ask user to disambiguate between USER_INTENT(0) and USER_INTENT(1) when class(0).confidence + class(1).confidence > upper_confidence_threshold.
 * Reply with the default response when none of the previous checks are true.

In this case, class(0) is the top class and class(0).confidence is its confidence score. Similarly, class(1) is the second best class with class(1).confidence being its confidence score. In these checks, upper_confidence_threshold and lower_confidence_threshold are floats 0 - 1, and their values are obtained by running cross-validation tests with the classifier on a given data set.

---

When creating an application based on the conversational pattern, you should first understand what the user is trying to do. Is he looking up an actor? Is she searching for upcoming movies? Is she simply looking to have small talk with Watson? We call these the user's *Intent*. To extract the user intent from the user input, we train the Watson Natural Language Classifier using various examples of possible user requests. The service then uses deep machine learning techniques to return the top predicted classes.

Here is an example of what we will use to train the classifier:

    Who directed The Hobbit, LookupDirectors
    Who starred in The Hobbit, LookupActors
    Drama, SearchMovies
    I'd like to see a recent drama, SearchMovies
    Show me whats playing, SearchMovies
    Something sexy, SearchMovies
    Good day, ClosingTalk
    Hi, OpeningTalk
    Who is the producer of Vacation?,LookupDirectors
    Help,RepairTalk
    Robert,GiveName
    I want to look up movie stars,LookupActors

Next, we need to acquire any additional information that is required to complete the user's request. To do this, we rely on the Dialog service. The Dialog service tracks and stores information obtained during the conversation until we have all the information required to complete the task.  In the case of this application, it's searching for a movie, an actor, or a director.

### When to use this pattern
 * You need to perform a task that requires user input and you want to mimic a conversation
 * You want to provide a conversation experience like Siri or Cortana

### Some best practices
 * When using the Natural Language Classifier, there should be approximately 10 classes.  Each class should have 15 examples of possible user inputs. This provides the service with enough information to build the deep machine learning model that will classify future user inputs.
 * When using the Dialog service, define different opening sentences in the dialog flow (.xml file). This will prevent repetitive conversations where the dialog always asks the same questions.

### Reference information
The following links provide more information about the Dialog and Natural Language Classifier services, including tutorials on using those services:

#### Dialog

* [API documentation](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/dialog/): Get an in-depth knowledge of the Dialog service
* [API reference](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/dialog/api/v1/): SDK code examples and reference
* [API explorer](https://watson-api-explorer.mybluemix.net/apis/dialog-v1): Try out the REST API
* [Creating your own dialog](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/dialog/tutorial_advanced.shtml): Design your own dialog by working through a tutorial
* [Natural conversation tutorial](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/ega_docs/dialog_ega.shtml#naturalconvo_design): Advance tutorial on how to create a conversion like the one in this sample application

#### Natural Language Classifier

* [API documentation](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/nl-classifier/): Get an in-depth knowledge of the Natural Language Classifier service
* [API reference](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/natural-language-classifier/api/v1/): SDK code examples and reference
* [API Explorer](https://watson-api-explorer.mybluemix.net/apis/natural-language-classifier-v1): Try out the API
* [Creating your own classifier](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/nl-classifier/get_start.shtml): How to use the API to create and use your own classifier
* [Understanding how Dialog uses the output from the Natural Language Classifier](http://heidloff.net/article/cognitive-question-answer-systems-bluemix-watson)

## User interface in this sample application

The user interface that this sample application provides is intended as an example, and is not proposed as the user interface for your applications. However, if you want to use this user interface, you will want to modify the following files:

* `ui/modules/home.html` - Contains the values in the footer that is displayed on the landing page. By default, these are IBM-specific values because they are used in the running instance of this sample application. For example, the Terms and Conditions do not apply to your use of the source code, to which the [Apache license](#license) applies.
* `ui/modules/dialog.html` - Contains the values in the footer that are displayed on conversation pages. By default, these are IBM-specific values because they are used in the running instance of this sample application. For example, the Terms and Conditions do not apply to your use of the source code, to which the [Apache license](#license) applies
* `ui/styles/main.css` - Identifies the graphics files that are displayed on the landing and conversation pages
* `ui/images/Header_web_home.svg` - Contains the graphic that is displayed by default on the landing page on standard web clients
* `ui/images/Header_web_chat.svg` - Contains the graphic that is displayed by default on conversation pages on standard web clients
* `ui/images/Header_mobile_home.svg` - Contains the graphic that is displayed by default on the landing page on mobile devices
* `ui/images/Header_mobile_chat.svg` - Contains the graphic that is displayed by default on conversation pages on mobile devices

## Troubleshooting

When troubleshooting your Bluemix app, the most useful source of information is the execution logs. To see them, run:

  ```sh
  $ cf logs <application-name> --recent
  ```

## Open Source @ IBM
  Find more open source projects on the [IBM GitHub Page](http://ibm.github.io/)

### License

  This sample code is licensed under the Apache 2.0 license. Full license text is available in [LICENSE](LICENSE).

### Contributing

  See [CONTRIBUTING](CONTRIBUTING.md).


[cloud_foundry]: https://github.com/cloudfoundry/cli
[sign_up]:https://console.ng.bluemix.net/registration/
[dialog]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/dialog.html
[classifier]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/nl-classifier.html
[the_movie_db]: https://www.themoviedb.org/account/signup
[the_movie_db_api_key]: https://www.themoviedb.org/documentation/api
