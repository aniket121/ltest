import React from 'react';
import Paper from 'material-ui/Paper';
import coverPic from 'assets/bg@x.jpg';
import Avatar from 'material-ui/Avatar';
import avatarPic from 'assets/avatar.jpg';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';
import { ListItem } from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import FollowersIcon from 'material-ui/svg-icons/action/record-voice-over';
import CreditCardIcon from 'material-ui/svg-icons/action/credit-card';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import ShareIcon from 'material-ui/svg-icons/social/share';
import LikeIcon from 'material-ui/svg-icons/action/thumb-up';
import SaveIcon from 'material-ui/svg-icons/content/save';
import LiveIcon from 'material-ui/svg-icons/av/play-arrow';
import {purple500, yellow500, blue50} from 'material-ui/styles/colors';

import styles from './profile.css';
import { config } from 'aws-sdk';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      editable: false,
      aboutMe: this.props.user.aboutMe,
      username: this.props.user.name
    };
  }
  
  getJoinDate(){
    var joinDate = new Date(this.props.user.createdAt);
    var joinMonth = joinDate.getMonth()+1;
    return(joinMonth+"/"+joinDate.getDate()+"/"+joinDate.getFullYear())
  };

  renderLetterAvatar() {
    return (
      <div>
      <Avatar
          color={yellow500}
          backgroundColor={purple500}
          size={140}
        >
          {this.props.user.name?this.props.user.name.charAt(0):this.props.user.email.charAt(0)}
        </Avatar>
            
      </div>
    );
  };

  renderProfilePic() {
    return (
      <div >
        <img src={this.props.user.imageUrl} alt={this.props.user.name} className={styles.avatarImage} />
      </div>
    );
  };
  
  renderAboutMe() {
    return(
        <Col xs={12} sm={6} md={4} className={styles.aboutMe}>
          <p className={styles.aboutMe}>{this.props.user.aboutMe}</p>
        </Col>
    );
  };

  changeAboutMe() {
    return(
      <Col xs={12} sm={6} md={4} className={styles.aboutMe}>
         <TextField
            id="text-field-default"
            floatingLabelText="About Me"
            defaultValue={this.state.aboutMe}
            multiLine={true}
            onChange={e => this.setState({ aboutMe: e.target.value })}
        />
      </Col>
    );
  };

  renderUsername(){
    return(
      <div>
        <h3>
          {this.state.username ? this.state.username : 'Your Name'}
        </h3>
      </div>
      );
  };

  changeUsername(){
     return(
      <Col xs={12} sm={6} md={4} className={styles.username}>
         <TextField
            id="text-field-default"
            defaultValue={this.state.username}
            floatingLabelText='Please enter your name'
            hintText='John Doe'
            onChange={e => this.setState({ username: e.target.value })} 
          />
      </Col>
       );
  };

  renderEditButton(){
    return(
      <div>
        <FlatButton   
              icon={<ModeEditIcon />}
              label="Edit"
              labelPosition="before"
              className={styles.editButton}
              style={{minWidth:'auto'}}
              onClick={() => this.setState({ editable: true })}      
              />
      </div>
    );
  };

  renderSaveButton(){
     return(
      <div>
          <FlatButton      
            icon={<SaveIcon />}
            label="Save"
            labelPosition="before"
            color={blue50}
            className={styles.editButton}
            style={{minWidth:'auto'}}
            onClick={() => this.triggerUpdateProfile()}      
            />
      </div>
      );
  };

  triggerUpdateProfile() {
    console.log("profile.triggerUpdateProfile");
    const updateStatus = this.props.updateProfile(this.props.user.email,
                          this.state.username,
                          this.props.userToken,
                          this.props.userTokenProvider,
                          this.state.aboutMe ? this.state.aboutMe : ' ',
                          this.props.user.imageUrl);
    if(updateStatus){
      this.setState({ editable: false });
    }
  };

  render() {
    return (
    <div id='homepage-container'>
      <Paper zDepth={4} className={styles.paper}>
        <Grid fluid>
          <Row center="xs">
            <Col xs={12}>
              {this.state.editable?this.renderSaveButton():this.renderEditButton()}
            </Col>
            <Col xs={12} className={styles.avatar}>
              {this.props.user.imageUrl === ''
                  ? this.renderLetterAvatar()
                  : this.renderProfilePic()}
              {this.state.editable ? this.changeUsername() : this.renderUsername()}
              {this.state.editable ? this.changeAboutMe() : this.renderAboutMe()}
              <p className={styles.joinDate}>
                Member since: {this.getJoinDate()}
              </p>
            </Col>
          </Row>
          <Divider />
          {/* <Row>
            <Col xs={6} sm={4} md={2}>
              <ListItem leftIcon={<FollowersIcon />} >
                654 Followers
              </ListItem>
            </Col>
            <Col xs={6} sm={4} md={2}>
              <ListItem leftIcon={<CreditCardIcon />} >
                $7000 Spent
              </ListItem>
            </Col>
            <Col xs={6} sm={4} md={2}>
              <ListItem leftIcon={<CommentIcon />} >
                465 Comments
              </ListItem>
            </Col>
            <Col xs={6} sm={4} md={2}>
              <ListItem leftIcon={<ShareIcon />} >
                231 Shares
              </ListItem>
            </Col>
            <Col xs={6} sm={4} md={2}>
              <ListItem leftIcon={<LikeIcon />} >
                1654 Likes
              </ListItem>
            </Col>
            <Col xs={6} sm={4} md={2}>
              <ListItem leftIcon={<LiveIcon />} >
                78 Livepins
              </ListItem>
            </Col>
          </Row> */}
        </Grid>
      </Paper>

      {/* <div id='posts'>
        <Grid fluid>
          <h2>Recent Broadcasts</h2>
          <Divider/>
          <Row center='sm' >
            <Col sm={12} md={6} className={styles.postCard}>
              <Card>
                <CardHeader
                  title="URL Avatar"
                  subtitle="Subtitle"
                  avatar={avatarPic}
                />
                <CardMedia
                  overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                >
                  <img src={coverPic} alt="coverPic" />
                </CardMedia>
                <CardText>
                  Description
                </CardText>
                <CardActions>
                  <FlatButton label="Action1" />
                  <FlatButton label="Action2" />
                </CardActions>
              </Card>
            </Col>
            <Col sm={12} md={6} className={styles.postCard}>
              <Card>
                <CardHeader
                  title="URL Avatar"
                  subtitle="Subtitle"
                  avatar={avatarPic}
                />
                <CardMedia
                  overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                >
                  <img src={coverPic} alt="coverPic" />
                </CardMedia>
                <CardText>
                  Description
                </CardText>
                <CardActions>
                  <FlatButton label="Action1" />
                  <FlatButton label="Action2" />
                </CardActions>
              </Card>
            </Col>
          </Row>
        </Grid>
      </div> */}
      
    </div>
    );
  }
}

export default Profile;