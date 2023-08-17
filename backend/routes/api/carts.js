const { requireUser } = require("../../middleware/auth");
const { Product } = require("../../db/models");
const { checkCartProductFields } = require("../../middleware");
const { NotFoundError, BadReqestError } = require("../../errors");

const router = require("express").Router();

router.get("/current", requireUser, async (req, res, next) => {
  const cart = await req.user.getCart({
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  });
  return res.status(200).json(cart);
});

router.post(
  "/",
  requireUser,
  checkCartProductFields,
  async (req, res, next) => {
    let cart = await req.user.getCart({
      include: [
        {
          model: Product,
          as: "products",
        },
      ],
    });
    const { productId, quantity } = req.body;
    const product = await Product.findByPk(productId);
    if (!product)
      return next(
        new NotFoundError("Product not found", { proudctId: "invalid" })
      );
    if (product.stock_quantity < +quantity)
      return next(
        new BadReqestError("Not enough product", {
          productId: "Not enough product",
        })
      );
    const cartProducts = await cart.getProducts({ where: { id: productId } });

    if (cartProducts && cartProducts.length > 0) {
      const cartProduct = cartProducts[0];
      const currentQuantity = cartProduct.CartProduct.quantity;
      cartProduct.CartProduct.quantity = currentQuantity + +quantity;
      await cartProduct.CartProduct.save();
    } else {
      await cart.addProduct(product, { through: { quantity: +quantity } });
    }
    cart = await req.user.getCart({
      include: [
        {
          model: Product,
          as: "products",
        },
      ],
    });
    return res.status(201).json(cart);
  }
);

router.put("/", requireUser, checkCartProductFields, async (req, res, next) => {
  const { productId, quantity } = req.body;
  const cart = await req.user.getCart({
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  });
  const product = await Product.findByPk(productId);
  if (!product)
    return next(
      new NotFoundError("Product not found", { proudctId: "invalid" })
    );
  const cartProducts = await cart.getProducts({ where: { id: productId } });
  if (!cartProducts || !cartProducts.length)
    return next(
      new BadReqestError("Product is not in cart", {
        productId: "Product not in cart",
      })
    );
  const cartProduct = cartProducts[0];
  cartProduct.CartProduct.quantity = +quantity;
  await cartProduct.CartProduct.save();
  return res.status(201).json(cartProduct);
});

router.delete("/", requireUser, async (req, res, next) => {
  const { productId } = req.body;
  if (!productId) return next(new BadReqestError("invalid id"));
  const cart = await req.user.getCart({
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  });
  const product = await Product.findByPk(productId);
  if (!product)
    return next(
      new NotFoundError("Product not found", { proudctId: "invalid" })
    );
  const cartProducts = await cart.getProducts({ where: { id: productId } });
  if (!cartProducts || !cartProducts.length) {
    return next(
      new BadReqestError("Product is not in cart", {
        productId: "Product not in cart",
      })
    );
  }

  await cart.removeProduct(product);

  return res.status(200).json({ message: "Product removed from cart" });
});

module.exports = router;
