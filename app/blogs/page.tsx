'use client';

import withAuth from '@/middleware/withAuth';
import type { FC } from 'react';

interface BlogsProps {}

const Blogs: FC<BlogsProps> = () => {
    return (
        <div>blog page</div>
    );
}

export default withAuth(Blogs);
