import React from 'react';
import * as RN from 'react-native';
import {Types, Sleeper, Fonts, Theme} from '@sleeperhq/mini-core';

type OwnProps = {
  context: Types.Context;
};

const ActionSample = (props: OwnProps) => {
  const {context} = props;

  const user = context?.user;
  const league = context?.league;
  const actions = context?.actions;

  const [toastMessage, onChangeToastMessage] = React.useState<string>('');
  const [toastTypeValue, onChangeToastTypeValue] = React.useState<number>(0);

  const renderTabList = () => {
    const screens: {screen: Types.NavigationScreen; name: string}[] = [
      {screen: 'LeaguesIndexScreen', name: 'Fantasy'},
      {screen: 'ScoreIndexScreen', name: 'Scores'},
      {screen: 'PicksIndexScreen', name: 'Games'},
      {screen: 'FeedIndexScreen', name: 'Feed'},
      {screen: 'MinisIndexScreen', name: 'Minis'},
    ];

    return (
      <RN.View style={styles.itemContainer}>
        <Sleeper.Text style={styles.header}>Pick a Tab:</Sleeper.Text>
        <RN.FlatList
          style={styles.horizontalScroll}
          horizontal={true}
          data={screens}
          renderItem={({item}) => (
            <RN.View style={styles.tabItem}>
              <Sleeper.Button
                text={item.name}
                onPress={() => actions.navigate?.(item.screen)}
              />
            </RN.View>
          )}
        />
      </RN.View>
    );
  };

  const renderToast = () => {
    return (
      <RN.View style={styles.itemContainer}>
        <RN.TextInput
          placeholder={'Enter Message Here'}
          placeholderTextColor={Theme.secondaryText}
          autoCorrect={false}
          autoFocus={true}
          underlineColorAndroid={'transparent'}
          keyboardAppearance={'dark'}
          style={styles.textInput}
          selectionColor={Theme.mint}
          onChangeText={onChangeToastMessage}
          value={toastMessage.toString()}
        />
        <Sleeper.Button
          text={'Toast!'}
          onPress={() =>
            actions.showToast?.({
              text: toastMessage,
              icon: toastTypeValue === 0 ? 'error' : 'success',
            })
          }
        />
        <Sleeper.Switch
          options={[
            {
              icon: require('./assets/icon_error.webp'),
              colorToggleActive: Theme.primaryText,
              colorIconActive: Theme.getColorForSport('nfl'),
              colorIconInactive: Theme.primaryText,
            },
            {
              icon: require('./assets/circle_check.webp'),
              colorToggleActive: Theme.primaryText,
              colorIconActive: Theme.getColorForSport('nfl'),
              colorIconInactive: Theme.primaryText,
            },
          ]}
          value={toastTypeValue}
          onChange={onChangeToastTypeValue}
        />
      </RN.View>
    );
  };

  return (
    <RN.View style={styles.container}>
      {renderTabList()}
      {renderToast()}
      <RN.View style={styles.itemContainer}>
        <RN.View style={styles.horizontal}>
          <RN.Image
            style={styles.userAvatar}
            source={{
              uri: `https://sleepercdn.com/avatars/${user?.avatar}`,
            }}
          />
          <Sleeper.Jersey
            fill={'green'}
            stroke={'white'}
            strokeWidth={3}
            number={42}
            width={50}
            sport={'nfl'}
            team={'mini'}
          />
        </RN.View>
        <RN.View style={styles.horizontal}>
          <Sleeper.Text style={styles.header}>User:</Sleeper.Text>
          <Sleeper.Text style={styles.text}>
            {` ${user?.display_name}`}
          </Sleeper.Text>
        </RN.View>

        <RN.View style={styles.horizontal}>
          <Sleeper.Text style={styles.header}>Cookies:</Sleeper.Text>
          <Sleeper.Text style={styles.text}>{` ${user?.cookies}`}</Sleeper.Text>
        </RN.View>
      </RN.View>
      <RN.View style={styles.itemContainer}>
        <Sleeper.Text style={styles.header}>Selected League:</Sleeper.Text>
        {!!league && (
          <RN.View style={styles.horizontal}>
            <RN.Image
              style={styles.leagueAvatar}
              source={{
                uri: `https://sleepercdn.com/avatars/${league?.avatar}`,
              }}
            />
            <Sleeper.Text style={styles.text}>{league?.name}</Sleeper.Text>
          </RN.View>
        )}
        {!league && <Sleeper.Text style={styles.text}>-none-</Sleeper.Text>}
      </RN.View>
      <RN.View style={styles.itemContainer}>
        {context.location?.hasPermission === 'pending' && (
          <Sleeper.Button
            text={'Request location'}
            onPress={() => actions.requestLocation?.()}
          />
        )}
        {context.location?.hasPermission === 'no' && (
          <>
            <Sleeper.Text style={styles.header}>Permission denied</Sleeper.Text>
            <Sleeper.Button
              text={'Try again?'}
              onPress={() => actions.requestLocation?.()}
            />
          </>
        )}
        {context.location?.hasPermission === 'yes' && (
          <Sleeper.Text style={styles.header}>
            User Location: {context.location?.state || '--'},{' '}
            {context.location?.country || '--'}
          </Sleeper.Text>
        )}
      </RN.View>
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
  horizontalScroll: {
    height: 40,
    flexGrow: 0,
  },
  itemContainer: {
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 5,
  },
  tabItem: {
    paddingHorizontal: 3,
  },
  textInput: {
    height: 32,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.POPPINS_SEMIBOLD,
    color: Theme.primaryText,
    backgroundColor: Theme.backgroundDark,
    paddingHorizontal: 5,
    paddingVertical: 0,
    marginBottom: 5,
  },
});

export default ActionSample;
