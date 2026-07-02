import { requireRole } from '@/lib/core/session';
import React from 'react';

const readerLayout = async ({children}) => {
    await requireRole("reader");
    await requireRole("reader");
    return children;
};

export default readerLayout;
  
