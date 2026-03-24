import Cart from "../models/Cart.js";
import Order from "../models/Order.js";


export const checkout = async (req, res) => {
    try {
        const userId = req.user?.id;

        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // calculate total price
        const totalPrice = cart.items.reduce((acc, item) => {
            return acc + item.product.price * item.quantity;
        }, 0);

        // create order
        const order = await Order.create({
            user: userId,
            orderItems: cart.items,
            totalPrice
        });

        // clear cart after checkout
        cart.items = [];
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Checkout Successful",
            data: order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};