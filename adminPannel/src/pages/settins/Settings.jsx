import React, { useState } from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  width: 50%;
  margin: 2rem auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #ddd;
`;

const Tab = styled.button`
  flex: 1;
  padding: 1rem;
  cursor: pointer;
  background: ${(props) => (props.active ? '#f0f0f0' : 'white')};
  border: none;
  border-bottom: ${(props) => (props.active ? '2px solid #000' : '2px solid #ddd')};
  color: ${(props) => (props.active ? '#000' : '#aaa')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
`;

const Content = styled.div`
  padding: 1rem 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  background: ${(props) => (props.cancel ? '#ccc' : '#007bff')};
  color: #fff;
  cursor: pointer;
  margin-right: ${(props) => (props.cancel ? '0.5rem' : '0')};
`;

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('preferences');

  return (
    <SettingsContainer>
      <TabContainer>
        <Tab active={activeTab === 'preferences'} onClick={() => setActiveTab('preferences')}>
          Preferences
        </Tab>
        <Tab active={activeTab === 'security'} onClick={() => setActiveTab('security')}>
          Security
        </Tab>
      </TabContainer>

      <Content>
        {activeTab === 'preferences' ? (
          <div>
            <h3>Preferences</h3>
            <p>Themes and Appearance</p>
            <Input type="text" placeholder="Theme selection" />
            <p>Language Settings</p>
            <Input type="text" placeholder="Language selection" />
            {/* Add more settings here */}
          </div>
        ) : (
          <div>
            <h3>Security</h3>
            <p>Current Password</p>
            <Input type="password" placeholder="Type your current password" />
            <p>New Password</p>
            <Input type="password" placeholder="Type your new password" />
            <p>Confirm New Password</p>
            <Input type="password" placeholder="Confirm your new password" />
            <div style={{ marginTop: '1rem' }}>
              <Button>Update</Button>
              <Button cancel>Cancel</Button>
            </div>
          </div>
        )}
      </Content>
    </SettingsContainer>
  );
};

export default SettingsPage;
