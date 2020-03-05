const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog: 'https://placehold.it/200x150',
    filtered: [],
    show: false,
    value: '',
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product){
      console.log(product.id_product);
    },
    btnValue() {
          if(this.show){
              return 'Закрыть'
          }
          return 'Корзина'
      }
  },
//    filter(value){
//        const regexp = new RegExp(value, 'i');
//        this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
//        this.allProducts.forEach(el => {
//            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//            if(!this.filtered.includes(el)){
//            block.classList.add('invisible');
//            } else {
//            block.classList.remove('invisible');
//            }
//        })
//  }
  // хук жизненного цикла
  mounted(){
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for(let el of data){
          this.products.push(el);
        }
      });
  }
});
