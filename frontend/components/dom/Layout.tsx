import { useRef, forwardRef, useImperativeHandle, ReactNode, HTMLProps } from 'react';

interface LayoutProps extends HTMLProps<HTMLDivElement> {
    children: ReactNode;
}

const Layout = forwardRef<HTMLDivElement, LayoutProps>(({ children, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => localRef.current!); // On assure que ref.current ne sera jamais null une fois monté

    return (
        <div
            {...props}
            ref={localRef}
            className="absolute top-0 left-0 z-10 h-screen w-screen overflow-hidden bg-zinc-900 text-gray-50"
        >
            {children}
        </div>
    );
});

Layout.displayName = 'Layout';

export default Layout;