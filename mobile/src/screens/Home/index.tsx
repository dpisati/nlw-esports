import { FlatList, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Header } from '../../components/Header';
import { GameCard, GameCardProps } from '../../components/GameCard';

import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';

export function Home() {
    const [games, setGames] = useState<GameCardProps[]>([]);
    const navigation = useNavigation();

    function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
        navigation.navigate('game', { id, title, bannerUrl });
    }

    useEffect(() => {
        let mounted = true;
        const loadGames = async () => {
            if (mounted) {
                const games = await fetch(`http://192.168.2.220:3333/games`);
                const data = await games.json();

                setGames(data);
            }
        };

        loadGames();

        return function cleanup() {
            mounted = false;
        };
    }, []);

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image source={logoImg} style={styles.logo} />
                <Header
                    title="Find your duo!"
                    subtitle="Select a game to play..."
                />
                <FlatList
                    contentContainerStyle={styles.contentList}
                    data={games}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <GameCard
                            onPress={() => handleOpenGame(item)}
                            data={item}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                ></FlatList>
            </SafeAreaView>
        </Background>
    );
}
