<?php

$_POST = json_decode(file_get_contents("php://input"), true);

$file = "../../" . $_POST['pageName'];
$html = $_POST['html'];

if (empty($file) || empty($file)) {
    http_response_code(400);
    exit;
}

file_put_contents($file, $html);