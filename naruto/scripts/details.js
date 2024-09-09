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

        formatNatureType(natureType) {
            if (!natureType || !natureType.length) return 'No disponible';
            return natureType.join(', ');
        },

        formatRank(rank) {
            if (!rank || !rank.ninjaRank) return 'No disponible';
            const { ninjaRank, ninjaRegistration } = rank;
            let rankText = 'Ninja Rank: ';
            for (const part in ninjaRank) {
                rankText += `${part}: ${ninjaRank[part]}, `;
            }
            rankText += `Registro Ninja: ${ninjaRegistration || 'No disponible'}`;
            return rankText;
        },

        formatDebut(debut) {
            if (!debut) return 'No disponible';
            return `
                Manga: ${debut.manga || 'No disponible'}
                Anime: ${debut.anime || 'No disponible'}
                Novel: ${debut.novel || 'No disponible'}
                Movie: ${debut.movie || 'No disponible'}
                Game: ${debut.game || 'No disponible'}
                Ova: ${debut.ova || 'No disponible'}
            `;
        },

        formatJutsu(jutsu) {
            if (!jutsu || !jutsu.length) return 'No disponible';
            return jutsu.join(', ');
        }
    },
    template: `
        <div v-if="character">
            <div>
                <h1 class="h1-details">{{ character.name }}</h1>
                <img class="img-details" :src="character.images[0]" alt="Imagen del personaje">
                <p class="p-details"><strong class="strong-details">Nature Type:</strong> {{ formatNatureType(character.natureType) }}</p>
                <p class="p-details"><strong class="strong-details">Rango:</strong> {{ formatRank(character.rank) }}</p>
                <p class="p-details"><strong class="strong-details">Debut:</strong> {{ formatDebut(character.debut) }}</p>
                <p class="p-details"><strong class="strong-details">Jutsu:</strong> {{ formatJutsu(character.jutsu) }}</p>
                <a class="button-details" href="./index.html" id="backToCharacters">Regresar a Personajes</a>
            </div>
            <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>
    `
});

new Vue({
    el: '#app-details'
});
