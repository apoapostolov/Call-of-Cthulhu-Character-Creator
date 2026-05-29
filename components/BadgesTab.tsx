import React from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { SCOUT_RANKS, getScoutRank } from '../eras/campfire-tales/scout-rules';

type Badge = {
    name: string;
    benefit: string;
    skill?: string;
    increase?: number;
};

const BadgeCard: React.FC<{
    badge: Badge;
    earned: boolean;
    disabled?: boolean;
    reason?: string;
    actionLabel: string;
    onToggle?: () => void;
}> = ({ badge, earned, disabled, reason, actionLabel, onToggle }) => (
    <div className={`relative overflow-hidden rounded-xl border p-4 shadow-sm transition-all ${earned ? 'border-primary bg-primary/10' : 'border-border bg-card'} ${disabled ? 'opacity-60' : ''}`}>
        <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-secondary/40" />
        <div className="relative flex h-full flex-col">
            <div className="mb-3">
                <h4 className="font-lora text-lg font-bold text-primary">{badge.name}</h4>
                {reason ? <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{reason}</p> : null}
            </div>
            <p className="mb-4 flex-1 text-sm text-muted-foreground">
                {badge.skill && badge.increase ? (
                    <strong className="text-foreground">{badge.skill} +{badge.increase}. </strong>
                ) : null}
                {badge.benefit}
            </p>
            <label className={`flex min-h-10 items-center justify-center gap-2 rounded-md border px-2 py-2 text-xs font-bold ${disabled ? 'border-border bg-muted text-muted-foreground' : 'border-border bg-background text-foreground hover:border-primary'}`}>
                <input
                    type="checkbox"
                    checked={earned}
                    disabled={disabled}
                    onChange={onToggle}
                />
                {actionLabel}
            </label>
        </div>
    </div>
);

export const BadgesTab: React.FC = () => {
    const {
        selectedOccupation,
        selectedAgeCategory,
        earnedScoutBadges,
        selectedScoutRankBadge,
        setScoutRankBadge,
        selectedScoutAbilityBadges,
        toggleScoutAbilityBadge,
        scoutAbilityBadgeAllowance,
        campfireRankBadges,
        campfireAbilityBadges,
    } = useCharacterContext();

    const currentRank = getScoutRank(selectedAgeCategory);
    const currentRankIndex = SCOUT_RANKS.findIndex(rank => rank.id === currentRank.id);
    const eligibleRankBadges = new Set(SCOUT_RANKS.slice(0, currentRankIndex + 1).map(rank => rank.badge));
    const hobbyBadges = selectedOccupation?.startingBadges?.filter((badge: string) => badge !== 'Ability Badge of Choice') || [];
    const selectedAbilityCount = selectedScoutAbilityBadges.length;
    const abilityLimitReached = selectedAbilityCount >= scoutAbilityBadgeAllowance;

    const getRankReason = (badgeName: string) => {
        if (badgeName === 'Wayfarer Scout Badge') return 'Always earned';
        if (badgeName === currentRank.badge) return 'Current rank';
        if (eligibleRankBadges.has(badgeName)) return 'Eligible replacement';
        return 'Future rank';
    };

    const getAbilityReason = (badgeName: string) => {
        if (hobbyBadges.includes(badgeName) && selectedScoutAbilityBadges.includes(badgeName)) return 'Hobby default';
        if (selectedScoutAbilityBadges.includes(badgeName)) return 'Selected';
        return undefined;
    };

    if (!selectedOccupation) {
        return (
            <div className="mx-auto max-w-4xl rounded-lg border border-border bg-card p-6 text-center shadow-xl shadow-primary-900/15">
                <h2 className="mb-2 font-lora text-3xl font-bold text-primary">Scout Badges</h2>
                <p className="text-muted-foreground">Choose a hobby on the Characteristics tab to begin tracking badges.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl rounded-lg border border-border bg-card p-6 shadow-xl shadow-primary-900/15">
            <div className="mb-8 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Wayfarer Field Handbook</p>
                <h2 className="font-lora text-4xl font-bold text-primary">Scout Badges</h2>
                <p className="mx-auto mt-2 max-w-3xl text-muted-foreground">
                    Every scout begins with the Wayfarer Scout Badge, a rank badge, and ability badges based on rank. Older scouts may
                    replace Wanderer with a rank badge up to their current rank and select one additional ability badge per rank step.
                </p>
            </div>

            <section className="mb-8">
                <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h3 className="font-lora text-2xl font-bold text-primary">Rank Badges</h3>
                        <p className="text-sm text-muted-foreground">Wayfarer is always earned. Choose one rank badge allowed by the scout rank.</p>
                    </div>
                    <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        {currentRank.name} Scout
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {campfireRankBadges.map((badge: Badge) => {
                        const isWayfarer = badge.name === 'Wayfarer Scout Badge';
                        const isEligible = isWayfarer || eligibleRankBadges.has(badge.name);
                        const earned = isWayfarer || selectedScoutRankBadge === badge.name || earnedScoutBadges.includes(badge.name);

                        return (
                            <BadgeCard
                                key={badge.name}
                                badge={badge}
                                earned={earned}
                                disabled={isWayfarer || !isEligible}
                                reason={getRankReason(badge.name)}
                                actionLabel={isWayfarer ? 'Earned' : 'Selected'}
                                onToggle={() => setScoutRankBadge(badge.name)}
                            />
                        );
                    })}
                </div>
            </section>

            <section>
                <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h3 className="font-lora text-2xl font-bold text-primary">
                            Ability Badges ({selectedAbilityCount} of {scoutAbilityBadgeAllowance} Badges Selected)
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            The hobby badge is selected by default when it is specific. Toggle badges here to match Keeper-approved advancement.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {campfireAbilityBadges.map((badge: Badge) => {
                        const earned = selectedScoutAbilityBadges.includes(badge.name);
                        const disabled = !earned && abilityLimitReached;

                        return (
                            <BadgeCard
                                key={badge.name}
                                badge={badge}
                                earned={earned}
                                disabled={disabled}
                                reason={getAbilityReason(badge.name)}
                                actionLabel="Earned"
                                onToggle={() => toggleScoutAbilityBadge(badge.name)}
                            />
                        );
                    })}
                </div>
            </section>
        </div>
    );
};
