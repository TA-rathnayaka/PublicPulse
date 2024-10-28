// ToggleSwitch.jsx
import React from "react";
import "./ToggleSwitch.scss";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

const ToggleSwitch = ({ label, tooltipText }) => {
  return (
    <div className="toggleSwitch">
      <FormControlLabel control={<Switch />} label={label} />
      {tooltipText && (
        <Tooltip title={tooltipText} placement="right" arrow>
          <InfoIcon className="infoIcon" />
        </Tooltip>
      )}
    </div>
  );
};

export default ToggleSwitch;
