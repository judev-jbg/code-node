<?php
/**
 * Funciones y definiciones del tema Cafe Theme.
 *
 * @package cafe-theme
 */

/**
 * Configura las características del tema y registra soporte para funciones de WordPress.
 *
 * @return void
 */
function cafe_theme_setup() {
    /* Permite que WordPress gestione el título de la página */
    add_theme_support( 'title-tag' );

    /* Habilita imágenes destacadas en entradas y páginas */
    add_theme_support( 'post-thumbnails' );

    /* Habilita soporte para HTML5 en los elementos indicados */
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'gallery', 'caption' ) );

    /* Registra la ubicación del menú de navegación principal */
    register_nav_menus( array(
        'primary' => __( 'Menú principal', 'cafe-theme' ),
    ) );
}
add_action( 'after_setup_theme', 'cafe_theme_setup' );

/**
 * Encola los estilos y scripts del tema.
 *
 * @return void
 */
function cafe_theme_scripts() {
    /* Carga la hoja de estilos principal del tema */
    wp_enqueue_style(
        'cafe-theme-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get( 'Version' )
    );
}
add_action( 'wp_enqueue_scripts', 'cafe_theme_scripts' );
