const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        gainNode.gain.setValueAtTime(0.5, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
    } else if (type === "roll") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(350 + Math.random() * 250, now);
        gainNode.gain.setValueAtTime(0.35, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now); osc.stop(now + 0.06);
    } else if (type === "success") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        gainNode.gain.setValueAtTime(0.7, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now); osc.stop(now + 0.5);
    } else if (type === "buy") {
        osc.type = "square";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(880, now + 0.15);
        gainNode.gain.setValueAtTime(0.5, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now); osc.stop(now + 0.3);
    }
}

function formatNumber(num) {
    if (num < 1000) return Math.floor(num).toString();
    const suffixes = ["", " K", " M", " B", " T", " Qa", " Qi", " Sx", " Sp", " Oc"];
    const suffixIndex = Math.floor(Math.log10(num) / 3);
    const shortNum = (num / Math.pow(1000, suffixIndex)).toFixed(2);
    return shortNum.replace(".00", "") + suffixes[suffixIndex];
}

function formatOdds(oddsNum) {
    if (oddsNum < 1000) return oddsNum.toString();
    const suffixes = ["", " K", " M", " B", " T", " Qa", " Qi", " Sx", " Sp", " Oc"];
    const suffixIndex = Math.floor(Math.log10(oddsNum) / 3);
    const shortNum = (oddsNum / Math.pow(1000, suffixIndex)).toFixed(1);
    return shortNum.replace(".0", "") + suffixes[suffixIndex];
}

const rarities = [
    { name: "Common", oddsNumber: 2, color: "#bdbdbd", coins: 1 },
    { name: "Uncommon", oddsNumber: 5, color: "#4caf50", coins: 3 },
    { name: "Rare", oddsNumber: 20, color: "#2196f3", coins: 10 },
    { name: "Epic", oddsNumber: 50, color: "#9c27b0", coins: 25 },
    { name: "Legendary", oddsNumber: 100, color: "#ffd700", coins: 50 },
    { name: "Mythic", oddsNumber: 500, color: "#ff3b30", coins: 200 },
    { name: "God", oddsNumber: 2500, color: "#ffb300", coins: 1000 },
    { name: "Secret", oddsNumber: 10000, color: "#171717", coins: 5000 },
    { name: "Prismatique", oddsNumber: 50000, color: "#00e5ff", coins: 20000 },
    { name: "Éternelle", oddsNumber: 250000, color: "#ffffff", coins: 100000 },
    { name: "Ancien", oddsNumber: 1000000, color: "#a66a3f", coins: 500000 },
    { name: "Exotique", oddsNumber: 5000000, color: "#ff7a00", coins: 2000000 },
    { name: "Céleste", oddsNumber: 25000000, color: "#7ddcff", coins: 10000000 },
    { name: "Divin", oddsNumber: 100000000, color: "#fff4b0", coins: 50000050 },
    { name: "Cosmique", oddsNumber: 500000000, color: "#8b5cf6", coins: 200000000 },
    { name: "Void", oddsNumber: 2500000000, color: "#18002e", coins: 1000000000 },
    { name: "Infernal", oddsNumber: 5000000000, color: "#ff3d00", coins: 2000000000 },
    { name: "Toxique", oddsNumber: 10000000000, color: "#76ff03", coins: 5000000000 },
    { name: "Abyssale", oddsNumber: 25000000000, color: "#001b44", coins: 10000000000 },
    { name: "Chaotique", oddsNumber: 50000000000, color: "#ff006e", coins: 25000000000 },
    { name: "Spectrale", oddsNumber: 100000000000, color: "#d9eaff", coins: 50000000000 },
    { name: "Mystique", oddsNumber: 250000000000, color: "#b026ff", coins: 100000000000 },
    { name: "Anormale", oddsNumber: 500000000000, color: "#ff1493", coins: 250000000000 },
    { name: "Extraterrestre", oddsNumber: 1000000000000, color: "#39ff14", coins: 500000000000 },
    { name: "Omnisciente", oddsNumber: 5000000000000, color: "#00ffff", coins: 2000000000000 },
    { name: "Suprême", oddsNumber: 10000000000000, color: "#ffffff", coins: 5000000000000 },
    { name: "Laurentb1133", oddsNumber: 100000000000000, color: "rainbow", coins: 50000000000000 }
];

// Raretés exclusives de l'event spécial (aucune pièce, juste de la collection)
const eventRarities = [
    { name: "Arcade", oddsNumber: 2, color: "#00e5ff" },
    { name: "Construction", oddsNumber: 10, color: "#ffb300" },
    { name: "Hacker", oddsNumber: 100, color: "#39ff14" },
    { name: "Extrême", oddsNumber: 250, color: "#ff3b30" },
    { name: "Julesb4", oddsNumber: 1000, color: "rainbow" }
];
const eventInventory = {};
eventRarities.forEach(r => eventInventory[r.name] = 0);
let isEventActive = false;
let eventStartBannerTimeout = null;
let hasParticipatedJulesb4Event = false;
let forcedEventRarity = null;

let luck = 1, activeLuck = 1, luckLevel = 1, maxLuckLevel = 30, luckCost = 50, coins = 0, totalRolls = 0;
let coinMult = 1, coinMultLevel = 1, maxCoinMultLevel = 30, coinMultCost = 100;
let adminMessage = "";
let adminMessageTimeout = null;
let isAutoRollActive = false, autoRollTimeout = null, forcedRarity = null;
let isRolling = false;
let autoRollCooldown = false;
let isMoneyEventActive = false, customMoneyMultiplier = 1, moneyEventTimeRemaining = 0;
let isLuckEventActive = false, customLuckMultiplier = 1, luckEventTimeRemaining = 0;

// Intervalles pour les décomptes visuels des events (pilotés par l'état Firebase)
let moneyEventCountdownInterval = null;
let luckEventCountdownInterval = null;

const inventory = {};
rarities.forEach(r => inventory[r.name] = 0);

// ==========================================================================
// ACHIEVEMENTS
// ==========================================================================
function hasRarityAtOrAbove(oddsThreshold) {
    return rarities.some(r => r.oddsNumber >= oddsThreshold && inventory[r.name] > 0);
}

