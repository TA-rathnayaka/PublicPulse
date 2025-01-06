import React from "react";
import "./ToggleSwitch.scss";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

const ToggleSwitch = ({ label, tooltipText, checked = false, onChange }) => {
  return (
    <div className="toggleSwitch">
      {/* Ensure 'checked' is always defined */}
      <FormControlLabel
        control={
          <Switch
            checked={checked} // Controlled value
            onChange={(event) => onChange(event.target.checked)} // Trigger parent callback
          />
        }
        label={label}
      />
      {/* Optional tooltip with info icon */}
      {tooltipText && (
        <Tooltip title={tooltipText} placement="right" arrow>
          <InfoIcon className="infoIcon" />
        </Tooltip>
      )}
    </div>
  );
};

export default ToggleSwitch;
