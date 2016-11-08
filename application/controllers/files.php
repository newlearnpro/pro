<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Files extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('file');
		$this->load->helper('directory');
	}

	public function index()
	{
		echo 'this is files';
	}
	public function write_test()
	{
		$data = 'hello world';
		$file = 'application/test_files/hello.txt';
		echo write_file($file, $data);
		echo 'finish writing';
	}



	public function directory_test()
	{
		/*for($i=0; $i<count(directory_map('public/css')); $i++){
			print_r (directory_map('public/css'));	
		}*/
		
		//;print_r(directory_map('public'));
		$css['css'] = directory_map('public/css');
		$this->load->view('includes/header', $css);
		$this->load->view('desktop', $css);
		$this->load->view('includes/footer', $css);
	}


	public function email()
	{
		/*$config = Array(
			'protocol' => 'smtp',
		//	'smtp_host' => 'smtp.gmail.com',
		//	'smtp_port' => 587,
		//	'smtp_user' => 'artakgevorgyan83@gmail.com',
		//	'smtp_pass' => 'theaaaaaaa'
			);

		$this->load->library('email', $config);
		$this->email->set_newline("\r\n");
		$this->email->from("example@yahoo.com", "sd");
		$this->email->to("g.artak@yahoo.com");
		$this->email->subject("this is email test");
		$this->email->message('message is finish');

		if($this->email->send()){
			echo "yes";
		}else{
			show_error($this->email->print_debugger());
			//echo "no";
		}*/
		$config['useragent'] = 'CodeIgniter';
		$config['protocol'] = 'smtp';
		//$config['mailpath'] = '/usr/sbin/sendmail';
		$config['smtp_host'] = 'ssl://smtp.googlemail.com';
		$config['smtp_user'] = 'artakgevorgyan83@gmail.com';
		$config['smtp_pass'] = 'theaaaaaaa';
		$config['smtp_port'] = 465; 
		$config['smtp_timeout'] = 5;
		$config['wordwrap'] = TRUE;
		$config['wrapchars'] = 76;
		$config['mailtype'] = 'html';
		$config['charset'] = 'utf-8';
		$config['validate'] = FALSE;
		$config['priority'] = 3;
		$config['crlf'] = "\r\n";
		$config['newline'] = "\r\n";
		$config['bcc_batch_mode'] = FALSE;
		$config['bcc_batch_size'] = 200;

		$this->load->library('email'); // Note: no $config param needed
		$this->email->from('artakgevorgyan83@gmail.com', 'Artak');
		$this->email->to('artakgevorgyan83@gmail.com');
		$this->email->subject('Test email from CI and Gmail');
		$this->email->message('This is a test.');
		$this->email->send();


		if($this->email->send()){
			echo "yes";
		}else{
			show_error($this->email->print_debugger());
			//echo "no";
		}


	}

	public function upload()
	{	
		$this->load->view('upload_form');

	}

}