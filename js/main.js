const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//let getRequest = (url, cb) => {
//    return new Promise((resolve, reject) => {
//        let xhr = new XMLHttpRequest();
//        xhr.open('GET', url, true);
//        xhr.onreadystatechange = () => {
//            if (xhr.readyState === 4) {
//                if (xhr.status !== 200) {
//                    reject('Error');
//                } else {
//                    resolve(xhr.responseText);
//                }
//            }
//        };
//    }) 
//    xhr.send();
//};

//Вызываем ф-цию getRequest и передаем в неё аргументы (API, callBack Promise)
//getRequest(`${API}/catalogData.json`, 
//           .then(data) => {
//            let goods = JSON.parse(date); //полученный результат преобразуем в массив
//            console.log(goods);
//}).catch((error) => {
//    console.log(error);
//})

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn" id="add-cart">Купить</button>
                </div>
            </div>`
  }
    
  addToCart() {
      document.getElementById('add-cart').addEventListener('click', () => {
          alert('addedToCart');
      });
  }
}

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
//    this._fetchProducts();
    this._getProducts()
      .then(data => {
        this.goods = [...data];
        this.render();
    });
  }

//  _fetchProducts() {
//    getRequest(`${API}/catalogData.json`, (data) => {
//        this.goods = JSON.parse(data);
//        this.render();
//        console.log(this.goods);
//    });
//  }

_getProducts() {
    return fetch(`${API}/catalogData.json`)
    .then(result => result.json())
    .catch(error => {
        console.log('Error:', error);
    });
}
  render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
        console.log(productObject);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
//Метод для вычисления суммы товаров
  sumOfGoods() {
      return this.allProducts.reduce((accum, item) => accum += item.price, 0);
  }
}

new ProductList();

//Класс товара в корзине с наследованием от ProductItem
class CartItem extends ProductItem {
    constructor(product, img='https://placehold.it/200x150', count) {
        super(product, img='https://placehold.it/200x150');
        this.count = product.count;
    }
}

//Класс Корзина с наследованием от ProductList
class Cart extends ProductList {
    constructor(container = '.cart') {
        this.CartGoods = [];
        super.render;
        super.sumOfGoods;
    }
}