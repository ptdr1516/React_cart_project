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
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    // this.testing();
}

componentDidMount () {
    
     firestore
     .collection('products')
     .get()
     .then((snapshot) => {
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

    products[index].qty += 1;
    
    this.setState({ 
        products 
    });

}

// Removing product quantity from cart
handleDecreaseQuantity = (product) => {
    console.log('Hey please dec the quantity of',product);
    const { products } = this.state;
    const index = products.indexOf(product);
    
    if (products[index].qty === 0) {
        return;
    }

    products[index].qty -= 1;

    
    this.setState({ 
        products 
    });

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

render () {
  const { products, loading } = this.state;
  return (
      <div className="App">
          <Navbar count={this.getCartCount()} />
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
