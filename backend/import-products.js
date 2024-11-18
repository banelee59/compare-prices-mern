import mongoose from 'mongoose';
import XLSX from 'xlsx';
import Product from './models/Product.js';
//import connectDB from './config/db.js';

async function importProductsFromXLSX(xlsxFilePath) {
    await mongoose.connect('mongodb+srv://banelee59:wa4QbOm1Ha2bJ0Ln@cluster0.jnnls.mongodb.net/compare-prices?retryWrites=true&w=majority&appName=Cluster0');

  const workbook = XLSX.readFile(xlsxFilePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);

  for (const row of data) {
    const { 'Product name': name, Price, Retailer } = row;

    let product = await Product.findOne({ name });

    if (!product) {
      product = new Product({ name, prices: [{ store: Retailer, price: parseFloat(Price) }] });
      await product.save();
    } else {
      const existingPrice = product.prices.find((p) => p.store === Retailer);
      if (existingPrice) {
        if (existingPrice.price < parseFloat(Price)) {
          existingPrice.price = parseFloat(Price);
          await product.save();
        }
      } else {
        product.prices.push({ store: Retailer, price: parseFloat(Price) });
        await product.save();
      }
    }
  }

  console.log('XLSX file successfully processed');
  await mongoose.disconnect();
}

importProductsFromXLSX('products.xlsx');