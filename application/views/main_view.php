<base href=<?=base_url().$this->uri->segment(1).'/main/'?>


<span><a ui-sref='contacts' ui-sref-active='active' class='btn btn-default'><?=lang('contacts') ?></a></span>
<span><a ui-sref='tasks' ui-sref-active='active' class='btn btn-default'><?=lang('tasks') ?></a></span>  




<div ng-cloak>
<div><span id='username'><?=$username; ?></span></div>
<div>
	<ui-view></ui-view>
</div>





 </div>
