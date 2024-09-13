import React, { RefObject, useRef } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, ViewToken } from 'react-native';
import { Container, ContainerRender, ContainerRenderText, SeparatorText } from './styled';
import { RFValue } from 'react-native-responsive-fontsize';

interface PomodorTimerPickerProps {
    setHour: (hour: number) => void;
    setMinute: (minute: number) => void;
    setSecond: (second: number) => void;
}

const hoursData = Array.from({ length: 24 }, (_, i) => i);
const minutesData = Array.from({ length: 60 }, (_, i) => i);
const secondsData = Array.from({ length: 60 }, (_, i) => i);

const PomodorTimerPicker = ({ setHour, setMinute, setSecond }: PomodorTimerPickerProps) => {
    const hourListRef = useRef<FlatList>(null);
    const minuteListRef = useRef<FlatList>(null);
    const secondListRef = useRef<FlatList>(null);

    const onViewableItemsChanged = (setFunction: (value: number) => void) => {
        return ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
            const selectedItem = viewableItems[0].item;
            setFunction(selectedItem);
        }
    };

    const onMomentumScrollEnd = (ref: RefObject<FlatList>, data: number[], setFunction: (value: number) => void) => {
        return (event: NativeSyntheticEvent<NativeScrollEvent>) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            const itemHeight = RFValue(100);
            const index = Math.round(offsetY / itemHeight);
            const selectedItem = data[index];
            ref.current?.scrollToIndex({ index, animated: true });
            setFunction(selectedItem);
        }
    };

    return (
        <Container>
            <FlatList
                style={{ height: RFValue(100), width: RFValue(40) }}
                ref={hourListRef}
                data={hoursData}
                keyExtractor={item => item.toString()}
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged(setHour)}
                onMomentumScrollEnd={onMomentumScrollEnd(hourListRef, hoursData, setHour)}
                renderItem={({ item }) => (
                    <ContainerRender>
                        <ContainerRenderText>{item.toString().padStart(2, "0")}</ContainerRenderText>
                    </ContainerRender>
                )}
            />
            <SeparatorText>:</SeparatorText>
            <FlatList
                style={{ height: RFValue(100), width: RFValue(40) }}
                ref={minuteListRef}
                data={minutesData}
                keyExtractor={item => item.toString()}
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged(setMinute)}
                onMomentumScrollEnd={onMomentumScrollEnd(minuteListRef, minutesData, setMinute)}
                renderItem={({ item }) => (
                    <ContainerRender>
                        <ContainerRenderText>{item.toString().padStart(2, "0")}</ContainerRenderText>
                    </ContainerRender>
                )}
            />
            <SeparatorText>:</SeparatorText>
            <FlatList
                style={{ height: RFValue(100), width: RFValue(40) }}
                ref={secondListRef}
                data={secondsData}
                keyExtractor={item => item.toString()}
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged(setSecond)}
                onMomentumScrollEnd={onMomentumScrollEnd(secondListRef, secondsData, setSecond)}
                renderItem={({ item }) => (
                    <ContainerRender>
                        <ContainerRenderText>{item.toString().padStart(2, "0")}</ContainerRenderText>
                    </ContainerRender>
                )}
            />
        </Container>
    )
}

export default PomodorTimerPicker;