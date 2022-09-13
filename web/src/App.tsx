import './styles/main.css';

import logoImg from './assets/logonlw.svg';
import { MagnifyingGlassPlus } from 'phosphor-react';
function App() {
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
                <a href="" className="relative rounded-lg overflow-hidden">
                    <img src="/image 1.jpg" alt="" />
                    <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 ">
                        <strong className="font-bold text-white block">
                            League of legends
                        </strong>
                        <span className="text-zinc-300 text-sm block mt-1">
                            4 tickets
                        </span>
                    </div>
                </a>

                <a href="" className="relative rounded-lg overflow-hidden">
                    <img src="/image 7.jpg" alt="" />
                    <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 ">
                        <strong className="font-bold text-white block">
                            League of legends
                        </strong>
                        <span className="text-zinc-300 text-sm block mt-1">
                            4 tickets
                        </span>
                    </div>
                </a>

                <a href="" className="relative rounded-lg overflow-hidden">
                    <img src="/image 2.jpg" alt="" />
                    <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 ">
                        <strong className="font-bold text-white block">
                            League of legends
                        </strong>
                        <span className="text-zinc-300 text-sm block mt-1">
                            4 tickets
                        </span>
                    </div>
                </a>

                <a href="" className="relative rounded-lg overflow-hidden">
                    <img src="/image 3.jpg" alt="" />
                    <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 ">
                        <strong className="font-bold text-white block">
                            League of legends
                        </strong>
                        <span className="text-zinc-300 text-sm block mt-1">
                            4 tickets
                        </span>
                    </div>
                </a>

                <a href="" className="relative rounded-lg overflow-hidden">
                    <img src="/image 5.jpg" alt="" />
                    <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 ">
                        <strong className="font-bold text-white block">
                            League of legends
                        </strong>
                        <span className="text-zinc-300 text-sm block mt-1">
                            4 tickets
                        </span>
                    </div>
                </a>

                <a href="" className="relative rounded-lg overflow-hidden">
                    <img src="/image 6.jpg" alt="" />
                    <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 ">
                        <strong className="font-bold text-white block">
                            League of legends
                        </strong>
                        <span className="text-zinc-300 text-sm block mt-1">
                            4 tickets
                        </span>
                    </div>
                </a>
            </div>

            <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8 ">
                <div className="bg-[#2A2634] px-8 py-6 self-stretch rounded-lg flex justify-between items-center">
                    <div>
                        <strong className="text-2xl text-white font-black block">
                            Could not find your duo?
                        </strong>
                        <span className="text-zinc-300">
                            Publish a ticket to find new players
                        </span>
                    </div>
                    <button className="py-3 px-4 text-white bg-violet-500 hover:bg-violet-600 rounded flex items-center gap-3">
                        <MagnifyingGlassPlus size={24} />
                        Publish ticket
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
