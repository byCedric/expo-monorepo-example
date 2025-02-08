import React from 'react';
import * as RN from 'react-native';
import {Types, Sleeper} from '@sleeperhq/mini-core';

type OwnProps = {
  rostersMap: Types.RostersMap;
  playersMap: Types.PlayersMap;
  userMap: Types.UserMap;
};

const RosterOwners = (props: OwnProps) => {
  const {playersMap, rostersMap, userMap} = props;

  const rosterIdList = Object.keys(rostersMap);

  const renderRosterPlayers = (players: string[]) => {
    return (
      <RN.View style={styles.horizontal}>
        {players?.map(playerId => {
          const player = playersMap[playerId];
          return <Sleeper.AvatarPlayer player={player} />;
        })}
      </RN.View>
    );
  };

  const renderRosterOwner = ({item}) => {
    const roster = rostersMap[item];
    const ownerId = roster.owner_id;
    const ownerName = ownerId
      ? userMap[ownerId]
        ? userMap[ownerId].display_name
        : ownerId
      : 'No Owner';
    return (
      <RN.View style={styles.horizontal}>
        <Sleeper.Avatar user={ownerId ? userMap[ownerId] : null} />
        <Sleeper.Text style={styles.text}>{ownerName}</Sleeper.Text>
        {renderRosterPlayers(roster.players)}
      </RN.View>
    );
  };

  return (
    <RN.FlatList
      style={styles.scroll}
      data={rosterIdList}
      renderItem={renderRosterOwner}
    />
  );
};

const styles = RN.StyleSheet.create({
  scroll: {
    height: 200,
    flexGrow: 0,
  },
  horizontal: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
  },
});

export default RosterOwners;
