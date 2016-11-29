$("document").ready(function() {
    lab_work();
});
var lab_work = function() {
    var backgroundAudio, audio_1;
    var bg_sound_vol = 0.4;
    var audio_timeout1, audio_interval1;
    var refresh_type = "no";

    function bg_sound_all() {
        $("#part_laboratory").append("<div id='bg_sound'></div>");
        var bg_sound = "on";
        $("#bg_sound").bind("click", function() {
            if (bg_sound == "on") {
                $("#bg_sound").css({
                    "background-image": "url(assets/common/img/bg_sound_off.png)"
                });
                backgroundAudio.volume = 0;
                bg_sound = "off";
            } else if (bg_sound == "off") {
                $("#bg_sound").css({
                    "background-image": "url(assets/common/img/bg_sound.png)"
                });
                backgroundAudio.volume = bg_sound_vol;
                bg_sound = "on";
            }
        });
        $("#part_laboratory").append('<audio id="bg_audio"> <source src="assets/app/audio/bg.ogg" type="audio/ogg"/> <source src="assets/app/audio/bg.mp3" type="audio/mpeg"/></audio>');
        backgroundAudio = document.getElementById("bg_audio");
        backgroundAudio.volume = bg_sound_vol;
        backgroundAudio.load();
        backgroundAudio.play();
        backgroundAudio.addEventListener('timeupdate', function() {
            var buffer = 0.44;
            if (this.currentTime > this.duration - buffer) {
                this.currentTime = 0;
                this.play();
            }
        }, false);
    }

    bg_sound_all();

    interactive(1);
    var wrong_count = 0;

    function interactive(type) {
        function fnc_aud_append(id, audio_name, start_duration, puls1_el, puls1_start, puls1_dur, pils2_el, puls2_start, puls2_dur, puls3_el, puls3_start, puls3_dur, func_on, func) {
            $("#" + id).remove();
            $("#part_laboratory").append("<div id='off_all'></div>");
            $("#part_laboratory").append('<audio id="' + id + '"> <source src="assets/app/audio/' + audio_name + '.ogg" type="audio/ogg"/> <source src="assets/app/audio/' + audio_name + '.mp3" type="audio/mpeg"/></audio>');
            audio_1 = document.getElementById(id);
            audio_timeout1 = setTimeout(function() {
                audio_1.play();
                audio_interval1 = setInterval(function() {
                    var currentTime = audio_1.currentTime;
                    if (currentTime >= puls1_start && currentTime <= (puls1_start + puls1_dur)) {
                        animation_pulsate(puls1_el, puls1_dur);
                    } else if (currentTime >= puls2_start && currentTime <= (puls2_start + puls2_dur)) {
                        animation_pulsate(pils2_el, puls2_dur);
                    } else if (currentTime >= puls3_start && currentTime <= (puls3_start + puls3_dur)) {
                        animation_pulsate(puls3_el, puls3_dur);
                    }

                }, 100);
                audio_1.onended = function() {
                    clearInterval(audio_interval1);
                    $("#off_all").remove();
                    refresh_req();
                    $("#requirement_ref").css({
                        "background-image": "url(assets/common/img/req1.png)"
                    });
                    if (id == "true_answer") {
                        $("#requirement_ref").css({
                            "display": "none"
                        });
                    }
                    if (func_on == "yes") {
                        func();
                    }
                };
            }, start_duration);
        }

        function refresh_req() {
            $("#requirement_ref").remove();
            $("#part_laboratory").append("<div id='requirement_ref'></div>");
            $("#requirement_ref").bind("click", function() {
                $(this).css({
                    "background-image": "url(assets/common/img/req2.png)"
                });
                if (type == 1) {
                    fnc_aud_append("task", "task1", 1);
                } else if (type == 2) {
                    fnc_aud_append("task", "task2", 1);
                }
            });
        }

        function animation_pulsate(element, duration) {
            element.css({
                "animation": "pulse " + duration + "s linear"
            });
        }


        $("#part_laboratory").append("<div id='shelf_1'></div>");
        $("#part_laboratory").append("<div id='shelf_2'></div>");
        $("#part_laboratory").append("<div id='cactus1_drag' class='cactus1 cactus drag_obj' data-type='cactus'></div>");
        $("#part_laboratory").append("<div id='cup1_drag' class='cup1 drag_obj' data-type='cup1'></div>");
        $("#part_laboratory").append("<div id='bicycle1_drag' class='bicycle1_1 bicycle1 drag_obj' data-type='bicycle1'></div>");
        $("#part_laboratory").append("<div id='cherry1_drag' class='cherry1 drag_obj' data-type='cherry1'></div>");
        $("#part_laboratory").append("<div id='bicycle2_drag' class='bicycle2_1 bicycle2 drag_obj' data-type='bicycle2'></div>");
        $("#part_laboratory").append("<div id='strawberry1_drag' class='strawberry drag_obj' data-type='strawberry'></div>");
        $("#part_laboratory").append("<div id='bicycle3_drag' class='bicycle2 drag_obj' data-type='bicycle2'></div>");
        $("#part_laboratory").append("<div id='cream_drag' class='cream drag_obj' data-type='cream'></div>");
        $("#part_laboratory").append("<div id='cup2_drag' class='cup2 cup2_1 drag_obj' data-type='cup2'></div>");
        $("#part_laboratory").append("<div id='strawberry2_drag' class='strawberry drag_obj' data-type='strawberry'></div>");
        $("#part_laboratory").append("<div id='cup3_drag' class='cup2 drag_obj' data-type='cup2'></div>");
        $("#part_laboratory").append("<div id='cherry2_drag' class='cherry2 drag_obj' data-type='cherry2'></div>");
        $("#part_laboratory").append("<div id='cactus2_drag' class='cactus2 cactus drag_obj' data-type='cactus'></div>");
        $("#part_laboratory").append("<div id='pear_drag' class='pear drag_obj' data-type='pear'></div>");
        $("#part_laboratory").append("<div id='bicycle4_drag' class='bicycle1_2 bicycle1 drag_obj' data-type='bicycle1'></div>");
        $("#part_laboratory").append("<div id='btn_prev' class='btn_game'><a href='#'></a></div>");
        $("#part_laboratory").append("<div id='btn_next' class='btn_game'><a href='#'></a></div>");
        $("#part_laboratory").append("<div id='obj_drop'><div id='obj_drop2'></div></div>");
        type_images();

        function type_images() {
            if (type == 2) {
                $("#refresh").css({
                    "display": "block"
                });
                $("#cactus1_drag, #cactus2_drag").css({
                    "background-image": "url(assets/app/img/red_triangle.png)"
                });
                $("#cup1_drag").css({
                    "background-image": "url(assets/app/img/orange_oval.png)"
                });
                $("#bicycle1_drag, #bicycle4_drag").css({
                    "background-image": "none",
                    "background-color": "#0099AD"
                });
                $("#cherry1_drag").css({
                    "background-image": "url(assets/app/img/green_square.png)"
                });
                $("#bicycle2_drag, #bicycle3_drag").css({
                    "background-image": "url(assets/app/img/pink_star.png)"
                });
                $("#strawberry1_drag, #strawberry2_drag").css({
                    "background-image": "url(assets/app/img/blue_circle.png)"
                });
                $("#cream_drag").css({
                    "background-image": "url(assets/app/img/orange_rect.png)"
                });
                $("#cup2_drag, #cup3_drag").css({
                    "background-image": "url(assets/app/img/blue_triangle.png)"
                });
                $("#cherry2_drag").css({
                    "background-image": "url(assets/app/img/red_parall.png)"
                });
                $("#pear_drag").css({
                    "background-image": "url(assets/app/img/yellow_tab.png)"
                });
                $("#cactus2_drag").removeClass("cactus2").addClass("red_triangle");
                $("#cup1_drag").removeClass("cup1").addClass("orange_oval");
                $("#bicycle1_drag").removeClass("bicycle1_1").addClass("blue_rect");
                $("#bicycle4_drag").removeClass("bicycle1_2").addClass("blue_rect2");
                $("#cherry1_drag").removeClass("cherry1").addClass("green_square");
                $("#bicycle2_drag").removeClass("bicycle2_1").addClass("pink_star");
                $("#cream_drag").removeClass("cream").addClass("orange_rect");
                $("#cup2_drag").removeClass("cup2_1").addClass("blue_triangle");
                $("#cherry2_drag").removeClass("cherry2").addClass("red_parall");
                $("#pear_drag").removeClass("paer").addClass("green_table");
            } else if (type == 1) {
                $("#refresh").css({
                    "display": "none"
                });
            }
        }


        if (refresh_type == "no") {
            if (type == 1) {
                fnc_aud_append("task", "task1", 2000, $("#shelf_1"), 0.1, 1, $("#shelf_2"), 4.3, 0.6);
            } else if (type == 2) {
                fnc_aud_append("task", "task2", 2000, $("#shelf_1"), 0.1, 1, $("#shelf_2"), 8.3, 0.6);
            }
        }


        $("#btn_next").bind("click", function() {
            wrong_count = 0;
            if (type == 1) {
                refresh_int();
                interactive(2);
            } else if (type == 2) {}
        });
        $("#btn_prev").bind("click", function() {
            wrong_count = 0;
            if (type == 1) {} else if (type == 2) {
                refresh_int();
                interactive(1);
            }
        });
        fnc_drag_maker($(".drag_obj"));
        var active_drop_class, active_id, twin_id;
        var twin_count = 0;
        $("#obj_drop").droppable({
            accept: ".drag_obj",
            tolerance: "fit",
            drop: function(event, ui) {
                ui.draggable.appendTo("#obj_drop2").addClass("dropped").draggable({
                    disabled: true
                });
                if (active_drop_class === undefined || active_drop_class === null) {
                    ui.draggable.addClass("first_child");
                    active_drop_class = ui.draggable.attr("data-type");
                } else {
                    active_id = $('#obj_drop2 div[data-type="' + active_drop_class + '"]').attr("id");
                    var active_class = $('#obj_drop2 div[data-type="' + active_drop_class + '"]').attr("class");
                    var active_data = $('#obj_drop2 div[data-type="' + active_drop_class + '"]').attr("data-type");
                    twin_id = ui.draggable.attr("id");
                    var twin_class = ui.draggable.attr("class");
                    var twin_data = ui.draggable.attr("data-type");
                    ui.draggable.addClass("last_child");
                    if (ui.draggable.attr("data-type") == active_drop_class) {
                        wrong_count = 0;
                        $("#" + active_id).fadeOut(500, function() {
                            $(this).remove();
                        });
                        $("#" + twin_id).fadeOut(500, function() {
                            $(this).remove();
                        });
                        twin_count = twin_count + 1;
                        if (twin_count == 5) {
                            $("#btn_next").fadeIn(500);
                            fnc_aud_append("true_answer", "true", 1);
                            $("#obj_drop").droppable({
                                disabled: true
                            });
                        }
                    } else {
                        fnc_aud_append("false_answer", "false", 1);
                        wrong_count = wrong_count + 1;
                        $("#" + active_id).fadeOut(500, function() {
                            $(this).remove();
                            $("#part_laboratory").append("<div id='" + active_id + "' class='" + active_class + "' data-type='" +
                                active_data + "'></div>");
                            $("#" + active_id).removeClass("dropped").removeClass("first_child").removeClass("last_child");
                            fnc_drag_maker($("#" + active_id));
                            type_images();
                        });
                        $("#" + twin_id).fadeOut(500, function() {
                            $(this).remove();
                            $("#part_laboratory").append("<div id='" + twin_id + "' class='" + twin_class + "' data-type='" + twin_data +
                                "'></div>");
                            $("#" + twin_id).removeClass("dropped").removeClass("first_child").removeClass("last_child");
                            fnc_drag_maker($("#" + twin_id));
                            type_images();
                        });
                        if (wrong_count >= 4) {
                            $("#btn_next").fadeIn(300);
                        }
                    }
                    active_drop_class = undefined;
                }
                fnc_drop_pos(ui.draggable.attr("id"));
            }
        });

        function fnc_drag_maker(element) {
            element.draggable({
                cursor: "pointer",
                zIndex: "100",
                revert: "invalid",
                containment: "#part_laboratory",
                stop: function(event, ui) {
                    ui.helper.removeAttr("style");
                    fnc_drop_pos($(this).attr("id"));
                    type_images();
                }
            });

            fnc_cursorAt_all();
        }
    }

    function fnc_drop_pos(element_id) {
        if ($("#" + element_id).parent().attr("id") == "obj_drop2") {
            $("#" + element_id).css({
                "margin-top": ($("#obj_drop2").height() - $("#" + element_id).height()) + "px"
            });
            var all_width = 0;
            $('*', '#obj_drop2').each(function() {
                all_width += $(this).width();
            });
            var last_c_margin = parseInt($(".last_child").css("margin-left"));
            if (isNaN(last_c_margin)) {
                last_c_margin = 0;
            }
            all_width = all_width + last_c_margin;
            $(".first_child").css({
                "margin-left": (($("#obj_drop2").width() - all_width) / 2) + "px"
            });
        }
    }
    $(window).resize(function() {
        fnc_cursorAt_all();
        fnc_drop_pos_all();
    });

    function fnc_cursorAt(element_id) {
        var c_at_left = $("#" + element_id).width() / 2;
        var c_at_top = $("#" + element_id).height() / 2;
        $("#" + element_id).draggable('option', 'cursorAt', {
            left: c_at_left,
            top: c_at_top
        });
    }

    function fnc_cursorAt_all() {
        fnc_cursorAt("cactus1_drag");
        fnc_cursorAt("cup1_drag");
        fnc_cursorAt("bicycle1_drag");
        fnc_cursorAt("cherry1_drag");
        fnc_cursorAt("bicycle2_drag");
        fnc_cursorAt("bicycle3_drag");
        fnc_cursorAt("strawberry1_drag");
        fnc_cursorAt("cream_drag");
        fnc_cursorAt("cup2_drag");
        fnc_cursorAt("strawberry2_drag");
        fnc_cursorAt("cup3_drag");
        fnc_cursorAt("cherry2_drag");
        fnc_cursorAt("cactus2_drag");
        fnc_cursorAt("pear_drag");
        fnc_cursorAt("bicycle4_drag");
    }

    function fnc_drop_pos_all() {
        fnc_drop_pos("cactus1_drag");
        fnc_drop_pos("cup1_drag");
        fnc_drop_pos("bicycle1_drag");
        fnc_drop_pos("cherry1_drag");
        fnc_drop_pos("bicycle2_drag");
        fnc_drop_pos("bicycle3_drag");
        fnc_drop_pos("strawberry1_drag");
        fnc_drop_pos("cream_drag");
        fnc_drop_pos("cup2_drag");
        fnc_drop_pos("strawberry2_drag");
        fnc_drop_pos("cup3_drag");
        fnc_drop_pos("cherry2_drag");
        fnc_drop_pos("cactus2_drag");
        fnc_drop_pos("pear_drag");
        fnc_drop_pos("bicycle4_drag");
    }

    function refresh_int() {
        var arr = $('#part_laboratory *').map(function() {
            return this.id;
        }).get();
        for (var i = 0; i < arr.length; i++) {
            if ($("#" + arr[i]).hasClass("ui-draggable")) {
                $("#" + arr[i]).draggable("destroy");
            } else if ($("#" + arr[i]).hasClass("ui-droppable")) {
                $("#" + arr[i]).droppable("destroy");
            }
        }
        $("#part_laboratory *:not('#refresh'):not('.fullscreen'):not('#bg_sound'):not('#bg_audio')").remove();
    }

    $("#refresh").click(function() {
        clearTimeout(audio_timeout1);
    });
};