<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

   	public function __construct()
	{
        parent::__construct();
        $this->load->model('membership_model'); 
        $this->lang->load('language_form',$this->uri->segment(1));
        $this->session->set_userdata('lang', $this->uri->segment(1));
	}

	public function index()
	{
      $query = $this->db->get_where('users', array('username' => $this->input->post('username'), 'password' => md5($this->input->post('password'))), 0, 0);
      $data = array('usr' => $this->input->post('username'), 'pwd' => md5($this->input->post('password')));
      $info['activation'] = true;

      foreach($query->result() as $row){           
          if($row->permission == 'admin'){
             $data['prm'] = 'admin';
             $this->session->set_userdata($data); 
             redirect($this->uri->segment(1).'/admin');
          }else if($row->permission == 'user' && $row->activation == 'yes'){
             $data['prm'] = 'user';
             $this->session->set_userdata($data);
             redirect($this->uri->segment(1).'/main');
          }else if($row->permission == 'user' && $row->activation == 'no'){
             $info['activation'] = false;
          }     
      }    


      if(!$this->session->userdata('usr')){
            $this->load->view('includes/header');
            $this->load->view('login_form', $info);
            $this->load->view('includes/footer');
      }else{  
          if($this->session->userdata('prm')==='admin'){
              redirect($this->session->userdata('lang').'/admin');
          }else if($this->session->userdata('prm')==='user'){
              redirect($this->session->userdata('lang').'/main');
          }
      }
	}

    
    

 // for registration   
  public function signup()         
  {  
      $this->load->helper('captcha');    
      $this->load->helper('string');
     // $position = $this->membership_model->position();
    //  $this->membership_model->position();

      $captcha = array(
        //  'word'  => random_string('alnum', 6),
          'word'  => random_string('numeric', 6),
          'img_path'  => 'public/img/captcha/',
          'img_url'   => base_url() .'public/img/captcha/',
          //'font_path' => 'public/fonts/gheagpalatbld.ttf',
          'font_size'     => 40,
          'img_width' => '200',
          'img_height' => 60,
          'expiration' => 0,
          'pool'          => '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      );
      $img = create_captcha($captcha);    
      
      $data['captcha_img'] = $img['image'];
      $data['captcha_word'] = $captcha['word']; 
      /*$data['position'] = [];
      for($i=0; $i<count($position); $i++){
        $pos_arr = implode("", $position[$i]);
        array_push($data['position'], array($pos_arr=>$pos_arr));
      }*/

     // if($this->session->userdata('prm')==='admin'){
         $this->load->view('includes/header');
         $this->load->view('signup_form', $data);
         $this->load->view('includes/footer');
    //  }else{
   //       redirect($this->uri->segment(1).'/login');
    //  }
  }
  /*  
  public function tables()         
  {
      if($this->session->userdata('prm')==='admin'){
         $this->load->view('includes/header');
         $this->load->view('tables_form');
         $this->load->view('includes/footer');
      }else{
          redirect($this->uri->segment(1).'/login');
      }

  }


  public function add_tables()         
  {
    if($this->session->userdata('prm')==='admin'){
        $this->load->model('create_tables_model');
        $this->create_tables_model->create_users_table();
       // $this->create_tables_model->create_ci_sessions_table();
        //$this->create_tables_model->create_position_table();
    }else{
        redirect($this->uri->segment(1).'/login');
    }
  }
*/



/*****************after activation
/****************/
  public function activation()
  {
      $get_info_username = $this->uri->segment(4);
      $get_info_keycode = $this->uri->segment(5);
      $username ='';
      $activation_code='';

      $query = $this->db->get_where('users', array('username' => $get_info_username, 'activation_code' => $get_info_keycode));
      foreach ($query->result() as $row)
      {         
        $username = $row->username;
        $activation_code = $row->activation_code;
      }

      if($this->session->userdata('prm')=='' && ($username!=='' || $activation_code!=='')){
          $this->db->where('username', $get_info_username);
          $this->db->update('users', array('activation'=>'yes'));
          $this->load->view('includes/header');
          $this->load->view('activation_view');
          $this->load->view('includes/footer');
      }else if($this->session->userdata('prm')==='admin'){
          redirect($this->session->userdata('lang').'/admin');
      }else if($this->session->userdata('prm')==='user'){
          redirect($this->session->userdata('lang').'/main');
      }else{
          redirect($this->session->userdata('lang').'/login');
      }   
  }

    
    
    
    
// verify validation and create user     
  public function membership()
  {
        $this->config->set_item('language', $this->uri->segment(1));
        $this->form_validation->set_rules('first_name','lang:first_name', 'trim|required');
        $this->form_validation->set_rules('last_name','lang:last_name', 'trim|required');
        $this->form_validation->set_rules('email','lang:email', 'trim|required|valid_email|callback_check_if_email_exists');
        $this->form_validation->set_rules('username','lang:username', 'trim|required|min_length[3]|callback_check_if_username_exists');
        $this->form_validation->set_rules('password','lang:password', 'trim|required|min_length[4]|max_length[32]');
        $this->form_validation->set_rules('password_confirm','lang:password_confirm', 'trim|required|matches[password]'); 
        //$this->form_validation->set_rules('position','lang:position'); 
        $this->form_validation->set_rules('captcha','lang:captcha', 'trim|required|callback_validate_captcha');
        
        if($this->form_validation->run() == FALSE){
              $this->signup();
        }else{
            if($query = $this->membership_model->membership()){
                  redirect($this->session->userdata('lang').'/login/activation'); 
            }      
        }
  }
 
  public function logout()
  {
        $this->session->sess_destroy();
        redirect($this->uri->segment(1));
  }
 
    public function validate_captcha()
    {        
        $my_captcha_words = $this->input->post('captcha');
        $captcha_img_hint = $this->input->post('captcha_img_hint');
        if($my_captcha_words == $captcha_img_hint){
            return true;
        }else{             
           return false;
        }
    }


    public function check_if_username_exists($requested_username)
  {
        $username_available = $this->membership_model->check_if_field_exists('username', $requested_username);
        if($username_available){
            return true;
        }else{
            return false;
        }         
  }
    
    public function check_if_email_exists($requested_email)
  {     
        $email_not_in_use = $this->membership_model->check_if_field_exists('email', $requested_email);
        if($email_not_in_use){
            return true;
        }else{
            return false;
        }         
  }







}