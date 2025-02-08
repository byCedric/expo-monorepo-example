import React from 'react';
import * as RN from 'react-native';
import {Types, Sleeper} from '@sleeperhq/mini-core';
import {
  LeagueTransaction,
  PlayersMap,
} from '@sleeperhq/mini-core/declarations/types';
import _ from 'lodash';

type OwnProps = {
  context: Types.Context;
};

const TradeSample = (props: OwnProps) => {
  const {
    league,
    transactionsInLeagueMap,
    transactionsMap,
    playersInSportMap,
    rostersInLeagueMap,
    user,
    actions,
  } = props.context;

  if (!league) {
    return (
      <RN.View style={styles.container}>
        <Sleeper.Text style={styles.header}>
          No League Selected, select a league. Make sure leagueSelector is
          enabled in app.json
        </Sleeper.Text>
      </RN.View>
    );
  }

  const leagueId = league.league_id;
  const players: PlayersMap = playersInSportMap[league.sport];
  const userId = user.user_id;
  const rosters = rostersInLeagueMap[leagueId];
  const myRosterId = _.findKey(rosters, roster => roster.owner_id === userId);

  return (
    <RN.View style={styles.container}>
      <Sleeper.Text style={styles.header}>{league.name}</Sleeper.Text>
      <Sleeper.Text style={styles.header}>
        Proposed Trades in League:
      </Sleeper.Text>
      <RN.FlatList
        style={styles.scroll}
        data={transactionsInLeagueMap[leagueId]}
        renderItem={({item}) => {
          const transaction: LeagueTransaction = transactionsMap[item];
          if (
            transaction.type !== 'trade' ||
            transaction.status !== 'proposed'
          ) {
            return;
          }

          let output = '';
          const transactionId = transaction.transaction_id;
          const allRosterIds = transaction.roster_ids;
          const addMap = {};
          const dropMap = {};

          // remove our roster id from the list
          const rosterIds = _.reject(
            allRosterIds,
            rosterId => rosterId === Number(myRosterId),
          );

          _.forEach(transaction.adds, (rosterId, playerId) => {
            let adds = addMap[rosterId] || [];
            adds.push(playerId);
            addMap[rosterId] = adds;
          });
          _.forEach(transaction.drops, (rosterId, playerId) => {
            let drops = dropMap[rosterId] || [];
            drops.push(playerId);
            dropMap[rosterId] = drops;
          });

          _.each(allRosterIds, rosterId => {
            _.each(transaction.adds, (transactionRosterId, playerId) => {
              if (rosterId !== transactionRosterId) {
                return;
              }
              const player = players[playerId];
              output += `${player.first_name} ${player.last_name} to ${rosterId}\n`;
            });
            _.each(transaction.drops, (transactionRosterId, playerId) => {
              if (rosterId !== transactionRosterId) {
                return;
              }
              const player = players[playerId];
              output += `${player.first_name} ${player.last_name} from ${rosterId}\n`;
            });
          });
          return (
            <RN.View style={styles.itemContainer}>
              <Sleeper.Text style={styles.text}>{output}</Sleeper.Text>
              <Sleeper.Button
                text={'Nav to Existing Trade'}
                onPress={() =>
                  actions.navigate?.('TradeCenterTransactionScreen', {
                    leagueId,
                    transactionId,
                  })
                }
              />
              <Sleeper.Button
                text={'Make New Trade'}
                onPress={() =>
                  actions.navigate?.('TradeCenterPlayersScreen', {
                    leagueId,
                    myRosterId,
                    rosterIds,
                    addMap,
                    dropMap,
                  })
                }
              />
            </RN.View>
          );
        }}
      />
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
    height: 400,
    flexGrow: 0,
  },
  row: {
    padding: 2,
  },
});

export default TradeSample;
