import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Header } from '../../components/Header';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { useEffect, useState } from 'react';

export function Game({}) {
    const route = useRoute();
    const navigation = useNavigation();
    const { id, title, bannerUrl } = route.params as GameParams;
    const [duos, setDuos] = useState<DuoCardProps[]>([]);

    function handleGoBack() {
        navigation.goBack();
    }

    useEffect(() => {
        fetch(`http://192.168.2.220:3333/games/${id}/ads`)
            .then((res) => res.json())
            .then((data) => {
                setDuos(data);
            });
        // let mounted = true;
        // const loadDuos = async () => {
        //     if (mounted) {
        //         const games = await fetch(
        //             `http://192.168.2.220:3333/games/${id}/ads`
        //         );
        //         const data = await games.json();

        //         setDuos(data);
        //         console.log(
        //             '🚀 ~ file: index.tsx ~ line 35 ~ loadDuos ~ data',
        //             data
        //         );
        //     }
        // };

        // loadDuos();

        // return function cleanup() {
        //     mounted = false;
        // };
    }, []);

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>

                    <Image
                        source={logoImg}
                        style={styles.logo}
                        resizeMode="cover"
                    />
                    <View style={styles.right} />
                </View>

                <Image source={{ uri: bannerUrl }} style={styles.cover} />

                <Header title={title} subtitle="Start playing now!" />

                <FlatList
                    style={styles.containerList}
                    contentContainerStyle={[
                        duos.length
                            ? styles.contentList
                            : styles.emptyListContainer,
                    ]}
                    data={duos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <DuoCard data={item} onConnect={() => {}} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            There is no ticket for this game yet :(
                        </Text>
                    )}
                ></FlatList>
            </SafeAreaView>
        </Background>
    );
}
