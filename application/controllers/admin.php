<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

	private $upload_folder = 'uploads/';

	public function __construct() {
        parent::__construct();
        $this->load->model('create_tables_model');
        $this->load->model('membership_model');        
        $this->lang->load('language_form',$this->uri->segment(1));
        $this->session->set_userdata('lang',$this->uri->segment(1));
    }

	public function index()
	{
		if($this->session->userdata('prm')==='admin'){
			//echo $this->uri->segment(3);			
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
		}else if($this->session->userdata('prm')==='user'){
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
	//	$this->create_tables_model->create_position_table();
		$get_position_name = $this->input->post('position_name');
		$get_position_keywords = $this->input->post('position_name') . ' ' . $this->input->post('position_keywords');
		$get_position_license_type = $this->input->post('license_type');
		$get_position_parent_id = $this->input->post('parent_id');
		$data = array('position'=>$get_position_name, 'keywords'=>$get_position_keywords, 'license_type'=>$get_position_license_type, 'parent_id'=>$get_position_parent_id);
		if(!empty(get_position_name)){
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
		$get_info_id = $this->input->post('id');
		$this->db->where('id', $get_info_id);
		$this->db->or_where('parent_id', $get_info_id);
		$tables = array('position', 'file');
		$this->db->delete($tables);
	}

	public function load_position()
	{
		$query = $this->membership_model->position();		
		echo json_encode($query);		
	}

	public function load_lesson()
	{
		$query = $this->membership_model->lesson();
		echo json_encode($query);
	}

	public function edit_number_lesson()
	{
		$_POST = json_decode(file_get_contents('php://input'), true);
		$get_info_id = $this->input->post('id');
		$get_info_number = $this->input->post('number');
		$this->db->set('number', $get_info_number);
		$this->db->where('id', $get_info_id);
		$this->db->update('file');
		//echo $get_info_id;
	}

	public function remove_lesson()
	{
		$_POST = json_decode(file_get_contents('php://input'), true);		
		$get_info_id = $this->input->post('id');
		$get_info_src = $this->input->post('src');
		$lesson_type = 'lesson_type_' . substr($get_info_src,1,1);
		$this->db->where('id', $get_info_id);
		$this->db->delete('file');
		$path = $this->upload_folder . $lesson_type .'/'. $get_info_src;
		$this->remove_dir($path);
	}

	private function remove_dir($path) {
	     // Open the source directory to read in files
	        $item = new DirectoryIterator($path);
	        foreach($item as $folder) {
	            if($folder->isFile()) {
	                unlink($folder->getRealPath());
	            } else if(!$folder->isDot() && $folder->isDir()) {
	                $this->remove_dir($folder->getRealPath());
	            }
	        }
	        rmdir($path);
	}


/*************************************
into add lesson case there is opportunity add zip file whitch will extract.
We must write 'name', 'description', 'keywords' into the fields
*************************************/
public function add_lesson()
{
	$this->load->model('insert_tables_model');
	if($this->input->post('btn_zip')){
		$date = date('U');
		$get_info['lesson_name'] = 	$this->input->post('lesson_name');
		$get_info['lesson_description'] = 	$this->input->post('lesson_description');
//		$get_info['lesson_keywords'] = $this->input->post('lesson_name') . ' ' .  $this->input->post('lesson_description') . ' ' . $this->input->post('lesson_keywords');
		$get_info['lesson_src'] = '0' . $this->input->post('lesson_type_id') . ($this->input->post('lesson_parent_id')*1) . '_'.$date.'';
		$get_info['lesson_type_name'] = 	$this->input->post('lesson_type_name');
		$get_info['lesson_type_id'] = 	$this->input->post('lesson_type_id');
		$get_info['lesson_parent_id'] = $this->input->post('lesson_parent_id') * 1;	
		$this->input->post('lesson_is_free') ? $get_info['lesson_is_free'] = $this->input->post('lesson_is_free') : $get_info['lesson_is_free'] = 'off';
	    $output = '';
	    		   
	    if($_FILES['zip_file']['name'] != ''){
	    	   mkdir($this->upload_folder .'lesson_type_'.$get_info['lesson_type_id'].'/'. '0' . $get_info['lesson_type_id'] . $get_info['lesson_parent_id'] . '_'.$date.'', 0777); 		           	
	           $file_name = $_FILES['zip_file']['name'];
	           $array = explode(".", $file_name);
	        //   $name = $array[0];  
	           $ext = $array[1];  
	           
	           if($ext == 'zip'){
					$this->insert_tables_model->insert_folder_name($get_info);
	                $path = $this->upload_folder .'lesson_type_'.$get_info['lesson_type_id'].'/' .'0' . $get_info['lesson_type_id'] . $get_info['lesson_parent_id'] . '_'.$date.'/';
	                $location = $path . $file_name;
	                if(move_uploaded_file($_FILES['zip_file']['tmp_name'], $location )){
	                    $zip = new ZipArchive;
	                    if($zip->open($location)){
	                          $zip->extractTo($path);
	                          $zip->close();
	                    }					 
	                }
        		}
    	}
    	redirect($this->uri->segment(1).'/admin/index/addlesson');
	}
	if($this->input->post('add_seperator')){
		$get_info['lesson_name'] = 	'';
		$get_info['lesson_description'] = 	'';
	//	$get_info['lesson_keywords'] = '';
		$get_info['lesson_src'] = '';
		$get_info['lesson_type_name'] = $this->input->post('lesson_type_name');
		$get_info['lesson_type_id'] = 0;
		$get_info['lesson_parent_id'] = $this->input->post('lesson_parent_id') * 1;	
		$get_info['lesson_is_free'] = 'off';
		$this->insert_tables_model->insert_folder_name($get_info);
		redirect($this->uri->segment(1).'/admin/index/addlesson');
	}
}



public function add_question()
{
	$_POST = json_decode(file_get_contents('php://input'), true);
	$this->load->model('insert_tables_model');
	$get_info['position_id'] = $this->input->post('position_id');
	$get_info['question_type'] = $this->input->post('question_type');
	$get_info['question'] = $this->input->post('question');
	$get_info['answers'] = $this->input->post('answers');
	$get_info['correct_answer'] = $this->input->post('correct_answer');
	$get_info['hint_lessons_id'] = $this->input->post('hint_lessons_id');
	$get_info['question_id'] = $this->input->post('question_id');
	$this->insert_tables_model->insert_question($get_info);
	echo json_encode($get_info);
}

public function add_question_as_lesson()
{
	$_POST = json_decode(file_get_contents('php://input'), true);
	$this->load->model('insert_tables_model');
	$get_info['name'] = $this->input->post('name');
	$get_info['type_name'] = 'question';	
	$get_info['type_id'] = '6';
	$get_info['parent_id'] = $this->input->post('parent_id');
	$get_info['question_id'] = $this->input->post('question_id');
	$get_info['number'] = 1;
	$get_info['free'] = 'off';
	$this->insert_tables_model->insert_folder_name($get_info);
	echo json_encode($get_info);
}


public function upload_picure()
{
	$picture_name = $this->input->post('lesson_parent_id');
	$file_name = 'content_' . stristr($picture_name, ' ', true);
	$config = array(
		'upload_path' => $this->upload_folder . 'images/',
		'file_name' => $file_name,
		'allowed_types' => 'jpg',
		'overwrite' => TRUE,
		'max_size' => '4096000',
		'max_height' => '768',
		'max_width' => '1024'
	);

	$this->load->library('upload', $config);
	if($this->upload->do_upload('userfile')){
		redirect($this->uri->segment(1).'/admin/index/uploadpicture');
	}
}




	public function sessions_info()
	{
		$this->load->model('membership_model');
		$query = $this->membership_model->ci_sessions_info();
		echo json_encode($query);    
	}
	
	public function sessions_remove()
	{
		$_POST = json_decode(file_get_contents('php://input'), true);
		$get_info = $this->input->post('session_id');
		$this->db->delete('ci_sessions', array('id' => $get_info));
	}



	public function xml()
	{
		
		/*if (file_exists('../html/data/users_fin.xml')) {
			$xml = simplexml_load_file('../html/data/users_fin.xml');
			foreach ($xml->children() as $children) {
		        $users_data = array(         
		            //'id' => $children->id,
		            'username' => $children->username,
		            'password' => $children->password,
		            'first_name' => $children->first_name,
		            'last_name' => $children->last_name,
		            'status' => $children->status,
		            'gender' => $children->gender,
		            'age' => $children->age,
		            'email' => $children->email,
		            'activation_code' => $children->activation_code,
		            'activation' => $children->activation,
		            'activation_schoolclick' => $children->activation_schoolclick,
		            'permission' => $children->permission
		        );         
		        $insert = $this->db->insert('users', $users_data);
			}
		} else {
		    exit('Failed to open users.xml.');
		}*/
/*
		if (file_exists('../html/data/users_license_code_part1_fin.xml')) {
			$xml = simplexml_load_file('../html/data/users_license_code_part1_fin.xml');
			foreach ($xml->children() as $children) {
		        $users_data = array(         
		            //'id' => $children->id,
		            'license_code' => $children->license_code,
		            'username' => $children->username,
		            'description' => $children->description,
		            'license_type' => $children->license_type,
		            'position_id' => $children->position_id,
		            'mount_count' => $children->mount_count,
		            'start_time' => $children->start_time
		        );         
		        $insert = $this->db->insert('users_license_code', $users_data);
			}
		} else {
		    exit('Failed to open users_license_code_fin.xml.');
		}*/
	}
}
