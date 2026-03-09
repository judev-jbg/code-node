<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Cabecera del sitio -->
<header class="site-header">
    <div class="container">
        <div class="site-header__branding">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                <?php bloginfo( 'name' ); ?>
            </a>
        </div>

        <!-- Menú de navegación principal -->
        <nav class="site-nav">
            <?php
            wp_nav_menu( array(
                'theme_location' => 'primary',
                'menu_class'     => '',
                'container'      => false,
                'fallback_cb'    => false,
            ) );
            ?>
        </nav>
    </div>
</header>
