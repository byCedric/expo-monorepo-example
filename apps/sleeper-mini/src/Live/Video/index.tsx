import React, {useCallback, useEffect, useMemo} from 'react';
import * as RN from 'react-native';
import {Types, Fonts, Theme} from '@sleeperhq/mini-core';
import {FlashList} from '@shopify/flash-list';
import {Topic} from '@sleeperhq/mini-core/declarations/types';
import VideoRow from './VideoRow';
import {useMergeState} from '../shared/helpers';

type VideoMiniProps = {
  context: Types.Context;
};

const PAGE_LIMIT = 20;
const EMPTY_OBJECT = {};

const Videos = (props: VideoMiniProps) => {
  const {context} = props;

  const [state, setState] = useMergeState({
    page: 0,
    isRefreshing: false,
    paginatedVideosMap: EMPTY_OBJECT,
  });
  const {page, isRefreshing, paginatedVideosMap} = state;

  const currentPageVideos = context?.videos?.[page] || [];

  useEffect(() => {
    // When refreshing, our page indeces may change. We need to perform a full reset.
    let prevMap = isRefreshing ? {} : paginatedVideosMap;

    if (currentPageVideos.length !== 0) {
      setState({
        isRefreshing: false,
        paginatedVideosMap: {...prevMap, [page]: currentPageVideos},
      });
    } else {
      setState({isRefreshing: false});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, currentPageVideos, isRefreshing]);

  const videos = useMemo(() => {
    const videoArray = [];
    Object.keys(paginatedVideosMap).forEach(videoPage => {
      const videoValues = paginatedVideosMap[videoPage];
      videoArray.push(...videoValues);
    });
    return videoArray;
  }, [paginatedVideosMap]);

  const onEndReached = useCallback(() => {
    if (currentPageVideos.length === PAGE_LIMIT && isRefreshing === false) {
      setState({page: page + 1});
    }
  }, [currentPageVideos.length, isRefreshing, page, setState]);

  const onRefresh = useCallback(() => {
    setState({page: 0, isRefreshing: true});
  }, [setState]);

  const renderVideo = useCallback(({item: video}: {item: Topic}) => {
    return <VideoRow videoTopic={video} />;
  }, []);

  return (
    <FlashList
      data={videos}
      ListEmptyComponent={
        <RN.Text style={styles.errorText}>No Videos.</RN.Text>
      }
      keyExtractor={video => video.topic_id}
      renderItem={renderVideo}
      estimatedItemSize={100}
      onEndReached={onEndReached}
      refreshControl={
        <RN.RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor="white"
        />
      }
    />
  );
};

const styles = RN.StyleSheet.create({
  titleText: {
    fontSize: 28,
    color: 'white',
    fontFamily: Fonts.POPPINS_BOLD,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  errorText: {
    fontSize: 12,
    fontFamily: Fonts.INTER_SEMIBOLD,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
  },
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

export default Videos;
