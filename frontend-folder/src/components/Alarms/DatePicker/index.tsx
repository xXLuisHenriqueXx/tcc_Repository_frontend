import React, { useEffect, useState } from 'react';
import { DateButton } from './styled';
import { Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import * as Haptics from 'expo-haptics';
import { CalendarDays } from 'lucide-react-native';

interface DatePickerProps {
    date: Date | null;
    setDate: (date: Date) => void;
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {
    const theme = useTheme();

    const [show, setShow] = useState<boolean>(false);
    const [mode, setMode] = useState<"date" | "time">('date');
    const [dateState, setDateState] = useState<Date>(new Date());

    useEffect(() => {
        if (date) {
            setDateState(date);
        }
    }, [date]);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || dateState;
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

    return (
        <>
            <DateButton onPress={() => {
                Haptics.selectionAsync();

                showDatepicker();
            }}>
                <CalendarDays size={RFValue(22)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
            </DateButton>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dateState}
                    mode={'date'}
                    display="calendar"
                    onChange={onChange}
                />
            )}
        </>
    )
}

export default DatePicker;