<?php
// include "class.phpmailer.php";
include COMMON_PATH."guid.class.php";
//include "guid.class.php";

/**
* 系统邮件发送函数
* @param string $to	接收邮件者邮箱
* @param string $name  接收邮件者名称
* @param string $subject 邮件主题 
* @param string $body	邮件内容
* @param string $attachment 附件列表
* @return boolean 
*/
function think_send_mail($to, $name, $subject = '', $body = '', $attachment = null){
	$config = C('THINK_EMAIL');
	vendor('PHPMailer.class#phpmailer'); //从PHPMailer目录导class.phpmailer.php类文件
	$mail			 = new PHPMailer(); //PHPMailer对象
	$mail->CharSet	= 'UTF-8'; //设定邮件编码，默认ISO-8859-1，如果发中文此项必须设置，否则乱码
	$mail->IsSMTP();  // 设定使用SMTP服务
	$mail->SMTPDebug  = 0;				  // 关闭SMTP调试功能
											// 1 = errors and messages
											// 2 = messages only
	$mail->SMTPAuth   = true;				  // 启用 SMTP 验证功能
	//$mail->SMTPSecure = 'ssl';				 // 使用安全协议
	$mail->Host	   = $config['SMTP_HOST'];  // SMTP 服务器
	$mail->Port	   = $config['SMTP_PORT'];  // SMTP服务器的端口号
	$mail->Username   = $config['SMTP_USER'];  // SMTP服务器用户名
	$mail->Password   = $config['SMTP_PASS'];  // SMTP服务器密码
	$mail->SetFrom($config['FROM_EMAIL'], C('THINK_EMAIL_FROM_NAME'));
	$replyEmail	   = $config['REPLY_EMAIL']?$config['REPLY_EMAIL']:$config['FROM_EMAIL'];
	$replyName		= $config['REPLY_NAME']?$config['REPLY_NAME']:C('THINK_EMAIL_FROM_NAME');
	//$mail->AddReplyTo($replyEmail, $replyName);
	$mail->Subject	= $subject;
	$mail->MsgHTML($body);
	$mail->AddAddress($to, $name);
	if(is_array($attachment)){ // 添加附件
		foreach ($attachment as $file){
			is_file($file) && $mail->AddAttachment($file);
		}
	}
	return $mail->Send() ? true : $mail->ErrorInfo;
}

/**
 * 将base64数据保存为图像文件。
 * @param  [string] $fileName      [保存的文件名]
 * @param  [string] $base64Img [base64数据]
 * @return [boolean]            [成功，返回true]
 */
function saveBase64Img($fileName, $base64Img){
    // 去除头部：
    $base64_body = substr(strstr($base64Img,','),1);
    // 解码:
    $data= base64_decode($base64_body);
    $len = file_put_contents($fileName, $data);
    return ($len > 0);
}
