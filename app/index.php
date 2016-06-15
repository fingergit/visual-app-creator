<?php
//	header("Content-type: text/html; charset=utf-8");
//	echo "本站正在升级维护，请稍后再访问，给您带来的不便敬请谅解！";
//	die();
	define('APP_NAME', 'visual-app-creator');
	define('APP_PATH', '../myfolder/app/');
	define('APP_DEBUG', TRUE);
	define('THINK_PATH', '../myfolder/ThinkPHP/');
	define('EXTEND_PATH', THINK_PATH.'Extend/');
	define('ENGINE_PATH', EXTEND_PATH.'Engine/');

	require '../myfolder/ThinkPHP/ThinkPHP.php';
?>