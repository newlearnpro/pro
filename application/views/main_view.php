<?="<base href='".base_url().$this->uri->segment(1)."/main/'>" ?>
<div>
	<div class='tabs tabs-style-fillup'>
		<nav>
			<ul>
				<li><a ui-sref='list' ui-sref-active='active' class='blockHead   btn-info lp_link icon icon-book'><span><?=lang('list') ?></span></a></li>
				<li><a ui-sref='contacts' ui-sref-active='active' class='blockHead  btn-info  lp_link icon icon-users'><span><?=lang('contacts') ?></span></a></li>
				<li><a ui-sref='personalpage' ui-sref-active='active' class='blockHead   btn-info  lp_link icon icon-profile'><span><?=lang('personal_page') ?></span></a></li>
			</ul>	
		</nav>
	</div>
</div>
<div ng-cloak>
	<div><i class='icon-user'></i>&nbsp;<span id='username'><?=$username;?></span></div>
	<div>
		<ui-view></ui-view>
	</div>
</div>
