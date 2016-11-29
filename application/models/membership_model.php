<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Membership_model extends CI_Model {


/*
  function __construct()
    {

        parent::__construct();
 	     $go_table = $this->input->post('$go_table');
    }*/


//_________________________this function validate login and password
  /*  public function validate()
 	{
 	  $this->db->where('username', $this->input->post('username'));
      $this->db->where('password', md5($this->input->post('password')));
      $query = $this->db->get('users');      
      if($query->num_rows == 1){
        return true;
      }      
    }*/


    public function users($permission, $get_info)
    {   
        if($permission == "admin"){
            $query = $this->db->query("SELECT * FROM users");
           /* foreach ($query->result() as $row)
            { 
                return $row;
            }*/
            if($get_info){
                $query = $this->db->get_where('users', array('username'=>$get_info));
            }            
        }else if($permission == "user"){
            $query = $this->db->query("SELECT username FROM users");            
        }
        return   $query->result_array(); 
    }

    public function users_change($get_info)
    {   
        $data = array(
            'username' => $get_info['username'],
            'first_name' => $get_info['first_name'],
            'position' => $get_info['position']
        );
        $this->db->where('username', $get_info['login']);
        $this->db->update('users', $data);        
    }






    public function position()
    {   

      
        //  $this->db->query("position");    
     $query = $this->db->query("SELECT id, position, parent_id FROM position");  
      //  $this->db->order_by('position', 'acs');
      //  $query = $this->db->get('position');

     //   return   $query->result_array();


     //   $this->db->query('position');
        /*$this->db->from('position');

        $this->db->join('position2', 'position.id = position2.parent_id');*/
      //  $this->db->from('position2');
    //    $this->db->join('position3', 'position2.id = position3.parent_id', 'left');
      //  = $this->db->get();
    //    print_r($query->result_array());
        return   $query->result_array();
    }
    public function lesson()
    {    
        $this->db->order_by('number', 'ASC');  
        $query = $this->db->get("file");       
        return $query->result();
    }

    public function main_lesson($get_info)
    {    
        $this->db->order_by('number', 'ASC');   
        $query = $this->db->select('*')->where('parent_id', $get_info)->get('file');
        //foreach ($query->result() as $row)
        //{ }
        return $query->result();
    }

    public function messages($get_info)
    {   
        $where = "(sender='$get_info[sender]' AND recipient='$get_info[recipient]') OR (sender='$get_info[recipient]' AND recipient='$get_info[sender]')";
        $query = $this->db->get_where('messages_room', $where);
        return   $query->result_array();
    }









    function membership()
	{
        $this->load->helper('string');
        $username = $this->input->post('username');         
        $new_member_insert_data = array(         
             'first_name' => $this->input->post('first_name'),
             'last_name' => $this->input->post('last_name'),
             'email' => $this->input->post('email'),
             'username' => $this->input->post('username'),
             'password' => md5($this->input->post('password')),
             'key_code' => random_string('alnum', 16),
             'activation' => 'no',
             'permission' => 'user'
            // 'img_src' => $this->input->post('img_base64')
         );         
         $insert = $this->db->insert('users', $new_member_insert_data);
       

       // return $insert;
         $config = Array(
          'protocol' => 'smtp',
          'smtp_host' => 'ssl://smtp.googlemail.com',
          'smtp_port' => 465,
          'smtp_user' => 'artakgevorgyan83@gmail.com',
          'smtp_pass' => 'theaaaaaaa',
          'mailtype' => 'html',
          'charset' => 'iso-8859-1',
          'wordwrap' => TRUE
        );
         
          $this->load->library('email', $config);
          $this->email->set_newline("\r\n");
          $this->email->from($new_member_insert_data['email']);
          $this->email->to($new_member_insert_data['email']);
          $this->email->subject('Email using Gmail.');
          //$this->email->message('<a href="'.base_url().$this->session->userdata('lang').'"/login/activation?username="'.$new_member_insert_data['username'].'"&keycode="'.$new_member_insert_data['key_code'].'">Click here for activation</a>');
          //$this->email->message('<a href="http://localhost/newlearnpro/pro/'.$this->session->userdata('lang').'/login/activation/'.$new_member_insert_data['username'].'/'.$new_member_insert_data['key_code'].'">Click here for activation</a>');
          $this->email->message('<div><span>Your Login: '.$new_member_insert_data['username'].'</span><br /><span>Your Password: '.$new_member_insert_data['password'].'</span><br /><span>Your keyCode: '.$new_member_insert_data['key_code'].'</span><br /><a href="http://localhost/newlearnpro/pro/'.$this->session->userdata('lang').'/login/activation/'.$new_member_insert_data['username'].'/'.$new_member_insert_data['key_code'].'">Click here for activation</a></div>');
          $this->email->send();
          return $insert;
        /*if($this->email->send())
        {
        echo 'Email sent.';
        }
        else
        {
            show_error($this->email->print_debugger());
        }*/
	}
    
    
   	function check_if_field_exists($field_str, $field)
	{
        $this->db->where($field_str, $field);
        $result = $this->db->get('users');
        if($result->num_rows()>0){
            return false;
        }else{
            return true;
       }   
	}   
    
    
    function get_first_last_names()
	{
        $var = $this->session->userdata('username'); 
        $this->db->where('username',$var['username']);       
          $l_n = $this->db->get('users');            
        foreach($l_n->result() as $row){
            return $row->username;
        } 
	}
    
    function get_img_src()
	{
        $var = $this->session->userdata('username'); 
        $this->db->where('username',$var['username']);       
          $l_n = $this->db->get('users');            
        foreach($l_n->result() as $row){
            return $row->img_src;
        } 
	}
    
 /////////////////////////////////////////////////////   
    
    
    
    /*function change_users_data()
	{   
	   $user_last_name = $this->input->post('user_last_name');
       $save_first_name  = $this->input->post('save_first_name');
	   $save_last_name  = $this->input->post('save_last_name');
       $old_password = md5($this->input->post('old_password'));
       $new_password = md5($this->input->post('new_password'));

	    
        $this->db->where('username',$user_last_name);
        $result = $this->db->get('users');
        foreach($result->result() as $row){
            if ($this->input->post('edit') == 1 && $old_password == $row->password){
                
                $object = array(
                 'first_name' => $save_first_name,
                 'last_name' => $save_last_name,
                 'password' => $new_password
                );                    
                $var = $this->input->post('user_last_name');
                $this->db->where('username',$user_last_name );
                $this->db->update('users', $object);                
                $this->lang->load('language_form');
                $array = array('account_change' => $this->lang->line('account_change'), 'change_true' => 1);
                return $array;    
            }else{
                return $row;
            }        
	    }    
     } */
    
    
    
   
    
}