import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Container, ContainerButtons, ContainerButtonsView, ContainerDays, ContainerDaysView, ContainerText, DayButton, DayButtonText } from './styled';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';

import Loader from '../../Loader';
import { PropsNavigationStack, PropsStack } from '../../../routes';
import alarmsService from '../../../services/alarmsService';
import DefaultHeader from '../../../components/common/DefaultHeader';
import getDate from '../../../utils/getDate';
import { TimePicker } from '../../../components/common/TimePicker';
import DatePicker from '../../../components/Alarms/DatePicker';

type Props = NativeStackScreenProps<PropsNavigationStack, 'UpdateAlarm'>

type DaysState = {
    sunday: boolean,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean
}

const UpdateAlarm = ({ route }: Props) => {
    const navigation = useNavigation<PropsStack>();

    const { alarmInfo } = route.params || {};

    const [alarmHour, setAlarmHour] = useState<number>(0);
    const [alarmMinute, setAlarmMinute] = useState<number>(0);
    const [alarmTitle, setAlarmTitle] = useState<string>("");
    const [alarmDate, setAlarmDate] = useState<Date>(new Date());
    const [alarmDays, setAlarmDays] = useState<DaysState>({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        handleSetInfos();
    }, []);

    const handleSetInfos = async () => {
        setAlarmTitle(alarmInfo?.title || "");
        setAlarmHour(alarmInfo?.hour.getHours() || 0);
        setAlarmMinute(alarmInfo?.hour.getMinutes() || 0);
        setAlarmDate(alarmInfo?.hour || new Date());
        setAlarmDays({
            sunday: alarmInfo?.days.sunday || false,
            monday: alarmInfo?.days.monday || false,
            tuesday: alarmInfo?.days.tuesday || false,
            wednesday: alarmInfo?.days.wednesday || false,
            thursday: alarmInfo?.days.thursday || false,
            friday: alarmInfo?.days.friday || false,
            saturday: alarmInfo?.days.saturday || false
        });
    }

    const handleUpdateAlarm = async () => {
        setIsLoading(true);

        try {
            if (alarmTitle === "") {
                Alert.alert("Aviso", "Digite um título para o alarme!");
                return;
            } else {
                const title = alarmTitle.trim();

                const alarmTime = new Date();
                alarmTime.setHours(alarmHour);
                alarmTime.setMinutes(alarmMinute);

                const params = { _id: alarmInfo?._id, title, hour: alarmTime, days: alarmDays, date: alarmDate, status: true };

                const { status } = await alarmsService.updateAlarm(params);

                if (status === 201) {
                    navigation.navigate("Alarms", { newAlarm: true });
                }

                setIsLoading(false);
            }
        } catch (err) {
            Alert.alert('Erro', 'Erro ao salvar alarme');
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) return <Loader type='save' />

    return (
        <Container>
            <DefaultHeader title={alarmTitle} setTitle={setAlarmTitle} handleSave={handleUpdateAlarm} placeholderText='Título do alarme...' marginBottom={0} />

            <MotiView
                from={{ translateY: -300, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: 'timing', duration: 200 }}
            >
                <ContainerButtons>
                    <ContainerButtonsView>
                        <ContainerText>{getDate(alarmDate.toString())}</ContainerText>
                        <TimePicker.Root>
                            <TimePicker.List length={24} setPicker={setAlarmHour} />
                            <TimePicker.Separator />
                            <TimePicker.List length={60} setPicker={setAlarmMinute} />
                        </TimePicker.Root>

                        <DatePicker date={alarmDate} setDate={setAlarmDate} />

                        <ContainerDaysView>
                            <ContainerDays>
                                <DayButton selected={alarmDays.sunday} onPress={() => setAlarmDays({ ...alarmDays, sunday: !alarmDays.sunday })}><DayButtonText selected={alarmDays.sunday}>D</DayButtonText></DayButton>
                                <DayButton selected={alarmDays.monday} onPress={() => setAlarmDays({ ...alarmDays, monday: !alarmDays.monday })}><DayButtonText selected={alarmDays.monday}>S</DayButtonText></DayButton>
                                <DayButton selected={alarmDays.tuesday} onPress={() => setAlarmDays({ ...alarmDays, tuesday: !alarmDays.tuesday })}><DayButtonText selected={alarmDays.tuesday}>T</DayButtonText></DayButton>
                                <DayButton selected={alarmDays.wednesday} onPress={() => setAlarmDays({ ...alarmDays, wednesday: !alarmDays.wednesday })}><DayButtonText selected={alarmDays.wednesday}>Q</DayButtonText></DayButton>
                                <DayButton selected={alarmDays.thursday} onPress={() => setAlarmDays({ ...alarmDays, thursday: !alarmDays.thursday })}><DayButtonText selected={alarmDays.thursday}>Q</DayButtonText></DayButton>
                                <DayButton selected={alarmDays.friday} onPress={() => setAlarmDays({ ...alarmDays, friday: !alarmDays.friday })}><DayButtonText selected={alarmDays.friday}>S</DayButtonText></DayButton>
                                <DayButton selected={alarmDays.saturday} onPress={() => setAlarmDays({ ...alarmDays, saturday: !alarmDays.saturday })}><DayButtonText selected={alarmDays.saturday}>S</DayButtonText></DayButton>
                            </ContainerDays>
                        </ContainerDaysView>
                    </ContainerButtonsView>
                </ContainerButtons>
            </MotiView>
        </Container>
    )
}

export default UpdateAlarm