/**************/
/********** audio tracks with part
 ***************/
var audioTrackTasks = new Howl({
    //src: ['assets/app/audio/tasks.mp3', 'assets/app/audio/tasks.ogg'],
    src: ['assets/app/audio/tasks.mp3'],
    sprite: {
        task1: [400, 6000],
        task2: [7300, 6700],
        task3: [14800, 7000],
        task4: [22500, 6000],
        task5: [29500, 7000],
        task6: [37000, 7000],
        task7: [45500, 6500],
        task8: [53000, 6000],
        task9: [59700, 6000],
        task10: [66800, 7000],
		task11: [74700, 7000],
		task12: [81600, 6000],
		task13: [88000, 6000],
		task14: [95000, 6000],
		task15: [101400, 6500],
		task16: [108500, 6000],
		task17: [114800, 6500],
		task18: [122100, 6500],
		task19: [114800, 6500],
		task20: [129500, 6200],
		task21: [137000, 6200],
		task22: [143700, 5200],
		task23: [148500, 5200],
		task24: [154000, 4600],
		task25: [158600, 5000],
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
        very_slowly: [16400, 3500],
        wrong: [20200, 1400],
		wrong2: [18800, 2300],
        repeat: [21000, 1000],
        try_again: [41800, 1300],
		try_again2: [40100, 3000],
		try_again3: [41800, 3800],
		try_again4: [40100, 5500],
        tru: [24000, 1200],       
        bravo1: [29500, 1000],
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
  'assets/common/img/req1.png',
    'assets/common/img/req2.png',
    'assets/common/img/refresh.png',
	'assets/common/img/refresh2.png',
    'assets/app/audio/hints.mp3',
    'assets/app/audio/tasks.mp3',
	'images/number_1_1.png', 'images/number_1_2.png', 'images/number_1_3.png',
	'images/animate/ani_1/ani_1_1.png',
	'images/animate/ani_1/ani_1_2.png',
	'images/animate/ani_1/ani_1_3.png',
	'images/animate/ani_1/ani_1_4.png',
	'images/animate/ani_1/ani_1_5.png',
	'images/animate/ani_1/ani_1_6.png',
	'images/animate/ani_1/ani_1_7.png',
	'images/animate/ani_1/ani_1_8.png',
	'images/animate/ani_1/ani_1_9.png',
	'images/animate/ani_1/ani_1_10.png',
	'images/animate/ani_1/ani_1_11.png',
	'images/animate/ani_1/ani_1_12.png',
	'images/animate/ani_1/ani_1_13.png',
	'images/animate/ani_1/ani_1_14.png',
	'images/animate/ani_1/ani_1_15.png',
	'images/animate/ani_1/ani_1_16.png',
	'images/animate/ani_1/ani_1_17.png',
	'images/animate/ani_1/ani_1_18.png',
	'images/animate/ani_1/ani_1_19.png',
	'images/animate/ani_1/ani_1_20.png',
	'images/animate/ani_1/ani_1_21.png',
	'images/animate/ani_1/ani_1_22.png',
	'images/animate/ani_1/ani_1_23.png',
	'images/animate/ani_1/ani_1_24.png',
	'images/animate/ani_1/ani_1_25.png',
	'images/animate/ani_1/ani_1_26.png',
	'images/animate/ani_1/ani_1_27.png',
	'images/animate/ani_1/ani_1_28.png',
	'images/animate/ani_1/ani_1_29.png',
	'images/animate/ani_1/ani_1_30.png',
	'images/animate/ani_1/ani_1_31.png',
	'images/animate/ani_1/ani_1_32.png',
	'images/animate/ani_1/ani_1_33.png',
	'images/animate/ani_1/ani_1_34.png',
	'images/animate/ani_1/ani_1_35.png',
	'images/animate/ani_1/ani_1_36.png',
	'images/animate/ani_1/ani_1_37.png',
	'images/animate/ani_1/ani_1_38.png',
	'images/animate/ani_1/ani_1_39.png',
	'images/animate/ani_1/ani_1_40.png',
	'images/animate/ani_1/ani_1_41.png',
	'images/animate/ani_1/ani_1_42.png',
	'images/animate/ani_1/ani_1_43.png',
	'images/animate/ani_1/ani_1_44.png',
	'images/animate/ani_1/ani_1_45.png',
	'images/animate/ani_1/ani_1_46.png',
	'images/animate/ani_1/ani_1_47.png'
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