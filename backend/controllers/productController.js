import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc     Fetch all Products
//@route    GET /api/products
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments();

  const products = await Product.find({}).limit(pageSize);
  res.json(products);
});

//@desc     Fetch a Product
//@route    GET /api/products/:id
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("😒Resource not found");
  }
});

//@desc     Create a Product
//@route    POST /api/products
//@access   Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    rating: {
      rate: 0,
      count: 0,
    },
    description: "Sample description",
  });
  const createProduct = await product.save();
  res.status(202).json(createProduct);
});

//@desc     Update a Product
//@route    PUT /api/products/:id
//@access   Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updateProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

//@desc     Delete a Product
//@route    DELETE /api/products/:id
//@access   Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

//@desc     Create a new review
//@route    POST /api/products/:id/reviews
//@access   Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      // console.log("..a.......", alreadyReviewed);
      // console.log("..p.......", product.rating);
      alreadyReviewed.rating = Number(rating);
      alreadyReviewed.comment = comment;

      const avgRating =
        (product.rating.rate*product.rating.count + rating) /
        (product.rating.count);
      
      product.rating.rate = avgRating.toFixed(2);

      // product.rating.rate =
      //   product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      //   product.reviews.length;
      await product.save();
      res.status(201).json({ message: "Review Updated" });
      // throw new Error("Product already reviewed");
    } else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      // product.rating.rate = product.reviews.length;
      const avgRating =
        (product.rating.rate*product.rating.count + rating) /
        (product.rating.count);
      
      product.rating.rate = avgRating.toFixed(3);

      // product.rating.rate =
      //   product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      //   product.reviews.length;
      product.rating.count = product.rating.count + 1;
      await product.save();
      res.status(201).json({ message: "Review added" });
    }
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
