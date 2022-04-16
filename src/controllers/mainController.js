const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
// será cambiado la const por let para que el contenido cambie junto con las accriones
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    // Do the magic
    let visited = products.filter((item) => item.category == "visited");
    let inSale = products.filter((item) => item.category == "in-sale");

    res.render("index", { visited, inSale, toThousand });
  },
  search: (req, res) => {
    // Do the magic
    let search = req.query.keywords;
    let founded = products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    res.render("results", { search, founded, toThousand });
  },
};

module.exports = controller;