const achievements = [
    {
        id: "first_roll",
        name: "Premier Roll",
        description: "Fais ton premier roll.",
        reward: 50,
        icon: "🎲",
        badge: "1",
        check: () => totalRolls >= 1
    },
    {
        id: "10_rolls",
        name: "10 Rolls",
        description: "Fais 10 rolls.",
        reward: 200,
        icon: "🎲",
        badge: "2",
        check: () => totalRolls >= 10
    },
    {
        id: "100_rolls",
        name: "100 Rolls",
        description: "Fais 100 rolls.",
        reward: 1000,
        icon: "🎲",
        badge: "3",
        check: () => totalRolls >= 100
    },
    {
        id: "1000_rolls",
        name: "1000 Rolls",
        description: "Fais 1000 rolls.",
        reward: 5000,
        icon: "🎲",
        badge: "4",
        check: () => totalRolls >= 1000
    },
    {
        id: "10000_rolls",
        name: "10 000 Rolls",
        description: "Fais 10 000 rolls.",
        reward: 25000,
        icon: "🎲",
        badge: "5",
        check: () => totalRolls >= 10000
    },
    {
        id: "auto_roll_unlocked",
        name: "Auto-Roll Débloqué",
        description: "Débloque l'Auto-Roll (50 rolls).",
        reward: 300,
        icon: "🤖",
        check: () => totalRolls >= 50
    },
    {
        id: "odds_100",
        name: "1/100",
        description: "Obtiens une rareté de 1/100 ou plus rare.",
        reward: 300,
        icon: "💎",
        badge: "1",
        check: () => hasRarityAtOrAbove(100)
    },
    {
        id: "odds_1000",
        name: "1/1 000",
        description: "Obtiens une rareté de 1/1 000 ou plus rare.",
        reward: 1000,
        icon: "💎",
        badge: "2",
        check: () => hasRarityAtOrAbove(1000)
    },
    {
        id: "odds_1m",
        name: "1/1M",
        description: "Obtiens une rareté de 1/1 000 000 ou plus rare.",
        reward: 10000,
        icon: "💎",
        badge: "3",
        check: () => hasRarityAtOrAbove(1000000)
    },
    {
        id: "odds_1b",
        name: "1/1B",
        description: "Obtiens une rareté de 1/1 000 000 000 ou plus rare.",
        reward: 100000,
        icon: "💎",
        badge: "4",
        check: () => hasRarityAtOrAbove(1000000000)
    },
    {
        id: "odds_1t",
        name: "1/1T",
        description: "Obtiens une rareté de 1/1 000 000 000 000 ou plus rare.",
        reward: 1000000,
        icon: "💎",
        badge: "5",
        check: () => hasRarityAtOrAbove(1000000000000)
    },
    {
        id: "coins_100",
        name: "100 Pièces",
        description: "Possède au moins 100 pièces.",
        reward: 50,
        icon: "🪙",
        badge: "1",
        check: () => coins >= 100
    },
    {
        id: "coins_10k",
        name: "10 000 Pièces",
        description: "Possède au moins 10 000 pièces.",
        reward: 500,
        icon: "🪙",
        badge: "2",
        check: () => coins >= 10000
    },
    {
        id: "coins_1m",
        name: "1M Pièces",
        description: "Possède au moins 1 000 000 pièces.",
        reward: 5000,
        icon: "🪙",
        badge: "3",
        check: () => coins >= 1000000
    },
    {
        id: "coins_1b",
        name: "1B Pièces",
        description: "Possède au moins 1 000 000 000 pièces.",
        reward: 50000,
        icon: "🪙",
        badge: "4",
        check: () => coins >= 1000000000
    },
    {
        id: "coins_1t",
        name: "1T Pièces",
        description: "Possède au moins 1 000 000 000 000 pièces.",
        reward: 500000,
        icon: "🪙",
        badge: "5",
        check: () => coins >= 1000000000000
    },
    {
        id: "luck_upg_1",
        name: "1 Amélioration Chance",
        description: "Achète 1 amélioration de Chance dans la boutique.",
        reward: 100,
        icon: "🍀",
        badge: "1",
        check: () => (luckLevel - 1) >= 1
    },
    {
        id: "luck_upg_10",
        name: "10 Améliorations Chance",
        description: "Achète 10 améliorations de Chance dans la boutique.",
        reward: 800,
        icon: "🍀",
        badge: "2",
        check: () => (luckLevel - 1) >= 10
    },
    {
        id: "luck_upg_25",
        name: "25 Améliorations Chance",
        description: "Achète 25 améliorations de Chance dans la boutique.",
        reward: 3000,
        icon: "🍀",
        badge: "3",
        check: () => (luckLevel - 1) >= 25
    },
    {
        id: "luck_upg_max",
        name: "Chance Max",
        description: `Atteins le niveau max de Chance (${maxLuckLevel}).`,
        reward: 15000,
        icon: "🍀",
        badge: "4",
        check: () => luckLevel >= maxLuckLevel
    },
    {
        id: "coinmult_upg_1",
        name: "1 Amélioration Pièces",
        description: "Achète 1 amélioration de Multiplicateur de Pièces dans la boutique.",
        reward: 100,
        icon: "💰",
        badge: "1",
        check: () => (coinMultLevel - 1) >= 1
    },
    {
        id: "coinmult_upg_10",
        name: "10 Améliorations Pièces",
        description: "Achète 10 améliorations de Multiplicateur de Pièces dans la boutique.",
        reward: 800,
        icon: "💰",
        badge: "2",
        check: () => (coinMultLevel - 1) >= 10
    },
    {
        id: "coinmult_upg_25",
        name: "25 Améliorations Pièces",
        description: "Achète 25 améliorations de Multiplicateur de Pièces dans la boutique.",
        reward: 3000,
        icon: "💰",
        badge: "3",
        check: () => (coinMultLevel - 1) >= 25
    },
    {
        id: "coinmult_upg_max",
        name: "Pièces Max",
        description: `Atteins le niveau max de Multiplicateur de Pièces (${maxCoinMultLevel}).`,
        reward: 15000,
        icon: "💰",
        badge: "4",
        check: () => coinMultLevel >= maxCoinMultLevel
    },
    {
        id: "admin_abuse_participation",
        name: "Participation Admin Abuse",
        description: "Succès spécial, débloqué uniquement par l'administrateur depuis le panneau admin.",
        reward: 500,
        icon: "🛡️",
        check: () => false
    },
    {
        id: "laurentb1133_rarity",
        name: "Laurentb1133",
        description: "Obtiens la rareté ultime Laurentb1133.",
        reward: 10000000,
        icon: "🌈",
        check: () => inventory["Laurentb1133"] > 0
    },
    {
        id: "event_julesb4_participation",
        name: "Participation Julesb4",
        description: "Participe à l'événement Julesb4 (fais au moins un roll dans l'event).",
        reward: 500,
        icon: "🎉",
        check: () => hasParticipatedJulesb4Event
    },
    {
        id: "event_julesb4_rarity",
        name: "Julesb4 (Rareté)",
        description: "Obtiens la rareté exclusive Julesb4 pendant l'événement.",
        reward: 2000000,
        icon: "🌈",
        check: () => eventInventory["Julesb4"] > 0
    }
];
const unlockedAchievements = {};
achievements.forEach(a => unlockedAchievements[a.id] = false);

const rollButton = document.getElementById("rollButton");
const autoRollButton = document.getElementById("autoRollButton");
const autoRollRequirement = document.getElementById("autoRollRequirement");
const result = document.getElementById("result");
const coinCount = document.getElementById("coinCount");
const luckDisplay = document.getElementById("luckDisplay");

let coinMultDisplay = document.getElementById("coinMultDisplay");
if (!coinMultDisplay) {
    coinMultDisplay = document.createElement("div");
    coinMultDisplay.id = "coinMultDisplay";
    if (luckDisplay && luckDisplay.parentNode) {
        luckDisplay.parentNode.insertBefore(coinMultDisplay, luckDisplay.nextSibling);
    }
}

const inventoryButton = document.getElementById("inventoryButton");
const leaderboardButton = document.getElementById("leaderboardButton");
const leaderboardWindow = document.getElementById("leaderboardWindow");
const closeLeaderboard = document.getElementById("closeLeaderboard");
const leaderboardNoAccountMessage = document.getElementById("leaderboardNoAccountMessage");
const leaderboardLoading = document.getElementById("leaderboardLoading");
const leaderboardList = document.getElementById("leaderboardList");
const inventoryWindow = document.getElementById("inventoryWindow");
const closeInventory = document.getElementById("closeInventory");
const inventoryList = document.getElementById("inventoryList");
const inventoryViewBaseButton = document.getElementById("inventoryViewBaseButton");
const inventoryViewEventButton = document.getElementById("inventoryViewEventButton");

const shopButton = document.getElementById("shopButton");
const shopWindow = document.getElementById("shopWindow");
const closeShop = document.getElementById("closeShop");
const buyLuckButton = document.getElementById("buyLuckButton");
const luckLevelDisplay = document.getElementById("luckLevelDisplay");
const luckCostDisplay = document.getElementById("luckCostDisplay");
const luckPreviewDisplay = document.getElementById("luckPreviewDisplay");

const buyCoinMultButton = document.getElementById("buyCoinMultButton");
const coinMultLevelDisplay = document.getElementById("coinMultLevelDisplay");
const coinMultCostDisplay = document.getElementById("coinMultCostDisplay");
const coinMultPreviewDisplay = document.getElementById("coinMultPreviewDisplay");

const achievementsButton = document.getElementById("achievementsButton");
const achievementsWindow = document.getElementById("achievementsWindow");
const closeAchievements = document.getElementById("closeAchievements");
const achievementsList = document.getElementById("achievementsList");
const achievementsProgress = document.getElementById("achievementsProgress");
const achievementUnlockBanner = document.getElementById("achievementUnlockBanner");
const achievementUnlockText = document.getElementById("achievementUnlockText");
let achievementUnlockTimeout = null;

function triggerAchievementBanner(text) {
    if (achievementUnlockTimeout) clearTimeout(achievementUnlockTimeout);
    achievementUnlockText.textContent = text;
    achievementUnlockBanner.style.display = "block";
    achievementUnlockTimeout = setTimeout(() => {
        achievementUnlockBanner.style.display = "none";
    }, 5000);
}

const settingsButton = document.getElementById("settingsButton");
const eventButton = document.getElementById("eventButton");
const eventPage = document.getElementById("eventPage");
const closeEventPage = document.getElementById("closeEventPage");
const eventResult = document.getElementById("eventResult");
const eventRollButton = document.getElementById("eventRollButton");
const eventInventoryList = document.getElementById("eventInventoryList");
const eventAutoRollButton = document.getElementById("eventAutoRollButton");
const eventAutoRollRequirement = document.getElementById("eventAutoRollRequirement");
let isEventAutoRollActive = false, eventAutoRollTimeout = null, eventAutoRollCooldown = false;
let isEventRolling = false;
const settingsWindow = document.getElementById("settingsWindow");
const closeSettings = document.getElementById("closeSettings");
const luckSlider = document.getElementById("luckSlider");
const currentLuckSetting = document.getElementById("currentLuckSetting");
const resetButton = document.getElementById("resetButton");

