<?php

header("Content-Type:application/json");

$htmlfiles = glob("../../*.html");
$result = array();

foreach ($htmlfiles as $htmlfile) {
    $result[] = basename($htmlfile);
}

echo(json_encode($result));