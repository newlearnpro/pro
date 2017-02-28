<base href=<?=base_url().$this->uri->segment(1).'/admin/'?>
<section>
	<div class="tabs tabs-style-fillup">
		<nav>
			<ul>
				<li><a ui-sref='position' ui-sref-active='active' class='blockHead   btn-info lp_link icon icon-tree'><span><?=lang('create_position') ?></span></a></li>
				<li><a ui-sref='addlesson' ui-sref-active='active' class='blockHead  btn-info  lp_link icon icon-books'><span><?=lang('add_lesson') ?></span></a></li>
				<li><a ui-sref='questions' ui-sref-active='active' class='blockHead   btn-info  lp_link icon icon-question'><span><?=lang('question_list') ?></span></a></li>
				<li><a ui-sref='users' ui-sref-active='active' class='blockHead   btn-info  lp_link icon icon-user-check'><span><?=lang('change_users_info') ?></span></a></li>
			</ul>	
		</nav>
	</div>
</section>
<!--span><a ui-sref='position' ui-sref-active='active' class='btn btn-default'><?=lang('create_position') ?></a></span> 
<span><a ui-sref='addlesson' ui-sref-active='active' class='btn btn-default'><?=lang('add_lesson') ?></a></span>
<span><a ui-sref='questions' ui-sref-active='active' class='btn btn-default'><?=lang('question_list') ?></a></span>
<span><a ui-sref='users' ui-sref-active='active' class='btn btn-default'><?=lang('change_users_info') ?></a></span-->
<div ng-cloak>
<div>
	<ui-view></ui-view>
</div>
</div>