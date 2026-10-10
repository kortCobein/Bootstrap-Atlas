<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
echo json_encode(['ok'=>true,'runtime'=>'PHP','message'=>'API de demostración Atlas'], JSON_UNESCAPED_UNICODE);
