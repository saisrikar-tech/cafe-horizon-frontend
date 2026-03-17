import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon, clearCoupon } from "./store/CouponSlice";

function Coupon() {

    const [input, setInput] = useState("");

    const dispatch = useDispatch();

    const { applied, code, discount, message } = useSelector(
        (state) => state.coupon
    );

    const handleApplyDiscount = () => {

        if (!input.trim()) return;

        dispatch(applyCoupon(input));

        setInput("");
    };

    const handleRemoveCoupon = () => {

        dispatch(clearCoupon());
    };

    const handleApplyAnother = () => {

        dispatch(clearCoupon());

        setInput("");
    };

    return (
        <>
        <div className="coupon-container">
            {!applied ? (
                <>
                    <label className="coupon-label">
                        Enter Discount Coupon:
                    </label>

                    <input
                        type="text"
                        className="coupon-input"
                        placeholder="ENTER THE COUPON"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <button
                        className="coupon-btn"
                        onClick={handleApplyDiscount}
                    >
                        Apply
                    </button>

                    {message && (
                        <p className="coupon-message">{message}</p>
                    )}
                </>

            ) : (

                <>
                    <p className="coupon-success">
                        Coupon <strong>{code}</strong> applied ({discount}% OFF)
                    </p>

                    <button
                        className="coupon-remove-btn"
                        onClick={handleRemoveCoupon}
                    >
                        Remove Coupon
                    </button>

                    <button
                        className="coupon-reapply-btn"
                        onClick={handleApplyAnother}
                    >
                        Apply Another
                    </button>
                </>
            )}
        </div>
        </>
    );
}

export default Coupon;