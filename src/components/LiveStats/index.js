import React from 'react';
import SocialIconLive from 'components/SocialIconLive';
import styles from './LiveStats.css';

const Platforms = ({ currentBroadcast = null }) => {
	if (!currentBroadcast) {
		return null;
	}

	const platforms = currentBroadcast.streamTargetContainers.map(container => container.streamTarget.provider);

	const uniquePlatforms = platforms.filter(function(item, pos) {
		return platforms.indexOf(item) === pos;
	});

	// Uncomment this line and comment above logic
	// for testing live broadcast w/o going live
	// const uniquePlatforms = ['facebook', 'youtube', 'twitch'];

	return (
		<div className={styles.platformIcons}>
			{uniquePlatforms.map((platform, i) => <SocialIconLive provider={platform} key={i} />)}
		</div>
	);
};

const LiveStats = ({ isLive, viewers, ...props }) => {
	let viewerCount = 0,
		isFacebook = false;
	if (viewers) {
		viewerCount = Object.keys(viewers).reduce((sum, source) => sum + viewers[source], 0);
	}

	if (props.currentBroadcast) {
		isFacebook = props.currentBroadcast.streamTargetContainers.some(
			container => container.streamTarget.provider === 'facebook'
		);
	}

	return (
		<div className={styles.BroadcastIcons}>
			{isLive ? (
				<div className={styles.LiveViewerIcons}>
					<div className={styles.LiveIcon + ' ' + styles.BroadcastIcon}>
						<i className={'material-icons ' + styles.MaterialIcon}>fiber_manual_record</i>
						Live
					</div>
					
					{isFacebook && (
						<div className={styles.ViewerIcon + ' ' + styles.BroadcastIcon}>
							<i className={'material-icons ' + styles.MaterialIcon}>remove_red_eye</i>
							<span>{viewerCount}</span>
						</div>
					)}
				</div>
			) : (
				<div className={styles.PreviewIcon + ' ' + styles.BroadcastIcon}>Preview</div>
			)}
			<Platforms {...props} />
		</div>
	);
};

export default LiveStats;
