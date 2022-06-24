export const UwU = {
    Kuba: '251831600512368641',
    Flote: '491660100990140436',
    Tamas: '518823389008232460',
    Senki: '318072258465628161',
    Ninja: '376439826549047296',
    Kurzi: '602525564217327637',
    Swarci: '295485347138240513',
    Karcsi: '279565175588388865',
    Villanyos: '239028474696826891',
    Medimadi: '623899095224025088',
    Dontá: '614513037411352607',
    Dawe: '310497849274007553',
    Zoli: '427542432662683660',
    Szepi: '530668683669012486',
}

export const dzsitParticipants = [
    `<@${UwU.Kuba}>`, `<@${UwU.Flote}>`, `<@${UwU.Tamas}>`,
    `<@${UwU.Kurzi}>`, `<@${UwU.Karcsi}>`, `<@${UwU.Medimadi}>`,
    `<@${UwU.Dawe}>`, `<@${UwU.Swarci}>`
];
export const listCheck = [
    'Kys', 'Flote kussolj', 'Jo reggelt faszom', 'Swarci old',
    'Geci szerb', 'Nem dolgoztam ma', 'Szappanadagoló kész', 'Balaton when'
];

export const channelIds = {
    pornChannelId: '667779656363278367',
    weatherChannelId: '884880382095421550',
    deleteChannelId: '740536932303634473',
    altalanowosId: '661569831111491618',
    pluwusId: '667779656363278367',
    kuwukaId: '671309309757358123',
    owoffId: '667783025811259448',
    sowogodorId: '839885997923237889',
    mowoziId: '699657394506170469',
    muwusicId: '776803915898552320',
    suwuliId: '706776570836156426',
    jatekowosId: '713415837356392508',
    adminId: '704983142452428933',
    botId: '786140249809354793',
    dzsittChannels: ['671309309757358123', '667783025811259448', '839885997923237889', '706776570836156426'],
    noSpamChannels: ['813842740210958446', '841654691225010206', '846424723131072530', '902900685417373737']
};

export const szerbs = [UwU.Tamas, UwU.Kurzi, UwU.Medimadi];

export let voters = [];
export let pinger, HUF;
export function modifyHUF( value ) { HUF = value; }

export const csicskawallText = 
'┌───── •✧Wall Of Csicska✧• ─────┐\n' +
'      Bánhelyi Balázs\n' +
'      **BigBlueButton**\n' +
'      ***C s e n d e s  T i b o r***\n' +
'      Csókás Eszter\n' +
'      Gazdag-Tóth Boglárka Dr.\n' +
'      Gingl Zoltán\n' +
'      Hirling Dominik\n' +
'      Jász Judit\n' +
'      Katona Melinda\n' +
'      Kaposvári Dániel\n' +
'      **Kulin Julia**\n' +
'      **Makan Gergely**\n' +
'      Márkus András\n' +
'      Pletl Szilveszter Dr.\n' +
'      London András\n' +
'      Vida Ágnes\n' +
'└───── •✧✧✧✧✧✧✧✧✧✧• ─────┘';

export const aranywallText = 
'┌──── •✧Wall Of Aranyember✧• ────┐\n' +
'      Antal Gábor\n' +
'      Balogh András\n' +
'      Cservenák Bence\n' +
'      Gazdag Zsolt\n' +
'      Győrffy Lajos\n' +
'      Heinc Emília\n' +
'      Kátai Kamilla\n' +
'      Kardos Péter\n' +
'      Kardos Péter Dr.\n' +
'      Fülöp Vanda\n' +
'      Keleti Márton\n' +
'      Kicsi András\n' +
'      Kunos Ádám\n' +
'      ***Maróti Miklós***\n' +
'      Szabó Tamás\n' +
'      Szabolcs Iván\n' +
'└────── •✧✧✧✧✧✧✧✧✧• ──────┘';

