<base href=<?=base_url().$this->uri->segment(1).'/main/'?>


<span><a ui-sref='contacts' ui-sref-active='active' class='btn btn-default'><?=lang('contacts') ?></a></span>
<span><a ui-sref='list' ui-sref-active='active' class='btn btn-default'><?=lang('list') ?></a></span>  




<div ng-cloak>
<div><span id='username'><?=$username; ?></span></div>
<div>
	<ui-view></ui-view>
</div>





 </div>
