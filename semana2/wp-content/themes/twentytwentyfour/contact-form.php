<?php
/**
 * Template Name: Formulario de Contacto
 *
 * Template de página que muestra el formulario de contacto.
 * El procesamiento se realiza via admin-post.php en functions.php.
 *
 * @package Twenty Twenty-Four
 */
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


<?php while ( have_posts() ) : the_post(); ?>

<main class="cf-page">
    <div class="cf-container">

        <header class="cf-header">
            <h1 class="cf-header__title">Contáctanos</h1>
        </header>

        <section class="cf-contact">
            <!-- El action apunta a admin-post.php, el endpoint de WordPress para formularios -->
            <form class="cf-contact__form" method="POST" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">

                <!-- Acción registrada en functions.php -->
                <input type="hidden" name="action" value="contact_form" />

                <!-- Nonce de seguridad -->
                <?php wp_nonce_field( 'contact_form_submit', 'contact_nonce' ); ?>

                <!-- Campo nombre -->
                <div class="cf-form-group">
                    <label class="cf-form-group__label" for="name">Nombre</label>
                    <input
                        class="cf-form-group__input"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Tu nombre"
                        required
                    />
                </div>

                <!-- Campo email -->
                <div class="cf-form-group">
                    <label class="cf-form-group__label" for="email">Email</label>
                    <input
                        class="cf-form-group__input"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="tu@email.com"
                        required
                    />
                </div>

                <!-- Campo mensaje -->
                <div class="cf-form-group">
                    <label class="cf-form-group__label" for="message">Mensaje</label>
                    <textarea
                        class="cf-form-group__input cf-form-group__input--textarea"
                        id="message"
                        name="message"
                        placeholder="Escribe tu mensaje aquí..."
                        required
                    ></textarea>
                </div>

                <button class="cf-contact__btn" type="submit">Enviar mensaje</button>

                <a class="cf-received__back" href="http://127.0.0.1:8080/wp_local/">Volver al inicio</a>

            </form>
        </section>

    </div>
</main>

<?php endwhile; ?>


</body>
</html>
