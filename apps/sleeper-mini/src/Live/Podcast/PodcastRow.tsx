import React from 'react';
import * as RN from 'react-native';
import {Fonts, Theme} from '@sleeperhq/mini-core';
import {Topic} from '@sleeperhq/mini-core/declarations/types';
import {
  decodeMessage,
  formatTimeSinceWithDayOfWeek,
  getPodcastData,
} from '../shared/helpers';

type PodcastRowProps = {
  podcastTopic: Topic;
};

const PodcastRow = (props: PodcastRowProps) => {
  const {podcastTopic} = props;
  const {data = {}} = getPodcastData(podcastTopic);
  const {thumbnail, info, podcast} = data;
  const {name} = podcast;
  // If we're missing core info, do not render...
  if (!info || !podcast) {
    return null;
  }
  const onPress = async () => {
    const url = RN.Platform.select({
      android: podcast.spotify || podcast.google || podcast.url,
      ios: podcast.apple || podcast.url,
    });
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
    <RN.TouchableOpacity style={styles.podcastContainer} onPress={onPress}>
      <RN.View style={styles.podcastHeaderContainer}>
        {thumbnail && (
          <RN.Image
            style={styles.podcastThumbnail}
            source={{uri: thumbnail.url}}
          />
        )}
        <RN.View style={styles.podcastContentContainer}>
          <RN.View style={styles.podcastMetaContainer}>
            <RN.Text style={styles.podcastMetaText}>
              {name}
              {' • '}
            </RN.Text>
            <RN.Text style={styles.podcastMetaText}>
              {formatTimeSinceWithDayOfWeek(podcastTopic.created)}
            </RN.Text>
          </RN.View>
          <RN.Text style={styles.podcastTitleText}>
            {decodeMessage(info.title)}
          </RN.Text>
        </RN.View>
      </RN.View>
    </RN.TouchableOpacity>
  );
};

const styles = RN.StyleSheet.create({
  podcastContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  podcastHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  podcastThumbnail: {
    height: 72,
    aspectRatio: 1.33,
    borderRadius: 8,
    overflow: 'hidden',
  },
  podcastContentContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  podcastMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  podcastMetaText: {
    fontFamily: Fonts.INTER_REGULAR,
    fontSize: 12,
    marginBottom: 4,
    color: Theme.gray300,
  },
  podcastTitleText: {
    fontFamily: Fonts.INTER_SEMIBOLD,
    color: 'white',
    fontSize: 14,
    flex: 1,
  },
});

export default PodcastRow;
