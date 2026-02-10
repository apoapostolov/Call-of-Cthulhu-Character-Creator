# Dark Ages Equipment Kits Implementation

## Overview

Implemented 8 equipment kits for the Dark Ages (1000s) era, following the established patterns from Classic 1920s, Pulp 1930s, Gaslight 1890s, and Western 1870s eras.

## Design Philosophy

The Dark Ages equipment kits reflect the historical reality of the period:

1. **Universal Self-Defense**: Most people carried basic weapons (knives, clubs, staffs) for protection
2. **Armor Rarity**: Armor was expensive and difficult to maintain—only warriors could afford it
3. **Weapon Hierarchy**: Warriors distinguished between personal weapons (always carried) and professional weapons (for battle)
4. **Status Symbols**: The finest armor (chainmail) and weapons (long swords) were marks of high status
5. **Occupational Coverage**: Each kit serves 2+ related occupations

## The 8 Equipment Kits

### 1. WARRIOR KIT
**Occupations**: Warrior (Free), Guard (elite)
**Armor Level**: Heavy (Chainmail - 1D8 armor)
**Status**: High
**Key Items**: 
- Chainmail armor (800d)
- Sword, Long (210d) - status weapon
- Kite shield (1D4+1 armor)
- War horse (600d)
- Professional gear

**Philosophy**: Full professional warrior equipment with the best armor and weapons available. Only warriors could maintain this level of gear.

### 2. MERCENARY / SERGEANT KIT
**Occupations**: Mercenary, Sergeant
**Armor Level**: Medium (Leather, Boiled - 1D6 armor)
**Status**: Moderate
**Key Items**:
- Boiled leather armor (100d)
- Axe, Great (2D6 damage) - professional weapon
- Spear, Long (1D10 damage)
- Field survival gear

**Philosophy**: Battle-tested equipment prioritizing functionality over status. Practical armor that's maintainable in the field.

### 3. GUARD / HOUSEHOLD OFFICER KIT
**Occupations**: Guard, Household Officer
**Armor Level**: Light (Leather, Heavy Quilted - 1D3 armor)
**Status**: Low-Moderate
**Key Items**:
- Heavy quilted leather (60d)
- Mace (1D6 damage) - city weapon
- Spear, Short
- Urban patrol essentials

**Philosophy**: City watch and household defense. Light armor for daily wear, practical weapons for peacekeeping.

### 4. SCHOLAR / CLERIC KIT
**Occupations**: Scholar, Cleric, Priest
**Armor Level**: None
**Status**: High (education)
**Key Items**:
- Scriptorium supplies (parchment, ink, pen)
- Religious/academic robes
- Staff (1D6 damage) - walking aid and defense
- Knife, Small - tool and last resort

**Philosophy**: Intellectual pursuits with minimal defensive capability. Staff serves dual purpose as walking aid and weapon.

### 5. MONK / PILGRIM KIT
**Occupations**: Monk, Pilgrim, Hermit
**Armor Level**: None
**Status**: Low (vow of poverty)
**Status**: 
**Key Items**:
- Simple robes and minimal possessions
- Staff - essential travel companion
- Basic writing materials
- Subsistence gear

**Philosophy**: Poverty and humility. Reliance on charity and hospitality. Staff for both travel and protection.

### 6. MERCHANT / TRADER KIT
**Occupations**: Merchant, Small Trader
**Armor Level**: None
**Status**: Moderate
**Key Items**:
- Tally sticks (accounting)
- Transport (cart and mule)
- Knife, Large - self-defense
- Club - additional protection
- Quality traveling clothes

**Philosophy**: Commerce and travel. Can afford better clothing but not armor. Weapons for road protection.

### 7. HEALER / WOODSMAN KIT
**Occupations**: Healer, Woodsman
**Armor Level**: None
**Status**: Low-Moderate
**Key Items**:
- Leech's kit (500d) - professional medical tools
- Mortar and pestle (herb preparation)
- Knife, Large - primary tool and weapon
- Survival gear

