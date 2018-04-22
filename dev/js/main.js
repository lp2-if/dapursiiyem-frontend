/*! [PROJECT_NAME] | Suitmedia */

((window, document, undefined) => {

    let api
    loadJSON('env.json').then(val => {
        api = `http://${val.target}/api/v1/`
    })

    const path = {
        css: `${myPrefix}assets/css/`,
        js : `${myPrefix}assets/js/vendor/`
    }

    const assets = {
        _objectFit      : `${path.js}object-fit-images.min.js`,
    }

    const Site = {
        enableActiveStateMobile() {
            if ( document.addEventListener ) {
                document.addEventListener('touchstart', () => {}, true)
            }
        },

        WPViewportFix() {
            if ( '-ms-user-select' in document.documentElement.style && navigator.userAgent.match(/IEMobile/) ) {
                let style = document.createElement('style')
                let fix = document.createTextNode('@-ms-viewport{width:auto!important}')

                style.appendChild(fix)
                document.head.appendChild(style)
            }
        },

        objectFitPolyfill() {
            load(assets._objectFit).then( () => {
                objectFitImages()
            })
        },

        angularModule() {
            angular.module('dapur-app', ['ngRoute', 'ngSanitize'])

            .controller('mainController', ['$scope', '$http', ($scope, $http) => {
                $scope.modalActive = false
                $scope.resepListActive = false
                $scope.isLoading = true
                $scope.resepList = []
                $scope.bahanSelected = []
                $scope.bahan = []


                $scope.modalTrigger = () => {
                    $scope.modalActive = !$scope.modalActive
                }

                $scope.resepTrigger = () => {
                    $scope.resepListActive = !$scope.resepListActive
                }

                $scope.isBahanEmpty = () => {
                    if ($scope.bahanSelected.length === 0)
                        return true
                }

                $scope.selectBahan = (itemId) => {
                    if ($scope.bahanSelected.filter(item => item == itemId).length === 0) {
                        $scope.bahanSelected.push(itemId)
                    } else {
                        $scope.bahanSelected = $scope.bahanSelected.filter(item => item !== itemId)
                    }
                    
                    $scope.bahan = $scope.bahan.map((curr, index) => {
                        if (curr.id === itemId) {
                            curr['selected'] = !curr['selected']
                        }
                        return curr
                    })
                    //console.log($scope.bahanSelected)
                }

                $scope.getResepList = () => {
                    $scope.isLoading = true
                    
                    $http.post(api + 'food', $scope.bahanSelected)
                    .then(res => {
                        $scope.isLoading = false
                        $scope.resepListActive = true
                        $scope.resepList = res.data.data
                        //console.log($scope.bahanSelected)
                    })
                    .catch(err => {
                        $scope.isLoading = false
                        alert('Error status: ' + err.status)
                        console.log(err)
                    })
                }
                
                $scope.loadBahan = () => {
                    $http.get(api + 'ingredient')
                    .then(res => {
                        $scope.isLoading = false
                        $scope.bahan = res.data.data.map(curr => {
                            let val = Object.assign({selected: false}, curr)
                            return val
                        })
                        //console.log($scope.bahan)
                    })
                    .catch(err => {
                        $scope.isLoading = false
                        alert('Error status: ' + err.status)
                        console.log(err)
                    })
                }

            }])


            .controller('resepController', ['$http', '$scope', '$routeParams', '$sce', ($http, $scope, $routeParams, $sce) => {
                $scope.idResep = $routeParams.id
                $scope.isLoading = true
                
                $http.get(api + 'food/' + $scope.idResep)
                    .then(res => {
                        $scope.isLoading = false
                        $scope.resep = res.data.data
                        // console.log($scope.resep)
                    })
                    .catch(err => {
                        $scope.isLoading = false
                        alert('Error status: ' + err.status)
                        console.log(err)
                    })
                    
            }])

            .controller('wikiController', ['$http', '$scope', '$sce', ($http, $scope, $routeParams, $sce) => {
                $scope.modalActive = false
                $scope.glossaryDetail = {
                    img: 'assets/img/logo-big.png',
                    title: 'Menumis',
                    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quae repudiandae provident consectetur laudantium, ea minus esse accusantium dolore magni, ab consequatur consequuntur eius temporibus nobis ut nihil saepe nisi? consectetur laudantium, ea minus esse accusantium.'
                }

                $scope.modalWikiTrigger = (title) => {
                    $scope.glossaryDetail.title = title
                    $scope.modalActive = !$scope.modalActive
                }
            }])

            .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
                $routeProvider
                .when('/', {
                    templateUrl: 'home.html',
                    controller: 'mainController'
                })
                .when('/resep/:id?', {
                    templateUrl: 'resep.html',
                    controller: 'resepController'
                })
                .otherwise({
                    redirectTo: '404.html'
                })
            }])
            
        }
    }

    Promise.all([
        
    ]).then(() => {
        for (let fn in Site) {
            Site[fn]()
        }
        window.Site = Site
    })

    function exist(selector) {
        return new Promise((resolve, reject) => {
            let $elem = $(selector)

            if ( $elem.length ) {
                resolve($elem)
            } else {
                reject(`no element found for ${selector}`)
            }
        })
    }

    function load(url) {
        return new Promise((resolve, reject) => {
            Modernizr.load({
                load: url,
                complete: resolve
            })
        })
    }

    function loadJSON(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then(res => {
                if ( res.ok ) {
                    resolve(res.json())
                } else {
                    reject('Network response not ok')
                }
            }).catch(e => {
                reject(e)
            })
        })
    }


})(window, document)
