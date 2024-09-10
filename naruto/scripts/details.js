Vue.component('character-details', {
    data() {
        return {
            character: null,
            errorMessage: null
        };
    },
    mounted() {
        this.loadCharacterDetails();
    },
    methods: {
        loadCharacterDetails() {
            const urlParams = new URLSearchParams(window.location.search);
            const characterId = urlParams.get('id');
            
            if (characterId) {
                fetch(`https://dattebayo-api.onrender.com/characters/${characterId}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (!data) {
                            throw new Error('No se encontraron datos para este personaje.');
                        }
                        this.character = data;
                    })
                    .catch(error => {
                        console.error('Error al obtener los detalles del personaje:', error);
                        this.errorMessage = `No se pudo cargar la información del personaje: ${error.message}`;
                    });
            } else {
                console.error('ID de personaje no proporcionado.');
                this.errorMessage = 'ID de personaje no proporcionado en la URL.';
            }
        },
        formatArray(arr) {
            return arr && arr.length ? arr : ['No disponible'];
        },
        formatRank(rank) {
            if (!rank || !rank.ninjaRank) return ['No disponible'];
            return Object.entries(rank.ninjaRank).map(([key, value]) => `${key}: ${value}`);
        },
        formatDebut(debut) {
            if (!debut) return ['No disponible'];
            return Object.entries(debut)
                .filter(([_, value]) => value)
                .map(([key, value]) => `${key}: ${value}`);
        }
    },
    template: `
        <div v-if="character" class="character-card-details">
            <div class="card-header-details">
                <h1 class="character-name-details">{{ character.name }}</h1>
            </div>
            <img class="character-image-details" :src="character.images[0]" :alt="character.name">
            <div class="card-content-details">
                <div class="info-section-details">
                    <h2 class="info-title-details">Nature Type</h2>
                    <ul class="info-list-details">
                        <li v-for="nature in formatArray(character.natureType)" class="info-item-details">{{ nature }}</li>
                    </ul>
                </div>
                <div class="info-section-details">
                    <h2 class="info-title-details">Rango</h2>
                    <ul class="info-list-details">
                        <li v-for="rank in formatRank(character.rank)" class="info-item-details">{{ rank }}</li>
                    </ul>
                </div>
                <div class="info-section-details">
                    <h2 class="info-title-details">Debut</h2>
                    <ul class="info-list-details">
                        <li v-for="debut in formatDebut(character.debut)" class="info-item-details">{{ debut }}</li>
                    </ul>
                </div>
                <div class="info-section-details">
                    <h2 class="info-title-details">Jutsu</h2>
                    <ul class="info-list-details">
                        <li v-for="jutsu in formatArray(character.jutsu)" class="info-item-details">{{ jutsu }}</li>
                    </ul>
                </div>
            </div>
            <a href="./index.html" class="back-button-details">Return to Characters</a>
        </div>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    `
});

new Vue({
    el: '#app-details'
});
