<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	public function __construct() {
        parent::__construct();
      $this->lang->load('language_form', $this->uri->segment(1));
      /*if($this->uri->segment(1)){
       		$this->session->set_userdata('lang', $this->uri->segment(1));
      }else if(!$this->uri->segment(1) && $this->session->userdata('lang')){
       	 	$this->session->set_userdata('lang', $this->session->userdata('lang'));
      }else if(!$this->session->userdata('lang')){
      		$this->session->set_userdata('lang', 'am');

      }*/

      if(!$this->uri->segment(1)){
      	redirect('am');
      }
     
      
    }




	public function index()
	{

	//	redirect($this->uri->segment(0));
	/*	$ipAddress=$_SERVER['REMOTE_ADDR'];
		$data['mac_address']=false;

			$arp=`arp -a $ipAddress`;
		

		

		$lines=explode("\n", $arp);

		#look for the output line describing our IP address
		foreach($lines as $line)
		{
		   $cols=preg_split('/\s+/', trim($line));
		   if ($cols[0]==$ipAddress)
		   {
		       //$macAddr=$cols[1];
		   		//$data['mac_address']=$arp;
		       //$data['mac_address']=$cols[1];


		   		$data['mac_address']=`ipconfig /all`;
		   }
		}*/



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
