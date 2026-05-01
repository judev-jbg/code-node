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

/**
 * Registra los endpoints REST del portafolio.
 * Devuelve perfil y proyectos desde MySQL sin depender del sistema de posts de WordPress.
 *
 * @return void
 */
function portafolio_register_rest_routes() {
    /* Endpoint: GET /wp-json/portafolio/v1/perfil */
    register_rest_route( 'portafolio/v1', '/perfil', array(
        'methods'             => 'GET',
        'callback'            => 'portafolio_get_perfil',
        'permission_callback' => '__return_true',
    ) );

    /* Endpoint: GET /wp-json/portafolio/v1/proyectos */
    register_rest_route( 'portafolio/v1', '/proyectos', array(
        'methods'             => 'GET',
        'callback'            => 'portafolio_get_proyectos',
        'permission_callback' => '__return_true',
    ) );
}
add_action( 'rest_api_init', 'portafolio_register_rest_routes' );

/**
 * Devuelve el perfil del portafolio desde MySQL.
 *
 * @return WP_REST_Response
 */
function portafolio_get_perfil() {
    global $wpdb;

    $perfil = $wpdb->get_row( "SELECT * FROM portafolio_perfil LIMIT 1", ARRAY_A );

    if ( ! $perfil ) {
        return new WP_REST_Response( array( 'error' => 'Perfil no encontrado' ), 404 );
    }

    return new WP_REST_Response( $perfil, 200 );
}

/**
 * Devuelve el listado de proyectos del portafolio desde MySQL.
 *
 * @return WP_REST_Response
 */
function portafolio_get_proyectos() {
    global $wpdb;

    $proyectos = $wpdb->get_results( "SELECT * FROM portafolio_proyectos ORDER BY id ASC", ARRAY_A );

    /* Convierte las tecnologías de string CSV a array */
    foreach ( $proyectos as &$proyecto ) {
        $proyecto['tecnologias'] = explode( ',', $proyecto['tecnologias'] );
    }

    return new WP_REST_Response( $proyectos, 200 );
}
