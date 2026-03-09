<?php
/**
 * Template de la página de contacto.
 * Se activa automáticamente para la página con slug "contacto".
 *
 * @package cafe-theme
 */

get_header();
?>

<main class="container section">
    <h1 class="section__title">Contacto</h1>

    <div class="contact-form">
        <p style="margin-bottom: 1.5rem;">¿Tienes alguna pregunta o quieres hacer un pedido especial? Escríbenos.</p>

        <form method="POST" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
            <input type="hidden" name="action" value="cafe_contact_form" />
            <?php wp_nonce_field( 'cafe_contact_submit', 'cafe_nonce' ); ?>

            <!-- Campo nombre -->
            <div class="form-group">
                <label for="name">Nombre</label>
                <input type="text" id="name" name="name" placeholder="Tu nombre" required />
            </div>

            <!-- Campo email -->
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="tu@email.com" required />
            </div>

            <!-- Campo mensaje -->
            <div class="form-group">
                <label for="message">Mensaje</label>
                <textarea id="message" name="message" placeholder="Escribe tu mensaje..." required></textarea>
            </div>

            <button type="submit" class="btn">Enviar mensaje</button>
        </form>
    </div>
</main>

<?php get_footer(); ?>
