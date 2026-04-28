import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import User from "../models/User.js";


export const checkout = async (req, res) => {
    try {
        const userId = req.user?.id;

        const { address, phone, additionalInformation, paymentMethod } = req.body; // ✅ add this

        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        console.log("CART ITEMS AT CHECKOUT:", JSON.stringify(cart.items, null, 2)); // ← do size/color exist here?

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

            //saving only id + quantity, not the whole populated object
            orderItems: cart.items.map(item => ({
                product: item.product._id,
                productName: item.product.productName,
                price: item.product.price, //one item
                quantity: item.quantity,
                size: item.size,
                color: item.color
            })),
            totalPrice, //total
            billingDetail: {
                address,
                phone,
                additionalInformation
            },
            paymentMethod
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
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const getAllMyOrders = async (req, res) => {
    try {
        const userId = req.user?.id;

        const order = await Order.findOne({ user: userId }).populate("orderItems.product", "productName").populate("user", "-password");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        };

        res.status(200).json({
            success: true,
            message: "Your Orders",
            data: order,
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

export const getBillingDetails = async (req, res) => {
    try {

        const userId = req.user?.id;

        const user = await User.findById(userId).select(
            "firstName lastName companyName phone address email"
        );

        res.status(200).json({
            success: true,
            message: "Your Billing detail",
            data: user,
        });

    } catch (error) {
        res.status(500).json({
            success: 'false',
            message: error.message
        });
    }
};