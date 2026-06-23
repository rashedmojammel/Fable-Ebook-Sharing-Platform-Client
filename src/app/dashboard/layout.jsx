import { DashboardSidebar } from '@/components/Dashboard/DashboardSidebar';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const DashboardLayout = async ({children}) => {
    const user = await getUserSession();
    return (
        <div className="flex min-h-screen">
            <DashboardSidebar user={user}></DashboardSidebar>

            <div className='flex-1'>{children}</div>
            
        </div>
    );
};

export default DashboardLayout;