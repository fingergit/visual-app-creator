<?php
class IndexAction extends BaseAction {
    public function index(){
        $this->hello = "abcdefg";
	    $this->display();
    }

    public function frame(){
        // 以下方式获取Request Payload json格式的数据。
//        $data = file_get_contents("php://input"); // json字符串
//        $obj = json_decode($data); // 转换为对象。
//        logInfo($obj->a); // a为对象属性。
//        logInfo($data);

        logInfo($_POST);

        $user = array(
            name => 'zhangsan'
        );
        $this->ajaxReturn($user, 'json');
    }

    public function appframe(){
        $this->display();
    }
}