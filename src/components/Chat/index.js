import React, { PureComponent } from 'react';
import SocialIconLive from 'components/SocialIconLive';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import styles from './chat.css';

export const ChatMessage = ({ 
  message, 
  name,
  picture,
  createdAt,
  provider
}) => {
  return (
    <div className={styles.ChatMessageWrapper}>
      <div className={styles.messageAvatar}>
        <img className={styles.pictureCircle} src={picture} alt="" />
        <SocialIconLive 
          provider={provider}
          styleOverrides={{
            position: 'absolute',
            bottom: 0,
            right: 10
          }}
        />
      </div>
      <div className={styles.messageContent}>
        <div className={styles.messageHeader}>
          <span className={styles.messageAuthor}>
            {name}
          </span>
          <span className={styles.messageDate}>
            {moment(createdAt).format('h:mmA')}
          </span>
        </div>
        <div className={styles.messageBody}>
          {message}
        </div>
      </div>
    </div>
  );
};

export const ChatInput = ({ messageInput = '', onChange }) => 
  <Paper className={styles.ChatInputWrapper}>
    <input 
      className={styles.Input}
      type="text"
      name="messageInput"
      placeholder="write a comment..."
      onChange={onChange}
      value={messageInput}
    />
    <div className={styles.ChatInputButtons}>
      <span className={styles.sendButton}>
        <i className="material-icons">send</i>
      </span>
      <span className={styles.emojiButton}>
        <i className="material-icons">tag_faces</i>
      </span>
    </div>
  </Paper>

export default class Chat extends PureComponent {
  componentDidUpdate(prevProps) {
    const messageCountDidChange = this.props.messages.length !== prevProps.messages.length;
    if (messageCountDidChange) {
      const chatMessageList = document.querySelector(`.${styles.ChatMessageList}`);
      chatMessageList.scrollTop = chatMessageList.scrollHeight;
    }
  }

  render() {
    let { isChatDocked, messages } = this.props;

    if (!messages) {
      messages = [];
    }


    return (
      <div className={styles.Chat + (isChatDocked ? '' : ` ${styles.undocked}` )}>
        <div className={styles.ChatMessageList}>
          {messages.map((message, i) => (
            <ChatMessage key={i} {...message} />
          ))}
          

        </div>

        
      </div>

    );
  }
}