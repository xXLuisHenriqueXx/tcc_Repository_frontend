import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Container, ContainerForm, ContainerText, ContainerView, Input, InputContainer, NormalText, Title, UpdateButton, UpdateButtonText } from './styled';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Haptics from 'expo-haptics';
import { ArrowRightCircle, Lock, Mail, User } from 'lucide-react-native';

import Loader from '../../Loader';
import userService from '../../../services/userService';
import useAuth from '../../../hook/useAuth';
import { PropsNavigationStack, PropsStack } from '../../../routes';
import BackButton from '../../../components/common/BackButton';

type Props = NativeStackScreenProps<PropsNavigationStack, 'UpdateProfile'>;

const UpdateProfile = ({ route }: Props) => {
    const navigation = useNavigation<PropsStack>();
    const theme = useTheme();

    const [fields, setFields] = useState({
        name: "",
        email: "",
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const { logout } = useAuth();

    const { userInfo } = route.params || {};

    useEffect(() => {
        handleSetInfos();
    }, []);

    const handleSetInfos = async () => {
        setFields({
            ...fields,
            name: userInfo?.name || "",
            email: userInfo?.email || "",
        })
    }

    const handleUpdate = async () => {
        setIsLoading(true);

        try {
            const trimmedName = fields.name.trim();
            const trimmedEmail = fields.email.trim();

            if (!trimmedName) {
                Alert.alert("Erro", "Digite um nome!");
                return;
            } else if (!trimmedEmail) {
                Alert.alert("Erro", "Digite um email!");
                return;
            } else {
                const params = {
                    name: trimmedName,
                    email: trimmedEmail
                }

                const response = await userService.updateUserProfile(params);

                if (response.status === 400) {
                    Alert.alert("Erro", "Email já cadastrado!");
                    return;
                }

                if (trimmedEmail != userInfo?.email) {
                    logout();
                }

                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                navigation.navigate("Alarms", { newAlarm: false });
            }
        } catch (error: any) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            
            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = error.response.data.errors.map((err: any) => err.message).join('\n');
                Alert.alert("Erro", errorMessages);
            } else {
                Alert.alert("Erro", "Erro ao realizar cadastro!");
            }
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) return <Loader type='save' />

    return (
        <Container>
            <BackButton />

            <ContainerView>
                <ContainerText>
                    <Title>Edição de perfil</Title>
                    <NormalText>Nesta tela você pode editar seus dados.</NormalText>
                </ContainerText>

                <ContainerForm
                    from={{translateY: 300, opacity: 0}}
                    animate={{translateY: 0, opacity: 1}}
                    transition={{ type: 'timing', duration: 200 }}
                >
                    <InputContainer>
                        <User size={RFValue(22)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
                        <Input
                            value={fields.name}
                            onChangeText={(text) => {
                                setFields({ ...fields, name: text })
                            }}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Mail size={RFValue(22)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
                        <Input
                            value={fields.email}
                            onChangeText={(text) => {
                                setFields({ ...fields, email: text })
                            }}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Lock size={RFValue(22)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
                        <Input
                            placeholder='Digite sua senha atual...'
                            placeholderTextColor={theme.colors.textInactive}
                            secureTextEntry
                        />
                    </InputContainer>

                    <InputContainer>
                        <Lock size={RFValue(22)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
                        <Input
                            placeholder='Digite sua nova senha...'
                            placeholderTextColor={theme.colors.textInactive}
                            secureTextEntry
                        />
                    </InputContainer>

                    <InputContainer>
                        <Lock size={RFValue(22)} color={theme.colors.highlightColor}  strokeWidth={RFValue(2)} />
                        <Input
                            placeholder='Digite sua nova senha novamente...'
                            placeholderTextColor={theme.colors.textInactive}
                            secureTextEntry
                        />
                    </InputContainer>

                    <UpdateButton onPress={handleUpdate} disabled={isLoading}>
                        {!isLoading ? (
                            <>
                                <UpdateButtonText>SALVAR</UpdateButtonText>
                                <ArrowRightCircle style={{ position: "absolute", right: RFValue(16) }} size={RFValue(26)} color={theme.colors.bgColor} strokeWidth={RFValue(2)} />
                            </>
                        ) : (
                            <ActivityIndicator size={RFValue(26)} color={theme.colors.bgColor} />
                        )}
                    </UpdateButton>
                </ContainerForm>
            </ContainerView>
        </Container>
    )
}

export default UpdateProfile