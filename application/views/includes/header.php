<!DOCTYPE HTML >
<html ng-app="companyApp">
<head>
    <link rel="stylesheet"  href="<?=base_url();?>/public/css/bootstrap.min.css">
    <!--link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"-->
    <link rel="stylesheet"  href="<?=base_url();?>/public/css/st.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" charset="UTF-8">
	<title>LearnPro</title>
    <script src="<?=base_url();?>/public/js/vendor/jquery-3.1.1.min.js"></script>
    <script src="<?=base_url();?>/public/js/vendor/angular.min.js"></script>
    <script src="<?=base_url();?>/public/js/vendor/angular-ui-router.min.js"></script>
    <!--script src="https://cdnjs.cloudflare.com/ajax/libs/angular-touch/1.5.7/angular-touch.min.js"></script-->
    <script src="<?=base_url();?>/public/js/vendor/bootstrap.min.js"></script>
    <script src="<?=base_url();?>/public/js/vendor/ui-bootstrap.min.js"></script>
    <script src="<?=base_url();?>/public/js/vendor/ui-bootstrap-tpls.min.js"></script>
</head>
<body>
    <header ng-controller='headerCtrl'>
    <div style='position:absolute; top:0;right:0' id='nail' ng-click='nail()' class='icons_sm off'></div>
    <div style='position:absolute; top:0;right:50px'>
    <?php 
        if($this->session->userdata('usr')){
            echo lang('welcome') . ' ' . $this->session->userdata('usr');
        }
    ?>

    </div>
    <div>
        <div class='col-sx-3 col-sm-3 col-md-3 col-lg-3'>
                <a href="<?=base_url() . $this->uri->segment(1)?>"><div class="logo"></div></a>
        </div>
        <div class='col-sx-3 col-sm-3 col-md-3 col-lg-3'>
                <?php 
                    if(!$this->session->userdata('usr')){
                        echo anchor($this->session->userdata('lang'). "/login" , lang('signin'), 'id="singin" class="btn lp_link"');
                    }else{
                        echo anchor($this->session->userdata('lang'). "/login/logout" , lang('logout'), 'class="btn lp_link"');
                    }
                    echo anchor($this->session->userdata('lang'). "/login/signup" , lang('signup'), 'class="btn lp_link"');
                ?>
        </div>
        <div class='col-sx-6 col-sm-6 col-md-6 col-lg-6' style='position:absolute; top:20px;right:50px'>
                <?php 
                    if($this->uri->total_rsegments() > 2){
                      $url = explode('/', $this->uri->ruri_string(), $this->uri->total_rsegments());
                    }  
                    echo "<a href='".base_url()."en/".$this->uri->ruri_string()."' id='lang_en'><div id='flag_en' class='pull-right flags ".$this->uri->segment(1)."' title='".lang('english')."'></div></a>";
                    echo "<a href='".base_url()."ru/".$this->uri->ruri_string()."' id='lang_ru'><div id='flag_ru' class='pull-right flags ".$this->uri->segment(1)."' title='".lang('russian')."'></div></a>";
                    echo "<a href='".base_url()."am/".$this->uri->ruri_string()."' id='lang_am'><div id='flag_am' class='pull-right flags ".$this->uri->segment(1)."' title='".lang('armenian')."'></div></a>";
                ?>
        </div>
    </div>
    </header>    