// src/components/ui/Card.tsx

import React from 'react';
import classNames from 'classnames';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'shadow' | 'border';
    className?: string;
    children: React.ReactNode;
}

const variantStyles = {
    default: 'bg-white',
    shadow: 'bg-white shadow-lg',
    border: 'bg-white border border-gray-200',
};

const Card: React.FC<CardProps> = ({
    variant = 'default',
    className,
    children,
    ...props
}) => {
    return (
        <div
            className={classNames(
                'rounded-lg overflow-hidden',
                variantStyles[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