export const helpList = [
    { Parancsok: '`(suspended) !votemute "tag":` (tag helyére tageld meg akit muteolni akarsz 30 sec-re aposztrófok nélkül), meg kell szavazni, 3 szavazat után érvényes. Admint, és botot nem muteolhatsz! \n\n' +
            '`(suspended) !votenick "nicknév" "tag:` nicknév helyére beírod a kívánt nevet, és tageled akinek a nevét meg akarod változtatni, ehhez 6 szavazat kell, hogy sikeres legyen.\n\n' +
            '`!praise + "emote" vagy "szöveg":` isteni magaslatba emelem azt amit megadtál\n\n' +
            '`!kivagy + "tag":` megmondja hogy te ki is vagy valójában. \n\n' +
            '`!csicskawall:` kilistázom a csicska tanárokat\n\n' +
            '`!aranywall:` kilistázom aranyember tanárokat'},
    { Parancsok: '`!ametsu/!amecu:` ametsu kedvenc emote-jait küldöm be\n\n' +
            '`!geci + "valami":` meg dingi-dongizom\n\n' +
            '`!mock + "valami":` retard spongyabobként beszélek\n\n' +
            '`!kurai:` elküldöm karcsi által szeretett vicces reagálást\n\n' +
            '`!list:`, Megtekintheted a napi kötelező szövegek listája hogy halad.\n\n' +
            '`!pisti/!szepi:` pisti az elkerülhetetlen\n\n' +
            '`!medikiakad:` prezentálim mi van akkor, ha MediMadi kiakad'},
    { Parancsok: '`!kurva:` Swarci ordít egyet\n\n' +
            '`!nemtudom:` miért nem lehet tudod? Csalódtam.\n\n' +
            '`!assemble:` UwU egyesülj!\n\n' +
            '`!micsinalsz:` Mégis mit csinálsz??\n\n' +
            '`!faszom:` oh bazdmeg még ez is van\n\n' +
            '`!uwu:` strong together'},
    { Parancsok: '`!springboot:` Oooo spring BOOT\n\n' +
            '`!vicci:` de vicci vagy\n\n' +
            '`!monke:` Return monke\n\n' +
            '`!rule:` A legfőbb szabály\n\n' +
            '`!csokas:` Aki fasszopókás\n\n' +
            '`!hirling:` Mit csinál vajon javítás helyett?'},
    { Parancsok: '`!gay:` Teátrális buzi vagy\n\n' +
            '`!sub + "teszttel rendelkező kurzus":` Feliratkozhatsz olyan ping csoportba, ahol ezt a tesztet töltik ki\n\n' +
            '`!unsub + "teszttel rendelkező kurzus":` Leiratkozol a pingekről\n\n' +
            '`!teszt + "kurzus":` Akik fel vannak iratkozva a kurzusra azokat megpingelem\n\n' +
            '`!risus + "channel név":` Tipik risusing csak te nem használhatod ezt'},
    { Parancsok: '`!bullshit:` Ez bikaszar\n\n' +
            '`!punch:` Megcsaplak\n\n' +
            '`!ugood:` U good? no...\n\n' +
            '`!vonzalom:` Cringe vonzalom emote-ok\n\n' +
            '`!aztakurva:` Tamás aztakurva aranyköpése\n\n' +
            '`!akurva:` A kurva anyád\n\n'},
    { Parancsok: '`"bully"` a szövegben, akkor lespriccelem a másikat.\n\n' +
            '`"no bully"` a szövegben azt eredményezi hogy egy stop képet küldök, az abuse megszüntetésére.\n\n' +
            '`Ha 3x beküldik ugyanazt, akkor megismétlem`\n\n' +
            '`baszadékra szopadékot írok, és fordítva`\n\n' +
            '`medishug-ra madishrugot küldök és fordítva`\n\n' +
            '`brc van a szövegben brc-t reactolok`\n\n' +
            '`maroti, maróti, dimat van a szövegben marótit reactolok`\n\n' +
            '`megcsap, nem mered, nem leszek-re is reactolok`'},
];
