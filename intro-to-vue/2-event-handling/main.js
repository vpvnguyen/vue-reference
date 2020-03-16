// product = name of component
// options = {} 2nd argument which will be the behavior of the component
// create data called premium in the new Vue instance from below, pass premium as a prop
// into the product component and render if user is premium below inStock
Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  // specifies structure of the component
  template: `
  <div class="product">
  <div class="product-image">
    <!-- Attribute Binding -->
    <!-- v-bind dynamically binds and attribute to an expression -->
    <!-- v-bind:src="expression" -->
    <img v-bind:src="image" />
  </div>

  <div class="product-info">
    <!-- products from main.js plugs into this {{ expression }} -->
    <h1>{{ product }}</h1>

    <!-- Conditional Rendering -->
    <p v-if="inStock">In Stock</p>
    <p v-else>Out of Stock</p>
    <p>User is premium: {{ premium }}</p>

    <p v-if="inventory > 10">More than 10 in stock!</p>
    <p v-else-if="inventory <= 10 && inventory > 0">
      10 or less in stock!
    </p>
    <p v-else>Inventory is at 0!</p>

    <!-- List Rendering -->
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>

    <!-- Class & Style Binding -->
    <div
      v-for="(variant, index) in variants"
      :key="variant.variantId"
      class="color-box"
      :style="{backgroundColor: variant.variantColor}"
      @mouseover="updateProduct(index)"
    ></div>

    <!-- Event Handling -->
    <button
      v-on:click="addToCart"
      :disabled="!inStock"
      :class="{ disabledButton: !inStock}"
    >
      Add to Cart
    </button>
    <button @click="removeFromCart">Remove from Cart</button>
  </div>
</div>
    `,
  // turn data into a function that will return an object
  data() {
    return {
      product: "socks",
      // refactor to use a computed property
      // image: "./vmSocks-green-onWhite.jpg",
      selectedVariant: 0,
      inStock: true,
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
      github: "https://github.com/vpvnguyen/vuetify-reference"
    };
  },
  methods: {
    addToCart() {
      // when add to cart is pressed, emit data / id to parent component
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
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

var app = new Vue({
  el: "#app",
  //   create data to pass into component as a prop
  data: {
    premium: true,
    // make cart an array to push items into the cart
    cart: []
  },
  methods: {
    addIdToCart(id) {
      this.cart.push(id);
    },
    removeIdFromCart(id) {
      const index = this.cart.indexOf(id);
      if (index > -1) return this.cart.splice(index, 1);
      console.log(`${id} is not found in cart!`);
      return alert(`Item ID: ${id} is not in your cart!`);
    }
  }
});
