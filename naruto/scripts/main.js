Vue.component('header-component', {
    template: `
    <header class="bg-dark text-white text-center py-5">
        <h1>NarutoDB</h1>
        <p>Explora el mundo ninja de Naruto</p>
    </header>
    `
});

Vue.component('navbar-component', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Inicio</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Personajes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Técnicas</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Clanes</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `
});

new Vue({
    el: '#app'
});
Vue.component('footer-component', {
    template: `
    <footer class="bg-dark text-white text-center py-3">
        <p>&copy; 2024 NarutoDB. Todos los derechos reservados.</p>
    </footer>
    `
});

new Vue({
    el: '#app'
})