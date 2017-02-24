/**************directives***************************/
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

app.directive('positionTable', function($http, $timeout) {
    return {
        restrict: 'EA',
        //scope: {},
        replace: true,
        link: function(scope, element, attrs, ctrl) {
            $http({
                method: 'GET',
                url: 'load_position'
            }).
            success(function(data, status) {
                scope.position = data;
                $timeout(function() {
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
        },
        templateUrl: '../../public/partials/templates/position_tmpl.html'
    }
});
/*end**************directives***************************/






app.controller('headerCtrl', ['$scope', function($scope) {
    $scope.nail = function() {
        $('#nail').toggleClass('on').toggleClass('off');
        if (this.isNailed == undefined) {
            $('header').css({
                'position': 'fixed',
                'top': 0,
                'opacity': 0.9
            });
            $('.blockHead').addClass('mrgTop');
            this.isNailed = true;
        } else {
            $('header').css({
                'position': 'relative',
                'opacity': 1
            });
            $('.blockHead').removeClass('mrgTop');
            this.isNailed = undefined;
        }
    }
}]);

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
            //    console.log(data)
            var list = document.querySelector("#list"),
                options = {
                    // weekday: 'long',
                    month: 'numeric',
                    year: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                },
                intlDate = new Intl.DateTimeFormat(undefined, options);
            while (list.hasChildNodes()) {
                list.removeChild(list.lastChild);
            }

            for (var i = 0; i < data.length; i++) {

                //   p.push(data[i].sender + " : " + data[i].message + "   " + intlDate.format(new Date(1000 * data[i].timestamp)) + '\n');
                //  p[i] = data[i].sender + " : " + data[i].message + "   " + intlDate.format(new Date(1000 * data[i].timestamp)) + '\n';
                // console.log(data[i].sender + " : " + data[i].message + "   " + intlDate.format(new Date(1000 * data[i].timestamp)))

                var div = document.createElement('option');

                div.innerHTML = data[i].sender + " : " + data[i].message + "   " + intlDate.format(new Date(1000 * data[i].timestamp));
                document.querySelector("#list").appendChild(div);
            }
        }).
        error(function(data) {
            //  console.log(data);
            alert('Տվյալների բազան գոյություն չունի');
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
            //  console.log(data);
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
                    // username: document.querySelector("#userName").value,
                    first_name: document.querySelector("#firstName").value,
                    last_name: document.querySelector("#lastName").value,
                    activation: document.querySelector("#activation").value,
                    //  last_name: document.querySelector("#lastName").value,
                    //     position: document.querySelector("#position").firstElementChild.getAttribute("ng-selected")

                }
            }
        }).
        success(function(data) {

        });
    }

    $scope.licenseMounth = 1;
    $scope.$watch('licenseMounth', function(newValue, oldValue) {
        $scope.licenseMounth_newValue = newValue;
    });

    $scope.add_license = function() {
        var timeMounth = document.querySelector("#timeMounth").value,
            x = document.querySelector("#position").selectedIndex,
            position_id = document.getElementsByTagName("option")[x].getAttribute("data1"),
            position_parent_id = document.getElementsByTagName("option")[x].getAttribute("data2");


        //  console.log(document.querySelector("#timeMounth").value)
        $http({
            method: 'POST',
            url: 'add_license',
            data: {
                'username': $scope.userField.username,
                'position_id': position_id,
                'position_parent_id': position_parent_id,
                'time_mount': timeMounth
            }
        }).success(function(data) {
            $scope.success_add_license = $scope.language.success_add_license;
            // console.log(data);
            //  $scope.userField = data[0];
            //  console.log(data);
        }).error(function(data, status) {
            //   console.log(data, status);
        });


    }
});








