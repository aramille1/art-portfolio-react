import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext();


class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0,
    }
    componentDidMount() {
        this.setProduct();
    }
    setProduct = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            tempProducts = [...tempProducts, singleItem]
        })
        this.setState(() => {
            return { products: tempProducts }
        })
    }

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product }
        })
    }
    // adding product to the cart
    addToCart = (id) => {
        let tempProducts = [...this.state.products] //copy of products
        const index = tempProducts.indexOf(this.getItem(id))//find index of selected item in products
        const product = tempProducts[index]//find ITEM in products
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(() => {
            return {
                products: tempProducts,
                cart: [...this.state.cart, product]
            }
        }, () => {
            this.addTotals()
        })
    }

    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {
                modalOpen: true,
                modalProduct: product
            }
        })
    }
    closeModal = () => {
        this.setState(() => {
            return {
                modalOpen: false
            }
        })
    }

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedItem = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedItem)
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;


        this.setState(() => {
            return { cart: [...tempCart] }
        },
            () => { this.addTotals() })
    }
    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedItem = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedItem)
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id)
        } else {
            product.total = product.count * product.price;
            this.setState(() => {
                return { cart: [...tempCart] }
            },
                () => { this.addTotals() })
        }
    }
    removeItem = (id) => {
        let tempCart = [...this.state.cart]
        let tempProducts = [...this.state.products]

        tempCart = tempCart.filter(item => item.id !== id)//тут корзина с уже удаленым телефоном
        const index = tempProducts.indexOf(this.getItem(id))//индекс удаленного телефона из карзины
        let removedItem = tempProducts[index];//в списке телефонов находим удаленный телефон
        removedItem.inCart = false;
        removedItem.count = 0;
        removedItem.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts],
            }
        }, () => {
            this.addTotals();
        })
    }
    clearCart = () => {
        this.setState(() => {
            return { cart: [] }
        }, () => {
            this.setProduct();
            this.addTotals();
        })
    }
    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                addTotals: this.addTotals
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };