"use strict";
$(document).ready(function() {
	var step = 1;

	$("#requirement_ref").bind("click", function(){
		audioTrackTasks.stop().play('task' + (step-1));
	});
	

    $("#refresh").bind("click", function() {
		step = 1;
		$("#table_cont").empty();
		buildCages();
    });

	buildCages();
	function buildCages(){
		audioTrackTasks.stop().play('task' + step);
		step++;
		$("#cage_group, #cube_group").empty();
		$("#cage_group").append("<div class='cages cage1'></div>");
		$('.cage1').append("<img class='cubes cube1' src='assets/app/img/cube_1.png'/>");		
		for(let j=1; j<6; j++){
			$("#cube_group").append("<img class='cubes cube"+(j+1)+"' src='assets/app/img/cube_"+(j+1)+".png' />");
		}
		
		$(".cube2, .cube3, .cube4, .cube5, .cube6").draggable({		
			containment: "#part_laboratory",
			revert: "invalid",
			cursor: "pointer",
			zIndex:557
		});
	
		$(".cube2").draggable({		
			containment: "#part_laboratory",
			revert: "invalid",
			cursor: "pointer",
			zIndex: 556,
			start: function(event, ui){
				if(!ui.helper.hasClass("onTop")){				
					$(".cage1").css({"top":"39.2%"});
					$(".cube1").css({"top":"100%"});				
					$(".cage1").droppable({
						accept: ".cube2",
						drop: function(event, ui) {
							audioTrackTasks.stop().play('task' + step);
							step++;
							ui.draggable.appendTo(".cage1").css({"top":"0px", "left":0});				
							$(".cage1").draggable({
								containment: "#part_laboratory",
								revert: "invalid",
								cancel: ".cube2",
								cursor: "pointer",
								zIndex:557,
								drag: function(event, ui){			 
								},
								stop:function(event, ui){
								},
							});						
							$("#cage_group").append("<div class='cages cage3'></div>");
							$("#table_cont").droppable({
								accept: ".cube3",
								drop: function(event, ui){								
									ui.draggable.appendTo(".cage3").css({"top":"200%","left":0});
									$(".cage3").droppable({
										accept: ".cage1",
										drop:function(event, ui){
											audioTrackTasks.stop().play('task' + step);
											step++;											
											ui.draggable.appendTo(".cage3").css({"top":0,"left":0});
											$(".cube2").draggable("enable").addClass("onTop");
											$(".cube3, .cage1").draggable("disable");
											$("#table_cont").droppable({
												accept: ".cube2",
												drop: function(event, ui){
													ui.draggable.appendTo("#table_cont").css({"top":"16%","left":"66%"});
													$(".cage1").droppable({
														accept: ".cube4",
														drop: function(event, ui){															
															ui.draggable.appendTo(".cage1").css({"top":"98%","left":0});
															$(".cage1").css({"top":"-96%","left":0});
															$(".cube1").css({"top":"196%","left":0});														
															$(".cage1").droppable({
																accept: ".cube2",
																drop: function(event, ui){
																	audioTrackTasks.stop().play('task' + step);
																	step++;
																	ui.draggable.appendTo(".cage1").css({"top":"-128%","left":0});
																	$(".cube4").draggable("disable");
																	$(".cage1").draggable("enable").draggable("option","cancel",".cube4");
																	$("#cage_group").append("<div class='cages cage5'></div><div class='cages cage6'></div>");
																	$(".cage5").droppable({
																		accept: ".cube5",
																		drop: function(event, ui){
																			audioTrackTasks.stop().play('task' + step);
																			step++;
																			ui.draggable.appendTo(".cage5").css({"top":"-10px","left":0});
																			$(".cage6").droppable({
																				accept: ".cube6",
																				drop: function(event, ui){
																					$("#requirement_ref, #refresh").hide();
																					var endAudio = setInterval(function(){ myTimer() }, 1000);
																					function myTimer() {
																						if(audioTrackTasks._sounds[0]._ended == true){
																							audioTrackHints.play('go_next_1');
																							endAudioStop();
																							$("#btn_next").show().bind("click", function(){
																								parent.document.getElementsByClassName("lesson_selected")[0].parentElement.nextElementSibling.firstElementChild.click();
																							});
																						}
																					}
																					function endAudioStop() {
																						clearInterval(endAudio);
																					}
																					ui.draggable.appendTo(".cage6").css({"top":"-10px","left":0});
																				}
																			});																		
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});

						}
					});
				}
			},
			stop: function(event, ui){
				if(!$(".cage1").has(".cube2")){
					$(".cage1").css({"top":"240px"});
				}
			}
		});	
	}

	
	
	$(window).resize(function() {
		if ($(window).width() < 640) {
			$(".cubes").css({
				"width": "33px",
				"height": "33px"
			});
			$(".cage1").css({
				"width": "34px",
				"height": "28px"
			});
		}
		if ($(window).width() >= 640 && $(window).width() < 768) {				
			$(".cubes").css({
				"width": "48.8px",
				"height": "48.8px"
			});
			$(".cage1").css({
				"width": "48.8px",
				"height": "40.6px"
			});
		}
		if ($(window).width() >= 768) {				
			$(".cubes").css({
				"width": "60px",
				"height": "60px"
			});
			$(".cage1").css({
				"width": "60px",
				"height": "50px"
			});
		}
	});
});