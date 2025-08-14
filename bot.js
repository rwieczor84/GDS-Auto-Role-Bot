// uruchom win+R cmd -> C:\Users\rwiec\discord-auto-role-bot>node bot.js
// odsyłanie sprawdzenia tokena do pliku .env
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// =================================================================================
// KONFIGURACJA BOTA
// =================================================================================
const CONFIG = {
    // Wstaw tutaj token swojego bota 
    TOKEN: process.env.DISCORD_TOKEN, // ukryto token w drugim pliku

    // Ukryty Kanał do logów:    LOG_CHANNEL_ID: '1403761907025973439', // 🤖🔢-bot-logi
    LOG_CHANNEL_ID: '1403761907025973439', // 🤖🔢-bot-logi

    // Ogólny kanał do powiadomień:     NOTIFICATION_CHANNEL_ID: '1280644742635458570', // 🤖-boty-bots
    NOTIFICATION_CHANNEL_ID: '1280644742635458570', // 🤖-boty-bots

    // ID serwera
    GUILD_ID: '1279058196765605951',

    // Konfiguracja automatycznego przypisywania ról
    AUTO_ROLES_CONFIG: [
        { requiredRoles: ['1280084855853551668', '1403446495654576139'], rewardRole: '1403493500741222550', rewardRoleName: 'WFRP Polski 🇵🇱' },
        { requiredRoles: ['1280084855853551668', '1403447883121823764'], rewardRole: '1403494323412140123', rewardRoleName: 'WFRP English 🇬🇧' },
        { requiredRoles: ['1280084855853551668', '1403497738246819991'], rewardRole: '1403496428453757011', rewardRoleName: 'WFRP Français 🇫🇷' },
        { requiredRoles: ['1280084855853551668', '1403497812720877668'], rewardRole: '1403494573912625152', rewardRoleName: 'WFRP Deutsche 🇩🇪' },
        { requiredRoles: ['1280084855853551668', '1403497420557647932'], rewardRole: '1403496941974851714', rewardRoleName: 'WFRP Italiano 🇮🇹' },
        { requiredRoles: ['1400957968052387910', '1403446495654576139'], rewardRole: '1403497219528593428', rewardRoleName: 'TOW Polski 🇵🇱' },
        { requiredRoles: ['1400957968052387910', '1403447883121823764'], rewardRole: '1403497155955527835', rewardRoleName: 'TOW English 🇬🇧' },
        { requiredRoles: ['1400957968052387910', '1403497738246819991'], rewardRole: '1403496745786146949', rewardRoleName: 'TOW Français 🇫🇷' },
        { requiredRoles: ['1400957968052387910', '1403497812720877668'], rewardRole: '1403497106664063016', rewardRoleName: 'TOW Deutsche 🇩🇪' },
        { requiredRoles: ['1400957968052387910', '1403497420557647932'], rewardRole: '1403496973319012393', rewardRoleName: 'TOW Italiano 🇮🇹' },
        { requiredRoles: ['1403458596695707648', '1403446495654576139'], rewardRole: '1403497298310201405', rewardRoleName: 'RPG Polski 🇵🇱' },
        { requiredRoles: ['1403458596695707648', '1403447883121823764'], rewardRole: '1403497188117712897', rewardRoleName: 'RPG English 🇬🇧' },
        { requiredRoles: ['1403458596695707648', '1403497738246819991'], rewardRole: '1403496855014215701', rewardRoleName: 'RPG Français 🇫🇷' },
        { requiredRoles: ['1403458596695707648', '1403497812720877668'], rewardRole: '1403497131083563170', rewardRoleName: 'RPG Deutsche 🇩🇪' },
        { requiredRoles: ['1403458596695707648', '1403497420557647932'], rewardRole: '1403497002871947274', rewardRoleName: 'RPG Italiano 🇮🇹' }
    ],

    // Konfiguracja wiadomości powitalnej
    WELCOME_CHANNEL_ID: '1279430165113344094', // ID: '1279430165113344094' 🔤-powitalny-welcome. Zmieniono z kanału logów.
    WELCOME_MESSAGES: [

// ============================ Polski (priorytet) =========
        { roleId: '1403446495654576139',
            message: (member) => `### Witaj Odważny Awanturniku! 🇵🇱
Cześć ${member}!

🐉 Po wybraniu ***Języka*** oraz ***Systemu RPG*** otrzymujesz dostęp do najważniejszych kanałów na tym serwerze.

🌍 **UWAGA!** Kanał <#1382297391759233076> jest automatycznie tłumaczony. Gdy napiszesz coś na tym kanale tłumaczenie pojawi się na symetrycznym kanale mimo, że go nie widzisz. Ty piszesz na swoim kanale, a użytkownicy w innym języku widzą Twoją przetłumaczoną wiadomość! Znika bariera językowa między użytkownikami.
Aktualnie obsługiwane są kanały w językach :flag_pl: :flag_gb: :flag_fr: :flag_de: :flag_it:

🪬 Ważną kategorią na tym serwerze jest ta dedykowana kampanii Wewnętrzny Wróg ("WeW"). Więcej informacji w <#1280917410182070344>

👉 ${member.user.username}, w razie pytań lub wątpliwości pisz śmiało na <#1280837943128231968>`
        },

// ============================ ANGIELSKI (fallback) =========
        { roleId: '1403447883121823764', message: (member) => `### Welcome, Bold Adventurer! 🇬🇧
Hello ${member}!

🐉 After selecting your ***Language*** and ***RPG System***, you gain access to the most important channels on this server.

🌍 **ATTENTION!** The <#1403501863013322782> channel is automatically translated. When you post something in this channel, the translation will appear in the symmetric channel, even though you can't see it. You post in your own channel, and users in another language see your translated message! The language barrier between users disappears.
Currently supported channels are: :flag_pl: :flag_gb: :flag_fr: :flag_de: :flag_it:

👉 ${member.user.username}, if you have any questions or concerns, feel free to contact us at <#1280837943128231968>` 
        },

// ============================ Francuski =========
        { roleId: '1403497738246819991', message: (member) => `### Bienvenue, Aventurier Intrépide ! 🇫🇷
Bonjour ${member} !

🐉 Après avoir sélectionné votre ***Langue*** et votre ***Système de RPG***, vous accédez aux canaux les plus importants de ce serveur.

🌍 **ATTENTION !** Le canal <#1403500870678741173> est automatiquement traduit. Lorsque vous publiez quelque chose sur ce canal, la traduction apparaîtra dans le canal symétrique, même si vous ne la voyez pas. Vous publiez sur votre propre canal, et les utilisateurs d'une autre langue voient votre message traduit ! La barrière linguistique disparaît.
Les canaux actuellement pris en charge sont : :flag_pl: :flag_gb: :flag_fr: :flag_de: :flag_it:

👉 ${member.user.username}, pour toute question ou préoccupation, n'hésitez pas à nous contacter à l'adresse <#1280837943128231968>` }, 

// ============================ Niemiecki =========
        { roleId: '1403497812720877668', message: (member) => `### Willkommen, mutiger Abenteurer! 🇩🇪
Hallo ${member}!

🐉 Nachdem du deine ***Sprache*** und dein ***RPG-System*** ausgewählt hast, erhältst du Zugriff auf die wichtigsten Kanäle dieses Servers.

🌍 ACHTUNG! Der <#1403501148698312745> Kanal wird automatisch übersetzt. Wenn du in diesem Kanal etwas postest, wird die Übersetzung im symmetrischen Kanal angezeigt, auch wenn du sie nicht sehen kannst. Du postest in deinem eigenen Kanal, und Nutzer in einer anderen Sprache sehen deine übersetzte Nachricht! Die Sprachbarriere zwischen den Nutzern verschwindet.
Derzeit unterstützte Kanäle: :flag_pl: :flag_gb: :flag_fr: :flag_de: :flag_it:

👉 ${member.user.username}, bei Fragen oder Anliegen kontaktieren Sie uns gerne unter <#1280837943128231968>` },

// ============================ Włoski =========
        { roleId: '1403497420557647932', message: (member) => `### Benvenuto, coraggioso avventuriero! 🇮🇹
Ciao ${member}!

🐉 Dopo aver selezionato la tua ***Lingua*** e il tuo ***Sistema*** di gioco di ruolo, avrai accesso ai canali più importanti di questo server.

🌍 **ATTENZIONE!** Il canale <#1403501505646166078> viene tradotto automaticamente. Quando pubblichi qualcosa in questo canale, la traduzione apparirà nel canale simmetrico, anche se non puoi vederla. Pubblichi nel tuo canale e gli utenti in un'altra lingua vedranno il tuo messaggio tradotto! La barriera linguistica tra gli utenti scompare. I canali attualmente supportati sono: :flag_pl: :flag_gb: :flag_fr: :flag_de: :flag_it:

👉 ${member.user.username}, per qualsiasi domanda o dubbio, non esitate a contattarci all'indirizzo <#1280837943128231968> `} 
    ],

    // ID roli-znacznika dla powitanych użytkowników
    WELCOME_ROLE_ID: '1404857724470034563', // Rola "Welcome" doda się tylko gdy ktoś jej nie ma
};


