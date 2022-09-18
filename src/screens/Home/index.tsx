import React, { useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';

import { GAMES } from '../../utils/games';

import { styles } from './styles';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export function Home() {
  const [games, setGames] = useState<Game[]>([]);

  const navigation = useNavigation();

  // useEffect(() => {
  //   fetch('http://172.23.96.1:3333/games')
  //     .then((response) => response.json())
  //     .then((data) => setGames(data));

  //   console.log(games)
  // }, []);

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  return (
    <Background>

      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={logoImg}
          defaultSource={logoImg}
        />

        <Heading
          title='Encontre seu duo!'
          subtitle='Selecione o jogo que deseja jogar...'
        />

        <FlatList
          data={GAMES}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />

      </SafeAreaView>
    </Background>
  );
}