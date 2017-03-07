var lab_work = function() {
    var obj = new GameWork();
    obj.bg_sound_all();
    interactive(1);
    var timeout1;

  
    
    function interactive(type) {
        refresh_req_click = function() {
            if (type == 1 || type == 2) {
                obj.fnc_aud_append("task_1_2", "task1", 1);
            } else if (type == 3 || type == 4) {
                obj.fnc_aud_append("task_3_4", "task3", 1);
            }
        };

        $("#part_laboratory").append("<div id='school_girl'></div>");
        $("#school_girl").append("<div id='mouth'></div>");
        $("#part_laboratory").append("<div id='shelf'></div>");
        $("#shelf").append("<div id='beads' class='beads_" + type + "'></div>");
        $("#part_laboratory").append("<div id='type' class='type_" + type + "'></div>");

        if ((type == 1) || (type == 2)) {
            $("#part_laboratory").append("<div id='border_true' class='border_true_" + type + "'></div>");
            $("#part_laboratory").append("<div id='b_click1' class='beads_click b_click1_" + type + "'></div>");
            $("#part_laboratory").append("<div id='b_click2' class='beads_click b_click2_" + type + "'></div>");
            $("#part_laboratory").append("<div id='b_click3' class='beads_click b_click3_" + type + "'></div>");
            $("#part_laboratory").append("<div id='b_click4' class='beads_click b_click4_" + type + "'></div>");
            $("#part_laboratory").append("<div id='b_click5' class='beads_click b_click5_" + type + "'></div>");
            $("#part_laboratory").append("<div id='b_click6' class='beads_click b_click6_" + type + "'></div>");
            $("#part_laboratory").append("<div id='b_click7' class='beads_click b_click7_" + type + "'></div>");
            $("#part_laboratory").append("<div id='b_click8' class='beads_click b_click8_" + type + "'></div>");
            $("#part_laboratory").append("<div id='b_click9' class='beads_click b_click9_" + type + "'></div>");
            $("#part_laboratory").append("<div id='b_click10' class='beads_click b_click10_" + type + "'></div>");
            obj.fnc_aud_append("task_1_2", "task1", 2000, undefined, undefined, $("#beads"), 2.4, 1);
        } else if ((type == 3) || (type == 4)) {
            $("#beads").css({
                "z-index": "10"
            });
            $("#part_laboratory").append("<div id='shelf2'></div>");
            $("#part_laboratory").append("<div id='drop_1' class='drop_obj drop_1_" + type + "'></div>");
            $("#part_laboratory").append("<div id='drop_2' class='drop_obj drop_2_" + type + "'></div>");
            $("#part_laboratory").append("<div id='drop_3' class='drop_obj drop_3_" + type + "'></div>");
            $("#part_laboratory").append("<div id='drop_4' class='drop_obj drop_4_" + type + "'></div>");
            $("#part_laboratory").append("<div id='drop_5' class='drop_obj drop_5_" + type + "'></div>");

            $("#shelf2").append("<div id='drag_1' class='drag_obj drag_1_" + type + "'></div>");
            $("#shelf2").append("<div id='drag_2' class='drag_obj drag_2_" + type + "'></div>");
            $("#shelf2").append("<div id='drag_3' class='drag_obj drag_3_" + type + "'></div>");
            $("#shelf2").append("<div id='drag_4' class='drag_obj drag_4_" + type + "'></div>");
            $("#shelf2").append("<div id='drag_5' class='drag_obj drag_5_" + type + "'></div>");
            if (obj.refreshSim == "no") {
                obj.fnc_aud_append("task_3_4", "task3", 2000, undefined, undefined, $(".drag_obj"), 7, 0.7);
            }

            if (type == 3) {
                $("#drop_1").addClass("drag_2 drag_3");
                $("#drop_2").addClass("drag_2 drag_3");
                $("#drop_3").addClass("drag_1 drag_4");
                $("#drop_4").addClass("drag_1 drag_4");
            } else if (type == 4) {
                $("#shelf2").addClass("shelf2_4type");
                $("#drop_1").addClass("drag_1 drag_2 drag_3");
                $("#drop_2").addClass("drag_4 drag_5");
                $("#drop_3").addClass("drag_1 drag_2 drag_3");
                $("#drop_4").addClass("drag_4 drag_5");
                $("#drop_5").addClass("drag_1 drag_2 drag_3");
            }
        }

        $(".drop_obj").droppable({
            accept: ".drag_obj",
            tolerance: "fit",
            drop: function(event, ui) {
                $(this).droppable({
                    disabled: true
                });
                ui.draggable.appendTo($(this)).addClass("dropped").draggable({
                    disabled: true
                });
                if ($(this).hasClass(ui.draggable.attr("id"))) {
                    ui.draggable.addClass("true");
                }
                var length_dropped;
                if (type == 3) {
                    length_dropped = 4;
                } else if (type == 4) {
                    length_dropped = 5;
                }
                if ($(".dropped").length == length_dropped) {
                    if ($(".true").length == length_dropped) {
                        $("#mouth").css({
                            "background-image": "url(assets/app/img/mouth2.png)",
                            "transform": "rotate(0)",
                            "-webkit-transform": "rotate(0)",
                            "-ms-transform": "rotate(0)"
                        });
                        $("#btn_next, #border_true").fadeIn(300);
                        obj.fnc_aud_append("true_answer", "true", 1);
                        obj.wrong_count = 0;
                    } else {
                        $("#mouth").css({
                            "background-image": "url(assets/app/img/mouth2.png)",
                            "transform": "rotate(180deg)",
                            "-webkit-transform": "rotate(180deg)",
                            "-ms-transform": "rotate(180deg)"
                        });
                        obj.refreshSim = "yes";
                        obj.refresh_lab();
                        interactive(type);
                        obj.fnc_aud_append("false_answer", "false", 1);
                        obj.wrong_count++;
                        if (obj.wrong_count == 2) {
                            $("#btn_next").fadeIn(300);
                        }
                        if (obj.wrong_count > 2) {
                            $("#btn_next").css({
                                "display": "block"
                            });
                        }

                    }
                }
            }
        });

        $(".drag_obj").draggable({
            cursor: "pointer",
            zIndex: "100",
            revert: "invalid",
            containment: "#part_laboratory",
            stop: function(event, ui) {
                ui.helper.removeAttr("style");
            }
        });

        fnc_cursorAt_all();

        $("#part_laboratory").append("<div id='btn_prev' class='btn_game'><a href='#'></a></div>");
        $("#part_laboratory").append("<div id='btn_next' class='btn_game'><a href='#'></a></div>");
        if (type == 4) {
            $("#refresh").css({
                "display": "block"
            });
        } else {
            $("#refresh").css({
                "display": "none"
            });
        }

        $(".beads_click").bind("click", function() {
            if ($(this).attr("id") == "b_click8") {
                if (type == 1) {
                    $("#b_click8").css({
                        "background-image": "url(assets/app/img/t1_true.png)"
                    });
                } else if (type == 2) {
                    $("#b_click8").css({
                        "background-image": "url(assets/app/img/t2_true.png)"
                    });
                }
                $("#b_click8").css({
                    "z-index": "10",
                    "display": "none",
                    "cursor": "default"
                });
                timeout1 = setTimeout(function() {
                    $("#border_true").fadeOut(1000);
                    $("#b_click8").fadeIn(1000);
                }, 1500);
                obj.fnc_aud_append("true_answer", "true", 1);

                $("#mouth").css({
                    "background-image": "url(assets/app/img/mouth2.png)",
                    "transform": "rotate(0)",
                    "-webkit-transform": "rotate(0)",
                    "-ms-transform": "rotate(0)"
                });
                $("#btn_next, #border_true").fadeIn(300);
                obj.wrong_count = 0;
                $(".beads_click").unbind("click");
                $("#shelf").css({
                    "z-index": "10"
                });
            } else {
                $("#mouth").css({
                    "background-image": "url(assets/app/img/mouth2.png)",
                    "transform": "rotate(180deg)",
                    "-webkit-transform": "rotate(180deg)",
                    "-ms-transform": "rotate(180deg)"
                });
                obj.wrong_count++;
                if (obj.wrong_count == 2) {
                    $("#btn_next").fadeIn(300);
                }
                if (obj.wrong_count > 2) {
                    $("#btn_next").css({
                        "display": "block"
                    });
                }
                obj.fnc_aud_append("false_answer", "false", 1);
            }
        });

        $("#btn_next").bind("click", function() {
            obj.refreshSim = "no";
            obj.wrong_count = 0;
            if (type == 4) {
               // window.top.location.href = "http://www.learnpro.am/node/10293";
			    parent.document.getElementsByClassName("lesson_selected")[0].parentElement.nextElementSibling.firstElementChild.click();
            } else {

                obj.refresh_lab();
                interactive(type + 1);
            }
        });

        $("#btn_prev").bind("click", function() {
            obj.refreshSim = "no";
            obj.wrong_count = 0;
            if (type == 1) {
              //  window.top.location.href = "http://www.learnpro.am/node/10290";
			  parent.document.getElementsByClassName("lesson_selected")[0].parentElement.previousElementSibling.firstElementChild.click();
            } else {
                obj.refresh_lab();
                interactive(type - 1);
            }
        });


        $(window).resize(function() {
            fnc_cursorAt_all();
        });

        function fnc_cursorAt_all() {
            obj.fnc_cursorAt("#drag_1");
            obj.fnc_cursorAt("#drag_2");
            obj.fnc_cursorAt("#drag_3");
            obj.fnc_cursorAt("#drag_4");
            obj.fnc_cursorAt("#drag_5");
        }

        $("#refresh").click(function() {
            clearTimeout(timeout1);
        });

    }
};

