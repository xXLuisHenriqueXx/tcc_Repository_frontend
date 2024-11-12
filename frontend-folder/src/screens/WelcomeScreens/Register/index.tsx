import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Container, ContainerForm, ContainerText, ContainerView, Input, InputContainer, NormalText, RegisterButton, RegisterButtonText, Title } from './styled';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Haptics from 'expo-haptics';
import { ArrowRightCircle, Lock, Mail, User } from 'lucide-react-native';

import useAuth from '../../../hook/useAuth';
import BackButton from '../../../components/common/BackButton';

interface fieldsProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const theme = useTheme();
  const { register } = useAuth();

  const [fields, setFields] = useState<fieldsProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    Haptics.selectionAsync();
    
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

      await register(trimmedName, trimmedEmail, trimmedPassword);

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      Alert.alert("Erro", "Erro ao realizar cadastro!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <BackButton />

      <ContainerView>
        <ContainerText>
          <Title>Bom te ver aqui!</Title>
          <NormalText>Para prosseguir realize o cadastro nos campos abaixo!</NormalText>
        </ContainerText>

        <ContainerForm
          from={{ translateY: 300, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 200 }}
        >
          <InputContainer>
            <User size={RFValue(22)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
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
            <Mail size={RFValue(22)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
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
            <Lock size={RFValue(22)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
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
            <Lock size={RFValue(22)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
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
            {!isLoading ? (
              <>
                <RegisterButtonText>CADASTRAR</RegisterButtonText>
                <ArrowRightCircle style={{ position: "absolute", right: RFValue(16) }} size={RFValue(26)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
              </>
            ) : (
              <ActivityIndicator size={RFValue(26)} color={theme.colors.bgColor} />
            )}
          </RegisterButton>
        </ContainerForm>
      </ContainerView>
    </Container>
  )
}

export default Register;