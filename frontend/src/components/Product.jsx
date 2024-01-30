import React from 'react';
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' className='image_hf'/>
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div" className='product-title'>
                        <strong>{product.title}</strong>
                    </Card.Title>
                </Link>
                
                <Card.Text as='div'>
                    <Rating value={ product.rating.rate } text={`${product.rating.count} reviews`}></Rating>
                </Card.Text>

                <Card.Text as="h3">
                    ${product.price}
                </Card.Text> 
            </Card.Body>
        </Card>
    )
}

export default Product