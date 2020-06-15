<?php

$requestt = file_get_contents("php://input");
$object = json_decode($requestt);
var_dump($object);