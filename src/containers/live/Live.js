import React, {Component} from 'react';
import {connect} from 'react-redux';
import config from '../../config';

import LiveStats from 'components/LiveStats';
import LiveControls from 'components/LiveControls';
import BroadcastControls from 'components/BroadcastControls';
import GoLiveButton from 'components/GoLiveButton';
import Chat from 'components/Chat';
import PillButton from 'components/PillButton';
import styles from './Live.css';

var agoraClient, AgoraRTC, localStream;
var hasVideo = true, hasAudio = true;
var shareUrl = '';
var broadcastId, broadcastUrl, channelKey, waitingPeriodBeforeLive;
var coding;

const tile_canvas = {
  '1': ['span 12/span 24'],
  '2': ['span 12/span 12/13/25', 'span 12/span 12/13/13'],
  '3': ['span 6/span 12', 'span 6/span 12', 'span 6/span 12/7/19'],
  '4': ['span 6/span 12', 'span 6/span 12', 'span 6/span 12', 'span 6/span 12/7/13'],
  '5': ['span 3/span 4/13/9', 'span 3/span 4/13/13', 'span 3/span 4/13/17', 'span 3/span 4/13/21', 'span 9/span 16/10/21'],
  '6': ['span 3/span 4/13/7', 'span 3/span 4/13/11', 'span 3/span 4/13/15', 'span 3/span 4/13/19', 'span 3/span 4/13/23', 'span 9/span 16/10/21'],
  '7': ['span 3/span 4/13/5', 'span 3/span 4/13/9', 'span 3/span 4/13/13', 'span 3/span 4/13/17', 'span 3/span 4/13/21', 'span 3/span 4/13/25', 'span 9/span 16/10/21'],
};

