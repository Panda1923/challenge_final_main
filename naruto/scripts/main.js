// Componente Header
Vue.component('header-component', {
  template: `
    <header>
      <div class="nav-container">
        <div class="menu-icon" id="menuIcon">
        <img class="logo" src="../assets/menu.png" alt="Menu Icon">
        </div>
        <nav class="navbar navbar-expand-md navbar-light" id="navbar">
         <a class="navbar-brand d-md-none" href="./index.html">Home</a>
<a class="navbar-brand d-md-none" href="./stats.html">stats</a>
 <a class="navbar-brand d-md-none" href="./store.html">store</a>
        
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <nav id="navbar-nav" class="justify-content-center">
              <a href="/naruto/pages/Home.html" class="nav-link">
                <img class="logo" src="../assets/HOME.png" alt="Home">
                
              </a>
              <a href="../pages/stats.html" class="nav-link">
                <img class="logo2" src="../assets/STATS.png" alt="Clanes y Técnicas">
              </a>
              <a href="../pages/store.html" class="nav-link">
                <img class="logo" src="../assets/STORE.png" alt="Store">
                  <a href="/naruto/pages/clans.html" class="nav-link">
                <img class="logo" src="clan" alt="">
              </a>
            </nav>
          </div>
        </nav>
      </div>
    </header>
  `
});



// Componente CharactersSection
Vue.component('characters-section', {
  data() {
    return {
      characters: [], // Almacena todos los personajes
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
  computed: {
    // Filtrar personajes basados en la búsqueda
    filteredCharacters() {
      if (this.searchQuery.trim() === '') {
        return this.characters; // Si no hay búsqueda, mostrar todos los personajes
      }
      return this.characters.filter(character => 
        character.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
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

    goToDetails(characterId) {
      window.location.href = `../pages/details.html?id=${characterId}`;
    },

    // Método para obtener la URL de la imagen
    getImageSrc(character) {
      if (this.idsSinImagen.has(character.id)) {
        return this.imagenPredeterminada;
      } else if (character.images && character.images.length) {
        return character.images[0];
      } else {
        return this.imagenPredeterminada; // En caso de que no haya imágenes y el ID no esté en idsSinImagen
      }
    }
  },
  
  template: `
<section class="character-section">
  <h2 class="text-center mb-4">
    <img src="../assets/todos los personajes.png" alt="Todos los personajes">
  </h2>
  <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
  <div class="tarjetas">
    <div v-for="character in characters" :key="character.id" class="card-container col-md-3 mb-4">
      <div class="flip-card">
        <div class="flip-card-inner">
          <!-- Lado frontal de la tarjeta -->
          <div class="flip-card-front">
            <img 
              v-if="character.images && character.images.length" 
              :src="character.images[0]" 
              class="card-img-top" 
              :alt="character.name">
            <img 
              v-else 
              src="/naruto/assets/4fba09dde681e2db50ea2d2d57bbee90.jpg" 
              class="card-img-top" 
              alt="Imagen predeterminada">
          </div>
          <!-- Lado posterior de la tarjeta -->
          <div class="flip-card-back">
            <div class="card-body p-4">
              <h5 class="card-title">{{ character.name }}</h5>
              <p class="card-text"><strong>Nature Type:</strong> {{ formatNatureType(character.natureType) }}</p>
              <p class="card-text"><strong>Rango:</strong> {{ formatRank(character.rank) }}</p>
            </div>
            <div class="d-flex justify-content-around align-items-center mt-3">
              <button class="btn btn-info"  @click="goToDetails(character.id)">Details</button>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

`
});


Vue.component('clans-section', {
  data() {
    return {
      clans: [], // Almacena todos los clanes
      errorMessage: null, // Para manejar errores
      currentPage: 1, // Página actual
      totalPages: 0, // Total de páginas a cargar
      searchQuery: '', // Texto de búsqueda
    };
  },
  mounted() {
    this.loadClans(); // Cargar los clanes cuando el componente se monte
  },
  computed: {
    // Filtrar clanes basados en la búsqueda
    filteredClans() {
      if (this.searchQuery.trim() === '') {
        return this.clans; // Muestra todos los clanes si no hay búsqueda
      }
      return this.clans.filter(clan => 
        clan.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    // Método para cargar los clanes
    loadClans() {
      const url = "https://narutodb.xyz/api/clan";
      const pageSize = 50;

      const fetchPage = (page) => {
        fetch(`${url}?page=${page}&limit=${pageSize}`)
          .then(response => response.json()) // Convertir respuesta a JSON
          .then(data => {
            console.log(data); // Mostrar el JSON para verificar la estructura

            if (data && Array.isArray(data.clans)) {
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
  <h2 class="text-center mb-4">
   <img src="../assets/clanes.png" alt="">
  </h2>
  <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
  <div class="tarjetas">
    <div v-for="clan in clans" :key="clan.id" class="card-container col-md-4 mb-4">
      <div class="flip-card">
        <div class="flip-card-inner">
          <!-- Lado frontal de la tarjeta -->
          <div class="flip-card-front">
            <img 
              v-if="clan.image" 
              :src="clan.image" 
              class="card-img-top" 
              :alt="clan.name">
            <img 
              v-else 
              src="../assets/clan-naruto_3htx.jpg" 
              class="card-img-top" 
              alt="Imagen predeterminada">
          </div>
          <!-- Lado posterior de la tarjeta -->
          <div class="flip-card-back">
            <div class="card-body p-4">
              <h5 class="card-title text-center text-uppercase">{{ clan.name }}</h5>
              <p class="card-text"><strong>Personajes:</strong> 
                <span v-if="clan.characters && clan.characters.length > 0">
                  {{ clan.characters.map(character => character.name).join(', ') }}
                </span>
                <span v-else>No hay personajes asociados.</span>
              </p>
            </div>
            <div class="d-flex justify-content-around align-items-center mt-3">
                <a :href="'./detailsclan.html?name=' + clan.name" class="btn btn-info">Details</a>
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
          <p class="footer-description">&copy; 2024 Naruto Fan Page. All rights reserved.</p>
          
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

// Inicializar Vue
new Vue({
  el: '#app',
  data: {
    showCharacters: true,  // Mostrar personajes por defecto
    showClans: false,
  },
  mounted() {
    this.efectoSonidoNavbar(); // Ejecutar el método cuando el componente esté montado
  },
  methods: {
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

