<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Directory extends CI_Controller {



    public function index()
    {
        $dir    = '/tmp';
        $files1 = scandir($dir);
        $files2 = scandir($dir, 1);

        print_r($files1);
        print_r($files2);
    }


  
}