// =================================================================================
// TWORZENIE KLIENTA DISCORD
// =================================================================================
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages, // Potrzebne do odczytywania ról
        GatewayIntentBits.MessageContent, // Potrzebne do odczytywania ról
    ]
});


// =================================================================================
// FUNKCJE POMOCNICZE
// =================================================================================

// Funkcja wysyłania logu na kanał
async function sendLogMessage(member, action, roleName) {
    try {
        const logChannel = member.guild.channels.cache.get(CONFIG.LOG_CHANNEL_ID);
        if (logChannel && logChannel.isTextBased()) {
            const timestamp = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });
            const emoji = action === 'added' ? '🟢' : '🔴';
            const actionText = action === 'added' ? 'otrzymał rolę' : 'stracił rolę';
            await logChannel.send(`${emoji} **${member.user.username}** (${member.user.tag}) ${actionText} **${roleName}** - ${timestamp}`);
        }
    } catch (error) {
        console.error('Błąd przy wysyłaniu logu:', error);
    }
}

// Funkcja sprawdzająca i przyznająca rolę
async function checkAndAssignRole(member, oldMemberRoles = null) {
    try {
        const memberRoles = member.roles.cache;
        const addedRoles = [];
        const removedRoles = [];
        const guildName = member.guild.name;
        const POLISH_ROLE_ID = '1403446495654576139'; // ID kluczowej roli polskiej
        const ENGLISH_ROLE_ID = '1403447883121823764'; // ID  roli ang
        const FRENCH_ROLE_ID = '1403497738246819991'; // ID  roli franc
        const GERMAN_ROLE_ID = '1403497812720877668'; // ID  roli niem
        const ITALIAN_ROLE_ID = '1403497420557647932'; // ID  roli włos


        for (const config of CONFIG.AUTO_ROLES_CONFIG) {
            const { requiredRoles, rewardRole, rewardRoleName } = config;
            const hasAllRequired = requiredRoles.every(roleId => memberRoles.has(roleId));
            const hasRewardRole = memberRoles.has(rewardRole);

            if (hasAllRequired && !hasRewardRole) {
                await member.roles.add(rewardRole);
                addedRoles.push({ name: rewardRoleName, id: rewardRole });
            }

            if (!hasAllRequired && hasRewardRole) {
                await member.roles.remove(rewardRole);
                removedRoles.push({ name: rewardRoleName, id: rewardRole });
            }
        }
        
        // Wysyłanie zgrupowanych logów i powiadomień
        if (addedRoles.length > 0) {
            const roleNames = addedRoles.map(role => role.name).join(', ');
            await sendLogMessage(member, 'added', roleNames);
            console.log(`🟢 Przyznano role "${roleNames}" dla ${member.user.tag}`);

            const notificationChannel = member.guild.channels.cache.get(CONFIG.NOTIFICATION_CHANNEL_ID);
            if (notificationChannel && notificationChannel.isTextBased()) {

        // Ta linia wstrzymuje funkcję na 10 sekund
        await new Promise(resolve => setTimeout(resolve, 10000)); 

                const userHasPolishRole = memberRoles.has(POLISH_ROLE_ID);
                const userHasFrenchRole = memberRoles.has(FRENCH_ROLE_ID);
                const userHasGermanRole = memberRoles.has(GERMAN_ROLE_ID);
                const userHasItalianRole = memberRoles.has(ITALIAN_ROLE_ID);
                if (userHasPolishRole) {
                    await notificationChannel.send(`✅ Hej! <@${member.id}> otrzymałaś(eś) specjalne Role: **${roleNames}** na serwerze **${guildName}**! Uzyskano dostęp do kanałów powiązanych z tymi Językami oraz Systemami 👍`);
                } else if (userHasFrenchRole) {
                    await notificationChannel.send(`✅ Salut <@${member.id}> ! Tu as obtenu des rôles spéciaux : **${roleNames}** sur le serveur **${guildName}** ! Tu as accès aux canaux liés à ces langues et systèmes 👍`);
                } else if (userHasGermanRole) {
                    await notificationChannel.send(`✅ Hallo <@${member.id}>! Du hast spezielle Rollen erhalten: **${roleNames}** auf dem Server **${guildName}**! Du hast Zugriff auf Kanäle erhalten, die mit diesen Sprachen und Systemen verbunden sind 👍`);
                } else if (userHasItalianRole) {
                    await notificationChannel.send(`✅ Ciao <@${member.id}>! Hai ottenuto ruoli speciali: **${roleNames}** sul server **${guildName}**! Hai ottenuto l'accesso ai canali relativi a queste ingue e sistemi di gioco di ruolo 👍`);
                } else {
                    // Domyślnie angielski (lub gdy użytkownik nie ma żadnej z powyższych ról językowych)
                    await notificationChannel.send(`✅ Hey <@${member.id}>! You gain special ROLE: **${roleNames}** on server **${guildName}**! You have gained access to channels related to these Languages and Systems 👍`);
                }
            }
        }
        
        if (removedRoles.length > 0) {
            const roleNames = removedRoles.map(role => role.name).join(', ');
            await sendLogMessage(member, 'removed', roleNames);
            console.log(`🔴 Odebrano role "${roleNames}" dla ${member.user.tag}`);

            const notificationChannel = member.guild.channels.cache.get(CONFIG.NOTIFICATION_CHANNEL_ID);
            if (notificationChannel && notificationChannel.isTextBased()) {

        // Ta linia wstrzymuje funkcję na 5 sekund
        await new Promise(resolve => setTimeout(resolve, 5000)); 

        const rolesToCheck = oldMemberRoles && oldMemberRoles.size > 0 ? oldMemberRoles : memberRoles;
        const userHasPolishRole = rolesToCheck.has(POLISH_ROLE_ID);
        const userHasFrenchRole = rolesToCheck.has(FRENCH_ROLE_ID);
        const userHasGermanRole = rolesToCheck.has(GERMAN_ROLE_ID);
        const userHasItalianRole = rolesToCheck.has(ITALIAN_ROLE_ID);

                if (userHasPolishRole) {
                    await notificationChannel.send(`🚫 Hej, <@${member.id}>! Straciłaś(eś) Role: **${roleNames}** na serwerze **${guildName}** (ponieważ zmieniono Język lub System i nie spełniasz już wymagań). Utraciłaś(eś) dostęp do kanałów powiązanych z tymi Językami oraz Systemami ❌`);
                } else if (userHasFrenchRole) {
                    await notificationChannel.send(`🚫 Salut <@${member.id}> ! Tu as perdu des rôles : **${roleNames}** sur le serveur **${guildName}** (parce que la langue ou le système a été modifié et tu ne remplis plus les conditions). Tu as perdu l'accès aux canaux associés à ces langues et systèmes ❌`);
                } else if (userHasGermanRole) {
                    await notificationChannel.send(`🚫 Hallo <@${member.id}>! Du hast Rollen verloren: **${roleNames}** auf dem Server **${guildName}** (weil die Sprache oder das System geändert wurde und du die Anforderungen nicht mehr erfüllst). Du hast den Zugriff auf Kanäle verloren, die mit diesen Sprachen und Systemen verbunden sind ❌`);
                } else if (userHasItalianRole) {
                    await notificationChannel.send(`🚫 Ciao <@${member.id}>! Hai perso dei ruoli: **${roleNames}** sul server **${guildName}** (perché la lingua o il sistema è stato cambiato e non soddisfi più i requisiti). Hai perso l'accesso ai canali associati a queste lingue e sistemi di gioco di ruolo ❌`);
                } else {
                    // Domyślnie angielski (lub gdy użytkownik nie ma żadnej z powyższych ról językowych)
                    await notificationChannel.send(`🚫 Hey <@${member.id}>! You lost Roles: **${roleNames}** on server **${guildName}** (because the Language or System has been changed and you no longer meet the requirements). You have lost access to channels associated with these Languages and Systems ❌`);
                }
            }
        }
    } catch (error) {
        console.error(`Błąd przy sprawdzaniu ról dla ${member.user.tag}:`, error);
    }
}

