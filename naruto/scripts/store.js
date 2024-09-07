//COMPONENTE 
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