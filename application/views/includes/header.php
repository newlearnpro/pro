<!DOCTYPE HTML >
<html ng-app="companyApp">
<head>
    <!--link rel="stylesheet"  href="<?=base_url();?>/public/css/bootstrap.min.css"-->
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet"  href="<?=base_url();?>/public/css/style.css">
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
    <header>
        <div><?php 
            echo heading('This is header page', 3);
          //  echo $this->uri->total_rsegments(). br();
           // echo br() . $this->uri->ruri_string() . br();
            echo session_id() . "<br>";
            echo $this->session->userdata('usr'). "<br>";
         //   echo $this->session->userdata('lang'). "<br>";
            

            if($this->uri->total_rsegments() > 2){
              $url = explode('/', $this->uri->ruri_string(), $this->uri->total_rsegments());
            }               
             echo anchor('ru/'. $this->uri->ruri_string(), lang('russian'), 'id="lang_ru" class="btn btn-primary '.$this->uri->segment(1).'"');
             echo anchor('en/'. $this->uri->ruri_string(), lang('english'), 'id="lang_en" class="btn btn-primary '.$this->uri->segment(1).'"'); 


            if(!$this->session->userdata('usr')){
                echo anchor($this->session->userdata('lang'). "/login" , lang('signin'), 'id="singin" class="btn btn-primary"');
            }else{
                echo anchor($this->session->userdata('lang'). "/login/logout" , lang('logout'), 'class="btn btn-primary"');
            }
        ?></div>
        <hr />
    </header>

    