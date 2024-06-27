import React, { useState } from 'react'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton, ButtonAdd, Container, ContainerButtons, ContainerHeader, Title } from './styled';
import { Feather } from '@expo/vector-icons';
import { saveAlarm } from '../../services/alarmsService';
import { PropsStack } from '../../routes';
import uuid from 'react-native-uuid';

const CreateAlarm = () => {
    const navigation = useNavigation<PropsStack>();
    const theme = useTheme();

    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState("");
    const [mode, setMode] = useState<"date" | "time">("date");
    const [show, setShow] = useState(false);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode: "date" | "time") => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <Container
            source={theme.images.bgSecondary}
        >
            <ContainerHeader>
                <BackButton onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color={theme.colors.textAlternative} />
                </BackButton>

                <Title>Novo alarme</Title>

                <ButtonAdd
                    activeOpacity={0.85}
                    onPress={async () => {
                        const currentDate = new Date();
                        if (date <= currentDate) {
                            alert("Data inválida");
                            return;
                        } else if (title === "") {
                            alert("Digite um título para o alarm");
                            return;
                        } else {
                            await saveAlarm("@alarms", { _id: uuid.v4().toString(), date: date.toISOString(), title });
                            navigation.navigate("Alarms", { newAlarm: true });
                        }
                    }}
                >
                    <Feather name="check" size={25} color={theme.colors.text} />
                </ButtonAdd>
            </ContainerHeader>

            <ContainerButtons>
            </ContainerButtons>

        </Container>
    )
}

export default CreateAlarm;