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
		$this->create_tables_model->create_position_table();
		$get_position_name = $this->input->post('position_name');
		$get_position_group = $this->input->post('position_group');
		$get_position_parent_id = $this->input->post('parent_id');
		$data = array('position'=>$get_position_name,'position_group'=>$get_position_group, 'parent_id'=>$get_position_parent_id);
		if(!empty(get_position_name)){
			$this->db->insert('position', $data);
		//	copy($this->upload_folder .'images/content_default.jpg', $this->upload_folder .'images/content_'.$get_id.'.jpg');
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
		$get_info['lesson_keywords'] = $this->input->post('lesson_name') . ' ' .  $this->input->post('lesson_description') . ' ' . $this->input->post('lesson_keywords');
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
		$get_info['lesson_keywords'] = '';
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
	$get_info['name'] = 'Հարց';
	$get_info['type_name'] = 'question';	
	$get_info['type_id'] = '6';
	$get_info['parent_id'] = $this->input->post('parent_id');
	$get_info['question_id'] = $this->input->post('question_id');
	$get_info['number'] = 1;
	$get_info['free'] = 'off';
	$this->insert_tables_model->insert_folder_name($get_info);
	echo json_encode($get_info);
}





	public function add_license()
	{
		$_POST = json_decode(file_get_contents('php://input'), true);
		$this->load->model('insert_tables_model');
		$get_info['username'] = $this->input->post('username');
		$get_info['position_id'] = $this->input->post('position_id');
		$get_info['position_parent_id'] = $this->input->post('position_parent_id');
		$get_info['time_end'] =  $this->input->post('time_mount');

	
		$this->insert_tables_model->insert_add_license($get_info);
		//echo json_encode($get_info);
		
//echo "dg";
		//2.592.000
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

}
