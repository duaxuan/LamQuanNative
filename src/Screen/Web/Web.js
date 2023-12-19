import React, {useRef, useState} from 'react';
import {Button, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const Web = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const bottomSheetSnapPoints = ['25%', '50%', '75%'];

  const presentBottomSheet = () => {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsBottomSheetOpen(true);
    }, 100);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: isBottomSheetOpen ? 'gray' : 'white',
          }}>
          <View style={{flex: 1}}>
            <Button title="Open Bottom Sheet" onPress={presentBottomSheet} />
          </View>
          {/* Bottom Sheet */}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={2}
            snapPoints={bottomSheetSnapPoints}
            backgroundStyle={{borderRadius: 25}}
            onDismiss={() => setIsBottomSheetOpen(false)}>
            {/* Your content goes here */}
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Web;
