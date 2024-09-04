import React, { useRef, useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Alert, Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { Container, ContainerButtons, ContainerButtonsView, ContainerDays, ContainerDaysView, ContainerText, DateButton, DayButton, DayButtonText } from './styled';
import { FontAwesome5 } from '@expo/vector-icons';
import { PropsStack } from '../../routes';
import uuid from 'react-native-uuid';
import DefaultHeader from '../../components/common/DefaultHeader/Index';
import Loader from '../Loader';
import { MotiView } from 'moti';
import alarmsService from '../../services/alarmsService';
import HourMinutesPicker from '../../components/Alarms/HourMInutesPicker';

type DaysState = {
    sunday: boolean,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean
}

const CreateAlarm = () => {
    const navigation = useNavigation<PropsStack>();
    const theme = useTheme();

    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [alarmTitle, setAlarmTitle] = useState<string>("");
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState<"date" | "time">('date');
    const [show, setShow] = useState(false);
    const [days, setDays] = useState<DaysState>({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSaveAlarm = async () => {
        setIsLoading(true);

        try {
            if (alarmTitle === "") {
                Alert.alert("Aviso", "Digite um título para o alarme!");
                return;
            } else {
                const title = alarmTitle.trim();

                const alarmTime = new Date();
                alarmTime.setHours(hour);
                alarmTime.setMinutes(minute);

                await alarmsService.saveAlarm("@alarms", { _id: uuid.v4().toString(), title, hour: alarmTime, days, status: true });
                navigation.navigate("Alarms", { newAlarm: true });

                setIsLoading(false);
            }
        } catch (err) {
            Alert.alert('Erro', 'Erro ao salvar alarme');
        } finally {
            setIsLoading(false);
        }
    }

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode: "date") => {
        setShow(true);
        setMode('date');
    };

    const showDatepicker = () => {
        showMode('date');
    };

    if (isLoading) return <Loader type='save' />

    return (
        <Container>
            <DefaultHeader title={alarmTitle} setTitle={setAlarmTitle} handleSave={handleSaveAlarm} placeholderText='Título do alarme...' marginBottom={0} />

            <MotiView
                from={{ translateY: -300, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{
                    type: 'timing',
                    duration: 200,
                }}
            >
                <ContainerButtons>
                    <ContainerButtonsView>
                        <ContainerText>Hora</ContainerText>
                        <HourMinutesPicker setHour={setHour} setMinute={setMinute} />

                        <DateButton onPress={showDatepicker}>
                            <FontAwesome5 name="calendar" size={25} color={theme.colors.highlightColor} />
                        </DateButton>

                        <ContainerDaysView>
                            <ContainerText>Dias da semana</ContainerText>
                            <ContainerDays>
                                <DayButton selected={days.sunday} onPress={() => setDays({ ...days, sunday: !days.sunday })}><DayButtonText>D</DayButtonText></DayButton>
                                <DayButton selected={days.monday} onPress={() => setDays({ ...days, monday: !days.monday })}><DayButtonText>S</DayButtonText></DayButton>
                                <DayButton selected={days.tuesday} onPress={() => setDays({ ...days, tuesday: !days.tuesday })}><DayButtonText>T</DayButtonText></DayButton>
                                <DayButton selected={days.wednesday} onPress={() => setDays({ ...days, wednesday: !days.wednesday })}><DayButtonText>Q</DayButtonText></DayButton>
                                <DayButton selected={days.thursday} onPress={() => setDays({ ...days, thursday: !days.thursday })}><DayButtonText>Q</DayButtonText></DayButton>
                                <DayButton selected={days.friday} onPress={() => setDays({ ...days, friday: !days.friday })}><DayButtonText>S</DayButtonText></DayButton>
                                <DayButton selected={days.saturday} onPress={() => setDays({ ...days, saturday: !days.saturday })}><DayButtonText>S</DayButtonText></DayButton>
                            </ContainerDays>
                        </ContainerDaysView>
                    </ContainerButtonsView>
                </ContainerButtons>
            </MotiView>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    display="calendar"
                    onChange={onChange}
                />
            )}
        </Container>
    )
}

export default CreateAlarm;