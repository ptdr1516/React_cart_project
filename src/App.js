import React from 'react';
import './App.css';
import Cart from './Cart';
import Navbar from './Navbar';
// import * as firebase from 'firebase';
import { firestore } from './firebase';


class App extends React.Component {
  constructor () {
    super();
    this.state = {
        products: [],
        loading: true
    }
    this.db = firestore
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    // this.testing();
}

componentDidMount () {
    
     firestore
     .collection('products')
     .onSnapshot((snapshot) => {
        console.log(snapshot);

        snapshot.docs.map((doc) => {
            console.log(doc.data());
        });

        const products = snapshot.docs.map((doc) => {
            const data = doc.data();
            data['id'] = doc.id;
            return data;
        })

        this.setState({
            products,
            loading: false
        })
     })
}

// Adding product quantity to cart
handleIncreaseQuantity = (product) => {
    console.log('Hey please inc the quantity of',product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;
    
    // this.setState({ 
    //     products 
    // });

    // reference of particular product
    const docRef = this.db.collection('products').doc(products[index].id);
    
    docRef
       .update({
            qty: products[index].qty + 1
       })
       .then(() => {
        console.log('Updated Successfully')
       })
       .catch((error) => {
        console.log('Error: ',error);
       })
}

// Removing product quantity from cart
handleDecreaseQuantity = (product) => {
    console.log('Hey please dec the quantity of',product);
    const { products } = this.state;
    const index = products.indexOf(product);
    
    if (products[index].qty === 0) {
        return;
    }

    // reference of particular product
    const docRef = this.db.collection('products').doc(products[index].id);
    
    docRef
       .update({
            qty: products[index].qty - 1
       })
       .then(() => {
        console.log('Updated Successfully')
       })
       .catch((error) => {
        console.log('Error: ',error);
       })

    // products[index].qty -= 1;

    
    // this.setState({ 
    //     products 
    // });

}

// Delete product from the cart
handleDeleteProduct = (id) => {
    const { products } = this.state;
    // Filter products by id.
    // Checks if the item has the same id as the item which has to be deleted.
    const items = products.filter((item) => item.id !== id);

    this.setState({ 
        products: items
    });
}

// Handling product count
getCartCount = () => {
  const { products } = this.state;

  let count = 0;

  products.forEach((product) => {
    count += product.qty;
  })
  return count;
}

// Total price of the products purchased
getCartTotal = () => {
  const { products } = this.state;

  let cartTotal = 0;

  products.map((product) => {
    cartTotal = cartTotal + product.qty * product.price
  })

  return cartTotal;
}

addProduct = () => {
    firestore
     .collection('products')
     .add({
        img: 'https://media.wired.com/photos/601dde27f1bf194f33695d95/3:4/w_1347,h_1796,c_limit/Gear-PS5-2-src-Sony-teal.jpg',
        price: 900,
        qty: 2,
        title: 'ps5'
     })
     .then((docRef) => {
        console.log('Product has been added',docRef)
     })
     .catch((error) => {
        console.log('Error: ', error);
     })
     
}

render () {
  const { products, loading } = this.state;
  return (
      <div className="App">
          <Navbar count={this.getCartCount()} />
          {/* <button onClick={this.addProduct} style={{padding: 20, fontSize: 20}}>Add a product</button> */}
          <Cart 
          products={ products }
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
          />
          {loading && <h1>Loading Products...</h1> }
          <div style={{fontSize: 20, padding: 10}}>TOTAL: {this.getCartTotal()}</div>
      </div>
      );
    }
}

export default App;
