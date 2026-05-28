export const INFORMATION_DATA: Record<string, { short: string; long: string }> = {
    // --- TOP LEVEL CONCEPTS ---
    'ataglance_overview': {
        short: 'A quick guide to the modal’s At a Glance questions: what arrest powers actually confer, when weapons are expected versus unusual, how official funds and travel credit work, and what “operational budget/restricted items” covers—gear, data access, and approvals.',
        long: `## At a Glance
Each agency includes a few questions that summarize what it offers to Delta Green.

### "Powers of Arrest?"
This indicates whether the agency deploys law-enforcement officers trained and authorized to make arrests. (An Agent without arrest powers can make a so-called "citizen's arrest" but has no special legal protections.)

### "Expected to Carry a Weapon?"
This indicates whether the public would be surprised to see someone from the agency armed. Outside combat that usually means a pistol. Most law-enforcement officers are expected to carry sidearms most of the time while in the United States. Military personnel are expected to carry weapons in combat or on missions. Everyone else is governed by the same laws as civilians.

Every city, county, and state in the U.S. has its own laws regarding civilians carrying weapons. Government facilities and airports forbid anyone to have a firearm who is not a guard or law-enforcement officer on duty. They screen entrants with metal detectors, chemical sniffers, and/or pat-downs.

### "Access to Official Funds?"
Most agencies give their personnel credit cards to use for official purposes, especially when traveling.

### "Operational Budget/Restricted Items?"
This entry suggests unusual equipment and access that an Agent from this agency can seek.`
    },
    'law_enforcement_overview': {
        short: 'A fast primer on federal law enforcement in Delta Green, focusing on the FBI, DEA, ICE, and the U.S. Marshals Service—who they are, what they investigate, how they coordinate with locals and other feds, and why these agencies often supply Agents and credible covers.',
        long: `## Law Enforcement
This section describes the federal law enforcement agencies most frequently involved in Delta Green operations: the FBI, the DEA, ICE, and the U.S. Marshals Service.`
    },
    'defense_overview': {
        short: 'What the Department of Defense brings to the table: the Army, Air Force, Navy, Marine Corps, and SOCOM. Learn their missions, culture, and deployment patterns, plus when military support is available for domestic crises and overseas operations.',
        long: `## Defense
This section provides an overview of the service branches of the Department of Defense and details for the U.S. Army, the U.S. Air Force, the U.S. Navy, the U.S. Marine Corps, and SOCOM.`
    },
    'intelligence_diplomacy_overview': {
        short: 'The Intelligence Community and the Department of State in brief: who gathers and analyzes secrets, who negotiates abroad, and how CIA, DOS, and related entities intersect with Delta Green operations, cover stories, clearances, and foreign access points.',
        long: `## Intelligence and Diplomacy
This section describes the CIA and the U.S. Department of State, the intelligence and diplomacy organizations most frequently involved in Delta Green operations.`
    },
    'public_safety_overview': {
        short: 'Public safety partners at a glance: CDC and EPA. When outbreaks, toxins, and environmental crimes threaten lives, these agencies bring scientific expertise, emergency coordination, and legal authority—often providing credible covers for unusual investigations.',
        long: `## Public Safety
This section describes the Centers for Disease Control and Prevention and the EPA, the public safety agencies most frequently involved in Delta Green operations.`
    },

    // --- LAW ENFORCEMENT DETAILS ---
    'le_jurisdiction': {
        short: 'How U.S. jurisdictions overlap across municipal, county/parish, state, tribal, and federal levels. Who handles major crimes, traffic, and ordinances; when federal interests take the lead; and why cross-agency cooperation, deputization, and task forces are so common.',
        long: `## Jurisdiction
Many layers of government overlap in the United States. There are municipal governments in towns and cities, county or parish governments, state governments, tribal governments, and the federal government. Nearly every one of these governments imposes laws that must be enforced. Nearly every one approaches law enforcement differently.

As a rule of thumb, state laws cover traffic regulations and major crimes such as murder, robbery, burglary, rape, and drug possession. County and municipal ordinances typically cover local, "quality of life" issues dealing with noise, garbage, and property maintenance.

- **Municipal police officers** enforce municipal ordinances, county ordinances, and state laws. Small municipalities often request assistance from county and state investigators.
- **County or parish police officers** (usually sheriff's deputies) enforce county ordinances and state laws but not municipal ordinances. County or parish officers often assist local and state police.
- **State police officers** enforce state laws but not county or municipal ordinances. Most visibly, state troopers enforce traffic laws on state highways. State investigators often assist local and county officers in major criminal cases. State investigators are sometimes invited by local and county police agencies to investigate officer-involved shootings, as an alternative to having local or county detectives investigate their co-workers.

On Indian reservations, the choice of law depends on the parties. Minor offenses are usually covered by tribal law and investigated by tribal police; but if one party is Indian and the other is not, federal law applies instead. Major offenses typically are covered by federal laws; but if both parties are non-Indian, state law applies instead.

Federal laws are enforced by federal law-enforcement agencies, not by state, county, or municipal police. But local police often make reports on suspected violations of federal law, which they provide to federal agents to assist in prosecution. And local police officers are often deputized to enforce federal laws.`
    },
    'le_enforcement_matrix': {
        short: 'A quick matrix for who enforces what: municipal, county/parish, state, tribal, and federal officers each have defined lanes. Use this to decide which badges have authority on a scene—and when you need a task force, a warrant, or a federal handoff.',
        long: `### Which Laws May a Police Officer Enforce?
- **Municipal officer:** Enforces municipal ordinances, county or parish ordinances, and state laws; does not enforce tribal or federal laws.
- **County or parish officer:** Enforces county or parish ordinances and state laws; does not enforce municipal, tribal, or federal laws.
- **State officer:** Enforces state laws; does not enforce municipal, county/parish, tribal, or federal laws.
- **Tribal officer:** Enforces tribal laws; does not enforce municipal, county/parish, state, or federal laws.
- **Federal officer:** Enforces federal laws; does not enforce municipal, county/parish, state, or tribal laws.`
    },
    'le_deputization': {
        short: 'How federal agencies deputize local officers: the paperwork, oath, and credentials; the powers that come with it—concealed carry nationwide, arrest authority, and independent evidence work; and why long-running deputations (DEA especially) are common on task forces.',
        long: `## Deputization
Most federal law-enforcement agencies have a process to deputize local police officers to work with the federal agency's authority as part of a task force. The best known are the United States Marshals Service's Fugitive Task Forces, the FBI's Organized Crime/Drug Enforcement Task Forces (OCDETF), and the DEA's ubiquitous Task Force Officer program.

A deputy must fill out paperwork confirming he or she willingly takes on the responsibility and has not been convicted of a federal crime. A federal judge, or a special agent (or deputy marshal) from the agency, swears the deputy in and provides credentials. Deputation credentials—a card or paper which must be carried—define the dates when the deputation began and will end, a case number, and contact information for the agent who initiated the deputation.

Deputization allows the officer to carry a concealed firearm anywhere in the United States, to investigate and gather evidence without the requirement to pass that information to the deputy's home agency, and to make arrests in pursuit of the case.

Many deputizations are specific to individual cases and only apply while the deputy is on duty. Some (particularly the DEA) keep local officers on deputated duty for years.`
    },
    'le_field_offices': {
        short: 'What a typical field office can provide: a small armory (sidearms, shotguns, a few carbines, armor, and tactical gear), a modest motor pool with one or two armored SUVs, desk space with networked systems, and checkout access to smartphones and encrypted laptops.',
        long: `## Field Offices
Law enforcement field offices come in many sizes and shapes, but most have equipment and resources in common. A typical field office has a small armory with handguns, shotguns, a small number of carbines, bulletproof vests, and tactical and emergency gear such as walkie talkies, flashlights, binoculars, zip ties, duct tape, and extensive first aid kits.

A typical field office has a motor pool of a few ordinary automobiles and one or two armored SUVs (usually referred to as "LAVs" or "lightly armored vehicles").

A field office can provide an Agent who works at that agency with a small workstation including a computer (with access to both classified and unclassified networks) and office equipment. Most field offices have communal smartphones and encrypted laptops that can be checked out by visiting personnel.`
    },
    'le_other_agencies': {
        short: 'Other key law-enforcement players: ATF (guns, explosives, arson), CBP (border and ports), USCG (maritime patrol and SAR), and USSS (protectees and financial crimes). They often intersect with Delta Green ops and can be sources of Agents or useful cover.',
        long: `## Other Law Enforcement Agencies
These agencies are prominent in U.S. law enforcement and occasionally produce Delta Green recruits.

**BUREAU OF ALCOHOL, TOBACCO, FIREARMS AND EXPLOSIVES (ATF):** Investigates and prevents federal offenses involving the unlawful use, manufacture, and possession of firearms and explosives; acts of arson and bombings; and illegal trafficking of alcohol and tobacco products.

**CUSTOMS AND BORDER PROTECTION (CBP):** Tasked with ensuring the border is secure and reliable. CBP allows authorized people and goods to enter the United States, while endeavoring to make it hard for illegal people and items to cross the border.

**U.S. COAST GUARD (USCG):** Patrols maritime borders, ports and rivers. The USCG prevents unauthorized vessels from entering the U.S., responds to disasters, and conducts search-and-rescue operations. The USCG is officially a member of the uniformed services and the armed forces, but is component of the Department of Homeland Security. It is the only branch of the military with widespread law enforcement powers.

**U.S. SECRET SERVICE (USSS):** Protects the nation's leaders and its financial infrastructure. The first mission involves guarding the President and other key leaders and dignitaries as well as high-visibility facilities. The second mission focuses on financial crimes such as wire fraud, money laundering and counterfeiting.`
    },
    'le_gear_grades': {
        short: 'What “law-enforcement grade” vs. “military grade” gear really means. Heavier weapons, explosives, armor, and long-range comms skew military; police kits tend to be lighter, with surplus SWAT options. These lines blur via counterterror programs and surplus transfers.',
        long: `## "Law Enforcement"-Grade and "Military"-Grade Gear
The distinction between "law enforcement" and "military" equipment is often blurry. The U.S. government provides military-grade armaments to police forces around the country as part of counterterrorism programs. But here are some rules of thumb.

**MILITARY GRADE:** Includes fully automatic and heavy weapons, explosives meant to kill (not just to breach and stun), accessories like grenade launchers and advanced sighting/range-finding equipment, and heavy body armor. Military-grade equipment is often more robust than its civilian or law enforcement equivalents, designed to operate for extended periods of time in battlefield conditions. Communication equipment covers many kilometers and tends to be bulky and sturdy.

**LAW-ENFORCEMENT GRADE:** Generally includes fewer options than military-grade. Weapons typically include sidearms, carbines, and shotguns. Heavier rifles and assault rifles are available for tactical situations. Explosives are meant to stun or confuse rather than kill. Sighting equipment tends to be simple optical and laser sights. Communications equipment typically covers a few miles. In most circumstances, body armor covers only the chest. SWAT and advanced tactical equipment often comes from military surplus and may be a few years behind military-grade.`
    },

    // --- FBI ---
    'agency_fbi': {
        short: 'The FBI is DOJ’s lead federal law-enforcement arm and part of the Intelligence Community. It tackles interstate crime, espionage, and especially counterterrorism (over half its budget). With elite training, robust field offices, Legats abroad, SWAT, and HRT, it’s a premier force.',
        long: `## The Federal Bureau of Investigation (FBI)
The Federal Bureau of Investigation is the lead federal law enforcement organization within the United States. It is part of the Department of Justice, but also an independent member of the intelligence community. The FBI investigates serious crimes that cross state lines, espionage, and especially counterterrorism, which accounts for more than half of its budget. The Bureau employs some of the best-trained and best-equipped officers in the country. Its agents frequently coordinate with other law enforcement bodies, domestically and abroad, and operate in diverse teams.

### The Organization
The FBI is headquartered in Washington, D.C., and its Director reports to both the Attorney General and the Director of National Intelligence. The FBI operates field offices in most major cities throughout the United States. The FBI provides law enforcement on many Native American reservations, alongside the Bureau of Indian Affairs and tribal authorities. Each field office and major operation is headed by a Special Agent in Charge (SAC). The FBI maintains a presence abroad through liaisons and the legal attaché (Legat) program.

### Operatives
FBI agents must have college degrees and pass rigorous psychological and physical screenings. Most hold a Top Secret clearance. Training at Quantico involves firearms, tactical vehicle operation, law, surveillance techniques, and other operational skills. HRT agents receive training on par with military special operations. The FBI also employs specialized support personnel including intelligence analysts, language specialists, forensic scientists, and behavioral experts.

### Authority and Mandate
The FBI investigates corruption, civil rights violations, organized crime, crimes committed across state lines, threats to national security, espionage, and terrorism. If the FBI has jurisdiction, it usually takes the lead. Overseas, the FBI works with local law enforcement on crimes connected to U.S. criminal activity.

### Field Operations
FBI agents typically deploy alone or in two-agent teams. They are supported by local FBI field offices with desk space, computers, vehicles, and small arms. In tactical situations, they may be supported by the field office's SWAT team or the national Hostage Rescue Team (HRT). Undercover operations are rare, well-funded, and staffed by seasoned agents with a distinct lack of oversight.

### Areas of Friction
When the FBI takes over a high-profile local case, it can rub other agencies the wrong way. Part of an FBI agent's job is to manage relations with local police, which requires skill in Law, Bureaucracy, and Charisma.

### Playing the Bureau
As an FBI agent, you are a detail-oriented perfectionist. Process is important. You anticipate scrutiny from supervisors, the media, and Congress. The work is intense and stressful, requiring you to be personable and keep your cool under pressure. FBI operations are compartmentalized; if you need to know, you'll be told.`
    },
    'info_fbi_cid': {
        short: "The FBI’s Criminal Investigative Division handles most day-to-day cases and field work: violent crime, organized crime, cybercrime, and complex interstate investigations. If it’s not national security, CID likely leads or supports the matter across field offices.",
        long: `### Criminal Investigative Division (CID)
The Criminal Investigative Division (CID) is responsible for most of the FBI's investigations and field work.`
    },
    'info_fbi_nsb': {
        short: "The National Security Branch focuses on counterterrorism and counterintelligence, fusing operations, analysis, and interagency coordination. Expect higher clearances, JTTF links, and rapid response to threats that span borders and classifications.",
        long: `### National Security Branch (NSB)
The National Security Branch (NSB) specializes in counterterrorism and counterintelligence.`
    },
    'info_fbi_di': {
        short: "The Directorate of Intelligence drives analysis, targeting, and collection—surveillance, counterespionage support, electronic monitoring, and language expertise—feeding criminal and national-security cases with actionable intelligence and briefings.",
        long: `### Directorate of Intelligence
The Directorate of Intelligence is the FBI branch focused on surveillance, counterespionage, electronics, and linguistics.`
    },
    'info_fbi_ioss': {
        short: "IOSS backs dangerous, high-profile cases with niche expertise: Behavioral Analysis Units, ViCAP, crisis management, and cutting-edge tools. When a case needs a specialist or national-level data, IOSS fills gaps and elevates field-office capabilities.",
        long: `### Intelligence and Operations Support Section (IOSS)
The Intelligence and Operations Support Section (IOSS) supports the most high-profile, dangerous, and sensitive investigations by providing highly specialized experts. IOSS includes the vaunted Behavioral Analysis Units, the Violent Criminal Apprehension Program (ViCAP), and the Crisis Management Unit which provides support and training for disasters and high-risk public events.`
    },
    'info_fbi_hrt_swat': {
        short: "FBI HRT and field-office SWAT bring kinetic expertise and rapid takedowns across urban, rural, and austere environments. HRT functions like a national counterterror team; SWAT scales regionally for high-risk warrants, hostage rescues, and barricades.",
        long: `### Hostage Rescue Team (HRT) or SWAT Unit
HRT and SWAT specialize in kinetic tactical know-how and rapid takedowns in all types of environments. HRT is a unique SWAT force that specializes in anti-terror operations.`
    },

    // --- DEA ---
    'agency_dea': {
        short: 'The DEA targets illegal drugs and their networks at home and abroad, often leading when narcotics are central and coordinating with FBI and ICE. Agents are seasoned, pragmatic, and field-forward, with global reach and a task-force culture shaped by hard cases.',
        long: `## The Drug Enforcement Administration (DEA)
The Drug Enforcement Administration interdicts illegal drugs domestically and abroad. The War on Terror has highlighted the nexus between the illegal drug trade and terrorism, and the DEA increasingly counters the business side of terrorism. The DEA coordinates other agencies that participate in US-sponsored drug investigations. It often works closely with the FBI and ICE, but the DEA retains the lead on all investigations that focus on illegal drugs.

### The Organization
The DEA is part of the Department of Justice and is headquartered in Arlington, Virginia. It maintains 21 domestic field divisions and offices in over 60 countries. Key divisions include Operations, Operational Support, Intelligence, and the specialized Foreign-deployed Advisory and Support Teams (FASTs) and Special Operations Division (SOD).

### Operatives
DEA special agents undergo five months of rigorous training at Quantico. The DEA expects to put its agents in harm's way against well-funded narcotraffickers and demands high firearms qualifications.

### Authority and Mandate
The DEA enforces the Controlled Substances Act. The nature of drug trafficking means the DEA is often as focused abroad as it is domestically, particularly on Mexico, Latin America, and Central Asia.

### Field Operations
The DEA prefers to send agents in teams and is well-funded, allowing for independent operations with reasonable credit lines. Field offices provide access to armories, armored SUVs, and surveillance equipment. Undercover operations are prestigious but dangerous, rarely lasting longer than four months.

### Areas of Friction
The DEA operates in a grey area between local/state law enforcement and agencies like the FBI and ICE. DEA agents are often seen by other federal agencies as too eager to use force. They tend to work well with the ATF.

### Playing the DEA
Your life is a mix of street investigations and hated paperwork. You have a clear, no-nonsense mission: stop the flow of drugs. You have pride in your work but some disdain for partner agencies, particularly ICE. Your adversaries are well-funded and well-armed, and the line between informant and enemy is razor thin.`
    },
    'info_dea_ops': {
        short: "Operations Division agents are the backbone of DEA work: building cases, cultivating sources, conducting surveillance, executing warrants, and making arrests. They coordinate with task-force partners and prosecutors to dismantle trafficking organizations end-to-end.",
        long: `### Operations Division
Operations agents are the backbone of DEA operations, conducting investigations and arrests.`
    },
    'info_dea_support': {
        short: "Operational Support provides the subject-matter depth—chemists, cryptographers, forensic accountants, and more—arming case agents with analytics, lab results, and data exploitation that turn seizures and chatter into indictments and network maps.",
        long: `### Operational Support Division
The Support Division is staffed by subject matter experts and provides knowledge support to agents in the field.`
    },
    'info_dea_sod': {
        short: "The Special Operations Division is classified and clandestine, specializing in electronic surveillance—wiretaps, data mining, metadata fusion—and deconfliction, enabling sensitive leads to be acted on without exposing sources, methods, or partner equities.",
        long: `### Special Operations Division (SOD)
A classified and clandestine branch that specializes in electronic surveillance.`
    },
    'info_dea_fast': {
        short: "Foreign-Deployed Advisory Support Teams (FAST) are paramilitary DEA units operating in remote theaters where narcotics are grown and processed. Four are stateside (Arlington, VA) and one is permanently in Afghanistan, pairing advisory roles with kinetic capability.",
        long: `### Foreign-Deployed Advisory Support Teams (FAST)
The DEA's FAST Teams operate as paramilitary units in far-flung areas of the world where narcotics are grown and processed. Four are headquartered in Arlington, Virginia. The fifth is permanently stationed in Afghanistan.`
    },

    // --- ICE ---
    'agency_ice': {
        short: "A sprawling DHS agency responsible for dismantling vulnerabilities in the nation's border, economy, and infrastructure.",
        long: `## Immigration and Customs Enforcement (ICE)
U.S. Immigration and Customs Enforcement is a sprawling law enforcement agency under the Department of Homeland Security (DHS). ICE is responsible for identifying, investigating, and dismantling vulnerabilities in the nation's border, economy, transportation, and infrastructure. It is the second largest criminal investigative agency in the U.S. government, after the FBI.

### The Organization
ICE is led by a Director who answers to the Director of Homeland Security. It has four directorates: Enforcement and Removal Operations (ERO), Homeland Security Investigations (HSI), the Office of the Principal Legal Advisor (OPLA), and Management and Administration (M&A). HSI tracks down suspects, and ERO deals with them through imprisonment or extradition.

### Operatives
ICE recruits must have at least one year of previous law enforcement or investigative work. Trainees go through 22 weeks of training in immigration law, investigative techniques, firearms, and physical fitness. The agency maintains 17 Special Response Teams (SRTs) for high-risk operations.

### Authority and Mandate
HSI agents investigate transnational crimes like human smuggling, drug trafficking, arms trafficking, and cybercrime. They share jurisdiction with the FBI and DEA on drug enforcement, focusing on importation.

### Areas of Friction
ICE is its own worst enemy. Low morale is a continuing problem due to residual culture clashes from its amalgamation from other agencies, low funding, and low salaries. This makes ICE seem like many semi-independent organizations instead of a coherent whole.

### Playing an ICE Agent
You have a huge backlog of work and can get overwhelmed by bureaucracy. A solid supervisor is key to insulating you from this. As a new agent, you likely worked near the border on smuggling and contraband cases. Later, you might move to an interior office to focus on document fraud, narcotics, or child pornography.`
    },
    'info_ice_hsi_ops': {
        short: "The operational arms of Homeland Security Investigations.",
        long: `### HSI Operations
The operational arms of Homeland Security Investigations are Domestic Operations Division (HSI/DO) and International Operations Division (HSI/International Operations).`
    },
    'info_ice_hsi_intel': {
        short: "Provides intelligence and briefing materials for HSI and ERO operations.",
        long: `### Office of Intelligence (HSI/Intelligence)
Provides intelligence and briefing materials for HSI and ERO operations.`
    },
    'info_ice_srt': {
        short: "Provides SWAT support for ICE operations. SRT members are all volunteers.",
        long: `### Special Response Team (SRT)
Provides SWAT support for ICE operations. SRT members are all volunteers, most of whom have regular “day jobs” as agents in other ICE divisions.`
    },
    'info_ice_ero': {
        short: "ERO/RD agents apprehend and transport illegal aliens.",
        long: `### Removal Division (ERO)
ERO/RD agents apprehend and transport illegal aliens.`
    },

    // --- USMS ---
    'agency_usms': {
        short: "The U.S. Marshals Service enforces federal court orders, tracks fugitives, and protects federal court personnel.",
        long: `## U.S. Marshals Service (USMS)
The Marshals Service enforces federal court orders, tracks and apprehends fugitives, transports federal prisoners, manages seized assets, protects federal courts, and runs the witness protection program. Despite its small size, the USMS conducts a proportionally large number of arrests across the country.

### The Organization
The USMS is part of the Department of Justice, based in Arlington, VA. It is divided into directorates, with Operations and Administration being the largest. The service employs just over 5,400 personnel, including nearly 4,000 deputy marshals.

### Operatives
Training for Marshals is intense and held at the Federal Law Enforcement Training Center (FLETC). It focuses on firearms, hand-to-hand combat, protective services, driving, and fugitive tracking techniques. Most officers are deputy marshals, supported by data analysis and electronic surveillance personnel.

### Authority and Mandate
The USMS occupies a central position in the federal justice system. Its responsibility to execute warrants and apprehend fugitives involves it in virtually every federal law enforcement initiative. The USMS is also empowered to deputize other federal, state, or local law enforcement officers.

### Field Operations
Support for deputies comes in the form of additional deputies rather than large budgets. The USMS maintains strong relationships with local authorities, opening up significant resources like detention centers, vehicles, and equipment. The Special Operations Group (SOG) is a specially trained tactical unit deployed in high-risk situations.

### Areas of Friction
The Marshals’ mandate to augment other federal agencies means it is generally appreciated. However, some personnel in other agencies consider deputy marshals unsophisticated. Conflicts can arise during the final stages of executing a warrant over who gets to make the arrest.

### Playing a Deputy
You like being on the street, tracking and apprehending criminals. The Marshals Service isn't as big on paperwork as other agencies; the emphasis is on fieldwork. You get along great with local police and sheriffs' offices, who are your best friends on a mission.`
    },
    'info_usms_io': {
        short: "Responsible for most fieldwork involved in tracking and apprehending fugitives.",
        long: `### Investigative Operations Division
Investigative Operations is responsible for most field work involved in tracking and apprehending fugitives.`
    },
    'info_usms_sog': {
        short: "A highly trained, all-volunteer group of deputy marshals on call to provide SWAT support.",
        long: `### Tactical Operations Division/Special Operations Group (SOG)
The SOG is a highly trained, all-volunteer group of deputy marshals that are on call to provide SWAT support in emergencies.`
    },

    // --- DEFENSE ---
    'agency_dod': {
        short: "An overview of the U.S. armed forces and their role.",
        long: `## The Department of Defense (DoD) Service Branches
The U.S. armed forces are the world’s largest military in personnel, equipment, and budget. The DoD is composed of three main branches: the Army, the Navy, and the Air Force. (The Marine Corps falls under the Department of the Navy). Each branch has a specific mission: the Army on land, the Navy on sea, and the Air Force in the skies.

### The Organizations
The U.S. service branches are massive and complex bureaucracies. They work together under the Unified and Geographic Combatant Commands (COCOMs), which are regionally-focused (e.g., EUCOM for Europe) or functional (e.g., SOCOM for special operations).

### Operatives
U.S. military personnel respect hierarchy and authority. All service branches delineate between enlisted personnel (performers of specialized jobs) and commissioned officers (command and oversight). Warrant officers are highly specialized technical experts ranked between enlisted and commissioned officers.

### Authority and Mandate
The DoD’s mission is to fight wars and support civilians in emergencies. Federal law restricts military deployments inside the U.S., which are typically managed through USNORTHCOM, the Coast Guard, and the National Guard.

### Field Operations
Military operations usually involve deployments as a unit for six months or more. Temporary Duty assignments (TDYs) are shorter and often done individually or in small groups. Travel and purchases are subject to incessant bureaucratic checks, except in clandestine or counterterrorism operations.

### Areas of Friction
The military often does not work well with other parts of the government due to cultural clashes. Many service members adopt an antagonistic “prove it” attitude towards other agencies. Military criminal investigative services are smaller than their federal counterparts and often rely on help from agencies like the FBI, which can engender resentment.

### Playing the Services
Rank and chain of command are of utmost importance. The military loves jargon and acronyms. Teamwork is paramount. Bureaucracy is labyrinthine. If you are in a combat position, you are a breed apart, having lived under extreme pressure with training that builds mental toughness and "muscle memory."`
    },
    'agency_army': {
        short: "The U.S. Army seizes and holds terrain. It is the largest and oldest of the military branches.",
        long: `## U.S. Army
The U.S. Army seizes and holds terrain. It is the largest and oldest of the military branches. It integrates air assets, armored vehicles, infantry, and artillery. It excels in the logistics of moving, supplying, and coordinating large numbers of soldiers.

### The Organization
Army personnel, including reserves and National Guard, number over a million people. The Army is divided into specialized branches such as artillery, infantry, aviation, the Signal Corps, the Corps of Engineers, special operations forces, and armored vehicles.

### Operatives
A member of the Army is called a “soldier.” The Army boasts uniformed personnel of all types. Basic training is followed by Advanced Individualized Training (AIT) for Military Occupational Specialties (MOS). Army veterans know they are the core of the largest and most powerful military in the world. A powerful esprit de corps is inevitable.`
    },
    'agency_usaf': {
        short: "The USAF secures air superiority and provides air support to ground forces.",
        long: `## U.S. Air Force (USAF)
The United States Air Force (USAF) secures air superiority and provides air support to ground forces. It operates the world’s most advanced aircraft, missiles, and communication equipment. It is also responsible for nuclear deterrence, special operations, cyberspace, and missions in space.

### The Organization
The Air Force has over 300,000 uniformed personnel and a large civilian/reserve component. It includes a complex network of commands such as Air Combat Command, Global Strike Command, and Space Command.

### Operatives
A member of the Air Force is an “airman.” Pilots are the princes of the Air Force. Airmen are often drawn to high technology and pursue specialized technical careers. They have a reputation with other services for being part of the “chAir Force” and overvaluing creature comforts, but see themselves as the most progressive and technologically advanced service.`
    },
    'agency_usn': {
        short: "The U.S. Navy fights on the high seas, on coasts and on inland waterways.",
        long: `## U.S. Navy (USN)
The Navy fights on the high seas, on coasts and on inland waterways. It projects American power, protects international shipping lanes, and responds to humanitarian crises. The U.S. Navy is the most powerful navy in the history of the world.

### The Organization
The Navy has over 300,000 active duty personnel. Its forces are organized into numbered fleets assigned to different regions of the world (e.g., Seventh Fleet in the Pacific, Sixth Fleet in the Mediterranean).

### Operatives
A member of the Navy is a “sailor.” Sailors have a reputation for being more relaxed than other service members. The Navy has a diverse range of specialties, from pilots and submariners to intelligence analysts and doctors. Sailors are proud of their traditions and are known for their technical expertise.`
    },
    'agency_usmc': {
        short: "The Marine Corps is a rapid-reaction force trained to fight on land, at sea, and in the air.",
        long: `## U.S. Marine Corps (USMC)
The Marine Corps is a rapid-reaction force that is trained to fight on land, at sea, and in the air. It is an expeditionary force, meaning it is designed to be deployed quickly to hotspots around the world. The Marines are known for their toughness, discipline, and fighting spirit.

### The Organization
The Marine Corps has about 182,000 active duty personnel. It is organized into four Marine Expeditionary Forces (MEFs), which are the principal warfighting organizations of the Corps. Each MEF is a combined-arms force that includes ground, air, and logistics elements.

### Operatives
A member of the Marine Corps is a “Marine.” Marines are known for their pride and esprit de corps. They have a reputation for being aggressive and disciplined. All Marines are trained to be riflemen first, regardless of their specialty. They are a self-contained force that can be deployed with little outside support.`
    },
    'agency_socom': {
        short: "SOCOM oversees the special operations component commands of all military branches.",
        long: `## U.S. Special Operations Command (SOCOM)
SOCOM is the unified combatant command that oversees the various special operations component commands of the Army, Marine Corps, Navy, and Air Force. It is responsible for planning and conducting special operations missions around the world.

### The Organization
SOCOM has about 70,000 personnel. It is organized into a headquarters and several component commands, including USASOC (Army), NAVSPECWARCOM (Navy), AFSOC (Air Force), and MARSOC (Marine Corps).

### Operatives
A member of a special operations unit is a “special operator.” They are known for their physical and mental toughness, technical expertise, and ability to operate in small teams in high-stakes environments. They undergo a rigorous selection and training process and are experts in unconventional warfare, direct action, special reconnaissance, and counter-terrorism.

### Authority and Mandate
SOCOM has a broad mandate to conduct special operations missions around the world, directed by the President or the Secretary of Defense. It has a close relationship with the intelligence community.

### Areas of Friction
SOCOM’s broad mandate can cause friction with other parts of the U.S. government, particularly the State Department. There can also be friction between SOCOM and the conventional military.`
    },
    
    // --- INTELLIGENCE ---
    'agency_ic': {
        short: "An overview of the U.S. Intelligence Community.",
        long: `## The Intelligence Community
The Intelligence Community (IC) is a coalition of 17 agencies and organizations that work to gather and analyze intelligence for foreign relations and national security. The IC is headed by the Director of National Intelligence (DNI).

### Operatives
An operative in the Intelligence Community is an “intelligence officer.” They are known for their analytical skills, discretion, and ability to operate in the shadows.

### Areas of Friction
The IC’s activities can cause friction with other parts of the U.S. government, like the State Department. There can also be rivalry between different agencies within the IC, such as the long-standing turf battles between the CIA and the FBI.`
    },
    'info_ic_clearances': {
        short: "Details on U.S. government security classifications.",
        long: `## Clearances
Security classifications are standardized throughout the federal government. A clearance is an expression of trust. Acquiring a clearance requires a background check where federal officers question friends, family, and neighbors, and investigate the employee’s criminal and financial history.

**UNCLASSIFIED (U):** No special handling required.

**SENSITIVE BUT UNCLASSIFIED (SBU):** Meant to stay within government facilities but may be processed on unencrypted systems.

**CONFIDENTIAL (C):** The lowest level requiring clearance. For information that would be dangerous if released but not threaten national security. Must be processed on encrypted computers (the “High Side”).

**SECRET (S):** For information of significant national security value.

**TOP SECRET (TS):** The highest level, for state secrets that must be handled with extreme care.

**FURTHER RESTRICTIONS:** Special classifications like Special Compartmentalized Information (SCI) control information with even more specificity, often requiring it to be read in special secure rooms.`
    },
    'info_ic_other': {
        short: "Brief descriptions of other intelligence agencies like the DIA and NSA.",
        long: `## Other Intelligence Agencies
Delta Green has deep roots in the intelligence community beyond the CIA.

**DEFENSE INTELLIGENCE AGENCY (DIA):** The Pentagon’s primary all-source intelligence agency, and the chief rival to the CIA for conducting intelligence analysis and covert operations.

**THE NATIONAL COUNTERTERRORISM CENTER (NCTC):** Coordinates intelligence-gathering on terrorism-related threats.

**NATIONAL SECURITY AGENCY (NSA):** Performs computer, signals, data, and network-related espionage. The NSA is the lead agency to monitor and protect all of the federal government’s computer networks from cyber-terrorism.

**NATIONAL GEOSPATIAL INTELLIGENCE AGENCY (NGA):** Provides maps and targeting documents (GEOINT) for strikes against enemy targets.

**NATIONAL RECONNAISSANCE OFFICE (NRO):** Builds top-secret satellites used by the Pentagon and the intelligence community.

**OFFICE OF NAVAL INTELLIGENCE (ONI):** Part of the Navy; the leading provider of maritime intelligence.`
    },
    
    // --- DOS ---
    'agency_dos': {
        short: "The lead U.S. agency on foreign policy and the senior-most federal agency.",
        long: `## The Department of State (DOS)
The State Department is the lead U.S. agency on foreign policy and is technically the senior-most federal agency in the executive branch. It is a key coordinator of other agencies. Foreign Service Officers (FSOs) are typically smart and creative problem solvers. As diplomats, their status opens doors and grants them significant leeway with foreign governments.

### The Organization
More than 250 DOS posts around the world maintain relations with nearly every country. It is a large bureaucracy composed of Foreign Service Officers (FSOs), Civil Service, and specialists.

### Operatives
FSOs represent America abroad, analyze trends, adjudicate visas, and respond to the needs of American citizens. The Diplomatic Security Service (DS) is the law enforcement arm of the DOS, responsible for security of embassies and personnel, and international investigations.

### Authority and Mandate
The core mission of the DOS is to promote U.S. objectives and interests in the world. In foreign countries, the ambassador is usually the ranking U.S. government official.

### Areas of Friction
Diplomats are legendary for being egotistical and can rub other agencies the wrong way. Military and law enforcement officers often see diplomats as pampered and weak-willed.

### Playing a Diplomat
You are adaptable, intelligent, and comfortable as an outsider. You get the best inside information by building rapport. DS agents have one foot in diplomacy and the other in law enforcement, transitioning between a bewildering array of cultures.`
    },

    // --- PUBLIC SAFETY ---
    'agency_cdc': {
        short: "The leading American public health institute, at the forefront of preparing for disease outbreaks.",
        long: `## Centers for Disease Control and Prevention (CDC)
The Centers for Disease Control and Prevention (CDC) is the leading American public health institute, at the forefront of preparing for disease outbreaks or health-related disasters. It is part of the Department of Health and Human Services. The CDC focuses on diseases, disabilities, workplace hazards, environmental health threats, and terrorism preparedness.

### The Organization
The CDC is headquartered outside Atlanta, Georgia. Key offices include the Office of Infectious Disease and the Emergency Operations Center (EOC).

### Operatives
The CDC employs about 15,000 people: scientists, medical engineers, epidemiologists, physicians, nurses, and more.

### Authority and Mandate
The CDC’s authority extends to nearly all health and safety issues in the U.S. It may detain and medically examine anyone suspected of having certain contagious diseases. The CDC can work with local authorities to quarantine an area, though this is rare.

### Field Operations
CDC personnel are rarely first responders. Local health officials usually make first contact. The Global Rapid Response Team (RRT) can deploy in less than 48 hours to a “hot spot” to contain outbreaks. Equipment is mostly located in Atlanta, so wait times can be days.

### Areas of Friction
The CDC has a reputation as a repository for technically brilliant but socially difficult personnel. Other federal agencies do not have a significant history of working with the CDC, requiring a time-consuming period of familiarization on joint deployments.`
    },
    'agency_epa': {
        short: "The EPA protects America from pollution and hazardous chemical releases.",
        long: `## Environmental Protection Agency (EPA)
The U.S. Environmental Protection Agency protects America from the dark side of its industrialized lifestyle. The EPA enforces national pollution standards, requires companies to manage chemical risks, and responds to hazardous chemical releases and oil spills.

### The Organization
The EPA is an independent agency headquartered in Washington, D.C. It divides the U.S. into 10 regions. The Criminal Investigation Division (CID) employs armed special agents who investigate federal environmental crimes.

### Operatives
The EPA employs more than 15,000 scientists, inspectors, lawyers, emergency responders, and investigators. CID special agents receive training in firearms, nonlethal force, interviewing, and processing crime scenes.

### Authority and Mandate
The EPA administers federal environmental laws. It can take criminal, civil, or administrative enforcement actions. CID special agents focus on knowing and willful violations of environmental laws, but their investigations often involve other federal crimes like fraud and conspiracy.

### Field Operations
Much of the EPA’s work occurs in the field. Inspectors, scientists, and responders travel their regions to determine compliance and monitor hazardous sites. The CID operates from Area Offices and Resident Offices in major cities. All EPA officials operate on limited, closely monitored budgets.

### Areas of Friction
The EPA maintains a generally positive relationship with other federal, state, and local officials. State-level environmental agencies often work closely with the EPA. The CID's relationship with other federal law enforcement is generally good.`
    },
};