const accountUsernameInput = document.getElementById("accountUsernameInput");
const accountPasswordInput = document.getElementById("accountPasswordInput");
const accountSignupButton = document.getElementById("accountSignupButton");
const accountLoginButton = document.getElementById("accountLoginButton");
const accountError = document.getElementById("accountError");
const accountLoggedOutSection = document.getElementById("accountLoggedOutSection");
const accountLoggedInSection = document.getElementById("accountLoggedInSection");
const accountUsernameDisplay = document.getElementById("accountUsernameDisplay");
const accountLogoutButton = document.getElementById("accountLogoutButton");

const adminPage = document.getElementById("adminPage");
const closeAdminPage = document.getElementById("closeAdminPage");
const adminLoginGate = document.getElementById("adminLoginGate");
const adminPanelContent = document.getElementById("adminPanelContent");
const adminEmailInput = document.getElementById("adminEmailInput");
const adminPasswordInput = document.getElementById("adminPasswordInput");
const adminLoginButton = document.getElementById("adminLoginButton");
const adminLoginError = document.getElementById("adminLoginError");
const adminLogoutButton = document.getElementById("adminLogoutButton");
const adminTestModeToggle = document.getElementById("adminTestModeToggle");

const adminCountdownBanner = document.getElementById("adminCountdownBanner");
const adminCountdownLabel = document.getElementById("adminCountdownLabel");
const adminCountdownNumber = document.getElementById("adminCountdownNumber");
const adminCountdownMessageInput = document.getElementById("adminCountdownMessageInput");
const adminCountdownDurationInput = document.getElementById("adminCountdownDurationInput");
const adminStartCountdown = document.getElementById("adminStartCountdown");
const adminStopCountdown = document.getElementById("adminStopCountdown");
let adminCountdownInterval = null;
const adminMessageInput = document.getElementById("adminMessageInput");
const adminSendMsgButton = document.getElementById("adminSendMsgButton");
const adminClearMsgButton = document.getElementById("adminClearMsgButton");
const adminAnnouncementBanner = document.getElementById("adminAnnouncementBanner");
const adminAnnouncementText = document.getElementById("adminAnnouncementText");

const adminMoneyMultiplierInput = document.getElementById("adminMoneyMultiplierInput");
const adminMoneyDurationInput = document.getElementById("adminMoneyDurationInput");
const adminStartMoneyEvent = document.getElementById("adminStartMoneyEvent");
const adminStopMoneyEvent = document.getElementById("adminStopMoneyEvent");

const adminLuckMultiplierInput = document.getElementById("adminLuckMultiplierInput");
const adminLuckDurationInput = document.getElementById("adminLuckDurationInput");
const adminStartLuckEvent = document.getElementById("adminStartLuckEvent");
const adminStopLuckEvent = document.getElementById("adminStopLuckEvent");

const adminRaritySelect = document.getElementById("adminRaritySelect");
const adminForceRarityButton = document.getElementById("adminForceRarityButton");
const adminCancelForceRarityButton = document.getElementById("adminCancelForceRarityButton");
const adminAchievementSelect = document.getElementById("adminAchievementSelect");
const adminUnlockAchievementButton = document.getElementById("adminUnlockAchievementButton");
const adminCancelUnlockAchievementButton = document.getElementById("adminCancelUnlockAchievementButton");
const adminStartSpecialEvent = document.getElementById("adminStartSpecialEvent");
const adminStopSpecialEvent = document.getElementById("adminStopSpecialEvent");
const adminEventRaritySelect = document.getElementById("adminEventRaritySelect");
const adminForceEventRarityButton = document.getElementById("adminForceEventRarityButton");
const adminCancelForceEventRarityButton = document.getElementById("adminCancelForceEventRarityButton");

const moneyEventBanner = document.getElementById("moneyEventBanner");
const moneyEventMult = document.getElementById("moneyEventMult");
const moneyEventTimer = document.getElementById("moneyEventTimer");

const luckEventBanner = document.getElementById("luckEventBanner");
const luckEventMult = document.getElementById("luckEventMult");
const luckEventTimer = document.getElementById("luckEventTimer");

rarities.forEach(r => {
    const option = document.createElement("option");
    option.value = r.name;
    option.textContent = `${r.name} (1/${formatOdds(r.oddsNumber)})`;
    adminRaritySelect.appendChild(option);
});

achievements.forEach(a => {
    const option = document.createElement("option");
    option.value = a.id;
    option.textContent = a.name;
    adminAchievementSelect.appendChild(option);
});

eventRarities.forEach(r => {
    const option = document.createElement("option");
    option.value = r.name;
    option.textContent = `${r.name} (1/${formatOdds(r.oddsNumber)})`;
    adminEventRaritySelect.appendChild(option);
});

let loggedInUid = null;
let loggedInUsername = null;

function saveGame() {
    const data = {
        coins, luck, activeLuck, luckLevel, luckCost,
        coinMult, coinMultLevel, coinMultCost,
        totalRolls, inventory, unlockedAchievements, eventInventory, hasParticipatedJulesb4Event
    };
    localStorage.setItem("rngGameSave", JSON.stringify(data));
    if (loggedInUid && window.playerAccount) {
        window.playerAccount.saveToCloud(loggedInUid, { ...data, username: loggedInUsername, updatedAt: Date.now() });
    }
}

function applySaveData(data) {
    coins = data.coins || 0;
    luck = data.luck || 1;
    activeLuck = data.activeLuck !== undefined ? data.activeLuck : luck;
    luckLevel = data.luckLevel || 1;
    luckCost = data.luckCost || 50;

    coinMult = data.coinMult || 1;
    coinMultLevel = data.coinMultLevel || 1;
    coinMultCost = data.coinMultCost || 100;

    totalRolls = data.totalRolls || 0;
    if (data.inventory) {
        for (let k in data.inventory) { if (inventory.hasOwnProperty(k)) inventory[k] = data.inventory[k]; }
    }
    if (data.unlockedAchievements) {
        for (let k in data.unlockedAchievements) {
            if (unlockedAchievements.hasOwnProperty(k)) unlockedAchievements[k] = data.unlockedAchievements[k];
        }
    }
    if (data.eventInventory) {
        for (let k in data.eventInventory) {
            if (eventInventory.hasOwnProperty(k)) eventInventory[k] = data.eventInventory[k];
        }
    }
    hasParticipatedJulesb4Event = data.hasParticipatedJulesb4Event || false;
}

function loadGame() {
    const saved = localStorage.getItem("rngGameSave");
    if (saved) {
        applySaveData(JSON.parse(saved));
    }
    updateUIStats();
    updateAutoRollUnlockStatus();
    updateEventAutoRollUnlockStatus();
}

function triggerAdminMessage(msg) {
    if (adminMessageTimeout) clearTimeout(adminMessageTimeout);
    adminMessage = msg;
    adminAnnouncementText.textContent = adminMessage;
    adminAnnouncementBanner.style.display = "block";

    adminMessageTimeout = setTimeout(() => {
        adminAnnouncementBanner.style.display = "none";
        adminMessage = "";
    }, 5000);
}

function updateUIStats() {
    coinCount.textContent = formatNumber(coins);

    let luckText = `x${activeLuck} (Max: x${luck})`;
    if (isLuckEventActive) luckText += ` [EVENT x${customLuckMultiplier}]`;
    luckDisplay.textContent = luckText;

    let moneyText = `🪙 Multiplicateur : x${coinMult}`;
    if (isMoneyEventActive) moneyText += ` [EVENT x${customMoneyMultiplier}]`;
    coinMultDisplay.textContent = moneyText;
}

function updateAutoRollUnlockStatus() {
    if (totalRolls >= 50) {
        autoRollButton.classList.remove("locked");
        if (!isAutoRollActive && !autoRollCooldown) {
            autoRollRequirement.textContent = "Débloqué";
        }
    } else {
        autoRollButton.classList.add("locked");
        autoRollRequirement.textContent = `${50 - totalRolls} rolls restants`;
    }
}

function showRarity(r) {
    const formattedOdds = "1/" + formatOdds(r.oddsNumber);
    result.innerHTML = `<div>${r.name}</div><small>${formattedOdds}</small>`;
    if (r.name === "Laurentb1133") {
        result.style.background = "linear-gradient(90deg, red, orange, yellow, green, cyan, blue, violet)";
        result.style.backgroundSize = "300% 100%";
        result.style.webkitBackgroundClip = "text";
        result.style.webkitTextFillColor = "transparent";
    } else {
        result.style.background = "none";
        result.style.webkitBackgroundClip = "initial";
        result.style.webkitTextFillColor = "initial";
        result.style.color = r.color;
    }
}

