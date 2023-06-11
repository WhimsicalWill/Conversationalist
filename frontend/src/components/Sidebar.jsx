import React from 'react';

// Material UI imports
import ChatBubble from '@mui/icons-material/ChatBubble';
import Topic from '@mui/icons-material/Topic';
import Forum from '@mui/icons-material/Forum';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function SidebarHeader() {
  return (
    <a href="https://github.com/WhimsicalWill/Chatmosphere" target="_blank" rel="noopener noreferrer">
      <div className="sidebar-header">
        <Forum className='header-icon' />
        <h2>Chatmosphere</h2>
        {/* Invisible 'dummy' icon to balance the visible icon */}
        <Forum className='header-icon' style={{ visibility: "hidden" }} />
      </div>
    </a>
  );
}

export function SidebarTabHeader({ currentTab, handleBackClick }) {
  return (
    <div className="tab-header">
      {currentTab === 'Active Chats' ? (
        <IconButton onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>
      ) : (
        <IconButton style={{ visibility: "hidden" }}>
          <ArrowBackIcon />
        </IconButton>
      )}
      <h2>{currentTab}</h2>
      <IconButton style={{ visibility: "hidden" }}>
        <ArrowBackIcon />
      </IconButton>
    </div>
  );
}

export function SidebarContent({ 
  currentTab, 
  topics, 
  currentTopic, 
  currentChat, 
  setCurrentTopic, 
  setCurrentChat, 
  deleteChat, 
  deleteTopic,
  handleTopicClick,
  handleChatClick,
  submitNewTopicName,
  isEditingNewTopic,
  setEditingNewTopic,
  brainstormTopicID,
  brainstormChatID,
}) {

  // Declare some tricky sections as variables
  const editingNewTopicSection = isEditingNewTopic ?
    <input
      className="new-topic-input"
      type="text"
      placeholder="What do you want to talk about?"
      onKeyDown={(event) => submitNewTopicName(event)}
      onBlur={() => setEditingNewTopic(false)}
      onFocus={(event) => event.target.placeholder = ""}
    />
    :
    <div 
      className="topic" 
      onClick={() => {
          setEditingNewTopic(true);
          setCurrentTopic(brainstormTopicID.current);
          handleChatClick(brainstormTopicID.current, brainstormChatID.current);
        }
      }
    >
      <AddIcon className='brainstorm-icon' /> New Topic
    </div>
  ;

  const topicListSection = 
    <ul className="topic-list">
      {topics && Object.keys(topics).filter(t => t !== brainstormTopicID.current).map((topicID, index) => (
        <li
          key={index}
          onClick={() => handleTopicClick(topicID)}
          className={`topic ${currentTopic === topicID ? "active-topic" : ""}`}
        >
          <Topic className='topic-icon' /> {topics[topicID].title}
          <DeleteIcon 
            className='delete-icon' 
            onClick={(event) => {
              event.stopPropagation(); // prevent the sidebar click event from firing
              deleteTopic(topicID);
            }}
          />
        </li>
      ))}
    </ul>
  ;

const chatListSection = (
  <div className="chat-list-container">
    <ul className="chat-list">
      {topics && currentTopic && Object.keys(topics[currentTopic].chats).map((chatID, index) => {

        return (
          <li
            key={index}
            onClick={() => {
              handleChatClick(currentTopic, chatID);
            }}
            className={`chat ${currentChat === chatID ? "active-chat" : ""}`}
          >
            <ChatBubble className='chat-icon' /> {topics[currentTopic].chats[chatID].name}
            <DeleteIcon 
              className='delete-icon' 
              onClick={(event) => {
                event.stopPropagation(); // prevent the sidebar click event from firing
                deleteChat(currentTopic, chatID);
              }}
            />
          </li>
        );
      })}
    </ul>
    <div className="new-matches-message">New matches will appear here</div>
  </div>
);

  return (
    <>
      {currentTab === 'Topics' && (
        <>
          {editingNewTopicSection}
          {topicListSection}
        </>
      )}
      {currentTab === 'Active Chats' && chatListSection}
    </>
  );
}