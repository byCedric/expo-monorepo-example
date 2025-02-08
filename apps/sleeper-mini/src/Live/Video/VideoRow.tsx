import React from 'react';
import * as RN from 'react-native';
import {Fonts, Theme} from '@sleeperhq/mini-core';
import {Topic} from '@sleeperhq/mini-core/declarations/types';
import {
  decodeMessage,
  formatTimeSinceWithDayOfWeek,
  getVideoData,
} from '../shared/helpers';

type VideoRowProps = {
  videoTopic: Topic;
};

const VideoRow = (props: VideoRowProps) => {
  const {videoTopic} = props;
  const {youtube, data = {}} = getVideoData(videoTopic);
  const {url, thumbnail, info} = data;
  // If we're missing core info, do not render...
  if (!info || !url || !youtube) {
    return null;
  }
  const onPress = async () => {
    const canOpen = await RN.Linking.canOpenURL(url);

    if (canOpen) {
      try {
        await RN.Linking.openURL(url);
        return;
      } catch (err) {}
    }

    // Handle link open failure or the non-supported case...
    RN.Alert.alert(
      'Could not open link',
      'Would you like to copy it to your clipboard?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => RN.Clipboard.setString(url),
        },
      ],
    );
  };

  return (
    <RN.TouchableOpacity style={styles.videoContainer} onPress={onPress}>
      <RN.View style={styles.videoHeaderContainer}>
        {thumbnail && (
          <RN.Image
            style={styles.videoThumbnail}
            source={{uri: thumbnail.url}}
          />
        )}
        <RN.View style={styles.videoContentContainer}>
          <RN.View style={styles.videoMetaContainer}>
            {youtube.channel && (
              <RN.Text style={styles.videoMetaText}>
                {youtube.channel}
                {' • '}
              </RN.Text>
            )}
            <RN.Text style={styles.videoMetaText}>
              {formatTimeSinceWithDayOfWeek(videoTopic.created)}
            </RN.Text>
          </RN.View>
          <RN.Text style={styles.videoTitleText}>
            {decodeMessage(info.title)}
          </RN.Text>
        </RN.View>
      </RN.View>
    </RN.TouchableOpacity>
  );
};

const styles = RN.StyleSheet.create({
  videoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  videoHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  videoThumbnail: {
    height: 72,
    aspectRatio: 1.33,
    borderRadius: 8,
    overflow: 'hidden',
  },
  videoContentContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  videoMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoMetaText: {
    fontFamily: Fonts.INTER_REGULAR,
    fontSize: 12,
    marginBottom: 4,
    color: Theme.gray300,
  },
  videoTitleText: {
    fontFamily: Fonts.INTER_SEMIBOLD,
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
});

export default VideoRow;
