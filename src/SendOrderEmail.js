import emailjs from "emailjs-com";
import { toast } from "react-toastify";

/**
 * Sends order email using EmailJS
 * @param {Array} cartItems - Items in the cart
 * @param {Object} user - User object containing email and name
 * @param {Object} orderData - Order details (amounts, discounts, etc.)
 * @returns {Promise<void>}
 */
export const sendOrderEmail = async (cartItems, user, orderData) => {
  try {
    const templateParams = {
      orders: cartItems.map((item) => ({
        name: item.name,
        units: item.quantity,
        price: item.price,
        image_url: `https://cafe-horizon-frontend.vercel.app/images/${item.image}`

      })),
      totalamount: orderData.totalAmount,
      discount: orderData.discountPercentage,
      discountamount: orderData.discountAmount,
      price: orderData.priceAfterDiscount,
      gst: orderData.gstTaxAmount,
      couponamount: orderData.couponDiscountAmount,
      coupon: orderData.couponPercentage,
      totalorder: orderData.amountToBePaid,
      email: user.email,
      order_id: orderData.orderId,
    };

    await emailjs.send(
      "service_1l450n5",          //  EmailJS service ID
      "template_c1zqvt9",         //  EmailJS template ID
      templateParams,
      "1a_iXOffeeEUSIelH"         //  EmailJS user/public key
    );

    toast.success(" Order details sent to your email successfully!");
  } catch (error) {
    toast.error(` Failed to send order email: ${error.text || error.message}`);
    throw error; // throw so order is not cleared if email fails
  }
};
