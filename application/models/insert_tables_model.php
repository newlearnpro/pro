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
            'time' => date("d-m-Y h:i:s") 
        );         
        $insert = $this->db->insert('messages_room', $message_data);
     //   return $message_data;
    }











    
    
    
    
    
}