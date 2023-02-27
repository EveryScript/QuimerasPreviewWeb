$(document).ready(function () {
    // Header Page
    $('#nav-bar').html(`
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <img src="images/logo.png" alt="logo quimeras" class="img-fluid b-logo" width="250">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNav" aria-controls="mainNav"
            aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon">
                    <i class="fa fa-bars"></i>
                </span>
            </button>

            <div class="collapse navbar-collapse justify-content-end" id="mainNav">
                <ul class="navbar-nav ">
                    <li class="nav-item">
                        <a class="nav-link smoth-scroll" href="index.html">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link smoth-scroll" href="announces.html">Convocatorias</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link smoth-scroll" href="courses.html">Capacitaciones</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link smoth-scroll" href="about.html">Nosotros</a>
                    </li>
                </ul>
            </div>
        </div>
    `);

    // Footer Page
    $('#footer').html(`
        <div class="container">
            <div class="row justify-content-around">
                <div class="col-lg-4">
                    <div class="footer-widget footer-link">
                        <h4>Estamos para ayudarte <br> y orientarte en lo que necesites.</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ipsam hic non sunt recusandae atque unde
                        saepe nihil earum voluptatibus aliquid optio suscipit nobis quia vel quod, iure quae.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12">
                    <div class="footer-widget footer-text">
                        <h4>Nuestra ubicación</h4>
                        <p class="mail"><span>Email:</span> quimeras@email.com</p>
                        <p><span>Ubicación:</span> Calle Lidio Ustarez No. 797 casi esquina Argote</p>
                        <p><span>Telefono:</span> +123 456789</p>
                        <p class="mail"><span>WhatsApp:</span> +591 12345678 </p>
                        <p class="mail"><span>Facebook:</span> #quimerasbolivia</p>
                        <p class="mail"><span>YouTube:</span> #quimerasbolivia</p>
                        <p class="mail"><span>Instagram:</span> #quimerasbolivia</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4">
                    <div class="footer-widget footer-link">
                        <h4>Estamos para ayudarte</h4>
                        <ul>
                        <li> <strong>Lic. Ricardo C. Oropeza Z. </strong> <br> GERENTE GENERAL <br> Cel. 73858162 </li>
                        <li> <strong>Lic. Carla Vargas Soto </strong> <br> GERENTE ADMINISTRATIVA <br> Cel. 69616052 </li>
                        <li> <strong>Atención al cliente</strong> <br> Cel. 68413858 </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                    <div class="col-lg-12 text-center">
                    <div class="footer-copy">
                        <!-- Copyright &copy; 2023, Designed &amp; Developed by <a href="https://themefisher.com/">Themefisher</a> -->
                        Copyright &copy; 2023 - deploy by Ing. Ever Quispe Ticona
                    </div>
                </div>
            </div>
        </div>
    `);
});