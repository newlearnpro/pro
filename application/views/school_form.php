<!--?="<base href='/company/".$this->uri->segment(1)."/login/'>" ?-->
<!--base href=<base_url().$this->uri->segment(1).'/login/'-->
<?="<base href='".base_url().$this->uri->segment(1)."/school/'>" ?>


<div class='blockHead col-xs-12 col-sm-offset-2 col-sm-8  col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4'>
<?php





	

/*
if($activation === true && $this->input->post('username')){
    echo heading('arden ka'), 4);
}else if($this->input->post('username')){
    echo heading(lang('verify_username_password'), 4);  
}else{
    echo heading(lang('enter_login_password'), 4);
}*/

//echo form_open($this->uri->segment(1).'/login/armtab');
echo form_open('');
//echo form_label(lang('username_hint'),'username').br();
echo form_label($insert_tablet_code,'username').br();
echo form_input('username','','class="form-control"').br();
if($activation_schoolclick == true){
	echo form_label($insert_activation_code,'activation_code').br();
	echo form_input('activation_code',set_value('activation_code', ''),'class="form-control"').br();
}
echo form_submit('', lang('signin'),' class="btn btn-info form-control"');
echo form_close();
?>
</div>