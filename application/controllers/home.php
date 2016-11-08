<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */

	public function __construct() {
        parent::__construct();
      $this->lang->load('language_form', $this->uri->segment(1));
      if($this->uri->segment(1)){
       		$this->session->set_userdata('lang', $this->uri->segment(1));
      }else if(!$this->uri->segment(1) && $this->session->userdata('lang')){
       	 	$this->session->set_userdata('lang', $this->session->userdata('lang'));
      }else if(!$this->session->userdata('lang')){
      		$this->session->set_userdata('lang', 'ru');
      }
     // $this->session->set_userdata('name','name');
      
		
	//echo $this->session->userdata('name');





    //   $this->session->set_userdata('language','am');
     //   echo $this->session->userdata('name');
    //   echo session_id() . "<br>";
//$this->config->set_item('language', 'en');


//if (session_id()) return true;
//else session_start();

//if(session_id() == '')  
/*session_start();
//session_id(6d00q6daepgeu2jgrsrvpom5d4);
//$_SESSION['name'] = 'Artak';
//$_SESSION['lang'] = 'en';

//unset($_SESSION['lang']);
//session_destroy();

echo  session_id() . "<br>";
//print_r($_SESSION);
echo $_SESSION['name'];
echo $_SESSION['lang'];*/



/*
  session_start();
  $arr = array("first", "second", "third");
  $_SESSION['arr'] = $arr;
 

*/


       // $this->load->library('session');
     //  if($this->input->post('language')){
			//$this->config->set_item('language', 'en');
			
			//echo $this->config->item('language');
//		}
 //$this->load->model('sess');
 //$this->sess->session();
 	

/*
if($this->session->userdata('usr')){
	print_r($this->session->userdata('usr'));
	//	$this->session->unset_userdata(array('usr', 'pwd', 'lang'));
		redirect($this->session->userdata('lang') .'/main');
	}
    
if($this->uri->segment(1)){	
	$this->session->set_userdata('lang', $this->uri->segment(1));
	print_r($this->session->userdata('lang')); 
}
if(!$this->uri->segment(1)){
	//$this->session->unset_userdata('lang');

		//echo "tes";
		$this->config->set_item('language', $this->session->userdata('lang'));
}*/


 

        //if($this->uri->segment(1) == 'am' || $this->uri->segment(1) == 'en' || !is_null($this->uri->segment(1))){
        //	$this->session->set_userdata('lang', $this->uri->segment(1));        
		
 			
    	//}
    }

   /* public function __construct()
	{
        parent::__construct();
        if($this->uri->segment(1)){
             $this->lang_uri();
        }
        else{
             $user_language = $this->session->userdata('language');  
             $this->config->set_item('language', $user_language);
        }
	}*/


	public function index()
	{
		if($this->session->userdata('usr')){
			if($this->session->userdata('prm')==='admin'){
				redirect($this->session->userdata('lang').'/admin');
			}else{
				redirect($this->session->userdata('lang').'/main');
			}
		}else{
	        $this->load->view('includes/header');
			$this->load->view('home_view');
			$this->load->view('includes/footer');  
		}
	}
}
