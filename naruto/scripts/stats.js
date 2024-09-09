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
            statsClans: [], // Array vacío para alojar los datos de los clanes
            statscharacters : [], // Array vacío para alojar los datos de los personajes por villa
            statsTotalCharacters : 0, // Variable en 0 para alojar el total de personajes
            maleCharacters : 0, // Variable iniciada en 0 para alojar el total de personajes masculinos
            femaleCharacters : 0, // Variable iniciada en 0 para alojar el total de personajes femeninos
            percentageMale : 0, // Variable iniciada en 0 para alojar el porcentaje de personajes masculinos
            percentageFemale : 0, // Variable iniciada en 0 para alojar el porcentaje de personajes femeninos
            undefinedPopulation : 0, // Variable iniciada en 0 para alojar el total de población con sexo no definido
            undefinedPercentage : 0, // Variable iniciada en 0 para alojar el porcentaje de población con sexo no definido
            debutCount: {},   // Aquí se almacenará el conteo de appearsIn
            url: "", // Url para la API villa
        };
    },
    mounted() {
        this.url = "https://narutodb.xyz/api/village?page=1&limit=39";
        this.traerDataVilla(this.url); // Llamada a la API con la url correspondiente a la villa
        this.url = "https://narutodb.xyz/api/clan?page=1&limit=58"
        this.traerDataClan(this.url) //Llamada a la API con la url correspondiente al clan
        this.url = "https://narutodb.xyz/api/character?page=1&limit=1431"
        this.traerDataDebut(this.url)
    },
    methods: {
        traerDataVilla(url) {
            fetch(url).then(response => response.json()).then(data => {
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
        },
        traerDataClan(url) {
            fetch(url).then(response => response.json()).then(data => {
                    this.statsClans = data.clans.map(clans => {
                    this.statscharacters = clans.characters;
                    // Contar total de personajes por clan
                    this.statsTotalCharacters = this.statscharacters.length;
                    // Valida si el total de personajes es 0 para no dividir por 0
                    if (this.statsTotalCharacters === 0) {
                        return {
                            name: clans.name,
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
                            name: clans.name,
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
    },
    traerDataDebut(url) {
        fetch(url).then(response => response.json()).then(data => {
                this.debutCount = data.characters.reduce((acount, character) => {
                    // Verificar si el personaje tiene un campo debut con appearsIn
                    if (character.debut && character.debut.appearsIn) {
                        // Dividir los elementos de appearsIn
                        const medios = character.debut.appearsIn.split(', ').map(m => m.trim());
                        // Contar cuántos personajes aparecen en cada medio
                        medios.forEach(medio => {
                            if (!acount[medio]) {
                                acount[medio] = 1;
                            } else {
                                acount[medio] += 1;
                            }
                        });
                    }
                    return acount;
                }, {});
                console.log(this.debutCount);  // Imprimir el resultado para verificar
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
                <div id="carouselExample" class="carousel slide">  
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="../assets/pngegg (8).png" alt="Personajes" class="img-fluid mx-auto d-block img-stats-naruto">
                            <ul class="pagination justify-content-center mt-3">
                                <li class="page-item">
                                    <a class="page-link" href="#" data-bs-target="#carouselExample" data-bs-slide-to="0">1</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#" data-bs-target="#carouselExample" data-bs-slide-to="1">2</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#" data-bs-target="#carouselExample" data-bs-slide-to="2">3</a>
                                </li>
                            </ul> 
                            <h2 class="text-center text-white fw-bold">POPULATION BY VILLAGES</h2>
                            <div class="table-responsive">
                                <table class="table table-stats table-hover">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>#</th>
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
                                        <tr v-for="(village, index) in statsVillages" :key="village.id">
                                            <td>{{ index + 1 }}</td>
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
                        </div>
                        <div class="carousel-item">
                            <img src="../assets/varios-narutos.png" alt="varios Narutos" class="img-fluid mx-auto d-block img-stats-naruto">
                            <ul class="pagination justify-content-center mt-3">
                                <li class="page-item">
                                    <a class="page-link" href="#" data-bs-target="#carouselExample" data-bs-slide-to="0">1</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#" data-bs-target="#carouselExample" data-bs-slide-to="1">2</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#" data-bs-target="#carouselExample" data-bs-slide-to="2">3</a>
                                </li>
                            </ul> 
                            <h2 class="text-center text-white fw-bold">CHARACTERS PER CLAN</h2>
                            <div class="table-responsive">
                                <table class="table table-stats table-hover">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Clans</th>
                                            <th>Characters</th>
                                            <th>% Men's</th>
                                            <th>Total men's</th>
                                            <th>% Women's</th>
                                            <th>Total women's</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr v-for="(clans, index) in statsClans" :key="clans.id">
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ clans.name }}</td>
                                            <td>{{ clans.population }}</td>
                                            <td>{{ clans.malePercentage }}%</td>
                                            <td>{{ clans.maleTotal }}</td>
                                            <td>{{ clans.femalePercentage }}%</td>
                                            <td>{{ clans.femaleTotal }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                        <div class="carousel-item">
                            <img src="../assets/pngwing.com (6) (1).png" alt="varios Narutos" class="img-fluid mx-auto d-block img-stats-naruto">
                            <ul class="pagination justify-content-center mt-3">
                                <li class="page-item">
                                    <a class="page-link" href="#" data-bs-target="#carouselExample" data-bs-slide-to="0">1</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#" data-bs-target="#carouselExample" data-bs-slide-to="1">2</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#" data-bs-target="#carouselExample" data-bs-slide-to="2">3</a>
                                </li>
                            </ul> 
                            <h2 class="text-center text-white fw-bold">NUMBER OF CHARACTERS PER DEBUT</h2>
                            <div class="table-responsive">
                                <table class="table table-stats table-hover">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Debut</th>
                                            <th>Characters in debut</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- Convertir debutCount a un array de objetos -->
                                        <tr v-for="(value, key) in debutCount" :key="key">
                                            <td>{{ key }}</td>
                                            <td>{{ value }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>      
                </div>
                <ul class="pagination justify-content-center mt-3">
                    <li class="page-item">
                        <a class="page-link" href="#" data-bs-target="#carouselExample" data-bs-slide-to="0">1</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#" data-bs-target="#carouselExample" data-bs-slide-to="1">2</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#" data-bs-target="#carouselExample" data-bs-slide-to="2">3</a>
                    </li>
                </ul>          
            </div>
        </main>
    </body>
    `
});

new Vue({
    el: '#app',
});
