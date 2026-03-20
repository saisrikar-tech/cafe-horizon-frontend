import { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import "./ProductItems.css";
import { useDispatch, useSelector } from "react-redux";
import Error from "./Error";
import SkeletonCard from "./SkeletonCard";

function MenuPage({ title, fetchAction, selector,clearErrorAction }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAction());
  }, [dispatch, fetchAction]);

  const { items, loading, error } = useSelector(selector);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
    const handleRetry = () => {
    if (clearErrorAction) dispatch(clearErrorAction()); // clear error first
    dispatch(fetchAction()); // then fetch again
  };

  return (
    <div className="item-menu-container">
      <h1>{title}</h1>

      {/* Error state — shows retry button */}
      {error && !loading && (
        <Error
          message="Failed to load items. Please check your connection."
          onRetry={handleRetry}
        />
      )}

      {/* Cards grid — skeletons while loading, real cards when done */}
      {!error && (
        <div className="item-cards-container">
          {loading
            ? Array(itemsPerPage).fill(0).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : currentItems.map((item) => (
                <div key={item.id} className="item-card">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-header">
                    {item.isVeg !== undefined && (
                      <span className={item.isVeg ? "veg-icon" : "nonveg-icon"} />
                    )}
                    <h2>{item.name}</h2>
                  </div>
                  <p className="item-description">{item.description}</p>
                  <p className="item-price">Price: ₹{item.price}</p>
                  <AddToCart item={item} />
                </div>
              ))}
        </div>
      )}

      {/* Pagination — only show when loaded and no error */}
      {!loading && !error && items.length > itemsPerPage && (
        <div className="mt-4">
          <ul className="pagination justify-content-center">

            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link btn-prev"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button
                  className={`page-link btn-page ${
                    currentPage === index + 1 ? "btn-page-active" : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link btn-next"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </li>

          </ul>
        </div>
      )}

    </div>
  );
}

export default MenuPage;