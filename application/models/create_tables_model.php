<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Create_tables_model extends CI_Model {
    
    public function __construct() {
        parent::__construct();
        $this->load->dbforge();
    }


/*********************
ci_sessions
it creates ci_sessions table if there isn't `ci_sessions` table        
*******************/ 
    public function create_ci_sessions_table()
    {
        /*********For MySQL:
        CREATE TABLE IF NOT EXISTS `ci_sessions` (
                `id` varchar(128) NOT NULL,
                `ip_address` varchar(45) NOT NULL,
                `timestamp` int(10) unsigned DEFAULT 0 NOT NULL,
                `data` blob NOT NULL,
                KEY `ci_sessions_timestamp` (`timestamp`)
        );
        */
        $this->load->dbforge();
        $fields = array(
            'id' => array('type' => 'VARCHAR', 'constraint' => 128, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'ip_address' => array('type'=>'VARCHAR', 'constraint' => 45, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'user_agent' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'last_activity' => array('type'=>'int', 'constraint' => 10, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'timestamp' => array('type'=>'int', 'constraint' => 10, 'collation'=>'utf8_general_ci','null'=>'FALSE', 'UNSIGNED'=>true),
            'data' => array('type'=>'blob', 'collation'=>'utf8_general_ci','null'=>'FALSE')
        );
        
        $this->dbforge->add_field($fields);
        $this->dbforge->add_key('timestamp', true);
        $this->dbforge->create_table('ci_sessions');
    }


/*********************
position folder.
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



/*********************
messages_room
it creates messages_room table if there isn't `messages_room` table        
*******************/ 
        /*********For MySQL:
        CREATE TABLE IF NOT EXISTS `messages_room` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `sender` varchar(50) collate utf8_general_ci NOT NULL,
                `recipient` varchar(50) collate utf8_general_ci NOT NULL,
                `message` text collate utf8_general_ci NOT NULL,
                `timestamp` int(10) unsigned DEFAULT 0 NOT NULL,
               PRIMARY KEY(`id`)

        );
        */



/*********************
file
it creates file table if there isn't `file` table        
*******************/ 
        /*********For MySQL:
        CREATE TABLE IF NOT EXISTS `file` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `name` varchar(255) collate utf8_general_ci NOT NULL,
                `description` varchar(255) collate utf8_general_ci NOT NULL,
                `keywords` varchar(255) collate utf8_general_ci NOT NULL,
                `src` varchar(100) NOT NULL,
                `type_name` varchar(100) NOT NULL,
                `type_id` int(11) NOT NULL,
                `parent_id` int(11) NOT NULL,
                `question_id` int(11) NOT NULL,
                `number` int(11) NOT NULL,
                `free` varchar(10) NOT NULL,
               PRIMARY KEY(`id`)
        );
        */

/*********************
position
it creates file table if there isn't `position` table        
*******************/ 
        /*********For MySQL:
        CREATE TABLE IF NOT EXISTS `position` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `position` varchar(255) collate utf8_general_ci NOT NULL,
                `keywords` varchar(255) collate utf8_general_ci NOT NULL,
                `parent_id` int(11) unsigned NOT NULL,
                `license_type` tinyint(1) default NULL,
               PRIMARY KEY(`id`)
        );
        */

/*********************
users
it creates file table if there isn't `users` table        
*******************/ 
        /*********For MySQL:
        CREATE TABLE IF NOT EXISTS `users` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `username` varchar(20) collate utf8_general_ci NOT NULL UNIQUE,
                `password` varchar(35) collate utf8_general_ci NOT NULL,
                `first_name` varchar(40) collate utf8_general_ci NOT NULL,
                `last_name` varchar(40) collate utf8_general_ci NOT NULL,
                `status` varchar(40) collate utf8_general_ci NOT NULL,
                `gender` varchar(40) collate utf8_general_ci NOT NULL,
                `age` int(11) NOT NULL,
                `email` varchar(50) collate utf8_general_ci NOT NULL UNIQUE,
                `img_src` text NOT NULL,
                `activation_code` varchar(100) NOT NULL,
                `activation` varchar(10) NOT NULL,
                `activation_schoolclick` int(10) NOT NULL,
                `permission` varchar(10) NOT NULL,
               PRIMARY KEY(`id`)
        );
        */

/*********************
users_armtab
it creates file table if there isn't `users_armtab` table        
*******************/ 
        /*********For MySQL:
        CREATE TABLE IF NOT EXISTS `users_armtab` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `username` varchar(20) collate utf8_general_ci NOT NULL UNIQUE,
                `password` varchar(35) collate utf8_general_ci NOT NULL,
                `first_name` varchar(40) collate utf8_general_ci NOT NULL,
                `last_name` varchar(40) collate utf8_general_ci NOT NULL,
                `status` varchar(40) collate utf8_general_ci NOT NULL,
                `gender` varchar(40) collate utf8_general_ci NOT NULL,
                `age` int(11) NOT NULL,
                `email` varchar(50) collate utf8_general_ci NOT NULL UNIQUE,
                `img_src` text NOT NULL,
                `activation_code` varchar(100) NOT NULL,
                `activation` varchar(10) NOT NULL,
                `permission` varchar(10) NOT NULL,
               PRIMARY KEY(`id`)
        );
        */

/*********************
pupil_data
it creates file table if there isn't `pupil_data` table        
*******************/ 
        /*********For MySQL:
        CREATE TABLE IF NOT EXISTS `pupil_data` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `username` varchar(20) collate utf8_general_ci NOT NULL,
                `lesson_id` varchar(100) collate utf8_general_ci NOT NULL,
                `lesson_name` varchar(100) collate utf8_general_ci NOT NULL,
                `question_result` int(10) NOT NULL,
                `interactive_result` int(10) NOT NULL,
                `timestamp` int(11) unsigned DEFAULT 0 NOT NULL,
               PRIMARY KEY(`id`)
        );
        */


/*********************
teachers_data
it creates file table if there isn't `teachers_data` table        
*******************/ 
        /*********For MySQL:
        CREATE TABLE IF NOT EXISTS `teachers_data` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `username` varchar(20) collate utf8_general_ci NOT NULL,
                `lesson_id` int(11) NOT NULL,
                `start_time` varchar(5) NOT NULL,
                `end_time` varchar(5) NOT NULL,
               PRIMARY KEY(`id`)
        );
        */


/*********************
users_license_code
it creates file table if there isn't `users_license_code` table        
*******************/ 
        /*********For MySQL:
        CREATE TABLE IF NOT EXISTS `users_license_code` old (
                `id` int(11) NOT NULL AUTO_INCREMENT,                
                `username` varchar(20) collate utf8_general_ci NOT NULL,                
                `generated_code` varchar(20) NOT NULL,
                `license_code` varchar(20) NOT NULL,
                `position_id` int(11) NOT NULL,         
                `position_parent_id` int(11) NOT NULL,           
                `mount_count` int(10) NOT NULL,
                `timestamp` int(10) unsigned DEFAULT 0 NOT NULL,
                `time_end` int(10) unsigned DEFAULT 0 NOT NULL,
                PRIMARY KEY(`id`)
        );

        CREATE TABLE IF NOT EXISTS `users_license_code` (
                `license_code` varchar(10) NOT NULL UNIQUE,                
                `username` varchar(20) collate utf8_general_ci NOT NULL,                
                `description` varchar(255) collate utf8_general_ci NOT NULL,
                `license_type` varchar(100) collate utf8_general_ci NOT NULL,
                `position_id` int(11) NOT NULL,
                `mount_count` int(10) NOT NULL,
                `start_time` varchar(13) NOT NULL
        );
        */

//////////////////////////////////////////////////////////////////////////////////////
 

/*********************
questions
it creates question table if there isn't `questions` table        
*******************/ 
        /*********For MySQL:
        CREATE TABLE IF NOT EXISTS `questions` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `lesson_id` int(11) NOT NULL,
                `question_type` int(11) NOT NULL,
                `question` text collate utf8_general_ci NOT NULL,
                `answers` varchar(255) collate utf8_general_ci NOT NULL,
                `correct_answer` int(11) NOT NULL,
                `hint_lessons_id` varchar(50) NOT NULL,
                `question_id` int(11) NOT NULL,
               PRIMARY KEY(`id`)

        );
        */


  /*  public function create_users()
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
    }    */
    
    
    
  //create table for users    
    public function create_users_table()
    {   
        $this->load->dbforge();
        $fields = array(
            'id' => array('type' => 'INT', 'constraint' => 11, 'AUTO_INCREMENT' => true),
            'username' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE','UNIQUE'=>true),
            'password' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'first_name' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'last_name' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'email' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE', 'UNIQUE'=>true),
            'img_src' => array('type'=>'LONGTEXT', 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'license_code' => array('type'=>'VARCHAR', 'constraint' => 255, 'collation'=>'utf8_general_ci','null'=>'FALSE'),
            'permission' => array('type'=>'VARCHAR', 'constraint' => 10, 'collation'=>'utf8_general_ci','null'=>'FALSE')
        );      
        
        $this->dbforge->add_field($fields);
        $this->dbforge->add_key('id', true);
        $this->dbforge->create_table('users2');
    }   
    

 
    







    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}