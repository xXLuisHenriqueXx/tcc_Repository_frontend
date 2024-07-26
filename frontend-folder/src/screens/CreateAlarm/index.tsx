import React, { useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { Container, ContainerButtons, ContainerButtonsView, ContainerDays, ContainerDaysView, DateButton, DateButtonText, DayButton, DayButtonText, DayTitle, HourTitle } from './styled';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { saveAlarm } from '../../services/alarmsService';
import { PropsStack } from '../../routes';
import uuid from 'react-native-uuid';
import DefaultHeader from '../../components/common/DefaultHeader/Index';

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
            alert("Digite um título para o alarme");
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
            <DefaultHeader title={title} setTitle={setTitle} handleSave={handleSaveAlarm} placeholderText='Título do alarme...' marginBottom={100} />

            <ContainerButtons>
                <ContainerButtonsView>
                    <HourTitle>Hora do alarme</HourTitle>

                    <DateButton onPress={showTimepicker} activeOpacity={1}>
                        <DateButtonText>{hour.getHours()}:{hour.getMinutes()}</DateButtonText>
                        <FontAwesome5 name="edit" size={25} color={theme.colors.highlightColor} />
                    </DateButton>

                    <ContainerDaysView>
                        <DayTitle>Dias da semana</DayTitle>
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