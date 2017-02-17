/**************/
/********** audio tracks with part
 ***************/
var audioTrackTasks = new Howl({
    //src: ['assets/app/audio/tasks.mp3', 'assets/app/audio/tasks.ogg'],
    src: ['assets/app/audio/tasks.mp3'],
    sprite: {
        task1: [0, 6000],
    }
});

var audioTrackHints = new Howl({
    //src: ['assets/app/audio/hints.mp3', 'assets/app/audio/hints.ogg'],
    src: ['assets/app/audio/hints.mp3'],
    sprite: {
        be_attentive: [0, 3000],
        dont_hurry: [9800, 3000],
        good: [14000, 1300],
        go_forward_1a: [15600, 1000],
		go_forward_1b: [13500, 3200],
        go_forward_2a: [31700, 1000],
		go_forward_2b: [34500, 2000],
		go_next_1: [24400, 4400],
		go_next_2: [23200, 5600],
        very_slowly: [16800, 3500],
        wrong: [20200, 1400],
		wrong2: [18800, 2300],
        repeat: [21000, 1000],
        try_again: [41800, 1300],
		try_again2: [40100, 3000],
		try_again3: [41800, 3800],
		try_again4: [40100, 5500],
        tru: [24000, 1200],       
        bravo1: [29500, 1200],
        bravo2: [31000, 1500],
        bravo3: [33000, 1500],
        very_well1: [35200, 1500],
        very_well2: [37200, 1800],
    }
});

/*******************end audio track with parts****************/


/**************/
/********** load audio and picture files
 ***************/
kontra.loadAssets(
   // 'assets/app/audio/hints.mp3',
   // 'assets/app/audio/tasks.mp3',
    'assets/common/img/req1.png',
    'assets/common/img/req2.png',
    'assets/common/img/refresh.png',
	'assets/common/img/refresh2.png',
    'images/number_1_1.png', 'images/number_1_2.png', 'images/number_1_3.png'
).then(
    function finishCallback() {
        //  $("#done").text("Finished loading all assets.");
		 // alert("dgh");
		$("#load_bar").hide();
		var main = new Main();
		main.getMain();		
    },
    function errorCallback(err) {
	//	alert("sgf")
      //    $("#cons_error").text(err.message);
    },
    function progressCallback(progress) {
		  $("#load_bar_percent").text((100/(progress.total/progress.loaded)).toFixed() + "%")
        //  $("#console").text("Loaded " + progress.loaded + " of " + progress.total + " assets.");
        //  console.log("Loaded " + progress.loaded + " of " + progress.total + " assets.");
        //   console.log(progress)
    });
/*******************end load audio and picture files****************/