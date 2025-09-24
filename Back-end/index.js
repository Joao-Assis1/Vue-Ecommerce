import express from "express";
import mongoose from "mongoose";
import mongod from "./db/db-mongo.js";
import Product from "./models/products.js";
import cors from "cors";

const server = express();

server.use(cors());
server.use(express.urlencoded());
server.use(express.json());

// const MONGO_URI = "mongodb://localhost:27017/ecommerce";

mongoose
  .connect(mongod.getUri())
  .then(() => {
    server.listen(3000);
  })
  .catch((e) => {
    console.log("Deu ruim", e);
  });

server.get("/products", async (req, res) => {
  try {
    const listProducts = await Product.find({});
    res.json(listProducts);
  } catch (error) {
    console.log("Erro ao listar produtos", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

server.get("/products/:id", async (req, res) => {
  try {
    const idProduct = req.params.id;
    const product = await Product.findById(idProduct);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.log("Erro ao buscar produto", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

server.post("/products", async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res
        .status(422)
        .json({ message: "Nome e preço são campos obrigatórios." });
    }
    if (name === "" || price < 0) {
      return res.status(422).json({
        message: "Nome não deve ser vazio e preço deve ser maior que zero.",
      });
    }

    const addProduct = await Product.create({ name, price });
    res.status(201).json(addProduct);
  } catch (error) {
    console.log("Erro ao cadastrar produto", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

server.put("/products/:id", async (req, res) => {
  try {
    const idProduct = req.params.id;

    if (req.body.name && req.body.name === "") {
      return res.status(422).json({ message: "Nome não pode ser vazio." });
    }
    if (req.body.price && req.body.price < 0) {
      return res.status(422).json({
        message: "Preço deve ser maior que zero.",
      });
    }

    const dataForUpdate = {};

    if (req.body.name) {
      dataForUpdate.name = req.body.name;
    }

    if (req.body.price) {
      dataForUpdate.price = req.body.price;
    }

    const editProduct = await Product.findByIdAndUpdate(
      idProduct,
      dataForUpdate,
      { new: true }
    );

    if (!editProduct) {
      return res
        .status(404)
        .json({ message: "Produto não encontrado para editar" });
    }

    res.json(editProduct);
  } catch (error) {
    console.log("Erro ao editar produto", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

server.delete("/products/:id", async (req, res) => {
  try {
    const idProduct = req.params.id;
    const removeProduct = await Product.findByIdAndDelete(idProduct);

    if (!removeProduct) {
      return res
        .status(404)
        .json({ message: "Produto não encontrado para remover" });
    }
    res.json({
      message: "Produto removido com sucesso",
      Product: removeProduct,
    });
  } catch (error) {
    console.log("Erro ao deletar produto", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});
