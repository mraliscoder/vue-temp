<?php
$_POST = json_decode(file_get_contents("php://input"), true);

$filename = "../../" . $_POST['name'];

if (!file_exists($filename)) {
    http_response_code(400);
    exit;
}

unlink($filename);