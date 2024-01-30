// import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
// import axios from 'axios';
// import products from '../products.js';

const HomeScreen = () => {

  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : isError ? (
        <Message variant='danger'>{isError.data.message || isError.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        </>)}
    </>
  );
};

export default HomeScreen;