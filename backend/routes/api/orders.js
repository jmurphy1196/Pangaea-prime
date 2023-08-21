const { requireUser } = require("../../middleware/auth");
const {
  CartProduct,
  Order,
  Product,
  OrderProduct,
} = require("../../db/models");
const {
  checkCreateOrderFields,
  checkOrderExists,
  checkUserCanEditOrder,
} = require("../../middleware");
const { BadReqestError } = require("../../errors");

const router = require("express").Router();

router.get("/current", requireUser, async (req, res, next) => {
  const userOrders = await req.user.getOrders({
    include: [
      {
        model: OrderProduct,
        as: "products",
      },
    ],
  });
  return res.status(200).json(userOrders);
});

router.post(
  "/",
  requireUser,
  checkCreateOrderFields,
  async (req, res, next) => {
    const { address_1, address_2, city, state, postalCode } = req.body;
    const userCart = await req.user.getCart({
      include: [
        {
          model: CartProduct,
          include: [
            {
              model: Product,
              as: "product",
            },
          ],
        },
      ],
    });
    let total_price = 0;
    for (let cartProduct of userCart.CartProducts) {
      total_price =
        total_price + cartProduct.quantity * cartProduct.product.price;
    }
    console.log("TOTAL PRICE", total_price);
    const newOrder = await req.user.createOrder({
      status: "pending",
      total_price,
      address_1,
      address_2,
      city,
      state,
      postal_code: postalCode,
    });
    console.log("THIS IS THE NEW ORDER", newOrder);
    for (let cartProduct of userCart.CartProducts) {
      await OrderProduct.create({
        order_id: newOrder.id,
        product_id: cartProduct.product.id,
        quantity: cartProduct.quantity,
      });
    }
    // delete all items in users cart
    await CartProduct.destroy({
      where: {
        cart_id: userCart.id,
      },
    });

    return res.status(200).json(newOrder);
  }
);

router.get(
  "/:orderId",
  checkOrderExists,
  requireUser,
  checkUserCanEditOrder,
  async (req, res, next) => {
    const order = await Order.findByPk(req.params.orderId, {
      include: [
        {
          model: OrderProduct,
          as: "products",
          include: [
            {
              model: Product,
              as: "product",
            },
          ],
        },
      ],
    });

    return res.status(200).json(order);
  }
);

router.put(
  "/:orderId/cancel",
  checkOrderExists,
  requireUser,
  checkUserCanEditOrder,
  async (req, res, next) => {
    if (req.order.status !== "pending")
      return next(
        new BadReqestError("Can only cancel orders that have not shipped yet", {
          status: "Cannot change order",
        })
      );
    req.order.status = "cancelled";
    await req.order.save();
    res.status(200).json(req.order);
  }
);

module.exports = router;