let currentInventoryView = "base";

function renderInventoryList(list, counts) {
    inventoryList.innerHTML = "";
    list.forEach(r => {
        const item = document.createElement("div");
        item.className = "inventoryItem";
        const info = document.createElement("div");
        const name = document.createElement("span");
        name.textContent = r.name;
        const odds = document.createElement("small");
        odds.textContent = ` (1/${formatOdds(r.oddsNumber)})`;
        odds.style.color = "#888";
        odds.style.marginLeft = "8px";

        if (r.name === "Laurentb1133" || r.color === "rainbow") {
            name.style.background = "linear-gradient(90deg, red, orange, yellow, green, cyan, blue, violet)";
            name.style.backgroundSize = "300% 100%";
            name.style.webkitBackgroundClip = "text";
            name.style.webkitTextFillColor = "transparent";
            name.style.fontWeight = "bold";
        } else {
            name.style.color = r.color;
        }

        info.appendChild(name);
        info.appendChild(odds);
        const amount = document.createElement("span");
        amount.textContent = `x${counts[r.name]}`;
        item.appendChild(info);
        item.appendChild(amount);
        inventoryList.appendChild(item);
    });
}

function updateInventory() {
    if (currentInventoryView === "event") {
        renderInventoryList(eventRarities, eventInventory);
    } else {
        renderInventoryList(rarities, inventory);
    }
}

function checkAchievements() {
    achievements.forEach(a => {
        if (!unlockedAchievements[a.id] && a.check()) {
            unlockedAchievements[a.id] = true;
            coins += a.reward;
            updateUIStats();
            triggerAchievementBanner(`${a.name} (+${formatNumber(a.reward)} 🪙)`);
            playSound("success");
            saveGame();
        }
    });
}

function forceUnlockAchievement(id) {
    const a = achievements.find(ach => ach.id === id);
    if (!a || unlockedAchievements[id]) return;
    unlockedAchievements[id] = true;
    coins += a.reward;
    updateUIStats();
    triggerAchievementBanner(`${a.name} (+${formatNumber(a.reward)} 🪙)`);
    playSound("success");
    saveGame();
}

function forceLockAchievement(id) {
    const a = achievements.find(ach => ach.id === id);
    if (!a || !unlockedAchievements[id]) return;
    unlockedAchievements[id] = false;
    saveGame();
    if (achievementsWindow.style.display !== "none") updateAchievementsUI();
}

let achievementTooltipEl = document.getElementById("achievementTooltipGlobal");
if (!achievementTooltipEl) {
    achievementTooltipEl = document.createElement("div");
    achievementTooltipEl.id = "achievementTooltipGlobal";
    achievementTooltipEl.className = "achievementTooltip";
    achievementTooltipEl.innerHTML = `
        <span class="tName"></span>
        <span class="tDesc"></span>
        <span class="tReward"></span>
    `;
    document.body.appendChild(achievementTooltipEl);
}

function showAchievementTooltip(circle, a, unlocked) {
    achievementTooltipEl.querySelector(".tName").textContent = (unlocked ? "✅ " : "🔒 ") + a.name;
    achievementTooltipEl.querySelector(".tDesc").textContent = a.description;
    achievementTooltipEl.querySelector(".tReward").textContent = `+${formatNumber(a.reward)} 🪙`;

    const rect = circle.getBoundingClientRect();
    achievementTooltipEl.style.left = `${rect.left + rect.width / 2}px`;
    achievementTooltipEl.style.top = `${rect.top - 10}px`;
    achievementTooltipEl.style.transform = "translate(-50%, -100%)";
    achievementTooltipEl.classList.add("visible");
}

function hideAchievementTooltip() {
    achievementTooltipEl.classList.remove("visible");
}

function updateAchievementsUI() {
    achievementsList.innerHTML = "";
    achievements.forEach(a => {
        const unlocked = unlockedAchievements[a.id];

        const circle = document.createElement("div");
        circle.className = "achievementCircle " + (unlocked ? "unlocked" : "locked");

        const icon = document.createElement("span");
        icon.textContent = a.icon || "🏆";
        circle.appendChild(icon);

        if (a.badge) {
            const badge = document.createElement("span");
            badge.className = "achievementBadge";
            badge.textContent = a.badge;
            circle.appendChild(badge);
        }

        circle.addEventListener("mouseenter", () => showAchievementTooltip(circle, a, unlocked));
        circle.addEventListener("mouseleave", hideAchievementTooltip);

        achievementsList.appendChild(circle);
    });

    const total = achievements.length;
    const unlockedCount = achievements.filter(a => unlockedAchievements[a.id]).length;
    const percent = total > 0 ? Math.round((unlockedCount / total) * 100) : 0;
    if (achievementsProgress) achievementsProgress.textContent = `— ${percent}% (${unlockedCount}/${total})`;
}

// ==========================================================================
// EVENT SPÉCIAL : page à part, 5 raretés exclusives, pas d'améliorations.
// ==========================================================================
function updateEventButtonVisibility() {
    if (eventButton) eventButton.style.display = isEventActive ? "block" : "none";
    if (!isEventActive && eventPage && eventPage.style.display !== "none") {
        eventPage.style.display = "none";
    }
}

function triggerEventStartBanner() {
    const banner = document.getElementById("eventStartBanner");
    if (!banner) return;
    if (eventStartBannerTimeout) clearTimeout(eventStartBannerTimeout);
    banner.style.display = "block";
    eventStartBannerTimeout = setTimeout(() => {
        banner.style.display = "none";
    }, 6000);
}

function chooseEventRarity() {
    if (forcedEventRarity !== null) {
        const r = forcedEventRarity;
        forcedEventRarity = null;
        return r;
    }
    const roll = Math.random();
    let cumulative = 0;
    for (let i = eventRarities.length - 1; i > 0; i--) {
        const r = eventRarities[i];
        cumulative += (1 / r.oddsNumber);
        if (roll < cumulative) return r;
    }
    return eventRarities[0];
}

function showEventRarity(r) {
    eventResult.innerHTML = `<div>${r.name}</div><small>1/${formatOdds(r.oddsNumber)}</small>`;
    if (r.color === "rainbow") {
        eventResult.style.background = "linear-gradient(90deg, red, orange, yellow, green, cyan, blue, violet)";
        eventResult.style.backgroundSize = "300% 100%";
        eventResult.style.webkitBackgroundClip = "text";
        eventResult.style.webkitTextFillColor = "transparent";
    } else {
        eventResult.style.background = "none";
        eventResult.style.webkitBackgroundClip = "initial";
        eventResult.style.webkitTextFillColor = "initial";
        eventResult.style.color = r.color;
    }
}

function updateEventInventoryUI() {
    if (!eventInventoryList) return;
    eventInventoryList.innerHTML = "";
    eventRarities.forEach(r => {
        const item = document.createElement("div");
        item.style.background = "#1a0033";
        item.style.border = "2px solid " + (r.color === "rainbow" ? "#8338ec" : r.color);
        item.style.borderRadius = "10px";
        item.style.padding = "10px 16px";
        item.style.minWidth = "100px";
        item.style.textAlign = "center";

        const name = document.createElement("div");
        name.textContent = r.name;
        name.style.fontWeight = "bold";
        name.style.fontSize = "14px";
        name.style.color = r.color === "rainbow" ? "#fff" : r.color;

        const odds = document.createElement("div");
        odds.textContent = `1/${formatOdds(r.oddsNumber)}`;
        odds.style.fontSize = "11px";
        odds.style.color = "#aaa";
        odds.style.marginTop = "2px";

        const count = document.createElement("div");
        count.textContent = `x${eventInventory[r.name]}`;
        count.style.fontSize = "18px";
        count.style.marginTop = "4px";

        item.appendChild(name);
        item.appendChild(odds);
        item.appendChild(count);
        eventInventoryList.appendChild(item);
    });
}

function executeEventRoll(callback) {
    if (isEventRolling) return;
    isEventRolling = true;
    eventRollButton.disabled = true;

    const duration = 900, start = Date.now();
    function animate() {
        const elapsed = Date.now() - start;
        showEventRarity(eventRarities[Math.floor(Math.random() * eventRarities.length)]);
        playSound("roll");
        if (elapsed < duration) {
            setTimeout(animate, 40 + ((elapsed / duration) * 150));
        } else {
            finish();
        }
    }
    animate();

    function finish() {
        const selected = chooseEventRarity();
        eventInventory[selected.name]++;
        hasParticipatedJulesb4Event = true;
        showEventRarity(selected);
        if (selected.name !== "Arcade") playSound("success");
        updateEventInventoryUI();
        checkAchievements();
        saveGame();
        isEventRolling = false;
        if (!isEventAutoRollActive) {
            eventRollButton.disabled = false;
        }
        if (callback) callback();
    }
}

