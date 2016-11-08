<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Create_tables_model extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->dbforge();
    }

/*********************
position for users.
it creates position table if there isn't `position` table        
*******************/   
    public function create_position_table()
    {       
        $this->dbforge->add_field(array(
                    'id' => array('type' => 'INT', 'constraint' => 11, 'unsigned' => TRUE, 'auto_increment' => TRUE),
                    'position' => array('type' => 'VARCHAR', 'constraint' => '50'),
                    'description' => array('type' => 'TEXT', 'null' => TRUE),
                    'custom_id' => array('type' => 'INT', 'constraint' => 11),
                    'unique_id' => array('type' => 'INT', 'constraint' => 99, 'unsigned' => TRUE),
        ));
        $this->dbforge->add_key('id', TRUE);
        if(!$this->db->table_exists('position')){
            $this->dbforge->create_table('position');
        }
    }



































//create table for users    
    public function create_users()
    {   
        $this->load->dbforge();
        $fields = array(
            'id' => array('type' => 'INT', 'constraint' => 11, 'AUTO_INCREMENT' => true),
            'first_name' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'last_name' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'email' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'username' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'password' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'img_src' => array('type'=>'LONGTEXT', 'collation'=>'utf8_general_ci','null'=>'FALSE') 
        );      
        
        $this->dbforge->add_field($fields);
        $this->dbforge->add_key('id', true);
        $this->dbforge->create_table('users');
        echo "Users table created";
    }    
    
    
    
    
    
    
    
    
//create tables example 'noun', 'adjective' ....    
    public function create_tables_1($table)
    {   
        $this->load->dbforge();
        $fields = array(
            'id' => array('type' => 'INT', 'constraint' => 11, 'AUTO_INCREMENT' => true),
            'am' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'ru' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'it' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'uk' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'am_example' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'ru_example' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'it_example' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'uk_example' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'owner' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE')       
        );      
        
        $this->dbforge->add_field($fields);
        $this->dbforge->add_key('id', true);
        $this->dbforge->create_table($table);
        echo "add $table table";
    }


//create tables example 'verb' ....    
    public function create_tables_2($table)
    {   
        $this->load->dbforge();
        $fields = array(
            'id' => array('type' => 'INT', 'constraint' => 11, 'AUTO_INCREMENT' => true),
            'am' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'ru' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'it' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'uk' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'am_present_simple' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'ru_present_simple' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'it_present_simple' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'uk_present_simple' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'am_past_simple' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'ru_past_simple' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'it_past_simple' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'uk_past_simple' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'am_future_simple' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'ru_future_simple' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'it_future_simple' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'uk_future_simple' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'am_present_continuous' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'ru_present_continuous' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'it_present_continuous' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'uk_present_continuous' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'am_present_perfect' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'ru_present_perfect' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'it_present_perfect' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'uk_present_perfect' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'am_past_perfect' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'ru_past_perfect' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'it_past_perfect' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'uk_past_perfect' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'am_example' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'ru_example' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'it_example' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'uk_example' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'owner' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE')       
        );      
        
        $this->dbforge->add_field($fields);
        $this->dbforge->add_key('id', true);
        $this->dbforge->create_table($table);
        echo "add $table table";
    }
    
    

//drop tables    
    public function delete_tables($table)
    {   
        $this->load->dbforge();
        $this->dbforge->drop_table($table);
        echo "remove $table table";
    }


//create pos for 'noun', 'adjective' ...    
    public function create_pos_1($pos)
    {   
       $xml=simplexml_load_file(site_url() . "xml/main_"  . $pos . ".xml") or die("Error: Cannot create object");
       foreach($xml as $main){
            $array = array();
            foreach ($main->children() as $node) {  
                if (is_array($node)) {
                   $array[$node->getName()] = simplexml_to_array($node);
                } else {
                 $array[$node->getName()] = (string) $node;
                }
           }
           $this->db->insert($pos, $array);           
      }
      echo "alraedy $pos into table";
    }    
    
    
    
    
    
     public function delete_pos($pos)
     {
        $this->db->empty_table($pos);
        echo "empty $pos table"; 
     }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}