// Funkcja do wysyłania jednorazowej wiadomości powitalnej
async function sendWelcomeMessage(member) {
    try {
        const welcomeChannel = member.guild.channels.cache.get(CONFIG.WELCOME_CHANNEL_ID);
        if (!welcomeChannel || !welcomeChannel.isTextBased()) return;

        let messageConfig = null;

        for (const wc of CONFIG.WELCOME_MESSAGES) {
            if (member.roles.cache.has(wc.roleId)) {
                messageConfig = wc;
                break;
            }
        }

        if (!messageConfig) {
            // Użyj angielskiej wiadomości jako domyślnej, jeśli nic nie pasuje
            messageConfig = CONFIG.WELCOME_MESSAGES.find(m => m.roleId === '1403447883121823764');
        }

        if (messageConfig) {
            let messageToSend;
            // POPRAWKA: Sprawdzamy, czy wiadomość jest funkcją
            if (typeof messageConfig.message === 'function') {
                // Jeśli tak, wywołujemy ją z obiektem 'member'
                messageToSend = messageConfig.message(member);
            } else {
                // Jeśli nie, używamy jej jako zwykłego tekstu
                messageToSend = messageConfig.message;
            }

            // --- OCZEKIWANIE 10 sekund na Welcome message ---
            console.log(`⏳ Oczekiwanie 10 sekund przed wysłaniem powitania dla ${member.user.tag}...`);
            await new Promise(resolve => setTimeout(resolve, 10000)); 

            await welcomeChannel.send(messageToSend);
            console.log(`👋 Wysłano wiadomość powitalną dla ${member.user.tag}.`);
        }
    } catch (error) {
        console.error(`Błąd przy wysyłaniu wiadomości powitalnej dla ${member.user.tag}:`, error);
    }
}

