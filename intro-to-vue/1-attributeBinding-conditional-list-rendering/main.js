// creates a new Vue instance
var app = new Vue({
  // plug into id=app
  el: "#app",
  data: {
    product: "socks",
    // refactor to use a computed property
    // image: "./vmSocks-green-onWhite.jpg",
    selectedVariant: 0,
    inStock: false,
    inventory: 10,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "../images/vmSocks-green-onWhite.jpg"
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "../images/vmSocks-blue-onWhite.jpg"
      }
    ],
    cart: 0,
    github: "https://github.com/vpvnguyen/vuetify-reference"
  },
  methods: {
    addToCart: function() {
      this.cart += 1;
    },
    removeFromCart: function() {
      this.cart -= 1;
    },
    // ES6 shorthand
    // updateProduct(variantImage) {
    //   this.image = variantImage;
    // }
    // refactor to use computed property
    updateProduct(index) {
      this.selectedVariant = index;
      console.log(index);
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      // array of variants and use selected variant index (0 or 1) to target the image
      return this.variants[this.selectedVariant].variantImage;
    }
  }
});