**Philosophy**: Forest dwellers and herbalists. Self-sufficient with nature skills. Multiple knives as essential tools.

### 8. FARMER / CRAFTSPERSON KIT
**Occupations**: Farmer (Free), Craftsperson, Beggar, Juggler
**Armor Level**: None
**Status**: Low
**Key Items**:
- Work tools and implements
- Draft animal (ox)
- Basic clothing and containers
- Knife, Small and Club - minimal defense

**Philosophy**: Working class essentials. Focus on labor tools with minimal defensive capability.

## Historical Accuracy Notes

### Armor Distribution
- **Chainmail**: Only in WARRIOR KIT (800d cost = prohibitive for most)
- **Boiled Leather**: Only in MERCENARY/SERGEANT KIT (100d = affordable for professionals)
- **Heavy Quilted Leather**: Only in GUARD KIT (60d = basic professional armor)
- **No Armor**: 5 out of 8 kits (representing the majority of the population)

### Weapon Patterns
- **Everyone carries something**: Even farmers have a club and knife
- **Status weapons**: Long swords only in WARRIOR KIT (210d)
- **Practical weapons**: Spears, axes, maces, knives, clubs
- **Dual purpose**: Staff serves as walking stick and weapon (Scholars, Monks)

### Economic Realism
- **WARRIOR KIT total**: ~2,400d (matches "Warrior gear" price in official list)
- **FARMER KIT total**: ~150-200d (affordable for free farmers)
- **MERCHANT KIT**: Emphasizes transport and trade tools over weapons

## Integration with Occupations

All 20 Dark Ages occupations are covered:

| Kit | Primary Occupations | Secondary Occupations |
|-----|---------------------|----------------------|
| WARRIOR | Warrior (Free) | Guard (elite) |
| MERCENARY/SERGEANT | Mercenary | Sergeant |
| GUARD/HOUSEHOLD OFFICER | Guard | Household Officer |
| SCHOLAR/CLERIC | Scholar, Cleric | Priest |
| MONK/PILGRIM | Monk, Pilgrim | Hermit |
| MERCHANT/TRADER | Merchant | Small Trader |
| HEALER/WOODSMAN | Healer | Woodsman |
| FARMER/CRAFTSPERSON | Farmer (Free), Craftsperson | Beggar, Juggler, Sailor |

## Item Name Compatibility

All item names match entries in:
- `prices-official.json` (Tools, Clothing, Animals, Vehicles, etc.)
- `weapons-data.ts` (All weapons, shields, and armor)

Item names use exact matches including punctuation and capitalization to ensure proper integration with the pricing and weapons systems.

## Comparison with Other Eras

### Classic 1920s (8 kits)
- Focus: Investigation, journalism, medicine, law enforcement
- Armor: None (peaceful era)
- Weapons: Firearms (revolvers, rifles)

### Pulp 1930s (16 kits: 8 inherited + 8 new)
- Focus: Adventure, crime, government agents
- Armor: None (except specialized)
- Weapons: More firearms variety

### Western 1870s (8 kits)
- Focus: Frontier life, law enforcement, outlaws
- Armor: None (post-medieval)
- Weapons: Firearms (revolvers, rifles, shotguns)

### Gaslight 1890s
- Focus: Victorian investigation and society
- Armor: None
- Weapons: Victorian firearms

### Dark Ages 1000s (8 kits)
- Focus: Medieval occupations and social hierarchy
- Armor: Rare and expensive (3 kits only)
- Weapons: Melee weapons (swords, axes, spears, bows)
- **Unique feature**: Status-based armor distribution reflecting feudal society

## Future Enhancements

Potential additions if needed:
- Sailor/Fisherman specific kit (currently uses FARMER/CRAFTSPERSON)
- Noble/Knight kit (higher status version of WARRIOR)
- Outlaw/Brigand kit (criminal variant)
- Entertainer kit enhancement (currently uses FARMER/CRAFTSPERSON for Juggler)

However, the current 8 kits provide solid coverage for all 20 occupations while maintaining historical authenticity and game balance.
