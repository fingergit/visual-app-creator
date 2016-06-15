<?php

/**
 * 此地测试，此值设置为true，正式发布，此值设置为【false】
 */
define('LAJ_LOCALTEST', true); /// 正式发布时，此值设置为【false】

/**
 * ThinkPhp配置数组。
 */
return array(
	// 'SHOW_PAGE_TRACE' => true,
    'LOG_RECORD'            => true,   //记录日志
    // 'LOG_LEVEL'				=> 'EMERG,ALERT,CRIT,ERR',
    // 'SESSION_EXPIRE' 		=> 1800, // 半小时失效。
    // 'SESSION_TYPE'   		=> 'Db', // Sesseion类型。
    /**
     * Session参数。
     */
    'SESSION_OPTIONS'		=> array(
            'expire'		=> 1800,  // Sesseion过期时间。
        ),
    'CKEY'					=> 'Yksy248H$dsY', 		// 加解密钥。
    'COUNTPERPAGE'			=> 15, 					// 分页显示时，每页的项个数。

	//'配置项'=>'配置值'
	// 开启应用分组，注意：逗号间不能有空格
	'APP_GROUP_LIST' 		=> 'Index,Admin',
	'DEFAULT_GROUP' 		=> 'Index',
	'URL_MODEL' 			=> 2, //URL模式

	'APP_GROUP_MODE' 		=> 1, //开启独立分组

	// 加载Common文件。
	'LOAD_EXT_FILE' 		=> 'pinyin,crypt,file,log,mobile,string,time,validate,MCrypt', // 自动加载common目录下的php文件。

	// 数据库配置
	'DB_HOST' 				=> 'localhost',
//	'DB_PORT' 				=> LAJ_LOCALTEST ? '3307' : '',
	'DB_USER' 				=> 'root',
	'DB_PWD' 				=> LAJ_LOCALTEST ? '123456' : '',
	'DB_NAME' 				=> 'finger',  // 数据库名称。
	'DB_PREFIX' 			=> 'fin_', // 数据库表前缀

	// public路径的名称。
	'TMPL_PARSE_STRING'  =>array(
		'__PUBLIC__' => __ROOT__,
	),


	// 点语法默认解析
	'TMPL_VAR_INDENTIFY' 	=> 'array',

	// 可以少一个目录，Index_index
	'TMPL_FILE_DEPR' 		=> '_',

	// 'URL_PATHINFO_DEPR'=>'-', // 更改PATHINFO参数分隔符
	'URL_CASE_INSENSITIVE' 	=> true,

	'UPLOAD_TEMPDIR'		=> '/myfolder/app/Upload/Temp/', 		// 上传文件的临时路径

	/**
	 * 路由相关设置。
	 */
	'URL_ROUTER_ON' 		=> 1, //开启路由
	'URL_ROUTE_RULES' 		=> array(
		// 'index' => 'Index/Index/index', //注意：不能这样定义，否则会导致indexaction中的函数都找不到正确的url。
		'index/image' 			=> 'Index/Index/image',
	),
);
?>