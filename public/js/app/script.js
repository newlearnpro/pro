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
    var promise = language.getLang();
    promise.then(function(data) {
        $scope.language = data;
        $scope.loadPosition();
        $scope.loadLesson();
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
        });
    }
    $scope.editNumberLesson = function(number) {
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
        });
    }
    $scope.openClosePosition = function() {
        var position = $('.mainPosition div[data1^="' + this.items.id + '"]').children('div');
        position.slideToggle('fast');
    }
}]);

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
                    $('.mainPosition div[data2^="' + data[i].parent_id + '"]').appendTo(".mainPosition div[data1^='" + data[i].parent_id + "']").removeClass("position1").addClass("position2");
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
        $scope.src = this.items.src;
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






app.controller('personalpageGroup', ['$scope', '$http', 'language', function($scope, $http, language) {
    var promise = language.getLang();
    promise.then(function(data) {
        $scope.language = data;
        $scope.autoload();
        //  $scope.loadPosition();
    });
    var username = document.querySelector("#username").innerHTML;
    $scope.autoload = function() {
        $http({
            method: 'POST',
            url: '../main/user_personal_page',
            data: {
                'user': username
            }
        }).
        success(function(data) {
            $scope.user_page = data;
            //  console.log(data);
        });
    }

}]);

app.controller('sessionsCtrl', ['$scope', '$http', 'language', function($scope, $http, language) {
    var promise = language.getLang();
    promise.then(function(data) {
        $scope.language = data;
        $scope.autoload();
        //  $scope.loadPosition();
    });
    //   var username = document.querySelector("#username").innerHTML;
    $scope.autoload = function() {
        $http({
            method: 'GET',
            url: '../admin/sessions_info',
            /* data: {
                 'user': username
             }*/
        }).
        success(function(data) {
            var sessions = [];
            //     var ip_address = [];
            $scope.session_name = [];
            var iop_address = [];
            $scope.session_start_time = [];
            $scope.session_ip_address = [];

            for (let i = 0; i < data.length; i++) {
                sessions.push(data[i].data.split(';'));
                //   console.log(sessions[i][0]);
                var from = sessions[i][1].search('"');

                var to = sessions[i][1].length;
                var newstr = sessions[i][1].substring(from, to);



            }
            console.log(newstr)
                //   $scope.tt = $scope.session_name;
            $scope.session_name.push(newstr);

            /*   angular.forEach(data, function(value, key) {
                   sessions.push(value.data.split(';'));


                   var from = sessions[key][1].search('"');
                   var to = sessions[key][1].length;
                   var newstr = sessions[key][1].substring(from, to);
                   $scope.session_name.push(newstr);

                   iop_address.push(data[key].ip_address);
                   $scope.session_start_time.push(data[key].timestamp);


               });


               setTimeout(function() {
                   $scope.session_ip_address = iop_address
                   console.log($.type(iop_address));
                   if ($.type($scope.session_ip_address) == $.type(iop_address)) {
                       console.log('1')
                   } else {
                       console.log('0')
                   }
                   $scope.$apply();
               }, 500);*/
            //    for (var i = 0; i < iop_address.length; i++) {
            // $scope.session_ip_address.push(iop_address[data.length]);
            //  }
            //      $scope.$apply();
            //   }, 1500);
            /*setTimeout(function() {
                $scope.session_ip_address = ip_address;
                $scope.$apply();
            }, 500);*/

            //  console.log(data[i].ip_address);
            // console.log($scope.session_name);
            //   console.log($.type($scope.session_ip_address));

        });
    }

}]);