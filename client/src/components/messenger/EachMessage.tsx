import React from 'react';
import { Message } from '../../types/messages.types';

const EachMessage = ({message}: {message: Message}) => {
    return (
        <div>
            {message.id}
        </div>
    );
};

export default EachMessage;