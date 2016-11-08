<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Youtube extends CI_Controller {

	public function __construct() {
        parent::__construct();   	        
        $this->load->model('membership_model');       
        $this->lang->load('language_form', $this->uri->segment(1)); 
        $this->session->set_userdata('lang',$this->uri->segment(1));               
    }

	public function index()
	{
	/*	$file = 5;
		if($this->security->xss_clean($file, true) == false){
			echo 'ne proshol';
		}*/

		//send_email('g.artak@yahoo.com', 'example', 'hello');

        $this->load->view('includes/header');
		$this->load->view('youtube_view');
		$this->load->view('includes/footer');  
	}


	public function users_info()
	{
		$query = $this->membership_model->users();
		if($this->input->get('up') == true){
			echo json_encode($query);
		}
		//echo $this->input->get('params');
		// 	echo json_encode($query);  		
	}	
}
