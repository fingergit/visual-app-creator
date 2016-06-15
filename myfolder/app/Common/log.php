<?php
/**
 * 此文件中定义日志相关函数。
 * @author lvaj <[lvaj2000@163.com]>
 */

/**
 * 在浏览器页面中输入字符串或数组。
 * @param  [string,array] $array [字符串或数组]
 * @return [void]        [无]
 */
function p($array){
	dump($array, 1, '<pre>', 0);
}

/**
 * 写入错误类型的日志。
 * @param  [string, array] $param  [日志内容]
 * @param  string $method [函数名]
 * @param  string $line   [行号]
 * @param  string $userid [用户id]
 * @param  string $param2 [第二个输出内容]
 * @return [void]         [无]
 */
function logErr($param, $method = "", $line = "", $userid="", $param2=""){
	$strHead = $method;
	if ($line != "") {
		$strHead .= '[' . $line . ']';
	}
	if ($userid != "") {
		$strHead .= '[' . $userid . ']';
	}
	Log::write("[SELF]".$strHead.array2Str($param).array2Str($param2));
}

/**
 * 写入警告类型的日志。
 * @param  [string, array] $param  [日志内容]
 * @param  string $method [函数名]
 * @param  string $line   [行号]
 * @param  string $userid [用户id]
 * @param  string $param2 [第二个输出内容]
 * @return [void]         [无]
 */
function logWarn($param, $method = "", $line = "", $userid="", $param2=""){
	$strHead = $method;
	if ($line != "") {
		$strHead .= '[' . $line . ']';
	}
	if ($userid != "") {
		$strHead .= '[' . $userid . ']';
	}
	Log::write("[SELF]".$strHead.array2Str($param).array2Str($param2), LOG::WARN);
}

/**
 * 写入信息类型的日志。
 * @param  [string, array] $param  [日志内容]
 * @param  string $method [函数名]
 * @param  string $line   [行号]
 * @param  string $userid [用户id]
 * @param  string $param2 [第二个输出内容]
 * @return [void]         [无]
 */
function logInfo($param, $method = "", $line = "", $userid="", $param2=""){
	$strHead = $method;
	if ($line != "") {
		$strHead .= '[' . $line . ']';
	}
	if ($userid != "") {
		$strHead .= '[' . $userid . ']';
	}
	Log::write("[SELF]".$strHead.array2Str($param).array2Str($param2), LOG::INFO);
}

/**
 * 数组转字符串。
 * @param  array $param2 [数组]
 * @return [string]         [字符串]
 */
function array2Str($ary){
	if (is_array($ary)) {
		$str = "Array: " . json_encode($ary);
	}else{
		$str = $ary;
	}
	return $str;
}
?>