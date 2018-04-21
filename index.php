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
                    <a class="navbar-anchor is-active" href="index.php" >Resep</a>
                </li>
                <li class="navbar-item">
                    <a href="#!" class="navbar-anchor">
                        <div class="navbar-separator">&nbsp;</div>
                    </a>
                </li>
                <li class="navbar-item">
                    <a class="navbar-anchor" href="wiki.php">Wiki</a>
                </li>
                <!-- <li class="navbar-item">
                    <a href="#!" class="navbar-anchor navbar-item-right">Help</a>
                </li> -->
            </ul>
        </div>
    </nav>

    <main ng-controller="mainController">

        <div class="loading" ng-class="{'is-active': isLoading}">
            <i class="fa fa-spinner fa-pulse fa-3x"></i>
        </div>

        <div class="container">
            <img class="selector-img" src="assets/img/logo-big.png" alt="Dapur si iyem">
            <h1 class="text-center">Mau masak apa hari ini?</h1>
            <div class="text-center block">
                <span style="display:block"><strong>Aku punya...</strong></span>
                <span class="selector-input">
                    
                    <button class="btn selector-item" ng-repeat="item in bahan" ng-bind="item.title" ng-if="item.selected" ng-click="selectBahan(item.id)"></button>
                    <button class="selector-helper invisible">lala</button>
                    <button class="btn selector-add" ng-click="modalTrigger()">+</button>
                </span>
            </div>
            <div class="text-center">
                <button class="btn btn-primary" ng-click="getResepList()">Cari Resep</button>
            </div>
        </div>
        
        <div class="modal" ng-class="{'is-active': modalActive}">
            <div class="modal-header">
                <h2>Pilihan bahan</h2>
            </div>
            <div class="modal-body">
                <button class="btn selector-item" ng-repeat="item in bahan" ng-bind="item.title" ng-click="selectBahan(item.id)" ng-class="{'is-active': item.selected}"></button>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" ng-click="modalTrigger()">Tambah Bahan</button>
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
