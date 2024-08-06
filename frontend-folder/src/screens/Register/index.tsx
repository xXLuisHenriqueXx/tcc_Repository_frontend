import React, { useState } from 'react'
import { BackButton, Container, ContainerForm, ContainerText, ContainerView, Input, InputContainer, NormalText, RegisterButton, RegisterButtonText, Title } from './styled'
import { Feather, Entypo } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'
import { PropsStack } from '../../routes'
import { useTheme } from 'styled-components'
import useAuth from '../../hook/useAuth'
import { Alert } from 'react-native'

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


  const { register } = useAuth();

  const handleRegister = async () => {
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
    Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
  }

  return (
    <Container>
      <BackButton activeOpacity={0.8} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color={theme.colors.bgColor} />
      </BackButton>

      <ContainerView>
        <ContainerText>
          <Title>Que bom te ver aqui!</Title>
          <NormalText>Para prosseguir realize o cadastro nos campos abaixo!</NormalText>
        </ContainerText>

        <ContainerForm>
          <InputContainer>
            <Entypo name="user" size={25} color={theme.colors.highlightColor} />
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
            <Entypo name="mail" size={25} color={theme.colors.highlightColor} />
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
            <Entypo name="lock" size={25} color={theme.colors.highlightColor} />
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
            <Entypo name="lock" size={25} color={theme.colors.highlightColor} />
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

          <RegisterButton activeOpacity={0.8} onPress={handleRegister}>
            <RegisterButtonText>CADASTRAR</RegisterButtonText>
            <Feather name='arrow-right-circle' size={30} color={theme.colors.bgColor} style={{ position: "absolute", right: 30 }} />
          </RegisterButton>
        </ContainerForm>
      </ContainerView>
    </Container>
  )
}

export default Register;