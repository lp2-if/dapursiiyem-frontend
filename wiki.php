<!doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <meta name="description" content="Baze is a front-end starter template">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">

    <meta property="og:url" content="">
    <meta property="og:title" content="">
    <meta property="og:site_name" content="">
    <meta property="og:description" content="">
    <meta property="og:image" content="">
    <meta property="og:type" content="website">
    <meta property="fb:app_id" content="">

    <meta name="twitter:card" content="">
    <meta name="twitter:site" content="">
    <meta name="twitter:description" content="">
    <meta name="twitter:title" content="">
    <meta name="twitter:image" content="">

    <link rel="apple-touch-icon" href="assets/img/apple-icon.png">
    <link rel="icon" type="image/png" href="assets/img/favicon.png">

    <title>Dapur si Iyem - Mau masak apa hari ini?</title>

    <link rel="stylesheet" href="assets/css/main.css">
    <script src="assets/js/vendor/modernizr.min.js"></script>
</head>
<body ng-app="dapur-app">
    <!--[if lt IE 9]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <nav class="navbar">
        <div class="container">
            <ul class="navbar-list list-nostyle">
                <!-- <li class="navbar-item">
                    <a href="#!" class="navbar-anchor navbar-item-left">Home</a>
                </li> -->
                <li class="navbar-item">
                    <a class="navbar-anchor" href="index.php" >Resep</a>
                </li>
                <li class="navbar-item">
                    <a href="#!" class="navbar-anchor">
                        <div class="navbar-separator">&nbsp;</div>
                    </a>
                </li>
                <li class="navbar-item">
                    <a class="navbar-anchor is-active" href="wiki.php">Wiki</a>
                </li>
                <!-- <li class="navbar-item">
                    <a href="#!" class="navbar-anchor navbar-item-right">Help</a>
                </li> -->
            </ul>
        </div>
    </nav>

    <main ng-controller="mainController">

        <div class="container">
            <img class="glossary-title-img" src="assets/img/banner-istilah-masak.jpg" alt="Istilah memasak">
            <button class="btn" ng-click="modalTrigger()">menumis</button>
        </div>
        
        <div class="modal" ng-class="{'is-active': modalActive}">
            <div class="modal-header">
                <h2 ng-bind="glossaryDetail.title"></h2>
            </div>
            <div class="modal-body">
                <img class="glossary-img" ng-src="{{glossaryDetail.img}}"></img>
                <p ng-bind="glossaryDetail.desc"></p>
            </div>
            <button class="modal-exit btn" ng-click="modalTrigger()">&times;</button>
        </div>

    </main>

    <script>window.myPrefix = '';</script>
    <script src="assets/js/vendor/jquery.min.js"></script>
    <script src="assets/js/vendor/angular.min.js"></script>
    <script src="https://cdn.polyfill.io/v2/polyfill.js?features=default,promise,fetch"></script>
    <script src="assets/js/main.min.js"></script>
</body>
</html>
