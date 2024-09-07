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
                    <img class="logo" src="../assets/HOME (1).png" alt="Home">
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

// Componente Footer
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

  // Componente Stats - TABLAS
  Vue.component('stats-component', {
    data() {
        return {
            statsVillages: [], // Array vacío para alojar los datos de las villas
            statscharacters : [], // Array vacío para alojar los datos de los personajes por villa
            statsTotalCharacters : 0, // Variable en 0 para alojar el total de personajes
            maleCharacters : 0, // Variable iniciada en 0 para alojar el total de personajes masculinos
            femaleCharacters : 0, // Variable iniciada en 0 para alojar el total de personajes femeninos
            percentageMale : 0, // Variable iniciada en 0 para alojar el porcentaje de personajes masculinos
            percentageFemale : 0, // Variable iniciada en 0 para alojar el porcentaje de personajes femeninos
            undefinedPopulation : 0, // Variable iniciada en 0 para alojar el total de población con sexo no definido
            undefinedPercentage : 0, // Variable iniciada en 0 para alojar el porcentaje de población con sexo no definido
            url: "" // Url para la API
        };
    },
    mounted() {
        this.url = "https://narutodb.xyz/api/village?page=1&limit=39";
        this.traerDataVilla(this.url); // Llamada a la API con la url correspondiente
    },
    methods: {
        traerDataVilla(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.statsVillages = data.villages.map(village => {
                        this.statscharacters = village.characters;
                        // Contar total de personajes por villa
                        this.statsTotalCharacters = this.statscharacters.length;

                        // Valida si el total de personajes es 0 para no dividir por 0
                        if (this.statsTotalCharacters === 0) {
                            return {
                                name: village.name,
                                population: 0,
                                malePercentage: 0,
                                maleTotal: 0,
                                femalePercentage: 0,
                                femaleTotal: 0,
                                undefinedPercentage: 0,
                                undefinedTotal: 0,
                            };
                        } else {
                            // Filtrar y cuenta el total de personajes masculinos
                            this.maleCharacters = this.statscharacters.filter(character => character.personal.sex === "Male").length;
                            // Filtrar y cuenta el total de personajes femeninos
                            this.femaleCharacters = this.statscharacters.filter(character => character.personal.sex === "Female").length;
                            // Calculo del total de población con sexo no definido
                            this.undefinedPopulation = this.statsTotalCharacters - this.maleCharacters - this.femaleCharacters;

                            return {
                                // Retorna los valores calculados por villa
                                name: village.name,
                                population: this.statsTotalCharacters,
                                malePercentage: Math.round((this.maleCharacters / this.statsTotalCharacters) * 100),
                                maleTotal: this.maleCharacters,
                                femalePercentage: Math.round((this.femaleCharacters / this.statsTotalCharacters) * 100),
                                femaleTotal: this.femaleCharacters,
                                undefinedPercentage: Math.round((this.undefinedPopulation / this.statsTotalCharacters) * 100),
                                undefinedTotal: this.undefinedPopulation,
                            };
                        }
                    });
                });
        }
    },
    template: `
    <body class="d-flex flex-column min-vh-100, body-stats">
        <main class="flex-grow-1">
            <div class="text-center">
                <img src="../assets/STATS.png" alt="imagen titulo Stats" class="img-fluid mx-auto img-titulo-stats">
            </div>
            <div class="container">
                <img src="../assets/varios-narutos.png" alt="varios Narutos" class="img-fluid mx-auto d-block img-stats-naruto">
                <table class="table-stats table table-bordered">
                    <thead class="table-dark">
                        <tr>
                            <th>Villages</th>
                            <th>Population</th>
                            <th>% Men's</th>
                            <th>Total men's</th>
                            <th>% Women's</th>
                            <th>Total women's</th>
                            <th>% Undefined sex</th>
                            <th>Undefined sex</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="village in statsVillages" :key="village.name">
                            <td>{{ village.name }}</td>
                            <td>{{ village.population }}</td>
                            <td>{{ village.malePercentage }}%</td>
                            <td>{{ village.maleTotal }}</td>
                            <td>{{ village.femalePercentage }}%</td>
                            <td>{{ village.femaleTotal }}</td>
                            <td>{{ village.undefinedPercentage }}%</td>
                            <td>{{ village.undefinedTotal }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </body>
    `
});

new Vue({
    el: '#app',
});
