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

	public function add_lesson()
	{
		$this->load->model('insert_tables_model');
		if($this->input->post('btn_zip')){
			$date = date('U');
			$get_info['lesson_name'] = 	$this->input->post('lesson_name');
			$get_info['lesson_description'] = 	$this->input->post('lesson_description');			
			$get_info['lesson_type_id'] = 	$this->input->post('lesson_type_id');
			$get_info['lesson_parent_id'] = $this->input->post('lesson_parent_id') * 1;
			$get_info['lesson_src'] = '0' . $get_info['lesson_type_id'] . $get_info['lesson_parent_id'] . '_'.$date.'';
		    $output = '';  
		    
		   
		    if($_FILES['zip_file']['name'] != ''){ 
		    	   mkdir('uploads/0' . $get_info['lesson_type_id'] . $get_info['lesson_parent_id'] . '_'.$date.'', 0777); 		           	
		           $file_name = $_FILES['zip_file']['name'];  

		           $array = explode(".", $file_name);  		   

		           $name = $array[0];  
		           $ext = $array[1];  
		           
		           if($ext == 'zip'){
						$this->insert_tables_model->insert_folder_name($get_info);
		           //	sleep(5);
		                $path = 'uploads/0' . $get_info['lesson_type_id'] . $get_info['lesson_parent_id'] . '_'.$date.'/';  
		                $location = $path . $file_name;  
		                if(move_uploaded_file($_FILES['zip_file']['tmp_name'], $location )){ 			
		                    $zip = new ZipArchive; 
		                    if($zip->open($location)){								
		                          $zip->extractTo($path);  
								  
						/*		  echo "numFiles: " . $zip->numFiles . "\n";
								  echo "oldstatus: " . $zip->status  . "<br>";
							echo "<pre>";
							print_r($zip);
							echo "</pre>";
							
							echo "statusSys: " . $zip->statusSys . "\n";
							echo "filename: " . $zip->filename . "\n";
							echo "comment: " . $zip->comment . "\n";
								 */ 
							//echo $zip->filename = '';  
								 
								//  $zip->addEmptyDir('newDirectory');
								  
								 // $zip->filename = "";
								// $zip->deleteName($location); 
		                          $zip->close();
		                         
								//	delete $zip;
		                    }  
		                  ////////////////   $files = scandir($path . $name);  
		                     //$name is extract folder from zip file  
		                    /* foreach($files as $file)  
		                     {  
		                          $file_ext = end(explode(".", $file));  
		                          $allowed_ext = array('jpg', 'png');  
		                          if(in_array($file_ext, $allowed_ext))  
		                          {  
		                               $new_name = md5(rand()).'.' . $file_ext;  
		                               $output .= '<div class="col-md-6"><div style="padding:16px; border:1px solid #CCC;"><img src="upload/'.$new_name.'" width="170" height="240" /></div></div>';  
		                               copy($path.$name.'/'.$file, $path . $new_name);  
		                               unlink($path.$name.'/'.$file);  
		                          }       
		                     }  */
		                  //  unlink($location);  
		                  //  rmdir($path . $name); 
												 
		                }  
            		}  
        	}  
        	redirect($this->uri->segment(1).'/admin/index/addlesson');														  
    }  
		


	}

}
