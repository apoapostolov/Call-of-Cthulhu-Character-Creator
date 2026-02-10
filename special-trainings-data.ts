import type { SpecialTraining } from './types';

export const SPECIAL_TRAININGS: SpecialTraining[] = [
    { name: 'Parachuting', basedOn: 'Athletics', description: 'Safe static-line and freefall parachute jumps from an aircraft.' },
    { name: 'SCUBA Gear', basedOn: 'Swim', description: 'Use of self-contained underwater breathing apparatus for extended underwater operations.' },
    { name: 'Lockpicks', basedOn: 'DEX', description: 'Use of lockpick kits to bypass simple tumbler locks. Complements Craft (Locksmithing).' },
    { name: 'Hand Grenades', basedOn: 'Athletics', description: 'Accurate and safe use of hand-thrown fragmentation explosives in combat.' },
    { name: 'Tear Gas & Stun Grenades', basedOn: 'Athletics', description: 'Proper deployment of non-lethal grenades for crowd control and tactical entry.' },
    { name: 'Rappelling', basedOn: 'Athletics', description: 'Safe use of ropes and harnesses to descend vertical surfaces.' },
    { name: 'Explosive Entry / Breaching', basedOn: 'Demolitions', description: 'Use of shaped charges and other explosives for tactical breaching of doors and walls.' },
    { name: 'Advanced Interrogation', basedOn: 'HUMINT', description: 'Techniques for extracting information from resistant subjects, beyond standard questioning.' },
    { name: 'Defensive Driving', basedOn: 'Drive', description: 'Advanced vehicle handling techniques for pursuit and evasion in high-stress situations.' },
    { name: 'Black Markets', basedOn: 'Criminology', description: 'Knowledge of how to navigate and make contacts within illegal or gray markets for goods and services.' },
    { name: 'Electronic Security Systems', basedOn: 'INT', description: 'Understanding and bypassing common electronic security like keycard readers, pressure plates, and laser grids. Complements SIGINT.' },
    { name: 'Drone Piloting', basedOn: 'Pilot', description: 'Operation of small, unmanned aerial vehicles (UAVs) for surveillance and reconnaissance. Requires Pilot (Drone) specialization.' },
    { name: 'Technical Surveillance Counter-Measures (TSCM)', basedOn: 'SIGINT', description: 'Detecting and neutralizing hostile electronic surveillance devices ("bugs").' },
    { name: 'Forensic Accounting', basedOn: 'Accounting', description: 'Analyzing financial records to trace illicit funds and uncover criminal conspiracies.' },
    { name: 'Protective Detail', basedOn: 'Alertness', description: 'Techniques for protecting a principal from threats in public and private settings.' },
    { name: 'Maritime Operations (VBSS)', basedOn: 'Swim', description: 'Visit, Board, Search, and Seizure techniques for intercepting and securing vessels at sea.' },
    { name: 'Cold Weather Operations', basedOn: 'Survival', description: 'Survival, movement, and combat techniques for arctic or high-altitude environments.' },
    { name: 'Urban Warfare', basedOn: 'Military Science', description: 'Tactics for combat in dense, built-up urban environments.' },
    { name: 'Epidemiological Field Work', basedOn: 'Medicine', description: 'Techniques for tracking disease vectors and collecting samples in outbreak zones.' },
    { name: 'BSL-4 Protocols', basedOn: 'Science', description: 'Safety and containment procedures for working with Biosafety Level 4 pathogens.' },
    { name: 'Covert Communications', basedOn: 'SIGINT', description: 'Use of clandestine communication methods, including dead drops, burst transmissions, and codes.' },
    { name: 'Counter-Surveillance', basedOn: 'Alertness', description: 'Techniques for detecting and evading physical surveillance.' },
    { name: 'Hazmat Containment', basedOn: 'Science', description: 'Procedures for safely containing and neutralizing chemical, biological, or radiological spills.' },
    { name: 'Physical Surveillance', basedOn: 'Alertness', description: 'Techniques for covertly following a subject on foot or in a vehicle without being detected. Complements the Stealth skill.' }
];