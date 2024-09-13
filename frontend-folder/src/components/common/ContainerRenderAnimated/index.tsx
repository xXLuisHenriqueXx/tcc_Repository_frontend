import React from 'react';
import { MotiView } from 'moti';

interface ContainerRenderAnimatedProps {
    children: React.ReactNode;
    index: number;
}

const ContainerRenderAnimated = ({ children, index }: ContainerRenderAnimatedProps) => {
    return (
        <MotiView
            from={{ translateX: -300, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{
                type: 'timing',
                duration: 200,
                delay: index * 100
            }}
        >
            {children}
        </MotiView>
    )
}

export default ContainerRenderAnimated;