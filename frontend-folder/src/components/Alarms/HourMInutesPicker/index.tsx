import React from 'react';
import { FlatList } from 'react-native';
import { Container, ContainerRender, ContainerRenderText, SeparatorText } from './styled';
import { useTheme } from 'styled-components';

interface HourMinutesPickerProps {
    hour: number;
    minute: number;
    setHour: (hour: number) => void;
    setMinute: (minute: number) => void;
}

const hoursData = Array.from({ length: 24 }, (_, i) => i);
const minutesData = Array.from({ length: 60 }, (_, i) => i);

const HourMinutesPicker = ({ hour, minute, setHour, setMinute }: HourMinutesPickerProps) => {
    const theme = useTheme();

    return (
        <Container>
            <FlatList
                style={{ height: 200, width: 50 }}
                data={hoursData}
                keyExtractor={item => item.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ContainerRender onPress={
                        () => {
                            setHour(item);
                        }
                    }>
                        <ContainerRenderText>{item}</ContainerRenderText>
                    </ContainerRender>
                )}
            />
            <SeparatorText>:</SeparatorText>
            <FlatList
                style={{ height: 200, width: 50 }}
                data={minutesData}
                keyExtractor={item => item.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ContainerRender onPress={
                        () => {
                            setMinute(item);
                        }
                    }>
                        <ContainerRenderText>{item}</ContainerRenderText>
                    </ContainerRender>
                )}
            />
        </Container>
    )
}

export default HourMinutesPicker;