import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'components/TextField';
import Modal from 'components/Modal';
import FlatButton from 'material-ui/FlatButton';
import LoaderButton from 'components/LoaderButton';
import { invokeApi } from 'libs/aws';
import styles from 'containers/stream-targets/modals/styles.css';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';



class GoLiveModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      minDate: new Date(),
      maxDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      golive:true,
      schedule:false,
      dateTime: null
      
    };
    
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleDestinationChange = (event, index, streamGroupId) => {
    const selectedGroup = this.props.streamGroups.find(
      streamGroup => streamGroup.streamGroupId === streamGroupId
    );
    this.props.selectGroup(selectedGroup);
  };

  shouldDisableCreate = () => {
    const { title } = this.state;
    const { streamGroups, selectedGroup, isCreatingBroadcast } = this.props;

    const selectedId = selectedGroup ? selectedGroup.streamGroupId : '';

    return !title || !selectedId || !streamGroups.length || isCreatingBroadcast;
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { title } = this.state;
    const { selectedGroup: { streamGroupId } } = this.props;

    await this.props.createBroadcast({
      title,
      streamGroupId,
      status: 'scheduled'
    });
  };
  goLive()
  {
    this.setState({schedule:false})
    this.setState({golive:true})
  }
  Schedule()
  {
    this.setState({schedule:true})
    this.setState({golive:false})
  }

  renderDestinationGroups() {
    const { streamGroups, isLoadingStreamGroups } = this.props;
    if (isLoadingStreamGroups) {
      return null;
    }

    return streamGroups.map(streamGroup =>
      <MenuItem
        key={streamGroup.streamGroupId}
        value={streamGroup.streamGroupId}
        primaryText={streamGroup.name}
      />
    );
  }

  render() {
    const { title, minDate, maxDate } = this.state;
    const { selectedGroup, isCreatingBroadcast } = this.props;

    const selectedId = selectedGroup ? selectedGroup.streamGroupId : '';

    return (
      <Modal {...this.props} >
      <div className={styles.fullwidth}>
      <div className={this.state.golive ? styles.tab:styles.inactivetab}   onClick={(e) => this.goLive()}>Go Live</div>
      <div className={this.state.schedule ? styles.tab:styles.inactivetab}   onClick={(e) => this.Schedule()}>Schedule</div>
      </div>
        <form onSubmit={this.handleSubmit}>
          <div  className={this.state.golive ? styles.modalContent : styles.displayNone}>
            <TextField
              name="title"
              hint="e.g. Product Announcement"
              label="Livestream Title"
              value={title}
              onChange={this.handleTitleChange}
            />
            <DropDownMenu 
              name="destination"
              value={selectedId}
              onChange={this.handleDestinationChange}
              selectedMenuItemStyle={{ color: '#6908A1' }}
              style={{ width: 310 }}
              autoWidth={false}
            >
              {this.renderDestinationGroups()}
            </DropDownMenu>
             <LoaderButton
              type="submit"
              isLoading={isCreatingBroadcast}
              text="Go live"
              loadingText="Creating broadcast..."
              disabled={this.shouldDisableCreate()}
            />
            <FlatButton
              label={isCreatingBroadcast ? "Enabling..." : "Only Enable RTMP"}
              primary={true}
              onClick={this.handleEnableRtmp}
              disabled={this.shouldDisableCreate()}
            />
            </div>
            <div className={this.state.schedule ? styles.modalContent : styles.displayNone}>
              <TextField
              name="title"
              hint="e.g. Product Announcement"
              label="Livestream Title"
              value={title}
              onChange={this.handleTitleChange}
            />
            <DropDownMenu 
              name="destination"
              value={selectedId}
              onChange={this.handleDestinationChange}
              selectedMenuItemStyle={{ color: '#6908A1' }}
              style={{ width: 310 }}
              autoWidth={false}
            >
              {this.renderDestinationGroups()}
            </DropDownMenu>

            <DateTimePicker className={styles.setWidth}
             floatingLabelText="Schedule a date/time" 
             onChange={this.setDate}
             DatePicker={DatePickerDialog}
             TimePicker={TimePickerDialog}
             fullWidth={false}
            />
            <LoaderButton
              type="submit"
              isLoading={isCreatingBroadcast}
              text="Schedule Now"
              loadingText="Creating broadcast..."
              disabled={this.shouldDisableCreate()}
            />
             
            

            

            
          </div>
        </form>
      </Modal>
    );
  }
}

export default GoLiveModal;
