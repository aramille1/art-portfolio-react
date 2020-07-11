import React, { Component } from 'react'
import { ProductConsumer } from '../context'
import { Link } from 'react-router-dom'
import { ButtonContainer } from './Button'


export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const { id, title, img, company, info, price, inCart } = value.detailProduct;
                    return (
                        <div className="container py-5">
                            {/* title */}
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <h1>{title}</h1>
                                </div>
                            </div>

                            {/* product info */}
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3">
                                    <img src={img} alt="product" className="img-fluid" />
                                </div>
                                {/*product text*/}
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>piece: {title}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                        part of series : <span className="text-uppercase">{company}</span>
                                    </h4>
                                    <h4 className="text-blue">
                                        <strong>price: <span>$</span>{price}</strong>
                                    </h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                        some info about piece:
                                    </p>
                                    <p className="text-muted lead">{info}</p>
                                    {/*buttons*/}
                                    <div>
                                        <Link to="/">
                                            <ButtonContainer>back to art works</ButtonContainer>
                                        </Link>
                                        <ButtonContainer
                                            cart
                                            disabled={inCart ? true : false}
                                            onClick={() => {
                                                value.addToCart(id);
                                                value.openModal(id);
                                            }}>
                                            {inCart ? 'inCart' : 'add to cart'}
                                        </ButtonContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ProductConsumer>
        )
    }
}
