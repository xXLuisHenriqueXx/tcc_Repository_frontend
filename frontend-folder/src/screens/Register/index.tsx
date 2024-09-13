import React, { useState } from 'react';
import { Alert } from 'react-native';
import { BackButton, Container, ContainerForm, ContainerText, ContainerView, Input, InputContainer, NormalText, RegisterButton, RegisterButtonText, Title } from './styled';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather, Entypo } from "@expo/vector-icons";

import Loader from '../Loader';
import { PropsStack } from '../../routes';
import useAuth from '../../hook/useAuth';

interface fieldsProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigation = useNavigation<PropsStack>();
  const theme = useTheme();
  
  const [fields, setFields] = useState<fieldsProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();

  const handleRegister = async () => {
    setIsLoading(true);

    try {
      const trimmedName = fields.name.trim();
      const trimmedEmail = fields.email.trim();
      const trimmedPassword = fields.password.trim();
      const trimmedConfirmPassword = fields.confirmPassword.trim();
      
      if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
        Alert.alert("Aviso", "Preencha todos os campos!");
        return;
      }
  
      if (trimmedPassword.length < 8) {
        Alert.alert("Aviso", "A senha deve ter no mínimo 8 caracteres!");
        return;
      }
  
      if (trimmedPassword != trimmedConfirmPassword) {
        Alert.alert("Aviso", "As senhas são diferentes!");
        return;
      }
      
      register(trimmedName, trimmedEmail, trimmedPassword);
    } catch (error) {
      Alert.alert("Erro", "Erro ao realizar cadastro!");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Loader type='load' />

  return (
    <Container>
      <BackButton onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={RFValue(20)} color={theme.colors.bgColor} />
      </BackButton>

      <ContainerView>
        <ContainerText>
          <Title>Que bom te ver aqui!</Title>
          <NormalText>Para prosseguir realize o cadastro nos campos abaixo!</NormalText>
        </ContainerText>

        <ContainerForm
          from={{translateY: 300, opacity: 0}}
          animate={{translateY: 0, opacity: 1}}
          transition={{  type: 'timing', duration: 200 }}
        >
          <InputContainer>
            <Entypo name="user" size={RFValue(22)} color={theme.colors.highlightColor} />
            <Input
              placeholder='Digite seu nome de usuário...'
              placeholderTextColor={theme.colors.textInactive}
              value={fields.name}
              onChangeText={(text) => {
                setFields({ ...fields, name: text })
              }}
            />
          </InputContainer>

          <InputContainer>
            <Entypo name="mail" size={RFValue(22)} color={theme.colors.highlightColor} />
            <Input
              placeholder='Digite seu email...'
              placeholderTextColor={theme.colors.textInactive}
              value={fields.email}
              onChangeText={(text) => {
                setFields({ ...fields, email: text })
              }}
            />
          </InputContainer>

          <InputContainer>
            <Entypo name="lock" size={RFValue(22)} color={theme.colors.highlightColor} />
            <Input
              placeholder='Digite sua senha...'
              placeholderTextColor={theme.colors.textInactive}
              value={fields.password}
              onChangeText={(text) => {
                setFields({ ...fields, password: text })
              }}
              secureTextEntry
            />
          </InputContainer>

          <InputContainer>
            <Entypo name="lock" size={RFValue(22)} color={theme.colors.highlightColor} />
            <Input
              placeholder='Digite sua senha novamente...'
              placeholderTextColor={theme.colors.textInactive}
              value={fields.confirmPassword}
              onChangeText={(text) => {
                setFields({ ...fields, confirmPassword: text })
              }}
              secureTextEntry
            />
          </InputContainer>

          <RegisterButton onPress={handleRegister} disabled={isLoading}>
            <RegisterButtonText>CADASTRAR</RegisterButtonText>
            <Feather name='arrow-right-circle' size={RFValue(26)} color={theme.colors.bgColor} style={{ position: "absolute", right: RFValue(16) }} />
          </RegisterButton>
        </ContainerForm>
      </ContainerView>
    </Container>
  )
}

export default Register;