// =================================================================================
// FUNKCJA DO JEDNORAZOWEGO DODANIA ROLI WELCOME (DO USUNIĘCIA PO UŻYCIU)
// =================================================================================
async function addWelcomeRoleToAllMembers() {
    console.log('🚀 Rozpoczynam jednorazowe dodawanie roli Welcome...');
    
    try {
        const guild = client.guilds.cache.get(CONFIG.GUILD_ID);
        if (!guild) {
            console.log('❌ Nie znaleziono serwera!');
            return;
        }

        const WELCOME_ROLE_ID = '1404857724470034563';
        const welcomeRole = guild.roles.cache.get(WELCOME_ROLE_ID);
        
        if (!welcomeRole) {
            console.log('❌ Nie znaleziono roli Welcome!');
            return;
        }

        console.log(`📋 Pobieram wszystkich członków serwera ${guild.name}...`);
        const members = await guild.members.fetch();
        
        let addedCount = 0;
        let totalCount = 0;
        
        for (const [memberId, member] of members) {
            // Pomijamy boty
            if (member.user.bot) continue;
            
            totalCount++;
            
            // Sprawdzamy czy użytkownik już ma rolę Welcome
            if (!member.roles.cache.has(WELCOME_ROLE_ID)) {
                try {
                    await member.roles.add(WELCOME_ROLE_ID);
                    addedCount++;
                    console.log(`✅ Dodano rolę Welcome dla: ${member.user.tag}`);
                    
                    // Małe opóźnienie żeby nie przeciążyć API Discord
                    await new Promise(resolve => setTimeout(resolve, 100));
                    
                } catch (error) {
                    console.error(`❌ Błąd przy dodawaniu roli dla ${member.user.tag}:`, error);
                }
            }
        }
        
        console.log(`🎉 Zakończono! Dodano rolę Welcome dla ${addedCount} z ${totalCount} użytkowników.`);
        
    } catch (error) {
        console.error('❌ Błąd podczas dodawania ról Welcome:', error);
    }
}

