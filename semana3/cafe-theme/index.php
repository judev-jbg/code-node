<?php
/**
 * Template principal del tema (loop de entradas).
 * Usado para el blog y como fallback general.
 *
 * @package cafe-theme
 */

get_header();
?>

<main class="container section">
    <h1 class="section__title">Blog</h1>

    <?php if ( have_posts() ) : ?>

        <?php while ( have_posts() ) : the_post(); ?>
            <!-- Entrada del blog -->
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #e8d5b7;">
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <p style="font-size: 0.85rem; color: #a08060; margin: 0.25rem 0 1rem;">
                    <?php echo get_the_date(); ?> &mdash; <?php the_author(); ?>
                </p>
                <?php the_excerpt(); ?>
                <a href="<?php the_permalink(); ?>" class="btn" style="margin-top: 1rem; display: inline-block;">Leer más</a>
            </article>
        <?php endwhile; ?>

        <?php the_posts_pagination(); ?>

    <?php else : ?>
        <p class="not-found">No hay entradas publicadas todavía.</p>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
