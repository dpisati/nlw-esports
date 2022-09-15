import './styles/main.css';

import logoImg from './assets/logonlw.svg';
import * as Dialog from '@radix-ui/react-dialog';

import { GameBanner } from './components/GameBanner';
import { useEffect, useState } from 'react';
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameController } from 'phosphor-react';
import { Input } from './components/Form/input';

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
                const games = await fetch(`http://localhost:3333/games`);
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

                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
                    <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                        <Dialog.Title className="text-3xl font-bold">
                            Publish a ticket
                        </Dialog.Title>
                        <Dialog.Close />

                        <form className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label
                                    className="font-semibold "
                                    htmlFor="game"
                                >
                                    What game?
                                </label>

                                <Input
                                    id="game"
                                    name="title"
                                    type="text"
                                    placeholder="Select the game you want to play"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Your name/nickname</label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="What is your nickname?"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="yearsPlaying">
                                        Years playing?
                                    </label>
                                    <Input
                                        type="number"
                                        id="yearsPlaying"
                                        name="yearsPlaying"
                                        placeholder="It's ok if none :)"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="discord">
                                        What is your Discord?
                                    </label>
                                    <Input
                                        type="text"
                                        name="discord"
                                        id="discord"
                                        placeholder="YourDiscord#0000"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="weekDays">
                                            When do you play?
                                        </label>
                                        <div className="grid grid-cols-4 gap-2">
                                            <button
                                                type="button"
                                                className="w-8 h-8 rounded bg-zinc-900 "
                                                title="Sunday"
                                            >
                                                S
                                            </button>
                                            <button
                                                type="button"
                                                className="w-8 h-8 rounded bg-zinc-900 "
                                                title="Monday"
                                            >
                                                M
                                            </button>
                                            <button
                                                type="button"
                                                className="w-8 h-8 rounded bg-zinc-900 "
                                                title="Tuesday"
                                            >
                                                T
                                            </button>
                                            <button
                                                type="button"
                                                className="w-8 h-8 rounded bg-zinc-900 "
                                                title="Wednesday"
                                            >
                                                W
                                            </button>
                                            <button
                                                type="button"
                                                className="w-8 h-8 rounded bg-zinc-900 "
                                                title="Thursday"
                                            >
                                                T
                                            </button>
                                            <button
                                                type="button"
                                                className="w-8 h-8 rounded bg-zinc-900 "
                                                title="Friday"
                                            >
                                                F
                                            </button>
                                            <button
                                                type="button"
                                                className="w-8 h-8 rounded bg-zinc-900 "
                                                title="Saturday"
                                            >
                                                S
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                        <label htmlFor="hourStart">
                                            What time?
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input
                                                type="time"
                                                name="hourStart"
                                                id="hourStart"
                                                placeholder="From"
                                            />
                                            <Input
                                                type="time"
                                                name="hourEnd"
                                                id="hourEnd"
                                                placeholder="To"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-2 flex gap-2 text-sm">
                                <Input
                                    type="checkbox"
                                    name="voiceChat"
                                    id="voiceChat"
                                />
                                I usually use voice chat
                            </div>

                            <footer className="mt-4 flex justify-end gap-4">
                                <Dialog.Close
                                    type="button"
                                    className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                                >
                                    Cancel
                                </Dialog.Close>
                                <button
                                    type="submit"
                                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                                >
                                    <GameController size={24} />
                                    Find duo
                                </button>
                            </footer>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}

export default App;
