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
 
      foreach($query->result() as $row){           
          if($row->permission == "admin"){
             $data['prm'] = 'admin';
             $this->session->set_userdata($data); 
             redirect($this->uri->segment(1).'/admin');
          }else{
             $data['prm'] = 'user';
             $this->session->set_userdata($data); 
             redirect($this->uri->segment(1).'/main');
          }      
      }    


    if(!$this->session->userdata('usr')){
          $this->load->view('includes/header');
          $this->load->view('login_form' );
          $this->load->view('includes/footer');
    }else{  
        if($this->session->userdata('prm')==='admin'){
            redirect($this->session->userdata('lang').'/admin');
        }else{
            redirect($this->session->userdata('lang').'/main');
        }
    }
	}

    
    

 // for registration   
  public function signup()         
  {  
      $this->load->helper('captcha');    
      $this->load->helper('string');
      $position = $this->membership_model->position();

      $captcha = array(
          'word'  => random_string('alnum', 6),
          'img_path'  => 'public/img/captcha/',
          'img_url'   => base_url() .'public/img/captcha/',
          //'font_path' => 'public/fonts/gheagpalatbld.ttf',
          'font_size'     => 32,
          'img_width' => '200',
          'img_height' => 60,
          'expiration' => 0,
          'pool'          => '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      );
      $img = create_captcha($captcha);    
      
      $data['captcha_img'] = $img['image'];
      $data['captcha_word'] = $captcha['word']; 
      $data['position'] = [];
      for($i=0; $i<count($position); $i++){
        $pos_arr = implode("", $position[$i]);
        array_push($data['position'], array($pos_arr=>$pos_arr));
      }

      if($this->session->userdata('prm')==='admin'){
        $this->load->view('includes/header');
         $this->load->view('signup_form', $data);
        $this->load->view('includes/footer');
      }else{
          redirect($this->uri->segment(1).'/login');
      }



  }
    
    
    
  public function admin_lang()
  {
  /*  $_POST = json_decode(file_get_contents('php://input'), true);
    $get_info = $this->input->post('data');

    for($i = 0; $i<count($get_info); $i++){
      $lang[$get_info[$i]] = lang($get_info[$i]);
    }

    echo json_encode($lang);*/
  }
    
    
    
    
    
    /*public function change()
  {    
     $query = $this->membership_model->change_users_data();
        echo   json_encode($query);
  }*/
    
    
    
    
    
    
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
                  redirect($this->session->userdata('lang').'/login'); 
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