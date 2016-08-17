<?php


namespace App\Presenters;

use Laracasts\Presenter\Presenter;

class UserPresenter extends Presenter
{
	public function loginType()
	{
		return ucfirst($this->account_type) . ' 登入';
	}

	public function createdDate()
	{
		return $this->reated_at->format('Y/m/d');
	}

	public function statusType()
	{
		if ($this->status){
			return '<span class="label label-success">已啟用<span>';
		} else {
			return '<span class="label label-danger">未啟用<span>';
		}
	}

	public function accountType()
	{
		if($this->account_type == 'normal'){
			return '一般註冊';
		} elseif ($this->account_type == 'facebook'){
			return 'Facebook註冊';
		} elseif ($this->account_type == 'google'){
			return 'Google註冊';
		}
	}

	public function is_activity()
	{
		if($this->status == 1){
			return true;
		} elseif($this->status == 0){
			return false;
		}
	}

}