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

// Componente Main
Vue.component('main-component', {
  template: `
    <main class="flex-grow-1">
      <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4" aria-label="Slide 5"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="1000">
            <img src="../assets/pngwing.com (7).png" class="d-block w-100" alt="...">
            <div class="carousel-caption d-md-block"></div>
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img src="../assets/ojos transparentes2.png" class="d-block w-100" alt="...">
            <div class="carousel-caption d-md-block"></div>
          </div>
          <div class="carousel-item">
            <img src="../assets/pngwing.com (6) (1).png" class="d-block w-100" alt="...">
            <div class="carousel-caption d-md-block"></div>
          </div>
          <div class="carousel-item">
            <img src="../assets/pngegg (7).png" class="d-block w-100" alt="...">
            <div class="carousel-caption d-md-block"></div>
          </div>
          <div class="carousel-item">
            <img src="../assets/na.png" class="d-block w-100" alt="...">
            <div class="carousel-caption d-md-block"></div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

             <div class="container mt-4" id="characters">
            <h2 class="section-title">Personajes</h2>
            <div class="character-list">
                <div class="character-item">
                    <img src="../assets/pngegg (4).png" alt="Naruto Uzumaki">
                    <h2>Naruto Uzumaki</h2>
                    <p>El protagonista principal de la serie.</p>
                </div>
                <div class="character-item">
                    <img src="../assets/pngegg (5).png" alt="Sakura Haruno">
                    <h2>Sakura Haruno</h2>
                    <p>Compañera de equipo de Naruto y Sasuke, experta en ninjutsu médico.</p>
                </div>
                <div class="character-item">
                    <img src="../assets/pngwing.com (8).png" alt="Sasuke Uchiha">
                    <h2>Sasuke Uchiha</h2>
                    <p>Uno de los mejores amigos y rivales de Naruto.</p>
                </div>
            </div>
        </div>
      </div>
</main>
  `
});

