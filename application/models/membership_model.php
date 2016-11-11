<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Membership_model extends CI_Model {


/*
  function __construct()
    {

        parent::__construct();
 	     $go_table = $this->input->post('$go_table');
    }*/


//_________________________this function validate login and password
    public function validate()
 	{
 	  $this->db->where('username', $this->input->post('username'));
      $this->db->where('password', md5($this->input->post('password')));
      $query = $this->db->get('users');      
      if($query->num_rows == 1){
        return true;
      }      
    }


    public function users($permission, $get_info)
    {   
        if($permission == "admin"){
            $query = $this->db->query("SELECT * FROM users");
            if($get_info){
                $query = $this->db->get_where('users', array('username'=>$get_info));
            }
        }else{
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
     $query =   $this->db->query("SELECT id, position, parent_id FROM position;");  
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
    public function classes($get_info)
    {      
        $query = $this->db->select('has_file_id')->where('id', $get_info)->get('position');
        foreach ($query->result() as $row)
        {
          return $row->has_file_id;
        }
    }

    public function messages($get_info)
    {   
        $where = "(sender='$get_info[sender]' AND recipient='$get_info[recipient]') OR (sender='$get_info[recipient]' AND recipient='$get_info[sender]')";
        $query = $this->db->get_where('messages_room', $where);
        return   $query->result_array();
    }






//_________________________when get's all post parametrs, it can give this result
  /*   public function get_search_post()
 	{
 	    $search_text = $this->input->post('search_text');
        $search_lang = $this->input->post('search_lang');
        $search_part = $this->input->post('search_part');
        if($search_part == 'title'){
            switch ($search_lang) {
                case 'am': $this->db->like('am', $search_text); break;
                case 'ru': $this->db->like('ru', $search_text); break;
                case 'it': $this->db->like('it', $search_text); break;
                case 'en': $this->db->like('uk', $search_text); break;
                default:   $this->db->like('am', $search_text);
            }
        }else{
            switch ($search_lang) {
                case 'am': $this->db->like('am_example', $search_text); break;
                case 'ru': $this->db->like('ru_example', $search_text); break;
                case 'it': $this->db->like('it_example', $search_text); break;
                case 'en': $this->db->like('uk_example', $search_text); break;
                default:   $this->db->like('am_example', $search_text);
            } 
        }
    }



    public function noun()
 	{  	  
         $this->get_search_post();
         $query = $this->db->get('noun');  
         return $query->result_array();

    }
    
    public function adjective()
 	{ 
         $this->get_search_post();             
         $query = $this->db->get('adjective');
         return $query->result_array();
    }
    
    public function numeral()
 	{ 
         $this->get_search_post();             
         $query = $this->db->get('numeral');
         return $query->result_array();
    }    

    public function verb()
 	{
         $this->get_search_post();
         $query = $this->db->get('verb');
         return $query->result_array();
    }



    public function users_noun()
 	{  	  
         $var = $this->session->userdata('username');
         $this->get_search_post();
         $this->db->where('owner',$var['username']);           
         $query = $this->db->get('users_noun');           
         return $query->result_array();
    }
    public function users_adjective()
 	{  	  
         $var = $this->session->userdata('username');
         $this->get_search_post();
         $this->db->where('owner',$var['username']);           
         $query = $this->db->get('users_adjective');           
         return $query->result_array();
    }
    public function users_numeral()
 	{  	  
         $var = $this->session->userdata('username');
         $this->get_search_post();
         $this->db->where('owner',$var['username']);           
         $query = $this->db->get('users_numeral');           
         return $query->result_array();
    }
    public function users_verb()
 	{  	  
         $var = $this->session->userdata('username');
         $this->get_search_post();
         $this->db->where('owner',$var['username']);           
         $query = $this->db->get('users_verb');           
         return $query->result_array();
    }






    public function add()
 	{
      $parts_of_speech = $this->input->post('parts_of_speech');
 	  $input = $this->input->post('input_array');
   //   $id = $this->input->post('update_num'); 
          if($parts_of_speech == 6){      
                $data = array('am' => $input['am'], 'ru' => $input['ru'], 'it' => $input['it'], 'uk' => $input['uk'],
                        'am_present_simple' => $input['am_present_simple'], 'ru_present_simple' => $input['ru_present_simple'], 'it_present_simple' => $input['it_present_simple'], 'uk_present_simple' => $input['uk_present_simple'],
                        'am_past_simple' => $input['am_past_simple'], 'ru_past_simple' => $input['ru_past_simple'], 'it_past_simple' => $input['it_past_simple'], 'uk_past_simple' => $input['uk_past_simple'],                        
                        'am_future_simple' => $input['am_future_simple'], 'ru_future_simple' => $input['ru_future_simple'], 'it_future_simple' => $input['it_future_simple'], 'uk_future_simple' => $input['uk_future_simple'],                        
                        'am_present_continuous' => $input['am_present_continuous'], 'ru_present_continuous' => $input['ru_present_continuous'], 'it_present_continuous' => $input['it_present_continuous'], 'uk_present_continuous' => $input['uk_present_continuous'],                        
                        'am_present_perfect' => $input['am_present_perfect'], 'ru_present_perfect' => $input['ru_present_perfect'], 'it_present_perfect' => $input['it_present_perfect'], 'uk_present_perfect' => $input['uk_present_perfect'],                        
                        'am_past_perfect' => $input['am_past_perfect'], 'ru_past_perfect' => $input['ru_past_perfect'], 'it_past_perfect' => $input['it_past_perfect'], 'uk_past_perfect' => $input['uk_past_perfect'],                        
                        'am_example' => $input['am_example'], 'ru_example' => $input['ru_example'], 'it_example' => $input['it_example'], 'uk_example' => $input['uk_example'],
                        'owner' => $input['user_last_name']
                );         
          }else{
                $data = array('am' => $input['am'], 'ru' => $input['ru'], 'it' => $input['it'], 'uk' => $input['uk'],      
                        'am_example' => $input['am_example'], 'ru_example' => $input['ru_example'], 'it_example' => $input['it_example'], 'uk_example' => $input['uk_example'],
                        'owner' => $input['user_last_name']
                );      
          }
                    
                    
                    
     // $this->db->where('id', $id);
      
            
      switch ($parts_of_speech) {
            case 1: $this->db->insert('users_noun', $data); break;
            case 2: $this->db->insert('users_adjective', $data); break;
            case 3: $this->db->insert('users_numeral', $data); break;
            case 6: $this->db->insert('users_verb', $data); break;
            default:  $this->db->insert('users_noun', $data); break;
      }
      
      
      
      return "avelacvats e";          
    }











    public function update()
 	{
      $parts_of_speech = $this->input->post('parts_of_speech');
 	  $input = $this->input->post('input_array');
      $id = $this->input->post('update_num'); 
          if($parts_of_speech == 6){      
                $data = array('am' => $input['am'], 'ru' => $input['ru'], 'it' => $input['it'], 'uk' => $input['uk'],
                        'am_present_simple' => $input['am_present_simple'], 'ru_present_simple' => $input['ru_present_simple'], 'it_present_simple' => $input['it_present_simple'], 'uk_present_simple' => $input['uk_present_simple'],
                        'am_past_simple' => $input['am_past_simple'], 'ru_past_simple' => $input['ru_past_simple'], 'it_past_simple' => $input['it_past_simple'], 'uk_past_simple' => $input['uk_past_simple'],                        
                        'am_future_simple' => $input['am_future_simple'], 'ru_future_simple' => $input['ru_future_simple'], 'it_future_simple' => $input['it_future_simple'], 'uk_future_simple' => $input['uk_future_simple'],                        
                        'am_present_continuous' => $input['am_present_continuous'], 'ru_present_continuous' => $input['ru_present_continuous'], 'it_present_continuous' => $input['it_present_continuous'], 'uk_present_continuous' => $input['uk_present_continuous'],                        
                        'am_present_perfect' => $input['am_present_perfect'], 'ru_present_perfect' => $input['ru_present_perfect'], 'it_present_perfect' => $input['it_present_perfect'], 'uk_present_perfect' => $input['uk_present_perfect'],                        
                        'am_past_perfect' => $input['am_past_perfect'], 'ru_past_perfect' => $input['ru_past_perfect'], 'it_past_perfect' => $input['it_past_perfect'], 'uk_past_perfect' => $input['uk_past_perfect'],                        
                        'am_example' => $input['am_example'], 'ru_example' => $input['ru_example'], 'it_example' => $input['it_example'], 'uk_example' => $input['uk_example']
                );         
          }else{
                $data = array('am' => $input['am'], 'ru' => $input['ru'], 'it' => $input['it'], 'uk' => $input['uk'],      
                        'am_example' => $input['am_example'], 'ru_example' => $input['ru_example'], 'it_example' => $input['it_example'], 'uk_example' => $input['uk_example']
                );      
          }
                    
                    
                    
      $this->db->where('id', $id);
      switch ($parts_of_speech) {
            case 1: $this->db->update('users_noun', $data); break;
            case 2: $this->db->update('users_adjective', $data); break;
            case 3: $this->db->update('users_numeral', $data); break;
            case 6: $this->db->update('users_verb', $data); break;
            default:  $this->db->update('users_noun', $data); break;
      }
      return "poxvats e $parts_of_speech";          
    }






    public function delete()
 	{
 	  $parts_of_speech = $this->input->post('parts_of_speech');
 	  $id = $this->input->post('delete_num');
      $conj = $this->input->post('delete_num');
      $this->db->where('id', $id);     
      switch ($parts_of_speech) {
            case 1: $this->db->delete('users_noun'); break;
            case 2: $this->db->delete('users_adjective'); break;
            case 3: $this->db->delete('users_numeral'); break;
            case 6: $this->db->delete('users_verb'); break;
            default:  $this->db->delete('users_noun'); break;
      }
      return "arden jnjvec $id $parts_of_speech";     
    }*/








    function membership()
	{
         $username = $this->input->post('username');         
         $new_member_insert_data = array(         
             'first_name' => $this->input->post("first_name"),
             'last_name' => $this->input->post('last_name'),
             'email' => $this->input->post('email'),
             'username' => $this->input->post('username'),
             'password' => md5($this->input->post('password')),
             'position' => $this->input->post('position'),
             'permission' => 'user'
            // 'img_src' => $this->input->post('img_base64')
         );         
         $insert = $this->db->insert('users', $new_member_insert_data);
         return $insert;
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