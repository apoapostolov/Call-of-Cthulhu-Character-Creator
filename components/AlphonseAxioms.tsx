import React, { useState, useRef } from 'react';

export const AlphonseAxioms: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const axioms = [
        "The first commandment is, Thou shall not get caught. You do not have a “get out of jail free” card. You do not have a license to kill. To the world outside Delta Green, you are a criminal, a terrorist and a traitor. If you are arrested, you will keep quiet, say nothing and take what’s coming. Getting you out of custody is not A-cell’s problem, unless A-cell needs you for something.",
        "Always have your go-bag packed and ready for a Night at the Opera. Your go-bag should include sanitized gear, weapons, cash, clothing and false identification that can be used and abandoned during a Night at the Opera.",
        "Stick to code names and cover names. The less you learn about each other during an operation the safer you all are. You can’t betray what you don’t know. This is doubly true when dealing with Friendlies.",
        "Always keep to your cover identity. Your cover should always be someone with a reason for asking the questions you need answered.",
        "Prepare a new cover after every Night at the Opera. Covers last only as long as they are necessary. Even the best covers can’t stand up to intense scrutiny. Make them, use them, ditch them.",
        "Other than sticking to your cover, never lie to a fellow member of Delta Green. About anything. Ever. Unless A-cell says otherwise.",
        "Always lie to anyone who isn’t a member of Delta Green. About everything. Always. And make sure your lies are specific and consistent.",
        "Friendlies can know the truth about an individual operation. They can never know the truth about Delta Green.",
        "Always scout your destination, no matter how secure you think it is. Never bring the whole team to do surveillance. Be inconspicuous. See the enemy first.",
        "Always perform a counter-surveillance check before you camp down and before you move. Perfect paranoia is perfect awareness.",
        "Never do anything alone. Always have someone watch your back. When you are sleeping, pissing, eating, searching a location, interviewing a witness, or when your nose is buried in research, have someone watching your six.",
        "Always establish a rally point in case the team has to scatter and regroup. The rally point should be tactically advantageous in the event that not everyone manages to shake pursuers and the opportunity arises to ambush them. The rally point should be pre-stocked with anything you need to escape the opposition: money, travel documents, a spare vehicle if you can manage it.",
        "If you’re attacked, break contact. Do not stand and fight when the opposition has the initiative. Retreat, regroup at the rally point, go back later and kill them in their sleep.",
        "Any operation can be aborted. If it feels wrong, it is wrong.",
        "Never take a chance if you don’t have to. You are harder to replace than you think. Your death, injury or disappearance will be difficult to explain.",
        "Don’t wait until you see the whites of their eyes. If firearms have no effect, it’s best to find that out while you still have the time and the space to break contact.",
        "Give no “fair warnings.” Surprise is the only advantage you have. Taking live prisoners usually carries more operational hazards than benefits.",
        "If you do take prisoners and you plan on interrogating them, never leave them together to cook up a story between them. Unless, of course, you’ve bugged their cell.",
        "Torture rarely works on our brand of opposition. Be prepared to find another way in. Look for the opposition’s laptops, notepads, cell phones, documents, and journals. Passwords and encryption are often broken more easily and more reliably than men.",
        "Assume nothing. Don’t believe what you are told. Double-check it yourself.",
        "Everyone is always potentially under control by the opposition. Including your teammates.",
        "Don’t harass the opposition. Save your energy, limit your exposure, strike when you are ready. Be utterly thorough. Be utterly ruthless.",
        "Don’t ever go into any place if you don’t know how to get out. This includes buildings, neighborhoods, cities, states and countries. Always work backwards. Establish your line of retreat first.",
        "Always take a different route getting out than you took going in.",
        "Think carefully before you steer law enforcement officers toward the opposition. Law enforcement officers are unprepared for the supernatural and high casualties are likely. LEOs may not be prepared to prevent escapes or the loss of critical opposition assets. They do, however, make an excellent distraction.",
        "When embedded with an agency that is pursuing its legitimate remit, act with extreme caution. Remember that in this situation you are working without cover. The host agency’s goals are not our goals. You may have to undermine their mission in order to accomplish our mission.",
        "Recognize when it’s time to call A-cell for help, especially when embedded in a legitimate investigation. Oversight and legitimate duties can prevent you from directly accomplishing your objectives. Other cells can execute the mission while you act as a conduit for intelligence. Don’t marry the mission.",
        "Always check the nearest Green Box and stock it with leftover supplies. If there isn’t a Green Box nearby, create one.",
        "Don’t lose a tail until you arrange for someone to follow the guys following you. Find out where they go and what they do.",
        "Never start shooting until you identify the opposition and confirm their numbers and capabilities.",
        "If you find a target during the day, wait and attack under cover of darkness. It won’t just hide your numbers and actions from the enemy, it will hide your actions from innocent bystanders you won’t have to eliminate later.",
        "Never search an occupied structure. If you are entering an occupied structure, it’s called an assault. Dress accordingly.",
        "Don’t kick down the front door. Make your own entry point. This applies to most situations, both literally and figuratively.",
        "Calculate the opposition’s strength and identity from a prudent distance. Send in closer reconnaissance after all other options are exhausted. Take your time. Do not rush. If you’re made, back off. Someone else can kill them later.",
        "When you don’t have enough force to assault the opposition’s stronghold, burn it. Flush them and ambush their escape route.",
        "Use your pre-paid burner cell phone. Turn it off and take out the batteries when it’s not in use. Throw it away after the Opera. Other than that, stick to randomly selected public landlines when contacting A-Cell. You shouldn’t be calling anyone else during an Opera.",
        "Cell phones are tracked by employers and family alike. Make sure your personal cell phone is wherever your cover story says you are supposed to be.",
        "You’re safer if you never get out of range of encrypted radio with your teammates. You’re safest if you never get out of each others’ sight.",
        "Use old cars. No Lojack, no GPS, no Siri, no satellite radio, no airbags, no automatic locks. Manual everything, if you can get it.",
        "Never bring anything to the Opera if you can’t drop it and walk away. Never bring anything you didn’t buy with cash. Never, ever bring anything your home agency issued to you. Ever.",
        "Do not use hypergeometry, medieval metaphysics or any other system of planar manipulation that could be taken for magick. You will become part of the problem. Concentrate on solving the problem before the supernatural becomes your only option. If you do end up using such systems, always tell A-Cell that you did. The consequences are far preferable to having A-Cell find out later that you kept it a secret.",
        "Never leave teammates behind where the authorities can find them.",
        "Always report back to A-cell. Even if that means leaving your team to die.",
        "If you are successful, you won’t have to explain your actions to A-Cell. A-Cell will be the final arbiter of your success.",
    ];
    
    const handleToggle = () => {
        const willBeOpen = !isOpen;
        setIsOpen(willBeOpen);

        if (willBeOpen) {
            // A short delay to allow the CSS transition to begin,
            // then scroll the content into view.
            setTimeout(() => {
                contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-6">
            <button
                onClick={handleToggle}
                className="w-full flex items-center justify-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 hover:border-green-600/50 transition-all duration-300"
                aria-expanded={isOpen}
                aria-controls="axioms-content"
            >
                <i className={`fa-solid ${isOpen ? 'fa-folder-open' : 'fa-folder'} text-green-400 transition-all duration-300`}></i>
                <span className="font-bold text-green-400 uppercase tracking-wider font-sans">Alphonse's Axioms for Agents</span>
            </button>
            <div
                ref={contentRef}
                id="axioms-content"
                className={`transition-all duration-700 ease-in-out overflow-hidden ${isOpen ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="mt-2 p-6 bg-black/30 border border-gray-700/50 rounded-lg text-gray-400">
                    <p className="mb-6 italic">The following are time-tested and blood-proven rules of thumb for staying alive and effective as an agent of Delta Green. Commit them to memory.</p>
                    <ol className="list-decimal list-inside space-y-3 font-mono">
                        {axioms.map((axiom, index) => (
                            <li key={index} className="pl-2 border-l-2 border-gray-700/50">{axiom}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};