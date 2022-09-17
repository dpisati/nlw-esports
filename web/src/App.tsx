import './styles/main.css';

import logoImg from './assets/logonlw.svg';
import * as Dialog from '@radix-ui/react-dialog';

import { GameBanner } from './components/GameBanner';
import { useEffect, useState } from 'react';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

export interface IGameBanner {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    };
}

function App() {
    const [games, setGames] = useState<IGameBanner[]>([]);

    useEffect(() => {
        let mounted = true;
        const loadGames = async () => {
            if (mounted) {
                const { data } = await axios(`http://localhost:3333/games`);
                setGames(data);
            }
        };

        loadGames();

        return function cleanup() {
            mounted = false;
        };
    }, []);

    return (
        <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
            <img src={logoImg} alt="" />

            <h1 className="text-6xl text-white font-black mt-20">
                Your{' '}
                <span className="bg-nlw-gradient bg-clip-text text-transparent">
                    duo
                </span>{' '}
                is here
            </h1>

            <div className="grid grid-cols-6 gap-6 mt-16">
                {games.map((game) => (
                    <GameBanner
                        key={game.id}
                        title={game.title}
                        adsCount={game._count.ads > 0 ? game._count.ads : 0}
                        bannerUrl={game.bannerUrl}
                    />
                ))}
            </div>

            <Dialog.Root>
                <CreateAdBanner />
                <CreateAdModal />
            </Dialog.Root>
        </div>
    );
}

export default App;
