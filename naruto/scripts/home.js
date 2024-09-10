new Vue({
    el: '#app',
    methods: {
        // Método para redirigir a una página 
        redirectToPage(page) {
            // Redirige a la página 
            window.location.href = window.location.origin + page;
        }
    }
});