class Live extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMode: 'pip',
      streamList: [],
      readyState: false,
      toggle:true,
      AudioToggle:true,
      VideoToggle:true,
      streamid:'',
      media:true,
      screenStatus:false
    }
    

  }

  async componentDidMount() {
    console.log("Live.componentDidMount");
    if (!this.props.currentBroadcast && !(window["channel"] && window["key"])) {
      // TODO: uncomment these
      this.props.history.push('/destinations');
      return;
    }

    AgoraRTC = window.AgoraRTC;
    // if (!AgoraRTC.checkSystemRequirements()) {
    //   // alert("browser is no support webRTC");
    //   // this.endCall();
    //   // return;
    // }
    console.log("currentBroadcast=" + JSON.stringify(this.props.currentBroadcast))
    if (this.props.currentBroadcast) {
      broadcastId = this.props.currentBroadcast.streamingEngine.broadcastId;
      broadcastUrl = this.props.currentBroadcast.streamingEngine.broadcastUrl;
      channelKey = this.props.currentBroadcast.streamingEngine.channelKey;
      waitingPeriodBeforeLive = this.props.currentBroadcast.streamingEngine.waitingPeriodBeforeLive;
    } else {
      broadcastId = window["channel"];
      broadcastUrl = '';
      channelKey = window["key"];
      waitingPeriodBeforeLive = 1;
    }

    console.log(broadcastId, channelKey);
    var mediaStatus=this.state.media;
    setTimeout(() => {
      this.props.enableGoLive();
    }, waitingPeriodBeforeLive * 1000);
    this.initAgoraRTC(broadcastId, channelKey, broadcastUrl,mediaStatus);
    console.log('base url: ', config.BASE_URL);
    const linkData = {
      stage: 'new user',
      channel: 'web_app',
      feature: 'live_share',
      alias: '',
      data: {
        'channel': broadcastId,
        'key': channelKey,
        '$og_image_url': 'https://www.livepin.tv/assets/img/livepin_logo.png',
        '$desktop_url': config.BASE_URL
      }
    };
    var self = this;
    window.branch.link(linkData, function (err, link) {
      shareUrl = link;
      self.setState({shareUrl});
      console.log("shareUrlConsole=" + shareUrl);
    });
  }

  componentDidUpdate = () => {
    // console.log("ComponentDidUpdate");
    let canvas = document.querySelector('#cameraPublisherContainer');

    let no = this.state.streamList.length;
    // console.log("no=" + no);
    this.state.streamList.map((item, index) => {
      let id = item.getId()
      // console.log("id=" + id);
      let dom = document.querySelector('#cameraPublisherContainer-' + id)
      // console.log("!dom=" + (!dom));
      if (!dom) {
        dom = document.createElement('section')
        console.log("CreatedElement=section");
        dom.setAttribute('id', 'cameraPublisherContainer-' + id);
        console.log("setATtribute=cameraPublisherContainer-" + id);
        dom.setAttribute('class', 'cameraPublisherContainer');
        canvas.appendChild(dom);
        console.log("canvas.AppendedChild");
        item.play('cameraPublisherContainer-' + id)
        console.log("item.playExecuted");
      }
      dom.setAttribute('style', `grid-area: ${tile_canvas[no][index]}; width:100%;height:100%;`)
      item.player.resize && item.player.resize()
    })
  };

  componentWillUnmount = () => {
    this.endCall();
    this.props.resetLiveState();
  };

  initAgoraRTC = (broadcastId, channelKey, broadcastUrl,mediaStatus) => {
    console.log('Live.configAgora');

    let rt = this;
    agoraClient = AgoraRTC.createClient({mode: 'h264_interop'});

    agoraClient.init(config.agora.APP_ID, function () {
      console.log("Live.configAgora: AgoraRTC client initialized");

      // agoraClient.on('stream-published', function (evt) {
      //   console.log("Live.initLocalStream: local stream published");
      // });

      agoraClient.on('stream-added', function (evt) {
        let stream = evt.stream;
        console.log("New stream added: " + stream.getId());
        console.log('At ' + new Date().toLocaleTimeString());
        console.log("Subscribe ", stream);
        // rt.addStream(stream);

        // add remote stream and composite the pictures
        // var remoteUser = { uid: stream.getId(), x: 0, y: 0, width: 1280, height: 720, zOrder: 1, alpha: 1.0, };
        // this.stage.coding.transcodingUsers.push(remoteUser);
        // rt.setPictureComposition();
        // rt.coding.userCount = rt.coding.transcodingUsers.length;
        // agoraClient.setLiveTranscoding(this.state.coding);
        
        agoraClient.subscribe(stream, function (err) {
          console.log("Subscribe stream failed", err);
        })
      });

      agoraClient.on('peer-leave', function (evt) {
        console.log("Peer has left: " + evt.uid);
        console.log(new Date().toLocaleTimeString());
        console.log(evt);

        // change the picture composition
        rt.removeStream(evt.uid)
        coding.transcodingUsers = rt.setPictureComposition();
        coding.userCount = coding.transcodingUsers.length;
        agoraClient.setLiveTranscoding(coding);
        // agoraClient.startLiveStreaming(broadcastUrl, true);
      });

      agoraClient.on('stream-subscribed', function (evt) {
        let stream = evt.stream;
        console.log("Got stream-subscribed event");
        console.log(new Date().toLocaleTimeString());
        console.log("Subscribe remote stream successfully: " + stream.getId());
        console.log(evt);
        rt.addStream(stream);
        coding.transcodingUsers = rt.setPictureComposition();
        coding.userCount = coding.transcodingUsers.length;
        agoraClient.setLiveTranscoding(coding);
      });

      agoraClient.on("stream-removed", function (evt) {
        
        let stream = evt.stream
        console.log("Stream removed: " + stream.getId());
        console.log(new Date().toLocaleTimeString());
        console.log(evt);
        
        // rt.removeStream(stream.getId());
      });
      console.log("BroadcastUrl=" + broadcastUrl);

      agoraClient.join(channelKey, broadcastId, null, (uid) => {
        console.log('Live.configPublisher: joined channel' + channelKey + " bid=" + broadcastId);
        var camera, microphone;
        
        AgoraRTC.getDevices(function (devices) {
          for (var i = 0; i !== devices.length; ++i) {
            console.log('Found device:', devices[i].label);
            var device = devices[i];
            if (device.kind === 'audioinput' && !microphone) {
              microphone = device;
            } else if (device.kind === 'videoinput' && !camera) {
              camera = device;
            } else {
              console.log('Some other kind of source/device: ', device);
            }
          }

          if (localStream) {
            agoraClient.unpublish(localStream, function (err) {
              console.log('Live.initLocalStream: unpublish stream failed');
              // this.endCall();
              return;
            });
          }
         if(mediaStatus){
          localStream = AgoraRTC.createStream({
            streamID: uid,
            audio: true,
            video: true,
            microphoneId: microphone.deviceId,
            cameraId: camera.deviceId,
            screen:false,
           
          });
         }
         else{

          localStream = AgoraRTC.createStream({
            streamID: uid,
            audio: false,
            video: false,
            screen: true,
             //chrome extension id
            extensionId:"lldmnpomecfagigkoffpkfmlpmffkejc"
             
          }); 

    }

                
          localStream.setVideoProfile('720p_3');
          localStream.on("accessDenied", function () {
            console.log("Live.initLocalStream: device access denied");
            // TODO:
          });

          // The user has granted access to the camera and mic.
          localStream.on("accessAllowed", function () {
            console.log("accessAllowed");
          });

          localStream.init(function () {
            // user grants all the access to media input
            console.log('Live.initLocalStream: stream initialized');
            rt.addStream(localStream);
            // localStream.play('cameraPublisherContainer');
            // now should publish stream
            agoraClient.publish(localStream, function (err) {
              console.log("Live.initLocalStream: unable to publish:" + err);
              // this.endCall();
              return;
            });

            coding = {
              width: 1270,
              height: 720,
              videoBitrate: 1300,
              videoFramerate: 30,
              lowLatency: false,
              audioSampleRate: 48000,
              audioBitrate: 48,
              audioChannels: 1,
              videoGop: 30,
              videoCodecProfile: 100,
              userCount: 0,
              userConfigExtraInfo: {},
              backgroundColor: 0x000000,
              transcodingUsers: [],
            };
            coding.transcodingUsers = rt.setPictureComposition();
            coding.userCount = coding.transcodingUsers.length;
            agoraClient.setLiveTranscoding(coding);
            agoraClient.startLiveStreaming(broadcastUrl, true);
          }, function (err) {
            alert('Please check camera or audio devices on your computer, then try again.');
            console.log('Live.initLocalStream: stream failed to initialize:', err);
            // self.endCall();
            return;
            // TODO: should kill the broadcast
          });
        });
      }, (err) => {
        console.log('Live.configPublisher: join failed:', err);
        this.endCall();
      });
    }, function (err) {
      console.log("Live.configAgora: AgoraRTC client init failed", err);
    });
    this.props.joinChannel();
    this.props.transitionBroadcast('publishing');
  };

  removeAllStreams = () => {
    this.state.streamList.map((item, index) => {
      item.close();
      let element = document.querySelector('#cameraPublisherContainer-' + item.getId());
      if (element) {
        element.parentNode.removeChild(element);
      }
    });

    this.setState({
      streamList: []
    });
  };


