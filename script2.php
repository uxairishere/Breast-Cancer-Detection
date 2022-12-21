<?php

$sendOutputToNode = "<html><body><h1>SCRIPT FROM PHP</h1><br/><h2>Successful</h2>";

$sendOutputToNode .= "<br/> First Name: ". $argv[1];
$sendOutputToNode .= "<br/> Last Name: ". $argv[2];

$sendOutputToNode .= "</body></html>";

echo $sendOutputToNode;
?>