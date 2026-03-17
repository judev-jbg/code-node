<?php
/**
 * Template principal — loop de entradas del blog.
 *
 * @package consultoria-theme
 */

get_header();
?>

<main class="section">
    <div class="container">
        <h1 class="section__title">Blog</h1>

        <?php if ( have_posts() ) : ?>
            <?php while ( have_posts() ) : the_post(); ?>
                <article class="post-item">
                    <h2 class="post-item__title">
                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                    </h2>
                    <p class="post-item__meta"><?php echo get_the_date(); ?> &mdash; <?php the_author(); ?></p>
                    <?php the_excerpt(); ?>
                </article>
            <?php endwhile; ?>
            <?php the_posts_pagination(); ?>
        <?php else : ?>
            <p>No hay entradas publicadas todavía.</p>
        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>
