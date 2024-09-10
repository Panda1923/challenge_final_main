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
        <div class="card-clan-details">
            <h1 class="card-title">{{ clan.name }}</h1>
            <img class="card-image" src="../assets/clan-naruto_3htx.jpg" alt="Imagen genérica clan">
            <p class="card-text"><strong class="strong-details">Characters per clan:</strong> {{ clan.characters ? clan.characters.length : 0 }}</p>
            <p class="card-text"><strong class="strong-details">Name of the characters:</strong> {{ characterNames }}</p>
            <p class="card-text" v-if="errorMessage">{{ errorMessage }}</p>
            <a class="card-button" href="./index.html" id="backToCharacters">Return to Characters</a>
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