/*********կատալոգների բաժին *****/
app.controller('positionGroup', ['$scope', '$http', '$q', '$timeout', 'language', function($scope, $http, $q, $timeout, language) {
    var promise = language.getLang();
    promise.then(function(data) {
        $scope.language = data;
        //   $scope.loadPosition();
        $scope.loadLesson();
    });
    /* $scope.loadPosition = function() {
         $http({
             method: 'GET',
             url: 'load_position',

         }).
         success(function(data, status) {
             $scope.position = data;
             $timeout(function() {
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
     }*/
    $scope.loadLesson = function() {
        $http({
            method: 'POST',
            url: 'load_lesson',

        }).
        success(function(data, status) {

            $scope.lesson = data;
            $timeout(function() {
                for (var i = 0; i < data.length; i++) {
                    $('.lesson_item[data2^="' + data[i].parent_id + '"]').appendTo(".position_item[data1^='" + data[i].parent_id + "']");
                }
            }, 100);
        });
    }
    $scope.createPosition = function() {
        var position_name = document.querySelector('#position_name').value,
            position_group = document.querySelector('#position_group').checked,
            x = document.querySelector("#position").selectedIndex,
            parent_id = document.getElementsByTagName("option")[x].getAttribute("ng-selected");

        $http({
            method: 'POST',
            url: 'create_position',
            data: {
                'position_name': position_name,
                'position_group': position_group,
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
}]); /*end*********կատալոգների բաժին *****/





app.controller('questionsGroup', ['$scope', '$http', 'language', function($scope, $http, language) {
    var promise = language.getLang();

    promise.then(function(data) {
        $scope.language = data;
        //    $scope.loadPosition();
        $scope.loadLesson();
    });
    $scope.question = {
        number: '1'
    };


    /*$scope.loadLesson = function() {
        $http({
            method: 'GET',
            url: 'load_position',
        }).
        success(function(data, status) {
            $scope.position = data;
            $timeout(function() {
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
    });*/
    $scope.loadLesson = function() {
        $http({
            method: 'POST',
            url: 'load_lesson',

        }).
        success(function(data, status) {
            $scope.lesson = data;
            // alert()
            //  console.log($scope.lesson)
            /* $timeout(function() {
                 for (var i = 0; i < data.length; i++) {
                     $('.lesson_item[data2^="' + data[i].parent_id + '"]').appendTo(".position_item[data1^='" + data[i].parent_id + "']");
                 }
             }, 100);*/
        });
    }



    // $scope.quesionPart1 = true;
    //$scope.mypattern = /^\s*$/g;
    $scope.questionType = function($event) {
        console.log($event.target.value);
        if ($event.target.value == 1) {
            $scope.quesionPart1 = true;
        } else {
            $scope.quesionPart1 = false;
        }
    }

    $scope.questionAnswersLength = 2;
    $scope.aq = {
        type: 0,
        version: 0
    }

    $scope.$watch('questionAnswersLength', function(newValue, oldValue) {
        // console.log(newValue, oldValue);
        $scope.newValue = newValue;
        $scope.answersInput = [];
        for (let i = 0; i < newValue; i++) {
            $scope.answersInput.push(i + 1);
        }
    });




    $scope.questionSave = function() {
        var position_id = $('#position').val(),


            //   var x = document.querySelector("#position").selectedIndex,
            //       position_id = document.getElementsByTagName("option")[x].getAttribute("ng-selected"),

            //lesson_id = $('#lesson').val(),
            question = $('.questionTextField').val(),
            questionType = $('.questionType.ng-valid-parse').val(),
            answers = [],
            hint_lessons_id = [],
            answerVersionField = $('.answerVersionField.ng-valid-parse').val();



        console.log(position_id);
        //   console.log('log' + $('.answerTextField').length)
        for (let i = 0; i < $('.answerTextField').length; i++) {
            answers.push($('.hintLessonField').eq(i).val());
            hint_lessons_id.push($('#lesson').eq(i).val());
        }


        //  console.log('lenh' + $('.questionTextField').val().length);
        $http({
            method: 'POST',
            url: 'add_question',
            data: {
                'position_id': position_id,
                //'lesson_id': lesson_id,
                'question_type': questionType,
                'question': question,
                'answers': answers.join('|'),
                'correct_answer': answerVersionField,
                'hint_lessons_id': hint_lessons_id.join('|')
            }
        }).success(function() {}).error(function(data, status) {
            if (status == 500) {
                $scope.questionError = 'nshir'
            }
            console.log('sxal e ...' + status);
        });
    }
}]);








/********users.html******personalpage.html******/

app.controller('personalpageGroup', ['$scope', '$http', 'language', 'currentUserData', function($scope, $http, language, currentUserData) {
    /*   var promise = language.getLang();
       promise.then(function(data) {
           $scope.language = data;
           $scope.user_page = currentUserData.getUserData();
       });*/

    var promise_language = language.getLang();
    promise_language.then(function(data) {
        $scope.language = data;
    });

    var promise_currentUserData = currentUserData.getUserData();
    promise_currentUserData.then(function(data) {
        $scope.currentUserStatus = data;
    });
}]);



/**************sessions****************/
app.controller('sessionsCtrl', ['$scope', '$http', '$timeout', 'language', function($scope, $http, $timeout, language) {
    var promise = language.getLang();
    promise.then(function(data) {
        $scope.language = data;
        $scope.autoload();
    });
    $scope.autoload = function() {
        $http({
            method: 'GET',
            url: '../admin/sessions_info'
        }).
        success(function(data) {
            $scope.sessions = [];
            var sessions_data = [],
                options = {
                    // weekday: 'long',
                    month: 'numeric',
                    year: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                },
                intlDate = new Intl.DateTimeFormat(undefined, options);
            angular.forEach(data, function(value, key) {
                sessions_data.push(data[key].data.split(';'));
                var from = sessions_data[key][1].search('"'),
                    to = sessions_data[key][1].length,
                    newstr = sessions_data[key][0].substring(from, to),
                    user = newstr.slice(0, -1);
                $scope.sessions.push({
                    'id': data[key].id,
                    'usr': user,
                    'ip_address': data[key].ip_address,
                    'time': intlDate.format(new Date(1000 * data[key].timestamp))
                });
            });
        });
    }
    $scope.session_remove = function(index) {
        $http({
            method: 'POST',
            url: '../admin/sessions_remove',
            data: {
                'session_id': $scope.sessions[index].id
            }
        }).
        success(function(data) {
            $scope.autoload();
        });
    }
}]);

/*end*************users.html******/