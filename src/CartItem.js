import React from "react";
import './index.css';

class CartItem extends React.Component {
    constructor () {
        super();
        this.state = {
            price: 999,
            title: 'Mobile Phone',
            qty: 1,
            img: ''
        }
        // this.increaseQuantity = this.increaseQuantity.bind(this);
        // this.testing();
    }

    // testing () {
    //     const promise = new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve('done');
    //         }, 5000);
    //     })

    //     promise.then(() => {
    //         // setState acts like a synchronous call
    //         this.setState({ qty: 100 });
    //         console.log('state', this.state);
    //     });
    // }

    increaseQuantity = () => {
        // this.state.qty += 1;
        // setState form 1
        // this.setState({
        //     qty: this.state.qty + 1
        // })

        // setState form 2 - if prevState is required
        this.setState((prevState) => {
            return {
                qty: this.state.qty + 1
            }
        }, () => {
            console.log('this.state', this.state);
        });
    }

    decreaseQuantity = () => {
        const { qty } = this.state;
        if (qty === 0) {
            return;
        }
        this.setState((prevState) => {
            return {
                qty: this.state.qty - 1
            }
        });
    }

    render() {
        const { price, title, qty } = this.state;
        return (
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image}/>
                </div>
                <div className="right-block">
                    <div style={ {fontSize: 25} }>{title}</div>
                    <div style={ {color: '#777'} }>Rs {price}</div>
                    <div style={ {color: '#777'} }>Qty: {qty}</div>
                    <div className="cart-item-actions">
                        {/* Buttons */}
                        <img alt="increase" className="action-icons" src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
                        onClick={this.increaseQuantity.bind(this)} />
                        <img alt="decrease" className="action-icons" src="https://cdn-icons-png.flaticon.com/512/992/992683.png" 
                        onClick={this.decreaseQuantity.bind(this)}/>
                        <img alt="delete" className="action-icons" src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" />
                    </div>
                </div>
            </div>
        );
    }
}

// creating object to hold style properties
const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'

    }
}

export default CartItem;