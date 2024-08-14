import React, { useState } from 'react';
import Snackbar from 'react-native-snackbar';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Icons from './components/Icons';
import Sound from 'react-native-sound';
import { StatusBar } from 'react-native';

function App(): React.JSX.Element {
  Sound.setCategory('Playback');

  const sound = new Sound('shout.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Error loading sound: ', error);
    }
  });

  // const shout = new Sound('https://www2.cs.uic.edu/~i101/SoundFiles/gettysburg.wav', null, (error) => {
  //   if (error) {
  //   console.log('Error loading sound:', error);
  //   } else {
  //   console.log('Sound loaded successfully.');
  //   }
  // });
  

  const isDarkMode = useColorScheme() === 'dark'
  const [isCross, setIsCross] = useState<boolean>(true)
  const [isWinner, setIsWinner] = useState('')
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9))

  const resetGame = () => {
    setGameState(new Array(9).fill('empty', 0, 9));
    setIsCross(true)
    setIsWinner('')
  }

  const checkWinner = () => {
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setIsWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setIsWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setIsWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setIsWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setIsWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setIsWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setIsWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setIsWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setIsWinner('Draw game... ⌛️');
    }
  }

  const onChangeItem = (i: number) => {
    //PlayLocalSoundFile();
    sound.play((success) => {
      if (success) {
        console.log('Sound played successfully');
      } else {
        console.log('Error playing sound');
      }
    });

    if (isWinner) {
      return Snackbar.show({
        text: isWinner,
        backgroundColor: '#000000',
        textColor: "#FFFFFF"
      })
    }

    if (gameState[i] == 'empty') {
      gameState[i] = isCross ? 'cross' : 'circle'
      setIsCross(!isCross)
    } else {
      return Snackbar.show({
        text: "Position is already filled",
        backgroundColor: "red",
        textColor: "#FFF"
      })
    }
    // console.log(i);
    // console.log(gameState[i])

    checkWinner()
  }

  return (
    <>
    <StatusBar animated={true}
        backgroundColor="#61daf0"
        barStyle='dark-content'
        showHideTransition='fade'
        networkActivityIndicatorVisible={false}
        translucent={false}
        />
      <Text></Text>
      <View style={styles.container}>
        {isWinner ? (
          <View style={[styles.playerInfo, styles.winnerInfo]}>
            <Text style={styles.winnerTxt}>{isWinner}</Text>
          </View>
        ) : (
          <View
            style={[
              styles.playerInfo,
              isCross ? styles.playerX : styles.playerO
            ]}
          >
            <Text style={styles.gameTurnTxt}>
              Player {isCross ? 'X' : 'O'}'s Turn
            </Text>
          </View>
        )}
        <FlatList
          numColumns={3}
          data={gameState}
          style={styles.grid}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                key={index}
                style={styles.card}
                onPress={() => onChangeItem(index)}
              >
                <Icons name={item} />
              </Pressable>
            );
          }}
        />

        <TouchableOpacity onPress={resetGame} style={styles.actionBtn}>
          <Text style={styles.actionBtnTxt}>{isWinner ? 'START NEW GAME': 'RELOAD'}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewHorizontal: {
    flexDirection: 'row',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',
    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '400',
    paddingHorizontal: 10,
    textTransform: 'capitalize',
  },
  playerInfo: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    marginBottom: 119,
    marginTop: 50,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: '#3ffdf3',
    width: 100,
    elevation: 2,
    borderColor: '#000000'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  viewComp: {
    backgroundColor: '#6A1B4D',
    height: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    margin: 10,
  },
  actionBtn: {
    borderRadius: 12,
    marginBottom: 167,
    backgroundColor: "#6A1B4D",
    paddingVertical: 10,
    paddingHorizontal: 40
  },
  actionBtnTxt: {
    fontSize: 24,
    color: "#FFFFFF",
    textTransform: "uppercase"
  }
});

export default App;
