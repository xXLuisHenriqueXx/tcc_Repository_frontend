import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { Container, ContainerButtons, ContainerButtonsView, ContainerDays, ContainerDaysView, ContainerText, DateButton, DayButton, DayButtonText } from './styled';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import uuid from 'react-native-uuid';
import { FontAwesome5 } from '@expo/vector-icons';
import { MotiView } from 'moti';

import Loader from '../Loader';
import DefaultHeader from '../../components/common/DefaultHeader';
import HourMinutesPicker from '../../components/Alarms/HourMInutesPicker';
import alarmsService from '../../services/alarmsService';
import getDate from '../../utils/getDate';
import { PropsStack } from '../../routes';

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
    const [date, setDate] = useState<Date>(new Date());
    const [mode, setMode] = useState<"date" | "time">('date');
    const [show, setShow] = useState<boolean>(false);
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

                await alarmsService.saveAlarm("@alarms", { _id: uuid.v4().toString(), title, hour: alarmTime, days, date: null, status: true });

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
                transition={{ type: 'timing', duration: 200 }}
            >
                <ContainerButtons>
                    <ContainerButtonsView>
                        <ContainerText>{getDate(date.toString())}</ContainerText>
                        <HourMinutesPicker setHour={setHour} setMinute={setMinute} />

                        <DateButton onPress={showDatepicker}>
                            <FontAwesome5 name="calendar" size={25} color={theme.colors.highlightColor} />
                        </DateButton>

                        <ContainerDaysView>
                            <ContainerDays>
                                <DayButton selected={days.sunday} onPress={() => setDays({ ...days, sunday: !days.sunday })}><DayButtonText selected={days.sunday}>D</DayButtonText></DayButton>
                                <DayButton selected={days.monday} onPress={() => setDays({ ...days, monday: !days.monday })}><DayButtonText selected={days.monday}>S</DayButtonText></DayButton>
                                <DayButton selected={days.tuesday} onPress={() => setDays({ ...days, tuesday: !days.tuesday })}><DayButtonText selected={days.tuesday}>T</DayButtonText></DayButton>
                                <DayButton selected={days.wednesday} onPress={() => setDays({ ...days, wednesday: !days.wednesday })}><DayButtonText selected={days.wednesday}>Q</DayButtonText></DayButton>
                                <DayButton selected={days.thursday} onPress={() => setDays({ ...days, thursday: !days.thursday })}><DayButtonText selected={days.thursday}>Q</DayButtonText></DayButton>
                                <DayButton selected={days.friday} onPress={() => setDays({ ...days, friday: !days.friday })}><DayButtonText selected={days.friday}>S</DayButtonText></DayButton>
                                <DayButton selected={days.saturday} onPress={() => setDays({ ...days, saturday: !days.saturday })}><DayButtonText selected={days.saturday}>S</DayButtonText></DayButton>
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