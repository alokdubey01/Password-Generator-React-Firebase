import React from "react";

export const Tooltip = (props) => {
  const { message, position, displayTooltip } = props;
  return (
    <div>
      {displayTooltip ? (
        <div className={`tooltip-bubble tooltip-${position}`}>
          <div className="tooltip-message">{message}</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
