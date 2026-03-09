<?php
/**
 * Template para el detalle de una entrada individual.
 * Muestra campos nativos de WordPress y el campo ACF "origen_cafe".
 *
 * @package cafe-theme
 */

get_header();
?>

<main class="container">
    <?php while ( have_posts() ) : the_post(); ?>

        <article class="post">
            <!-- Título de la entrada -->
            <h1 class="post__title"><?php the_title(); ?></h1>

            <!-- Metadatos nativos: fecha y autor -->
            <p class="post__meta">
                <?php echo get_the_date(); ?> &mdash; Por <?php the_author(); ?>
                <?php
                /* Muestra las categorías si las tiene */
                $categories = get_the_category_list( ', ' );
                if ( $categories ) :
                ?>
                    &mdash; <?php echo $categories; ?>
                <?php endif; ?>
            </p>

            <!-- Imagen destacada -->
            <?php if ( has_post_thumbnail() ) : ?>
                <div style="margin-bottom: 1.5rem;">
                    <?php the_post_thumbnail( 'large', array( 'style' => 'width:100%; height:360px; object-fit:cover; border-radius:6px;' ) ); ?>
                </div>
            <?php endif; ?>

            <!-- Contenido de la entrada -->
            <div class="post__content">
                <?php the_content(); ?>
            </div>

            <?php
            /**
             * Campo ACF: origen_cafe
             * Muestra el origen del café mencionado en la entrada.
             * El campo debe crearse en ACF con el nombre "origen_cafe" asignado a Entradas.
             */
            $origen = get_field( 'origen_cafe' );
            if ( $origen ) :
            ?>
                <div class="post__acf">
                    <p class="post__acf-label">Origen del café</p>
                    <p class="post__acf-value"><?php echo esc_html( $origen ); ?></p>
                </div>
            <?php endif; ?>

            <!-- Navegación entre entradas -->
            <nav style="margin-top: 2rem; display: flex; justify-content: space-between;">
                <?php previous_post_link( '%link', '&larr; Entrada anterior' ); ?>
                <?php next_post_link( '%link', 'Entrada siguiente &rarr;' ); ?>
            </nav>
        </article>

    <?php endwhile; ?>
</main>

<?php get_footer(); ?>
