// use event bus to transport data throughout the app
var eventBus = new Vue();

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  // import product-review component to this product template
  // add reviews section
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

      <product-tabs :reviews="reviews"></product-tabs>

    </div>
    `,
  data() {
    return {
      product: "socks",
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
      // add reviews array to push product reviews
      reviews: [],
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
  },
  // use lifecycle hook to run code as soon as component is mounted to the DOM
  mounted() {
    eventBus.$on("review-submitted", productReview => {
      this.reviews.push(productReview);
    });
  }
});

Vue.component("product-review", {
  // use v-model to 2 way bind input to data
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    

    </form>
  `,
  data() {
    return {
      // use v-model to bind these data below to the input in the template
      name: null,
      review: null,
      rating: null,
      // form validation
      // catch errors from onSubmit method
      errors: []
    };
  },
  methods: {
    onSubmit() {
      // if any, clear all form errors on submit
      if (this.errors.length) {
        this.errors = [];
      }
      // form validation: check if fields exists before submitting
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        };
        // send data up to product component
        // use eventBus to emit to global scope to be used throught the app
        eventBus.$emit("review-submitted", productReview);
        // set to null to reset whenever the form is submitted
        this.name = null;
        this.review = null;
        this.rating = null;
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
      }
    }
  }
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  // @click="selectedTab = tab" will bind active tab as the primary tab
  // :class="{ activeTab: selectedTab === tab}" if selected tab is true, it will bind active to the selected tab
  template: `
    <div>
      <span class="tab"
        :class="{ activeTab: selectedTab === tab}"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectedTab = tab"
      >
      {{ tab }}
      </span>

      <div v-show="selectedTab === 'Reviews'">
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>{{ review.rating }}</p>
            <p>{{ review.review }}</p>
          </li>
        </ul>
      </div>
  
    <product-review v-show="selectedTab === 'Make a Review'"></product-review>

    </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      // initialize first tab as Reviews
      selectedTab: "Reviews"
    };
  }
});

var app = new Vue({
  el: "#app",
  // create data to pass into component as a prop
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
