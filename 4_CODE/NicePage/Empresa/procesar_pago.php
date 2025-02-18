<?php
if (function_exists('imagewebp')) {
    echo "El soporte para WebP está habilitado en este servidor.";
} else {
    echo "El soporte para WebP NO está habilitado en este servidor.";
}
?>
