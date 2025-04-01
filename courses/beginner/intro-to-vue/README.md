## Attribute Binding

- `v-bind` dynamically binds and attribute to an expression
  > `v-bind:src="expression"`

```html
<img v-bind:src="image" />
```

- Shorthand:

```html
<img :src="image" />
<img :alt="desc" />
<a :href="url">Url</a>
<div :title="toolTip">Title</div>
<button :class="isActive">Active</button>
<button :disabled="isDisabled">Disabled</button>
<p :style="isStyled">Styling</p>
```

## Conditional Rendering

- Html:

```html
<p v-if="inventory > 10">More than 10 in stock!</p>
<p v-else-if="inventory <= 10 && inventory > 0">
  10 or less in stock!
</p>
<p v-else>Inventory is at 0!</p>
```

- JS:

```javascript
var app = new Vue({
  el: "#app",
  data: {
    inventory: 10
  }
});
```

## List Rendering

- Html:

```html
<ul>
  <li v-for="detail in details">{{ detail }}</li>
</ul>

<div v-for="variant in variants" key="variant.variantId">
  <p @mouseover="updateProduct(variant.variantImage)">
    {{ variant.variantColor }}
  </p>
</div>
```

- JS:

```javascript
var app = new Vue({
  el: "#app",
  data: {
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "./vmSocks-green-onWhite.jpg"
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./vmSocks-blue-onWhite.jpg"
      }
    ]
  }
});
```

## Event Handling

- Html:

```html
<button v-on:click="addToCart">Add to Cart</button>
```

- JS:

```javascript
var app = new Vue({
  el: "#app",
  data: {...},
  methods: {
    addToCart: function() {
      this.cart += 1;
    },
    removeFromCart: function() {
      this.cart -= 1;
    },
    // ES6 shorthand
    updateProduct(variantImage) {
      this.image = variantImage;
    }
  }
});
```

- Shorthand:

```html
<button @click="removeFromCart">Remove from Cart</button>
<div @mouseover="updateProduct">Color</div>
<form @submit="addToCart">...</form>
<input @keyup.enter="send" />
```

## Class & Style Binding

- Html:

```html
<div
  v-for="variant in variants"
  key="variant.variantId"
  class="color-box"
  :style="{ backgroundColor: variant.variantColor }"
  @mouseover="updateProduct(variant.variantImage)"
></div>
```

- With JS:

```html
<button
  v-on:click="addToCart"
  :disabled="!inStock"
  :class="{ disabledButton: !inStock }"
>
  Add to Cart
</button>
```

```javascript
var app = new Vue({
  el: "#app",
  data: {
    inStock: false
  }
});
```

#### Class Binding

##### Binding Classes

- Html:

```html
<div
  class="color-box"
  :class="{ active activeClass, 'text-danger': errorClass }"
></div>
```

- JS:

```javascript
data: {
    activeClass: true,
    errorClass: false,
}
```

##### Binding Objects

- Html:

```html
<div class="classObject"></div>
```

- JS:

```javascript
data: {
    classObject: {
        active: true,
        'text-danger': false
    }
}
```

##### Binding Arrays

- Html:

```html
<div :class="[activeClass, errorClass]"></div>
```

- JS:

```javascript
data: {
    activeClass: 'active',
    errorClass: 'text-danger'
}
```

##### Binding Conditionals

- Html:

```html
<div :class="[isActive ? activeClass : '']"></div>
```

- JS:

```javascript
data: {
    isActive: true,
    activeClass: 'active'
}
```

## Computed Properties

- Cached results are saved until changed; more efficient to use than a method
- Html:

```html
<div
  v-for="(variant, index) in variants"
  :key="variant.variantId"
  class="color-box"
  :style="{backgroundColor: variant.variantColor}"
  @mouseover="updateProduct(index)"
></div>
```

- JS:

```javascript
data: {
  brand: 'Vue Mastery',
  product: 'socks'
},
computed: {
  title() {
    return this.brand + ' ' + this.product
  }
}
```

## Components

- Prop: custom attribute for passing data into our components
- Product is now a component which will have it's data, methods, and computed properties to be displayed within the app

- Html:

```html
<div id="app">
  <product :premium="premium"></product>
</div>
```

- JS:

