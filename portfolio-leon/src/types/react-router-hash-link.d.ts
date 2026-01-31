declare module 'react-router-hash-link' {
    import { ComponentType } from 'react';
    import { LinkProps } from 'react-router-dom';

    export interface HashLinkProps extends LinkProps {
        smooth?: boolean;
        // Add other props if needed
    }

    export const HashLink: ComponentType<HashLinkProps>;
}