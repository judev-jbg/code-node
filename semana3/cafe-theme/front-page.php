<?php
/**
 * Template de la página de inicio del negocio de café.
 *
 * @package cafe-theme
 */

get_header();
?>

<!-- Sección hero -->
<section class="hero">
    <h1 class="hero__title">Bienvenido a Café Raíces</h1>
    <p class="hero__subtitle">Café de especialidad cultivado con amor, servido con pasión. Descubre nuestras mezclas únicas.</p>
    <a href="<?php echo esc_url( home_url( '/productos' ) ); ?>" class="hero__btn">Ver productos</a>
</section>

<!-- Sección sobre nosotros -->
<section class="section">
    <div class="container">
        <h2 class="section__title">Nuestra historia</h2>
        <p>En Café Raíces llevamos más de 10 años seleccionando los mejores granos de origen para ofrecerte una experiencia de café única. Cada taza cuenta una historia.</p>
    </div>
</section>

<!-- Sección destacados (últimas entradas del blog) -->
<section class="section" style="background-color: #f5ede0; padding: 3rem 0;">
    <div class="container">
        <h2 class="section__title">Últimas noticias</h2>

        <?php
        /* Consulta las últimas 3 entradas del blog */
        $latest_posts = new WP_Query( array(
            'post_type'      => 'post',
            'posts_per_page' => 3,
            'post_status'    => 'publish',
        ) );
        ?>

        <?php if ( $latest_posts->have_posts() ) : ?>
            <div class="products-grid">
                <?php while ( $latest_posts->have_posts() ) : $latest_posts->the_post(); ?>
                    <div class="product-card">
                        <?php if ( has_post_thumbnail() ) : ?>
                            <?php the_post_thumbnail( 'medium', array( 'class' => 'product-card__img' ) ); ?>
                        <?php endif; ?>
                        <div class="product-card__body">
                            <h3 class="product-card__title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h3>
                            <p style="font-size: 0.85rem; color: #a08060;"><?php echo get_the_date(); ?></p>
                        </div>
                    </div>
                <?php endwhile; ?>
                <?php wp_reset_postdata(); ?>
            </div>
        <?php else : ?>
            <p>Próximamente publicaremos novedades.</p>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
