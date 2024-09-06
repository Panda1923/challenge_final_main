
// 2daprueba
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
              <a href="#about" class="nav-link">
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
      <div id="carouselExampleDark" class="carousel carousel-dark slide">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4" aria-label="Slide 5"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="10000">
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

  

      <!-- Formulario de búsqueda con interruptores -->
      <div class="container-fluid">
        <form class="d-flex flex-column flex-md-row justify-content-center mb-4 align-items-center">
          <!-- Interruptor para "Personajes" -->
          <div class="form-check form-switch mx-2">
            <input class="form-check-input" type="checkbox" id="charactersSwitch">
            <label class="form-check-label" for="charactersSwitch">Personajes</label>
          </div>
          
          <!-- Campo de texto y botón de búsqueda -->
          <div class="input-group mb-3 mx-2">
            <input type="text" class="form-control" id="searchInput" placeholder="Buscar...">
            <button class="btn btn-primary" type="submit" id="searchButton">Buscar</button>
          </div>

          <!-- Interruptor para "Clanes" -->
          <div class="form-check form-switch mx-2">
            <input class="form-check-input" type="checkbox" id="clansSwitch">
            <label class="form-check-label" for="clansSwitch">Clanes</label>
          </div>

          
          
          <div id="message" class="mt-2"></div>
        </form>


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

      <characters-section></characters-section>

      
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
                <img src="/naruto/assets/b8fd821c02183a8d19765c9362bf2465.jpg" class="card-img-top" alt="Imagen predeterminada">
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
new Vue({
  el: '#app',
  data() {
    return {
      items: [
        { id: 1, title: "Minato Figure", price: 50, imgSrc: "../assets/D_NQ_NP_767868-MCO43594941779_092020-O.webp" },
        { id: 2, title: "Kakashi Figure", price: 50, imgSrc: "../assets/sg-11134201-7rdyb-lxuh5b8rnu4o1f_tn.webp" },
        { id: 3, title: "Itachi Figure", price: 50, imgSrc: "../assets/images (1).jpg" },
        { id: 4, title: "Sasuke Figure", price: 90, imgSrc: "../assets/descarga (1).jpg" },
        { id: 5, title: "Naruto Figure", price: 80, imgSrc: "../assets/descarga (2).jpg" },
        { id: 6, title: "Naruto Figure", price: 100, imgSrc: "../assets/descarga.jpg" },
        { id: 7, title: "Deidara Figure", price: 50, imgSrc: "../assets/figura-deidara-vibration-star-naruto-shippuden-13cm-p8804560i187800250.jpg" },
        { id: 8, title: "Manga Volume 1", price: 50, imgSrc: "../assets/Volumen_1_HD.webp" },
        { id: 9, title: "Manga Volume 2", price: 50, imgSrc: "../assets/Volumen_2_HD.webp" },
        { id: 10, title: "Manga Volume 3", price: 50, imgSrc: "../assets/Volumen_3_HD.webp" },
        { id: 11, title: "Manga Volume 4", price: 50, imgSrc: "../assets/Volumen_4_HD.webp" },
        { id: 12, title: "Manga Volume 5", price: 50, imgSrc: "../assets/Volumen_5_HD.webp" },
        { id: 13, title: "Itachi Keychain", price: 50, imgSrc: "../assets/images (2).jpg" },
        { id: 14, title: "Jiraiya Figure", price: 50, imgSrc: "../assets/LlaveroNarutoJiraiya-scaled.jpg" },
        { id: 15, title: "Sasuke Keychain", price: 50, imgSrc: "../assets/LlaveroNarutoSazuke.jpg" },
        { id: 16, title: "Kakashi Keychain", price: 50, imgSrc: "../assets/w=1500,h=1500,fit=pad.avif" },
        { id: 17, title: "Ninja Keychain", price: 50, imgSrc: "../assets/1645238470086.jpg" }
      ],
      cart: [],
      isCartVisible: false,
      showPurchaseForm: false,
      form: {
        name: '',
        address: '',
        phone: '',
        payment: 'credit-card'
      },
      submitted: false
    };
  },
  computed: {
    cartCount() {
      return this.cart.reduce((sum, product) => sum + product.quantity, 0);
    },
    total() {
      return this.cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    }
  },
  methods: {
    toggleCart() {
      this.isCartVisible = !this.isCartVisible;
    },
    addToCart(item) {
      const existingProduct = this.cart.find(product => product.title === item.title);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...item, quantity: 1, id: Date.now() });
      }
      this.saveCart();
    },
    increaseQuantity(product) {
      product.quantity++;
      this.saveCart();
    },
    decreaseQuantity(product) {
      if (product.quantity > 1) {
        product.quantity--;
      } else {
        this.removeProduct(product);
      }
      this.saveCart();
    },
    removeProduct(product) {
      this.cart = this.cart.filter(p => p.id !== product.id);
      this.saveCart();
    },
    showPurchaseForm() {
      this.showPurchaseForm = true;
    },
    submitForm() {
      this.submitted = true;
    
      this.clearCart();
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    loadCart() {
      const cart = localStorage.getItem('cart');
      if (cart) {
        this.cart = JSON.parse(cart);
      }
    },
    clearCart() {
      this.cart = [];
      localStorage.removeItem('cart');
    }
  },
  created() {
    this.loadCart();
  }
});
// Inicializar Vue
new Vue({
  el: '#app',
  mounted() {
    this.efectoSonidoNavbar();
  },
  methods: {
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

