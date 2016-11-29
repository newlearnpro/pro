<?="<base href='/company/".$this->uri->segment(1)."/login/'>" ?>
<?php    

if($activation === false){
    echo heading(lang('need_activation'), 4);
}else if($this->input->post('username') || $this->input->post('password') ){
    echo heading(lang('verify_username_password'), 4);  
}else{
    echo heading(lang('enter_login_password'), 4);
}

echo form_open('');
echo form_label(lang('username_hint'),'username').br();
echo form_input('username',set_value('username', ''),'class="as_text"').br();
echo form_label(lang('password_hint'),'password').br();
echo form_password('password','','class="as_text"').br();
echo form_submit('', lang('signin'),' class="btn btn-info"');
echo form_close();
?>