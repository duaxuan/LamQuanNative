import {Button, PermissionsAndroid, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Notifications} from 'react-native-notifications';
import messaging from '@react-native-firebase/messaging';

const Notification = ({navigation}) => {
  const handlePress = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      Notifications.postLocalNotification({
        title: 'Thông báo',
        body: 'Đây là một thông báo mẫu',
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Notifications.events().registerNotificationOpened(
      (notification, completion) => {},
    );
    messaging().setBackgroundMessageHandler(async remoteMessage => {});
  }, []);

  return (
    <View>
      <Button title="Gửi thông báo" onPress={handlePress} />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
