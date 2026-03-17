<?php
/**
 * Template de la página de inicio del negocio de Consultoría de TI.
 * Incluye secciones: Hero, Sobre nosotros, Servicios y Casos de éxito (fetch REST API).
 *
 * @package consultoria-theme
 */

get_header();
?>

<!-- Hero -->
<section class="hero">
    <h1 class="hero__title">Consultoría de TI de alto impacto</h1>
    <p class="hero__subtitle">Transformamos negocios a través de la tecnología. Estrategia, implementación y soporte para llevar tu empresa al siguiente nivel.</p>
    <button class="hero__btn" id="btn-casos">Ver casos de éxito</button>
</section>

<!-- Sobre nosotros -->
<section class="section">
    <div class="container">
        <h2 class="section__title">Sobre nosotros</h2>
        <p style="max-width: 720px;">Somos un equipo de consultores con más de 15 años de experiencia en transformación digital, infraestructura cloud, ciberseguridad y desarrollo de software a medida. Trabajamos con empresas de todos los tamaños para diseñar soluciones tecnológicas que generan resultados reales.</p>
    </div>
</section>

<!-- Servicios -->
<section class="section section--alt">
    <div class="container">
        <h2 class="section__title">Servicios</h2>
        <div class="services-grid">

            <div class="service-card">
                <h3 class="service-card__title">Transformación Digital</h3>
                <p class="service-card__desc">Acompañamos a tu organización en el proceso de adopción tecnológica, desde la estrategia hasta la ejecución.</p>
            </div>

            <div class="service-card">
                <h3 class="service-card__title">Cloud & Infraestructura</h3>
                <p class="service-card__desc">Migraciones a la nube, arquitectura de sistemas y gestión de infraestructura en AWS, Azure y GCP.</p>
            </div>

            <div class="service-card">
                <h3 class="service-card__title">Ciberseguridad</h3>
                <p class="service-card__desc">Auditorías de seguridad, gestión de vulnerabilidades y planes de respuesta ante incidentes.</p>
            </div>

            <div class="service-card">
                <h3 class="service-card__title">Desarrollo a Medida</h3>
                <p class="service-card__desc">Construcción de aplicaciones web y móviles adaptadas a los procesos específicos de tu negocio.</p>
            </div>

        </div>
    </div>
</section>

<!-- Casos de éxito (renderizado dinámico via fetch) -->
<section class="section" id="seccion-casos" style="display: none;">
    <div class="container">
        <h2 class="section__title">Casos de éxito</h2>
        <div id="casos-container">
            <p class="casos-loading">Cargando casos de éxito...</p>
        </div>
    </div>
</section>

<script>
(function () {
    /* URL base de la REST API de WordPress inyectada desde PHP */
    const apiUrl = '<?php echo esc_js( rest_url( 'wp/v2/casos-exito' ) ); ?>';
    const nonce  = '<?php echo esc_js( wp_create_nonce( 'wp_rest' ) ); ?>';

    const btn       = document.getElementById( 'btn-casos' );
    const seccion   = document.getElementById( 'seccion-casos' );
    const container = document.getElementById( 'casos-container' );

    /**
     * Hace fetch a la REST API y renderiza los casos de éxito.
     * Muestra título y el campo ACF "descripcion_corta" de cada caso.
     */
    async function cargarCasos() {
        btn.disabled = true;
        seccion.style.display = 'block';
        seccion.scrollIntoView( { behavior: 'smooth' } );

        try {
            const response = await fetch( apiUrl + '?per_page=20&_fields=id,title,descripcion_corta', {
                headers: { 'X-WP-Nonce': nonce }
            } );

            if ( ! response.ok ) {
                throw new Error( 'Error al obtener los datos.' );
            }

            const casos = await response.json();

            if ( casos.length === 0 ) {
                container.innerHTML = '<p>No hay casos de éxito publicados todavía.</p>';
                return;
            }

            /* Renderiza una tarjeta por cada caso de éxito */
            const html = casos.map( caso => `
                <div class="caso-card">
                    <h3 class="caso-card__title">${ caso.title.rendered }</h3>
                    ${ caso.descripcion_corta
                        ? `<p class="caso-card__desc">${ caso.descripcion_corta }</p>`
                        : ''
                    }
                </div>
            ` ).join( '' );

            container.innerHTML = `<div class="casos-list">${ html }</div>`;

        } catch ( error ) {
            container.innerHTML = `<p class="casos-error">No se pudieron cargar los casos de éxito.</p>`;
        }
    }

    btn.addEventListener( 'click', cargarCasos );
}());
</script>

<?php get_footer(); ?>
