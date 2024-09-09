// Componente Header
Vue.component('header-component', {
    template: `
        <header>
        <div class="nav-container">
            <div class="menu-icon" id="menuIcon">
                <img class="logo" src="../assets/naruto-removebg-preview.png" alt="Menu Icon">
            </div>
            <nav class="navbar navbar-expand-md navbar-light" id="navbar">
                <a class="navbar-brand d-md-none" href="#home">Home</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <nav id="navbar-nav" class="justify-content-center">
                    <a href="../pages/index.html" class="nav-link">
                    <img class="logo" src="../assets/HOME.png" alt="Home">
                    </a>
                    <a href="../pages/stats.html" class="nav-link">
                    <img class="logo2" src="../assets/STATS.png" alt="Clanes y Técnicas">
                    </a>
                    <a href="../pages/store.html" class="nav-link">
                    <img class="logo" src="../assets/STORE.png" alt="Store">
                    </a>
                </nav>
                </div>
            </nav>
            </div>
        </header>
    `
});
Vue.component('character-details', {
    data() {
        return {
            clan: null,
            errorMessage: null
        };
    },
    mounted() {
        this.loadCharacterDetails();
    },
    methods: {
        loadCharacterDetails() {
            const urlParams = new URLSearchParams(window.location.search);
            const clanName = urlParams.get('name');

            if (clanName) {
                fetch(`https://narutodb.xyz/api/clan/search?name=${clanName}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        this.clan = data;
                        console.log(this.clan);
                    })
                    .catch(error => {
                        console.error('Error al obtener los detalles del clan:', error);
                        this.errorMessage = `No se pudo cargar la información del clan: ${error.message}`;
                    });
            } else {
                this.errorMessage = 'ID de clan no proporcionado.';
            }
        },
    },
    computed: {
        characterNames() {
            if (this.clan && this.clan.characters) {
                return this.clan.characters.map(character => character.name).join(', ');
            }
            return 'No disponible';
        }
    },
    template: `
        <div>
            <h1 class="h1-details">{{ clan.name }}</h1>
            <img class="img-details" src="/naruto/assets/clan-naruto_3htx.jpg" alt="Imagen generica clan">
            <p class="p-details"><strong class="strong-details">Characters per clan:</strong> {{ clan.characters ? clan.characters.length : 0 }}</p>
            <p class="p-details"><strong class="strong-details">Name of the characters:</strong> {{ characterNames }}</p>
            <p class="p-details" v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
           

        </div>
    `
});
Vue.component('footer-component', {
    template: `
        <div class="footer-content footer-custom">
            <div class="footer-logo">
                <img src="../assets/naruto-removebg-preview.png" alt="Naruto Logo" />
            </div>
            <p class="footer-description">&copy; 2024 Naruto Fan Page. Todos los derechos reservados.</p>
            
            <div class="footer-social ">
                <a href="https://twitter.com/tuusuario" target="_blank" class="footer-social-link1">
                    <img src="../assets/x.png" alt="Twitter" />
                </a>
                <a href="https://facebook.com/tuusuario" target="_blank" class="footer-social-link">
                    <img src="../assets/facebook.png" alt="Facebook" />
                </a>
                <a href="https://crunchyroll.com/tuusuario" target="_blank" class="footer-social-link">
                    <img src="../assets/crunchyroll.png" alt="Crunchyroll" />
                </a>
            </div>
        </div>
    `
});
new Vue({
    el: '#app-details'
});