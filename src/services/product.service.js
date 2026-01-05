import Product from "../models/Product.model.js";
import { deleteFile } from "../utils/file.js";

export const createProduct = async (data) => {
  return await Product.create(data);
};

// export const getAllProducts = async () => {
//   return await Product.find({ isActive: true });
// };

export const getAllProducts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const { search, sort = "createdAt", order = "desc", category } = req.query;
  let query = {};

  if (search) {
    query.$text = { $search: search };
  }

  if (category) {
    query.category = category;
  }

  const sortOption = {
    [sort]: order === "asc" ? 1 : -1,
  };

  const products = await Product.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(query);

  return {
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getProductById = async (id) => {
  return await Product.findById(id);
};

export const updateProduct = async (req, res) => {
  // return await Product.findByIdAndUpdate(id, data, { new: true });
  const { id } = req.params;
  const { name, price } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (req.file) {
    deleteFile(product.image);
    product.image = req.file.path;
  }
  product.name = name || product.name;
  product.price = price || product.price;

  await product.save();
  res.json(product);
};

// export const deleteProduct = async (id) => {
//   return await Product.findByIdAndUpdate(
//     id,
//     { isActive: false },
//     { new: true }
//   );
// };

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Delete image from disk
  deleteFile(product.image);

  return await product.deleteOne();
};
