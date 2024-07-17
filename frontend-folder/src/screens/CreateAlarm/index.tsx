import React, { useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton, ButtonAdd, Container, ContainerButtons, ContainerButtonsView, ContainerDays, ContainerDaysView, ContainerHeader, DateButton, DateButtonText, DayButton, DayButtonText, Input, InputContainer, InputTitle, Title } from './styled';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { saveAlarm } from '../../services/alarmsService';
import { PropsStack } from '../../routes';
import uuid from 'react-native-uuid';

const CreateAlarm = () => {
    const navigation = useNavigation<PropsStack>();
    const theme = useTheme();

    const [hour, setHour] = useState(new Date());
    const [title, setTitle] = useState("");
    const [mode, setMode] = useState<"date" | "time">('date');
    const [show, setShow] = useState(false);
    const [days, setDays] = useState({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
    });

    const handleSaveAlarm = async () => {
        if (title === "") {
            alert("Digite um título para o alarm");
            return;
        } else {
            await saveAlarm("@alarms", { _id: uuid.v4().toString(), title, hour, days, status: false });
            navigation.navigate("Alarms", { newAlarm: true });
        }
    }

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || hour;
        setShow(Platform.OS === 'ios');
        setHour(currentDate);
    };

    const showMode = (currentMode: "time") => {
        setShow(true);
        setMode('time');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <Container>
            <ContainerHeader>
                <BackButton onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color={theme.colors.bgColor} />
                </BackButton>

                <Title>Novo alarme</Title>

                <ButtonAdd
                    activeOpacity={0.85}
                    onPress={handleSaveAlarm}
                >
                    <Feather name="check" size={25} color={theme.colors.text} />
                </ButtonAdd>
            </ContainerHeader>

            <ContainerButtons>
                <ContainerButtonsView>
                    <InputContainer>
                        <InputTitle>Título</InputTitle>
                        <Input
                            placeholder="Digite um título"
                            placeholderTextColor={theme.colors.textInactive}
                            value={title}
                            onChangeText={setTitle}
                        />
                    </InputContainer>
                    <DateButton onPress={showTimepicker} activeOpacity={1}>
                        <DateButtonText>{hour.getHours()}:{hour.getMinutes()}</DateButtonText>
                        <FontAwesome5 name="edit" size={25} color={theme.colors.highlightColor} />
                    </DateButton>

                    <ContainerDaysView>
                        <InputTitle>Dias da semana</InputTitle>
                        <ContainerDays>
                            <DayButton selected={days.sunday} onPress={() => setDays({ ...days, sunday: !days.sunday })} activeOpacity={1}><DayButtonText>D</DayButtonText></DayButton>
                            <DayButton selected={days.monday} onPress={() => setDays({ ...days, monday: !days.monday })} activeOpacity={1}><DayButtonText>S</DayButtonText></DayButton>
                            <DayButton selected={days.tuesday} onPress={() => setDays({ ...days, tuesday: !days.tuesday })} activeOpacity={1}><DayButtonText>T</DayButtonText></DayButton>
                            <DayButton selected={days.wednesday} onPress={() => setDays({ ...days, wednesday: !days.wednesday })} activeOpacity={1}><DayButtonText>Q</DayButtonText></DayButton>
                            <DayButton selected={days.thursday} onPress={() => setDays({ ...days, thursday: !days.thursday })} activeOpacity={1}><DayButtonText>Q</DayButtonText></DayButton>
                            <DayButton selected={days.friday} onPress={() => setDays({ ...days, friday: !days.friday })} activeOpacity={1}><DayButtonText>S</DayButtonText></DayButton>
                            <DayButton selected={days.saturday} onPress={() => setDays({ ...days, saturday: !days.saturday })} activeOpacity={1}><DayButtonText>S</DayButtonText></DayButton>
                        </ContainerDays>
                    </ContainerDaysView>
                </ContainerButtonsView>
            </ContainerButtons>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={hour}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </Container>
    )
}

export default CreateAlarm;