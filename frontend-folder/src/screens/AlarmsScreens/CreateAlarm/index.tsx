import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Container, ContainerButtons, ContainerButtonsView, ContainerDays, ContainerDaysView, ContainerText, DayButton, DayButtonText } from './styled';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';

import Loader from '../../Loader';
import DefaultHeader from '../../../components/common/DefaultHeader';
import alarmsService from '../../../services/alarmsService';
import getDate from '../../../utils/getDate';
import { PropsStack } from '../../../routes';
import { TimePicker } from '../../../components/common/TimePicker';
import DatePicker from '../../../components/Alarms/DatePicker';

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

    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [date, setDate] = useState<Date | null>(null);
    const [alarmTitle, setAlarmTitle] = useState<string>("");
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
            const trimmedTitle = alarmTitle.trim();

            if (trimmedTitle === "") {
                Alert.alert("Aviso", "Digite um título para o alarme!");
                return;
            } else {
                const alarmTime = new Date();
                alarmTime.setHours(hour, minute, 0, 0);

                const params = { title: trimmedTitle, hour: alarmTime, days, date: date, status: true };

                const { status } = await alarmsService.saveAlarm(params);

                if (status === 201) {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

                    navigation.navigate("Alarms", { newAlarm: true });
                }
            }
        } catch (err) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

            Alert.alert('Erro', 'Erro ao salvar alarme');
        } finally {
            setIsLoading(false);
        }
    }

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
                        {date
                            ? <ContainerText>{getDate(date.toString())}</ContainerText>
                            : <ContainerText>Nenhuma data selecionada...</ContainerText>
                        }
                        <TimePicker.Root>
                            <TimePicker.List length={24} setPicker={setHour} initialValue={12} />
                            <TimePicker.Separator />
                            <TimePicker.List length={60} setPicker={setMinute} initialValue={30} />
                        </TimePicker.Root>

                        <DatePicker date={date} setDate={setDate} />

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
        </Container>
    )
}

export default CreateAlarm;