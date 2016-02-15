/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var watson = require('watson-developer-cloud'),
  extend = require('util')._extend,
  fs     = require('fs');

console.log('Training...');

// load the environment variables
if (fs.existsSync('../.env.js')){
  console.log('Loading environment variables from .env.js');
  extend(process.env,require('../.env.js'));
}

var dialogFile = __dirname + '/dialog_id';
var classifierFile = __dirname + '/classifier_id';

var dialogTrainingFile = __dirname + '/dialog_and_classifier.xml';
var classifierTrainingFile = __dirname + '/classifier_training.csv';

var dialogService = watson.dialog({
  url: 'https://gateway.watsonplatform.net/dialog/api',
  username: 'USERNAME',
  password: 'PASSWORD',
  version: 'v1'
});

var classifierService = watson.natural_language_classifier({
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  username: 'USERNAME',
  password: 'PASSWORD',
  version: 'v1'
});

if (!fs.existsSync(dialogFile) || fs.readFileSync(dialogFile, 'utf8') === '') {
  dialogService.createDialog({
    name: 'movies-' + new Date().valueOf(),
    file: fs.createReadStream(dialogTrainingFile)
  }, function(err, dialog) {
    if (err) {
      console.log('Error creating the dialog, did you create the service?', err);
      process.exit(1);
    } else {
      fs.writeFileSync(dialogFile, dialog.dialog_id);
      console.log('   Dialog trained');
    }
  });
} else {
  console.log('   Dialog already trained');
}

if (!fs.existsSync(classifierFile) || fs.readFileSync(classifierFile, 'utf8') === '') {
  classifierService.create({
    language: 'en',
    name: 'movies-' + new Date().valueOf(),
    training_data: fs.createReadStream(classifierTrainingFile)
  }, function(err, classifier) {
    if (err) {
      console.log('Error creating the classifier, did you create the service?', err);
      process.exit(1);
    } else {
      fs.writeFileSync(classifierFile, classifier.classifier_id);
      console.log('   Classifier is being trained');
    }
  });
} else {
  console.log('   Natural Language Classifier already trained');
}
