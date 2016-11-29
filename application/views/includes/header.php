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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-touch/1.5.7/angular-touch.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.1.3/ui-bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.1.3/ui-bootstrap-tpls.min.js"></script>
</head>
<body>
    <div id='fullIframe' class='fullIframe' ></div>
    <section id='fullPage'>
    <header>
        <div>
        <?php 
            echo $this->session->userdata('usr');
        ?>

        </div>
        <div>
        <?php 
           // echo heading('This is header page', 3);
          //  echo $this->uri->total_rsegments(). br();
           // echo br() . $this->uri->ruri_string() . br();
            //echo session_id() . "<br>";
            
         //   echo $this->session->userdata('lang'). "<br>";
            

            if($this->uri->total_rsegments() > 2){
              $url = explode('/', $this->uri->ruri_string(), $this->uri->total_rsegments());
            }  
            echo "<a href='".base_url()."am/".$this->uri->ruri_string()."' id='lang_am'><div id='flag_am' class='flags ".$this->uri->segment(1)."' title='".lang('armenian')."'></div></a>";
            echo "<a href='".base_url()."ru/".$this->uri->ruri_string()."' id='lang_ru'><div id='flag_ru' class='flags ".$this->uri->segment(1)."' title='".lang('russian')."'></div></a>";
            echo "<a href='".base_url()."en/".$this->uri->ruri_string()."' id='lang_en'><div id='flag_en' class='flags ".$this->uri->segment(1)."' title='".lang('english')."'></div></a>";
            
           /* 
             echo anchor('am/'. $this->uri->ruri_string(), lang('armenian'), 'id="lang_am"  class=" '.$this->uri->segment(1).'"');
            echo anchor('ru/'. $this->uri->ruri_string(), lang('russian'), 'id="lang_ru" class=" '.$this->uri->segment(1).'"');
           echo anchor('en/'. $this->uri->ruri_string(), lang('english'), 'id="lang_en" class=" '.$this->uri->segment(1).'"'); 
          */ 


            if(!$this->session->userdata('usr')){
                echo anchor($this->session->userdata('lang'). "/login" , lang('signin'), 'id="singin" class="btn btn-primary"');
            }else{
                echo anchor($this->session->userdata('lang'). "/login/logout" , lang('logout'), 'class="btn btn-primary"');
            }

            echo anchor($this->session->userdata('lang'). "/login/signup" , lang('signup'), 'class="btn btn-primary"');
        ?></div>
        <hr />
    </header>

    