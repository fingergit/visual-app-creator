<?php
/**
 * 此文件中定义GUID相关函数。
 */

/**
 * 创建GUID
 * @return [string] [GUID字符串]
 */
function create_guid() {
    $charid = strtoupper(md5(uniqid(mt_rand(), true)));
    $hyphen = chr(45);// "-"
    $uuid = chr(123)// "{"
    .substr($charid, 0, 8).$hyphen
    .substr($charid, 8, 4).$hyphen
    .substr($charid,12, 4).$hyphen
    .substr($charid,16, 4).$hyphen
    .substr($charid,20,12)
    .chr(125);// "}"
    return $uuid;
}

/**
 * 系统毫秒类。
 */
class System    
{    
    function currentTimeMillis()    
    {    
        list($usec, $sec) = explode(" ",microtime());    
        return $sec.substr($usec, 2, 3);    
    }    
}    

/**
 * 网卡地址类。
 */
class NetAddress    
{    
    var $Name = 'localhost';    
    var $IP = '127.0.0.1';    
    static function getLocalHost() // static    
    {    
        $address = new NetAddress();    
        $address->Name = $_ENV["COMPUTERNAME"];    
        $address->IP = $_SERVER["SERVER_ADDR"];    
        return $address;    
    }    
    function toString()    
    {    
        return strtolower($this->Name.'/'.$this->IP);    
    }    
}    

/**
 * 随机数类。
 */
class Random    
{    
    function nextLong()    
    {    
        $tmp = rand(0,1)?'-':'';    
        return $tmp.rand(1000, 9999).rand(1000, 9999).rand(1000, 9999).rand(100, 999).rand(100, 999);    
    }    
}    

/**
 * GUID类。
 * 三段，一段是微秒 一段是地址 一段是随机数    
 * require_once("guid.class.php");    
 * $Guid = new Guid();    
 * print $Guid->toString();
 */
class Guid    
{    
    var $valueBeforeMD5;    
    var $valueAfterMD5;    
    function Guid()    
    {    
        $this->getGuid();    
    }    
    //    
    function getGuid()    
    {    
        $address = NetAddress::getLocalHost();    
        $this->valueBeforeMD5 = $address->toString().':'.System::currentTimeMillis().':'.Random::nextLong();    
        $this->valueAfterMD5 = md5($this->valueBeforeMD5);    
    }    
    function newGuid()    
    {    
        $Guid = new Guid();    
        return $Guid;    
    }    
    function toString()    
    {    
        $raw = strtoupper($this->valueAfterMD5); 
        return substr($raw,0,8).'-'.substr($raw,8,4).'-'.substr($raw,12,4).'-'.substr($raw,16,4).'-'.substr($raw,20);    
    }    
}

