


<base href=<?=base_url().$this->uri->segment(1).'/admin/'?>



<span><a ui-sref='position' ui-sref-active='active' class='btn btn-default'><?=lang('create_position') ?></a></span> 
<span><a ui-sref='users' ui-sref-active='active' class='btn btn-default'><?=lang('change_info_employees') ?></a></span>
<span><a href=<?=base_url().$this->uri->segment(1).'/login/signup/'?> class='btn btn-default'><?=lang('registration_employees') ?></a></span>
<span><a ui-sref='addclass' ui-sref-active='active' class='btn btn-default'><?=lang('add_class') ?></a></span>


<div ng-cloak>
<div>Սա Admin-ն է</div>
<div>
	<ui-view></ui-view>
</div>
</div>
<!--div><?=$user ?>{user}</div-->