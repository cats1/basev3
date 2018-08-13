<?php
header('Access-Control-Allow-Origin:*');

require('./include.php');
use TencentYoutuyun\Youtu;
use TencentYoutuyun\Conf;

// 设置APP 鉴权信息 请在http://open.youtu.qq.com 创建应用
$data = json_decode(file_get_contents("php://input"), true);
$urla = $data['urla'];
$urlb = $data['urlb'];

$appid='10118767';
$secretId='AKIDscAXpyr1vc8rOiekTzIRm3CD2e3MZmgz';
$secretKey='LURL3Zx98zjIfvypmmaCJJBwVxDLKftv';
$userid='3212889373';

Conf::setAppInfo($appid, $secretId, $secretKey, $userid,conf::API_YOUTU_END_POINT );

$uploadRet = YouTu::facecompareurl($urla, $urlb);

echo json_encode($uploadRet);