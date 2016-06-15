<?php
class IndexAction extends BaseAction {
    public function index(){
        $this->hello = "abcdefg";
	   $this->display();
    }
}