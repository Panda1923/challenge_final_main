// Header Component
Vue.component('header-component', {
    template: `
      <header class="bg-dark text-white text-center py-5">
        <h1>NarutoDB</h1>
        <p>Explora los clanes del mundo ninja de Naruto</p>
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
                <a class="nav-link" href="#">Clanes</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
        const url = `https://dattebayo-api.onrender.com/clans/`;
        const pageSize = 20;
  
        const fetchPage = (page) => {
          fetch(`${url}?page=${page}&limit=${pageSize}`)
            .then(response => response.json()) // Convertir respuesta a JSON
            .then(data => {
              console.log(JSON.stringify(data, null, 2)); // Mostrar el JSON formateado
              if (data.clans) {
                this.clans = [...this.clans, ...data.clans]; // Añadir los clanes obtenidos
                this.totalPages = Math.ceil(data.total / pageSize); // Calcular el total de páginas
                if (page < this.totalPages) {
                  // Si no hemos llegado al final, cargar la siguiente página
                  fetchPage(page + 1);
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
  
        // Comenzar a cargar desde la página actual
        fetchPage(this.currentPage);
      }
    },
    template: `
      <section class="container my-5">
        <h2 class="text-center mb-4">Clanes de Naruto</h2>
        <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
        <div class="row">
          <div v-for="clan in clans" :key="clan.id" class="col-md-4 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">{{ clan.name }}</h5>
                <p class="card-text"><strong>Descripción:</strong> {{ clan.description || 'No disponible' }}</p>
                <p class="card-text"><strong>Aldea:</strong> {{ clan.village || 'No disponible' }}</p>
                <p class="card-text"><strong>Personajes:</strong>
                  <ul v-if="clan.characters && clan.characters.length > 0">
                    <li v-for="character in clan.characters">{{ character.name }}</li>
                  </ul>
                  <span v-else>No hay personajes asociados.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  });
  
  // Inicializar la app Vue
  new Vue({
    el: '#app'
  });
  