function GameWork() {
    /// audio ///
    window.g_audio_var = {
    	game_audio1: undefined,
    	game_audio2: undefined,
    	game_audio3: undefined,
    	game_audio4: undefined,
    	game_audio5: undefined,
    	game_a_timeout1: undefined,
    	game_a_timeout2: undefined,
    	game_a_timeout3: undefined,
    	game_a_timeout4: undefined,
    	game_a_timeout5: undefined,
    	game_a_interval1: undefined,
    	game_a_interval2: undefined,
    	game_a_interval3: undefined,
    	game_a_interval4: undefined,
    	game_a_interval5: undefined,
    	bg_audio: undefined,
    	bg_volume: 0.5,
    	refreshSim: "no",
    	wrong_count: 0	
    }; 

    this.refreshSim = g_audio_var.refreshSim;
    this.wrong_count = g_audio_var.wrong_count;

    // bg_audio_effect
    this.bg_sound_all = function() {
        var bg_sound = "on";
        $("#part_laboratory").append('<audio id="bg_audio"> <source src="assets/app/audio/bg.ogg" type="audio/ogg"/> <source src="assets/app/audio/bg.mp3" type="audio/mpeg"/></audio>');
        g_audio_var.bg_audio = document.getElementById("bg_audio");
        g_audio_var.bg_audio.volume = g_audio_var.bg_volume;
        g_audio_var.bg_audio.load();
        g_audio_var.bg_audio.play();
        g_audio_var.bg_audio.addEventListener('timeupdate', function() {
            var buffer = 0.44;
            if (this.currentTime > this.duration - buffer) {
                this.currentTime = 0;
                this.play();
            }
        }, false);
        $("#part_laboratory").append("<div id='bg_sound_icon'></div>");
        $("#bg_sound_icon").bind("click", function() {
            if (bg_sound == "on") {
                $("#bg_sound_icon").css({
                    "background-image": "url(assets/common/img/bg_sound_off.png)"
                });
                g_audio_var.bg_audio.volume = 0;
                bg_sound = "off";
            } else if (bg_sound == "off") {
                $("#bg_sound_icon").css({
                    "background-image": "url(assets/common/img/bg_sound.png)"
                });
                g_audio_var.bg_audio.volume = g_audio_var.bg_volume;
                bg_sound = "on";
            }
        });
    };

	// other audio
	this.fnc_aud_append = function(id, audio_name, start_duration, func_on, func, puls1_el, puls1_start, puls1_dur, pils2_el, puls2_start, puls2_dur, puls3_el, puls3_start, puls3_dur, puls4_el, puls4_start, puls4_dur, puls5_el, puls5_start, puls5_dur, puls6_el, puls6_start, puls6_dur) {
        $("#" + id).remove();
        $("#part_laboratory").append("<div class='off_all' id='off_all_" + id + "'></div>");
        $("#part_laboratory").append('<audio id="' + id + '"> <source src="assets/app/audio/' + audio_name + '.ogg" type="audio/ogg"/> <source src="assets/app/audio/' + audio_name + '.mp3" type="audio/mpeg"/></audio>');
        var audio_num;

        if (g_audio_var.game_audio1 === undefined) {
        	g_audio_var.game_audio1 = document.getElementById(id);
        	audio_num = 1;
        }
        else if (g_audio_var.game_audio2 === undefined) {
        	g_audio_var.game_audio2 = document.getElementById(id);	
        	audio_num = 2;
        }
        else if (g_audio_var.game_audio3 === undefined) {
        	g_audio_var.game_audio3 = document.getElementById(id);
        	audio_num = 3;	
        }
        else if (g_audio_var.game_audio4 === undefined) {
        	g_audio_var.game_audio4 = document.getElementById(id);
        	audio_num = 4;	
        }
        else if (g_audio_var.game_audio5 === undefined) {
        	g_audio_var.game_audio5 = document.getElementById(id);
        	audio_num = 5;	
        }

        g_audio_var["game_audio" + audio_num].load();
        g_audio_var["game_audio" + audio_num].play();
        g_audio_var["game_audio" + audio_num].volume = 0;
       
       	g_audio_var["game_a_timeout" + audio_num] = setTimeout(function(){
            g_audio_var["game_audio" + audio_num].pause();
            g_audio_var["game_audio" + audio_num].currentTime = 0;
            g_audio_var["game_audio" + audio_num].volume = 1;
        }, 200);
        start_duration = start_duration + 250;
        g_audio_var["game_a_timeout" + audio_num] = setTimeout(function() {
            g_audio_var["game_audio" + audio_num].play();
            g_audio_var["game_a_interval" + audio_num] = setInterval(function() {
                var currentTime = g_audio_var["game_audio" + audio_num].currentTime;
                if (currentTime >= puls1_start && currentTime <= (puls1_start + puls1_dur)) {
                    animation_pulsate(puls1_el, puls1_dur);
                } else if (currentTime >= puls2_start && currentTime <= (puls2_start + puls2_dur)) {
                    animation_pulsate(pils2_el, puls2_dur);
                } else if (currentTime >= puls3_start && currentTime <= (puls3_start + puls3_dur)) {
                    animation_pulsate(puls3_el, puls3_dur);
                } else if (currentTime >= puls4_start && currentTime <= (puls4_start + puls4_dur)) {
                    animation_pulsate(puls4_el, puls4_dur);
                } else if (currentTime >= puls5_start && currentTime <= (puls5_start + puls5_dur)) {
                    animation_pulsate(puls5_el, puls5_dur);
                } else if (currentTime >= puls6_start && currentTime <= (puls6_start + puls6_dur)) {
                    animation_pulsate(puls6_el, puls6_dur);
                }
            }, 100);
            $('#' + id).on('ended', function() {
                clearInterval(g_audio_var["game_a_interval" + audio_num]);
                clearInterval(g_audio_var["game_a_timeout" + audio_num]);
                g_audio_var["game_audio" + audio_num] = undefined;	
                $("#off_all_" + id).remove();
                refresh_req();
                if (id == "true_answer") {
                    $("#requirement_ref").css({
                        "display": "none"
                    });
                }
                if (func_on == "yes") {
                    func();
                }
            });
        }, start_duration);
    };
    
    var refresh_req = function() {
        $("#requirement_ref").remove();
        $("#part_laboratory").append("<div id='requirement_ref'></div>");
        $("#requirement_ref").bind("click", function() {
            $(this).css({
                "background-image": "url(assets/common/img/req2.png)"
            });
            refresh_req_click();
        });
        $("#requirement_ref").css({
            "background-image": "url(assets/common/img/req1.png)"
        });
    };

    var animation_pulsate = function(element, duration) {
        element.css({
            "animation": "pulse " + duration + "s linear"
        });
    };

    /// end audio ///

    this.fnc_cursorAt = function(element) {
        var c_at_left = $(element).width() / 2;
        var c_at_top = $(element).height() / 2;
        $(element).draggable('option', 'cursorAt', {
            left: c_at_left,
            top: c_at_top
        });
    };

    this.refresh_lab = function() {
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
        $("#part_laboratory *:not('#refresh'):not('.fullscreen'):not('#bg_sound_icon'):not('#bg_audio')").remove();

    };

    this.systemOs = function() {
        var unknown = '-';
        var nAgt = navigator.userAgent;
        var os = unknown;
        var clientStrings = [
            {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 3.11', r:/Win16/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Linux', r:/(Linux|X11)/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            if (clientStrings.hasOwnProperty(id)) {
              	var cs = clientStrings[id];
           			if (cs.r.test(nAgt)) {
                	os = cs.s;
                	break;
            		}
            }
            
        }
        return(os);
    };
   
} ///end GameWork function constructor///

(function($) {
    $("document").ready(function() {
        $("#refresh").bind("click", function() {
            //$(this).unbind("click");
            var i;
            var arr = $('#part_laboratory *').map(function() {
                return this.id;
            }).get();
            for (i = 0; i < arr.length; i++) {
                if ($("#" + arr[i]).hasClass("ui-draggable")) {
                    $("#" + arr[i]).draggable("destroy");
                } else if ($("#" + arr[i]).hasClass("ui-droppable")) {
                    $("#" + arr[i]).droppable("destroy");
                }
            }
            $("#part_laboratory *:not('#refresh'):not('.fullscreen')").remove();
            for (i=1; i<=5; i++) {
                clearInterval(g_audio_var["game_a_interval" + i]);
                clearTimeout(g_audio_var["game_a_timeout" + i]);
            }
            lab_work();
        });
        /// loader ///
        $("#part_laboratory").append("<div id='game_loader'></div>");
            $("#game_loader").append("<div id='gl_border'></div>");
                $("#gl_border").append("<div id='loading_bar_g'></div>");
                    $("#loading_bar_g").append("<div id='loading_bar'></div>");
                $("#gl_border").append("<p id='loading_percent'>0 %</p>");
        /// end loader ///
    });
})(jQuery);