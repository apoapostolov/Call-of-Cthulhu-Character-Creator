// AUTO-GENERATED from data/weapons/WEAPONS_MODERN.json to avoid JSON imports in AI Studio
export type WeaponRec = {
  name: string;
  skill: string;
  specialization: string | null;
  damage: string;
  base_range: string;
  base_range_yards: number | null;
  uses_per_round: string;
  uses_per_round_int: number | null;
  mag: string;
  mag_int: number | null;
  cost: { c1920s: number | null; modern: number | null };
  malfunction: string;
  eras: string[];
  category: string;
  source: { book: string; page: number | null };
};

export const WEAPONS_MODERN: WeaponRec[] = [
  {
    "name": "Bow and Arrows",
    "skill": "Firearms",
    "specialization": "Bow",
    "damage": "1D6+½DB",
    "base_range": "30 yards",
    "base_range_yards": 30,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "1",
    "mag_int": 1,
    "cost": {
      "c1920s": 7,
      "modern": 75
    },
    "malfunction": "97",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Brass Knuckles",
    "skill": "Fighting",
    "specialization": "Brawl",
    "damage": "1D3+1+DB",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": 1,
      "modern": 10
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Burning Torch",
    "skill": "Fighting",
    "specialization": "Brawl",
    "damage": "1D6+burn",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": 0.05,
      "modern": 0.5
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Chainsaw (†)",
    "skill": "Fighting",
    "specialization": "Chainsaw",
    "damage": "2D8",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": 300
    },
    "malfunction": "95",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Blackjack (Cosh, life-preserver)",
    "skill": "Fighting",
    "specialization": "Brawl",
    "damage": "1D8+DB",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": 2,
      "modern": 15
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Club, large (baseball, cricket bat, poker)",
    "skill": "Fighting",
    "specialization": "Brawl",
    "damage": "1D8+DB",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": 3,
      "modern": 35
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Club, small (nightstick)",
    "skill": "Fighting",
    "specialization": "Brawl",
    "damage": "1D6+DB",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": 3,
      "modern": 35
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Garrote (†)",
    "skill": "Fighting",
    "specialization": "Garrote",
    "damage": "1D6+DB",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": 0.5,
      "modern": 3
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Knife, Large (machete, etc.) (†)",
    "skill": "Fighting",
    "specialization": "Brawl",
    "damage": "1D8+DB",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": 4,
      "modern": 50
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Knife, Medium (carving knife, etc.) (†)",
    "skill": "Fighting",
    "specialization": "Brawl",
    "damage": "1D4+2+DB",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": 2,
      "modern": 15
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Knife, Small (switchblade, etc.) (†)",
    "skill": "Fighting",
    "specialization": "Brawl",
    "damage": "1D4+DB",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": 2,
      "modern": 6
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Live Wire, 220-volt charge",
    "skill": "Fighting",
    "specialization": "Brawl",
    "damage": "2D8+Stun",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "95",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Mace Spray*",
    "skill": "Fighting",
    "specialization": "Brawl",
    "damage": "Stun",
    "base_range": "6 feet",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "25 Squirts",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": 10
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Nunchaku",
    "skill": "Fighting",
    "specialization": "Flail",
    "damage": "1D8+DB",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": 1,
      "modern": 10
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Rock, Thrown",
    "skill": "Throw",
    "specialization": null,
    "damage": "1D4+½DB",
    "base_range": "STR feet",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Shuriken (†)",
    "skill": "Throw",
    "specialization": null,
    "damage": "1D3+½DB",
    "base_range": "20 yards",
    "base_range_yards": 20,
    "uses_per_round": "2",
    "uses_per_round_int": 2,
    "mag": "One Use",
    "mag_int": null,
    "cost": {
      "c1920s": 0.5,
      "modern": 3
    },
    "malfunction": "100",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Spear (cavalry lance) (†)",
    "skill": "Fighting",
    "specialization": "Spear",
    "damage": "1D8+1",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": 25,
      "modern": 150
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Sword, heavy (cavalry saber)",
    "skill": "Fighting",
    "specialization": "Sword",
    "damage": "1D8+1+DB",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": 30,
      "modern": 75
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Sword, medium (rapier, heavy epee) (+)",
    "skill": "Fighting",
    "specialization": "Sword",
    "damage": "1D6+1+DB",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": 15,
      "modern": 100
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Sword, light (sharpened fencing foil, sword cane) (+)",
    "skill": "Fighting",
    "specialization": "Sword",
    "damage": "1D6+DB",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": 25,
      "modern": 100
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Taser (contact) (+)",
    "skill": "Fighting",
    "specialization": "Brawl",
    "damage": "1D3+stun",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "Varies",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": 200
    },
    "malfunction": "97",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Taser (dart) (+)",
    "skill": "Firearms",
    "specialization": "Handgun",
    "damage": "1D3+stun",
    "base_range": "15 feet",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "3",
    "mag_int": 3,
    "cost": {
      "c1920s": null,
      "modern": 400
    },
    "malfunction": "95",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": "Wood Axe (+)",
    "skill": "Fighting",
    "specialization": "Axe",
    "damage": "1D8+2+DB",
    "base_range": "Touch",
    "base_range_yards": null,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": 5,
      "modern": 10
    },
    "malfunction": "-",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Table XVII: Weapons — Hand-to-Hand Weapons"
  },
  {
    "name": ".22 Short Automatic",
    "skill": "Firearms",
    "specialization": "handgun",
    "damage": "1D6",
    "base_range": "10 yards",
    "base_range_yards": 10,
    "uses_per_round": "1 (3)",
    "uses_per_round_int": null,
    "mag": "6",
    "mag_int": 6,
    "cost": {
      "c1920s": 25,
      "modern": 190
    },
    "malfunction": "100",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Handguns (i)*"
  },
  {
    "name": ".32 or 7.65mm Revolver",
    "skill": "Firearms",
    "specialization": "handgun",
    "damage": "1D8",
    "base_range": "15 yards",
    "base_range_yards": 15,
    "uses_per_round": "1 (3)",
    "uses_per_round_int": null,
    "mag": "6",
    "mag_int": 6,
    "cost": {
      "c1920s": 15,
      "modern": 200
    },
    "malfunction": "100",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Handguns (i)*"
  },
  {
    "name": ".32 or 7.65mm Automatic",
    "skill": "Firearms",
    "specialization": "handgun",
    "damage": "1D8",
    "base_range": "15 yards",
    "base_range_yards": 15,
    "uses_per_round": "1 (3)",
    "uses_per_round_int": null,
    "mag": "8",
    "mag_int": 8,
    "cost": {
      "c1920s": 20,
      "modern": 350
    },
    "malfunction": "99",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Handguns (i)*"
  },
  {
    "name": ".357 Magnum Revolver",
    "skill": "Firearms",
    "specialization": "handgun",
    "damage": "1D8+1D4",
    "base_range": "15 yards",
    "base_range_yards": 15,
    "uses_per_round": "1 (3)",
    "uses_per_round_int": null,
    "mag": "6",
    "mag_int": 6,
    "cost": {
      "c1920s": null,
      "modern": 425
    },
    "malfunction": "100",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Handguns (i)*"
  },
  {
    "name": ".38 or 9mm Revolver",
    "skill": "Firearms",
    "specialization": "handgun",
    "damage": "1D10",
    "base_range": "15 yards",
    "base_range_yards": 15,
    "uses_per_round": "1 (3)",
    "uses_per_round_int": null,
    "mag": "6",
    "mag_int": 6,
    "cost": {
      "c1920s": 25,
      "modern": 200
    },
    "malfunction": "100",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Handguns (i)*"
  },
  {
    "name": ".38 Automatic",
    "skill": "Firearms",
    "specialization": "handgun",
    "damage": "1D10",
    "base_range": "15 yards",
    "base_range_yards": 15,
    "uses_per_round": "1 (3)",
    "uses_per_round_int": null,
    "mag": "8",
    "mag_int": 8,
    "cost": {
      "c1920s": 30,
      "modern": 375
    },
    "malfunction": "99",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Handguns (i)*"
  },
  {
    "name": "Beretta M9",
    "skill": "Firearms",
    "specialization": "handgun",
    "damage": "1D10",
    "base_range": "15 yards",
    "base_range_yards": 15,
    "uses_per_round": "1 (3)",
    "uses_per_round_int": null,
    "mag": "15",
    "mag_int": 15,
    "cost": {
      "c1920s": null,
      "modern": 500
    },
    "malfunction": "98",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Handguns (i)*"
  },
  {
    "name": "Glock 17 9mm Auto",
    "skill": "Firearms",
    "specialization": "handgun",
    "damage": "1D10",
    "base_range": "15 yards",
    "base_range_yards": 15,
    "uses_per_round": "1 (3)",
    "uses_per_round_int": null,
    "mag": "17",
    "mag_int": 17,
    "cost": {
      "c1920s": null,
      "modern": 500
    },
    "malfunction": "98",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Handguns (i)*"
  },
  {
    "name": "Model P08 Luger",
    "skill": "Firearms",
    "specialization": "handgun",
    "damage": "1D10",
    "base_range": "15 yards",
    "base_range_yards": 15,
    "uses_per_round": "1 (3)",
    "uses_per_round_int": null,
    "mag": "8",
    "mag_int": 8,
    "cost": {
      "c1920s": 75,
      "modern": 600
    },
    "malfunction": "99",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Handguns (i)*"
  },
  {
    "name": ".44 Magnum Revolver",
    "skill": "Firearms",
    "specialization": "handgun",
    "damage": "1D10+1D4+2",
    "base_range": "15 yards",
    "base_range_yards": 15,
    "uses_per_round": "1 (3)",
    "uses_per_round_int": null,
    "mag": "6",
    "mag_int": 6,
    "cost": {
      "c1920s": null,
      "modern": 475
    },
    "malfunction": "100",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Handguns (i)*"
  },
  {
    "name": ".45 Revolver",
    "skill": "Firearms",
    "specialization": "handgun",
    "damage": "1D10+2",
    "base_range": "15 yards",
    "base_range_yards": 15,
    "uses_per_round": "1 (3)",
    "uses_per_round_int": null,
    "mag": "6",
    "mag_int": 6,
    "cost": {
      "c1920s": 30,
      "modern": 300
    },
    "malfunction": "100",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Handguns (i)*"
  },
  {
    "name": ".45 Automatic",
    "skill": "Firearms",
    "specialization": "handgun",
    "damage": "1D10+2",
    "base_range": "15 yards",
    "base_range_yards": 15,
    "uses_per_round": "1 (3)",
    "uses_per_round_int": null,
    "mag": "7",
    "mag_int": 7,
    "cost": {
      "c1920s": 40,
      "modern": 375
    },
    "malfunction": "100",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Handguns (i)*"
  },
  {
    "name": "IMI Desert Eagle",
    "skill": "Firearms",
    "specialization": "handgun",
    "damage": "1D10+1D6+3",
    "base_range": "15 yards",
    "base_range_yards": 15,
    "uses_per_round": "1 (3)",
    "uses_per_round_int": null,
    "mag": "7",
    "mag_int": 7,
    "cost": {
      "c1920s": null,
      "modern": 650
    },
    "malfunction": "94",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Handguns (i)*"
  },
  {
    "name": ".22 Bolt-Action Rifle",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "1D6+1",
    "base_range": "30 yards",
    "base_range_yards": 30,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "6",
    "mag_int": 6,
    "cost": {
      "c1920s": 13,
      "modern": 70
    },
    "malfunction": "99",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Rifles (i)*"
  },
  {
    "name": ".30 Lever-Action Carbine",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "2D6",
    "base_range": "50 yards",
    "base_range_yards": 50,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "15",
    "mag_int": 15,
    "cost": {
      "c1920s": 19,
      "modern": 150
    },
    "malfunction": "98",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Rifles (i)*"
  },
  {
    "name": "SKS Carbine",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "2D6+1",
    "base_range": "90 yards",
    "base_range_yards": 90,
    "uses_per_round": "1 (2)",
    "uses_per_round_int": null,
    "mag": "10",
    "mag_int": 10,
    "cost": {
      "c1920s": 500,
      "modern": null
    },
    "malfunction": "97",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Rifles (i)*"
  },
  {
    "name": ".303 Lee-Enfield",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "2D6+4",
    "base_range": "110 yards",
    "base_range_yards": 110,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "5",
    "mag_int": 5,
    "cost": {
      "c1920s": 50,
      "modern": 300
    },
    "malfunction": "100",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Rifles (i)*"
  },
  {
    "name": ".30-06 Bolt-Action Rifle",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "2D6+4",
    "base_range": "110 yards",
    "base_range_yards": 110,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "5",
    "mag_int": 5,
    "cost": {
      "c1920s": 75,
      "modern": 175
    },
    "malfunction": "100",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Rifles (i)*"
  },
  {
    "name": ".30-06 Semi-Automatic Rifle",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "2D6+4",
    "base_range": "110 yards",
    "base_range_yards": 110,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "5",
    "mag_int": 5,
    "cost": {
      "c1920s": 275,
      "modern": null
    },
    "malfunction": "100",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Rifles (i)*"
  },
  {
    "name": ".444 Marlin Rifle",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "2D8+4",
    "base_range": "110 yards",
    "base_range_yards": 110,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "5",
    "mag_int": 5,
    "cost": {
      "c1920s": 400,
      "modern": null
    },
    "malfunction": "98",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Rifles (i)*"
  },
  {
    "name": "Elephant Gun (2B)",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "3D6+4",
    "base_range": "100 yards",
    "base_range_yards": 100,
    "uses_per_round": "1 or 2",
    "uses_per_round_int": null,
    "mag": "2",
    "mag_int": 2,
    "cost": {
      "c1920s": 400,
      "modern": 1800
    },
    "malfunction": "100",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Rifles (i)*"
  },
  {
    "name": "12-gauge Shotgun (2B)",
    "skill": "Firearms",
    "specialization": "shotgun",
    "damage": "4D6/2D6/1D6",
    "base_range": "10/20/50 yards",
    "base_range_yards": 50,
    "uses_per_round": "2",
    "uses_per_round_int": 2,
    "mag": "2",
    "mag_int": 2,
    "cost": {
      "c1920s": 40,
      "modern": 200
    },
    "malfunction": "100",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Shotguns*"
  },
  {
    "name": "12-gauge Shotgun (Pump)",
    "skill": "Firearms",
    "specialization": "shotgun",
    "damage": "4D6/2D6/1D6",
    "base_range": "10/20/50 yards",
    "base_range_yards": 50,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "5",
    "mag_int": 5,
    "cost": {
      "c1920s": 45,
      "modern": 100
    },
    "malfunction": "100",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Shotguns*"
  },
  {
    "name": "12-gauge Shotgun (semi-auto)",
    "skill": "Firearms",
    "specialization": "shotgun",
    "damage": "4D6/2D6/1D6",
    "base_range": "10/20/50 yards",
    "base_range_yards": 50,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "5",
    "mag_int": 5,
    "cost": {
      "c1920s": 45,
      "modern": 100
    },
    "malfunction": "100",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Shotguns*"
  },
  {
    "name": "12-gauge Benelli M3 (folding stock)",
    "skill": "Firearms",
    "specialization": "shotgun",
    "damage": "4D6/2D6/1D6",
    "base_range": "10/20/50 yards",
    "base_range_yards": 50,
    "uses_per_round": "1 or 2",
    "uses_per_round_int": null,
    "mag": "7",
    "mag_int": 7,
    "cost": {
      "c1920s": null,
      "modern": 895
    },
    "malfunction": "100",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Shotguns*"
  },
  {
    "name": "12-gauge SPAS (folding stock)",
    "skill": "Firearms",
    "specialization": "shotgun",
    "damage": "4D6/2D6/1D6",
    "base_range": "10/20/50 yards",
    "base_range_yards": 50,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "8",
    "mag_int": 8,
    "cost": {
      "c1920s": null,
      "modern": 600
    },
    "malfunction": "98",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Shotguns*"
  },
  {
    "name": "AK-47 or AKM",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "2D6+1",
    "base_range": "100 yards",
    "base_range_yards": 100,
    "uses_per_round": "1 (2) or full auto",
    "uses_per_round_int": null,
    "mag": "30",
    "mag_int": 30,
    "cost": {
      "c1920s": null,
      "modern": 200
    },
    "malfunction": "100",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Assault Rifles (i)"
  },
  {
    "name": "AK-74",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "2D6",
    "base_range": "110 yards",
    "base_range_yards": 110,
    "uses_per_round": "1 (2) or full auto",
    "uses_per_round_int": null,
    "mag": "30",
    "mag_int": 30,
    "cost": {
      "c1920s": null,
      "modern": 1000
    },
    "malfunction": "97",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Assault Rifles (i)"
  },
  {
    "name": "Barrett Model 82",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "2D10+1D8+6",
    "base_range": "250 yards",
    "base_range_yards": 250,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "11",
    "mag_int": 11,
    "cost": {
      "c1920s": null,
      "modern": 3000
    },
    "malfunction": "96",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Assault Rifles (i)"
  },
  {
    "name": "FN FAL Light Automatic",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "2D6+4",
    "base_range": "110 yards",
    "base_range_yards": 110,
    "uses_per_round": "1 (2) or burst 3",
    "uses_per_round_int": null,
    "mag": "20",
    "mag_int": 20,
    "cost": {
      "c1920s": null,
      "modern": 1500
    },
    "malfunction": "97",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Assault Rifles (i)"
  },
  {
    "name": "Galil Assault Rifle",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "2D6",
    "base_range": "110 yards",
    "base_range_yards": 110,
    "uses_per_round": "1 or full auto",
    "uses_per_round_int": null,
    "mag": "30",
    "mag_int": 30,
    "cost": {
      "c1920s": null,
      "modern": 2000
    },
    "malfunction": "98",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Assault Rifles (i)"
  },
  {
    "name": "M16A2",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "2D6",
    "base_range": "110 yards",
    "base_range_yards": 110,
    "uses_per_round": "1 (2) or burst 3",
    "uses_per_round_int": null,
    "mag": "30",
    "mag_int": 30,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "97",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Assault Rifles (i)"
  },
  {
    "name": "M4",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "2D6",
    "base_range": "90 yards",
    "base_range_yards": 90,
    "uses_per_round": "1 or burst 3",
    "uses_per_round_int": null,
    "mag": "30",
    "mag_int": 30,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "97",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Assault Rifles (i)"
  },
  {
    "name": "Steyr AUG",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "2D6",
    "base_range": "110 yards",
    "base_range_yards": 110,
    "uses_per_round": "1 (2) or full auto",
    "uses_per_round_int": null,
    "mag": "30",
    "mag_int": 30,
    "cost": {
      "c1920s": null,
      "modern": 1100
    },
    "malfunction": "99",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Assault Rifles (i)"
  },
  {
    "name": "Beretta M70/90",
    "skill": "Firearms",
    "specialization": "rifle",
    "damage": "2D6",
    "base_range": "110 yards",
    "base_range_yards": 110,
    "uses_per_round": "1 or full auto",
    "uses_per_round_int": null,
    "mag": "30",
    "mag_int": 30,
    "cost": {
      "c1920s": null,
      "modern": 2800
    },
    "malfunction": "99",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Assault Rifles (i)"
  },
  {
    "name": "Heckler & Koch MP5",
    "skill": "Firearms",
    "specialization": "SMG",
    "damage": "1D10",
    "base_range": "20 yards",
    "base_range_yards": 20,
    "uses_per_round": "1 (2) or full auto",
    "uses_per_round_int": null,
    "mag": "15/30",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "97",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Submachine Guns (i)"
  },
  {
    "name": "Ingram MAC-11",
    "skill": "Firearms",
    "specialization": "SMG",
    "damage": "1D10",
    "base_range": "15 yards",
    "base_range_yards": 15,
    "uses_per_round": "1 (3) or full auto",
    "uses_per_round_int": null,
    "mag": "32",
    "mag_int": 32,
    "cost": {
      "c1920s": null,
      "modern": 750
    },
    "malfunction": "96",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Submachine Guns (i)"
  },
  {
    "name": "Skorpion SMG",
    "skill": "Firearms",
    "specialization": "SMG",
    "damage": "1D8",
    "base_range": "15 yards",
    "base_range_yards": 15,
    "uses_per_round": "1 (3) or full auto",
    "uses_per_round_int": null,
    "mag": "20",
    "mag_int": 20,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "96",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Submachine Guns (i)"
  },
  {
    "name": "Uzi SMG",
    "skill": "Firearms",
    "specialization": "SMG",
    "damage": "1D10",
    "base_range": "20 yards",
    "base_range_yards": 20,
    "uses_per_round": "1 (2) or full auto",
    "uses_per_round_int": null,
    "mag": "32",
    "mag_int": 32,
    "cost": {
      "c1920s": null,
      "modern": 1000
    },
    "malfunction": "98",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Submachine Guns (i)"
  },
  {
    "name": "Minigun*",
    "skill": "Firearms",
    "specialization": "MG",
    "damage": "2D6+4",
    "base_range": "200 yards",
    "base_range_yards": 200,
    "uses_per_round": "Full auto",
    "uses_per_round_int": null,
    "mag": "-",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "98",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Machine Guns (i)"
  },
  {
    "name": "FN Minimi, 5.56mm",
    "skill": "Firearms",
    "specialization": "MG",
    "damage": "2D6",
    "base_range": "110 yards",
    "base_range_yards": 110,
    "uses_per_round": "Full auto",
    "uses_per_round_int": null,
    "mag": "30/200",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "99",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Machine Guns (i)"
  },
  {
    "name": "Molotov Cocktail",
    "skill": "Throw",
    "specialization": null,
    "damage": "2D6+burn",
    "base_range": "STR feet",
    "base_range_yards": null,
    "uses_per_round": "1/2",
    "uses_per_round_int": null,
    "mag": "1 only",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "95",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  },
  {
    "name": "Signal Handgun (flare gun)",
    "skill": "Firearms",
    "specialization": "HG",
    "damage": "1D10+1D3 burn",
    "base_range": "10",
    "base_range_yards": null,
    "uses_per_round": "1/2",
    "uses_per_round_int": null,
    "mag": "1",
    "mag_int": 1,
    "cost": {
      "c1920s": 15,
      "modern": 75
    },
    "malfunction": "100",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  },
  {
    "name": "M79 Grenade Launcher",
    "skill": "Firearms",
    "specialization": "Heavy",
    "damage": "3D10/2 yards",
    "base_range": "20",
    "base_range_yards": null,
    "uses_per_round": "1/3",
    "uses_per_round_int": null,
    "mag": "1",
    "mag_int": 1,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "99",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  },
  {
    "name": "Dynamite Stick*",
    "skill": "Throw",
    "specialization": null,
    "damage": "4D10/3 yards",
    "base_range": "STR feet",
    "base_range_yards": null,
    "uses_per_round": "1/2",
    "uses_per_round_int": null,
    "mag": "1 only",
    "mag_int": null,
    "cost": {
      "c1920s": 2,
      "modern": 5
    },
    "malfunction": "99",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  },
  {
    "name": "Blasting Cap",
    "skill": "Electrical Repair",
    "specialization": null,
    "damage": "2D10/1 yard",
    "base_range": "N/A",
    "base_range_yards": null,
    "uses_per_round": "N/A",
    "uses_per_round_int": null,
    "mag": "One use",
    "mag_int": null,
    "cost": {
      "c1920s": 20,
      "modern": null
    },
    "malfunction": "100",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  },
  {
    "name": "Pipe Bomb",
    "skill": "Demolitions",
    "specialization": null,
    "damage": "1D10/3 yards",
    "base_range": "In place",
    "base_range_yards": null,
    "uses_per_round": "One use",
    "uses_per_round_int": null,
    "mag": "1 only",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "95",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  },
  {
    "name": "Plastique (C-4), 4 oz.",
    "skill": "Demolitions",
    "specialization": null,
    "damage": "6D10/3 yards",
    "base_range": "In place",
    "base_range_yards": null,
    "uses_per_round": "One use",
    "uses_per_round_int": null,
    "mag": "1 only",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "99",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  },
  {
    "name": "Hand Grenade*",
    "skill": "Throw",
    "specialization": null,
    "damage": "4D10/3 yards",
    "base_range": "STR feet",
    "base_range_yards": null,
    "uses_per_round": "1/2",
    "uses_per_round_int": null,
    "mag": "1",
    "mag_int": 1,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "99",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  },
  {
    "name": "81mm Mortar",
    "skill": "Artillery",
    "specialization": null,
    "damage": "6D10/6 yards",
    "base_range": "500 yards",
    "base_range_yards": 500,
    "uses_per_round": "2",
    "uses_per_round_int": 2,
    "mag": "Separate",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "100",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  },
  {
    "name": "75mm Field Gun",
    "skill": "Artillery",
    "specialization": null,
    "damage": "10D10/2 yards",
    "base_range": "500 yards",
    "base_range_yards": 500,
    "uses_per_round": "1/4",
    "uses_per_round_int": null,
    "mag": "Separate",
    "mag_int": null,
    "cost": {
      "c1920s": 1500,
      "modern": null
    },
    "malfunction": "99",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  },
  {
    "name": "120mm Tank Gun (stabilized)",
    "skill": "Artillery",
    "specialization": null,
    "damage": "15D10/4 yards",
    "base_range": "2,000 yards",
    "base_range_yards": 0,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "Separate",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "100",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  },
  {
    "name": "Ship-mounted 5-inch rifle, stabilized",
    "skill": "Artillery",
    "specialization": null,
    "damage": "12D10/4 yards",
    "base_range": "3,000 yards",
    "base_range_yards": 0,
    "uses_per_round": "2",
    "uses_per_round_int": 2,
    "mag": "Auto-magazine",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "98",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  },
  {
    "name": "Anti-Personnel Mine",
    "skill": "Demolitions",
    "specialization": null,
    "damage": "4D10/5 yards",
    "base_range": "In place",
    "base_range_yards": null,
    "uses_per_round": "In place",
    "uses_per_round_int": null,
    "mag": "One use",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "99",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  },
  {
    "name": "Claymore Mine*",
    "skill": "Demolitions",
    "specialization": null,
    "damage": "6D6/20 yards",
    "base_range": "In place",
    "base_range_yards": null,
    "uses_per_round": "In place",
    "uses_per_round_int": null,
    "mag": "One use",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "99",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  },
  {
    "name": "Flamethrower",
    "skill": "Firearms",
    "specialization": "Flamethrower",
    "damage": "2D6+burn",
    "base_range": "25 yards",
    "base_range_yards": 25,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "At least 10",
    "mag_int": null,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "93",
    "eras": [
      "1920s",
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  },
  {
    "name": "LAW*",
    "skill": "Firearms",
    "specialization": "Heavy",
    "damage": "8D10/1 yard",
    "base_range": "150 yards",
    "base_range_yards": 150,
    "uses_per_round": "1",
    "uses_per_round_int": 1,
    "mag": "1",
    "mag_int": 1,
    "cost": {
      "c1920s": null,
      "modern": null
    },
    "malfunction": "98",
    "eras": [
      "Modern"
    ],
    "source": {
      "book": "Call of Cthulhu Core Rulebook, 7th edition",
      "page": null
    },
    "category": "Explosives, Heavy Weapons, Misc. (i)"
  }
]