// =================================================================================
// EVENTY BOTA (ZDARZENIA)
// =================================================================================

// Event gdy bot się połączy
client.once('ready', async () => {
    console.log(`🤖 Bot ${client.user.tag} jest online!`);
    console.log(`📊 Bot jest na ${client.guilds.cache.size} serwerach`);

    if (CONFIG.GUILD_ID) {
        const guild = client.guilds.cache.get(CONFIG.GUILD_ID);
        if (guild) {
            console.log(`🔄 Sprawdzam wszystkich członków serwera ${guild.name}...`);
            const members = await guild.members.fetch();
            members.forEach(member => {
                if (!member.user.bot) {
                    checkAndAssignRole(member, null);
                }
            });
            console.log('✅ Sprawdzanie zakończone!');
        }
    }
});

const memberUpdateQueue = new Map();
const DEBOUNCE_TIME = 5000;

// Event gdy użytkownik otrzyma lub straci rolę
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (CONFIG.GUILD_ID && newMember.guild.id !== CONFIG.GUILD_ID) return;

    const oldRoles = oldMember.roles.cache;
    const newRoles = newMember.roles.cache;

    if (oldRoles.size !== newRoles.size || !oldRoles.every(role => newRoles.has(role.id))) {
        // --- Kod Welcome Message ---
        const languageRoleIds = CONFIG.WELCOME_MESSAGES.map(wm => wm.roleId);
        const oldHasLanguageRole = languageRoleIds.some(id => oldMember.roles.cache.has(id));
        const newHasLanguageRole = languageRoleIds.some(id => newMember.roles.cache.has(id));

        if (!oldHasLanguageRole && newHasLanguageRole && !newMember.roles.cache.has(CONFIG.WELCOME_ROLE_ID)) {
            await sendWelcomeMessage(newMember);
            try {
                await newMember.roles.add(CONFIG.WELCOME_ROLE_ID);
                console.log(`🟢 Nadano rolę "Welcome" dla ${newMember.user.tag}`);
            } catch (error) {
                console.error(`❌ Błąd przy nadawaniu roli "Welcome" dla ${newMember.user.tag}:`, error);
            }
        }
        // --- Koniec kodu Welcome Message ---

        const memberId = newMember.id;
        if (memberUpdateQueue.has(memberId)) {
            clearTimeout(memberUpdateQueue.get(memberId));
        }

         const timer = setTimeout(() => {
             console.log(`🔄 Sprawdzam role dla ${newMember.user.tag} (po opóźnieniu)`);
             checkAndAssignRole(newMember, oldMember.roles.cache);  
             memberUpdateQueue.delete(memberId);
       }, DEBOUNCE_TIME);
        memberUpdateQueue.set(memberId, timer);
    }
});

