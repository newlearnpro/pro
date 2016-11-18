app.directive('usersTable', function($http) {
    return {
        restrict: 'EA',
        //  scope: {},
        replace: true,
        link: function(scope, element, attrs, ctrl) {
            $http({
                method: 'POST',
                url: '../admin/users_info',
                // data: {
                //     'users': "username"
                // }
            }).
            success(function(data) {
                scope.users = data;
            });
        },
        templateUrl: '../../public/partials/templates/users_tmpl.html'
    }
});

app.controller('contactsCtrl', function($scope, $http) {
    $scope.recipient = '';
    $scope.selectUser = function(param) {
        $scope.recipient = param;
        // console.log($("#lang_am").text())
        var username = document.querySelector("#username").innerHTML;
        var data = {
            'sender': username,
            'recipient': $scope.recipient,
        };
        // setInterval(function() {
        $http({
            method: 'POST',
            url: '../main/load_message',
            data: {
                'message_box': data
            }
        }).
        success(function(data) {
            var list = document.querySelector("#list")
            while (list.hasChildNodes()) {
                list.removeChild(list.lastChild);
            }

            for (var i = 0; i < data.length; i++) {
                var div = document.createElement('option');
                // div.className = "alert alert-success";
                div.innerHTML = data[i].sender + " : " + data[i].message;
                document.querySelector("#list").appendChild(div);
            }


        });
        //}, 5000);
    }
    $scope.sendMessage = function() {
        var message_text = document.querySelector("#message_text").value;
        var username = document.querySelector("#username").innerHTML;
        var div = document.createElement('div');
        var data = {
            'sender': username,
            'recipient': $scope.recipient,
            'message': message_text
        };
        $http({
            method: 'POST',
            url: '../main/send_message',
            data: {
                'message_box': data
            }
        }).
        success(function(data) {
            $scope.selectUser($scope.recipient);
            // message_text = "";
            $("#message_text").val("");
        });
    }
});


app.controller('usersCtrl', function($scope, $http, $q, language) {
    var promise = language.getLang();
    promise.then(function(data) {
        $scope.language = data;
    });
    $scope.selectUser = function(param) {
        $http({
            method: 'POST',
            url: '../admin/load_position',
        }).success(function(data) {
            $scope.position = data;
            //  console.log(data);
            //  $scope.userField = data[0];
            //   console.log(data);
        });
        $http({
            method: 'POST',
            url: '../admin/users_info',
            data: {
                'users': param
            }
        }).
        success(function(data) {
            $scope.userField = data[0];
            //console.log($scope.userField);

        });
    }
    $scope.editUser = function() {
        $http({
            method: 'POST',
            url: '../admin/users_change',
            data: {
                'edit_user': {
                    login: $scope.userField.username,
                    username: document.querySelector("#userName").value,
                    first_name: document.querySelector("#firstName").value,
                    //  last_name: document.querySelector("#lastName").value,
                    position: document.querySelector("#position").firstElementChild.getAttribute("ng-selected")

                }
            }
        }).
        success(function(data) {

        });
    }
});


