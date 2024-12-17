// src/hoc/withAdminAuth.tsx

import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import AdminAccessModal from '../components/Admin/AdminAccessModal';

const withAdminAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const ComponentWithAuth: React.FC<P> = (props) => {
        const { accessCode } = useContext(AuthContext);

        return (
            <>
                {!accessCode && <AdminAccessModal />}
                <div className={accessCode ? 'opacity-100' : 'opacity-50 pointer-events-none'}>
                    <WrappedComponent {...props} />
                </div>
            </>
        );
    };

    return ComponentWithAuth;
};

export default withAdminAuth;
