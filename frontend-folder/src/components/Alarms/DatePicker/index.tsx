import React, { useState } from 'react';
import { Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { DateButton } from './styled';
import { CalendarDays } from 'lucide-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

interface DatePickerProps {
    date: Date;
    setDate: (date: Date) => void;
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {
    const theme = useTheme();

    const [show, setShow] = useState<boolean>(false);
    const [mode, setMode] = useState<"date" | "time">('date');

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

    return (
        <>
            <DateButton onPress={showDatepicker}>
                <CalendarDays size={RFValue(22)} color={theme.colors.highlightColor} strokeWidth={RFValue(2)} />
            </DateButton>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    display="calendar"
                    onChange={onChange}
                />
            )}
        </>
    )
}

export default DatePicker;