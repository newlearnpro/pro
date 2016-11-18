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
    'images/number_9_1.png',
    'images/number_9_2.png',
    'images/number_9_3.png',
	'images/animate/ani_9/ani_9_1.png',
	'images/animate/ani_9/ani_9_2.png',
	'images/animate/ani_9/ani_9_3.png',
	'images/animate/ani_9/ani_9_4.png',
	'images/animate/ani_9/ani_9_5.png',
	'images/animate/ani_9/ani_9_6.png',
	'images/animate/ani_9/ani_9_7.png',
	'images/animate/ani_9/ani_9_8.png',
	'images/animate/ani_9/ani_9_9.png',
	'images/animate/ani_9/ani_9_10.png',
	'images/animate/ani_9/ani_9_11.png',
	'images/animate/ani_9/ani_9_12.png',
	'images/animate/ani_9/ani_9_13.png',
	'images/animate/ani_9/ani_9_14.png',
	'images/animate/ani_9/ani_9_15.png',
	'images/animate/ani_9/ani_9_16.png',
	'images/animate/ani_9/ani_9_17.png',
	'images/animate/ani_9/ani_9_18.png',
	'images/animate/ani_9/ani_9_19.png',
	'images/animate/ani_9/ani_9_20.png',
	'images/animate/ani_9/ani_9_21.png',
	'images/animate/ani_9/ani_9_22.png',
	'images/animate/ani_9/ani_9_23.png',
	'images/animate/ani_9/ani_9_24.png',
	'images/animate/ani_9/ani_9_25.png',
	'images/animate/ani_9/ani_9_26.png',
	'images/animate/ani_9/ani_9_27.png',
	'images/animate/ani_9/ani_9_28.png',
	'images/animate/ani_9/ani_9_29.png',
	'images/animate/ani_9/ani_9_30.png',
	'images/animate/ani_9/ani_9_31.png',
	'images/animate/ani_9/ani_9_32.png',
	'images/animate/ani_9/ani_9_33.png',
	'images/animate/ani_9/ani_9_34.png',
	'images/animate/ani_9/ani_9_35.png',
	'images/animate/ani_9/ani_9_36.png',
	'images/animate/ani_9/ani_9_37.png',
	'images/animate/ani_9/ani_9_38.png',
	'images/animate/ani_9/ani_9_39.png',
	'images/animate/ani_9/ani_9_40.png',
	'images/animate/ani_9/ani_9_41.png',
	'images/animate/ani_9/ani_9_42.png',
	'images/animate/ani_9/ani_9_43.png',
	'images/animate/ani_9/ani_9_44.png',
	'images/animate/ani_9/ani_9_45.png',
	'images/animate/ani_9/ani_9_46.png',
	'images/animate/ani_9/ani_9_47.png',
	'images/animate/ani_9/ani_9_48.png',
	'images/animate/ani_9/ani_9_49.png',
	'images/animate/ani_9/ani_9_50.png',
	'images/animate/ani_9/ani_9_51.png',
	'images/animate/ani_9/ani_9_52.png',
	'images/animate/ani_9/ani_9_53.png',
	'images/animate/ani_9/ani_9_54.png',
	'images/animate/ani_9/ani_9_55.png',
	'images/animate/ani_9/ani_9_56.png',	
	'images/animate/ani_9/ani_9_57.png',
	'images/animate/ani_9/ani_9_58.png',
	'images/animate/ani_9/ani_9_59.png',
	'images/animate/ani_9/ani_9_60.png',
	'images/animate/ani_9/ani_9_61.png',
	'images/animate/ani_9/ani_9_62.png',
	'images/animate/ani_9/ani_9_63.png',
	'images/animate/ani_9/ani_9_64.png',
	'images/animate/ani_9/ani_9_65.png',
	'images/animate/ani_9/ani_9_66.png',	
	'images/animate/ani_9/ani_9_67.png',
	'images/animate/ani_9/ani_9_68.png',
	'images/animate/ani_9/ani_9_69.png',
	'images/animate/ani_9/ani_9_70.png',
	'images/animate/ani_9/ani_9_71.png'
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