function updateEventAutoRollUnlockStatus() {
    if (!eventAutoRollButton) return;
    if (totalRolls >= 10) {
        eventAutoRollButton.style.cursor = "pointer";
        eventAutoRollButton.style.color = "white";
        if (!isEventAutoRollActive && !eventAutoRollCooldown) {
            eventAutoRollButton.style.background = "#2f3136";
            eventAutoRollRequirement.textContent = "Débloqué";
        }
    } else {
        eventAutoRollButton.style.background = "#202225";
        eventAutoRollButton.style.color = "#666";
        eventAutoRollButton.style.cursor = "not-allowed";
        eventAutoRollRequirement.textContent = `${10 - totalRolls} rolls (base) restants`;
    }
}

function startEventAutoRoll() {
    if (!isEventAutoRollActive) return;
    executeEventRoll(() => {
        if (isEventAutoRollActive) {
            if (eventAutoRollTimeout) clearTimeout(eventAutoRollTimeout);
            eventAutoRollTimeout = setTimeout(startEventAutoRoll, 300);
        }
    });
}

eventAutoRollButton.addEventListener("click", () => {
    playSound("click");
    if (totalRolls < 10) {
        alert("10 rolls dans le jeu de base requis pour l'Auto-Roll Julesb4 !");
        return;
    }

    if (eventAutoRollCooldown) return;

    isEventAutoRollActive = !isEventAutoRollActive;

    if (isEventAutoRollActive) {
        eventAutoRollCooldown = true;
        eventAutoRollButton.style.background = "#43b581";
        eventAutoRollButton.style.boxShadow = "0 0 15px rgba(67, 181, 129, 0.4)";

        let timeLeft = 5;
        eventAutoRollButton.innerHTML = `AUTO-ROLL<br><small style='color:white;'>Sécurité (${timeLeft}s)</small>`;

        const cooldownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                eventAutoRollButton.innerHTML = `AUTO-ROLL<br><small style='color:white;'>Sécurité (${timeLeft}s)</small>`;
            } else {
                clearInterval(cooldownInterval);
                eventAutoRollCooldown = false;
                if (isEventAutoRollActive) {
                    eventAutoRollButton.innerHTML = "AUTO-ROLL<br><small style='color:white;'>Cliquer pour désactiver</small>";
                }
            }
        }, 1000);

        eventRollButton.disabled = true;
        if (eventAutoRollTimeout) clearTimeout(eventAutoRollTimeout);
        startEventAutoRoll();
    } else {
        eventAutoRollButton.style.background = "#2f3136";
        eventAutoRollButton.style.boxShadow = "none";
        eventAutoRollButton.innerHTML = "AUTO-ROLL<br><small id='eventAutoRollRequirement'>Débloqué</small>";
        if (!isEventRolling) eventRollButton.disabled = false;
        if (eventAutoRollTimeout) clearTimeout(eventAutoRollTimeout);
    }
});


function chooseRarity() {
    if (forcedRarity !== null) {
        const r = forcedRarity;
        forcedRarity = null;
        return r;
    }
    let totalLuck = activeLuck;
    if (isLuckEventActive) totalLuck *= customLuckMultiplier;

    const roll = Math.random();
    let cumulative = 0;
    for (let i = rarities.length - 1; i > 0; i--) {
        const r = rarities[i];
        cumulative += (1 / r.oddsNumber) * totalLuck;
        if (roll < cumulative) return r;
    }
    return rarities[0];
}

function executeRoll(callback) {
    if (isRolling) return;
    isRolling = true;
    rollButton.disabled = true;

    const duration = 1200, start = Date.now();
    function animate() {
        const elapsed = Date.now() - start;
        showRarity(rarities[Math.floor(Math.random() * rarities.length)]);
        playSound("roll");
        if (elapsed < duration) {
            setTimeout(animate, 40 + ((elapsed / duration) * 180));
        } else {
            finish();
        }
    }
    animate();

    function finish() {
        const selected = chooseRarity();
        inventory[selected.name]++;
        totalRolls++;
        if (selected.coins) {
            let moneyMultiplier = coinMult * (isMoneyEventActive ? customMoneyMultiplier : 1);
            coins += selected.coins * moneyMultiplier;
        }
        updateUIStats();
        showRarity(selected);
        result.classList.remove("flash");
        void result.offsetWidth;
        if (!["Common", "Uncommon", "Rare"].includes(selected.name)) {
            result.classList.add("flash");
            playSound("success");
        }
        updateInventory();
        updateAutoRollUnlockStatus();
        updateEventAutoRollUnlockStatus();
        checkAchievements();
        saveGame();

        isRolling = false;
        if (!isAutoRollActive) {
            rollButton.disabled = false;
        }
        if (callback) callback();
    }
}

rollButton.addEventListener("click", () => {
    if (isAutoRollActive || isRolling) return;
    executeRoll();
});

function startAutoRoll() {
    if (!isAutoRollActive) return;
    executeRoll(() => {
        if (isAutoRollActive) {
            if (autoRollTimeout) clearTimeout(autoRollTimeout);
            autoRollTimeout = setTimeout(startAutoRoll, 300);
        }
    });
}

autoRollButton.addEventListener("click", () => {
    playSound("click");
    if (totalRolls < 50) {
        alert("50 rolls requis pour l'Auto-Roll !");
        return;
    }

    if (autoRollCooldown) return;

    isAutoRollActive = !isAutoRollActive;

    if (isAutoRollActive) {
        autoRollCooldown = true;
        autoRollButton.classList.add("active");

        let timeLeft = 5;
        autoRollButton.innerHTML = `AUTO-ROLL<br><small style='color:white;'>Sécurité (${timeLeft}s)</small>`;

        const cooldownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                autoRollButton.innerHTML = `AUTO-ROLL<br><small style='color:white;'>Sécurité (${timeLeft}s)</small>`;
            } else {
                clearInterval(cooldownInterval);
                autoRollCooldown = false;
                if (isAutoRollActive) {
                    autoRollButton.innerHTML = "AUTO-ROLL<br><small style='color:white;'>Cliquer pour désactiver</small>";
                }
            }
        }, 1000);

        rollButton.disabled = true;
        if (autoRollTimeout) clearTimeout(autoRollTimeout);
        startAutoRoll();
    } else {
        autoRollButton.classList.remove("active");
        autoRollButton.innerHTML = "AUTO-ROLL<br><small id='autoRollRequirement'>Débloqué</small>";
        if (!isRolling) rollButton.disabled = false;
        if (autoRollTimeout) clearTimeout(autoRollTimeout);
    }
});

inventoryButton.addEventListener("click", () => {
    playSound("click");
    currentInventoryView = "base";
    inventoryViewBaseButton.style.background = "#5865f2";
    inventoryViewEventButton.style.background = "#292929";
    updateInventory();
    inventoryWindow.style.display = "flex";
});
closeInventory.addEventListener("click", () => { playSound("click"); inventoryWindow.style.display = "none"; });

inventoryViewBaseButton.addEventListener("click", () => {
    playSound("click");
    currentInventoryView = "base";
    inventoryViewBaseButton.style.background = "#5865f2";
    inventoryViewEventButton.style.background = "#292929";
    updateInventory();
});

inventoryViewEventButton.addEventListener("click", () => {
    playSound("click");
    currentInventoryView = "event";
    inventoryViewEventButton.style.background = "#8338ec";
    inventoryViewBaseButton.style.background = "#292929";
    updateInventory();
});
shopButton.addEventListener("click", () => { playSound("click"); updateShopUI(); shopWindow.style.display = "flex"; });
closeShop.addEventListener("click", () => { playSound("click"); shopWindow.style.display = "none"; });
achievementsButton.addEventListener("click", () => { playSound("click"); updateAchievementsUI(); achievementsWindow.style.display = "flex"; });
closeAchievements.addEventListener("click", () => { playSound("click"); achievementsWindow.style.display = "none"; hideAchievementTooltip(); });
settingsButton.addEventListener("click", () => { playSound("click"); luckSlider.max = luck; luckSlider.value = activeLuck; currentLuckSetting.textContent = `x${activeLuck}`; settingsWindow.style.display = "flex"; });
closeSettings.addEventListener("click", () => { playSound("click"); settingsWindow.style.display = "none"; });

