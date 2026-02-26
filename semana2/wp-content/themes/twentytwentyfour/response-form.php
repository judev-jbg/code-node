<?php
/**
 * Template Name: Respuesta de Contacto
 *
 * Template de página que muestra la confirmación y los datos
 * enviados desde el formulario de contacto.
 * Los datos se leen desde la sesión, guardada en functions.php.
 *
 * @package Twenty Twenty-Four
 */

/* Inicia la sesión para acceder a los datos del formulario */
if ( ! session_id() ) {
    session_start();
}

/* Obtiene la URL del formulario para redirigir si no hay datos */
$form_page     = get_page_by_path( 'contact-form' );
$form_page_url = $form_page ? get_permalink( $form_page->ID ) : home_url();

/* Redirige si no hay datos en sesión */
if ( empty( $_SESSION['contact_name'] ) || empty( $_SESSION['contact_message'] ) ) {
    wp_redirect( $form_page_url );
    exit;
}

/* Lee y limpia los datos de la sesión */
$name    = $_SESSION['contact_name'];
$message = $_SESSION['contact_message'];
unset( $_SESSION['contact_name'], $_SESSION['contact_message'] );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>


<main class="cf-page">
    <div class="cf-container">

        <!-- Sección de confirmación -->
        <section class="cf-response">
            <p class="cf-response__thanks">
                Gracias por escribirnos, hemos recibido tu mensaje.
            </p>
        </section>

        <!-- Sección con los datos recibidos -->
        <section class="cf-received">
            <h2 class="cf-received__title">Datos recibidos</h2>
            <ul class="cf-received__list">
                <li class="cf-received__item">
                    <span class="cf-received__label">Nombre:</span>
                    <span class="cf-received__value"><?php echo esc_html( $name ); ?></span>
                </li>
                <li class="cf-received__item">
                    <span class="cf-received__label">Mensaje:</span>
                    <span class="cf-received__value"><?php echo esc_html( $message ); ?></span>
                </li>
            </ul>
            <a class="cf-received__back" href="<?php echo esc_url( $form_page_url ); ?>">Volver al formulario</a>
        </section>

    </div>
</main>

</body>
</html>
