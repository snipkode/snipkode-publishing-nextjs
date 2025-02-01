'use client';

import withAuth from '@/middleware/withAuth';
import type { FC } from 'react';

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
    return (
        <div>chat page</div>
    );
}

export default withAuth(Chat);