eventButton.addEventListener("click", () => {
    playSound("click");
    updateEventInventoryUI();
    updateEventAutoRollUnlockStatus();
    eventPage.style.display = "flex";
});
closeEventPage.addEventListener("click", () => { playSound("click"); eventPage.style.display = "none"; });
eventRollButton.addEventListener("click", () => {
    if (isEventAutoRollActive || isEventRolling) return;
    executeEventRoll();
});

luckSlider.addEventListener("input", (e) => {
    activeLuck = parseInt(e.target.value);
    currentLuckSetting.textContent = `x${activeLuck}`;
    updateUIStats();
    saveGame();
});

resetButton.addEventListener("click", () => {
    playSound("click");
    if (confirm("Réinitialiser toute la progression ?")) {
        localStorage.removeItem("rngGameSave");
        location.reload();
    }
});

// ==========================================================================
// COMPTE JOUEUR : nom d'utilisateur + mot de passe, synchronisé sur Firebase
// pour retrouver sa progression sur un autre appareil.
// ==========================================================================

function isValidUsername(username) {
    return /^[a-zA-Z0-9_]{3,16}$/.test(username);
}

function updateAccountUI() {
    if (loggedInUid) {
        accountLoggedOutSection.style.display = "none";
        accountLoggedInSection.style.display = "block";
        accountUsernameDisplay.textContent = loggedInUsername;
    } else {
        accountLoggedOutSection.style.display = "block";
        accountLoggedInSection.style.display = "none";
    }
}

function connectPlayerAccountAuth() {
    if (window.playerAccount && window.playerAccount.onAuthChange) {
        window.playerAccount.onAuthChange((user) => {
            if (user) {
                loggedInUid = user.uid;
                loggedInUsername = user.displayName || "Joueur";
                updateAccountUI();
                window.playerAccount.loadFromCloud(user.uid).then((cloudData) => {
                    if (cloudData) {
                        applySaveData(cloudData);
                        updateUIStats();
                        updateInventory();
                        updateAutoRollUnlockStatus();
                        updateEventAutoRollUnlockStatus();
                        updateShopUI();
                    } else {
                        // Nouveau compte, pas encore de sauvegarde cloud : on pousse la progression actuelle
                        saveGame();
                    }
                });
            } else {
                loggedInUid = null;
                loggedInUsername = null;
                updateAccountUI();
            }
        });
    } else {
        setTimeout(connectPlayerAccountAuth, 100);
    }
}
connectPlayerAccountAuth();

accountSignupButton.addEventListener("click", () => {
    const username = accountUsernameInput.value.trim();
    const password = accountPasswordInput.value;
    accountError.textContent = "";

    if (!isValidUsername(username)) {
        accountError.textContent = "Nom d'utilisateur : 3 à 16 caractères, lettres/chiffres/_ seulement.";
        return;
    }
    if (password.length < 6) {
        accountError.textContent = "Le mot de passe doit faire au moins 6 caractères.";
        return;
    }
    if (!window.playerAccount) return;

    window.playerAccount.signUp(username, password)
        .then(() => {
            playSound("success");
            accountPasswordInput.value = "";
        })
        .catch((err) => {
            if (err.code === "auth/email-already-in-use") {
                accountError.textContent = "Ce nom d'utilisateur est déjà pris.";
            } else {
                accountError.textContent = "Erreur lors de la création du compte.";
            }
            playSound("click");
        });
});

accountLoginButton.addEventListener("click", () => {
    const username = accountUsernameInput.value.trim();
    const password = accountPasswordInput.value;
    accountError.textContent = "";

    if (!username || !password) {
        accountError.textContent = "Entre ton nom d'utilisateur et ton mot de passe.";
        return;
    }
    if (!window.playerAccount) return;

    window.playerAccount.login(username, password)
        .then(() => {
            playSound("success");
            accountPasswordInput.value = "";
        })
        .catch(() => {
            accountError.textContent = "Identifiants incorrects.";
            playSound("click");
        });
});

accountPasswordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") accountLoginButton.click();
});

accountLogoutButton.addEventListener("click", () => {
    if (!window.playerAccount) return;
    window.playerAccount.logout();
    playSound("click");
});

// ==========================================================================
// CLASSEMENT : top 100 joueurs par pièces, basé sur les comptes créés.
// ==========================================================================

function renderLeaderboard(data) {
    const entries = Object.values(data || {})
        .filter(e => e && e.username)
        .sort((a, b) => (b.coins || 0) - (a.coins || 0))
        .slice(0, 100);

    leaderboardList.innerHTML = "";

    if (entries.length === 0) {
        leaderboardList.innerHTML = `<p style="text-align:center; color:#888; padding:20px 0;">Personne au classement pour l'instant.</p>`;
        return;
    }

    entries.forEach((entry, index) => {
        const item = document.createElement("div");
        item.className = "inventoryItem";
        if (entry.username === loggedInUsername) {
            item.style.background = "#2d2a4a";
            item.style.border = "1px solid #5865f2";
        }

        const rank = document.createElement("span");
        rank.textContent = `#${index + 1}  ${entry.username}`;
        rank.style.fontWeight = "bold";

        const coinsSpan = document.createElement("span");
        coinsSpan.textContent = `${formatNumber(entry.coins || 0)} 🪙`;
        coinsSpan.style.color = "#ffd700";

        item.appendChild(rank);
        item.appendChild(coinsSpan);
        leaderboardList.appendChild(item);
    });
}

leaderboardButton.addEventListener("click", () => {
    playSound("click");
    leaderboardWindow.style.display = "flex";
    leaderboardList.innerHTML = "";

    if (!loggedInUid) {
        leaderboardNoAccountMessage.style.display = "block";
        leaderboardLoading.style.display = "none";
        return;
    }

    leaderboardNoAccountMessage.style.display = "none";
    leaderboardLoading.style.display = "block";
    leaderboardLoading.textContent = "Chargement du classement...";

    if (!window.playerAccount) return;
    window.playerAccount.getLeaderboard()
        .then((data) => {
            leaderboardLoading.style.display = "none";
            renderLeaderboard(data);
        })
        .catch(() => {
            leaderboardLoading.textContent = "Erreur de chargement du classement.";
        });
});

closeLeaderboard.addEventListener("click", () => { playSound("click"); leaderboardWindow.style.display = "none"; });

// --- Raccourci admin discret : Ctrl + Shift tenus, puis 4, 5, 6 dans l'ordre ---
// (utilise e.code, indépendant de la disposition du clavier, ex: FR-CA)
let adminComboBuffer = [];
let adminComboTimer = null;
const ADMIN_SEQUENCE = ["Digit4", "Digit5", "Digit6"];

window.addEventListener("keydown", (e) => {
    if (!(e.ctrlKey && e.shiftKey)) { adminComboBuffer = []; return; }
    if (!ADMIN_SEQUENCE.includes(e.code)) return;

    adminComboBuffer.push(e.code);
    if (adminComboBuffer.length > ADMIN_SEQUENCE.length) adminComboBuffer.shift();

    if (adminComboTimer) clearTimeout(adminComboTimer);
    adminComboTimer = setTimeout(() => { adminComboBuffer = []; }, 1500);

    if (adminComboBuffer.join(",") === ADMIN_SEQUENCE.join(",")) {
        e.preventDefault();
        adminPage.style.display = "flex";
        playSound("click");
        adminComboBuffer = [];
    }
});

closeAdminPage.addEventListener("click", () => { adminPage.style.display = "none"; playSound("click"); });

// ==========================================================================
// CONNEXION ADMIN : le panneau admin reste caché tant que le compte
// Firebase (créé dans la console) ne s'est pas connecté.
// ==========================================================================

function connectAdminAuth() {
    if (window.firebaseAdmin && window.firebaseAdmin.onAuthChange) {
        window.firebaseAdmin.onAuthChange((user) => {
            if (user) {
                adminLoginGate.style.display = "none";
                adminPanelContent.style.display = "block";
                adminLogoutButton.style.display = "inline-block";
            } else {
                adminLoginGate.style.display = "block";
                adminPanelContent.style.display = "none";
                adminLogoutButton.style.display = "none";
            }
        });
    } else {
        setTimeout(connectAdminAuth, 100);
    }
}
connectAdminAuth();

adminLoginButton.addEventListener("click", () => {
    const email = adminEmailInput.value.trim();
    const password = adminPasswordInput.value;
    adminLoginError.textContent = "";
    if (!email || !password) {
        adminLoginError.textContent = "Entre ton email et ton mot de passe.";
        return;
    }
    window.firebaseAdmin.login(email, password)
        .then(() => {
            playSound("success");
            adminPasswordInput.value = "";
        })
        .catch(() => {
            adminLoginError.textContent = "Identifiants incorrects.";
            playSound("click");
        });
});

adminPasswordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") adminLoginButton.click();
});

adminLogoutButton.addEventListener("click", () => {
    window.firebaseAdmin.logout();
    playSound("click");
});

// ==========================================================================
// PANNEAU ADMIN : chaque action écrit dans Firebase au lieu d'agir en local.
// L'effet réel est appliqué par handleAdminState() plus bas, pour TOUT
// le monde (y compris toi), quand la valeur revient depuis Firebase.
// ==========================================================================

adminSendMsgButton.addEventListener("click", () => {
    const text = adminMessageInput.value.trim();
    if (text === "") return alert("Écris un message !");
    playSound("success");
    adminPage.style.display = "none";
    if (adminTestModeToggle.checked) {
        triggerAdminMessage(text);
    } else {
        if (!window.firebaseAdmin) return alert("Synchro Firebase non connectée.");
        window.firebaseAdmin.push({ message: { text, id: Date.now() } });
    }
    adminMessageInput.value = "";
});

adminClearMsgButton.addEventListener("click", () => {
    if (adminTestModeToggle.checked) {
        if (adminMessageTimeout) clearTimeout(adminMessageTimeout);
        adminAnnouncementBanner.style.display = "none";
        adminMessage = "";
    } else {
        if (!window.firebaseAdmin) return;
        window.firebaseAdmin.clear("message");
    }
    adminMessageInput.value = "";
    playSound("click");
    adminPage.style.display = "none";
});

adminStartMoneyEvent.addEventListener("click", () => {
    const mult = parseInt(adminMoneyMultiplierInput.value) || 1;
    const durationSec = (parseInt(adminMoneyDurationInput.value) || 1) * 60;
    playSound("success");
    adminPage.style.display = "none";
    const eventData = { mult, endsAt: Date.now() + durationSec * 1000 };
    if (adminTestModeToggle.checked) {
        applyMoneyEventFromState(eventData);
    } else {
        if (!window.firebaseAdmin) return alert("Synchro Firebase non connectée.");
        window.firebaseAdmin.push({ moneyEvent: eventData });
    }
});

adminStopMoneyEvent.addEventListener("click", () => {
    playSound("click");
    adminPage.style.display = "none";
    if (adminTestModeToggle.checked) {
        applyMoneyEventFromState(null);
    } else {
        if (!window.firebaseAdmin) return;
        window.firebaseAdmin.clear("moneyEvent");
    }
});

adminStartLuckEvent.addEventListener("click", () => {
    const mult = parseInt(adminLuckMultiplierInput.value) || 1;
    const durationSec = (parseInt(adminLuckDurationInput.value) || 1) * 60;
    playSound("success");
    adminPage.style.display = "none";
    const eventData = { mult, endsAt: Date.now() + durationSec * 1000 };
    if (adminTestModeToggle.checked) {
        applyLuckEventFromState(eventData);
    } else {
        if (!window.firebaseAdmin) return alert("Synchro Firebase non connectée.");
        window.firebaseAdmin.push({ luckEvent: eventData });
    }
});

adminStopLuckEvent.addEventListener("click", () => {
    playSound("click");
    adminPage.style.display = "none";
    if (adminTestModeToggle.checked) {
        applyLuckEventFromState(null);
    } else {
        if (!window.firebaseAdmin) return;
        window.firebaseAdmin.clear("luckEvent");
    }
});

adminForceRarityButton.addEventListener("click", () => {
    const found = rarities.find(r => r.name === adminRaritySelect.value);
    if (found) {
        playSound("success");
        adminPage.style.display = "none";
        if (adminTestModeToggle.checked) {
            forcedRarity = found;
        } else {
            if (!window.firebaseAdmin) return alert("Synchro Firebase non connectée.");
            window.firebaseAdmin.push({ forcedRarity: { name: found.name, id: Date.now() } });
        }
    }
});

adminCancelForceRarityButton.addEventListener("click", () => {
    playSound("click");
    adminPage.style.display = "none";
    if (adminTestModeToggle.checked) {
        forcedRarity = null;
    } else {
        if (!window.firebaseAdmin) return;
        window.firebaseAdmin.clear("forcedRarity");
    }
});

adminStartCountdown.addEventListener("click", () => {
    const message = adminCountdownMessageInput.value.trim() || "Admin Abuse imminent !";
    const durationSec = (parseInt(adminCountdownDurationInput.value) || 1) * 60;
    playSound("success");
    adminPage.style.display = "none";
    const countdownData = { message, endsAt: Date.now() + durationSec * 1000 };
    if (adminTestModeToggle.checked) {
        applyCountdownFromState(countdownData);
    } else {
        if (!window.firebaseAdmin) return alert("Synchro Firebase non connectée.");
        window.firebaseAdmin.push({ countdown: countdownData });
    }
});

adminStopCountdown.addEventListener("click", () => {
    playSound("click");
    adminPage.style.display = "none";
    if (adminTestModeToggle.checked) {
        applyCountdownFromState(null);
    } else {
        if (!window.firebaseAdmin) return;
        window.firebaseAdmin.clear("countdown");
    }
});

adminUnlockAchievementButton.addEventListener("click", () => {
    const id = adminAchievementSelect.value;
    if (!id) return;
    playSound("success");
    adminPage.style.display = "none";
    if (adminTestModeToggle.checked) {
        forceUnlockAchievement(id);
    } else {
        if (!window.firebaseAdmin) return alert("Synchro Firebase non connectée.");
        window.firebaseAdmin.push({ unlockAchievement: { id, requestId: Date.now() } });
    }
});

adminCancelUnlockAchievementButton.addEventListener("click", () => {
    const id = adminAchievementSelect.value;
    if (!id) return;
    playSound("click");
    adminPage.style.display = "none";
    if (adminTestModeToggle.checked) {
        forceLockAchievement(id);
    } else {
        if (!window.firebaseAdmin) return;
        // On retire juste l'état "unlockAchievement" de Firebase : les joueurs déjà
        // débloqués gardent leur succès, mais les nouveaux arrivants ne le recevront plus.
        window.firebaseAdmin.clear("unlockAchievement");
    }
});

adminStartSpecialEvent.addEventListener("click", () => {
    playSound("success");
    adminPage.style.display = "none";
    if (adminTestModeToggle.checked) {
        isEventActive = true;
        updateEventButtonVisibility();
        triggerEventStartBanner();
    } else {
        if (!window.firebaseAdmin) return alert("Synchro Firebase non connectée.");
        window.firebaseAdmin.push({ specialEvent: true });
    }
});

adminStopSpecialEvent.addEventListener("click", () => {
    playSound("click");
    adminPage.style.display = "none";
    if (adminTestModeToggle.checked) {
        isEventActive = false;
        updateEventButtonVisibility();
    } else {
        if (!window.firebaseAdmin) return;
        window.firebaseAdmin.clear("specialEvent");
    }
});

adminForceEventRarityButton.addEventListener("click", () => {
    const found = eventRarities.find(r => r.name === adminEventRaritySelect.value);
    if (found) {
        playSound("success");
        adminPage.style.display = "none";
        if (adminTestModeToggle.checked) {
            forcedEventRarity = found;
        } else {
            if (!window.firebaseAdmin) return alert("Synchro Firebase non connectée.");
            window.firebaseAdmin.push({ forcedEventRarity: { name: found.name, id: Date.now() } });
        }
    }
});

adminCancelForceEventRarityButton.addEventListener("click", () => {
    playSound("click");
    adminPage.style.display = "none";
    if (adminTestModeToggle.checked) {
        forcedEventRarity = null;
    } else {
        if (!window.firebaseAdmin) return;
        window.firebaseAdmin.clear("forcedEventRarity");
    }
});

// ==========================================================================
// APPLICATION DES ÉTATS ADMIN REÇUS DE FIREBASE (pour tous les joueurs)
// ==========================================================================

let lastAppliedMessageId = null;
let lastAppliedForcedRarityId = null;
let lastAppliedForcedEventRarityId = null;
let lastAppliedUnlockAchievementRequestId = null;

