<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>

<div ng-cloak class='blockHead'>
<!--div class='blockHead'>Բարև սա գլխավոր էջն է
	<p>Page rendered in <strong>{elapsed_time}</strong> seconds.</p-->

	<div id='lp_carousel' class='carousel slide'>
		<ol class='carousel-indicators'>
		    <li data-target='#lp_carousel' data-slide-to='0' class='active'></li>
		    <li data-target='#lp_carousel' data-slide-to='1' ></li>
		    <li data-target='#lp_carousel' data-slide-to='2' ></li>
	  	</ol>
		<div class='carousel-inner' >
			<div class='item active'>
				<img class='slide_img' style='width:100%; max-width: 1400px; display: block; margin:auto' alt='slide1' class='img-responsive' src='<?=base_url()?>public/img/slide/slide_1.jpg' />
				<div class='carousel-caption'>
					<h1>ԿՐԹՎԱԾ ՆՇԱՆԱԿՈՒՄ Է ՊԱՇՏՊԱՆՎԱԾ</h1>
					<h3><a href='#' style='border:2px solid white'>ՍԿՍԵԼ ՈՒՍՈՒՑՈՒՄԸ</a></h3>
				</div>				
			</div>
			<div class='item'>
				<img class='slide_img' alt='slide1' class='img-responsive' src='<?=base_url()?>public/img/slide/slide_2.jpg' />
			</div>
			<div class='item'>
				<img class='slide_img' alt='slide1' class='img-responsive' src='<?=base_url()?>public/img/slide/slide_3.jpg' />
			</div>
		</div>
	</div>
</div>