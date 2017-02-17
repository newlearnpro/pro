var lab_work = function() {
    var obj = new GameWork();
    obj.bg_sound_all();
    interactive();

    function interactive() {
        $("#refresh").css("display", "block");

        var first_task = function() {
            obj.fnc_aud_append("task", task_now.task_audio, 1);
        };

        obj.fnc_aud_append("task_main", "main", 1500, "yes", first_task);



        refresh_req_click = function() {
            obj.fnc_aud_append("task", task_now.task_audio, 100);
        };

        var rainbow_violet = {
            color_id: "rainbow_violet",
            task_audio: "violet_task",
            false_audio: "violet_false",
            this_color_aud: "this_violet"
        };
        var rainbow_skyblue = {
            color_id: "rainbow_skyblue",
            task_audio: "skyblue_task",
            false_audio: "skyblue_false",
            this_color_aud: "this_skyblue"
        };
        var rainbow_red = {
            color_id: "rainbow_red",
            task_audio: "red_task",
            false_audio: "red_false",
            this_color_aud: "this_red"
        };
        var rainbow_green = {
            color_id: "rainbow_green",
            task_audio: "green_task",
            false_audio: "green_false",
            this_color_aud: "this_green"
        };
        var rainbow_orange = {
            color_id: "rainbow_orange",
            task_audio: "orange_task",
            false_audio: "orange_false",
            this_color_aud: "this_orange"
        };
        var rainbow_blue = {
            color_id: "rainbow_blue",
            task_audio: "blue_task",
            false_audio: "blue_false",
            this_color_aud: "this_blue"
        };
        var rainbow_yellow = {
            color_id: "rainbow_yellow",
            task_audio: "yellow_task",
            false_audio: "yellow_false",
            this_color_aud: "this_yellow"
        };

        var tasks = [rainbow_violet, rainbow_skyblue, rainbow_red, rainbow_green, rainbow_orange, rainbow_blue, rainbow_yellow];
        var task1_index = Math.floor(Math.random() * 7);
        var task_1 = tasks[task1_index];
        tasks.splice(task1_index, 1);

        var task2_index = Math.floor(Math.random() * 6);
        var task_2 = tasks[task2_index];
        tasks.splice(task2_index, 1);

        var task3_index = Math.floor(Math.random() * 5);
        var task_3 = tasks[task3_index];
        tasks.splice(task3_index, 1);

        var task4_index = Math.floor(Math.random() * 4);
        var task_4 = tasks[task4_index];
        tasks.splice(task4_index, 1);

        var task5_index = Math.floor(Math.random() * 3);
        var task_5 = tasks[task5_index];
        tasks.splice(task5_index, 1);

        var task6_index = Math.floor(Math.random() * 2);
        var task_6 = tasks[task6_index];
        tasks.splice(task6_index, 1);

        var task7_index = Math.floor(Math.random() * 1);
        var task_7 = tasks[task7_index];
        tasks.splice(task7_index, 1);

        task_1.next_task = task_2;
        task_2.next_task = task_3;
        task_3.next_task = task_4;
        task_4.next_task = task_5;
        task_5.next_task = task_6;
        task_6.next_task = task_7;

        task_2.prev_task = task_1;
        task_3.prev_task = task_2;
        task_4.prev_task = task_3;
        task_5.prev_task = task_4;
        task_6.prev_task = task_5;
        task_7.prev_task = task_6;

        var task_now = task_1;



        $("#part_laboratory").append("<div id='sun'></div>");
        var svg_rainbow =
            '<?xml version="1.0" encoding="utf-8"?> <svg version="1.1" id="rainbow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 960 560" enable-background="new 0 0 960 560" xml:space="preserve"> <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="488" y1="37.5264854" x2="488" y2="357.2520752"> <stop offset="0" style="stop-color:#F1F1F1"/> <stop offset="0.0545653" style="stop-color:#F0D0CB"/> <stop offset="0.1418944" style="stop-color:#EFA293"/> <stop offset="0.2270023" style="stop-color:#EE7B65"/> <stop offset="0.3078038" style="stop-color:#ED5C42"/> <stop offset="0.3832459" style="stop-color:#EC4728"/> <stop offset="0.4512851" style="stop-color:#EC3A18"/> <stop offset="0.505494" style="stop-color:#EC3513"/> <stop offset="1" style="stop-color:#F1F1F1"/> </linearGradient> <path id="rainbow_red" fill="url(#SVGID_1_)" d="M487.99823,100.1869965c-188.8871765,0-342.6469727,168.4756012-343.5775757,376.2739258h34.1576996 c0.9263-187.6880188,139.367691-338.680603,309.4198608-338.680603c170.0585938,0,308.4960938,150.9925842,309.4257813,338.680603 h34.1553345C830.6466064,268.6625977,676.8869629,100.1869965,487.99823,100.1869965z"/> <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="488.0011902" y1="75.7370605" x2="488.0011902" y2="399.4821777"> <stop offset="0" style="stop-color:#F1F1F1"/> <stop offset="0.0191624" style="stop-color:#F1EBE1"/> <stop offset="0.0888102" style="stop-color:#EFD7AD"/> <stop offset="0.1594674" style="stop-color:#EEC57F"/> <stop offset="0.2297933" style="stop-color:#EEB75A"/> <stop offset="0.2997327" style="stop-color:#EDAC3E"/> <stop offset="0.3692248" style="stop-color:#ECA429"/> <stop offset="0.4380434" style="stop-color:#ECA01D"/> <stop offset="0.505494" style="stop-color:#EC9E19"/> <stop offset="0.564703" style="stop-color:#ECA01E"/> <stop offset="0.63182" style="stop-color:#ECA52B"/> <stop offset="0.7028192" style="stop-color:#EDAE42"/> <stop offset="0.7765125" style="stop-color:#EEBA62"/> <stop offset="0.8523123" style="stop-color:#EFCA8B"/> <stop offset="0.9286956" style="stop-color:#F0DDBC"/> <stop offset="1" style="stop-color:#F1F1F1"/> </linearGradient> <path id="rainbow_orange" fill="url(#SVGID_2_)" d="M763.2668457,476.460907h34.1571655 C796.4943237,288.7728882,658.0568237,137.780304,487.99823,137.780304 c-170.0521851,0-308.4935913,150.9925842-309.4198608,338.680603h34.1527863c0.0039063,0,0.0083008,0,0.0117035,0h-0.0117035 C213.66185,310.2211914,336.779541,175.3686981,487.99823,175.3686981 C639.2218628,175.3686981,762.3400269,310.2211914,763.2668457,476.460907h-0.0079346H763.2668457z"/> <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="487.9989929" y1="115.9526672" x2="487.9989929" y2="413.5570068"> <stop offset="0" style="stop-color:#F1F1F1"/> <stop offset="0.078189" style="stop-color:#EFEDB7"/> <stop offset="0.1562811" style="stop-color:#EEEA85"/> <stop offset="0.2325957" style="stop-color:#EDE75C"/> <stop offset="0.3068076" style="stop-color:#ECE53C"/> <stop offset="0.3782995" style="stop-color:#EBE325"/> <stop offset="0.4458789" style="stop-color:#EBE218"/> <stop offset="0.505494" style="stop-color:#EBE213"/> <stop offset="0.5638133" style="stop-color:#EBE218"/> <stop offset="0.6299237" style="stop-color:#EBE325"/> <stop offset="0.6998615" style="stop-color:#ECE53C"/> <stop offset="0.7724603" style="stop-color:#EDE75C"/> <stop offset="0.847116" style="stop-color:#EEEA85"/> <stop offset="0.9235107" style="stop-color:#EFEDB7"/> <stop offset="1" style="stop-color:#F1F1F1"/> </linearGradient> <path id="rainbow_yellow" fill="url(#SVGID_3_)" d="M487.99823,175.3686981c-151.218689,0-274.3363647,134.8524933-275.2670898,301.0922241h34.156311 c0.9227905-146.1278992,108.5106812-263.5039063,241.1107788-263.5039063 c132.6016235,0,240.1895142,117.3760071,241.1162109,263.5039063h34.1524048 C762.3400269,310.2211914,639.2218628,175.3686981,487.99823,175.3686981z"/> <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="488.000946" y1="175.3665924" x2="488.000946" y2="425.6225586"> <stop offset="0" style="stop-color:#F1F1F1"/> <stop offset="0.0841586" style="stop-color:#C7E6C2"/> <stop offset="0.1883035" style="stop-color:#9AD98E"/> <stop offset="0.2860884" style="stop-color:#76CF65"/> <stop offset="0.374524" style="stop-color:#5CC847"/> <stop offset="0.4505997" style="stop-color:#4DC435"/> <stop offset="0.505494" style="stop-color:#47C22F"/> <stop offset="0.5939929" style="stop-color:#4AC332"/> <stop offset="0.6661505" style="stop-color:#53C53C"/> <stop offset="0.7325821" style="stop-color:#62C94D"/> <stop offset="0.7955575" style="stop-color:#77CF66"/> <stop offset="0.8561274" style="stop-color:#92D785"/> <stop offset="0.9148588" style="stop-color:#B3E0AB"/> <stop offset="0.9710557" style="stop-color:#DAEBD7"/> <stop offset="1" style="stop-color:#F1F1F1"/> </linearGradient> <path id="rainbow_green" fill="url(#SVGID_4_)" d="M487.99823,212.9570007c-132.6000977,0-240.1879883,117.3760071-241.1107788,263.5039063h34.1538086 c0.9271851-124.6766968,93.4012756-225.9130096,206.9569702-225.9130096 c113.5585938,0,206.0352173,101.2363129,206.9589844,225.9130096h34.1572266 C728.1877441,330.3330078,620.5998535,212.9570007,487.99823,212.9570007z"/> <linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="487.9992371" y1="210.4609985" x2="487.9992371" y2="411.545929"> <stop offset="0" style="stop-color:#F1F1F1"/> <stop offset="0.0377594" style="stop-color:#D7ECF0"/> <stop offset="0.1314645" style="stop-color:#9CE0EF"/> <stop offset="0.2218991" style="stop-color:#6BD6EE"/> <stop offset="0.3067629" style="stop-color:#45CEED"/> <stop offset="0.3847567" style="stop-color:#29C9ED"/> <stop offset="0.4534296" style="stop-color:#19C5EC"/> <stop offset="0.505494" style="stop-color:#13C4EC"/> <stop offset="0.5585246" style="stop-color:#18C5EC"/> <stop offset="0.6250848" style="stop-color:#28C8EC"/> <stop offset="0.698887" style="stop-color:#42CDED"/> <stop offset="0.777932" style="stop-color:#65D5EE"/> <stop offset="0.86119" style="stop-color:#93DEEF"/> <stop offset="0.9466208" style="stop-color:#CBE9F0"/> <stop offset="1" style="stop-color:#F1F1F1"/> </linearGradient> <path id="rainbow_skyblue" fill="url(#SVGID_5_)" d="M487.99823,250.5478973c-113.5556946,0-206.0297852,101.2363129-206.9569702,225.9130096h34.157196 c0.9223938-104.5703125,78.0791016-188.3178101,172.7997742-188.3178101 c94.7266235,0,171.8798828,83.7474976,172.8065796,188.3178101h34.1524048 C694.0334473,351.7842102,601.5568237,250.5478973,487.99823,250.5478973z"/> <linearGradient id="SVGID_6_" gradientUnits="userSpaceOnUse" x1="488.0016479" y1="226.5505676" x2="488.0016479" y2="445.731781"> <stop offset="0" style="stop-color:#F1F1F1"/> <stop offset="0.1037313" style="stop-color:#B0CBE7"/> <stop offset="0.2071438" style="stop-color:#78ABDF"/> <stop offset="0.3018574" style="stop-color:#4B91D9"/> <stop offset="0.3861428" style="stop-color:#2B7ED4"/> <stop offset="0.4568794" style="stop-color:#1873D1"/> <stop offset="0.505494" style="stop-color:#116FD0"/> <stop offset="0.5667201" style="stop-color:#1572D1"/> <stop offset="0.6325835" style="stop-color:#2279D3"/> <stop offset="0.7006348" style="stop-color:#3886D6"/> <stop offset="0.7701914" style="stop-color:#5697DA"/> <stop offset="0.8409346" style="stop-color:#7DAEE0"/> <stop offset="0.9126535" style="stop-color:#ACC9E7"/> <stop offset="0.9839048" style="stop-color:#E3E9EF"/> <stop offset="1" style="stop-color:#F1F1F1"/> </linearGradient> <path id="rainbow_blue" fill="url(#SVGID_6_)" d="M487.99823,288.1430969c-94.7206726,0-171.8773804,83.7474976-172.7997742,188.3178101h34.1537781 c0.9219055-84.4588928,62.7593079-150.7299194,138.6459961-150.7299194 c75.8916016,0,137.7246094,66.2710266,138.6494141,150.7299194h34.1571655 C659.8781128,371.8905945,582.7248535,288.1430969,487.99823,288.1430969z"/> <linearGradient id="SVGID_7_" gradientUnits="userSpaceOnUse" x1="484.9260559" y1="316.0273438" x2="490.2431641" y2="593.2728882"> <stop offset="0" style="stop-color:#7B15FF"/> <stop offset="1" style="stop-color:#FFF7EA"/> </linearGradient> <path id="rainbow_violet" fill="url(#SVGID_7_)" d="M487.99823,325.7309875c-75.8866882,0-137.7240906,66.2710266-138.6459961,150.7299194h30.4512024 c0.922821-65.6923218,49.098114-117.2129211,108.1947937-117.2129211c59.0977173,0,107.2753906,51.5205994,108.1973267,117.2129211 h30.4520874C625.7228394,392.0020142,563.8898315,325.7309875,487.99823,325.7309875z"/> </svg>';
        $("#part_laboratory").append("<div id='rainbow_main'></div>");
        $("#rainbow_main").html(svg_rainbow);
        $("#part_laboratory").append("<div id='cloud1'></div>");
        $("#part_laboratory").append("<div id='cloud2'></div>");
        $("#part_laboratory").append("<div id='cloud3'></div>");
        $("#part_laboratory").append("<div id='cloud4'></div>");
        $("#part_laboratory").append("<div id='btn_prev' class='btn_game'><a href='#'></a></div>");
        $("#part_laboratory").append("<div id='btn_next' class='btn_game'><a href='#'></a></div>");

        $("#part_laboratory").append("<div id='off_rainbow'></div>");

        color_task = task_1;
        $("#rainbow_main path").bind("click", function() {
            $(this).css({ "stroke-width": "0" });
            if (color_task.color_id == $(this).attr("id")) {
                obj.wrong_count = 0;
                if (color_task != task_7) {
                    color_task = color_task.next_task;
                    task_now = color_task;
                    var next_task = function() {
                        obj.fnc_aud_append("task", task_now.task_audio, 1);
                    };
                    obj.fnc_aud_append("true_answer", "true", 1, "yes", next_task);
                    $("#btn_next").css({
                        "display": "none"
                    });
                } else {
                    obj.fnc_aud_append("true_answer", "true_next", 1);
                    $("#off_rainbow").css({
                        "display": "block"
                    });
                    $("#btn_next").fadeIn(300);
                }
            } else {
                obj.wrong_count++;
                var this_id = $(this).attr("id");
                task_now = color_task;
                var next_color = function() {
                    obj.fnc_aud_append("task", task_now.task_audio, 1);
                };
                var this_color = function() {
                    obj.fnc_aud_append("this_color", eval(this_id).this_color_aud, 1, "yes", next_color);
                };
                obj.fnc_aud_append("false_answer", task_now.false_audio, 1, "yes", this_color);


                if (obj.wrong_count == 2) {
                    $("#btn_next").fadeIn(300);
                    obj.wrong_count = 0;
                } else if (obj.wrong_count > 2) {
                    $("#btn_next").css({
                        "display": "block"
                    });
                    obj.wrong_count = 0;
                }
            }
        });
        $("#btn_next").bind("click", function() {
            obj.refreshSim = "no";
            obj.wrong_count = 0;
            if (color_task != task_7) {
                $("#btn_next").css({
                    "display": "none"
                });
                $("#off_rainbow").css({
                    "display": "none"
                });
                color_task = color_task.next_task;
                task_now = color_task;
                obj.fnc_aud_append("task", task_now.task_audio, 500);
            } else {
               // window.top.location.href = "http://www.learnpro.am/node/10289";
			   parent.document.getElementsByClassName("lesson_selected")[0].parentElement.nextElementSibling.firstElementChild.click();
            }
        });
        $("#btn_prev").bind("click", function() {
            obj.refreshSim = "no";
            obj.wrong_count = 0;
            if (color_task != task_1) {
                $("#btn_next").css({
                    "display": "none"
                });
                $("#off_rainbow").css({
                    "display": "none"
                });
                color_task = color_task.prev_task;
                task_now = color_task;
                obj.fnc_aud_append("task", task_now.task_audio, 500);
            } else {
               // window.top.location.href = "http://www.learnpro.am/node/10265";
			   parent.document.getElementsByClassName("lesson_selected")[0].parentElement.previousElementSibling.firstElementChild.click();
            }
        });
    }

};

(function($) {
    $("document").ready(function() {
        setTimeout(function() {
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
                "assets/app/img/cloud1.png",
                "assets/app/img/cloud3.png",
                "assets/app/img/cloud4.png",
                "assets/app/img/sun.png"
            ).then(
                function finishCallback() {
                    setTimeout(function() {
                        $("#gl_border").remove();
                        var obj2 = new GameWork();
                        var op_sytem = obj2.systemOs();
                        if (op_sytem == "Android" || op_sytem == "iOS") {
                            $("#part_laboratory").append("<div id='touch_parent'></div>");
                            $("#touch_parent").append("<div id='hand'></div>");
                            $("#touch_parent").bind("click", function() {
                                $("#game_loader, #touch_parent").remove();
                                lab_work();
                            });
                        } else {
                            $("#game_loader").remove();
                            lab_work();
                        }
                    }, 300);
                },
                function errorCallback(err) {
                    console.error(err.message);
                },
                function progressCallback(progress) {
                    var percent_val = Math.round((progress.loaded / progress.total) * 100);
                    $("#loading_bar").css({ "width": percent_val + "%" });
                    $("#loading_percent").html(percent_val + "%");
                });
        }, 200);
    });
})(jQuery);
