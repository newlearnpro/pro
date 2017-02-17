<!DOCTYPE HTML >
<html ng-app="companyApp">
<head>
    <link rel="stylesheet"  href="<?=base_url();?>/public/css/vendor/bootstrap.min.css">    
    <link rel="stylesheet"  href="<?=base_url();?>/public/js/skin/blue.monday/css/jplayer.blue.monday.css">
    <link rel="stylesheet"  href="<?=base_url();?>/public/css/st.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" charset="UTF-8">
	<title>LearnPro</title>
    <script src="<?=base_url();?>/public/js/vendor/jquery-3.1.1.min.js"></script>
    <script src="<?=base_url();?>/public/js/vendor/jquery-ui.js"></script>
    <script src="<?=base_url();?>/public/js/vendor/jquery.jplayer.js"></script>
    <script src="<?=base_url();?>/public/js/vendor/angular.min.js"></script>
    <script src="<?=base_url();?>/public/js/vendor/angular-ui-router.min.js"></script>
    <!--script src="https://cdnjs.cloudflare.com/ajax/libs/angular-touch/1.5.7/angular-touch.min.js"></script-->
    <script src="<?=base_url();?>/public/js/vendor/bootstrap.min.js"></script>
    <script src="<?=base_url();?>/public/js/vendor/ui-bootstrap.min.js"></script>
    <script src="<?=base_url();?>/public/js/vendor/ui-bootstrap-tpls.min.js"></script>
</head>
<body>
    <header ng-controller='headerCtrl'>
            <div class='col-xs-12 col-sm-12 col-md-12 col-lg-12 header-part1'>
                <span>
                    <?php 
                        if($this->session->userdata('usr')){
                            echo lang('welcome') . ' ' . $this->session->userdata('usr');
                        }
                    ?> 
                </span>
                <div  id='nail' ng-click='nail()' class='icons_sm off'></div>
            </div>



 
            <div class='col-xs-6 col-sm-4 col-md-3 col-lg-2 header-parts header-part2'>
                <a href="<?=base_url() . $this->uri->segment(1)?>"><div class="logo"></div></a>
            </div>


            <div class='col-xs-6 col-sm-4 col-md-3 col-lg-3 header-parts header-part3'>
                <span class='glyphicon glyphicon-phone-alt'></span>
                <a href='tel:011211211'>(011 211 211)</a>
            </div>
            

            <div class='col-xs-12 col-sm-4 col-md-3 col-lg-4 header-parts header-part4'>
                    <?php 
                        if(!$this->session->userdata('usr')){
                            echo anchor($this->uri->segment(1). "/login" , lang('signin'), 'id="singin" class="btn btn-xs lp_link"');
                        }else{
                            echo anchor($this->uri->segment(1). "/login/logout" , lang('logout'), 'class="btn btn-xs lp_link"');
                        }
                        
                        echo anchor($this->uri->segment(1). "/login/signup" , lang('signup'), 'class="btn btn-xs lp_link"');
                    ?>

            </div>



            <div class='col-xs-12 col-sm-12 col-md-3 col-lg-3 header-parts header-part5' >
            

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