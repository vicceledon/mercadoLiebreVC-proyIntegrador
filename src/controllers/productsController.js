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
    // let index = req.params.id - 1;
    // let itemSelected = products[index];
    let index = req.params.id;
    let itemSelected = products.filter((item) => item.id == index);

    res.render("detail", { itemSelected: itemSelected[0], toThousand });
  },

  // Create - Form to create
  create: (req, res) => {
    // Do the magic
    let index = 0;
    products.forEach((item) => {
      if (item.id > index) {
        index = item.id;
      }
    });
    res.render("product-create-form", { index });
  },

  // Create -  Method to store
  store: (req, res) => {
    // Do the magic
    let index = req.params.id;
    let newItem = {
      id: index,
      ...req.body,
      image: "default-image.png",
    };
    products.push(newItem);
    let newProducts = products;
    fs.writeFileSync(productsFilePath, JSON.stringify(newProducts), "utf-8");

    res.redirect("/products/");
  },

  // Update - Form to edit
  edit: (req, res) => {
    // Do the magic
    // let index = req.params.id - 1;
    // let itemSelected = products[index];
    let index = req.params.id;
    let itemSelected = products.filter((item) => item.id == index);

    res.render("product-edit-form", {
      itemSelected: itemSelected[0],
      toThousand,
    });
  },
  // Update - Method to update
  update: (req, res) => {
    // Do the magic
    // let index = req.params.id - 1;
    // let itemSelected = products[index];
    let index = req.params.id;
    let itemSelected = products.filter((item) => item.id == index);

    let info = req.body;
    // products[index] = { ...itemSelected, ...info };
    let newProducts = products.map((item) => {
      if (item == itemSelected[0]) {
        return { ...itemSelected[0], ...info };
      } else {
        return item;
      }
    });
    fs.writeFileSync(productsFilePath, JSON.stringify(newProducts), "utf-8");

    res.redirect("/products/");
    // res.redirect("/"); //Esta opción no carga las modificaciones, es necesario recargar la página
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    // Do the magic
    // let index = req.params.id - 1;
    // let itemSelected = products[index];
    // let newProducts = products.filter((item) => item != itemSelected);
    let index = req.params.id;
    let itemSelected = products.filter((item) => item.id == index);
    let newProducts = products.filter((item) => item != itemSelected[0]);

    fs.writeFileSync(productsFilePath, JSON.stringify(newProducts), "utf-8");

    res.redirect("/products/");
  },
};

module.exports = controller;
