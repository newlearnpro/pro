(function($) {
    $("document").ready(function() {

        var images = [];
        function preload() {
            for (var i = 0; i < arguments.length; i++) {
                images[i] = new Image();
                images[i].src = preload.arguments[i];
            }
        }

        preload(
            "assets/common/img/bg_sound.png",
            "assets/common/img/bg_sound_off.png",
            "assets/common/img/next.png",
            "assets/common/img/next2.png",
            "assets/common/img/prev.png",
            "assets/common/img/prev2.png",
            "assets/common/img/refresh.png",
            "assets/common/img/refresh2.png",
            "assets/common/img/req1.png",
            "assets/common/img/req2.png"
        )


        $("#refresh").click(function() {
            var arr = $('#part_laboratory *').map(function() {
                return this.id;
            }).get();
            for (i = 0; i < arr.length; i++) {
                if ($("#" + arr[i]).hasClass("ui-draggable")) {
                    $("#" + arr[i]).draggable("destroy");
                }
                else if ($("#" + arr[i]).hasClass("ui-droppable")) {
                    $("#" + arr[i]).droppable("destroy");
                }
            }
            $("#part_laboratory *:not('#refresh'):not('.fullscreen')").remove();
            lab_work();
        });
    });
})(jQuery);