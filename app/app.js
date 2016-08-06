// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import env from './env';
var app = remote.app;
const {dialog} = require('electron').remote
import handlebars from 'handlebars'
var appDir = jetpack.cwd(app.getAppPath());

import * as FileUploadBinder      from './ui-binders/file_upload_binder';
import * as TabBinder             from './ui-binders/tab_binder';
import * as FileSearchBinder      from './ui-binders/file_search_binder';
import * as TagViewerBinder       from './ui-binders/tag_viewer_binder';
import * as FileOperationBinder   from './ui-binders/file_operation_binder';


TabBinder.init()
FileUploadBinder.init()
FileSearchBinder.init()
TagViewerBinder.init()
FileOperationBinder.init()
//
// let source   = $("#search_results_file_list_template").html();
// let template = handlebars.compile(source);
// let context = {files: [
//                     {id:5, name: "hola",  path: "asd/asd", tags: ["asd","asd2"]}
//               ]}
// console.log("contexto:")
// console.log(context)
// let html    = template(context);
// $("#search_results_file_list").append(html)
