import React, { RefObject, useEffect, useRef } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, ViewToken } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ContainerRender, ContainerRenderText } from './styled';

interface TimePickerListProps {
    length: number;
    setPicker: (value: number) => void;
    initialValue?: number;
}

const TimePickerList = ({ length, setPicker, initialValue }: TimePickerListProps ) => {
    const pickerData = Array.from({ length: length }, (_, i) => i);
    
    const pickerListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (pickerListRef.current) {
            const itemHeight = RFValue(100);
            const initialIndex = pickerData.indexOf(initialValue || 0);
            if (initialIndex !== -1) {
                pickerListRef.current.scrollToIndex({ index: initialIndex, animated: false });
            }
        }
    }, [initialValue]);

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

    const getItemLayout = (_: any, index: number) => ({
        length: RFValue(100),
        offset: RFValue(100) * index,
        index,
    });

    const onScrollToIndexFailed = (info: { index: number; highestMeasuredFrameIndex: number; averageItemLength: number }) => {
        const wait = new Promise(resolve => setTimeout(resolve, 500));
        wait.then(() => {
            pickerListRef.current?.scrollToIndex({ index: info.index, animated: true });
        });
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
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            getItemLayout={getItemLayout}
            onScrollToIndexFailed={onScrollToIndexFailed}
            renderItem={({ item }) => (
                <ContainerRender>
                    <ContainerRenderText>{item.toString().padStart(2, "0")}</ContainerRenderText>
                </ContainerRender>
            )}
        />
    )
}

export default TimePickerList;