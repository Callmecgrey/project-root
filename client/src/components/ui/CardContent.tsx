// src/components/ui/CardContent.tsx

import React from 'react';
import classNames from 'classnames';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Additional custom classes for the CardContent */
    className?: string;
    /** Content to be rendered inside the CardContent */
    children: React.ReactNode;
}

/**
 * CardContent Component
 * 
 * This component serves as the inner container for the Card component,
 * providing consistent padding and layout for the card's content.
 * 
 * @param {CardContentProps} props - Props for the component
 * @returns {JSX.Element} The rendered CardContent component
 */
const CardContent: React.FC<CardContentProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div
            className={classNames(
                'p-6', // Default padding
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default CardContent;