(function($) {
    $("document").ready(function() {
        setTimeout(function(){
            // loader image &audio
            kontra.loadAssets(
                            /// common images
                            "assets/common/img/bg_sound.png",
                            "assets/common/img/bg_sound_off.png",
                            "assets/common/img/next.png",
                            "assets/common/img/next2.png",
                            "assets/common/img/prev.png",
                            "assets/common/img/prev2.png",
                            "assets/common/img/refresh.png",
                            "assets/common/img/refresh2.png",
                            "assets/common/img/req1.png",
                            "assets/common/img/req2.png",
                            "assets/common/img/hand.gif",
                            ///end common images
                            "assets/app/img/beads.png",
                            "assets/app/img/beads_1.png",
                            "assets/app/img/beads_2.png",
                            "assets/app/img/beads_3.png",
                            "assets/app/img/beads_4.png",
                            "assets/app/img/blue_ball.png",
                            "assets/app/img/green_ball.png",
                            "assets/app/img/mouth1.png",
                            "assets/app/img/mouth2.png",
                            "assets/app/img/red_ball.png",
                            "assets/app/img/school_girl.png",
                            "assets/app/img/shelf.png",
                            "assets/app/img/shelf2.png",
                            "assets/app/img/t1_true.png",
                            "assets/app/img/t2_true.png",
                            "assets/app/img/type.png",
                            "assets/app/img/type_1.png",
                            "assets/app/img/type_2.png",
                            "assets/app/img/type_3.png",
                            "assets/app/img/type_4.png",
                            "assets/app/audio/bg.mp3",
                            "assets/app/audio/bg.ogg",
                            "assets/app/audio/false.mp3",
                            "assets/app/audio/false.ogg",
                            "assets/app/audio/task1.mp3",
                            "assets/app/audio/task1.ogg",
                            "assets/app/audio/task3.mp3",
                            "assets/app/audio/task3.ogg",
                            "assets/app/audio/true.mp3",
                            "assets/app/audio/true.ogg"
                            ).then(
            function finishCallback() {
                setTimeout(function(){
                    $("#gl_border").remove();
                    var obj2 = new GameWork();
                    var op_sytem = obj2.systemOs();
                    if (op_sytem == "Android" || op_sytem == "iOS") {
                        $("#part_laboratory").append("<div id='touch_parent'></div>");
                            $("#touch_parent").append("<div id='hand'></div>");
                        $("#touch_parent").bind("click", function(){
                            $("#game_loader, #touch_parent").remove();
                            lab_work();
                        });
                    }
                    else {
                        $("#game_loader").remove();
                        lab_work();
                    }
                }, 300);
            }, function errorCallback(err) {
                console.error(err.message);
            }, function progressCallback(progress) {
                var percent_val = Math.round((progress.loaded / progress.total) * 100);
                $("#loading_bar").css({"width": percent_val + "%"});
                $("#loading_percent").html(percent_val + "%")
            });
        }, 200);
    });
})(jQuery);