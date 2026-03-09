<?php
/**
 * Template de la página de productos.
 * Se activa automáticamente para la página con slug "productos".
 * Muestra los productos de WooCommerce si está instalado.
 *
 * @package cafe-theme
 */

get_header();
?>

<main class="container section">
    <h1 class="section__title">Nuestros productos</h1>

    <?php if ( class_exists( 'WooCommerce' ) ) : ?>

        <?php
        /* Consulta los productos publicados de WooCommerce */
        $products = new WP_Query( array(
            'post_type'      => 'product',
            'posts_per_page' => 12,
            'post_status'    => 'publish',
        ) );
        ?>

        <?php if ( $products->have_posts() ) : ?>
            <div class="products-grid">
                <?php while ( $products->have_posts() ) : $products->the_post(); ?>
                    <?php
                    /* Obtiene el objeto producto de WooCommerce para acceder al precio */
                    $product = wc_get_product( get_the_ID() );
                    ?>
                    <div class="product-card">
                        <?php if ( has_post_thumbnail() ) : ?>
                            <?php the_post_thumbnail( 'medium', array( 'class' => 'product-card__img' ) ); ?>
                        <?php endif; ?>
                        <div class="product-card__body">
                            <h2 class="product-card__title"><?php the_title(); ?></h2>
                            <p style="font-size: 0.9rem; margin: 0.5rem 0;"><?php the_excerpt(); ?></p>
                            <span class="product-card__price"><?php echo $product->get_price_html(); ?></span>
                        </div>
                    </div>
                <?php endwhile; ?>
                <?php wp_reset_postdata(); ?>
            </div>
        <?php else : ?>
            <p>No hay productos disponibles todavía.</p>
        <?php endif; ?>

    <?php else : ?>
        <p>La tienda no está disponible en este momento.</p>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
