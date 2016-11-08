<?="<base href='/company/".$this->uri->segment(1)."/login/'>" ?>


<?php 
/*
if(isset($account_created)){
    echo "<div>$account_created</div><div></div>";
    } else if($this->input->post('submit_login_form')){        
        echo "<div>" . lang('incorrect_message') . "</div>";
    }else {
        echo  "<div>Login, please</div>";
      }
     

    */ 
      /*
echo form_open('login');
echo form_input('mtt', '').br() ;
echo form_input('password', '').br() ;
echo form_submit('submit_login_form', lang('signin'),' class="as_button"');
echo anchor('', 'enter as guest', 'id="as_guest" class="as_link"');
echo anchor($this->uri->segment(1).'/login', lang('signup'), 'class="as_link"');
echo form_close();
*/

/*
echo form_open('login');
echo form_input('username', set_value('username'),'placeholder="' . lang("login_text") . '"" id="as_login" class="as_text"').br() ;
echo form_input('password', '','placeholder="' . lang("password_text") . '"" id="as_password" class="as_text"').br() ;
echo form_submit('submit_login_form', lang('signin'),'id="as_submit" class="as_button"');
echo anchor('', 'enter as guest', 'id="as_guest" class="as_link"');
echo anchor('login/signup', lang('signup'), 'class="as_link"');
echo form_close();
*/
?>



<!--form action='' method='post'>

<h5>Username</h5>
<input type="text" name="username" value=""  />

<h5>Password</h5>
<input type="text" name="password" value=""  />


<div><input type="submit" value="Submit" class="btn btn-info" />
<?php echo anchor($this->uri->segment(1). "/login/signup", lang('signup'), ' class="btn btn-info"');
?>
</div>

</form-->


<?php    

if($this->input->post('username') || $this->input->post('password') ){
    echo heading(lang('verify_username_password'), 4);
}else{
    echo heading('enter login and password', 4);
}

echo form_open('');

echo form_label(lang('username_hint'),'username').br();
echo form_input('username',set_value('username', ''),'class="as_text"').br();
echo form_label(lang('password_hint'),'password').br();
echo form_password('password','','class="as_text"').br();



//echo form_input('username', set_value('username'),'placeholder="' . lang("login_text") . '"" id="as_login" class="as_text"').br() ;
//echo form_input('password', '','placeholder="' . lang("password_text") . '"" id="as_password" class="as_text"').br() ;

echo form_submit('', lang('signin'),' class="btn btn-info"');
echo form_close();
?>




    










<!--div class="body_main">






<div>

    <div><?="signin"?></div>
    
</div>





<div id="login_group" style="width: 700px; height:600px; background:lightgrey; float: left;">
<span class=""><?=lang('signin_submit')?></span>
<?php 

if(isset($account_created)){
    echo "<div>$account_created</div><div></div>";
    } else if($this->input->post('submit_login_form')){        
        echo "<div>" . lang('incorrect_message') . "</div>";
    }else {
        echo  "<div>Login, please</div>";
      }
      

      
echo form_open('login');
echo form_input('username', set_value('username'),'placeholder="' . lang("login_text") . '"" id="as_login" class="as_text"').br() ;
echo form_input('password', '','placeholder="' . lang("password_text") . '"" id="as_password" class="as_text"').br() ;
echo form_submit('submit_login_form', lang('signin_submit'),'id="as_submit" class="as_button"');
echo anchor('', 'enter as guest', 'id="as_guest" class="as_link"');
echo anchor('login/signup', lang('signup'), 'class="as_link"');
echo form_close();
?>
</div>






</div-->


