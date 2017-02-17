"use strict";
function Main(){
	var taskNumber = 1;
	var ver = 0;
	var setMain = function(){
		var task = new Task();
		var taskFinish = false;
		var taskNumberVersion = 1;


		var marginLeft = parseInt($("#graph").css("margin-left"));
		var marginTop = parseInt($("#graph").css("margin-top"));
		var aniLength = [0, 1, 71, 68, 55, 58, 58, 68, 50, 71, 50, 59, 60, 60, 60, 60, 60, 25, 49, 36, 26, 47, 28, 52, 52, 52,0,0];
		
		var randPosition = Math.floor((Math.random() * 6) + 1)
		var numCoordX = 0;
		var numCoordY = 0;
		
		switch(randPosition){
			case 1: numCoordX = 130; numCoordY = 50; break;
			case 2: numCoordX = 50; numCoordY = 280; break;
			case 3: numCoordX = 280; numCoordY = 70; break;
			case 4: numCoordX = 300; numCoordY = 200; break;
			case 5: numCoordX = 250; numCoordY = 300; break;
			case 6: numCoordX = 50; numCoordY = 230; break;
		}
		
		var mm_x = Math.floor((Math.random() * 370) + 5);
	//	console.log(randPosition)
		
		
		
		
		
		var arrNumCoordX = [
			[0],[numCoordX],[184],[206],[284],[238],
			[376],[184],[240],[374],[370],
			[224],[122],[122],[224],[224],
			[230],[120],[88],[116],[90],		
			[190],[28],[28],[362],[28],		
			[226, 116, 338]
		];
		var arrNumCoordY = [
			[0],[numCoordY],[110],[86],[6],
			[6],[68],[52],[48],[82],
			[16],[90],[56],[94],[70],
			[48],[70],[274],[230],[320],[302],		
			[26],[188],[20],[20],[146],		
			[90, 298, 300]
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

			
			task.getCleen();
		task.canvasImg(taskNumber);		
		//$("#animate_group").after("<div><img id='taskPicture' src='images/animate/ani_" + taskNumber + "/ani_" + taskNumber + "_" + aniLength[taskNumber] + ".png'/></div>");
		$("#taskPicture").parent().append("<div id='taskMenuPictureGroup'>");
		/*for (let i = 1; i <= 25; i++) {
			$("#taskMenuPictureGroup").append("<img class='taskMenuPicture' src='images/animate/ani_" + i + "/ani_" + i + "_" + aniLength[i] + ".png' />");
			setTimeout(function() {
				$(".taskMenuPicture").eq(10 - i).css({
					right: 8 + (i * 48)
				});
			}, 100);
		}	*/
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

			//task.getCleen();

			if (taskNumber <= 25) {
				task.canvasImg(taskNumber);
				tskSelect(numCoordX, numCoordY);
			} else {
				task.canvasImg(taskNumber, randPoint + 1);
				tskSelect(arrNumCoordX[taskNumber][randPoint], arrNumCoordY[taskNumber][randPoint]);
			}
		});
		tskSelect(numCoordX, numCoordY);

		$("#requirement_ref").bind("click", function() {
			if(audioTrackHints._sounds[0]._ended == true){
				audioTrackTasks.stop().play('task' + 1);
			}
		});

		function tskSelect(coordX, coordY) {
			var animatePicNUM = 2;
			if(taskNumberVersion ==1 ){
				audioTrackTasks.stop().play('task' + 1);
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
				//	$("#animate_pic").attr("src", "images/animate/ani_" + taskNumber + "/ani_" + taskNumber + "_" + animatePicNUM + ".png");
					$("#animate_pic").attr("src", "images/animate/ani_" + taskNumber + "/ani_" + taskNumber + "_" + taskNumberVersion + ".png");
				
					//$("#animate_pic").attr("src", "images/animate/ani_" + taskNumber + "/ani_" + 1 + "_" + 1 + ".png");
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
								if(taskNumberVersion < 4){
									$("#animate_pic").bind("click", function() {
										audioTrackHints.stop();
										audioTrackTasks.stop().play('task' + 1);
										$(".start_draw").detach();											
										tskSelect(coordX, coordY);
										$(this).unbind("click");
									});
								}
							});
						}, 10);
					}
				}, 10);
				function animateTimerStop() {
					clearInterval(inter);
				}
			});
		}	
		
		
		$('.component_base').click(function(){
			$('.lesson_selected').parent().next().children().trigger('click');
			console.log('fg');
			$('.mainPage').hide();
			console.log($('.lesson_selected').parent().next().children());
		});
		
		function againDraw(){
			$(".start_draw").detach();

			//dragg = 0;
			
				task.getCleen();
				task.canvasImg(taskNumber, taskNumberVersion);
					setTimeout(function(){					
						creatStartDraw(numCoordX, numCoordY);
					},200);
		
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
			ok = "";			
			
			
			
			var outside = 0;
			var inside = 0;
			var outside251 = false;
			var outside252 = false;
			var outside253 = false;
			var outside254 = false;
			var inside251 = false;
			var inside252 = false;
			var over = false;
			
			
if(taskNumberVersion < 4){
			$("#graph").after("<div class='start_draw'></div>");

			$(".start_draw").css({
				"left": left + marginLeft,
				"top": top + marginTop
			});
}
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

	
			if((data[0] == 251 && data[1] == 255 && data[2] == 255) && (outside251 == false)){
				outside++;
				outside251 = true;			
			}else if((data[0] == 252 && data[1] == 255 && data[2] == 255) && (outside252 == false)){
				outside++;
				outside252 = true;
			}else if((data[0] == 253 && data[1] == 255 && data[2] == 255) && (outside253 == false)){
				outside++;
				outside253 = true;
			}else if((data[0] == 254 && data[1] == 255 && data[2] == 255) && (outside254 == false)){
				outside++;
				outside254 = true;
			}
			
		
			if((data[0] == 251 && data[1] == 254 && data[2] == 255) && (inside251 == false)){
				inside++;
				inside251 = true;
			}else if((data[0] == 252 && data[1] == 254 && data[2] == 255) && (inside252 == false)){
				inside++;
				inside252 = true;
			}
	
				
		if(taskNumberVersion == 1){				
			if(((data[0] == 0 && data[1] == 0 && data[2] == 255) || (data[0] == 255 && data[1] == 0 && data[2] == 0)) && (over == false)){
				inside++;
				over = true;
			}		
			if(audioTrackHints._sounds[0]._ended == true){
				if (data[0] == 0 && data[1] == 0 && data[2] == 0 && data[3] == 255){
					outside = 0;
					audioTrackHints.play('dont_hurry');	
					ok = "";						
				}	 
				if ((data[0] == 255 && data[1] == 0 && data[2] == 0) || (data[0] == 0 && data[1] == 0 && data[2] == 255)) {
					outside = 0;
					ok = "";
						audioTrackHints.play('be_attentive');
				}
			}
					
			$("#graph").after("<div id='start_draw_container'></div>");
				$("#start_draw_container").css({
					left: ui.position.left,
					top: ui.position.top
			});
			
			if (data[0] == 50 && data[1] == 0 && data[2] == 0 && data[3] == 255 && outside == 4 && inside<2) {		
				ok = "ok";
				ui.helper.hide();
				setTimeout(function(){
					ui.helper.draggable('option', 'containment', '#start_draw_container').data('ui-draggable')._setContainment();
					audioTrackHints.play('go_next_1');
				},20);				
			}
			if(outside < 4 || inside == 2){		
				ok = "";
			}
		}else if(taskNumberVersion == 2){
			if((data[0] == 255 && data[1] == 102 && data[2] == 19) && (over == false)){
				over = true;
			}		
	
			if(audioTrackHints._sounds[0]._ended == true){
				if (data[0] == 0 && data[1] == 0 && data[2] == 0 && data[3] == 255){
					outside = 0;
					audioTrackHints.play('dont_hurry');	
					ok = "";						
				}	 
				if ((data[0] == 176 && data[1] == 0 && data[2] == 0) || (data[0] == 44 && data[1] == 111 && data[2] == 233)){
					outside = 0;
					ok = "";
						audioTrackHints.play('be_attentive');
				}		
			}							
						
			$("#graph").after("<div id='start_draw_container'></div>");
			$("#start_draw_container").css({
				left: ui.position.left,
				top: ui.position.top
			});
			
			if (data[0] == 50 && data[1] == 0 && data[2] == 0 && data[3] == 255 && outside == 4 && inside<2 && over==true) {		
				ok = "ok";
				ui.helper.hide();
				setTimeout(function(){
					ui.helper.draggable('option', 'containment', '#start_draw_container').data('ui-draggable')._setContainment();
					audioTrackHints.play('go_next_1');
				},20);					
			}
			if(outside < 4 || inside == 2 || over == false){		
				ok = "";
			}
		}else if(taskNumberVersion == 3){
			if((data[0] == 0 && data[1] == 0 && data[2] == 255) && (over == false)){
				over = true;
			}		
	
			if(audioTrackHints._sounds[0]._ended == true){
				if (data[0] == 0 && data[1] == 0 && data[2] == 0 && data[3] == 255){
					outside = 0;
					audioTrackHints.play('dont_hurry');	
					ok = "";						
				}	 
				if ((data[0] == 176 && data[1] == 0 && data[2] == 255) || (data[0] == 0 && data[1] == 128 && data[2] == 164)){
					outside = 0;
					ok = "";
						audioTrackHints.play('be_attentive');
				}		
			}							
						
			$("#graph").after("<div id='start_draw_container'></div>");
			$("#start_draw_container").css({
				left: ui.position.left,
				top: ui.position.top
			});
			
			if (data[0] == 50 && data[1] == 0 && data[2] == 0 && data[3] == 255 && outside == 4 && inside<2 && over==true) {						
				ok = "ok";
				ui.helper.hide();
				setTimeout(function(){
					ui.helper.draggable('option', 'containment', '#start_draw_container').data('ui-draggable')._setContainment();
					//audioTrackHints.play('go_next_1');
					audioTrackHints.play('bravo1');
				},20);	
			}
			if(outside < 4 || inside == 2 || over == false){
				ok = "";
			}
		}
				
				

		$("#refresh").hide();
			task.draw(parseFloat($(".start_draw").css("left")) + leftPos - marginLeft - 5, (parseFloat($(".start_draw").css("top")) + topPos) - marginTop - 5);       
		},
		stop: function(event, ui) {
			task.startPath = 0;
			$(".start_draw, #start_draw_container").detach();		
			task.lastX = parseFloat($(".start_draw").css("left")) + 6;
			task.lastY = parseFloat($(".start_draw").css("top")) + 10;
			
	//		console.log(ok)
			
			
			
			
			setTimeout(function() { 
			
			
			if(wrong_v <5){
				againDraw(); 			
				task.draw(parseFloat($(".start_draw").css("left")) + leftPos - marginLeft - 5, (parseFloat($(".start_draw").css("top")) + topPos) - marginTop - 5);
			}
			
				

			
			
			},4500);
			
			if (ok == "ok" ) {				
				wrong_v = 0;
				//if(taskNumberVersion<3){
					taskNumberVersion++;
			//	}

				function pulsate(colorValue, coord, count){			
					task.getCanvas().beginPath();
					task.getCanvas().lineWidth = 0;
					task.getCanvas().strokeStyle = colorValue;
					if(count == 4){						
						task.getCanvas().rect(coord[0], coord[1], coord[2], coord[3]);
					}else if(count == 6){
						task.getCanvas().moveTo(coord[0], coord[1]);
						task.getCanvas().lineTo(coord[2], coord[3]);
						task.getCanvas().lineTo(coord[4], coord[5]);
					}	
					task.getCanvas().fillStyle = colorValue;
					task.getCanvas().fill();
					task.getCanvas().stroke();
				}
				if(taskNumberVersion == 2){	
						ver = taskNumberVersion;				
						setTimeout(function(){pulsate("#00ff00",  [160, 294, 12, 12], 4);},100);
						setTimeout(function(){pulsate("red",  [160, 294, 12, 12], 4);pulsate("blue", [352, 150, 326, 150, 340, 130], 6);},350);
						setTimeout(function(){pulsate("#00ff00",  [160, 294, 12, 12], 4)},600);					
						setTimeout(function(){pulsate("red",  [160, 294, 12, 12], 4);pulsate("blue", [352, 150, 326, 150, 340, 130], 6);},850);
						setTimeout(function(){pulsate("#00ff00",  [160, 294, 12, 12], 4)},1100);
						setTimeout(function(){pulsate("red",  [160, 294, 12, 12], 4);pulsate("blue", [352, 150, 326, 150, 340, 130], 6);},1450);	
				}else if(taskNumberVersion == 3){
						ver = taskNumberVersion;
						setTimeout(function(){pulsate("#00ff00",  [76, 127, 12, 60], 4);pulsate("#00ff00",  [381, 110, 12, 12], 4);},100);
						setTimeout(function(){pulsate("#2c6fe9",  [76, 127, 12, 60], 4);pulsate("#ff6613",  [381, 110, 12, 12], 4);},350);
						setTimeout(function(){pulsate("#00ff00",  [76, 127, 12, 60], 4);pulsate("#00ff00",  [381, 110, 12, 12], 4);},600);
						setTimeout(function(){pulsate("#2c6fe9",  [76, 127, 12, 60], 4);pulsate("#ff6613",  [381, 110, 12, 12], 4);},850);
						setTimeout(function(){pulsate("#00ff00",  [76, 127, 12, 60], 4);pulsate("#00ff00",  [381, 110, 12, 12], 4);},1100);
						setTimeout(function(){pulsate("#2c6fe9",  [76, 127, 12, 60], 4);pulsate("#ff6613",  [381, 110, 12, 12], 4);},1450);						
				}else if(taskNumberVersion == 4){
					ver = taskNumberVersion;
					setTimeout(function(){pulsate("#00ff00",  [123, 306, 12, 12], 4);pulsate("#00ff00", [248, 187, 225, 187, 236, 167], 6);},100);
					setTimeout(function(){pulsate("blue",  [123, 306, 12, 12], 4);pulsate("#b000ff", [248, 187, 225, 187, 236, 167], 6);},350);
					setTimeout(function(){pulsate("#00ff00",  [123, 306, 12, 12], 4);pulsate("#00ff00", [248, 187, 225, 187, 236, 167], 6);},600);
					setTimeout(function(){pulsate("blue",  [123, 306, 12, 12], 4);pulsate("#b000ff", [248, 187, 225, 187, 236, 167], 6);},850);
					setTimeout(function(){pulsate("#00ff00",  [123, 306, 12, 12], 4);pulsate("#00ff00", [248, 187, 225, 187, 236, 167], 6);},1100);
					setTimeout(function(){pulsate("blue",  [123, 306, 12, 12], 4);pulsate("#b000ff", [248, 187, 225, 187, 236, 167], 6);},1450);
				}				
				setTimeout(function(){
					task.canvasImgSave();
					tskSelect(numCoordX, numCoordY);				
				},4400);
						
			}
			
			
			wrong_v++;
		
			if (ok == "" && wrong_v < 5) {	
		//	console.log("ok:" + ok);
			
				if(audioTrackHints._sounds[0]._ended == true ){
				
							audioTrackHints.play('try_again');
							setTimeout(function() { 
						//console.log(parseFloat($(".start_draw").css("left")) + 6, parseFloat($(".start_draw").css("top")) + 10)
							
							
				
							
							
						//	setMain();
							$("#refresh").show(); 
							}, 500);								

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
		console.log(taskNumber)
		if(ver < 4){			
			setMain();
		}
		$("#refresh").bind("click", function(){
			$("#graph_save_picures").empty();
			$("#animate_group").css("opacity",1);
			$("#graph").show();
			$(".start_draw").remove();			
			setMain();
		});
	}
}