// Componente CharactersSection
Vue.component('characters-section', {
  data() {
    return {
      characters: [], // Almacenará todos los personajes
      characterIds: new Set(), // Almacena los IDs de personajes para evitar duplicados
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
          const newCharacters = data.characters || [];
          
          // Filtrar personajes duplicados
          const filteredCharacters = newCharacters.filter(character => {
            if (this.characterIds.has(character.id)) {
              return false; // Ya se ha cargado este personaje
            }
            this.characterIds.add(character.id);
            return true;
          });

          // Acumula los personajes obtenidos
          this.characters = [...this.characters, ...filteredCharacters];
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
 <section class="character-section ">
  <h2 class="text-center mb-4">Personajes de Naruto</h2>
  <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
  <div class="tarjetas">
    <div class="row">
      <!-- Iterar sobre cada personaje -->
      <div v-for="character in characters" :key="character.id" class="col-md-3 mb-4">
        <div class="flip-card">
          <div class="flip-card-inner">
            <!-- Lado frontal de la tarjeta -->
            <div class="flip-card-front">
              <img 
                v-if="character.images && character.images.length" 
                :src="character.images[0]" 
                class="card-img-top" 
                :alt="character.name"
              >
              <div v-else>
                <img src="/naruto/assets/4fba09dde681e2db50ea2d2d57bbee90.jpg" class="card-img-top" alt="Imagen predeterminada">
              </div>
            </div>
            <!-- Lado posterior de la tarjeta -->
            <div class="flip-card-back">
              <div class="card-body p-5">
                <h5 class="card-title">{{ character.name }}</h5>
                <p class="card-text"><strong>Nature Type:</strong> {{ formatNatureType(character.natureType) }}</p>
                <p class="card-text"><strong>Rango:</strong> {{ formatRank(character.rank) }}</p>
              </div>
              <div class="d-flex justify-content-around align-items-center mt-2">
                <button class="btn btn-info">Details</button>
                <button class="btn btn-primary">Buy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>
  `
});

// Componente de Clanes
Vue.component('clans-section', {
  data() {
    return {
      clans: [], // Almacena todos los clanes
      errorMessage: null, // Para manejar errores
      currentPage: 1, // Página actual
      totalPages: 0 // Total de páginas a cargar
    };
  },
  mounted() {
    this.loadClans(); // Cargar los clanes cuando el componente se monte
  },
  methods: {
    // Método para cargar los clanes
    loadClans() {
      const url = `https://narutodb.xyz/api/clan?page=1&limit=50`;
      const pageSize = 50;

      const fetchPage = (page) => {
        fetch(`${url}?page=${page}&limit=${pageSize}`)
          .then(response => response.json()) // Convertir respuesta a JSON
          .then(data => {
            console.log(data); // Mostrar el JSON para verificar la estructura

            if (data && data.clans) {
              const sortedClans = data.clans.sort((a, b) => a.name.localeCompare(b.name)); 
              this.clans = [...this.clans, ...sortedClans]; 

              this.totalPages = Math.ceil(data.total / pageSize);

              if (page < this.totalPages) {
                this.currentPage++;
                fetchPage(this.currentPage);
              }
            } else {
              console.error('Formato inesperado de datos:', data);
            }
          })
          .catch(error => {
            console.error('Error en la obtención de datos:', error);
            this.errorMessage = `No se pudo cargar la información: ${error.message}`;
          });
      };

      fetchPage(this.currentPage);
    }
  },
  template: `
    <section class="character-section">
      <h2 class="text-center mb-4">Clanes de Naruto</h2>
      <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
      <div class="tarjetas">
        <div class="row">
          <div v-for="clan in clans" :key="clan.id" class="col-md-4 mb-4">
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img 
                    v-if="clan.image" 
                    :src="/naruto/assets/clan-naruto_3htx.jpg" 
                    class="card-img-top" 
                    :alt="clan.name"
                  >
                  <div v-else>
                    <img src="/naruto/assets/clan-naruto_3htx.jpg" class="card-img-top" alt="Imagen predeterminada">
                  </div>
                </div>
                <div class="flip-card-back">
                  <div class="card-body p-5">
                    <h5 class="card-title">{{ clan.name }}</h5>
                    <p class="card-text"><strong>Descripción:</strong> {{ clan.description || 'No disponible' }}</p>
                    <p class="card-text"><strong>Aldea:</strong> {{ clan.village || 'No disponible' }}</p>
                    <p class="card-text"><strong>Personajes:</strong> 
                      <span v-if="clan.characters && clan.characters.length > 0">
                        {{ clan.characters.map(character => character.name).join(', ') }}
                      </span>
                      <span v-else>No hay personajes asociados.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
//
Vue.component('characters-section', {
  props: ['show'],  // Añadir prop para controlar la visibilidad
  data() {
    return {
      characters: [],
      errorMessage: null,
    };
  },
  watch: {
    show(newVal) { // Reactividad cuando cambie el valor de 'show'
      if (newVal) {
        this.loadCharacters();
      }
    }
  },
  methods: {
    loadCharacters() {
      const url = `https://dattebayo-api.onrender.com/characters?page=1&limit=200`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.characters = data.characters || [];
        })
        .catch(error => {
          this.errorMessage = `No se pudo cargar la información: ${error.message}`;
        });
    }
  },
  template: `
    <section v-if="show" class="character-section">
      <h2 class="text-center mb-4">Personajes de Naruto</h2>
      <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
      <div class="tarjetas">
        <div class="row">
          <div v-for="character in characters" :key="character.id" class="col-md-3 mb-4">
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img :src="character.images[0]" class="card-img-top" :alt="character.name">
                </div>
                <div class="flip-card-back">
                  <h5 class="card-title">{{ character.name }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
});
;

// Componente ClansSection
Vue.component('clans-section', {
  props: ['show'],  // Añadir prop para controlar la visibilidad
  data() {
    return {
      clans: [],
      errorMessage: null,
    };
  },
  watch: {
    show(newVal) { // Reactividad cuando cambie el valor de 'show'
      if (newVal) {
        this.loadClans();
      }
    }
  },
  methods: {
    loadClans() {
      const url = `https://narutodb.xyz/api/clan?page=1&limit=50`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.clans = data.clans || [];
        })
        .catch(error => {
          this.errorMessage = `No se pudo cargar la información: ${error.message}`;
        });
    }
  },
  template: `
    <section v-if="show" class="clans-section">
      <h2 class="text-center mb-4">Clanes de Naruto</h2>
      <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
      <div class="tarjetas">
        <div class="row">
          <div v-for="clan in clans" :key="clan.id" class="col-md-4 mb-4">
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img :src="clan.image" class="card-img-top" :alt="clan.name">
                </div>
                <div class="flip-card-back">
                  <h5 class="card-title">{{ clan.name }}</h5>
                  <p class="card-text">{{ clan.description || 'No disponible' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
});


// Inicializar Vue
new Vue({
  el: '#app',
  data: {
    showCharacters: false, // Controla la visibilidad de los personajes
    showClans: false, // Controla la visibilidad de los clanes
  },
  mounted() {
    this.efectoSonidoNavbar(); // Ejecutar el método cuando el componente esté montado
  },
  methods: {
    // Método para alternar la visibilidad de personajes
    toggleCharacters() {
      this.showCharacters = !this.showCharacters;
    },
    // Método para alternar la visibilidad de clanes
    toggleClans() {
      this.showClans = !this.showClans;
    },
    // Método para agregar el efecto de sonido al pasar por el navbar
    efectoSonidoNavbar() {
      const hoverSound = document.getElementById('hoverSound');
      const navbar = document.getElementById('navbar');

      if (hoverSound && navbar) {
        navbar.addEventListener('mouseenter', () => {
          hoverSound.play().catch(error => {
            console.error('Error al reproducir el sonido:', error);
          });
        });
      } else {
        console.error('Elemento hoverSound o navbar no encontrado.');
      }
    }
  }
});

