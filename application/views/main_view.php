<base href=<?=base_url().$this->uri->segment(1).'/main/'?>

<span><a ui-sref='list' ui-sref-active='active' class='blockHead btn btn-info btn-xs lp_link'><?=lang('list') ?></a></span>  
<span><a ui-sref='contacts' ui-sref-active='active' class='blockHead btn btn-info btn-xs lp_link'><?=lang('contacts') ?></a></span>
<span><a ui-sref='personalpage' ui-sref-active='active' class='blockHead btn btn-info btn-xs lp_link '><?=lang('personal_page')?></a></span>  

<div ng-cloak>
	<div><span id='username'><?=$username;?></span></div>
	<div>
		<ui-view></ui-view>
	</div>
</div>
