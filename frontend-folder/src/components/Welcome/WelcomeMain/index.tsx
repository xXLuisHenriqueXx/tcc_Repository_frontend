import React from 'react';
import { ContainerText, Logo, NormalText, Title } from './styled';
import { RFValue } from 'react-native-responsive-fontsize';


const logoImage = require("../../../assets/images/common/logo.png");

const WelcomeMain = () => {
    return (
        <>
            <Logo source={logoImage} />

            <ContainerText>
                <Title>Bem vindo(a)!</Title>
                <NormalText>
                    Ficamos felizes em ter sua partcipação em nosso aplicativo, juntos com certeza seremos capazes de tornar o momentos de aprendizado mais leves e dinâmicos...
                </NormalText>
                <NormalText style={{ marginTop: RFValue(20) }}>
                    Após realizar o cadastro ou acessar sua conta, você terá acesso as funcionalidades:
                </NormalText>
            </ContainerText>
        </>
    )
}

export default WelcomeMain;