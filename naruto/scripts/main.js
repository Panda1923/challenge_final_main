// Header Component
Vue.component('header-component', {
    template: `
      <header class="bg-dark text-white text-center py-5">
        <h1>NarutoDB</h1>
        <p>Explora el mundo ninja de Naruto</p>
      </header>
    `
});

// Navbar Component
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
// Header Component
Vue.component('header-component', {
  template: `
    <header class="bg-dark text-white text-center py-5">
      <h1>NarutoDB</h1>
      <p>Explora el mundo ninja de Naruto</p>
    </header>
  `
});

// Navbar Component
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

// Header Component
Vue.component('header-component', {
  template: `
    <header class="bg-dark text-white text-center py-5">
      <h1>NarutoDB</h1>
      <p>Explora el mundo ninja de Naruto</p>
    </header>
  `
});

// Navbar Component
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
// Componente de personajes
Vue.component('characters-section', {
  data() {
    return {
      characters: [], // Almacenará todos los personajes
      errorMessage: null, // Para manejar errores
      currentPage: 1, // Página actual
      totalPages: null, // Total de páginas
    };
  },
  mounted() {
    // Iniciar la carga de personajes desde la API
    this.loadCharacters();
  },
  methods: {
    // Método para cargar los personajes con paginación
    loadCharacters() {
      const limit = 200; // Ajusta el límite según lo que permita la API
      const url = `https://dattebayo-api.onrender.com/characters?page=${this.currentPage}&limit=${limit}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data); // Verificar la estructura de los datos en consola
          // Acumula los personajes obtenidos
          this.characters = [...this.characters, ...Object.values(data.characters || [])];
          this.totalPages = data.totalPages || 1;

          // Si hay más páginas, cargar la siguiente
          if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.loadCharacters(); // Llamada recursiva para la siguiente página
          }
        })
        .catch(error => {
          console.error('Error en la obtención de datos:', error);
          this.errorMessage = `No se pudo cargar la información: ${error.message}`;
        });
    },
    
    // Método para convertir el array natureType en texto
    formatNatureType(natureType) {
      if (!natureType || !natureType.length) return 'No disponible';
      return natureType.join(', '); // Convertimos el array a una cadena de texto separada por comas
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
    <section class="container my-5">
      <h2 class="text-center mb-4">Personajes de Naruto</h2>
      <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
      <div class="row">
        <div v-for="character in characters" :key="character.id" class="col-md-4 mb-4">
          <div class="card h-100">
            <img 
              v-if="character.images && character.images.length" 
              :src="character.images[0]" 
              class="card-img-top" 
              :alt="character.name"
            >
            <div v-else>
              <img src="/naruto/assets/b8fd821c02183a8d19765c9362bf2465.jpg" class="card-img-top" alt="Imagen predeterminada">
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ character.name }} (ID: {{ character.id }})</h5> <!-- Mostrar el ID aquí -->
              <p class="card-text"><strong>Nature Type:</strong> {{ formatNatureType(character.natureType) }}</p>
              <p class="card-text"><strong>Rango:</strong> {{ formatRank(character.rank) }}</p>
              <p class="card-text"><strong>Jutsus:</strong> <br> {{ formatJutsu(character.jutsu) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
});


// Footer Component
Vue.component('footer-component', {
  template: `
    <footer class="bg-dark text-white text-center py-3">
      <p>&copy; 2024 NarutoDB. Todos los derechos reservados.</p>
    </footer>
  `
});
// Inicializar la app Vue
new Vue({
    el: '#app'
});
