import React, {useCallback, useEffect, useMemo} from 'react';
import * as RN from 'react-native';
import {Types, Fonts, Theme} from '@sleeperhq/mini-core';
import {FlashList} from '@shopify/flash-list';
import {Topic} from '@sleeperhq/mini-core/declarations/types';
import PodcastRow from './PodcastRow';
import {useMergeState} from '../shared/helpers';

type PodcastMiniProps = {
  context: Types.Context;
};

const PAGE_LIMIT = 20;
const EMPTY_OBJECT = {};

const Podcasts = (props: PodcastMiniProps) => {
  const {context} = props;

  const [state, setState] = useMergeState({
    page: 0,
    isRefreshing: false,
    paginatedPodcastsMap: EMPTY_OBJECT,
  });
  const {page, isRefreshing, paginatedPodcastsMap} = state;

  const currentPagePodcasts = context?.podcasts?.[page] || [];

  useEffect(() => {
    // When refreshing, our page indeces may change. We need to perform a full reset.
    let prevMap = isRefreshing ? {} : paginatedPodcastsMap;

    if (currentPagePodcasts.length !== 0) {
      setState({
        isRefreshing: false,
        paginatedPodcastsMap: {...prevMap, [page]: currentPagePodcasts},
      });
    } else {
      setState({isRefreshing: false});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, currentPagePodcasts, isRefreshing]);

  const podcasts = useMemo(() => {
    const podcastArray = [];
    Object.keys(paginatedPodcastsMap).forEach(podcastPage => {
      const podcastValues = paginatedPodcastsMap[podcastPage];
      podcastArray.push(...podcastValues);
    });
    return podcastArray;
  }, [paginatedPodcastsMap]);

  const onEndReached = useCallback(() => {
    if (currentPagePodcasts.length === PAGE_LIMIT && isRefreshing === false) {
      setState({page: page + 1});
    }
  }, [currentPagePodcasts.length, isRefreshing, setState, page]);

  const onRefresh = useCallback(() => {
    setState({page: 0, isRefreshing: true, paginatedPodcastsMap: EMPTY_OBJECT});
  }, [setState]);

  const renderPodcast = useCallback(({item: item}: {item: Topic}) => {
    return <PodcastRow podcastTopic={item} />;
  }, []);

  return (
    <FlashList
      data={podcasts}
      ListEmptyComponent={
        <RN.Text style={styles.errorText}>No Podcasts.</RN.Text>
      }
      estimatedItemSize={100}
      keyExtractor={podcast => podcast.topic_id}
      renderItem={renderPodcast}
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

export default Podcasts;
