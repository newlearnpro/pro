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
});








/*********կատալոգների բաժին *****/
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
    }
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
            console.log($scope.lesson)
                /* $timeout(function() {
                     for (var i = 0; i < data.length; i++) {
                         $('.lesson_item[data2^="' + data[i].parent_id + '"]').appendTo(".position_item[data1^='" + data[i].parent_id + "']");
                     }
                 }, 100);*/
        });
    }



    //  $scope.quesionPart1 = true;
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
        console.log(newValue, oldValue);
        $scope.newValue = newValue;
        $scope.answersInput = [];
        for (let i = 0; i < newValue; i++) {
            $scope.answersInput.push(i + 1);
        }
    });




    $scope.questionSave = function() {
        var lessonId = $('#lesson').val(),
            question = $('.questionTextField').val(),
            questionType = $('.questionType.ng-valid-parse').val(),
            answers = [],
            answerVersionField = $('.answerVersionField.ng-valid-parse').val();
        console.log('log' + $('.answerTextField').length)
        for (let i = 0; i < $('.answerTextField').length; i++) {
            answers.push($('.answerTextField').eq(i).val());
        }


        //  console.log('lenh' + $('.questionTextField').val().length);
        $http({
            method: 'POST',
            url: 'add_question',
            data: {
                'lesson_id': lessonId,
                'question_type': questionType,
                'question': question,
                'answers': answers.join('|'),
                'correct_answer': answerVersionField
            }
        }).success(function() {}).error(function(data, status) {
            if (status == 500) {
                $scope.questionError = 'nshir'
            }
            console.log('sxal e ...' + status);
        });
    }
}]);


