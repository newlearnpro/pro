<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

	public function __construct() {
        parent::__construct();
        $this->load->model('create_tables_model');
        $this->load->model('membership_model');        
        $this->lang->load('language_form',$this->uri->segment(1));
        $this->session->set_userdata('lang',$this->uri->segment(1));


      //  echo $this->input->post('aa');
    }

	public function index()
	{
		if($this->session->userdata('prm')==='admin'){
			$this->load->view('includes/header');
			$this->load->view('admin_view');
			$this->load->view('includes/footer');
		}else{
		    redirect($this->uri->segment(1).'/login');
		}
	}

	public function users_info()
	{
		$_POST = json_decode(file_get_contents('php://input'), true);		
		$get_info = $this->input->post('users');
		if($this->session->userdata('prm')==='admin'){
			$query = $this->membership_model->users('admin', $get_info);
		}else{
			$query = $this->membership_model->users('user', $get_info);
		}
		echo json_encode($query);
	}

	public function users_change()
	{
		$_POST = json_decode(file_get_contents('php://input'), true);		
		$get_info = $this->input->post('edit_user');
		$this->membership_model->users_change($get_info);		
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

	public function create_position()
	{
		$_POST = json_decode(file_get_contents('php://input'), true);
		$this->create_tables_model->create_position_table();
		$get_info = $this->input->post('position');
		$get_info2 = $this->input->post('parent_id');
		$data = array('position'=>$get_info[0], 'custom_id'=>'1', 'parent_id'=>$get_info2);
		if(!empty($get_info[0])){
			$this->db->insert('position', $data);
		}
	}

	public function edit_position()
	{
		$_POST = json_decode(file_get_contents('php://input'), true);
		//$this->create_tables_model->create_position_table();


//$this->db->set('field', 'field+1');
//$this->db->where('id', 2);
//$this->db->update('mytable'); 





		$get_info = $this->input->post('id');
		$get_info2 = $this->input->post('position');
			$this->db->set('position', $get_info2);
			$this->db->where('id', $get_info);
			$this->db->update('position');

	}

	public function remove_position()
	{
		$_POST = json_decode(file_get_contents('php://input'), true);
		//$this->create_tables_model->create_position_table();
		$get_info = $this->input->post('id');
			$this->db->where('id', $get_info);
			$this->db->delete('position');

	}

	public function load_position()
	{
		$query = $this->membership_model->position();
		echo json_encode($query);
	}

	public function add_class()
	{

	/*	$path = __DIR__."../";

		$dir    = dirname($path);
		$files1 = scandir($dir);
	//	$files2 = scandir($dir, 1);

		print_r($files1);
	//	print_r($files2);
echo __DIR__;*/

//$css['css'] = directory_map('public/css');
		$this->load->helper('directory');
		$map1 = directory_map('uploads', 2);


		//return $map1;
		print_r(json_encode($map1));
		//echo br() . $map1[0];
		


	}

}
