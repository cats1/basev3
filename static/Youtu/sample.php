<?php

require('./include.php');
use TencentYoutuyun\Youtu;
use TencentYoutuyun\Conf;


// 设置APP 鉴权信息 请在http://open.youtu.qq.com 创建应用

$appid='10118767';
$secretId='AKIDscAXpyr1vc8rOiekTzIRm3CD2e3MZmgz';
$secretKey='LURL3Zx98zjIfvypmmaCJJBwVxDLKftv';
$userid='3212889373';


Conf::setAppInfo($appid, $secretId, $secretKey, $userid,conf::API_YOUTU_END_POINT );

// 人脸检测 调用列子
$uploadRet = YouTu::detectfaceurl('http://www.coolvisit.top/group1/M00/00/21/rBHIpltxKv6AK1SYAADN6YQ9r7Y911.jpg', 1);
echo json_encode($uploadRet);


// $urlA = "http://www.coolvisit.top/group1/M00/00/21/rBHIpltw8i6AFsf5AADN6YQ9r7Y184.jpg";
// $urlB = "http://www.coolvisit.top/group1/M00/00/21/rBHIpltw846AL3MlAAEP5vhbV2Q061.jpg";

// $uploadRet = YouTu::facecompareurl($urlA, $urlB);
// echo json_encode($uploadRet);

?>