// Event gdy nowy użytkownik dołączy
client.on('guildMemberAdd', (member) => {
    if (CONFIG.GUILD_ID && member.guild.id !== CONFIG.GUILD_ID) return;
    console.log(`👋 Nowy członek: ${member.user.tag}`);
    setTimeout(() => checkAndAssignRole(member, null), 2000);
});

// Obsługa błędów
client.on('error', error => console.error('❌ Błąd bota:', error));
process.on('unhandledRejection', error => console.error('❌ Nieobsłużony błąd:', error));

// KOMENDA DODANIA ROLI WELCOME (można wywołać pisząc w dowolnym kanale: !addwelcome)
client.on('messageCreate', async (message) => {
    // Tylko dla administratorów i tylko na właściwym serwerze
    if (message.content === '!addwelcome' && 
        message.guild.id === CONFIG.GUILD_ID && 
        message.member.permissions.has('ADMINISTRATOR')) {
        
        await message.reply('🚀 Rozpoczynam dodawanie roli Welcome...');
        await addWelcomeRoleToAllMembers();
        await message.reply('✅ Zakończono dodawanie roli Welcome!');
    }
});

// =================================================================================
// URUCHOMIENIE BOTA
// =================================================================================
client.login(CONFIG.TOKEN).catch(error => {
    console.error('❌ Nie udało się uruchomić bota:', error);
    console.log('💡 Sprawdź czy token jest prawidłowy i bot ma odpowiednie uprawnienia');

});
