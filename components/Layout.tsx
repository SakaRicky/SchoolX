import React from'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
    return (
        <div>
            <div>Inside Layout</div>
            {children}
        </div>
    )
}

export default Layout;