import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import WebView from 'react-native-webview';
import queryString from 'query-string';
import paypalApi from '../../utils/paypalApi';

const Pay = () => {
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [paymentProcessed, setPaymentProcessed] = useState(false);

  const onPressPaypal = async () => {
    try {
      const token = await paypalApi.generateToken();
      const {links} = await paypalApi.createOrder(token);

      setAccessToken(token);

      if (links) {
        const approvalLink = links.find(link => link?.rel === 'approve');
        setPaypalUrl(approvalLink?.href);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onUrlChange = webviewState => {
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState();
      return;
    }

    if (
      webviewState.url.includes('https://example.com/return') &&
      !paymentProcessed
    ) {
      const {token} = queryString.parseUrl(webviewState.url).query;

      if (token) {
        paymentSuccess(token);
      }
    }
  };

  const paymentSuccess = async id => {
    if (paymentProcessed) {
      return;
    }

    try {
      const response = await paypalApi.capturePayment(id, accessToken);
      console.log('Capture Payment Response:', response);
      // Replace the Alert with your custom or external notification component
      Alert.alert('Payment successful...!!!');
      setPaymentProcessed(true);
      clearPaypalState();
    } catch (error) {
      console.error('Error capturing payment:', error);
    }
  };

  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPressPaypal}>
        <Image
          style={{width: 50, height: 50}}
          source={{
            uri: 'https://th.bing.com/th/id/OIP.wBKSzdf1HTUgx1Ax_EecKwHaHa?rs=1&pid=ImgDetMain',
          }}
        />
      </TouchableOpacity>

      <Modal visible={!!paypalUrl}>
        <TouchableOpacity onPress={clearPaypalState} style={{margin: 24}}>
          <Text>Closed</Text>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <WebView
            source={{uri: paypalUrl}}
            onNavigationStateChange={onUrlChange}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginHorizontal: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Pay;
