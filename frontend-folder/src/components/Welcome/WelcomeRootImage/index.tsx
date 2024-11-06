import React, { ReactNode } from 'react';
import { ContainerImage } from './styled';

interface WelcomeRootImageProps {
    image: any;
    children: ReactNode;
}

const WelcomeRootImage = ({ image, children }: WelcomeRootImageProps) => {
  return (
    <>
        <ContainerImage source={image}>
            { children }
        </ContainerImage>
    </>
  )
}

export default WelcomeRootImage;