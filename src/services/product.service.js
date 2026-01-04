import Product from "../models/Product.model.js";

export const createProduct = async (data) => {
  return await Product.create(data);
};

export const getAllProducts = async () => {
  return await Product.find({ isActive: true });
};

export const getProductById = async (id) => {
  return await Product.findById(id);
};

export const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id) => {
  return await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
};
