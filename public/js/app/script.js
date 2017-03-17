/**************directives***************************/
app.directive('usersTable', function($http) {
    return {
        restrict: 'EA',
        //  scope: {},
        replace: true,
        link: function(scope, element, attrs, ctrl) {
            $http({
                method: 'POST',
                url: '../admin/users_info'
            }).
            success(function(data) {
                scope.users = data;
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
        }
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
            //console.log(data);
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
        $scope.file_type = 'video';
        $scope.language = data;
        //   $scope.loadPosition();
        loadLesson();
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
    function loadLesson() {
        // $scope.loadLesson = function() {
        $http({
            method: 'POST',
            url: 'load_lesson',

        }).
        success(function(data, status) {
            //   console.log(this);
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
            position_keywords = document.querySelector('#position_keywords').value,
            license_type = document.querySelector('#license_type').checked,
            x = document.querySelector("#position").selectedIndex,
            parent_id = document.getElementsByTagName("option")[x].getAttribute("ng-selected");

        $http({
            method: 'POST',
            url: 'create_position',
            data: {
                'position_name': position_name,
                'position_keywords': position_keywords,
                'license_type': license_type,
                'parent_id': parent_id
            }
        }).
        success(function(data) {
            //  $scope.loadPosition();
            //loadLesson();
            location.reload();
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
            //     $scope.loadPosition();
            //  loadLesson();
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
            location.reload();
            //     $scope.loadPosition();
            //  loadLesson();
            //reload.locat
        });
    }
    $scope.editNumberLesson = function(number) {
        var number = $('.lesson_item[data1^="' + this.items.id + '"]').find('input').val();
        console.log(number);
        $http({
            method: 'POST',
            url: '../admin/edit_number_lesson',
            data: {
                'id': this.items.id,
                'number': number
            }
        }).success(function(data) {

            //   $scope.loadPosition();
            //  loadLesson();
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
            location.reload();
            //     $scope.loadPosition();            
            // loadLesson();
        });
    }
    $scope.openClosePosition = function() {
        var position = $('.mainPosition div[data1^="' + this.items.id + '"]').children('div');
        position.slideToggle('fast');
    }
}]); /*end*********կատալոգների բաժին *****/





app.controller('questionsGroup', ['$scope', '$http', 'language', function($scope, $http, language) {
    var question_id = 0;
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
        //  console.log($event.target.value);
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
        $scope.newValue = newValue;
        $scope.answersInput = [];
        for (let i = 0; i < newValue; i++) {
            $scope.answersInput.push(i + 1);
        }
    });



    $http.get('../main/get_last_question_id', {})
        .then(function(data) {
            question_id = parseInt(data.data) + 1;
            // console.log(question_id);
            /*if (data.data.length != 0) {
                $scope.question = data.data;
                // $scope.questionArr = data.data
                //  $scope.testList = data.data;
                //   $scope.question = data.data[0].question_time;
            }*/
        });


    $scope.questionSave = function() {
        var position_id = $('#position').val(),
            question = $('.questionTextField').val(),
            questionType = $('.questionType.ng-valid-parse').val(),
            answers = [],
            hint_lessons_id = [],
            answerVersionField = $('.answerVersionField.ng-valid-parse').val();
        for (let i = 0; i < $('.answerTextField').length; i++) {
            answers.push($('.answerTextField').eq(i).val());
            hint_lessons_id.push($('.hintLessonId').eq(i).val().split(' ')[0]);
        }


        $http({
            method: 'POST',
            url: 'add_question',
            data: {
                'position_id': position_id,
                'question_type': questionType,
                'question': question,
                'answers': answers.join('|'),
                'correct_answer': answerVersionField,
                'hint_lessons_id': hint_lessons_id.join('|'),
                'question_id': question_id
            }
        }).success(function() {
            $scope.questionCreated = 'Հարցը պահպանվեց'
        }).error(function(data, status) {
            if (status == 500) {
                $scope.questionError = 'nshir'
            }
            console.log('sxal e ...' + status);
        });




        $http({
            method: 'POST',
            url: 'add_question_as_lesson',
            data: {
                'name': question,
                'parent_id': position_id,
                'question_id': question_id
            }
        }).
        success(function(data) {
            //  console.log(data)
            //  $scope.loadPosition();
            $scope.loadLesson();
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
        load_license_code();
    });



    function load_license_code() {
        var username = document.querySelector('#username').innerHTML,
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

        $http({
            method: 'POST',
            url: 'get_users_license_code',
            data: {
                username: username
            }
        }).
        success(function(data) {
            console.log(data);
            $scope.license_lessons = data;
        });
    }

    $scope.confirm_license_code = function() {
        var username = document.querySelector('#username').innerHTML,
            license_code = $('#insert_license_code').val(),
            dat = new Date(),
            start_time = Date.parse(dat);

        $http({
            method: 'POST',
            url: 'confirm_users_license_code',
            data: {
                username: username,
                license_code: license_code,
                start_time: start_time
            }
        }).success(function(data) {
            load_license_code();
        });
    }
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


            /* var array1 = ['BA11', 'BA14', 'BA15'];
             var array2 = ['GL156', 'GL24', 'GL31'];
             var search = 'sgBA1*';
             $.each([array1, array2], function(index, value) {
                 $.each(value, function(key, cell) {
                     //  if (search.indexOf(cell) !== -1)
                     console.log('found in array ' + index, cell);
                 });
             });*/


            angular.forEach(data, function(value, key) {

                sessions_data.push(data[key].data.split(';'));


                console.log(value.data);

                var re = /(usr\|s:5) */ig;

                //                var result = value.data.match(/usr\|s:5/ig);
                var found = value.data.match(re);

                console.log(found); // ОЙ, Ой, ой


                var from = sessions_data[key][1].search('"'),
                    to = sessions_data[key][1].length,
                    newstr = sessions_data[key][0].substring(from, to),
                    user = newstr.slice(0, -1);
                //  console.log(sessions_data)
                //   console.log(from)








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