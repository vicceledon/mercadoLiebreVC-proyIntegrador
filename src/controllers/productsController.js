const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
// será cambiado la const por let para que el contenido cambie junto con las accriones
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    // Do the magic
    res.render("products", { products, toThousand });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    // Do the magic
    let index = products.findIndex((item) => item.id == req.params.id);
    let itemSelected = products[index];

    res.render("detail", { itemSelected, toThousand });
  },

  // Create - Form to create
  create: (req, res) => {
    // Do the magic
    let newId = 0;
    products.forEach((item) => {
      if (item.id > newId) {
        newId = item.id;
      }
    });
    res.render("product-create-form", { newId });
  },

  // Create -  Method to store
  store: (req, res) => {
    // Do the magic
    let newId = req.params.id;
    let newItem = {
      id: newId,
      ...req.body,
      image: "default-image.png",
    };
    products.push(newItem);

    fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8");

    // res.send("item agregado."); // Esta línea es la solicitada en el requisito
    res.redirect("/products/");
  },

  // Update - Form to edit
  edit: (req, res) => {
    // Do the magic
    let index = products.findIndex((item) => item.id == req.params.id);
    let itemSelected = products[index];

    res.render("product-edit-form", {
      itemSelected,
      toThousand,
    });
  },
  // Update - Method to update
  update: (req, res) => {
    // Do the magic
    let index = products.findIndex((item) => item.id == req.params.id);
    let info = req.body;

    products[index] = { ...products[index], ...info };

    fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8");

    res.redirect("/products/");
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    // Do the magic
    let index = products.findIndex((item) => item.id == req.params.id);
    products.splice(index, 1);

    fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8");

    // res.send("item eliminado."); // Esta línea es la solicitada en el requisito
    res.redirect("/products/");
  },
};

module.exports = controller;
