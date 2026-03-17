<?php
/**
 * Funciones y definiciones del tema Consultoria Theme.
 *
 * @package consultoria-theme
 */

/**
 * Configura las características del tema.
 *
 * @return void
 */
function consultoria_theme_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'gallery', 'caption' ) );

    /* Registra la ubicación del menú de navegación principal */
    register_nav_menus( array(
        'primary' => __( 'Menú principal', 'consultoria-theme' ),
    ) );
}
add_action( 'after_setup_theme', 'consultoria_theme_setup' );

/**
 * Encola los estilos del tema.
 *
 * @return void
 */
function consultoria_theme_scripts() {
    wp_enqueue_style(
        'consultoria-theme-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get( 'Version' )
    );
}
add_action( 'wp_enqueue_scripts', 'consultoria_theme_scripts' );
