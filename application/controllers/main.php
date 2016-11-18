<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {

	public function __construct() {
        parent::__construct(); 
       // $this->load->model('membership_model'); 
        
 	    $this->lang->load('language_form', $this->uri->segment(1));
 	    $this->session->set_userdata('lang',$this->uri->segment(1));

    }

	public function index()
	{
		$urs['username'] = $this->session->userdata('usr');
		if($this->session->userdata('prm')!=='admin'){
			$this->load->view('includes/header');
			$this->load->view('main_view', $urs);
			$this->load->view('includes/footer'); 
		}else{
		    redirect($this->uri->segment(1).'/login');
		}
	}


		public function admin_lang()
	{
		$_POST = json_decode(file_get_contents('php://input'), true);
		$get_info = $this->input->post('data');
		for($i = 0; $i < count($get_info); $i++){
			$lang[$get_info[$i]] = lang($get_info[$i]);
		}

		echo json_encode($lang);
	}

	public function send_message()
	{
		$_POST = json_decode(file_get_contents('php://input'), true);
		$this->load->model('insert_tables_model');
		$get_info = $this->input->post('message_box');
		$this->insert_tables_model->insert_message_text($get_info);
	//	echo json_encode($mes);
	}
	
	public function load_message()
	{
		$_POST = json_decode(file_get_contents('php://input'), true);
		$this->load->model('membership_model');
		$get_info = $this->input->post('message_box');
		$get_messages = $this->membership_model->messages($get_info);
		echo json_encode($get_messages);
	}

	public function load_position()
	{
		$this->load->model('membership_model');
		$query = $this->membership_model->position();
		echo json_encode($query);
	}

	public function load_lesson()
	{
		$_POST = json_decode(file_get_contents('php://input'), true);
		$this->load->model('membership_model');
		$get_info = $this->input->post('id');
		$query = $this->membership_model->main_lesson($get_info);
		echo json_encode($query);
	}

	public function get_lessons()
	{
		$_POST = json_decode(file_get_contents('php://input'), true);
		$this->load->model('membership_model');
		$query = $this->membership_model->lesson();
		echo json_encode($query);
	}
}
