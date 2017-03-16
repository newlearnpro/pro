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
		$usr['username'] = $this->session->userdata('usr');
		if($this->session->userdata('prm')==='user'){
			$this->load->view('includes/header');
			$this->load->view('main_view', $usr);
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

	public function user_personal_page(){
		$_POST = json_decode(file_get_contents('php://input'), true);
		$get_info = $this->input->post('user');
		$this->load->model('membership_model');
		$query = $this->membership_model->user_page($get_info);		
		echo json_encode($query);
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

	public function load_hint_lesson()
	{
		$_POST = json_decode(file_get_contents('php://input'), true);
		$this->load->model('membership_model');
		$get_info['id'] = $this->input->post('id');
		$query = $this->membership_model->hint_lesson($get_info);
		echo json_encode($query);		
	}

	public function get_lessons()
	{
	//	$_POST = json_decode(file_get_contents('php://input'), true);
		$this->load->model('membership_model');
		$query = $this->membership_model->lesson();
		echo json_encode($query);
	}

	public function get_questions()
	{
	//	$_POST = json_decode(file_get_contents('php://input'), true);
		$this->load->model('membership_model');
		$get_info['position_id'] = $this->input->get('parent_id');
		$get_info['question_id'] = $this->input->get('question_id');
		$query = $this->membership_model->question($get_info);
		echo json_encode($query);
	}

	public function get_last_question_id()
	{
	//	$_POST = json_decode(file_get_contents('php://input'), true);
		$this->load->model('membership_model');		
		$query = $this->membership_model->last_question_id();
		echo $query;
	}

/*
	public function users_data(){
		$get_info['id'] = $this->input->get('lesson_id');
		$get_info['username'] = $this->input->get('username');		
		$get_info['name'] = $this->input->get('lesson_name');
		$this->load->model('insert_tables_model');
		$query = $this->insert_tables_model->insert_users_data($get_info);
	}
	*/

	public function get_users_license_code(){
		$_POST = json_decode(file_get_contents('php://input'), true);
		$this->load->model('membership_model');
		$get_info['username'] = $this->input->post('username');
	//	$get_info['position_id'] = $this->input->post('position_id');
//		$get_info['position_parent_id'] = $this->input->post('position_parent_id');
		//$get_info['class_name'] = $this->input->post('class_name');
		$query = $this->membership_model->get_license_code($get_info);
		echo json_encode($query);
	}

	public function get_users_license_code_bypos(){
		$_POST = json_decode(file_get_contents('php://input'), true);
		$this->load->model('membership_model');
		$get_info['username'] = $this->input->post('username');
		$get_info['position_id'] = $this->input->post('position_id');

	//	$get_info['position_id'] = $this->input->post('position_id');
//		$get_info['position_parent_id'] = $this->input->post('position_parent_id');
		//$get_info['class_name'] = $this->input->post('class_name');
		$query = $this->membership_model->get_license_code_bypos($get_info);
		echo json_encode($query);
	}


	public function confirm_users_license_code(){
		$_POST = json_decode(file_get_contents('php://input'), true);


		$query = $this->db->get_where('users_license_code', array('license_code'=>$this->input->post('license_code')));
		echo json_encode($query);



        $data = array(          
            'username' => $this->input->post('username'),
            'start_time' => $this->input->post('start_time')
        );
       //  $where = "(license_code='$this->input->post(license_code)')";
        $where = array('license_code'=> $this->input->post('license_code'), 'start_time'=>0);
        $this->db->where($where);
        $this->db->update('users_license_code', $data);

	}

	public function get_teachers_markers(){

		$this->load->model('membership_model');
		$get_info['lesson_id'] = $this->input->get('lesson_id');
		$get_info['username'] = $this->input->get('username');
		//$get_info['class_name'] = $this->input->post('class_name');
		$query = $this->membership_model->get_markers($get_info);
		echo json_encode($query);

	}

	public function add_teachers_markers(){
		$_POST = json_decode(file_get_contents('php://input'), true);
		$this->load->model('insert_tables_model');
		$get_info['username'] = $this->input->post('username');
		$get_info['lesson_id'] = $this->input->post('lesson_id');
		$get_info['start_time'] = $this->input->post('start_time');
		$get_info['end_time'] = $this->input->post('end_time');

		//echo "fsd";
	//	
		$query = $this->insert_tables_model->insert_markers($get_info);
	}
	public function remove_teachers_markers(){
		$_POST = json_decode(file_get_contents('php://input'), true);
		$get_info['id'] = $this->input->post('id');
		$this->db->delete('teachers_data', array('id' => $get_info['id']));
		echo 'teachers current marker is deleted';
	}

}
