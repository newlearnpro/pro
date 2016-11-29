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
                //   console.log(data);
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
            // console.log('f');

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

app.controller('positionGroup', ['$scope', '$http', '$q', '$timeout', 'language', function($scope, $http, $q, $timeout, language) {
    //app.directive('positionGroup', function($http, $q, $timeout, language) {


    //template: "<div></input type='button' value='bebe'/></div>",
    //scope: {},

    var promise = language.getLang();
    promise.then(function(data) {

        $scope.language = data;
        $scope.loadPosition();
        $scope.loadLesson();

        // scope.createPosition(scope, element);
    });
    $scope.loadPosition = function() {
        $http({
            method: 'GET',
            url: 'load_position',

        }).
        success(function(data, status) {
            $scope.position = data;
            setTimeout(function() {
                for (var i = 0; i < data.length; i++) {
                    $('.position_item[data2^="' + data[i].parent_id + '"]').appendTo(".mainPosition div[data1^='" + data[i].parent_id + "']").removeClass("position1").addClass("position2");
                }
                for (var j = 0; j < data.length; j++) {
                    if ($('.mainPosition div').children('div').has('div')[j]) {
                        $('.mainPosition div').children('div').has('div').children('.remove').css('display', 'none');
                    }
                }
            }, 10);
        });
    }
    $scope.loadLesson = function() {
        $http({
            method: 'POST',
            url: 'load_lesson',

        }).
        success(function(data, status) {
            $scope.lesson = data;
            setTimeout(function() {
                for (var i = 0; i < data.length; i++) {
                    $('.lesson_item[data2^="' + data[i].parent_id + '"]').appendTo(".position_item[data1^='" + data[i].parent_id + "']");
                }
            }, 100);
        });
    }
    $scope.createPosition = function() {
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
            $scope.loadPosition();
            $scope.loadLesson();
        });
    }
    $scope.editPosition = function() {
        $http({
            method: 'POST',
            url: '../admin/edit_position',
            data: {
                'id': this.items.id,
                'position': $('.mainPosition div[data1^="' + this.items.id + '"]').children('input').val()
            }
        }).success(function(data) {
            $scope.loadPosition();
            $scope.loadLesson();
        });
        // console.log($('.mainPosition div[data1^="' + this.items.id + '"]').children().val())
    }
    $scope.removePosition = function() {
        $http({
            method: 'POST',
            url: '../admin/remove_position',
            data: {
                'id': this.items.id
            }
        }).success(function(data) {
            $scope.loadPosition();
            $scope.loadLesson();
            //console.log(data);
        });
    }
    $scope.editNumberLesson = function(number) {

        //  number += 3;
        //  console.log(this$$phase);
        //console.log(this.$$nextSibling);

        var number = $('.lesson_item[data1^="' + this.items.id + '"]').find('input').val();


        $http({
            method: 'POST',
            url: '../admin/edit_number_lesson',
            data: {
                'id': this.items.id,
                'number': number
            }
        }).success(function(data) {
            $scope.loadPosition();
            $scope.loadLesson();
            // scope.loadPosition();
            //console.log(data);
        });

    }
    $scope.removeLesson = function() {
        $http({
            method: 'POST',
            url: '../admin/remove_lesson',
            data: {
                'id': this.items.id,
                'src': this.items.src
            }
        }).success(function(data) {
            $scope.loadPosition();
            $scope.loadLesson();
            // scope.loadPosition();
            //console.log(data);
        });
    }

    $scope.openClosePosition = function() {
        /*console.log($('.mainPosition div[data1^="' + this.items.id + '"]').children('span').text())
            //   $('.mainPosition div[data1^="' + this.items.id + '"]').children().toggle();
        if ($('.mainPosition div[data1^="' + this.items.id + '"]').children('span').text() == "+") {
            $('.mainPosition div[data1^="' + this.items.id + '"]').children().hide();
        } else {
            $('.mainPosition div[data1^="' + this.items.id + '"]').children().show();
        }*/
    }



}]);



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