app.directive('positionGroup', function($http, $q, $timeout, language) {
    return {
        restrict: 'EA',
        replace: true,
        //template: "<div></input type='button' value='bebe'/></div>",
        //scope: {},
        link: function(scope, element, attrs, ctrl) {
            var promise = language.getLang();
            promise.then(function(data) {
                scope.language = data;
                scope.loadPosition(scope, element);
                scope.loadLesson(scope, element);
                // scope.createPosition(scope, element);
            });
            scope.loadPosition = function() {
                $http({
                    method: 'GET',
                    url: 'load_position',

                }).
                success(function(data, status) {
                    scope.position = data;
                    setTimeout(function() {
                        for (var i = 0; i < data.length; i++) {
                            $('.mainPosition div[data2^="' + data[i].parent_id + '"]').appendTo(".mainPosition div[data1^='" + data[i].parent_id + "']").removeClass("position1").addClass("position2");
                        }
                        for (var j = 0; j < data.length; j++) {
                            if ($('.mainPosition div').children('div').has('div')[j]) {
                                $('.mainPosition div').children('div').has('div').children('.remove').css('display', 'none');
                            }
                        }
                    }, 10);
                });
            }
            scope.loadLesson = function() {
                $http({
                    method: 'POST',
                    url: 'load_lesson',

                }).
                success(function(data, status) {
                    //   console.log(data);
                    //    scope.position = data;
                    setTimeout(function() {
                        for (var i = 0; i < data.length; i++) {
                            //      console.log($('.mainPosition div[data1^="' + data[i].parent_id + '"]'))
                            $('.mainPosition div[data1^="' + data[i].parent_id + '"]').append('<div><a class="lesson_type_' + data[i].type_id + '">' + data[i].name + '</a></div>');
                        }
                        /*
                        for (var j = 0; j < data.length; j++) {
                            if ($('.mainPosition div').children('div').has('div')[j]) {
                                $('.mainPosition div').children('div').has('div').children('.remove').css('display', 'none');
                            }
                        }*/
                    }, 100);
                });
            }
            scope.createPosition = function() {
                var arr = [];
                var position_name = document.querySelector('#position_name').value;
                var x = document.querySelector("#position").selectedIndex;
                var parent_id = document.getElementsByTagName("option")[x].getAttribute("ng-selected");

                arr.push(position_name);
                $http({
                    method: 'POST',
                    url: 'create_position',
                    data: {
                        'position': arr,
                        'parent_id': parent_id
                    }
                }).
                success(function(data) {
                    scope.loadPosition();
                });
            }
            scope.editPosition = function() {
                $http({
                    method: 'POST',
                    url: '../admin/edit_position',
                    data: {
                        'id': this.items.id,
                        'position': $('.mainPosition div[data1^="' + this.items.id + '"]').children('input').val()
                    }
                }).success(function(data) {
                    scope.loadPosition();
                });
                // console.log($('.mainPosition div[data1^="' + this.items.id + '"]').children().val())
            }
            scope.removePosition = function() {
                $http({
                    method: 'POST',
                    url: '../admin/remove_position',
                    data: {
                        'id': this.items.id
                    }
                }).success(function(data) {
                    scope.loadPosition();
                    //console.log(data);
                });
            }
            scope.addPosition = function(index) {
                // console.log(this.$index);

                //  console.log(index);
                //  console.log(document.querySelector('#addpos').parentNode.indexOf(0))

                var nodeList = document.querySelectorAll('.addpos');

                //  element = nodeList[index];
                // var index = Array.prototype.indexOf.call(nodeList, element);


                //element.after('<div><input id="pos_text" type="text" /><button id="pos_add">OK</button></div>');
                element.after("<input />");
            }

            scope.openClosePosition = function() {
                /*console.log($('.mainPosition div[data1^="' + this.items.id + '"]').children('span').text())
                    //   $('.mainPosition div[data1^="' + this.items.id + '"]').children().toggle();
                if ($('.mainPosition div[data1^="' + this.items.id + '"]').children('span').text() == "+") {
                    $('.mainPosition div[data1^="' + this.items.id + '"]').children().hide();
                } else {
                    $('.mainPosition div[data1^="' + this.items.id + '"]').children().show();
                }*/
            }

        }
    }
});



app.controller('classCtrl', function($scope, $http, $q, language) {
    /*var promise = language.getLang();
    promise.then(function(data) {
        $scope.language = data;
    });




    $http({
        method: 'POST',
        url: '../admin/users_info',

    }).
    success(function(data) {
        $scope.userField = data[0];
        //console.log($scope.userField);

    });*/


});









app.directive('listGroup', function($http, $q, $timeout, language) {
    return {
        restrict: 'EA',
        replace: true,
        template: "<div></input type='button' value='bebe'/></div>",
        //scope: {},
        link: function(scope, element, attrs, ctrl) {
            var promise = language.getLang();
            promise.then(function(data) {
                scope.language = data;
                scope.loadPosition(scope, element);

            });
            scope.loadPosition = function() {
                $http({
                    method: 'GET',
                    url: 'load_position',

                }).
                success(function(data, status) {
                    scope.position = data;
                    setTimeout(function() {
                        for (var i = 0; i < data.length; i++) {
                            $('.mainPosition div[data2^="' + data[i].parent_id + '"]').appendTo(".mainPosition div[data1^='" + data[i].parent_id + "']").removeClass("position1").addClass("position2");
                        }
                    }, 10);
                });
            }
            scope.getClass = function() {
                $http({
                    method: 'POST',
                    url: 'load_lesson',
                    data: {
                        'id': this.items.id
                    }
                }).
                success(function(data, status) {
                    //   console.log(data);
                    scope.lessons = data;
                });
            }
            scope.getLessons = function(focus, blur) {
                $http({
                    method: 'POST',
                    url: 'get_lessons',
                }).
                success(function(data, status) {
                    if (focus === true) {
                        scope.searchLessons = data;
                    } else if (blur === true) {
                        scope.searchLessons = "";
                    }

                });
            }
            scope.loadPage = function() {
                //   console.log(this.items.src);
                scope.src = this.items.src;
                // element.after("<iframe  scrolling='auto'  src='../../uploads/" + this.items.src + "/index.html' width='800' height='600' align='left'></iframe>");
                // $(".mainPage").empty().append("<iframe  scrolling='auto'  src='../../uploads/" + this.items.src + "/index.html' width='800' height='600' align='left'></iframe>");
                $("iframe").attr('src', '../../uploads/' + this.items.src + '/index.html');
            }
            scope.openClosePosition = function() {
                /*console.log($('.mainPosition div[data1^="' + this.items.id + '"]').children('span').text())
                    //   $('.mainPosition div[data1^="' + this.items.id + '"]').children().toggle();
                if ($('.mainPosition div[data1^="' + this.items.id + '"]').children('span').text() == "+") {
                    $('.mainPosition div[data1^="' + this.items.id + '"]').children().hide();
                } else {
                    $('.mainPosition div[data1^="' + this.items.id + '"]').children().show();
                }*/
            }

        }
    }
});







app.controller('uploader', ['$scope', '$http', function($scope, $http) {

}]);