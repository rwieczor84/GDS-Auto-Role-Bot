// odsyłanie sprawdzenia tokena do pliku .env
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Konfiguracja bota
const CONFIG = {
    // Wstaw tutaj token swojego bota - aktywuj wpisując w wierszu poleceń: node bot.js
    TOKEN: process.env.DISCORD_TOKEN, // ukryto token
    
    // Kanał do logów
    LOG_CHANNEL_ID: '1403761907025973439', // 🤖🔢-bot-logi

    // ID serwera
    GUILD_ID: '1279058196765605951',

    // Konfiguracja automatycznego przypisywania ról
    AUTO_ROLES_CONFIG: [
        {
            requiredRoles: ['1280084855853551668', '1403446495654576139'], // WFRP Fan, 🇵🇱 Polski
            rewardRole: '1403493500741222550', // WFRP Polski 🇵🇱
            rewardRoleName: 'WFRP Polski 🇵🇱'
        },
        {
            requiredRoles: ['1280084855853551668', '1403447883121823764'], // WFRP Fan, 🇬🇧 English
            rewardRole: '1403494323412140123', // WFRP English 🇬🇧
            rewardRoleName: 'WFRP English 🇬🇧'	
        },
        {
            requiredRoles: ['1280084855853551668', '1403497738246819991'], // WFRP Fan, 🇫🇷 Français
            rewardRole: '1403496428453757011', // WFRP Français 🇫🇷
            rewardRoleName: 'WFRP Français 🇫🇷'
        },
        {
            requiredRoles: ['1280084855853551668', '1403497812720877668'], // WFRP Fan, 🇩🇪 Deutsche
            rewardRole: '1403494573912625152', // WFRP Deutsche 🇩🇪
            rewardRoleName: 'WFRP Deutsche 🇩🇪'
        },
        {
            requiredRoles: ['1280084855853551668', '1403497420557647932'], // WFRP Fan, 🇮🇹 Italiano
            rewardRole: '1403496941974851714', // WFRP Italiano 🇮🇹
            rewardRoleName: 'WFRP Italiano 🇮🇹'
        },
        {
            requiredRoles: ['1400957968052387910', '1403446495654576139'], // The Old World Fan, 🇵🇱 Polski
            rewardRole: '1403497219528593428', // TOW Polski 🇵🇱
            rewardRoleName: 'TOW Polski 🇵🇱'
        },
        {
            requiredRoles: ['1400957968052387910', '1403447883121823764'], // The Old World Fan, 🇬🇧 English
            rewardRole: '1403497155955527835', // TOW English 🇬🇧
            rewardRoleName: 'TOW English 🇬🇧'	
        },
        {
            requiredRoles: ['1400957968052387910', '1403497738246819991'], // The Old World Fan, 🇫🇷 Français
            rewardRole: '1403496745786146949', // TOW Français 🇫🇷
            rewardRoleName: 'TOW Français 🇫🇷'
        },
        {
            requiredRoles: ['1400957968052387910', '1403497812720877668'], // The Old World Fan, 🇩🇪 Deutsche
            rewardRole: '1403497106664063016', // TOW Deutsche 🇩🇪
            rewardRoleName: 'TOW Deutsche 🇩🇪'
        },
        {
            requiredRoles: ['1400957968052387910', '1403497420557647932'], // The Old World Fan, 🇮🇹 Italiano
            rewardRole: '1403496973319012393', // TOW Italiano 🇮🇹
            rewardRoleName: 'TOW Italiano 🇮🇹'
        },
        {
            requiredRoles: ['1403458596695707648', '1403446495654576139'], // RPG Fan, 🇵🇱 Polski
            rewardRole: '1403497298310201405', // RPG Polski 🇵🇱
            rewardRoleName: 'RPG Polski 🇵🇱'
        },
        {
            requiredRoles: ['1403458596695707648', '1403447883121823764'], // RPG Fan, 🇬🇧 English
            rewardRole: '1403497188117712897', // RPG English 🇬🇧
            rewardRoleName: 'RPG English 🇬🇧'	
        },
        {
            requiredRoles: ['1403458596695707648', '1403497738246819991'], // RPG Fan, 🇫🇷 Français
            rewardRole: '1403496855014215701', // RPG Français 🇫🇷
            rewardRoleName: 'RPG Français 🇫🇷'
        },
        {
            requiredRoles: ['1403458596695707648', '1403497812720877668'], // RPG Fan, 🇩🇪 Deutsche
            rewardRole: '1403497131083563170', // RPG Deutsche 🇩🇪
            rewardRoleName: 'RPG Deutsche 🇩🇪'
        },
        {
            requiredRoles: ['1403458596695707648', '1403497420557647932'], // RPG Fan, 🇮🇹 Italiano
            rewardRole: '1403497002871947274', // RPG Italiano 🇮🇹
            rewardRoleName: 'RPG Italiano 🇮🇹'
        }
    ],
};

