import React, { useState } from 'react';
import styled from 'styled-components';
import PollCreation from '../../components/pollCreation/PollCreation';
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
    const [activeTab, setActiveTab] = useState('polls');
  
    return (
      <SettingsContainer>
        <TabContainer>
          <Tab active={activeTab === 'Polls'} onClick={() => setActiveTab('polls')}>
            Polls
          </Tab>
          <Tab active={activeTab === 'Create a Poll'} onClick={() => setActiveTab('Create a Poll')}>
            Create a Poll
          </Tab>
        </TabContainer>
  
        <Content>
          {activeTab === 'polls' ? (
            <div>
              <h3>Polls</h3>
              <p>Themes and Appearance</p>
              <Input type="text" placeholder="Theme selection" />
              <p>Language Settings</p>
              <Input type="text" placeholder="Language selection" />
              {/* Add more settings here */}
            </div>
          ) : (
            <div>
              <PollCreation/>
            </div>
          )}
        </Content>
      </SettingsContainer>
    );
  };
  
  export default SettingsPage;
  