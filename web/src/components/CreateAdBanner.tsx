import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner() {
    return (
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

                <Dialog.Trigger className="py-3 px-4 text-white bg-violet-500 hover:bg-violet-600 rounded flex items-center gap-3">
                    <MagnifyingGlassPlus size={24} />
                    Publish ticket
                </Dialog.Trigger>
            </div>
        </div>
    );
}
