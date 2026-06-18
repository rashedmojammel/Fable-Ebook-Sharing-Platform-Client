'use client';
import { useSession } from '@/lib/auth-client';
import React from 'react';

const WriterDashboard = () => {

    const {data:session , isPending} = useSession();
    if(isPending) {
        return <div>Loading...</div>
    }
    const user = session?.user || null;
    console.log(user);

    return (
        <div>
            <h2>Wellcome back {user?.name || 'Writer'}</h2>
            hello writer
        </div>
    );
};

export default WriterDashboard;