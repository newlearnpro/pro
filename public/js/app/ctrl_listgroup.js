/*********դասերի բաժին *****/
app.controller('listGroup', ['$scope', '$rootScope', '$http', '$q', '$timeout', 'language', 'currentUserData', function($scope, $rootScope, $http, $q, $timeout, language, currentUserData) {

    var promise_language = language.getLang();
    promise_language.then(function(data) {
        $scope.language = data;
        $scope.loadPosition();
        //   console.log($scope.language);
    });

    var promise_currentUserData = currentUserData.getUserData();
    promise_currentUserData.then(function(data) {
        $scope.currentUserStatus = data[0].status;
        //   console.log($scope.currentStatus);
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
                $('#pagePlayer, #learnpro_logo, #jp_container_1, #teacher_data_group').hide();
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
    $scope.questionTest = function($index) {
            //console.log($index)
            $scope.testQuestion = $scope.question[$index].question;
            $scope.testAnswers = $scope.question[$index].answers.split('|');
            $scope.verifyAnswers = $scope.question[$index].correct_answer;


            $("#pagePlayer, #learnpro_logo").hide();

            //   console.log($scope.test);

        }
        /*end********Մտնել թեստի բաժին *****/

    /*********ստուգել պատասխանը *****/
    $scope.verifyAnswer = function($index) {
            if ($index == $scope.verifyAnswers) {


                console.log($('.jp-current-time').text());
                $('.answer_item').eq($index - 1).animate({
                    backgroundColor: '#8cd675'
                }, 1500).animate({
                    backgroundColor: '#cccccc'
                }, 100);
                $timeout(function() {
                    $('#question_group').hide();
                    $('#jp_container_1, #teacher_data_group').show();


                    var minsecStartFrame = $('.jp-current-time').text().split(':');
                    var secondStart = parseInt(((+minsecStartFrame[0]) * 60 + (+minsecStartFrame[1])) + 2);
                    console.log(secondStart)

                    $("#jquery_jplayer_1").jPlayer("play", secondStart);
                    setTimeout(function() {
                        $scope.timerQuestion = setInterval($scope.timer, 500);
                    }, 1000);

                }, 1000);
            } else {
                $('.answer_item').eq($index - 1).animate({
                    backgroundColor: '#ed145b'
                }, 1500).animate({
                    backgroundColor: '#cccccc'
                }, 100);
                $timeout(function() {
                    $('#question_group').hide();
                    $('#jp_container_1, #teacher_data_group').show();
                    $('#jquery_jplayer_1').jPlayer('play', 0);
                    $scope.timerQuestion = setInterval($scope.timer, 500);
                }, 600);

            }

            //   console.log($scope.test);

        }
        /*end********ստուգել պատասխանը *****/

    /********* ներբեռնել դասը*****/
    $scope.loadPage = function($event) {
        var that = this;
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
                        $('#jp_container_1, #teacher_data_group').hide();




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
                            ended: function() {
                                clearInterval($scope.timerMarker);

                                clearInterval($scope.timerQuestion);
                                // The $.jPlayer.event.ended event
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
                        $('#jp_container_1, #teacher_data_group').show();
                        $('#jp_video_0').attr('src', '../../uploads/lesson_type_' + that.items.type_id + '/' + that.items.src + '/data.zip');

                        $timeout(function() {
                            $("#jquery_jplayer_1").jPlayer("play");
                            //  console.log('yes');
                        }, 200);









                        function playerPauseMarker() {
                            clearInterval($scope.timerMarker);
                            //  clearInterval($scope.timer);
                        }

                        function playerPauseQuestion() {
                            // clearInterval($scope.timerMarker);
                            clearInterval($scope.timerQuestion);
                        }






                        /*******for teacher**/
                        if ($scope.currentUserStatus == 'teacher') {
                            $('.jp-play').bind('click', function() {
                                if ($('#jp_container_1').hasClass('jp-state-playing')) {
                                    playerPauseMarker();
                                } else {
                                    $scope.timerMarker = setInterval($scope.timer, 500);
                                }
                            });

                            $('.jp-stop').bind('click', function() {
                                playerPauseMarker();
                            });



                            //   console.log(username);
                            $http.get('../main/get_teachers_markers', {
                                    params: {
                                        lesson_id: that.items.id,
                                        username: username
                                    }
                                })
                                .then(function(data) {
                                    console.log(data.data);

                                    $scope.startEndTime = data.data;



                                    $('.jp-marker').empty();
                                    for (let i = 0; i < data.data.length; i++) {
                                        $('.jp-marker').append('<option value=' + i + '>' + data.data[i].start_time + ' - ' + data.data[i].end_time + '</option>');
                                    }

                                    $('.jp-marker').bind('change', function() {
                                        var markerIndex = $('.jp-marker option:selected').val();
                                        var minsecStartFrame = data.data[markerIndex].start_time.split(':');
                                        var secondStart = (+minsecStartFrame[0]) * 60 + (+minsecStartFrame[1]);
                                        $('#jquery_jplayer_1').jPlayer('play', secondStart);


                                        $scope.timerMarker = setInterval(function() {
                                            //     console.log('timer');
                                            var minsecEndFrame = data.data[markerIndex].end_time.split(':');
                                            var secondEnd = (+minsecEndFrame[0]) * 60 + (+minsecEndFrame[1]);

                                            // Restrict playback to first 60 seconds.
                                            if ($('.jp-current-time').text() == data.data[markerIndex].end_time) {
                                                $('#jquery_jplayer_1').jPlayer('pause', secondEnd);
                                                playerPauseMarker();
                                            }
                                        }, 100); // 10Hz

                                    });







                                });







                        } /*******end teacher**/
                        /*******for pupil**/
                        else {



                            if ($scope.currentUserStatus == 'pupil') {
                                $http.get('../main/get_questions', {
                                        params: {
                                            lesson_id: that.items.id,
                                        }
                                    })
                                    .then(function(data) {
                                        console.log(data.data);
                                        if (data.data.length != 0) {
                                            $scope.question = data.data;
                                            // $scope.questionArr = data.data
                                            //  $scope.testList = data.data;
                                            //   $scope.question = data.data[0].question_time;
                                        }
                                    });
                            }


                            $scope.timer = function() {
                                console.log('11');
                                for (let i = 0; i < $scope.question.length; i++) {
                                    if ($('.jp-current-time').text() == $scope.question[i].question_time) {
                                        $('#jquery_jplayer_1').jPlayer('pause');
                                        playerPauseQuestion();
                                        $('.question_time').eq(i).click();
                                        $('#question_group').show();
                                        $('#jp_container_1, #teacher_data_group').hide();
                                    }
                                }
                            }


                            $scope.timerQuestion = setInterval($scope.timer, 500);




                            $('.jp-play').bind('click', function() {


                                if ($('#jp_container_1').hasClass('jp-state-playing')) {
                                    playerPauseQuestion();
                                } else {
                                    $scope.timerQuestion = setInterval($scope.timer, 500);
                                }
                                // if ($.jPlayer.pause()) {
                                //     alert();
                                // }
                                // console.log(this);
                                /*  if ($('#jquery_jplayer_1').jPlayer('pause')) {
                                      $scope.timerQuestion = setInterval($scope.timer, 500);
                                  } else {
                                      playerPauseQuestion();
                                  }*/

                            });

                            $('.jp-stop').bind('click', function() {
                                playerPauseQuestion();
                            });
                        }

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
            $('#jp_container_1').css('max-width', '800px');
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
            $('#jp_container_1').css('max-width', '100%');
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


    $scope.addTeachersMarkers = function() {
        console.log($scope.startEndTime[0].lesson_id);
        var username = document.querySelector('#username').innerHTML,
            lesson_id = $scope.startEndTime[0].lesson_id,
            start_time = '00:04',
            end_time = '00:15';

        $http({
            method: 'POST',
            url: 'add_teachers_markers',
            data: {
                'username': username,
                'lesson_id': lesson_id,
                'start_time': start_time,
                'end_time': end_time
            }
        }).success(function(data, status) {

        });
    }
    $scope.removeTeachersMarkers = function($index) {
        var that = this;
        $http({
            method: 'POST',
            url: '../main/remove_teachers_markers',
            data: {
                'id': that.items.id
            }
        }).success(function(data, status) {
            $('.teacher_marker_list, .jp-marker:children').eq($index).remove();
        });
    }







}]); /*end********կատալոգների բաժին *****/