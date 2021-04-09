<?php
$_POST = json_decode(file_get_contents("php://input"), true);

$filename = "../../temp.html";

if (empty($_POST['html'])) {
    http_response_code(400);
    exit;
}

file_put_contents($filename, $_POST['html']);