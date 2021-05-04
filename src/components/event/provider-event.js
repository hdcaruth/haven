import AgoraRTC from "agora-rtc-sdk-ng"
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createElement } from "react-native-web";


// Trying with vanilla React Native Agora Client
import {Platform, ScrollView, Text, TouchableOpacity, PermissionsAndroid} from 'react-native'
// Import the RtcEngine class and view rendering components into your project.
import RtcEngine, {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora'

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

  renderProviderVideo() {
    // Style this. Upper lefthand corner? 
    return <div width={640} height={500}></div>;
  }

  init = async () => {
    this._engine = await RtcEngine.create(appId)
    // Enable the video module.
    await this._engine.enableVideo()

    // Listen for the JoinChannelSuccess callback.
    // This callback occurs when the local user successfully joins the channel.
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed)
    })
  }

  _renderVideos = () => {
    const {joinSucceed} = this.state
    return (
        <View>
            <RtcLocalView.SurfaceView
                style={styles.max}
                channelId={this.state.channelName}
                renderMode={VideoRenderMode.Hidden}/>
        </View>
    );
}

  componentDidMount() {
    this.init();
  }

  async componentDidMount() {
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });   
    await rtc.client.join(rtc_options.appId, rtc_options.channel, rtc_options.token);
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    console.log(rtc.localVideoTrack);

    // const rig = React.createElement("div", {style: {width: "640", height: "480"}}, null);
    // rig.style.width = "640px";
    // rig.style.height = "480px";

    const rig = createElement("div", {id: 'rig', style: {width: "640", height: "480"}}, null);
    rtc.localVideoTrack.play(rig);
    this.setState({isVideoContainerCreated: true});
    
    await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
		
    rtc.client.on("user-published", async (user, mediaType) => {

      console.log(user); 
      console.log(mediaType);
			// await rtc.client.subscribe(user, mediaType);
			// if (mediaType === "audio") {
			// 	const remoteAudioTrack = user.audioTrack;
			// 	remoteAudioTrack.play();
      //           if (this.isProvider(user.uid)) {
      //               this.setState({provider: this.getName(user.uid)});
      //           } else {
      //               this.setState(prevState => ({presentUsers: prevState.presentUsers.concat(user.uid)}));
      //           }
			// }
		});

  }

  render() {
    console.error('here');
    return null;
    // return React.createElement("div", {id: 'rig', style: {width: "640", height: "480"}}, null);
    // return renderProviderVideo(); 
  }
}