/*********դասերի բաժին *****/
app.controller('listGroup', ['$scope', '$rootScope', '$http', '$q', '$timeout', 'language', function($scope, $rootScope, $http, $q, $timeout, language) {
    var obj = [];
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
            //   console.log(data)
            $scope.position = data;
            $timeout(function() {
                for (var i = 0; i < data.length; i++) {
                    $('.mainPosition div[data2^="' + data[i].parent_id + '"]').appendTo(".mainPosition div[data1^='" + data[i].parent_id + "']").removeClass("position1").addClass("position2");




                    //  $('.mainPosition').children().children().attr('dirq', i);

                }
                if ($('.position1').has('a').length) {
                    $('.position1').attr('dirq', 1);
                } else if ($('.position1').has('a').length) {
                    $('.position1').attr('dirq', 1);
                }
                /*    $timeout(function() {
                        console.log($('.position1').has('a').length)
                    }, 1000);*/

            }, 10);
        });
    }
    $scope.getClass = function($event) {

            $scope.ttl = this.items.position;

            var position_curent = $('.mainPosition div[data1^="' + this.items.id + '"]').children('div');
            var position_cur2 = $('.mainPosition div[data1^="' + this.items.id + '"]').parent().parent().children().children('div').children('div');
            var questions = {};
            //console.log(this.items.id)

            position_cur2.parent().parent().children().removeAttr('openFolder');


            if (position_curent.parent().children('a').attr('style')) {
                setTimeout(function() {
                    position_curent.parent().children('a').removeAttr('style');
                    position_curent.slideUp('fast');
                }, 100);
            } else {
                position_cur2.slideUp('fast');
                //     console.log(position_curent.parent().children('a').html())
                position_cur2.parent().parent().children().children('a').removeAttr('style');
            }

            if (!position_curent.parent().attr('openFolder')) {
                position_curent.slideDown('fast');
                position_curent.parent().children('a').css('color', 'red');

                var content_src = '../../uploads/images/content_' + this.items.id + '.png ';
                //   $scope.src = this.items.src;
                $("#pagePlayer, #learnpro_logo").hide();
                $("#content_image").show().css({
                    'width': '100%',
                    'height': 'auto',
                    'maxWidth': '1000px'
                }).attr('src', '../../uploads/images/content_' + this.items.id + '.png ');
                position_cur2.parent().parent().children().removeAttr('openFolder');
                position_curent.parent().attr('openFolder', 'yes');
            }


            $http({
                method: 'POST',
                url: 'load_lesson',
                data: {
                    'id': this.items.id
                }
            }).success(function(data, status) {
                $scope.lessons = data;
            }).error(function(data, status) {
                console.log('sxal e chan...' + status);

            });
        }
        /*********փնտրել դասերը *****/
    $scope.getLessons = function(focus, blur) {
        $http({
            method: 'GET',
            url: 'get_lessons',
        }).
        success(function(data, status) {
            if (focus === true) {
                $scope.searchLessons = data;
            } else if (blur === true) {
                $scope.searchLessons = "";
            }
        });
    } /*end********փնտրել դասերը *****/

    /*********Մտնել թեստի բաժին *****/
    $scope.questionTest = function() {

        $scope.testQuestion = $scope.testList.question;
        $scope.testAnswers = $scope.testList.answers.split('|');


        $("#pagePlayer, #learnpro_logo").hide();

        console.log($scope.test);

    } /*end********Մտնել թեստի բաժին *****/



    /********* ներբեռնել դասը*****/
    $scope.loadPage = function() {
        var username = document.querySelector("#username").innerHTML;
        $http.get('../main/get_questions', {
                params: {
                    lesson_id: this.items.id,
                }
            })
            .then(function(data) {
                // console.log(data.data.length)
                if (data.data.length != 0) {
                    $scope.testList = data.data[0];
                    $scope.question = 'Հարցեր դասի մասին';
                }
            });
        /* $http.get('../main/users_data', {
                 params: {
                     username: username,
                     lesson_id: this.items.id,
                     lesson_name: this.items.name
                 }
             })
             .then(function(data) {


                 console.log(data.config.params.lesson_id);
             });*/
        //     console.log(this.items.type_id);
        $scope.src = this.items.src;
        $("#content_image").hide();
        $("#learnpro_logo").show();
        $("#pagePlayer").show().css({
            'width': '100%',
            'height': parseInt($('#pagePlayer').css('width')) / 1.33,
            'maxWidth': '1000px'
        }).attr('src', '../../uploads/lesson_type_' + this.items.type_id + '/' + this.items.src + '/index.html');

        $(window).resize(function() {
            $("#pagePlayer").css({
                'width': '100%',
                'height': parseInt($('#pagePlayer').css('width')) / 1.33,
                'maxWidth': '1000px'
            });
        });
    } /*end******** *****/
    $scope.resizeIframe = function() {
        if ($('#pagePlayer').hasClass('resizePlayer')) {
            $('header').show();
            $('.mainPage').removeAttr('style');
            $("#pagePlayer").removeClass('resizePlayer').css({
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
            $('.mainPage').css({
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'width': '100%'
            });
            $('header').hide();
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
}]); /*end********կատալոգների բաժին *****/









app.controller('personalpageGroup', ['$scope', '$http', 'language', function($scope, $http, language) {
    var promise = language.getLang();
    promise.then(function(data) {
        $scope.language = data;
        $scope.autoload();
        //  $scope.loadPosition();
    });
    var username = document.querySelector("#username").innerHTML;
    $scope.autoload = function() {
        $http.get('../main/user_personal_page', {
                params: {
                    user: username
                }
            })
            .then(function(data) {
                $scope.user_page = data.data;
                //  console.log(data.data);
            });


        /*  $http({
                  method: 'GET',
                  url: '../main/user_personal_page',
                   data: {
                       'user': username
                   }
              }).
              //  $http.get('../main/user_personal_page', conf).
          success(function(data) {
              $scope.user_page = data;
              console.log(data);
          });*/
    }

}]);









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
                    newstr = sessions_data[key][1].substring(from, to),
                    user = newstr.slice(1, -1);
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