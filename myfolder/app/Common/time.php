<?php
/**
 * 此文件中定义时间相关函数。
 * @author lvaj <[lvaj2000@163.com]>
 */

/**
 * 获取当前时间戳，精确到毫秒
 * @return [float] [带毫秒的时间戳]
 */
function microtime_float()
{
   list($usec, $sec) = explode(" ", microtime());
   return ((float)$usec + (float)$sec);
}

/**
 * 格式化时间戳，精确到毫秒，x代表毫秒
 * @param  [string] $tag  [格式]
 * @param  [string] $time [时间戳]
 * @return [string]       [带毫秒的字符串]
 */
function microtime_format($tag, $time)
{
   list($usec, $sec) = explode(".", $time);
   $date = date($tag,$usec);
   return str_replace('x', $sec, $date);
}

/**
 * 获取当前时间。格式为"y-m-d h:i:s"。
 * @return [string] [当前时间字符串]
 */
function getCurTime()
{
	ini_set('date.timezone','Asia/Shanghai');
	$curTime = date("Y-m-d H:i:s");
	return $curTime;
}

/**
 * 获取今天的日期。
 * @return [string] [今天的日期字符串]
 */
function getToday(){
	ini_set('date.timezone','Asia/Shanghai');
	$curTime = date("Y-m-d");
	return $curTime;
}

/**
 * 获取今日00:00:00的时间戳。
 * @return [int] [时间戳]
 */
function getTodayTimeStamp(){
	return strtotime(getToday());
}

/**
 * 对某日期加上指定天数，返回日期。
 * @param [int] $date [时间戳]
 * @param [int] $day  [天数]
 * @return [string] [日期字符串]
 */
function addDay($date, $day){
	$date = strtotime($date) + ((($day * 24) * 60) * 60);
	return date('Y-m-d', $date);
}

/**
 * 获取今日日期中的年月，形式：2005-04。
 * @return [string] [年月]
 */
function getCurMonth(){
	ini_set('date.timezone','Asia/Shanghai');
	$curTime = date("Y-m");
	return $curTime;
}

/**
 * 获取今日日期中的年值。
 * @return [int] [年值]
 */
function getCurYearOnly(){
	ini_set('date.timezone','Asia/Shanghai');
	$curTime = date("Y");
	return $curTime;
}

/**
 * 获取今日日期中的月值。
 * @return [int] [月值]
 */
function getCurMonthOnly(){
	ini_set('date.timezone','Asia/Shanghai');
	$curTime = date("m");
	return $curTime;
}

/**
 * 获取今日日期中的日值。
 * @return [int] [日值]
 */
function getCurDayOnly(){
	ini_set('date.timezone','Asia/Shanghai');
	$curTime = date("d");
	return $curTime;
}

/** 根据时间戳，返回所在的天的时间戳 */
function getDay($timeStamp){
	$day = (int)($timeStamp / 86400);
	$day = $day * 86400;

	return $day;
}
