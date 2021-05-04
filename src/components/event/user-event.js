import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const rtc = {
  client: null,
  localAudioTrack: null,
  localVideoTrack: null,
};

const rtc_options = {
  appId: "b7d7700e9a7745ceb0cde8756ac3dde0",
  channel: "demo_channel_name",
};

export default class UserEvent extends React.Component {

  async componentDidMount() {
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });   
    const uid = Math.random().toString(36).substring(7); // random UID so it's easier to test for now
    await rtc.client.join(options.appId, options.channel, options.token, uid);

    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    
  }

  render() {
    return (
      <View>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}
