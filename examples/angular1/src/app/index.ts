import Bootstrap = require('bootstrap/dist/css/bootstrap.css');
//import StarRatingIcons = require('angular-star-rating/dist/assets/images/star-rating.icons.svg');
const bootstrap = Bootstrap;

import 'angular';
import * as angular from 'angular';

import 'angular-ui-router';
import * as uiRouter from "angular-ui-router";

import angularStars = require('angular1-star-rating/dist/index.js');
const angularStars = angularStars;

import svg from "angular1-star-rating/dist/assets/images/star-rating.icons.svg";

const svg = svg;

import {initPage} from "./components/init/index";
import {singlePage} from "./components/single/index";

angular.module('app',
      [
            "star-rating"
          , "ui.router"
          , initPage
          , singlePage
      ])
    .config(($urlRouterProvider) => {
        $urlRouterProvider.otherwise('single');
    });