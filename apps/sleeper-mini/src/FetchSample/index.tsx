import React, {useEffect, useState} from 'react';
import * as RN from 'react-native';
import {Types, Sleeper} from '@sleeperhq/mini-core';
import type {RostersMap} from '@sleeperhq/mini-core/declarations/types';
import RosterOwners from './RosterOwners';

type OwnProps = {
  context: Types.Context;
};

type Mode = {
  name: string;
  render: (props: OwnProps) => JSX.Element | null;
};

const FetchSample = (props: OwnProps) => {
  const {leaguesMap, rostersInLeagueMap, playersInSportMap} = props.context;

  const [selectedLeague, setSelectedLeague] = useState<string>();
  const [selectedMode, setSelectedMode] = useState<Mode>();
  const [selectedSport, setSelectedSport] = useState<string>();
  const [selectedRosterMap, setSelectedRosterMap] = useState<RostersMap>();

  useEffect(() => {
    if (selectedLeague) {
      const sport = leaguesMap[selectedLeague]?.sport ?? '';
      setSelectedSport(sport);
    }
  }, [selectedLeague, leaguesMap]);

  useEffect(() => {
    if (selectedLeague) {
      const rosterMap = rostersInLeagueMap[selectedLeague];
      setSelectedRosterMap(rosterMap);
    }
  }, [selectedLeague, rostersInLeagueMap]);

  useEffect(() => {
    setSelectedMode(undefined);
  }, [selectedLeague]);

  const renderEmpty = () => {
    return <Sleeper.Text style={styles.text}>---none---</Sleeper.Text>;
  };

  const renderLeagueList = (props: OwnProps) => {
    const {userLeagueList, leaguesMap} = props.context;
    return (
      <RN.View style={styles.itemContainer}>
        <Sleeper.Text style={styles.header}>Pick a League:</Sleeper.Text>
        <RN.FlatList
          style={styles.scroll}
          data={userLeagueList}
          renderItem={({item}) => (
            <Sleeper.Button
              text={leaguesMap[item].name || item}
              onPress={() => {
                setSelectedLeague(item);
                console.log(
                  'Selected new league:',
                  leaguesMap[item].name || item,
                );
              }}
            />
          )}
        />
      </RN.View>
    );
  };

  const renderModeList = (props: OwnProps) => {
    const {leaguesMap} = props.context;

    const league = !!selectedLeague && leaguesMap[selectedLeague];

    return (
      <RN.View style={styles.itemContainer}>
        <Sleeper.Text style={styles.header}>
          Select Mode ({!!selectedLeague && leaguesMap[selectedLeague].name}):
        </Sleeper.Text>
        {!!selectedLeague && <Sleeper.AvatarLeague league={league} />}
        <RN.FlatList
          style={styles.scroll}
          data={modes}
          renderItem={({item}) => (
            <Sleeper.Button
              text={item.name}
              onPress={() => setSelectedMode(item)}
            />
          )}
        />
      </RN.View>
    );
  };

  const renderModeHeader = () => {
    if (!selectedLeague || !selectedMode) {
      return null;
    }

    return (
        <Sleeper.Text style={styles.header}>{selectedMode.name}</Sleeper.Text>
    );
  };

  const renderMode = (props: OwnProps) => {
    if (!selectedLeague) {
      return null;
    }

    return (
      <RN.View>
        {renderModeList(props)}
        {!!selectedMode && (
          <RN.View style={styles.itemContainer}>
            {renderModeHeader()}
            {!!selectedMode && selectedMode.render(props)}
          </RN.View>
        )}
      </RN.View>
    );
  };

  const renderRosters = (props: OwnProps) => {
    const {userMap, playersInSportMap} = props.context;

    if (!selectedRosterMap || !selectedLeague || !selectedSport) {
      return renderEmpty();
    }

    return (
      <RosterOwners
        rostersMap={selectedRosterMap}
        userMap={userMap}
        playersMap={playersInSportMap[selectedSport]}
      />
    );
  };

  const renderUsers = (props: OwnProps) => {
    const {usersInLeagueMap, userMap} = props.context;

    const leagueUserIdList =
      !!selectedLeague &&
      !!usersInLeagueMap[selectedLeague] &&
      Object.keys(usersInLeagueMap[selectedLeague]);

    if (!leagueUserIdList) {
      return renderEmpty();
    }

    return (
      <RN.FlatList
        style={styles.scroll}
        data={leagueUserIdList}
        renderItem={({item}) => (
          <Sleeper.Text style={styles.text}>
            {userMap[item].display_name}
          </Sleeper.Text>
        )}
      />
    );
  };

  const renderPlayoffs = (props: OwnProps) => {
    const {playoffsInLeagueMap} = props.context;

    if (!selectedLeague || !playoffsInLeagueMap[selectedLeague]) {
      return renderEmpty();
    }

    return (
      <RN.FlatList
        style={styles.scroll}
        data={playoffsInLeagueMap[selectedLeague].bracket}
        renderItem={({item}) => (
          <Sleeper.Text style={styles.text}>
            {selectedRosterMap?.[item.t1]?.owner_id ?? 'No Owner'} vs{' '}
            {selectedRosterMap?.[item.t2]?.owner_id ?? 'No Owner'}
          </Sleeper.Text>
        )}
      />
    );
  };

  const renderSportInfo = (props: OwnProps) => {
    const {sportInfoMap} = props.context;

    if (!selectedLeague || !selectedSport) {
      return renderEmpty();
    }

    return (
      <RN.View>
        <Sleeper.Text style={styles.text}>Sport: {selectedSport}</Sleeper.Text>
        <Sleeper.Text style={styles.text}>
          League season:{' '}
          {sportInfoMap[selectedSport]?.league_season ?? 'No season'}
        </Sleeper.Text>
      </RN.View>
    );
  };

  const renderTransactions = (props: OwnProps) => {
    const {transactionsInLeagueMap, transactionsMap, userMap} = props.context;

    if (
      !selectedLeague ||
      !transactionsInLeagueMap[selectedLeague] ||
      transactionsInLeagueMap[selectedLeague].length === 0 ||
      !transactionsMap ||
      !userMap
    ) {
      return renderEmpty();
    }

    return (
      <RN.FlatList
        style={styles.scroll}
        data={transactionsInLeagueMap[selectedLeague]}
        renderItem={({item}) => {
          const creator = transactionsMap[item]?.creator;
          if (!creator) {
            return (
              <Sleeper.Text style={styles.text}>
                No creator detected
              </Sleeper.Text>
            );
          }

          return (
            <Sleeper.Text style={styles.text}>
              {userMap[creator]?.display_name || 'none'}
            </Sleeper.Text>
          );
        }}
      />
    );
  };

  const renderDrafts = (props: OwnProps) => {
    const {draftsInLeagueMap, draftPicksInDraftMap} = props.context;
    if (!selectedLeague || !draftsInLeagueMap[selectedLeague]) {
      return renderEmpty();
    }

    return (
      <RN.FlatList
        style={styles.scroll}
        data={draftsInLeagueMap[selectedLeague]}
        renderItem={({item}) => {
          if (
            !item.draft_id ||
            !selectedSport ||
            !draftPicksInDraftMap[item.draft_id]
          ) {
            return null;
          }

          const topPickId =
            draftPicksInDraftMap[item.draft_id][0]?.player_id || '';
          const topPlayer = playersInSportMap[selectedSport][topPickId];

          return (
            <RN.View>
              <Sleeper.Text style={styles.text}>
                {item.draft_id}:{item.type}
              </Sleeper.Text>
              {!!topPlayer && selectedSport && (
                <RN.View style={styles.horizontal}>
                  <Sleeper.Text style={styles.text}>1st Pick:</Sleeper.Text>
                  <Sleeper.AvatarPlayer player={topPlayer} />
                  <Sleeper.Text style={styles.text}>
                    {topPlayer.first_name?.[0] + '. ' + topPlayer.last_name}
                  </Sleeper.Text>
                  <Sleeper.AvatarTeam
                    team={topPlayer.team}
                    sport={selectedSport}
                  />
                </RN.View>
              )}
            </RN.View>
          );
        }}
      />
    );
  };

  const renderDraftPickTrades = (props: OwnProps) => {
    const {draftPickTradesInLeagueMap} = props.context;

    if (!selectedLeague || !draftPickTradesInLeagueMap[selectedLeague]) {
      return renderEmpty();
    }

    return (
      <RN.FlatList
        style={styles.scroll}
        data={draftPickTradesInLeagueMap[selectedLeague]}
        renderItem={({item}) => {
          if (!item.roster_id || !item.owner_id) {
            return null;
          }
          return (
            <Sleeper.Text style={styles.text}>
              {selectedRosterMap?.[item.roster_id]?.owner_id} to{' '}
              {selectedRosterMap?.[item.owner_id]?.owner_id}
            </Sleeper.Text>
          );
        }}
      />
    );
  };

  const _onNavigate = (props: OwnProps) => () => {
    // Note that actions have no effect in the local app.
    // They only execute when run from within Sleeper.
    const actions = props.context.actions;
    actions.navigate &&
      actions.navigate('LeaguesDetailScreen', {leagueId: selectedLeague});
  };

  const renderNavigateButton = (props: OwnProps) => {
    if (!selectedLeague) {
      return null;
    }
    const label = `Navigate to ${leaguesMap[selectedLeague].name}`;
    return <Sleeper.Button text={label} onPress={_onNavigate(props)} />;
  };

  const modes: Mode[] = [
    {name: 'Rosters', render: renderRosters},
    {name: 'Users', render: renderUsers},
    {name: 'Playoffs', render: renderPlayoffs},
    {name: 'Sport Info', render: renderSportInfo},
    {name: 'Transactions', render: renderTransactions},
    {name: 'Drafts', render: renderDrafts},
    {name: 'Draft Pick Trades', render: renderDraftPickTrades},
  ];

  return (
    <RN.View style={styles.container}>
      {renderLeagueList(props)}
      {renderNavigateButton(props)}
      {renderMode(props)}
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    width: 50,
    height: 50,
  },
  leagueAvatar: {
    width: 25,
    height: 25,
  },
  text: {
    fontSize: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  horizontal: {
    flexDirection: 'row',
  },
  itemContainer: {
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    margin: 5,
  },
  jersey: {
    width: 50,
    height: 50,
  },
  scroll: {
    height: 150,
    flexGrow: 0,
  },
  row: {
    padding: 2,
  },
});

export default FetchSample;
