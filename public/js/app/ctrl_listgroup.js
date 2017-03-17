/*********դասերի բաժին *****/
app.controller('listGroup', ['$scope', '$rootScope', '$http', '$q', '$timeout', 'language', 'currentUserData', function($scope, $rootScope, $http, $q, $timeout, language, currentUserData) {

    var promise_language = language.getLang();
    promise_language.then(function(data) {
        $scope.language = data;
        $scope.loadPosition();
    });

    var promise_currentUserData = currentUserData.getUserData();
    promise_currentUserData.then(function(data) {
        $scope.currentUserStatus = data[0].status;
    });


    var loadTeachersMarkers = function(id) {
        var username = document.querySelector('#username').innerHTML;
        $http.get('../main/get_teachers_markers', {
                params: {
                    lesson_id: id,
                    username: username
                }
            })
            .then(function(data) {
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
                        var minsecEndFrame = data.data[markerIndex].end_time.split(':');
                        var secondEnd = (+minsecEndFrame[0]) * 60 + (+minsecEndFrame[1]);

                        if ($('.jp-current-time').text() == data.data[markerIndex].end_time) {
                            $('#jquery_jplayer_1').jPlayer('pause', secondEnd);
                            playerPauseMarker();
                        }
                    }, 100);
                });
            });
    }



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
            //console.log(data);


            //    var username = document.querySelector('#username').innerHTML;








            $scope.position = data;
            $timeout(function() {
                for (var i = 0; i < data.length; i++) {
                    //    console.log(data[i])
                    // if ($('.mainPosition div[data2^>"0"]')) {
                    //    console.log(data[i].license_type);
                    // if (data[i].license_type == '2') {

                    //alert(data[i].position);
                    //data[i].position



                    $('.mainPosition div[data2^="' + data[i].parent_id + '"]').appendTo(".mainPosition div[data1^='" + data[i].parent_id + "']").removeClass("position1").addClass("position2");
                    // }



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
            var username = document.querySelector('#username').innerHTML;
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

                var content_src = '../../uploads/images/content_' + that.items.id + '.jpg ';
                //   $scope.src = this.items.src;
                $('#pagePlayer,#jp_video_0').attr('src', '');
                $('#pagePlayer, #learnpro_logo, #jp_container_1, #teacher_data_group, #not_license').hide();
                $('#content_image').show().css({
                    'width': '100%',
                    'height': 'auto',
                    'maxWidth': '800px'
                }).attr('src', '../../uploads/images/content_' + that.items.id + '.jpg ');
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
                $http({
                    method: 'POST',
                    url: 'get_users_license_code_bypos',
                    data: {
                        username: username,
                    }
                }).success(function(data, status) {
                    $('.mainPosition div[data3^="1"').css({
                        'visibility': 'hidden',
                        'height': '1px'
                    });
                    for (let i = 0; i < data.length; i++) {
                        //$timeout(function() {
                        if (data[i].license_type == 'standartplus') {
                            $('.mainPosition div[data2^="' + data[i].position_id + '"][data3^="1"]').css({
                                'visibility': 'visible',
                                'height': 'auto'
                            });
                        }
                        //}, 10);
                    }
                });

                $scope.lessons = data;
                $timeout(function() {
                    //console.log(data);
                    if (data.length != 0) {
                        $("#menuModal").modal("hide");
                    }

                    $('.mainLesson div').children().first().removeClass('position_group_in').addClass('position_group_out');
                    $('.lesson_group_type_0').children().removeClass('position_group_in').addClass('position_group_out');
                    $('.lesson_group_type_0').next().children().removeClass('position_group_in').addClass('position_group_out');

                }, 50);
            }).error(function(data, status) {
                console.log('sxal e chan...' + status);
            });


        }
        /*********փնտրել դասերը *****/
    $scope.getLessons = function($event) {
        $http({
            method: 'GET',
            url: 'load_position',
        }).
        success(function(data) {
            if ($event.currentTarget.checked == true) {
                $scope.searchLimit = 5;
                $scope.searchLessons = data;
            } else {
                $scope.searchLessons = '';
            }
        });
    } /*end********փնտրել դասերը *****/



    /*********ստուգել պատասխանը *****/
    $scope.verifyAnswer = function($index) {
            if ($index == $scope.correctAnswer) {
                $('.answer_item').eq($index - 1).animate({
                    backgroundColor: '#8cd675'
                }, 1500).animate({
                    backgroundColor: '#cccccc'
                }, 100);
                $timeout(function() {
                    if (document.getElementsByClassName("lesson_selected")[0].parentElement.nextElementSibling.className != 'lesson_group_type_0') {
                        document.getElementsByClassName("lesson_selected")[0].parentElement.nextElementSibling.firstElementChild.click();
                    }

                }, 1000);
            } else {
                $('.answer_item').eq($index - 1).animate({
                    backgroundColor: '#ed145b'
                }, 1500).animate({
                    backgroundColor: '#cccccc'
                }, 100);
                $timeout(function() {
                    $http({
                        method: 'POST',
                        url: 'load_hint_lesson',
                        data: {
                            id: $scope.hintLessonId[$index - 1]
                        }
                    }).success(function(data, status) {
                        var that = data[0];
                        $('#jquery_jplayer_1').jPlayer({
                            ready: function() {
                                $(this).jPlayer('setMedia', {
                                    title: that.name,
                                    m4v: '../../uploads/lesson_type_' + that.type_id + '/' + that.src + '/data.zip'
                                });
                            },
                            ended: function() {
                                if (document.getElementsByClassName("lesson_selected")[0].parentElement.nextElementSibling.className != 'lesson_group_type_0') {
                                    document.getElementsByClassName("lesson_selected")[0].parentElement.nextElementSibling.firstElementChild.click();
                                }
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
                        $('#not_license').hide();
                        $('#pagePlayer, #question_group').attr('src', '').hide();
                        $('#jp_container_1, #teacher_data_group').show();
                        $('#jp_video_0').attr('src', '../../uploads/lesson_type_' + that.type_id + '/' + that.src + '/data.zip').attr('data', that.id);

                        $timeout(function() {
                            $("#jquery_jplayer_1").jPlayer("play");
                            //  console.log('yes');
                        }, 200);
                    }).error(function(data, status) {
                        console.log('error' + status);
                    });
                }, 600);

            }
        }
        /*end********ստուգել պատասխանը *****/









    /********* ներբեռնել դասը*****/
    $scope.loadPage = function($event) {
        if ($event.currentTarget.className != 'lesson_types lesson_type_0 position_group_out') {
            var that = this;
            var username = document.querySelector('#username').innerHTML;
            var position_id = $('.position_name_header').attr('data2');
            //  var position_parent_id = $('.position_name_header').attr('data2');
            //  var class_name = $('.position_name_header').text();
            // console.log(class_id)

            $http({
                method: 'POST',
                url: 'get_users_license_code_bypos',
                data: {
                    username: username,
                    position_id: position_id
                }
            }).success(function(data, status) {
                console.log(data)
                if (data[0] != undefined) {
                    var end_time = parseInt(data[0].start_time) + (2592000000 * parseInt(data[0].mount_count)),
                        dat = new Date(),
                        current_time = Date.parse(dat);
                }
                if (end_time > current_time && username == data[0].username && (position_id == data[0].position_id || data[0].position_id == 0)) {
                    // console.log($event.currentTarget.classList.contains('lesson_type_2'));
                    //  if ($event.currentTarget.classList.contains('lesson_selected') == false && $event.currentTarget.classList.contains('lesson_type_1') == true) {
                    if ($event.currentTarget.classList.contains('lesson_selected') == false) {
                        $('.lesson_types').removeClass('lesson_selected');
                        $event.currentTarget.classList.add('lesson_selected');
                    }

                    $("#content_image").hide();
                    $("#learnpro_logo").show();

                    if (that.items.type_name == 'html') {
                        $scope.src = that.items.src;
                        $('#jp_video_0').attr('src', '');
                        $('#jp_container_1, #teacher_data_group, #question_group').hide();

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

                    /******************************************************************************************/

                    if (that.items.type_name == 'question') {
                        $scope.src = that.items.src;
                        $('#jp_video_0, #pagePlayer').attr('src', '');
                        $('#jp_container_1, #teacher_data_group, #pagePlayer, #not_license').hide();
                        //   console.log(that.items.parent_id);
                        //    console.log(that.items.question_id);
                        $('#question_group').show();
                        $http.get('get_questions', {
                                params: {
                                    parent_id: that.items.parent_id,
                                    question_id: that.items.question_id
                                }
                            })
                            .then(function(data) {
                                if (data.data.length != 0) {
                                    $scope.testQuestion = data.data[0].question;
                                    $scope.testAnswers = data.data[0].answers.split('|');
                                    $scope.correctAnswer = data.data[0].correct_answer;
                                    $scope.hintLessonId = data.data[0].hint_lessons_id.split('|');
                                } else {
                                    alert('f');
                                }
                            });
                    }

                    /*******************************************************************************************/
                    if (that.items.type_name == 'video') {
                        $("#jquery_jplayer_1").jPlayer({
                            ready: function() {
                                $(this).jPlayer("setMedia", {
                                    title: that.items.name,
                                    m4v: '../../uploads/lesson_type_' + that.items.type_id + '/' + that.items.src + '/data.zip'
                                        // poster: "http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
                                });
                            },
                            ended: function() {
                                clearInterval($scope.timerMarker);
                                if (document.getElementsByClassName("lesson_selected")[0].parentElement.nextElementSibling.className != 'lesson_group_type_0') {
                                    document.getElementsByClassName("lesson_selected")[0].parentElement.nextElementSibling.firstElementChild.click();
                                }
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

                        $('#not_license').hide();
                        $('#pagePlayer, #question_group').attr('src', '').hide();
                        $('#jp_container_1, #teacher_data_group').show();
                        $('#jp_video_0').attr('src', '../../uploads/lesson_type_' + that.items.type_id + '/' + that.items.src + '/data.zip').attr('data', that.items.id);

                        $timeout(function() {
                            $("#jquery_jplayer_1").jPlayer("play");
                            $("#learnpro_logo").trigger('click');
                        }, 200);

                        function playerPauseMarker() {
                            clearInterval($scope.timerMarker);
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
                            loadTeachersMarkers(that.items.id);
                        } /*******end teacher**/
                    }
                    //   }

                } else {

                    $('#pagePlayer, #question_group', '#jp_video_0').attr('src', '').hide();
                    $('#jp_container_1, #teacher_data_group, #content_image').hide();
                    $('#not_license').show();
                }

            }).error(function(data, status) {
                alert('Տվյալների բազան լիցենյիայի համար չկա');
            });

        }
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
        var username = document.querySelector('#username').innerHTML,
            lesson_id = $('#jp_video_0').attr('data'),
            start_time = $('.st_min').val() + ':' + $('.st_sec').val(),
            end_time = $('.et_min').val() + ':' + $('.et_sec').val();

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
            loadTeachersMarkers(lesson_id);
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
            loadTeachersMarkers(that.items.lesson_id);
        });
    }







}]); /*end********դասերի բաժին*****/