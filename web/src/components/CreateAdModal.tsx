import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Toast from '@radix-ui/react-toast';

import { CaretDown, Check, GameController } from 'phosphor-react';
import { Input } from './Form/input';
import { FormEvent, useEffect, useState } from 'react';
import { IGameBanner } from '../App';
import axios from 'axios';

export function CreateAdModal() {
    const [games, setGames] = useState<IGameBanner[]>([]);
    const [weekdays, setWeekdays] = useState<string[]>([]);
    const [useVoiceChat, setUseVoiceChat] = useState(false);

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if (!data.name) {
            return;
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekdays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChat,
            });

            alert('Created');
        } catch (error) {
            console.error(error);
            alert('Error');
        }
    }

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
        <>
            <Toast.Provider>
                <Toast.Root
                    open={true}
                    className="flex justify-end items-center justify-start absolute right-2 top-2 w-100 h-100 bg-green-600 rounded-lg p-4 px-12 text-white"
                >
                    <Toast.Title>Ad created successfully</Toast.Title>

                    <Toast.Close />
                </Toast.Root>

                <Toast.Viewport />
            </Toast.Provider>

            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
                <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                    <Dialog.Title className="text-3xl font-bold">
                        Publish a ticket
                    </Dialog.Title>
                    <Dialog.Close />

                    <form
                        className="flex flex-col gap-4"
                        onSubmit={handleCreateAd}
                    >
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold " htmlFor="game">
                                What game?
                            </label>
                            <Select.Root name="game">
                                <Select.Trigger
                                    aria-label="what-game?"
                                    className="flex items-center justify-between bg-zinc-900 py-3 px-4 rounded text-sm"
                                >
                                    <Select.SelectValue placeholder="Select the game you want to play…" />
                                    <Select.Icon>
                                        <CaretDown size={20} />
                                    </Select.Icon>
                                </Select.Trigger>

                                <Select.Portal className="bg-zinc-900 text-sm pl-4 rounded">
                                    <Select.Content>
                                        <Select.Viewport>
                                            {games.map((game) => (
                                                <Select.Item
                                                    key={game.id}
                                                    className="flex justify-start items-center py-2 text-zinc-500 cursor-pointer focus:text-white text-sm"
                                                    value={game.id}
                                                >
                                                    <Select.ItemText>
                                                        {game.title}
                                                    </Select.ItemText>
                                                </Select.Item>
                                            ))}
                                        </Select.Viewport>
                                        <Select.ScrollDownButton />
                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>
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

                                    <ToggleGroup.Root
                                        type="multiple"
                                        className="grid grid-cols-4 gap-2"
                                        value={weekdays}
                                        onValueChange={setWeekdays}
                                    >
                                        <ToggleGroup.Item
                                            value="0"
                                            type="button"
                                            className={`w-8 h-8 rounded transition-colors ${
                                                weekdays.includes('0')
                                                    ? 'bg-violet-500'
                                                    : 'bg-zinc-900'
                                            }`}
                                            title="Sunday"
                                        >
                                            S
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            value="1"
                                            type="button"
                                            className={`w-8 h-8 rounded transition-colors ${
                                                weekdays.includes('1')
                                                    ? 'bg-violet-500'
                                                    : 'bg-zinc-900'
                                            }`}
                                            title="Monday"
                                        >
                                            M
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            value="2"
                                            type="button"
                                            className={`w-8 h-8 rounded transition-colors ${
                                                weekdays.includes('2')
                                                    ? 'bg-violet-500'
                                                    : 'bg-zinc-900'
                                            }`}
                                            title="Tuesday"
                                        >
                                            T
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            value="3"
                                            type="button"
                                            className={`w-8 h-8 rounded transition-colors ${
                                                weekdays.includes('3')
                                                    ? 'bg-violet-500'
                                                    : 'bg-zinc-900'
                                            }`}
                                            title="Wednesday"
                                        >
                                            W
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            value="4"
                                            type="button"
                                            className={`w-8 h-8 rounded transition-colors ${
                                                weekdays.includes('4')
                                                    ? 'bg-violet-500'
                                                    : 'bg-zinc-900'
                                            }`}
                                            title="Thursday"
                                        >
                                            T
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            value="5"
                                            type="button"
                                            className={`w-8 h-8 rounded transition-colors ${
                                                weekdays.includes('5')
                                                    ? 'bg-violet-500'
                                                    : 'bg-zinc-900'
                                            }`}
                                            title="Friday"
                                        >
                                            F
                                        </ToggleGroup.Item>
                                        <ToggleGroup.Item
                                            value="6"
                                            type="button"
                                            className={`w-8 h-8 rounded transition-colors ${
                                                weekdays.includes('6')
                                                    ? 'bg-violet-500'
                                                    : 'bg-zinc-900'
                                            }`}
                                            title="Saturday"
                                        >
                                            S
                                        </ToggleGroup.Item>
                                    </ToggleGroup.Root>
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

                        <label className="mt-2 flex gap-2 text-sm items-center">
                            <Checkbox.Root
                                className="w-6 h-6 rounded bg-zinc-900 p-1"
                                onCheckedChange={(checked) =>
                                    checked
                                        ? setUseVoiceChat(true)
                                        : setUseVoiceChat(false)
                                }
                                checked={useVoiceChat}
                            >
                                <Checkbox.Indicator className="">
                                    <Check className="w-4 h-4 text-emerald-400" />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            I usually use voice chat
                        </label>

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
        </>
    );
}
