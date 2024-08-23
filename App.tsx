/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

NfcManager.start();
const {MyService} = NativeModules;
function App(): React.JSX.Element {
  const [NFCtag, setNFCtag] = useState(null as any);
  async function readNdef() {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      setNFCtag({...tag});
      console.warn('Tag found', tag);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  function showToast() {
    MyService.openApp('es.lacaixa.mobile.android.newwapicon');
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text>Scan a Tag</Text>
        {NFCtag && <Text>NFC ID: {NFCtag.id}</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={showToast}>
        <Text>Abrir app del banco</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
