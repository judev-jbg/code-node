<?php
/**
 * Plugin Name: Casos de Éxito
 * Description: Registra el Custom Post Type "Casos de éxito", lo expone en la REST API y añade un endpoint personalizado.
 * Version: 1.0.0
 * Author: Junior Balcazar
 * Text Domain: casos-exito
 */

/**
 * Registra el Custom Post Type "casos_exito".
 *
 * @return void
 */
function casos_exito_register_cpt() {
    $labels = array(
        'name'               => __( 'Casos de éxito', 'casos-exito' ),
        'singular_name'      => __( 'Caso de éxito', 'casos-exito' ),
        'add_new'            => __( 'Añadir nuevo', 'casos-exito' ),
        'add_new_item'       => __( 'Añadir caso de éxito', 'casos-exito' ),
        'edit_item'          => __( 'Editar caso de éxito', 'casos-exito' ),
        'new_item'           => __( 'Nuevo caso de éxito', 'casos-exito' ),
        'view_item'          => __( 'Ver caso de éxito', 'casos-exito' ),
        'search_items'       => __( 'Buscar casos de éxito', 'casos-exito' ),
        'not_found'          => __( 'No se encontraron casos', 'casos-exito' ),
        'not_found_in_trash' => __( 'No hay casos en la papelera', 'casos-exito' ),
        'menu_name'          => __( 'Casos de éxito', 'casos-exito' ),
    );

    register_post_type( 'casos_exito', array(
        'labels'       => $labels,
        'public'       => true,
        'has_archive'  => true,
        'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        /* Expone el CPT en la REST API de WordPress */
        'show_in_rest' => true,
        'rest_base'    => 'casos-exito',
        'menu_icon'    => 'dashicons-awards',
        'rewrite'      => array( 'slug' => 'casos-exito' ),
    ) );
}
add_action( 'init', 'casos_exito_register_cpt' );

/**
 * Registra el endpoint personalizado que devuelve solo los títulos
 * de los casos de éxito en un array JSON limpio.
 *
 * Ruta: GET /wp-json/casos-exito/v1/titulos
 *
 * @return void
 */
function casos_exito_register_rest_route() {
    register_rest_route( 'casos-exito/v1', '/titulos', array(
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => 'casos_exito_get_titulos',
        'permission_callback' => '__return_true',
    ) );
}
add_action( 'rest_api_init', 'casos_exito_register_rest_route' );

/**
 * Registra el campo ACF "descripcion_corta" en la REST API para el CPT casos_exito.
 * Sin esto, ACF no incluye los campos en la respuesta de la API.
 *
 * @return void
 */
function casos_exito_register_acf_rest_field() {
    register_rest_field( 'casos_exito', 'descripcion_corta', array(
        'get_callback' => function( $post ) {
            return get_field( 'descripcion_corta', $post['id'] );
        },
        'schema' => array(
            'type'        => 'string',
            'description' => 'Descripción corta del caso de éxito',
        ),
    ) );
}
add_action( 'rest_api_init', 'casos_exito_register_acf_rest_field' );

/**
 * Callback del endpoint personalizado.
 * Devuelve un array con solo los títulos de los casos de éxito publicados.
 *
 * @return WP_REST_Response
 */
function casos_exito_get_titulos() {
    $posts = get_posts( array(
        'post_type'      => 'casos_exito',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    ) );

    /* Mapea los resultados dejando solo el título */
    $titulos = array_map( function( $post ) {
        return array( 'titulo' => $post->post_title );
    }, $posts );

    return new WP_REST_Response( $titulos, 200 );
}
