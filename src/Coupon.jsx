import { useState } from "react";
import { useDispatch } from "react-redux";
import { applyCoupon } from "./store/CouponSlice";

function Coupon() {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const handleApplyDiscount = () => {
        dispatch(applyCoupon(input));
    };

    return (
        <div className="coupon-container">
            <label className="coupon-label">Enter Discount Coupon:</label>

            <input
                type="text"
                className="coupon-input"
                placeholder="ENTER THE COUPON"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button className="coupon-btn" onClick={handleApplyDiscount}>
                Apply
            </button>
        </div>
    );
}

export default Coupon;
