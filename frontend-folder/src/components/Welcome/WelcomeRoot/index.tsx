import React, { ReactNode } from 'react';
import { Container, ContainerImage, ContainerScrollView, ContainerView } from './styled';
import { WelcomeComponent } from '..';
import BackButton from '../../common/BackButton';

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
                        <ContainerView>
                            {children}
                        </ContainerView>
                    </ContainerScrollView>

                    <WelcomeComponent.Controllers currentScreen={currentScreen} handleNext={handleNext} handlePrevious={handlePrevious} />
                </Container>
            ) : (
                <Container>
                    <ContainerImage source={image}>
                        <BackButton />

                        <ContainerScrollView>
                            <ContainerView>
                                {children}
                            </ContainerView>
                        </ContainerScrollView>

                        <WelcomeComponent.Controllers currentScreen={currentScreen} handleNext={handleNext} handlePrevious={handlePrevious} />
                    </ContainerImage>
                </Container>
            )}
        </>
    )
}

export default WelcomeRoot;