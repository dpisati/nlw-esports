import { FlatList, Image, View } from 'react-native';

import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Header } from '../../components/Header';
import { GameCard } from '../../components/GameCard';
import { GAMES } from '../../utils/games';

export function Home() {
    return (
        <View style={styles.container}>
            <Image source={logoImg} style={styles.logo} />
            <Header
                title="Find your duo!"
                subtitle="Select a game to play..."
            />
            <FlatList
                contentContainerStyle={styles.contentList}
                data={GAMES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <GameCard data={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            ></FlatList>
        </View>
    );
}
