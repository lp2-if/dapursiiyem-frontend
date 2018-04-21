/*! [PROJECT_NAME] | Suitmedia */

((window, document, undefined) => {

    const path = {
        css: `${myPrefix}assets/css/`,
        js : `${myPrefix}assets/js/vendor/`
    }

    const assets = {
        _objectFit      : `${path.js}object-fit-images.min.js`
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
            angular.module('dapur-app', [])

            .controller('mainController', ['$rootScope', '$scope', '$http', ($rootScope, $scope, $http) => {
                $scope.modalActive = false
                $scope.isLoading = false
                $scope.glossaryDetail = {
                    img: 'assets/img/logo.png',
                    title: 'Menumis',
                    desc: 'Menumis adalah lorem ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quae repudiandae provident consectetur laudantium, ea minus esse accusantium dolore magni, ab consequatur consequuntur eius temporibus nobis ut nihil saepe nisi?'
                }
                $scope.bahanSelected = []
                $scope.bahan = [
                    {
                        id: 1,
                        img: 'thumb1',
                        title: 'Ayam Boiler',
                        selected: false
                    },
                    {
                        id: 2,
                        img: 'thumb1',
                        title: 'Daging Sapi',
                        selected : false
                    },
                    {
                        id: 3,
                        img: 'thumb1',
                        title: 'Daging Babi',
                        selected : false
                    },
                    {
                        id: 4,
                        img: 'thumb1',
                        title: 'Telur Ayam',
                        selected : false
                    },
                    {
                        id: 5,
                        img: 'thumb1',
                        title: 'Tahu',
                        selected : false
                    },
                    {
                        id: 6,
                        img: 'thumb1',
                        title: 'Tempe',
                        selected : false
                    },
                    {
                        id: 7,
                        img: 'thumb1',
                        title: 'Ayam Kampung',
                        selected : false
                    }]

                
                $scope.modalTrigger = () => {
                    $scope.modalActive = !$scope.modalActive
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
                    console.log($scope.bahanSelected)
                }

                $scope.getResepList = () => {
                    $scope.isLoading = true
                    $http.post('http://10.151.254.201/api/v1/food/', $scope.bahanSelected)
                        .then(res => {
                            $scope.isLoading = false
                            console.log(res)
                        })
                        .catch(err => {
                            $scope.isLoading = false
                            alert('Error status:' + err.status)
                            console.log(err)
                        })
                }

            }])

            .filter('contains', function () {
                return function (array, needle) {
                    return array.indexOf(needle) >= 0;
                };
            });
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
