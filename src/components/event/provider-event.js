import AgoraRTC from "agora-rtc-sdk-ng"
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
  token: "006b7d7700e9a7745ceb0cde8756ac3dde0IADUsSSzH3dhgNP35RRUzMtRK2u5wd9JbylAKD8wzHkkbo4kO3kAAAAAEAALtir+ePSRYAEAAQB49JFg" // super temp
};


export default class ProviderEvent extends React.Component {

  renderControlTray() {
  }

  async componentDidMount() {
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });   
    await rtc.client.join(rtc_options.appId, rtc_options.channel, rtc_options.token);
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
  }

  render() {
    return (
      null
    );
  }
}