```javascript
Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  // specifies structure of the component with html body
  template: `
  <div class="product">
  ...
  </div>
    `,
  // turn data into a function that will return an object
  data() {
    return {
      ...
});

var app = new Vue({
  el: "#app",
  //   create data to pass into component as a prop
  data: {
    premium: true
  }
});

```

## Communicating Events

- Comparing index.html from vue-components to vue-event-handling directory
- Move html from main.js to index.html

- Before:

```javascript
Vue.component("product", {
  props: { ... },
  template: `
 <div class="cart">
    <p>Cart({{ cart }})</p>
  </div>
  `,
  data() { ... }
```

- After:

```html
<div id="app">
  <div class="cart">
    <p>Cart({{ cart }})</p>
  </div>

  <product :premium="premium"></product>
</div>
```

- Move cart data from the Vue component to the Vue instance
- Refactor cart to take in an array so product ID can be pushed into the cart
- Since we do not want the id to show up in the cart, use the length of array to show how many items are in the cart

```javascript
Vue.component("product", {
  props: { ... }
  },
  template: ` ... `,
  data() {
    return {
      cart: 0,
    };
  },
}
```

```javascript
var app = new Vue({
  el: "#app",
  data: {
    cart: []
  }
});
```

- `addtoCart()` will no longer increment the cart total
- To fix this, refactor function to use `$emit` to pass data back up to the parent
- When Add to Cart button is pressed, it will emit the data to the parent

```javascript
Vue.component("product", {
  props: { ... }
  },
  template: ` ... `,
  data() { ... },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
    },
  }
});

var app = new Vue({
  el: "#app",
  data: {
    cart: []
  },
  methods: {
    addIdToCart(id) {
      this.cart.push(id);
    },
    removeIdfromCart(id) {
      const index = this.cart.indexOf(id);
      if (index > -1) return this.cart.splice(index, 1);
      return alert(`Item ID: ${id} is not in your cart!`);
    }
  }
});
```

```html
<product
  :premium="premium"
  @add-to-cart="updateCart"
  @remove-from-cart="removeIdfromCart"
></product>
```

## Forms

- Adding reviews in vue-forms
- Create a new component called `product-review`
- Instead of using `v-bind` (one way binding), use `v-model` (2 way binding)
- `v-bind` is only for one-way binding, from the data to the template
- `v-model` adds a dimension which allows 2 way binding from template to the data and vice versa
- We can use the `v-model` directive to create two-way binding on form elements
- We can use the `.number` modifier to tell Vue to cast that value as a number, but there is a bug with it
- We can use the `.prevent` event modifier to stop the page from reloading when the form is submitted
- We can use Vue to do fairly simple custom form validation

- According to the example below, input will be bound to name data:

```javascript
Vue.component("product-review", {
  template: `
  <input>
  `,
  data() {
    return {
      name: null
    };
  }
});
```

## Tabs

- `@click="selectedTab = tab"` will bind active tab as the primary tab
- `:class="{ activeTab: selectedTab === tab}"` if selected tab is true, it will bind active to the selected tab
- Use `var eventBus = new Vue()` to transfer data across components
- Create `products-tab` component within `product`
- Use `mounted()` lifecycle hook to retrieve data when component mounts

```javascript
mounted() {
    eventBus.$on("review-submitted", productReview => {
      this.reviews.push(productReview);
    });
  }
```

- JS:

```javascript
// use event bus to transport data throughout the app
var eventBus = new Vue();

Vue.component("product", {
  props: { ... },
  template: `
    <div class="product">

      ...

      <product-tabs :reviews="reviews"></product-tabs>

    </div>
    `,
  data() {
    return { ... },
  // use lifecycle hook to run code as soon as component is mounted to the DOM
  mounted() {
    eventBus.$on("review-submitted", productReview => {
      this.reviews.push(productReview);
    });
  }
});
```

- Within `product-review`, use `eventBus.$emit("review-submitted", productReview);` to transfer product review to the eventBus

```javascript
Vue.component("product-review", {
  template: ` ... `,
  data() {
    return { ... };
  },
  methods: {
    onSubmit() {
      ...
      eventBus.$emit("review-submitted", productReview);
      ...
    }
  }
});
```

- Define a prop type for reviews which is passed in from the `product` component
  > `<product-tabs :reviews="reviews"></product-tabs>`
- Create a selector for primary selected tab
- Define a `tabs` array for `['Reviews', 'Make a Review']`

```javascript
Vue.component("product-tabs", {
  // define reviews props
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
```
