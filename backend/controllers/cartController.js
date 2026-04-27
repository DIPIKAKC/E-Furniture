import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user?.id; //authentication -> the id of currently logged in user

        // validation
        if (!productId || !quantity || quantity < 1) {
            return res.status(400).json({
                message: "Invalid product or quantity",
            });
        }

        //see if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        //if user already has a cart or some other items saved
        let cart = await Cart.findOne({ user: userId }); //mongodb expects filter object i.e. { field: value } while using findOne(), it means-> Find me a cart where the user field equals this userId
        //if not creating cart
        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity }],
            });
        } else {

            //does the product already exist in cart, camparing the OD of product to be added with existing product in the cart
            const itemIndex = cart.items.findIndex(
                (item) => item.product.toString() === productId.toString()
            );

            //if same -> increase
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = Math.max(
                    1,
                    cart.items[itemIndex].quantity + quantity
                );
            } else {
                //if different push the new item to cart
                cart.items.push({ product: productId, quantity });
            }

            //saving info
            await cart.save();
        }

        //populating product info
        await cart.populate("items.product");

        res.status(200).json({
            success: true,
            message: "Item added to cart",
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { productId, quantity } = req.body;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId.toString()
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        cart.items[itemIndex].quantity = Math.max(1, quantity);
        await cart.save();
        await cart.populate('items.product');

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const removeCartItem = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({
            message: "Cart not found"
        });

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId.toString()
        );

        await cart.save();
        await cart.populate('items.product');

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

export const emptyCart = async (req, res) => {
    try {
        const userId = req.user?.id;

        let cart = await Cart.findOne({ user: userId }); //mongodb expects filter object i.e. { field: value } while using findOne(), it means-> Find me a cart where the user field equals this userId

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            data: cart,
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}

export const getAllCartItems = async (req, res) => {
    try {
        const userId = req.user?.id;

        let cart = await Cart.findOne({ user: userId }).populate("items.product"); //mongodb expects filter object i.e. { field: value } while using findOne(), it means-> Find me a cart where the user field equals this userId

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Your Cart",
            data: cart,
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
}
