#! /usr/bin/env node
'use strict';

var server = require('./app');
var port = process.env.PORT || process.env.VCAP_APP_PORT || port;
var port = process.env.VCAP_APP_PORT || 3000;
server.listen(port);
