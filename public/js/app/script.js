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
            //  console.log($scope.lesson)
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
app.controller('listGroup', ['$scope', '$rootScope', '$http', '$q', '$timeout', 'currentUserData', 'language', function($scope, $rootScope, $http, $q, $timeout, currentUserData, language) {

    var promise = language.getLang();
    //$scope.currentUserStatus = currentUserData.getUserData()[0].age;
    // console.log(currentUserData.getUserData()[0].status)
    // var promise = language.getLang();
    /******փորձ******/
    /*  $scope.a = 100;
      $timeout(function() {
          $scope.a = 300;
          //    $scope.$digest();
      }, 1500);*/
    /***************/

    promise.then(function(data) {
        $scope.currentUser = currentUserData.getUserData()[0];
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
            //    console.log(data);
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
            var that = this;
            //  console.log(this)
            $scope.position_name = that.items.position;
            $scope.position_id = that.items.id;
            $scope.parent_id = that.items.parent_id;
            var position_curent = $('.mainPosition div[data1^="' + that.items.id + '"]').children('div');
            var position_cur2 = $('.mainPosition div[data1^="' + that.items.id + '"]').parent().parent().children().children('div').children('div');
            var questions = {};
            //console.log(this.items.id)

            position_cur2.parent().parent().children().removeAttr('openFolder');
            $("#lp_carousel").hide();


            /*  setTimeout(function() {
                  console.log(that.items.position_group);
                  if (that.items.position_group == 1) {
                      $(".mainLesson").children().last().hide()
                  }

              }, 100);*/



            if (position_curent.parent().children('a').attr('style')) {
                $timeout(function() {
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

                var content_src = '../../uploads/images/content_' + that.items.id + '.png ';
                //   $scope.src = this.items.src;
                $('#pagePlayer,#jp_video_0').attr('src', '');
                $('#pagePlayer, #learnpro_logo, #jp_container_1').hide();
                $('#content_image').show().css({
                    'width': '100%',
                    'height': 'auto',
                    'maxWidth': '800px'
                }).attr('src', '../../uploads/images/content_' + that.items.id + '.png ');
                position_cur2.parent().parent().children().removeAttr('openFolder');
                position_curent.parent().attr('openFolder', 'yes');
            }


            $http({
                method: 'POST',
                url: 'load_lesson',
                data: {
                    'id': that.items.id
                }
            }).success(function(data, status) {

                $scope.lessons = data;
                $timeout(function() {
                    //   console.log(data)
                    if (data.length != 0) {
                        $("#menuModal").modal("hide");
                    }
                    if (that.items.position_group == 1) {
                        // $('.mainLesson div').children().first().removeClass('position_group_in').addClass('position_group_out');

                        //$(".mainLesson div[data^!='type_0']")

                        $('.mainLesson div').children().first().removeClass('position_group_in').addClass('position_group_out');
                        $('.lesson_group_type_0').children().removeClass('position_group_in').addClass('position_group_out');
                        $('.lesson_group_type_0').next().children().removeClass('position_group_in').addClass('position_group_out');
                    } else if (that.items.position_group == 0) {

                        $('.mainLesson div').children().removeClass('position_group_in').addClass('position_group_out');
                        //    $('.lesson_group_type_0').children().removeClass('position_group_in').addClass('position_group_out');
                        //    $('.lesson_group_type_0').next().children().removeClass('position_group_in').addClass('position_group_out');
                    }
                }, 50);
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

        //   console.log($scope.test);

    } /*end********Մտնել թեստի բաժին *****/


    /********* ներբեռնել դասը*****/
    $scope.loadPage = function($event) {
        var that = this;

        var obj = {
            startFrame: ['00:10', '00:20', '01:15', '01:50'],
            endFrame: ['00:15', '00:25', '01:30', '01:55']
        }
        var username = document.querySelector('#username').innerHTML;
        var position_id = $('#position_name_header').attr('data1');
        var position_parent_id = $('#position_name_header').attr('data2');
        //  var class_name = $('#position_name_header').text();
        // console.log(class_id)

        $http({
            method: 'POST',
            url: 'get_users_license_code',
            data: {
                username: username,
                position_id: position_id,
                position_parent_id: position_parent_id,
                //   class_name: class_name
            }
        }).
        success(function(data, status) {
            //  console.log(data[0])
            if (data[0] != undefined && username == data[0].username && (position_id == data[0].position_id || position_parent_id == data[0].position_id || data[0].position_id == 0)) {

                if ($event.currentTarget.classList.contains('lesson_selected') == false) {
                    //   console.log($event.currentTarget.classList.contains('lesson_selected'));
                    $('.lesson_types').removeClass('lesson_selected');
                    $event.currentTarget.classList.add('lesson_selected');


                    /*   $http.get('../main/get_questions', {
                               params: {
                                   lesson_id: that.items.id,
                               }
                           })
                           .then(function(data) {
                               // console.log(data.data.length)
                               if (data.data.length != 0) {
                                   $scope.testList = data.data[0];
                                   $scope.question = 'Հարցեր դասի մասին';
                               }
                           });*/
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
                    $("#content_image").hide();
                    $("#learnpro_logo").show();









                    if (that.items.type_name == 'html') {
                        $scope.src = that.items.src;
                        $('#jp_video_0').attr('src', '');
                        $('#jp_container_1').hide();




                        $("#pagePlayer").show().css({
                            'width': '100%',
                            'height': parseInt($('#pagePlayer').css('width')) / 1.33,
                            'maxWidth': '800px'
                        }).attr('src', '../../uploads/lesson_type_' + that.items.type_id + '/' + that.items.src + '/index.html');

                        $(window).resize(function() {
                            $("#pagePlayer").css({
                                'width': '100%',
                                'height': parseInt($('#pagePlayer').css('width')) / 1.33,
                                'maxWidth': '800px'
                            });
                        });
                    }



                    /*******************************************************************************************/
                    if (that.items.type_name == 'video') {


                        $("#jquery_jplayer_1").jPlayer({
                            ready: function() {
                                $(this).jPlayer("setMedia", {
                                    title: that.items.name,
                                    m4v: '../../uploads/lesson_type_' + that.items.type_id + '/' + that.items.src + '/data.zip',

                                    // poster: "http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
                                });
                            },
                            ended: function() { // The $.jPlayer.event.ended event
                                //$(this).jPlayer("play"); // Repeat the media
                                //jquery version
                                //  $('.lesson_selected').parent().next().children().trigger('click');
                                if (document.getElementsByClassName("lesson_selected")[0].parentElement.nextElementSibling.className != 'lesson_group_type_0') {
                                    document.getElementsByClassName("lesson_selected")[0].parentElement.nextElementSibling.firstElementChild.click();
                                }
                                // document.getElementsByClassName("lesson_selected")[0].parentElement.previousElementSibling.firstElementChild.click();
                                //  $('.lesson_selected', window.parent.document).parent().next().children().trigger('click');

                            },
                            cssSelectorAncestor: "#jp_container_1",
                            swfPath: "/js",
                            supplied: "m4v, ogv",
                            useStateClassSkin: true,
                            autoBlur: false,
                            smoothPlayBar: true,
                            keyEnabled: true,
                            remainingDuration: true,
                            toggleDuration: true
                        });


                        //   $(".jp-playlist").css("display", "none");

                        $('#pagePlayer').attr('src', '').hide();
                        $('#jp_container_1').show();
                        $('#jp_video_0').attr('src', '../../uploads/lesson_type_' + that.items.type_id + '/' + that.items.src + '/data.zip');

                        $timeout(function() {
                            $("#jquery_jplayer_1").jPlayer("play");
                        }, 200);




                        function playerPause() {
                            clearInterval($scope.timerId);
                        }



                        $('.jp-play, .jp-stop').bind('click', function() {
                            playerPause();
                        });

                        $('.jp-marker').empty();
                        for (let i = 0; i < obj.startFrame.length; i++) {
                            $('.jp-marker').append('<option value=' + i + '>' + obj.startFrame[i] + ' - ' + obj.endFrame[i] + '</option>');
                        }

                        $('.jp-marker').bind('change', function() {
                            var markerIndex = $('.jp-marker option:selected').val();
                            var minsecStartFrame = obj.startFrame[markerIndex].split(':');
                            var secondStart = (+minsecStartFrame[0]) * 60 + (+minsecStartFrame[1]);
                            $("#jquery_jplayer_1").jPlayer("play", secondStart);


                            $scope.timerId = setInterval(function() {
                                var minsecEndFrame = obj.endFrame[markerIndex].split(':');
                                var secondEnd = (+minsecEndFrame[0]) * 60 + (+minsecEndFrame[1]);
                                //     console.log(obj.startFrame[markerIndex])
                                // Restrict playback to first 60 seconds.
                                if ($('.jp-current-time').text() == obj.endFrame[markerIndex]) {

                                    $("#jquery_jplayer_1").jPlayer("pause", secondEnd);
                                    playerPause();
                                }
                            }, 100); // 10Hz

                        });

                    }
                }
            } else {
                alert('not license');
            }


        }).
        error(function(data, status) {

            alert('Տվյալների բազան լիցենյիայի համար չկա');
        });



        /********************************************************************************************/


    } /*end******** *****/

    $scope.resizeIframe = function() {
        if ($('#pagePlayer').hasClass('resizePlayer')) {
            $('header').show();
            $('.mainPage').removeAttr('style');
            $("#pagePlayer").removeClass('resizePlayer').css({
                'width': '100%',
                'height': parseInt($('#pagePlayer').css('width')) / 1.33,
                'maxWidth': '800px'
            });
            $(window).resize(function() {
                $("#pagePlayer").css({
                    'width': '100%',
                    'height': parseInt($('#pagePlayer').css('width')) / 1.33,
                    'maxWidth': '800px'
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







/**************users.html******/

app.controller('personalpageGroup', ['$scope', '$http', 'currentUserData', 'language', function($scope, $http, currentUserData, language) {
    var promise = language.getLang();
    promise.then(function(data) {
        $scope.language = data;
        $scope.user_page = currentUserData.getUserData();
    });
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

/*end*************users.html******/