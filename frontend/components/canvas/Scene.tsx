import { ShaderGradientCanvas } from '@shadergradient/react';
import React from 'react';

interface SceneProps {
    children: React.ReactNode;
    className?: string;
    eventSource: React.RefObject<null>;
    eventPrefix: string;
}

const Scene: React.FC<SceneProps> = ({ children, className = '', eventSource, eventPrefix }) => {
    return (
        <div ref={eventSource} data-event-prefix={eventPrefix}>
            <ShaderGradientCanvas
                className={className}
                style={{ pointerEvents: 'auto', position: 'absolute', top: 0, left: 0, zIndex: -1 }}
            >
                {children}
            </ShaderGradientCanvas>
        </div>
    );
};

export default Scene;