function applyMoneyEventFromState(moneyEvent) {
    if (moneyEventCountdownInterval) clearInterval(moneyEventCountdownInterval);

    if (!moneyEvent || moneyEvent.endsAt <= Date.now()) {
        isMoneyEventActive = false;
        customMoneyMultiplier = 1;
        if (moneyEventBanner) moneyEventBanner.style.display = "none";
        updateUIStats();
        return;
    }

    isMoneyEventActive = true;
    customMoneyMultiplier = moneyEvent.mult;
    if (moneyEventBanner) { moneyEventBanner.style.display = "block"; moneyEventMult.textContent = customMoneyMultiplier; }

    function tick() {
        const remaining = Math.max(0, Math.round((moneyEvent.endsAt - Date.now()) / 1000));
        const m = Math.floor(remaining / 60), s = remaining % 60;
        if (moneyEventTimer) moneyEventTimer.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
        if (remaining <= 0) {
            clearInterval(moneyEventCountdownInterval);
            isMoneyEventActive = false;
            customMoneyMultiplier = 1;
            if (moneyEventBanner) moneyEventBanner.style.display = "none";
            updateUIStats();
        }
    }
    tick();
    moneyEventCountdownInterval = setInterval(tick, 1000);
    updateUIStats();
}

function applyLuckEventFromState(luckEvent) {
    if (luckEventCountdownInterval) clearInterval(luckEventCountdownInterval);

    if (!luckEvent || luckEvent.endsAt <= Date.now()) {
        isLuckEventActive = false;
        customLuckMultiplier = 1;
        if (luckEventBanner) luckEventBanner.style.display = "none";
        updateUIStats();
        return;
    }

    isLuckEventActive = true;
    customLuckMultiplier = luckEvent.mult;
    if (luckEventBanner) { luckEventBanner.style.display = "block"; luckEventMult.textContent = customLuckMultiplier; }

    function tick() {
        const remaining = Math.max(0, Math.round((luckEvent.endsAt - Date.now()) / 1000));
        const m = Math.floor(remaining / 60), s = remaining % 60;
        if (luckEventTimer) luckEventTimer.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
        if (remaining <= 0) {
            clearInterval(luckEventCountdownInterval);
            isLuckEventActive = false;
            customLuckMultiplier = 1;
            if (luckEventBanner) luckEventBanner.style.display = "none";
            updateUIStats();
        }
    }
    tick();
    luckEventCountdownInterval = setInterval(tick, 1000);
    updateUIStats();
}

function applyCountdownFromState(countdown) {
    if (adminCountdownInterval) clearInterval(adminCountdownInterval);

    if (!countdown || countdown.endsAt <= Date.now()) {
        if (adminCountdownBanner) adminCountdownBanner.style.display = "none";
        document.body.style.paddingTop = "";
        return;
    }

    if (adminCountdownBanner) {
        adminCountdownBanner.style.display = "block";
        adminCountdownLabel.textContent = countdown.message || "Admin Abuse imminent !";
        document.body.style.paddingTop = "90px";
    }

    function tick() {
        const remaining = Math.max(0, Math.ceil((countdown.endsAt - Date.now()) / 1000));
        const minutesLeft = Math.ceil(remaining / 60);
        if (adminCountdownNumber) adminCountdownNumber.textContent = `${minutesLeft}m`;
        if (remaining <= 0) {
            clearInterval(adminCountdownInterval);
            if (adminCountdownBanner) adminCountdownBanner.style.display = "none";
            document.body.style.paddingTop = "";
        }
    }
    tick();
    adminCountdownInterval = setInterval(tick, 1000);
}

function handleAdminState(state) {
    // Message global
    if (state.message && state.message.id !== lastAppliedMessageId) {
        lastAppliedMessageId = state.message.id;
        triggerAdminMessage(state.message.text);
    } else if (!state.message && adminAnnouncementBanner.style.display !== "none") {
        if (adminMessageTimeout) clearTimeout(adminMessageTimeout);
        adminAnnouncementBanner.style.display = "none";
        adminMessage = "";
    }

    // Events pièces / luck (pilotés entièrement par l'état reçu)
    applyMoneyEventFromState(state.moneyEvent);
    applyLuckEventFromState(state.luckEvent);
    applyCountdownFromState(state.countdown);

    // Rareté forcée : s'applique au prochain roll de CHAQUE joueur
    if (state.forcedRarity && state.forcedRarity.id !== lastAppliedForcedRarityId) {
        lastAppliedForcedRarityId = state.forcedRarity.id;
        const found = rarities.find(r => r.name === state.forcedRarity.name);
        if (found) forcedRarity = found;
    } else if (!state.forcedRarity && lastAppliedForcedRarityId !== null) {
        // L'admin a annulé : on retire l'effet chez ceux qui n'ont pas encore rollé
        lastAppliedForcedRarityId = null;
        forcedRarity = null;
    }

    // Déblocage forcé d'un succès (une seule fois par requestId)
    if (state.unlockAchievement && state.unlockAchievement.requestId !== lastAppliedUnlockAchievementRequestId) {
        lastAppliedUnlockAchievementRequestId = state.unlockAchievement.requestId;
        forceUnlockAchievement(state.unlockAchievement.id);
    }

    // Event spécial : affiche/masque le bouton chez tout le monde
    const newEventActive = !!state.specialEvent;
    if (newEventActive && !isEventActive) triggerEventStartBanner();
    isEventActive = newEventActive;
    updateEventButtonVisibility();

    // Rareté forcée pour l'event Julesb4 : s'applique au prochain ROLL JULESB4 de CHAQUE joueur
    if (state.forcedEventRarity && state.forcedEventRarity.id !== lastAppliedForcedEventRarityId) {
        lastAppliedForcedEventRarityId = state.forcedEventRarity.id;
        const found = eventRarities.find(r => r.name === state.forcedEventRarity.name);
        if (found) forcedEventRarity = found;
    } else if (!state.forcedEventRarity && lastAppliedForcedEventRarityId !== null) {
        lastAppliedForcedEventRarityId = null;
        forcedEventRarity = null;
    }
}

function connectAdminSync() {
    if (window.firebaseAdmin) {
        window.firebaseAdmin.subscribe(handleAdminState);
    } else {
        // Le module Firebase (chargé en <script type="module">) est différé ;
        // on réessaie un peu plus tard s'il n'est pas encore prêt.
        setTimeout(connectAdminSync, 100);
    }
}
connectAdminSync();

function updateShopUI() {
    coinCount.textContent = formatNumber(coins);

    luckLevelDisplay.textContent = `Niveau ${luckLevel} / ${maxLuckLevel}`;
    if (luckLevel >= maxLuckLevel) {
        luckPreviewDisplay.textContent = "Niveau max atteint !";
        buyLuckButton.textContent = "MAX";
        buyLuckButton.style.background = "#333";
    } else {
        luckPreviewDisplay.textContent = `Prochain niveau : Luck x${luck} ➔ x${luck + 1}`;
        luckCostDisplay.textContent = formatNumber(luckCost);
        buyLuckButton.textContent = `Acheter (${formatNumber(luckCost)} 🪙)`;
        buyLuckButton.style.background = "#5865f2";
    }

    coinMultLevelDisplay.textContent = `Niveau ${coinMultLevel} / ${maxCoinMultLevel}`;
    if (coinMultLevel >= maxCoinMultLevel) {
        coinMultPreviewDisplay.textContent = "Niveau max atteint !";
        buyCoinMultButton.textContent = "MAX";
        buyCoinMultButton.style.background = "#333";
    } else {
        coinMultPreviewDisplay.textContent = `Prochain niveau : Pièces x${coinMult} ➔ x${coinMult + 1}`;
        coinMultCostDisplay.textContent = formatNumber(coinMultCost);
        buyCoinMultButton.textContent = `Acheter (${formatNumber(coinMultCost)} 🪙)`;
        buyCoinMultButton.style.background = "#ffb300";
    }
}

buyLuckButton.addEventListener("click", () => {
    if (luckLevel >= maxLuckLevel) return;
    if (coins >= luckCost) {
        coins -= luckCost;
        luck += 1;
        activeLuck = luck;
        luckLevel = Math.min(luckLevel + 1, maxLuckLevel);
        luckCost = Math.floor(luckCost * 2.2);
        updateUIStats();
        updateShopUI();
        checkAchievements();
        saveGame();
        playSound("buy");
    } else {
        alert("Pas assez de pièces !");
    }
});

buyCoinMultButton.addEventListener("click", () => {
    if (coinMultLevel >= maxCoinMultLevel) return;
    if (coins >= coinMultCost) {
        coins -= coinMultCost;
        coinMult += 1;
        coinMultLevel = Math.min(coinMultLevel + 1, maxCoinMultLevel);
        coinMultCost = Math.floor(coinMultCost * 2.2);
        updateUIStats();
        updateShopUI();
        checkAchievements();
        saveGame();
        playSound("buy");
    } else {
        alert("Pas assez de pièces !");
    }
});

loadGame();
checkAchievements();
