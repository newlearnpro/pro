<!--?="<base href='/company/".$this->uri->segment(1)."/login/'>" ?-->
<!--base href=<base_url().$this->uri->segment(1).'/login/'-->
<?="<base href='".base_url().$this->uri->segment(1)."/login/'>" ?>


<div class='blockHead col-xs-12 col-sm-offset-2 col-sm-8  col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4'>
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
echo form_input('username',set_value('username', ''),'class="form-control"').br();
echo form_label(lang('password_hint'),'password').br();
echo form_password('password','','class="form-control"').br();
echo form_submit('', lang('signin'),' class="btn btn-info form-control"');
echo form_close();
?>
</div>