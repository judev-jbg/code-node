<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Respuesta</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="page">
      <header class="page__header">
        <h1 class="page__title">Formulario de contacto</h1>
      </header>

      <main class="page__main">
        <?php
          /**
           * Procesa los datos enviados por el formulario de contacto.
           * Solo acepta peticiones POST para evitar acceso directo.
           */
          if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
              /* Redirige al formulario si se accede directamente */
              header('Location: index.html');
              exit;
          }

          /* Sanitiza los datos recibidos para evitar XSS */
          $name    = htmlspecialchars(trim($_POST['name'] ?? ''));
          $email   = htmlspecialchars(trim($_POST['email'] ?? ''));
          $message = htmlspecialchars(trim($_POST['message'] ?? ''));

          /* Valida que los campos requeridos no estén vacíos */
          if (empty($name) || empty($email) || empty($message)) {
              echo '<p class="response__error">Todos los campos son obligatorios.</p>';
              exit;
          }
        ?>

        <!-- Sección de confirmación -->
        <section class="response">
          <p class="response__thanks">
            Gracias por escribirnos, hemos recibido tu mensaje.
          </p>
        </section>

        <!-- Sección con los datos recibidos -->
        <section class="received">
          <h2 class="received__title">Datos recibidos</h2>
          <ul class="received__list">
            <li class="received__item">
              <span class="received__label">Nombre:</span>
              <span class="received__value"><?php echo $name; ?></span>
            </li>
            <li class="received__item">
              <span class="received__label">Mensaje:</span>
              <span class="received__value"><?php echo $message; ?></span>
            </li>
          </ul>
          <a class="received__back" href="index.html">Volver al formulario</a>
        </section>
      </main>
    </div>
  </body>
</html>