// Tworzenie klienta Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// Funkcja wysyłania logu na kanał
async function sendLogMessage(member, action, roleName) {
    try {
        const logChannel = member.guild.channels.cache.get(CONFIG.LOG_CHANNEL_ID);
        if (logChannel && logChannel.isTextBased()) {
            const timestamp = new Date().toLocaleString('pl-PL', {
                timeZone: 'Europe/Warsaw',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            
            const emoji = action === 'added' ? '✅' : '❌';
            const actionText = action === 'added' ? 'otrzymał rolę' : 'stracił rolę';
            
            await logChannel.send(`${emoji} **${member.user.username}** (${member.user.tag}) ${actionText} **${roleName}** - ${timestamp}`);
        }
    } catch (error) {
        console.error('Błąd przy wysyłaniu logu:', error);
    }
}

// Funkcja sprawdzająca i przyznająca rolę
async function checkAndAssignRole(member) {
    try {
        const memberRoles = member.roles.cache;
        const addedRoles = [];
        const removedRoles = [];
        const guildName = member.guild.name;

        for (const config of CONFIG.AUTO_ROLES_CONFIG) {
            const { requiredRoles, rewardRole, rewardRoleName } = config;
            const hasAllRequired = requiredRoles.every(roleId => memberRoles.has(roleId));
            const hasRewardRole = memberRoles.has(rewardRole);

            if (hasAllRequired && !hasRewardRole) {
                await member.roles.add(rewardRole);
                addedRoles.push(rewardRoleName);
                console.log(`✅ Przyznano rolę "${rewardRoleName}" dla ${member.user.tag}`);
                await sendLogMessage(member, 'added', rewardRoleName);
            }
            
            if (!hasAllRequired && hasRewardRole) {
                await member.roles.remove(rewardRole);
                removedRoles.push(rewardRoleName);
                console.log(`❌ Odebrano rolę "${rewardRoleName}" dla ${member.user.tag} (brak wymaganych ról)`);
                await sendLogMessage(member, 'removed', rewardRoleName);
            }
        }

        if (addedRoles.length > 0) {
            try {
                const roleList = addedRoles.join(', ');
                    await member.send(
                    `🎉 You gain special ROLE: **${roleList}** on the **${guildName}** server! ` +
                    `This message is automatical, do not respond.`
                );
            } catch (error) { /* Ignoruj błąd DM */ }
        }
        
         if (removedRoles.length > 0) {
            try {
                const roleList = removedRoles.join(', ');
                await member.send(
                    `❌ You lost roles: **${roleList}** on the **${guildName}** server ` +
                    `(because you no longer meet the requirements). ` +
                    `This message is automatical, do not respond.`
                );
            } catch (error) { /* Ignoruj błąd DM */ }
        }

    } catch (error) {
        console.error(`Błąd przy sprawdzaniu ról dla ${member.user.tag}:`, error);
    }
}

// Event gdy bot się połączy
client.once('ready', async () => {
    console.log(`🤖 Bot ${client.user.tag} jest online!`);
    console.log(`📊 Bot jest na ${client.guilds.cache.size} serwerach`);
    
    // Opcjonalnie: sprawdź wszystkich użytkowników przy starcie bota
    if (CONFIG.GUILD_ID) {
        const guild = client.guilds.cache.get(CONFIG.GUILD_ID);
        if (guild) {
            console.log(`🔄 Sprawdzam wszystkich członków serwera ${guild.name}...`);
            const members = await guild.members.fetch();
            for (const [id, member] of members) {
                if (!member.user.bot) {
                    await checkAndAssignRole(member);
                }
            }
            console.log('✅ Sprawdzanie zakończone!');
        }
    }
});

// Utwórz mapę do przechowywania opóźnionych akcji
const memberUpdateQueue = new Map();

// Czas oczekiwania w milisekundach (10 sekund)
const DEBOUNCE_TIME = 10000;

// Event gdy użytkownik otrzyma lub straci rolę
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    // Sprawdź czy bot działa na określonym serwerze (jeśli ustawiono)
    if (CONFIG.GUILD_ID && newMember.guild.id !== CONFIG.GUILD_ID) {
        return;
    }

    const oldRoles = oldMember.roles.cache;
    const newRoles = newMember.roles.cache;
    
    // Sprawdź czy zmieniły się role
    if (oldRoles.size !== newRoles.size || !oldRoles.every(role => newRoles.has(role.id))) {
        
        const memberId = newMember.id;
        
        // Wyczyść poprzedni timer, jeśli istnieje
        if (memberUpdateQueue.has(memberId)) {
            clearTimeout(memberUpdateQueue.get(memberId));
        }

        // Ustaw nowy timer, który wywoła funkcję po DEBOUNCE_TIME
        const timer = setTimeout(async () => {
            console.log(`🔄 Sprawdzam role dla ${newMember.user.tag}`);
            await checkAndAssignRole(newMember);
            memberUpdateQueue.delete(memberId); // Usuń po wykonaniu
        }, DEBOUNCE_TIME);

        memberUpdateQueue.set(memberId, timer);
    }
});

// Event gdy nowy użytkownik dołączy (opcjonalnie)
client.on('guildMemberAdd', async (member) => {
    // Sprawdź czy bot działa na określonym serwerze (jeśli ustawiono)
    if (CONFIG.GUILD_ID && member.guild.id !== CONFIG.GUILD_ID) {
        return;
    }
    
    console.log(`👋 Nowy członek: ${member.user.tag}`);
    // Sprawdź role (może już je mieć z poprzedniego pobytu)
    setTimeout(() => checkAndAssignRole(member), 1000);
});

// Obsługa błędów
client.on('error', error => {
    console.error('❌ Błąd bota:', error);
});

process.on('unhandledRejection', error => {
    console.error('❌ Nieobsłużony błąd:', error);
});

// Uruchomienie bota
client.login(CONFIG.TOKEN).catch(error => {
    console.error('❌ Nie udało się uruchomić bota:', error);
    console.log('💡 Sprawdź czy token jest prawidłowy i bot ma odpowiednie uprawnienia');
});