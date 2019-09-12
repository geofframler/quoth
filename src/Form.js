import React, from 'react';
import './inputform.css';

function Mailbox(props) {
    const id = props.id;
    const body = props.body;
    const author = props.author;
    const source = props.source;
    const request = props.request;

    return (
      <div>
        <h1>Hello!</h1>
        {unreadMessages.length > 0 &&
          <h2>
            You have {unreadMessages.length} unread messages.
          </h2>
        }
      </div>
    );
  }