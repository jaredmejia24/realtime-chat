import React from 'react';
import { Message } from '../../types/messages.types';

const EachMessage = ({message}: {message: Message}) => {
    return (
        <div>
            {message.message}
        </div>
    );
};

export default EachMessage;