<!DOCTYPE HTML >
<html ng-app="companyApp">
<head>
    <link rel="stylesheet"  href="<?=base_url();?>/public/css/vendor/bootstrap.min.css">    
    <link rel="stylesheet"  href="<?=base_url();?>/public/js/skin/blue.monday/css/jplayer.blue.monday.css">
    
    <link rel="stylesheet"  href="<?=base_url();?>/public/css/vendor/tabs.css">
    <link rel="stylesheet"  href="<?=base_url();?>/public/css/lp_glyphicons.css">
    <link rel="stylesheet"  href="<?=base_url();?>/public/css/st.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" charset="UTF-8">
	<title>LearnPro</title>
    <script type="text/javascript" src="<?=base_url();?>/public/js/vendor/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="<?=base_url();?>/public/js/vendor/jquery-ui.js"></script>
    <script type="text/javascript" src="<?=base_url();?>/public/js/vendor/jquery.jplayer.js"></script>
    <script type="text/javascript" src="<?=base_url();?>/public/js/vendor/angular.min.js"></script>
    <script type="text/javascript" src="<?=base_url();?>/public/js/vendor/angular-ui-router.min.js"></script>
    <!--script src="https://cdnjs.cloudflare.com/ajax/libs/angular-touch/1.5.7/angular-touch.min.js"></script-->
    <script type="text/javascript" src="<?=base_url();?>/public/js/vendor/bootstrap.min.js"></script>
    <script type="text/javascript" src="<?=base_url();?>/public/js/vendor/ui-bootstrap.min.js"></script>
    <script type="text/javascript" src="<?=base_url();?>/public/js/vendor/ui-bootstrap-tpls.min.js"></script>
    <!--script src="<?=base_url();?>/public/js/vendor/cbpFWTabs.js"></script-->
</head>
<body>
    <header ng-controller='headerCtrl'>
        <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 header-part1'>
            <span><?php if($this->session->userdata('usr')){echo lang('welcome') . ' ' . $this->session->userdata('usr');} ?></span>
            <div  id='nail' ng-click='nail()' class='icons_sm off'></div>
        </div>


        <div class='col-xs-5 col-sm-6 col-md-3 col-lg-3 header-parts header-part2'>
            <a href="<?=base_url() . $this->uri->segment(1) . '/main/index/list' ?>"><div class="logo"></div></a>
        </div>


        <div class='col-xs-7 col-sm-6 col-md-2 col-lg-3 header-parts header-part3'>
            <div>                    
                <a href='https://www.facebook.com/Learnpro.am' target='_blank'>
                    <span id='icon_facebook' class='icons_sm icons_fwtp'></span>
                </a>
                <a href='https://vimeo.com/user34458599/videos' target='_blank'>
                    <span id='icon_wimeo' class='icons_sm icons_fwtp'></span>
                </a>
                <a href='https://twitter.com/LearnProAM' target='_blank'>
                    <span id='icon_twitter' class='icons_sm icons_fwtp'></span>
                </a>
                <a href='https://www.pinterest.com/learnpro2' target='_blank'>
                    <span id='icon_pinterest' class='icons_sm icons_fwtp'></span>
                </a>
            </div>
            <span class='icon icon-phone'></span>
            <a href='tel:011211211'>(011 211 211)</a>
        </div>
            

        <div class='col-xs-12 col-sm-6 col-md-4 col-lg-3 header-parts header-part4'>
                <?php
                    if(!$this->session->userdata('usr')){
                        echo anchor($this->uri->segment(1). "/login" , lang('signin'), 'id="singin" class="btn btn-xs lp_btn lp_btn_half icon icon-enter"');
                        echo anchor($this->uri->segment(1). "/login/signup" , lang('signup'), 'class="btn btn-xs lp_btn lp_btn_half icon icon-user-plus"');
                    }else{
                        if($this->session->userdata('usr') == $this->session->userdata('pwd')){
                            echo anchor($this->uri->segment(1). "/login/end" , lang('logout'), 'class="btn btn-xs lp_btn lp_btn_half icon icon-exit" ng-click="schoolLogout()"');
                        }else{
                            echo anchor($this->uri->segment(1). "/login/logout" , lang('logout'), 'class="btn btn-xs lp_btn lp_btn_half icon icon-exit"');
                            echo anchor($this->uri->segment(1). "/login/signup" , lang('signup'), 'class="btn btn-xs lp_btn lp_btn_half icon icon-user-plus"');
                        }
                    }
                    echo anchor("https://www.youtube.com/watch?v=v_3Zf5IwbDg" , lang('how_to_use'), 'class="btn btn-xs lp_btn lp_btn_full icon icon-play" target="_blank"');
                ?>
        </div>



        <div class='col-xs-12 col-sm-6 col-md-3 col-lg-3 header-parts header-part5' >

                <?php
                    if($this->uri->total_rsegments() > 2){
                      $url = explode('/', $this->uri->ruri_string(), $this->uri->total_rsegments());
                    }  
                    echo "<a href='".base_url()."en/".$this->uri->ruri_string()."' id='lang_en'><div id='flag_en' class='pull-right flags ".$this->uri->segment(1)."' title='".lang('english')."'></div></a>";
                    echo "<a href='".base_url()."ru/".$this->uri->ruri_string()."' id='lang_ru'><div id='flag_ru' class='pull-right flags ".$this->uri->segment(1)."' title='".lang('russian')."'></div></a>";
                    echo "<a href='".base_url()."am/".$this->uri->ruri_string()."' id='lang_am'><div id='flag_am' class='pull-right flags ".$this->uri->segment(1)."' title='".lang('armenian')."'></div></a>";
                ?>
        </div>
    </header>