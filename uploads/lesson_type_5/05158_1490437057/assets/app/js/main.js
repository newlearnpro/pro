"use strict";
function Main(){
	var taskNumber = 1;
	var setMain = function(){
		var task = new Task();
		var taskFinish = false;
		var taskNumberVersion = 1;
		var secondImg = false;	
		var arrAlpha = [];
		var signal = 0;
		var marginLeft = parseInt($("#graph").css("margin-left"));
		var marginTop = parseInt($("#graph").css("margin-top"));
		var aniLength = [0, 53, 71, 68, 55, 58, 58, 68, 50, 71, 50, 59, 60, 60, 60, 60, 60, 25, 49, 36, 26, 47, 28, 52, 52, 52,0,0];
		var arrNumCoordX = [
			[0],[190],[184],[206],[284],[238],
			[376],[184],[240],[374],[370],
			[224],[122],[122],[224],[224],
			[230],[120],[88],[116],[90],		
			[190],[28],[28],[362],[28],		
			[226, 116, 338]
		];
		var arrNumCoordY = [
			[0],[190],[110],[86],[6],
			[6],[68],[52],[48],[82],
			[16],[90],[56],[94],[70],
			[48],[70],[274],[230],[320],[302],		
			[26],[188],[20],[20],[146],		
			[90, 298, 300]
		];
		var arrNumCoordX_step2 = [
			[0],
			[0],
			[0],
			[0],
			[376],
			[242],
			[0],
			[214],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],
			[28],[0],[0],[0],[28]
		];
		var arrNumCoordY_step2 = [
			[0],
			[0],
			[0],
			[0],
			[120],
			[6],
			[0],
			[194],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],
			[188],[0],[0],[0],[232]
		];

		var wrong_v = 0;
		var dragg = 0;
		var ok = "";
		var resizeLeft;
		var resizeTop;
		var posLR = [0],
			posTB = [0],
			leftPos = 10,
			topPos = 10,
			posLR2 = [0],
			posTB2 = [0],
			leftPos2 = 20,
			topPos2 = 20;

		task.canvasImg(taskNumber);
		$("#animate_group").after("<div><img id='taskPicture' src='images/animate/ani_" + taskNumber + "/ani_" + taskNumber + "_" + aniLength[taskNumber] + ".png'/></div>");
		$("#taskPicture").parent().append("<div id='taskMenuPictureGroup'>");
		/*for (let i = 1; i <= 26; i++) {
			$("#taskMenuPictureGroup").append("<img class='taskMenuPicture' src='images/animate/ani_" + i + "/ani_" + i + "_" + aniLength[i] + ".png' />");
			setTimeout(function() {
				$(".taskMenuPicture").eq(10 - i).css({
					right: 8 + (i * 48)
				});
			}, 100);
		}*/	
		$("#taskPicture").bind("click", function() {
			$(".taskMenuPicture").slideToggle();
		});
		$(".taskMenuPicture").bind("click", function() {
			$("#taskPicture").attr("src", $(this).attr("src"));
			$(".taskMenuPicture").fadeOut(100);
			$(".start_draw").detach();
			$("#graph_save_picures").empty();
			taskNumber = $(this).index() + 1;
			var randPoint = Math.floor(Math.random() * arrNumCoordX[taskNumber].length);
			taskNumberVersion = 1;
			wrong_v = 0;
			dragg = 0;
			ok = "";
			arrAlpha = [];
			task.getCleen();

			if (taskNumber <= 25) {
				task.canvasImg(taskNumber);
				tskSelect(arrNumCoordX[taskNumber][0], arrNumCoordY[taskNumber][0]);
			} else {
				task.canvasImg(taskNumber, randPoint + 1);
				tskSelect(arrNumCoordX[taskNumber][randPoint], arrNumCoordY[taskNumber][randPoint]);
			}
		});
		tskSelect(arrNumCoordX[taskNumber][0], arrNumCoordY[taskNumber][0]);

		$("#requirement_ref").bind("click", function() {
			audioTrackTasks.stop().play('task' + taskNumber);
		});

		function tskSelect(coordX, coordY) {
			var animatePicNUM = 2;
			///////////////////ժամանակավոր
			if(taskNumber <=25){
			audioTrackTasks.stop().play('task' + taskNumber);
			}
			$("#taskPicture, #refresh").css("display", "none");			
			$("#animate_group").empty().append("<img id='animate_pic' src='images/animate/ani_" + taskNumber + "/ani_" + taskNumber + "_1.png' / > ");
			
			function animateTimer() {
				var deferred = new $.Deferred();
				deferred.resolve();
				return deferred.promise();
			}
			animateTimer().done(function() {
				$("#animate_group").css({
					width: 320,
					height: 410,
					top: 0,
					left: 0
				});
				var inter = setInterval(function() {
					animatePicNUM++;
					$("#animate_pic").attr("src", "images/animate/ani_" + taskNumber + "/ani_" + taskNumber + "_" + animatePicNUM + ".png");
					if (animatePicNUM >= aniLength[taskNumber]) {
						animateTimerStop();
						setTimeout(function() {
							$("#taskPicture").fadeIn();
							creatStartDraw(coordX, coordY);
							$("#animate_group").animate({
								width: 200,
								height: 200,
								top: 70+ marginTop,
								left: 410 + marginLeft,						  
							}, 300);
							$("#animate_pic").animate({
								width: 140,
								height: 140,
							}, 300).queue(function() {
								$("#refresh").show();
								$("#animate_pic").bind("click", function() {

									$(".start_draw").detach();
									tskSelect(coordX, coordY);
									$(this).unbind("click");
								});
							});
						}, 1000);
					}
				}, 70);
				function animateTimerStop() {
					clearInterval(inter);
				}
			});
		}	
		
		function againDraw(){
			$(".start_draw").detach();
			arrAlpha = [];
			dragg = 0;
			if (secondImg === false) {
				task.getCleen();
				if ((((taskNumber < 4 || taskNumber === 6) || (taskNumber > 7 && taskNumber <= 25)) && taskNumberVersion < 4) || ((taskNumber === 4 || taskNumber === 5 || taskNumber === 7 || taskNumber === 21 || taskNumber === 25) && taskNumberVersion < 7) || (taskNumber > 25 && taskNumberVersion < 2)) {
					task.canvasImg(taskNumber, taskNumberVersion);
					setTimeout(function(){					
						creatStartDraw(arrNumCoordX[taskNumber][0], arrNumCoordY[taskNumber][0]);
					},200);
				}
			} else if (secondImg === true) {
				if ((taskNumber === 4 || taskNumber === 5 || taskNumber === 7 || taskNumber === 21 || taskNumber === 25) && taskNumberVersion > 6) {
					task.getCleen();
				}
				if ((taskNumber === 4 || taskNumber === 5 || taskNumber === 7 || taskNumber === 21 || taskNumber === 25) && taskNumberVersion < 7) {
					task.canvasImg(taskNumber, taskNumberVersion);
					creatStartDraw(arrNumCoordX_step2[taskNumber][0], arrNumCoordY_step2[taskNumber][0]);
				}
			}
		}

		$(window).resize(function() {
			if ($(window).width() < 768) {
				$(".start_draw").css({
					"left": resizeLeft,
					"top": resizeTop,
				});
				marginLeft = 0;
				marginTop = 0;
			}
			if ($(window).width() >= 768) {				
				$(".start_draw").css({
					"left": resizeLeft + 64,
					"top": resizeTop + 38,
				});
				marginLeft = 64;
				marginTop = 38;
			}
		});		
		
		function creatStartDraw(left, top) {
			var taskInArray = [];
			var seconds = 0;
			ok = "";

			$("#graph").after("<div class='start_draw'></div>");
			$(".start_draw").css({
				"left": left + marginLeft,
				"top": top + marginTop
			});
			resizeLeft = left;
			resizeTop = top;



			$(".start_draw").draggable({
				containment: "#graphContainer",
				cursor: "pointer",
				cursorAt: {
					left: 10,
					top: 10
				},
				start: function(event, ui) {
					audioTrackTasks.stop();
					ui.helper.css({
						width: 20,
						height: 20,
					});
				},
				drag: function(event, ui) {
					var pixel = task.getCanvas().getImageData((ui.helper.offset().left - parseInt($("#graph").offset().left)) + 10, (ui.helper.offset().top - parseInt($("#graph").offset().top)) + 10, 410, 410);
					var data = pixel.data;
					var rgba = 'rgba(' + data[0] + ',' + data[1] +
						',' + data[2] + ',' + data[3] + ')';

					arrAlpha.push(data[3]);

					//if (data[0] == 250 && data[1] == 255 && data[2] == 245) {
				//		$(".component_base").empty();
					if (data[2] == 245) {
						dragg = 1;
					//	console.log(dragg)
					//	$(".component_base").append("<div>"+dragg+"</div>");
						//console.log(rgba)
						
					//} else if (data[0] == 250 && data[1] == 255 && data[2] == 246) {
					} else if (data[2] == 246) {
						if (dragg == 1) {
							dragg = 2;
					//		console.log(dragg)	
						}
					//} else if (data[0] == 250 && data[1] == 255 && data[2] == 247) {
					} else if (data[2] == 247) {
						if (dragg == 2) {
							dragg = 3;
					//		console.log(dragg)	
						}
					}

					if (data[0] == 251 && data[1] == 255 && (data[2] >= 245 && data[2] <= 255)) {
					//	dragg.push(data[2]);
					dragg = data[2];
						$.each(dragg, function(i, el) {
							if ($.inArray(el, taskInArray) === -1) taskInArray.push(el);
						});
					}


					posLR.unshift(ui.helper.offset().left);
					posTB.unshift(ui.helper.offset().top);
					posLR.splice(2, 2);
					posTB.splice(2, 2);

					posLR2.unshift(ui.helper.offset().left);
					posTB2.unshift(ui.helper.offset().top);
					posLR2.splice(2, 2);
					posTB2.splice(2, 2);


					if (posLR[0] >= posLR[1]) {
						leftPos = 8;
					} else if (posLR[0] < posLR[1]) {
						leftPos = 12;
					}
					if (posTB[0] >= posTB[1]) {
						topPos = 8;
					} else if (posTB[0] < posTB[1]) {
						topPos = 12;
					}

					if (posLR2[0] >= posLR2[1]) {
						leftPos2 = 7;
					} else if (posLR2[0] < posLR2[1]) {
						leftPos2 = 13;
					}
					if (posTB2[0] >= posTB2[1]) {
						topPos2 = 7;
					} else if (posTB2[0] < posTB2[1]) {
						topPos2 = 13;
					}

					$("#refresh").hide();
					task.draw(parseFloat($(".start_draw").css("left")) + leftPos - marginLeft - 5, (parseFloat($(".start_draw").css("top")) + topPos) - marginTop - 5);
					task.getCleen(parseFloat($(".start_draw").css("left")) + leftPos2 - marginLeft, parseFloat($(".start_draw").css("top")) + topPos2 - marginTop, 1.3, 1.3);

					/****************************/
					console.log(rgba);
					//$("#requirement_ref").empty().append("<div>"+rgba+"</div>");
					if ((task.find(arrAlpha, 0) == -1 && (data[0] == 255 && data[1] == 0 && data[2] == 0)) || (task.find(arrAlpha, 0) == -1 && rgba==('rgba(255,255,240,255)'))) {
						$("#graph").after("<div id='start_draw_container'></div>");
						$("#start_draw_container").css({
							left: ui.position.left,
							top: ui.position.top
						});
						
						if ((taskNumber === 1 && dragg == 1) || (taskNumber === 2) || (taskNumber === 3) || (taskNumber === 6 && dragg === 2) || (taskNumber === 8 && dragg === 3) || (taskNumber === 9 && dragg === 2) || (taskNumber === 10 && dragg === 2) || (taskNumber === 11 && dragg === 2) || (taskNumber === 12 && dragg === 2) || (taskNumber === 13 && dragg === 2) || (taskNumber === 14 && dragg === 2) || (taskNumber === 15 && dragg === 2)  || (taskNumber === 16 && dragg === 2)  || (taskNumber === 17) || (taskNumber === 18 && dragg === 2) || (taskNumber === 19) || (taskNumber === 20) || (taskNumber === 22) || (taskNumber === 23 && dragg === 1) || (taskNumber === 24 && dragg === 1)) {
							console.log(dragg);
							wrong_v = 0;
							ok = "ok";
							ui.helper.hide();
							ui.helper.draggable('option', 'containment', '#start_draw_container').data('ui-draggable')._setContainment();
							taskNumberVersion++;
							secondImg = false;
							taskFinish = true;

							setTimeout(function() {
								taskFinish = false;
								task.canvasImgSave();
								switch (taskNumberVersion) {
									case 2:					
										audioTrackHints._sounds[0]._ended == true ? audioTrackHints.play('go_forward_1a') : audioTrackHints.play('go_forward_1b');
										break;						
									case 3:
										audioTrackHints._sounds[0]._ended == true ? audioTrackHints.play('go_forward_2a') : audioTrackHints.play('go_forward_2b');
										break;
									case 4:
										audioTrackHints._sounds[0]._ended == true ? audioTrackHints.play('go_next_1') : audioTrackHints.play('go_next_2');
										parent.document.getElementsByClassName("lesson_selected")[0].parentElement.nextElementSibling.firstElementChild.click();
										$("#animate_pic, #requirement_ref").unbind("click");
										break;
								}
							}, 100);
						}
						if ((taskNumber === 4) || (taskNumber === 5 && dragg === 1) || (taskNumber === 7) || (taskNumber === 21) || (taskNumber === 25)) {
							wrong_v = 0;
							ok = "ok";
							ui.helper.hide();
							ui.helper.draggable('option', 'containment', '#start_draw_container').data('ui-draggable')._setContainment();
							taskNumberVersion++;
							secondImg = true;
							taskFinish = false;
							setTimeout(function() {
								taskFinish = false;
								switch (taskNumberVersion) {
									case 3:
										task.canvasImgSave();									
										audioTrackHints._sounds[0]._ended == true ? audioTrackHints.play('go_forward_1a') : audioTrackHints.play('go_forward_1b');								
										secondImg = false;
										wrong_v = 0;									
										break;
									case 5:
										task.canvasImgSave();
										audioTrackHints._sounds[0]._ended == true ? audioTrackHints.play('go_forward_2a') : audioTrackHints.play('go_forward_2b');
										secondImg = false;
										wrong_v = 0;
										break;
									case 7:
										task.canvasImgSave();
										audioTrackHints._sounds[0]._ended == true ? audioTrackHints.play('go_next_1') : audioTrackHints.play('go_next_2');
										parent.document.getElementsByClassName("lesson_selected")[0].parentElement.nextElementSibling.firstElementChild.click();
										$("#animate_pic, #requirement_ref").unbind("click");
										break;
								}
							}, 100);

						}
						if ((taskNumber === 26 && taskInArray.length === 4)) {
							wrong_v = 0;
							ok = "ok";
							ui.helper.hide();
							ui.helper.draggable('option', 'containment', '#start_draw_container').data('ui-draggable')._setContainment();
							taskNumberVersion++;
							secondImg = false;
							taskFinish = true;
							setTimeout(function() {
								taskFinish = false;
								audioTrackHints._sounds[0]._ended == true ? audioTrackHints.play('go_next_1') : audioTrackHints.play('go_next_2');
							//	$("#requirement_ref").hide();
							}, 100);
						}
					}

					/****************************/
					/****************************************************************************************/
					/****************************************************************************************/
					/****************************************************************************************/
					if (data[2] === 250) {					
						if(signal == 0){
							signal = 1;
							$("#signal").animate({
									"backgroundColor": "yellow"
							},300);
						}
					}
					if (data[0] === 0 && data[1] === 0 && data[2] === 0 &&  data[3] > 0 && data[3] < 255) {	
						$("#signal").animate({
							"backgroundColor": "red"
						},300);										
					}
				
					if(audioTrackHints._sounds[0]._ended == true){
						if (data[2] === 250) {						
								audioTrackHints.play('dont_hurry');			
						}			 
						if (data[0] === 0 && data[1] === 0 && data[2] === 0 &&  data[3] > 0 && data[3] < 255) {				
								audioTrackHints.play('be_attentive');		
						}			
						seconds++;
						if (((taskNumber === 1 || taskNumber === 7) && seconds === 500) || ((taskNumber === 2 || taskNumber === 3 || taskNumber === 5 || taskNumber === 6 || taskNumber === 8 || taskNumber === 9 || taskNumber === 10) && seconds === 700) || (taskNumber === 4 && seconds === 300)) {
							audioTrackHints.play('very_slowly');
						}
					}                
				},
				stop: function(event, ui) {				
					$(".start_draw, #start_draw_container").detach();				
					signal = 0;
					task.lastX = parseFloat($(".start_draw").css("left")) + 6;
					task.lastY = parseFloat($(".start_draw").css("top")) + 10;
					
					if(ok == "ok"){
						setTimeout(function() { againDraw(); $("#refresh").show(); $("#signal").animate({"backgroundColor": "#dadaff"},1000);}, 500);
					}
					if (taskFinish == false) {
						wrong_v++;				
						if (ok == "" && wrong_v < 5) {	
							$("#signal").animate({"backgroundColor": "red"},500);					
							if(audioTrackHints._sounds[0]._ended == true ){
								if ((taskNumber === 1 && dragg === 1) || (taskNumber === 2) || (taskNumber === 3) || (taskNumber === 4) || (taskNumber === 5) || (taskNumber === 6 && dragg === 2) || (taskNumber === 7)  || (taskNumber === 8 && dragg === 3) || (taskNumber === 9 && dragg === 2) || (taskNumber === 10 && dragg === 2) || (taskNumber === 11 && dragg === 2) || (taskNumber === 12 && dragg === 2) || (taskNumber === 13 && dragg === 2) || (taskNumber === 14 && dragg === 2) || (taskNumber === 15 && dragg === 2)  || (taskNumber === 16 && dragg === 2)  || (taskNumber === 17) || (taskNumber === 18 && dragg === 2) || (taskNumber === 19) || (taskNumber === 20) || (taskNumber === 21) || (taskNumber === 22) || (taskNumber === 23 && dragg === 1) || (taskNumber === 24 && dragg === 1) || (taskNumber === 25)) {
									audioTrackHints.play('try_again');
									setTimeout(function() { againDraw(); $("#refresh").show(); $("#signal").animate({"backgroundColor": "#dadaff"},1000);}, 500);								
								}else{								
									audioTrackHints.play('try_again3');
									setTimeout(function() { againDraw(); $("#refresh").show(); $("#signal").animate({"backgroundColor": "#dadaff"},1000);}, 3500);
									
								}
							}else if(audioTrackHints._sounds[0]._ended == false){
								if ((taskNumber === 1 && dragg === 1) || (taskNumber === 2) || (taskNumber === 3) || (taskNumber === 4) || (taskNumber === 5) || (taskNumber === 6 && dragg === 2) || (taskNumber === 7) || (taskNumber === 8 && dragg === 3) || (taskNumber === 9 && dragg === 2) || (taskNumber === 10 && dragg === 2) || (taskNumber === 11 && dragg === 2) || (taskNumber === 12 && dragg === 2) || (taskNumber === 13 && dragg === 2) || (taskNumber === 14 && dragg === 2) || (taskNumber === 15 && dragg === 2)  || (taskNumber === 16 && dragg === 2)  || (taskNumber === 17) || (taskNumber === 18 && dragg === 2) || (taskNumber === 19) || (taskNumber === 20) || (taskNumber === 21) || (taskNumber === 22) || (taskNumber === 23 && dragg === 1) || (taskNumber === 24 && dragg === 1) || (taskNumber === 25)) {
									audioTrackHints.play('try_again2');
									setTimeout(function() { againDraw(); $("#refresh").show(); $("#signal").animate({"backgroundColor": "#dadaff"},1000);}, 2000);
								}else{
									audioTrackHints.play('try_again4');
									setTimeout(function() {	againDraw(); $("#refresh").show(); $("#signal").animate({"backgroundColor": "#dadaff"},1000);}, 5000);
								}
							}
							if (taskNumber === 4 || taskNumber === 5 || taskNumber === 7 || taskNumber === 21 || taskNumber === 25) {
								if (taskNumberVersion === 2 || taskNumberVersion === 4 || taskNumberVersion === 6) {
									secondImg = false;
									taskNumberVersion--;
									setTimeout(function() {
										task.canvasImg(taskNumber, taskNumberVersion);
									}, 100);
								}
							}
						}

						if (wrong_v >= 5) {
							if(audioTrackHints._sounds[0]._ended == true){
								audioTrackHints.play('wrong');
							}else if(audioTrackHints._sounds[0]._ended == false){
								audioTrackHints.play('wrong2');						
							}
							$("#animate_group").effect( "bounce", "slow" ).css("opacity",0.2);
							$("#animate_pic, #requirement_ref").unbind("click");
							setTimeout(function(){
								$("#graph, .start_draw").hide("explode", {pieces: 16}, 1000);
							},2000);							
						}
					}					
				}
			});
		}


		$("#graph").droppable({
			accept: ".start_draw",
		});

		$("#graph, #part_laboratory_head").draggable({
			grid: [5000, 5000]
		});

	}
	this.getMain = function(){
		setMain();
		$("#refresh").bind("click", function(){
			$("#graph_save_picures").empty();
			$("#animate_group").css("opacity",1);
			$("#graph").show();
			$(".start_draw").remove();
			setMain();
		});
	}
}
