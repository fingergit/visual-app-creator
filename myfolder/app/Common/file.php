<?php
/**
 * 此文件中定义文件操作相关函数。
 * @author lvaj <[lvaj2000@163.com]>
 */

/**
 * 获取文件扩展名，带“.”。
 * @param  [string] $file [文件名]
 * @return [string]       [扩展名]
 */
function get_extension($file)
{
	$ext = pathinfo($file, PATHINFO_EXTENSION);
	if ($ext != null && $ext != ""){
		$ext = "." . $ext;
	}
	return $ext;
}

/**
 * 获取当前页面完整URL地址
 * @return [string]       [完整URL地址]
 */
function get_url() {
    $sys_protocal = isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '443' ? 'https://' : 'http://';
    $php_self = $_SERVER['PHP_SELF'] ? $_SERVER['PHP_SELF'] : $_SERVER['SCRIPT_NAME'];
    $path_info = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '';
    $relate_url = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : $php_self.(isset($_SERVER['QUERY_STRING']) ? '?'.$_SERVER['QUERY_STRING'] : $path_info);
    return $sys_protocal.(isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '').$relate_url;
}

?>