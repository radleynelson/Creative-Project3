new Vue({
    el: '#app',
    data: {
        isShowingCart: false,
        cart:{
          items: [],
        },
        products: [
            {
                id: 1,
                name: 'MacBook Pro (15 inch)',
                description: 'This laptop has a super crisp Retina display. Yes, we know that it\'s overpriced...',
                price: 2999,
                inStock: 50,
                photo: 'http://oction.co/wp-content/uploads/2017/07/Macbook-Pro-13-Inch-Touchbar-Space-Gray.jpg'
            },
            {
                id: 2,
                name: 'Samsung Galaxy Note 7',
                description: 'Unlike the overpriced MacBook Pro, we\'re selling this one a bit cheap, as we heard it might explode...',
                price: 299,
                inStock: 755,
                photo: 'https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/csm_frontal_mit_Packung_14b41f511141.jpg'
            },
            {
                id: 3,
                name: 'HP Officejet 5740 e-All-in-One-printer',
                description: 'This one might not last for so long, but hey, printers never work anyways, right?',
                price: 149,
                inStock: 5,
                photo: 'https://i.ytimg.com/vi/ho5cL5R5Ie0/maxresdefault.jpg'
            },
            {
                id: 4,
                name: 'iPhone 7 cover',
                description: 'Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?',
                price: 49,
                inStock: 42,
                photo: 'https://i5.walmartimages.com/asr/7bc81058-b10f-4188-aeea-a340c4497d46_1.f97d2b9e9d307d0f4272d39846ad4ad2.jpeg'
            },
            {
                id: 5,
                name: 'XBOX ONE X',
                description: 'Play your favorite games, watch your favorite shows all in 4K HDR',
                price: 599,
                inStock: 0,
                photo: 'https://ssl-images.newegg.com/NeweggFlash/ProductImage1280/9SIA24G6MF9075-001.jpg'
            },
            {
                id: 6,
                name: 'OnePlus 3 cover',
                description: 'Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!',
                price: 19,
                inStock: 81,
                photo: 'https://image.dhgate.com/0x0/f2/albu/g5/M00/79/EF/rBVaJFg_jvSAU2KeAAJTFOcWrd0269.jpg'
            }
        ]
    },
    methods:{
        addProductToCart: function (product) {
            var cartItem = this.getCartItem(product);

            if (cartItem != null){
                cartItem.quantity++;
            }
            else{
                this.cart.items.push({
                    product: product,
                    quantity: 1
                });

            }
            product.inStock--;
        },
        getCartItem: function (product) {
            for (var iCount = 0; iCount < this.cart.items.length; iCount++){
                if (this.cart.items[iCount].product.id === product.id){
                    return this.cart.items[iCount];
                }
            }
            return null;
        },
        increaseCartQuantity: function (cartItem) {
            cartItem.product.inStock --;
            cartItem.quantity++;
        },
        decreaseQuantity: function (cartItem) {
          cartItem.quantity --;
          cartItem.product.inStock++;

          if (cartItem.quantity == 0){
              this.removeFromCart(cartItem);
          }
        },
        removeFromCart: function(cartItem){
            var index = this.cart.items.indexOf(cartItem);

            if(index !== -1){
                this.cart.items.splice(index, 1);
            }
        },
        checkout: function () {
          if (confirm('Are you sure you want to purchase these products?')){
              alert('Thank you for your purchase! The items are on the way')
              this.cart.items = [];
          }
        },

    },
    computed: {
        cartTotal: function(){
            var total = 0;

            this.cart.items.forEach(function(item){
               total += item.quantity * item.product.price;
            });

            return total;
        },
        taxAmount: function () {
            return ((this.cartTotal * 10) / 100);
        }
    },
    filters: {
      currency:  function (value) {
          var formatter = Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0
          });

          return formatter.format(value);
      }
    },
});
