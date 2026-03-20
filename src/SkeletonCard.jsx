import "./SkeletonCard.css";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="sk sk-image" />
      <div className="sk-body">
        <div className="sk sk-title" />
        <div className="sk sk-subtitle" />
        <div className="sk sk-price" />
        <div className="sk sk-btn" />
      </div>
    </div>
  );
}

export default SkeletonCard;