/**************/
/********** audio tracks with part
 ***************/
var audioTrackTasks = new Howl({
    //src: ['assets/app/audio/tasks.mp3', 'assets/app/audio/tasks.ogg'],
    src: ['assets/app/audio/tasks.mp3'],
    sprite: {
        task1: [0, 6000],
        task2: [7300, 6700],
        task3: [14800, 7000],
        task4: [22500, 6000],
        task5: [29500, 6000],
        task6: [37000, 7000],
        task7: [45500, 6500],
        task8: [53000, 6000],
        task9: [59700, 6000],
        task10: [66800, 7000]
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
        wrong: [20000, 1000],
		wrong2: [18800, 2300],
        repeat: [21000, 1000],
        try_again: [41800, 1500],
		try_again2: [40100, 4000],
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
    'assets/common/img/next.png',
    'assets/common/img/refresh.png',
    'assets/app/audio/hints.mp3',
    'assets/app/audio/tasks.mp3',
    'images/number_10_1.png',
    'images/number_10_2.png',
    'images/number_10_3.png',
	'images/animate/ani_10/ani_10_1.png',
	'images/animate/ani_10/ani_10_2.png',
	'images/animate/ani_10/ani_10_3.png',
	'images/animate/ani_10/ani_10_4.png',
	'images/animate/ani_10/ani_10_5.png',
	'images/animate/ani_10/ani_10_6.png',
	'images/animate/ani_10/ani_10_7.png',
	'images/animate/ani_10/ani_10_8.png',
	'images/animate/ani_10/ani_10_9.png',
	'images/animate/ani_10/ani_10_10.png',
	'images/animate/ani_10/ani_10_11.png',
	'images/animate/ani_10/ani_10_12.png',
	'images/animate/ani_10/ani_10_13.png',
	'images/animate/ani_10/ani_10_14.png',
	'images/animate/ani_10/ani_10_15.png',
	'images/animate/ani_10/ani_10_16.png',
	'images/animate/ani_10/ani_10_17.png',
	'images/animate/ani_10/ani_10_18.png',
	'images/animate/ani_10/ani_10_19.png',
	'images/animate/ani_10/ani_10_20.png',
	'images/animate/ani_10/ani_10_21.png',
	'images/animate/ani_10/ani_10_22.png',
	'images/animate/ani_10/ani_10_23.png',
	'images/animate/ani_10/ani_10_24.png',
	'images/animate/ani_10/ani_10_25.png',
	'images/animate/ani_10/ani_10_26.png',
	'images/animate/ani_10/ani_10_27.png',
	'images/animate/ani_10/ani_10_28.png',
	'images/animate/ani_10/ani_10_29.png',
	'images/animate/ani_10/ani_10_30.png',
	'images/animate/ani_10/ani_10_31.png',
	'images/animate/ani_10/ani_10_32.png',
	'images/animate/ani_10/ani_10_33.png',
	'images/animate/ani_10/ani_10_34.png',
	'images/animate/ani_10/ani_10_35.png',
	'images/animate/ani_10/ani_10_36.png',
	'images/animate/ani_10/ani_10_37.png',
	'images/animate/ani_10/ani_10_38.png',
	'images/animate/ani_10/ani_10_39.png',
	'images/animate/ani_10/ani_10_40.png',
	'images/animate/ani_10/ani_10_41.png',
	'images/animate/ani_10/ani_10_42.png',
	'images/animate/ani_10/ani_10_43.png',
	'images/animate/ani_10/ani_10_44.png',
	'images/animate/ani_10/ani_10_45.png',
	'images/animate/ani_10/ani_10_46.png',
	'images/animate/ani_10/ani_10_47.png',
	'images/animate/ani_10/ani_10_48.png',
	'images/animate/ani_10/ani_10_49.png',
	'images/animate/ani_10/ani_10_50.png'
).then(
    function finishCallback() {
        //  $("#done").text("Finished loading all assets.");
    },
    function errorCallback(err) {
       //   $("#cons_error").text(err.message);
    },
    function progressCallback(progress) {
        //  $("#console").text("Loaded " + progress.loaded + " of " + progress.total + " assets.");
        //  console.log("Loaded " + progress.loaded + " of " + progress.total + " assets.");
        //   console.log(progress)
    });
/*******************end load audio and picture files****************/