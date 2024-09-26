import React, { RefObject, useRef } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, ViewToken } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ContainerRender, ContainerRenderText } from './styled';

interface TimePickerListProps {
    length: number;
    setPicker: (value: number) => void;
}

const TimePickerList = ({ length, setPicker }: TimePickerListProps ) => {
    const pickerData = Array.from({ length: length }, (_, i) => i);
    
    const pickerListRef = useRef<FlatList>(null);

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
        <FlatList
            style={{ height: RFValue(100), width: RFValue(40) }}
            ref={pickerListRef}
            data={pickerData}
            keyExtractor={item => item.toString()}
            showsVerticalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged(setPicker)}
            onMomentumScrollEnd={onMomentumScrollEnd(pickerListRef, pickerData, setPicker)}
            renderItem={({ item }) => (
                <ContainerRender>
                    <ContainerRenderText>{item.toString().padStart(2, "0")}</ContainerRenderText>
                </ContainerRender>
            )}
        />
    )
}

export default TimePickerList;