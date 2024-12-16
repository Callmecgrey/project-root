// src/components/ui/Button.tsx

import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'link';
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
}

const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    link: 'text-blue-600 underline hover:text-blue-700',
};

const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-md',
    lg: 'px-5 py-3 text-lg',
};

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className,
    asChild = false,
    children,
    ...props
}) => {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            className={classNames(
                'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            {...props}
        >
            {children}
        </Comp>
    );
};

export default Button;