/*
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

            }

        }
    }
});
*/
app.controller('listGroup', ['$scope', '$http', '$q', '$timeout', 'language', function($scope, $http, $q, $timeout, language) {
    var promise = language.getLang();
    promise.then(function(data) {
        $scope.language = data;
        $scope.loadPosition();
    });

    $scope.loadPosition = function() {
        $("#glu").css({
            'width': $('.mainPage').width(),
            'height': parseInt($('.mainPage').width()) / 1.4
        });
        $http({
            method: 'GET',
            url: 'load_position',

        }).
        success(function(data, status) {
            $scope.position = data;
            setTimeout(function() {
                for (var i = 0; i < data.length; i++) {
                    $('.mainPosition div[data2^="' + data[i].parent_id + '"]').appendTo(".mainPosition div[data1^='" + data[i].parent_id + "']").css('display', 'none').removeClass("position1").addClass("position2");
                }
            }, 10);
        });
    }
    $scope.getClass = function() {
        var position = $('.mainPosition div[data1^="' + this.items.id + '"]').children('div');
        position.slideToggle('fast');
        if (!position.parent().attr('openFolder')) {
            position.parent().children('a').css('color', '#ff0000');
            position.parent().attr('openFolder', 'yes');
        } else {
            position.parent().children('a').css('color', '#333333');
            position.parent().attr('openFolder', '');
        }

        $http({
            method: 'POST',
            url: 'load_lesson',
            data: {
                'id': this.items.id
            }
        }).success(function(data, status) {
            $scope.lessons = data;
        });
    }
    $scope.getLessons = function(focus, blur) {
        $http({
            method: 'POST',
            url: 'get_lessons',
        }).
        success(function(data, status) {
            if (focus === true) {
                $scope.searchLessons = data;
            } else if (blur === true) {
                $scope.searchLessons = "";
            }

        });
    }
    $scope.loadPage = function() {
        //   console.log(this.items.src);
        $scope.src = this.items.src;
        // element.after("<iframe  scrolling='auto'  src='../../uploads/" + this.items.src + "/index.html' width='800' height='600' align='left'></iframe>");
        // $(".mainPage").empty().append("<iframe  scrolling='auto'  src='../../uploads/" + this.items.src + "/index.html' width='800' height='600' align='left'></iframe>");
        $("#pagePlayer").css({
            'width': '100%',
            'height': parseInt($('#pagePlayer').css('width')) / 1.33,
            'maxWidth': '1000px'
        }).attr('src', '../../uploads/' + this.items.src + '/index.html');
        $(window).resize(function() {
            $("#pagePlayer").css({
                'width': '100%',
                'height': parseInt($('#pagePlayer').css('width')) / 1.33,
                'maxWidth': '1000px'
            });
        });
    }
    $scope.openClosePosition = function() {
        // console.log('fg');
        /*console.log($('.mainPosition div[data1^="' + this.items.id + '"]').children('span').text())
            //   $('.mainPosition div[data1^="' + this.items.id + '"]').children().toggle();
        if ($('.mainPosition div[data1^="' + this.items.id + '"]').children('span').text() == "+") {
            $('.mainPosition div[data1^="' + this.items.id + '"]').children().hide();
        } else {
            $('.mainPosition div[data1^="' + this.items.id + '"]').children().show();
        }*/
    }
    $scope.resizeIframe = function() {

        if ($('#pagePlayer').hasClass('resizePlayer')) {
            $('#fullPage').show();
            $('#pagePlayer, #learnpro_logo').appendTo('.mainPage');
            $('#pagePlayer').removeClass('resizePlayer');
            $("#pagePlayer").css({
                'width': '100%',
                'height': parseInt($('#pagePlayer').css('width')) / 1.33,
                'maxWidth': '1000px'
            });
            $(window).resize(function() {
                $("#pagePlayer").css({
                    'width': '100%',
                    'height': parseInt($('#pagePlayer').css('width')) / 1.33,
                    'maxWidth': '1000px'
                });
            });

        } else {
            $('#pagePlayer').addClass('resizePlayer');
            $('.resizePlayer, #learnpro_logo').appendTo('#fullIframe');
            $('#fullPage').hide();
            $(".resizePlayer").css({
                'width': '100%',
                'height': $(window).height() - 8,
                'maxWidth': '100%'
            });
            $(window).resize(function() {
                $(".resizePlayer").css({
                    'width': '100%',
                    'height': $(window).height() - 8,
                    'maxWidth': '100%'
                });
            });
        }
    }


}]);






app.controller('uploader', ['$scope', '$http', function($scope, $http) {

}]);