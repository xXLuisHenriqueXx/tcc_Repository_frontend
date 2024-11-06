import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { PropsStack } from '../../../routes';
import { WelcomeComponent } from '../../../components/Welcome';

const featuresData = [
  {
    title: "Alarmes",
    text: "Você será capaz de gerenciar alarmes, para lembrar dos momentos de estudos ou eventos importantes como provas.",
    featuresText: {
      1: "Visualizar alarmes",
      2: "Salvar novo alarme",
      3: "Atualizar alarme",
      4: "Apagar alarme"
    }
  },
  {
    title: "Notas",
    text: "Você será capaz de gerenciar notas, para lembrar dos conteúdos estudados.",
    featuresText: {
      1: "Visualizar notas",
      2: "Salvar nova nota",
      3: "Atualizar nota",
      4: "Apagar nota"
    }
  },
  {
    title: "Listas de tarefas",
    text: "Você será capaz de gerenciar listas de tarefa, para lembrar das tarefas ou eventos de estudos a serem realizados.",
    featuresText: {
      1: "Visualizar listas de tarefas",
      2: "Salvar nova lista de tarefas",
      3: "Atualizar lista de tarefas",
      4: "Apagar lista de tarefas",
    }
  },
  {
    title: "Rastreabilidade",
    text: "Você será capaz de visualizar informações a respeito do que já foi feito no aplicativo, em relação à alarmes, notas e listas de tarefas.",
    featuresText: {
      1: "Visualizar informações de alarmes",
      2: "Visualizar informações de notas",
      3: "Visualizar informações de listas de tarefas"
    }
  },
]

const Welcome = () => {
  const theme = useTheme();
  const navigation = useNavigation<PropsStack>();
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    setCurrentScreen((prev) => (prev < 5 ? prev + 1 : 5));
  };

  const handlePrevious = () => {
    setCurrentScreen((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNavigateToLogin = () => {
    navigation.navigate("Login");
  }

  const handleNavigateToRegister = () => {
    navigation.navigate("Register");
  }

  return (
    <>
      {currentScreen === 0 && (
        <WelcomeComponent.Root currentScreen={currentScreen} handleNext={handleNext} handlePrevious={handlePrevious}>
          <WelcomeComponent.Main />
        </WelcomeComponent.Root>
      )}

      {currentScreen === 1 && (
        <WelcomeComponent.Root currentScreen={currentScreen} handleNext={handleNext} handlePrevious={handlePrevious} image={theme.images.bgWelcomeAlarms}>
          <WelcomeComponent.Features 
            title={featuresData[0].title}
            text={featuresData[0].text}
            featuresText={featuresData[0].featuresText}
          />
        </WelcomeComponent.Root>
      )}

      {currentScreen === 2 && (
        <WelcomeComponent.Root currentScreen={currentScreen} handleNext={handleNext} handlePrevious={handlePrevious} image={theme.images.bgWelcomeNotes}>
          <WelcomeComponent.Features 
            title={featuresData[1].title}
            text={featuresData[1].text}
            featuresText={featuresData[1].featuresText}
          />
        </WelcomeComponent.Root>
      )}

      {currentScreen === 3 && (
        <WelcomeComponent.Root currentScreen={currentScreen} handleNext={handleNext} handlePrevious={handlePrevious} image={theme.images.bgWelcomeTodos}>
          <WelcomeComponent.Features 
            title={featuresData[2].title}
            text={featuresData[2].text}
            featuresText={featuresData[2].featuresText}
          />
        </WelcomeComponent.Root>
      )}

      {currentScreen === 4 && (
        <WelcomeComponent.Root currentScreen={currentScreen} handleNext={handleNext} handlePrevious={handlePrevious} image={theme.images.bgWelcomeInfos}>
          <WelcomeComponent.Features 
            title={featuresData[3].title}
            text={featuresData[3].text}
            featuresText={featuresData[3].featuresText}
          />
        </WelcomeComponent.Root>
      )}

      {currentScreen === 5 && (
        <WelcomeComponent.Root currentScreen={currentScreen} handleNext={handleNext} handlePrevious={handlePrevious}>
          <WelcomeComponent.Access handleNavigateToLogin={handleNavigateToLogin} handleNavigateToRegister={handleNavigateToRegister} />
        </WelcomeComponent.Root>
      )}
    </>
  )
}

export default Welcome;