// disorders-data.ts
import type { Disorder } from './types';

export const DISORDERS: Disorder[] = [
    // --- From Violence ---
    {
        name: 'Addiction',
        description: 'Relies on a substance or habit to cope. Losing 2+ SAN can trigger an overwhelming need (-20% penalty to tests). Going 24 hours without costs 1D6 WP and prevents WP recovery.',
        source: 'Violence',
        weight: 15
    },
    {
        name: 'Depression',
        description: 'Suffers from total despair. Reminders of trauma can trigger an acute episode, where every skill or stat test costs 1D4 WP to perform.',
        source: 'Violence',
        weight: 15
    },
    {
        name: 'Intermittent Explosive Disorder',
        description: 'Sudden, uncontrollable fury. Losing 2+ SAN can trigger an episode of irrational rage, potentially leading to attacking whatever is nearby.',
        source: 'Violence',
        weight: 8
    },
    {
        name: 'Ligyrophobia (Fear of Loud Noises)',
        description: 'Fear of loud noises like gunfire or explosions. During an acute episode, suffers a -20% penalty to SAN-related rolls and tests.',
        source: 'Violence',
        weight: 4
    },
    {
        name: 'Paranoia',
        description: 'Extreme suspicion and fear of invisible enemies. Losing 2+ SAN can trigger an acute episode, making it impossible to trust others.',
        source: 'Violence',
        weight: 10
    },
    {
        name: 'PTSD',
        description: 'Suffers nightmares and flashbacks from a life-threatening event. Reminders can trigger episodes of violence or acute depression.',
        source: 'Violence',
        weight: 20
    },
    {
        name: 'Sleep Disorder',
        description: 'Must make a SAN test to sleep. Failure results in terror-filled awakenings and prevents WP recovery for 24 hours.',
        source: 'Violence',
        weight: 10
    },

    // --- From Helplessness ---
    {
        name: 'Totemic Compulsion',
        description: 'Fixates on an object from a trauma. Being without it for more than an hour triggers a -10% penalty to every skill test, stat test, and SAN roll.',
        source: 'Helplessness',
        weight: 3
    },
    {
        name: 'Anxiety Disorder',
        description: 'Chronic worry and panic attacks. Losing 2+ SAN can trigger an acute episode, imposing a -20% penalty to all skill tests, stat tests, and SAN rolls.',
        source: 'Helplessness',
        weight: 15
    },
    {
        name: 'Conversion Disorder',
        description: 'Temporary insanity or reaching Breaking Point can trigger temporary blindness, deafness, or paralysis until the stress subsides.',
        source: 'Helplessness',
        weight: 1
    },
    {
        name: 'Dissociative Identity Disorder',
        description: 'Temporary insanity or reaching Breaking Point can cause an alternate identity to take control, with its own personality and memories.',
        source: 'Helplessness',
        weight: 1
    },
    {
        name: 'Enclosure-Related Phobia',
        description: 'Agoraphobia (fear of open spaces) or claustrophobia (fear of enclosed spaces). Triggers impose a -20% penalty to SAN tests.',
        source: 'Helplessness',
        weight: 6
    },
    {
        name: 'Obsession',
        description: 'Fixation on a person, place, or idea. Losing 2+ SAN can trigger an episode where long-term actions suffer a -20% penalty.',
        source: 'Helplessness',
        weight: 8
    },
    {
        name: 'Obsessive-Compulsive Disorder (OCD)',
        description: 'Compulsively repeats actions to relieve anxiety. Losing 2+ SAN can trigger an episode imposing a -20% penalty to all tests until the compulsion is satisfied.',
        source: 'Helplessness',
        weight: 7
    },
    {
        name: 'Fugues',
        description: 'Temporary insanity or reaching Breaking Point can cause the Agent to shut down into catatonia or wander in a dissociated daze.',
        source: 'Helplessness',
        weight: 2
    },
    {
        name: 'Megalomania',
        description: 'Delusions of superiority. Losing 2+ SAN can trigger an episode of arrogant certainty where social and moral constraints fail.',
        source: 'Helplessness',
        weight: 2
    }
];
