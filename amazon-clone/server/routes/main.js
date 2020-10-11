var router = require("express").Router();
var User = require("../models/user");
var Product = require('./../models/product');
var ProductComment = require('./../models/product-comment');

function paginate(req, res, next) {
  var perPage = 9;
  var page = req.params.page;

  Product.find()
    .skip(perPage * page) // 9 * 2 = 18; 9 * 3 = 27
    .limit(perPage) // 9 rows only
    .populate('category')
    .exec(function(err, products) {
      Product.count().exec(function(err, count) {
        if (err) return next(err);
        res.render('main/product-main', {
          products: products,
          pages: count / perPage
        });
      });
    });
}

Product.createMapping(function(err, mapping) {
  if (err) {
    console.log('errorng creating mapping');
    console.log(err);
  } else {
    console.log('Mapping created');
    console.log(mapping);
  }
});

var stream = Product.synchronize();
var count = 0;

stream.on('data', function () {
  count++;
});

stream.on('close', function () {
  console.log('Indexed ' + count + ' documents');
});

stream.on('error', function (err) {
  console.log(err);
});

router.get('/search', function (req, res, next) {
  if (req.query.q) {
    Product.search({
      query_string: { query: req.query.q },
    }, function (err, results) {
      if (err) return next(err);
      var data = results.hits.hits.map(function(hit) {
        return hit;
      });

      res.render('main/search-result', {
        query: req.query.q,
        data: data,
      });

    });
  }
});

router.post('/search', function (req, res, next) {
  res.redirect('/search?q=' + req.body.q);
});

router.get("/", function(req, res, next) {
  if (req.user) {
    paginate(req, res, next);
  } else {
    res.render('main/home');
  }

});

router.get('/page/:page', function(req, res, next) {
  paginate(req, res, next);
});

router.get("/about", function(req, res) {
  res.render("main/about");
});

router.get("/products/:id", function(req, res, next) {
  Product.find({ category: req.params.id })
    .populate("category")
    .exec(function(err, products) {
      if (err) return next(err);
      res.render("main/category", {
        products: products
      });
    });
});

router.get("/product/:id", function(req, res, next) {
  Product.findById({ _id: req.params.id }, function(err, product) {
    if (err) return next(err);
    ProductComment.find({ product: req.params.id })
      .populate('product')
      .exec((err, comments) => {
        if (err) return next(err);
        res.render("main/product", {
          product: product,
          comments: comments || []
        });
      })
  });
});

router.post("/product/:id", function(req, res, next) {
  Product.findById({ _id: req.params.id }, function(err, product) {
    if (err) return next(err);
    var pComment = new ProductComment();
    pComment.product = product._id;
    const comment_text = req.body.comment;
    pComment.text= comment_text;
    pComment.save(function (err) {
      if (err) return next(err);
      req.flash('success', 'Successfully added a comment');
      res.redirect(`/product/${req.params.id}`);
    });
  });
});

module.exports = router;
