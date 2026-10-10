<?php
declare(strict_types=1);
session_start();
$mensaje = '';
$nombre = trim((string)($_POST['nombre'] ?? ''));
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if ($nombre === '' || mb_strlen($nombre) > 80) {
    $mensaje = 'Escribe un nombre de 1 a 80 caracteres.';
  } else {
    $_SESSION['nombre'] = $nombre;
    $mensaje = 'Hola, ' . $nombre . '. Tu dato se guardó en la sesión PHP.';
  }
}
function escapar(string $v): string { return htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
?>
<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PHP Lab — Bootstrap Atlas</title>
<style>body{font:16px system-ui;background:#080e1b;color:#eef5ff;margin:0;padding:8vh 5vw}.card{max-width:580px;margin:auto;background:#142038;padding:32px;border:1px solid #39546c;border-radius:18px}input,button{padding:12px;border-radius:8px;border:1px solid #517186}button{background:#33d7b7;cursor:pointer}.muted{color:#a6b8cb}</style></head>
<body><main class="card"><p class="muted">BOOTSTRAP ATLAS · PHP 8</p><h1>Formulario PHP funcional</h1><p>Procesa un POST, valida la entrada, escapa HTML y guarda sesión.</p><form method="post"><label for="nombre">Tu nombre</label><p><input id="nombre" name="nombre" required maxlength="80" value="<?=escapar($nombre)?>"></p><button type="submit">Enviar</button></form><?php if($mensaje !== ''): ?><p role="status"><?=escapar($mensaje)?></p><?php endif; ?></main></body></html>
