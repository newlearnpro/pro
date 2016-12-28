<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Insert_tables_model extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->dbforge();
    }

/*********************
position for users.
it creates position table if there isn't `position` table        
*******************/   
    public function insert_message_text($get_info)
    {       
      //  $username = $this->input->post('username');         
        $message_data = array(         
            'sender' => $get_info['sender'],
            'recipient' => $get_info['recipient'],
            'message' => $get_info['message'],
           // 'time' => date("d-m-Y h:i:s")
             //'time' => date("l jS \of F Y h:i:s A") 
          //  'time' => date("d-m-Y h:i:s") 
            'timestamp' => date("U")
        );         
        $insert = $this->db->insert('messages_room', $message_data);
     //   return $message_data;
    }

    public function insert_folder_name($get_info)
    {             
        $folder_name = array(         
            'name' => $get_info['lesson_name'],
            'description' => $get_info['lesson_description'],
            'keywords' => $get_info['lesson_keywords'],
            'src' => $get_info['lesson_src'],
            'type_id' => $get_info['lesson_type_id'],
            'parent_id' => $get_info['lesson_parent_id'],
            'number' => 1,
            'free' => $get_info['lesson_is_free']
           // 'time' => date("d-m-Y h:i:s")
             //'time' => date("l jS \of F Y h:i:s A") 
        );         
        $insert = $this->db->insert('file', $folder_name);
     //   return $message_data;
    }


    public function insert_users_data($get_info)
    {
        $opened_lesson = array(
            'username' =>  $get_info['username'],
            'lesson_id' =>  $get_info['id'],
            'lesson_name' => $get_info['name'],
            'timestamp' => date("U")
        );         
        $insert = $this->db->insert('users_data', $opened_lesson);
     //   return $message_data;
    }






    
    
    
    
    
}