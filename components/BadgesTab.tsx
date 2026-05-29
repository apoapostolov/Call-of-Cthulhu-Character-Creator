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
        scoutAdditionalAbilityBadgeAllowance,
        scoutHobbyAbilityBadges,
        campfireRankBadges,
        campfireAbilityBadges,
    } = useCharacterContext();
    const [permissionRankBadge, setPermissionRankBadge] = React.useState<Badge | null>(null);

    const currentRank = getScoutRank(selectedAgeCategory);
    const currentRankIndex = SCOUT_RANKS.findIndex(rank => rank.id === currentRank.id);
    const eligibleRankBadges = new Set(SCOUT_RANKS.slice(0, currentRankIndex + 1).map(rank => rank.badge));
    const hobbyBadges = scoutHobbyAbilityBadges || [];
    const selectedAbilityCount = selectedScoutAbilityBadges.length;
    const selectedAdditionalAbilityCount = selectedScoutAbilityBadges.filter((badge: string) => !hobbyBadges.includes(badge)).length;
    const abilityLimitReached = selectedAbilityCount >= scoutAbilityBadgeAllowance;
    const currentRankBadge = currentRank.badge;

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
                    replace Wanderer with a rank badge up to their current rank with Keeper permission and select additional ability badges by rank.
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
                        const rankBadgeIndex = SCOUT_RANKS.findIndex(rank => rank.badge === badge.name);
                        const needsPermission = !isWayfarer && badge.name !== currentRankBadge && rankBadgeIndex >= 0 && rankBadgeIndex < currentRankIndex;

                        return (
                            <BadgeCard
                                key={badge.name}
                                badge={badge}
                                earned={earned}
                                disabled={isWayfarer || !isEligible}
                                reason={getRankReason(badge.name)}
                                actionLabel={isWayfarer ? 'Earned' : 'Selected'}
                                onToggle={() => {
                                    if (needsPermission && !earned) {
                                        setPermissionRankBadge(badge);
                                        return;
                                    }
                                    setScoutRankBadge(badge.name);
                                }}
                            />
                        );
                    })}
                </div>
            </section>

            <section>
                <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h3 className="font-lora text-2xl font-bold text-primary">
                            Ability Badges ({selectedAdditionalAbilityCount} of {scoutAdditionalAbilityBadgeAllowance} Additional Badges Selected)
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            The hobby badge is selected by default and cannot be removed. Toggle additional badges here to match Keeper-approved advancement.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {campfireAbilityBadges.map((badge: Badge) => {
                        const earned = selectedScoutAbilityBadges.includes(badge.name);
                        const lockedHobbyBadge = hobbyBadges.includes(badge.name);
                        const disabled = !earned && abilityLimitReached;

                        return (
                            <BadgeCard
                                key={badge.name}
                                badge={badge}
                                earned={earned}
                                disabled={disabled || lockedHobbyBadge}
                                reason={getAbilityReason(badge.name)}
                                actionLabel="Earned"
                                onToggle={() => toggleScoutAbilityBadge(badge.name)}
                            />
                        );
                    })}
                </div>
            </section>
            {permissionRankBadge && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-labelledby="rank-permission-title">
                    <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl shadow-primary-900/20">
                        <h2 id="rank-permission-title" className="mb-3 font-lora text-2xl font-bold text-primary">Keeper Permission Recommended</h2>
                        <p className="mb-4 text-sm text-muted-foreground">
                            {currentRank.name} scouts normally use the {currentRank.badge}. Selecting {permissionRankBadge.name} means this scout is using a lower rank badge than their current age bracket.
                            Please confirm the Keeper has approved this exception.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setPermissionRankBadge(null)}
                                className="rounded-md border border-border bg-cream-200 px-4 py-2 text-sm font-semibold text-foreground hover:bg-cream-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setScoutRankBadge(permissionRankBadge.name);
                                    setPermissionRankBadge(null);
                                }}
                                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                            >
                                Keeper Agrees
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
