import React from 'react'
import './pollCreation.scss'; // Make sure to create and import your CSS file

const PollCreation = () => {
  return (
    <div className="poll-container">
      <h2>Create a Poll</h2>
      <p>Complete the below fields to create your poll.</p>
      
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Type your question here" />
        </div>

        <button type="button" className="add-description">+ Add description or image</button>

        <div className="form-group">
          <label htmlFor="poll-type">Poll type</label>
          <select id="poll-type">
            <option value="multiple-choice">Multiple choice</option>
            {/* Add other poll types if needed */}
          </select>
        </div>

        <div className="form-group">
          <label>Answer Options</label>
          <div className="options">
            <input type="text" placeholder="Option 1" />
            <input type="text" placeholder="Option 2" />
            <button type="button" className="add-option">+ Add option</button>
            <button type="button" className="add-other">Add "Other"</button>
          </div>
        </div>

        <div className="settings">
          <h3>Settings</h3>
          <div className="setting-item">
            <label>Allow selection of multiple options</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>Require participant names</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>Voting security</label>
            <select>
              <option>One vote per IP address</option>
              {/* Additional security options here */}
            </select>
          </div>
          <div className="setting-item">
            <label>Block VPN users</label>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="setting-item">
            <label>Use CAPTCHA</label>
            <input type="checkbox" />
          </div>
          <a href="#" className="advanced-settings">Show advanced settings</a>
        </div>

        <button type="submit" className="create-poll">Create poll</button>
      </form>
    </div>
  )
}

export default PollCreation;
