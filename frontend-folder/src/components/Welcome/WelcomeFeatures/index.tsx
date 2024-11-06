import React from 'react';
import { ContainerFeatures, ContainerText, FeatureText, FeatureTitle, NormalText, Title } from './styled';

interface WelcomeFeaturesProps {
    title: string;
    text: string;
    featuresText: {
        1: string;
        2: string;
        3: string;
        4?: string;
    }
}

const WelcomeFeatures = ({ title, text, featuresText }: WelcomeFeaturesProps) => {
    return (
        <>
            <ContainerText>
                <Title>{title}</Title>
                <NormalText>
                    {text}
                </NormalText>

                <ContainerFeatures>
                    <FeatureTitle>Funcionalidades</FeatureTitle>
                    <FeatureText>{featuresText[1]}</FeatureText>
                    <FeatureText>{featuresText[2]}</FeatureText>
                    <FeatureText>{featuresText[3]}</FeatureText>
                    {featuresText[4] && <FeatureText>{featuresText[4]}</FeatureText>}
                </ContainerFeatures>

            </ContainerText>
        </>
    )
}

export default WelcomeFeatures;