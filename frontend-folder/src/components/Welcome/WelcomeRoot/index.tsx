import React, { ReactNode } from 'react';
import { Container, ContainerImage, ContainerScrollView, ContainerView } from './styled';
import BackButton from '../../common/BackButton';
import WelcomeControllers from '../WelcomeControllers';

interface WelcomeRootProps {
    children: ReactNode;
    currentScreen: number;
    handleNext: () => void;
    handlePrevious: () => void;
    image?: any;
}

const WelcomeRoot = ({ children, currentScreen, handleNext, handlePrevious, image }: WelcomeRootProps) => {
    return (
        <>
            {!image ? (
                <Container>
                    <BackButton />

                    <ContainerScrollView>
                        <ContainerView
                            from={{ translateX: -300, opacity: 0 }}
                            animate={{ translateX: 0, opacity: 1 }}
                            transition={{ type: 'timing', duration: 300 }}
                        >
                            {children}
                        </ContainerView>
                    </ContainerScrollView>

                    <WelcomeControllers currentScreen={currentScreen} handleNext={handleNext} handlePrevious={handlePrevious} />
                </Container>
            ) : (
                <Container>
                    <ContainerImage source={image}>
                        <BackButton />

                        <ContainerScrollView>
                            <ContainerView
                                from={{ translateX: -300, opacity: 0 }}
                                animate={{ translateX: 0, opacity: 1 }}
                                transition={{ type: 'timing', duration: 300 }}
                            >
                                {children}
                            </ContainerView>
                        </ContainerScrollView>

                        <WelcomeControllers currentScreen={currentScreen} handleNext={handleNext} handlePrevious={handlePrevious} />
                    </ContainerImage>
                </Container>
            )}
        </>
    )
}

export default WelcomeRoot;