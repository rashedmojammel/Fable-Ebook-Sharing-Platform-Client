import { getWriterSales } from '@/lib/api/purchases';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import SalesHistoryTable from './SalesHistoryTable';

const page = async () => {
    const user = await getUserSession();
    const sales = (await getWriterSales(user?.email)) || [];
    return (
        <div className='w-full'>
           <SalesHistoryTable sales={sales} />
            
            
        </div>
    );
};

export default page;