<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Membership_model extends CI_Model {

    public function users($permission, $get_info)
    {   
        if($permission == "admin"){
            $query = $this->db->query("SELECT * FROM users");
            if($get_info){
                $query = $this->db->get_where('users', array('username'=>$get_info));
            }            
        }else if($permission == "user"){
            $query = $this->db->query("SELECT username, gender FROM users");            
        }
        return   $query->result_array(); 
    }


    public function users_change($get_info)
    {   
        $data = array(           
            'first_name' => $get_info['first_name'],
            'last_name' => $get_info['last_name'],
            'activation' => $get_info['activation'],
        );
        $this->db->where('username', $get_info['login']);
        $this->db->update('users', $data);
    }

    public function user_page($get_info)
    {   
        $this->db->where('username', $get_info);
        $this->db->select('username, first_name, last_name, status, gender, age, email, activation_code, activation_schoolclick');        
        $query = $this->db->get('users');
        return   $query->result_array();
        /*foreach ($query->result() as $row){ 
            return  array(
                'username'=> $row->username,
                'password'=> $row->password,
            );
        }*/
    }

    public function position()
    {   
        $query = $this->db->get('position');  
        return   $query->result_array();
    }

    public function lesson()
    {    
        $this->db->order_by('number', 'ASC'); 
        $query = $this->db->get('file');
        return $query->result();
    }

    public function question($get_info)
    {    

   //     $query = $this->db->select('*')->where('position_id', $get_info['position_id'])->get('questions');
   //     return   $query->result_array();




        $arr = array('position_id'=>$get_info['position_id'], 'question_id'=>$get_info['question_id']);
     //     $arr = array('position_id'=>$get_info['position_id']);
        $this->db->where($arr);
        $this->db->select('*');
        $query = $this->db->get('questions');
        return   $query->result_array();




       // $this->db->order_by('number', 'ASC'); 

//        $query = $this->db->select('*')->where('position_id', $get_info['position_id'])->get('questions');
       // $query = $this->db->get("questions");
 //       return $query->result_array();
       // $query = $this->db->get_where('questions', array('position_id' => $get_info['position_id'], 'question_id' => $get_info['question_id']));
       // $query = $this->db->get('questions');
        //return   $query->result_array();
    }

    public function last_question_id()
    {    

        $this->db->order_by('id', 'DESC');
        $this->db->select('id');

        $query = $this->db->get('questions');

       // $this->db->order_by('number', 'ASC'); 
      /*  $query = $this->db->get("questions");
        return $query->result();*/
       // $query = $this->db->get_where('questions', array('lesson_id' => $get_info['lesson_id']));
       // $query = $this->db->get('questions');
       foreach ($query->result() as $row){
           return   $row->id;
        }       
    }

    public function get_license_code($get_info)
    {   
       /* $where = "username='$get_info[username]'";
      // $where = "(username='$get_info[username]' AND class_id='$get_info[class_id]') OR (username='$get_info[username]' AND class_name=0) OR (username='$get_info[username]')";
     //   $query = $this->db->get_where('users_license_code', array('username'=>$get_info['username'],'class_id'=>$get_info['class_id']));
           $query = $this->db->get_where('users_license_code', $where));
        return   $query->result_array();*/

        $this->db->where('username', $get_info['username']);
        $this->db->select('*');        
        $query = $this->db->get('users_license_code');
        return   $query->result_array();
    }

    public function get_license_code_bypos($get_info)
    {   
       /* $where = "username='$get_info[username]'";
      // $where = "(username='$get_info[username]' AND class_id='$get_info[class_id]') OR (username='$get_info[username]' AND class_name=0) OR (username='$get_info[username]')";
     //   $query = $this->db->get_where('users_license_code', array('username'=>$get_info['username'],'class_id'=>$get_info['class_id']));
           $query = $this->db->get_where('users_license_code', $where));
        return   $query->result_array();*/

        if($get_info['position_id']){
            $this->db->where(array('username'=> $get_info['username'], 'position_id'=> $get_info['position_id']));
        }else{
            $this->db->where(array('username'=> $get_info['username']));
        }
        $this->db->select('*');        
        $query = $this->db->get('users_license_code');
        return   $query->result_array();
    }


    public function main_lesson($get_info)
    {    
        $this->db->order_by('number', 'ASC');   
        $query = $this->db->select('*')->where('parent_id', $get_info)->get('file');
        //foreach ($query->result() as $row)
        //{ }
        return $query->result();
    }

    public function hint_lesson($get_info)
    {    
        $arr = array('id'=>$get_info['id']);
     //     $arr = array('position_id'=>$get_info['position_id']);
        $this->db->where($arr);
        $this->db->select('*');
        $query = $this->db->get('file');
        return   $query->result_array();
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
             'status' => $this->input->post('status'),
             'gender' => $this->input->post('gender'),
             'age' => $this->input->post('age') + 4,
             'email' => $this->input->post('email'),
             'username' => $this->input->post('username'),
             'password' => md5($this->input->post('password')),
             'activation_code' => random_string('alnum', 16),
             'activation' => 'no',
             'permission' => 'user'
         );         
         $insert = $this->db->insert('users', $new_member_insert_data);
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
          //$this->email->message('<a href="'.base_url().$this->session->userdata('lang').'"/login/activation?username="'.$new_member_insert_data['username'].'"&keycode="'.$new_member_insert_data['activation_code'].'">Click here for activation</a>');
          //$this->email->message('<a href="http://localhost/newlearnpro/pro/'.$this->session->userdata('lang').'/login/activation/'.$new_member_insert_data['username'].'/'.$new_member_insert_data['activation_code'].'">Click here for activation</a>');
          $this->email->message('<div><span>Your Login: '.$new_member_insert_data['username'].'</span><br /><span>Your Password: '.$this->input->post('password').'</span><br /><span>Your keyCode: '.$new_member_insert_data['activation_code'].'</span><br /><a href="http://compass.learnpro.am/am/login/activation/'.$new_member_insert_data['username'].'/'.$new_member_insert_data['activation_code'].'">Click here for activation</a></div>');
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

    function ci_sessions_info()
    {
        $query = $this->db->get("ci_sessions");
        return   $query->result_array();
    }


    function get_markers($get_info)
    {
     //   $query = $this->db->get_where('teachers_data', array('lesson_id' => $get_info['lesson_id'], 'username'=> get_info['username']));
     //   return   $query->result_array();


     /*   $this->db->where('lesson_id', $get_info['lesson_id']);
        $this->db->select('start_time, end_time');        
        $query = $this->db->get('teachers_data');
        return   $query->result_array();*/
        $arr = array('lesson_id'=>$get_info['lesson_id'], 'username'=>$get_info['username']);

        $this->db->where($arr);
        $this->db->select('*');
        $query = $this->db->get("teachers_data");
        return   $query->result_array();
    }



 
}