shareScreen = () => {
       
       this.setState({media:false})
       setTimeout(() => {
      this.componentDidMount();
    }, 1000);
       
      
};

  // stream management functions for multiparty conference
  removeStream = (uid) => {
    this.state.streamList.map((item, index) => {
      if (item.getId() === uid) {
        item.close()
        let element = document.querySelector('#cameraPublisherContainer-' + uid)
        if (element) {
          element.parentNode.removeChild(element)
        }
        let tempList = [...this.state.streamList];
        tempList.splice(index, 1);
        this.setState({
          streamList: tempList
        })
      }

    })
  };

  addStream = (stream, push = false) => {
    let repeatition = this.state.streamList.some(item => {
      return item.getId() === stream.getId()
    });
    console.log("repetition=" + repeatition);
    if (repeatition) {
      return
    }
    if (push) {
      this.setState({
        streamList: this.state.streamList.concat([stream])
      })
    }
    else {
      console.log("Before stream: " + JSON.stringify(stream));
      console.log("Before this.state.streamList" + JSON.stringify(this.state.streamList));

      this.setState({
        streamList: [stream].concat(this.state.streamList)
      }, () => {
        console.log("streamListw=" + JSON.stringify(this.state.streamList));
      })
    }
  };

  setPictureComposition = () => {
    console.log('setPictureComposition');
    console.log('# of streams:', this.state.streamList.length);
    var transcodingUsers = [];
    var streamCount = this.state.streamList.length;
    if (streamCount == 0) return;
    else if (streamCount == 1) {
      var uid = this.state.streamList[0].getId();

      transcodingUsers.push({ uid, x: 0, y: 0, width: 1280, height: 720, zOrder: 1, alpha: 1.0,});
    } else if (streamCount == 2) {
      transcodingUsers.push({ uid: this.state.streamList[0].getId(), x: 0, y: 0, width: 639, height: 720, zOrder: 1, alpha: 1.0, });
      transcodingUsers.push({ uid: this.state.streamList[1].getId(), x: 641, y: 0, width: 639, height: 720, zOrder: 1, alpha: 1.0, });
    } else if (streamCount == 3) {
      transcodingUsers.push({ uid: this.state.streamList[0].getId(), x: 0, y: 0, width: 426, height: 720, zOrder: 1, alpha: 1.0, });
      transcodingUsers.push({ uid: this.state.streamList[1].getId(), x: 427, y: 0, width: 426, height: 720, zOrder: 1, alpha: 1.0, });
      transcodingUsers.push({ uid: this.state.streamList[2].getId(), x: 853, y: 0, width: 426, height: 720, zOrder: 1, alpha: 1.0, });
    } else if (streamCount == 4) {
      transcodingUsers.push({ uid: this.state.streamList[0].getId(), x: 0, y: 0, width: 640, height: 360, zOrder: 1, alpha: 1.0, });
      transcodingUsers.push({ uid: this.state.streamList[1].getId(), x: 640, y: 0, width: 640, height: 360, zOrder: 1, alpha: 1.0, });
      transcodingUsers.push({ uid: this.state.streamList[2].getId(), x: 0, y: 360, width: 640, height: 360, zOrder: 1, alpha: 1.0, });
      transcodingUsers.push({ uid: this.state.streamList[3].getId(), x: 640, y: 360, width: 640, height: 360, zOrder: 1, alpha: 1.0, });
    }
    return transcodingUsers;
  }

  // END stream management functions

  endCall = () => {
    if (localStream) {
      agoraClient.unpublish(localStream);
      localStream.close();
      localStream.stop();
      localStream = null;
      agoraClient.stopLiveStreaming(broadcastUrl);
      this.removeAllStreams();
      agoraClient.leave(function () {
        console.log('Live.endCall: left channel');
      }, function (err) {
        console.log('Live.endCall: left channel failed:', err);
      });
    }
  };

  toggleLocalAudio = () => {
    if (hasAudio) {
      localStream.disableAudio();

    } else {
      localStream.enableAudio();
    }
    hasAudio = !hasAudio;
    this.props.toggleLocalAudio();
   
    this.setState({AudioToggle: !this.state.AudioToggle}) 
    
  };

  toggleLocalVideo = () => {
    if (hasVideo) {
      localStream.disableVideo();
    } else {
      localStream.enableVideo();
    }
    hasVideo = !hasVideo;
    this.props.toggleLocalVideo();
    this.setState({VideoToggle: !this.state.VideoToggle}) 
  };
  

  shareUrlClicked = () => {
    console.log("sending shareurl: " + this.state.shareUrl);
    this.props.openShareUrl(this.state.shareUrl);
    this.props.shareUrlClicked;
  };
  closeStreamBox = ()=>{
    console.log("in confirm box");
    this.props.openConfirmation('FGF')
    this.props.closeStreamBox;
  }

  handleCountdown = () => {
    return new Promise((resolve, reject) => {
      this.props.startCountdown();
      const interval = setInterval(() => {
        this.props.tickCountdown();
        if (this.props.countdown === 0) {
          clearInterval(interval);
          resolve('Going Live!');
        }
      }, 1000);
    });
  };

  handleStartBroadcast = async () => {
    // Timeout if broadcast length exceeds one hour
    setTimeout(() => {
      this.handleStopBroadcast();
    }, 3600000);

    await this.handleCountdown();
    await this.props.transitionBroadcast('live');
    await this.props.fetchComments();
  };

  handleStopBroadcast = async () => {
    this.endCall();
    await this.props.transitionBroadcast('was_live');
    this.props.leaveChannel();
    this.props.clearPollInterval();
    this.props.endBroadcast();
  };

  handleCancelBroadcast = async () => {
    console.log('Should cancel');
    window['channel'] = null;
    window['key'] = null;
    this.endCall();
    await this.props.transitionBroadcast('canceled');
    this.props.leaveChannel();
    this.props.endBroadcast();
    this.props.history.goBack();
  };
  handleWidth(){ 
      this.setState({toggle: !this.state.toggle}) 
    }

  renderGoLiveButton() {
    const {isLoading, showCountdown, shouldEnableGoLive} = this.props;
    if (shouldEnableGoLive) {
      return (
        <div className={styles.startBroadcast}>
          {!showCountdown && (
            <GoLiveButton
              onClick={this.handleStartBroadcast}
              isLoading={isLoading}
              text="Go Live"
              loadingText="Go Live"
            />
          )}
          <PillButton
            onClick={this.handleCancelBroadcast}
            isLoading={isLoading}
            text="Cancel"
            loadingText="Cancel"
          />
        </div>
      );
    }


    return (
      <div className={styles.startBroadcast}>
        <div>Preparing internet for launch...</div>
      </div>
    );
  }

  renderCountdown() {
    return (
      <div className={styles.countdownOverlay}>
        <div className={styles.countdownDigit}>{this.props.countdown}</div>
      </div>
    );
  }

  renderFinishButton() {
    return (
      <div className={styles.startBroadcast}>
        <PillButton
          onClick={this.handleStopBroadcast}
          isLoading={this.props.isLoading}
          text="Finish"
          loadingText="Finish"
        />
      </div>
    );
  }

  renderBroadcast() {
    const {
      isLoading,
      isLive,
      showCountdown,
      shouldEnableGoLive,
      isChatDocked,
      currentBroadcast,
      viewers,
      shareUrl,
    } = this.props;

    const styl = {
      display: 'grid',
      gridGap: '10px',
      alignItems: 'center',
      justifyItems: 'center',
      gridTemplateRows: 'repeat(12, 1fr)',
      gridTemplateColumns: 'repeat(24, 1fr)'
    };

    return (
      <div id="cameraPublisherContainer" className={styles.Broadcast} style={styl}>
        <LiveStats isLive={isLive} currentBroadcast={currentBroadcast} viewers={viewers}/>

        <BroadcastControls
          isLoading={isLoading}
          isLive={isLive}
          showCountdown={showCountdown}
          shouldEnableGoLive={shouldEnableGoLive}
          isChatDocked={isChatDocked}
          handleStartBroadcast={this.handleStartBroadcast}
          handleCancelBroadcast={this.handleCancelBroadcast}
          handleStopBroadcast={this.handleStopBroadcast}
        />

        {showCountdown && this.renderCountdown()}
      </div>
    );
  }

  renderEndBroadcast() {
    return (
      <div className={styles.EndBroadcast}>
        <div className={styles.EndBroadcastMessage}>
          <p>
            You just ended a broadcast. <br/>
            We look forward to seeing you soon!
          </p>
          <div className={styles.CloseButton} onClick={() => this.props.history.push(`/broadcasts`)}>
            Close
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {isChatDocked, messages, chatNotification, shareUrl} = this.props;
    return (
      <div className={styles.Fullwidth}>
      <div className={this.state.toggle ? styles.LiveContainer : styles.LiveContainerReducewidth} >
        <div className={styles.StreamContainer}>
          {!this.props.connected && this.props.connectionAttempted ? (
            this.renderEndBroadcast()
          ) : (
            this.renderBroadcast()
          )}
           
          

          <Chat messages={messages} isChatDocked={isChatDocked }/>
        </div>
         
      </div>
      <div className={this.state.toggle ? styles.SideMenu:styles.SideMenuIncreseWidth}>
      <div className={styles.MenuColoum}>
        <i  className={this.state.AudioToggle ? 'fa fa-microphone':'fa fa-microphone-slash'}  onClick={(e) => this.toggleLocalAudio()}  style={{marginLeft:29,marginTop:20}}></i><p className={this.state.toggle ? styles.displaynone : styles.displayblock}>Audio</p> 
      </div>
       <div className={styles.MenuColoum}>
       <i className="material-icons" onClick={(e) => this.toggleLocalVideo()} style={{marginLeft:22,marginTop:20}}>{this.state.VideoToggle ? 'videocam':'videocam_off'}</i><p className={this.state.toggle ? styles.displaynone : styles.displayvideo}>Video</p> 
      </div>
      <div className={styles.MenuColoum}>
        <i  className="fa fa-window-restore" onClick={(e) => this.shareScreen()}  style={{marginLeft:29,marginTop:20}}  ></i><p className={this.state.toggle ? styles.displaynone : styles.displayblock}>Share Screen</p> 
      </div>
       <div className={styles.MenuColoum}>
        <i  className="fa fa-user-plus" onClick={(e) => this.shareUrlClicked()}  style={{marginLeft:29,marginTop:20}}></i><p className={this.state.toggle ? styles.displaynone : styles.displayblock}>Invite</p> 
      </div>
      <div className={styles.MenuColoum}>
        <i className="fa fa-wechat " style={{marginLeft:28,marginTop:22}}   onClick={(e) => this.props.toggleChat()}></i><p className={this.state.toggle ? styles.displaynone : styles.displayblock}>Chat</p>
      </div>
       <div className={styles.MenuColoum}>
        <i className="fa fa-arrows-alt " style={{marginLeft:28,marginTop:22}}  onClick={(e) => this.handleWidth()}></i><p className={this.state.toggle ? styles.displaynone : styles.displayblock}>FullScreen</p>
      </div>
      <div className={styles.MenuColoum}>
        <i className="fa fa-stop-circle " style={{marginLeft:28,marginTop:22}}  onClick={(e) => this.closeStreamBox()}></i><p className={this.state.toggle ? styles.displaynone : styles.displayblock}>FinishStream</p>
      </div>
      <div className={styles.MenuColoum}>
        <i className="fa fa-facebook " style={{marginLeft:28,marginTop:22}}></i>
        <p className={this.state.toggle ? styles.displaynone : styles.displayblock}>0923</p>
      </div>
      <div className={styles.MenuColoum}>
        <i className="fa fa-youtube-play " style={{marginLeft:28,marginTop:22}}></i>
        <p className={this.state.toggle ? styles.displaynone : styles.displayblock}>873</p>
      </div>
      <footer className={styles.footer}>
       <i className="material-icons"  onClick={(e) => this.handleWidth()}>{this.state.toggle ? 'arrow_back' : 'arrow_forward'}</i>
      

       </footer>
     </div>
    
    </div>

    );
  }
}

const mapStateToProps = ({
                           live: {
                             shouldEnableGoLive,
                             isLoading,
                             showCountdown,
                             countdown,
                             isLive,
                             connected,
                             connectionAttempted,
                             publishers,
                             subscribers,
                             meta,
                             localAudioEnabled,
                             localVideoEnabled,
                             status,
                             error,
                             isChatDocked,
                             messages,
                             chatNotification,
                             viewers,
                             shareUrl,
                           },
                         }) => ({
  shouldEnableGoLive,
  isLoading,
  showCountdown,
  countdown,
  isLive,
  connected,
  connectionAttempted,
  publishers,
  subscribers,
  meta,
  localAudioEnabled,
  localVideoEnabled,
  status,
  error,
  isChatDocked,
  messages,
  chatNotification,
  viewers,
  shareUrl,
});

export default connect(mapStateToProps)(Live);
