import React, { memo } from "react";

interface Props {
  onShowMoreButtonClick: () => void;
}

const ShowMoreButton: React.FC<Props> = memo(({ onShowMoreButtonClick }) => {
  return (
    <div className="catalog__more">
      <button
        onClick={() => {
          onShowMoreButtonClick();
        }}
        className="catalog__button"
        type="button"
      >
        Show more
      </button>
    </div>
  );
});

export default ShowMoreButton;
