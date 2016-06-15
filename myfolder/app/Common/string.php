<?php
/**
 * 此文件中定义字符串相关函数。
 * @author lvaj <[lvaj2000@163.com]>
 */

/**
 * 把\r\n 替换成<p></p>
 * @param  [string] $string [字符串]
 * @return [string]         [替换后的字符串]
 */
function nl2p($string, $line_breaks = true, $xml = true)
{
    // Remove existing HTML formatting to avoid double-wrapping things
    $string = str_replace(array('<p>', '</p>', '<br>', '<br />'), '', $string);
    
    // It is conceivable that people might still want single line-breaks
    // without breaking into a new paragraph.
    if ($line_breaks == true)
        return '<p>'.preg_replace(array("/([\n]{2,})/i", "/([^>])\n([^<])/i"), array("</p>\n<p>", '<br'.($xml == true ? ' /' : '').'>'), trim($string)).'</p>';
    else 
        return '<p>'.preg_replace("/([\n]{1,})/i", "</p>\n<p>", trim($string)).'</p>';
}

/**
 * 把<p></p>\ 替换成r\n
 * @param  [string] $string [字符串]
 * @return [string]         [替换后的字符串]
 */
function p2nl($string)
{
	// 将<p>去掉，</p>替换为\n。
	$string = preg_replace("/[<p>,<P>]/", "", $string);
	$string = preg_replace("/[<\/p>,<\/P>]/", "\n", $string);

	return $string;
}

/**
 * 只显示手机前三位+后四位。
 * @param  [string] $mobile [手机号]
 * @return [string]         [隐藏后的手机号]
 */
function getHideMobile($mobile){
	if ($mobile == "") {
		return "";
	}
	$mobile = substr_replace($mobile, "****", 3, strlen($mobile) - 7);
	return $mobile;
}

?>