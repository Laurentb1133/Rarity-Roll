const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let isSoundMuted = localStorage.getItem("rngSoundMuted") === "1";

function playSound(type) {
    if (isSoundMuted) return;
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
let totalPlayTimeSeconds = 0;
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
    },
    {
        id: "leaderboard_coins",
        name: "Classement Pièces",
        description: "Apparaît dans le classement des pièces (nécessite un compte).",
        reward: 200,
        icon: "🪙",
        check: () => loggedInUid !== null && coins > 0
    },
    {
        id: "leaderboard_rolls",
        name: "Classement Rolls",
        description: "Apparaît dans le classement des rolls totaux (nécessite un compte).",
        reward: 200,
        icon: "🎲",
        check: () => loggedInUid !== null && totalRolls > 0
    },
    {
        id: "leaderboard_rarest",
        name: "Classement Rareté",
        description: "Apparaît dans le classement de la rareté la plus rare (nécessite un compte).",
        reward: 200,
        icon: "💎",
        check: () => loggedInUid !== null && getRarestOwnedRarity() !== null
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
const statsButton = document.getElementById("statsButton");
const statsWindow = document.getElementById("statsWindow");
const closeStats = document.getElementById("closeStats");
const statsList = document.getElementById("statsList");

const tradeButton = document.getElementById("tradeButton");
const tradeWindow = document.getElementById("tradeWindow");
const closeTrade = document.getElementById("closeTrade");
const tradeNoAccountMessage = document.getElementById("tradeNoAccountMessage");
const tradeHomeScreen = document.getElementById("tradeHomeScreen");
const tradeSessionScreen = document.getElementById("tradeSessionScreen");
const tradeTargetUsernameInput = document.getElementById("tradeTargetUsernameInput");
const tradeSendRequestButton = document.getElementById("tradeSendRequestButton");
const tradeSendError = document.getElementById("tradeSendError");
const tradeIncomingList = document.getElementById("tradeIncomingList");
const tradePartnerName = document.getElementById("tradePartnerName");
const tradeMyOfferList = document.getElementById("tradeMyOfferList");
const tradeTheirOfferList = document.getElementById("tradeTheirOfferList");
const tradeMyConfirmedBadge = document.getElementById("tradeMyConfirmedBadge");
const tradeTheirConfirmedBadge = document.getElementById("tradeTheirConfirmedBadge");
const tradeItemSelect = document.getElementById("tradeItemSelect");
const tradeItemQtyInput = document.getElementById("tradeItemQtyInput");
const tradeAddItemButton = document.getElementById("tradeAddItemButton");
const tradeCoinsInput = document.getElementById("tradeCoinsInput");
const tradeConfirmButton = document.getElementById("tradeConfirmButton");
const tradeCancelButton = document.getElementById("tradeCancelButton");
const tradesEnabledToggle = document.getElementById("tradesEnabledToggle");

let currentTradeId = null;
let currentTradeData = null;
let mySide = null;
let currentTradeRequests = {};
let lastAppliedTradeId = null;
let listeningTradeId = null;

const tradeRequestBanner = document.getElementById("tradeRequestBanner");
const tradeRequestBannerText = document.getElementById("tradeRequestBannerText");
const tradeRequestAcceptBtn = document.getElementById("tradeRequestAcceptBtn");
const tradeRequestDeclineBtn = document.getElementById("tradeRequestDeclineBtn");
let tradeRequestQueue = [];
let tradeRequestBannerTimeout = null;
let tradeRequestBannerShowing = false;
let seenTradeRequestIds = new Set();

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
const soundToggle = document.getElementById("soundToggle");
soundToggle.checked = !isSoundMuted;
soundToggle.addEventListener("change", () => {
    isSoundMuted = !soundToggle.checked;
    localStorage.setItem("rngSoundMuted", isSoundMuted ? "1" : "0");
    if (!isSoundMuted) playSound("click");
});
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
const accountNewUsernameInput = document.getElementById("accountNewUsernameInput");
const accountChangeUsernameButton = document.getElementById("accountChangeUsernameButton");
const accountChangeUsernameMessage = document.getElementById("accountChangeUsernameMessage");

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
const adminTargetGlobal = document.getElementById("adminTargetGlobal");
const adminTargetSpecific = document.getElementById("adminTargetSpecific");
const adminTargetSpecificWrapper = document.getElementById("adminTargetSpecificWrapper");
const adminTargetUsernameSelect = document.getElementById("adminTargetUsernameSelect");
const adminRefreshTargetList = document.getElementById("adminRefreshTargetList");

function refreshAdminTargetList() {
    if (!window.playerAccount || !window.playerAccount.getAllUsernames) return;
    const previousValue = adminTargetUsernameSelect.value;
    adminTargetUsernameSelect.innerHTML = `<option value="">— Chargement... —</option>`;
    window.playerAccount.getAllUsernames().then((usernames) => {
        adminTargetUsernameSelect.innerHTML = `<option value="">— Choisir un joueur —</option>`;
        usernames.sort((a, b) => a.localeCompare(b)).forEach((username) => {
            const option = document.createElement("option");
            option.value = username;
            option.textContent = username;
            adminTargetUsernameSelect.appendChild(option);
        });
        if (usernames.includes(previousValue)) adminTargetUsernameSelect.value = previousValue;
    }).catch(() => {
        adminTargetUsernameSelect.innerHTML = `<option value="">— Erreur de chargement —</option>`;
    });
}

adminTargetGlobal.addEventListener("change", () => { adminTargetSpecificWrapper.style.display = "none"; });
adminTargetSpecific.addEventListener("change", () => {
    adminTargetSpecificWrapper.style.display = "flex";
    refreshAdminTargetList();
});
adminRefreshTargetList.addEventListener("click", () => { playSound("click"); refreshAdminTargetList(); });

// Retourne null pour "tout le monde", ou le pseudo choisi pour un joueur précis.
// Retourne undefined si le mode "joueur précis" est choisi mais aucun joueur n'est sélectionné.
function getAdminTarget() {
    if (adminTargetSpecific.checked) {
        return adminTargetUsernameSelect.value || undefined;
    }
    return null;
}

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
const adminGiveCoinsInput = document.getElementById("adminGiveCoinsInput");
const adminGiveCoinsButton = document.getElementById("adminGiveCoinsButton");
const adminMultiRollCountInput = document.getElementById("adminMultiRollCountInput");
const adminMultiRollDurationInput = document.getElementById("adminMultiRollDurationInput");
const adminStartMultiRollEvent = document.getElementById("adminStartMultiRollEvent");
const adminStopMultiRollEvent = document.getElementById("adminStopMultiRollEvent");
let isMultiRollEventActive = false, multiRollCount = 1, multiRollCountdownInterval = null;

const moneyEventBanner = document.getElementById("moneyEventBanner");
const moneyEventMult = document.getElementById("moneyEventMult");
const moneyEventTimer = document.getElementById("moneyEventTimer");

const luckEventBanner = document.getElementById("luckEventBanner");
const luckEventMult = document.getElementById("luckEventMult");
const luckEventTimer = document.getElementById("luckEventTimer");
const multiRollEventBanner = document.getElementById("multiRollEventBanner");
const multiRollEventCountDisplay = document.getElementById("multiRollEventCount");
const multiRollEventTimer = document.getElementById("multiRollEventTimer");

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
        totalRolls, inventory, unlockedAchievements, eventInventory, hasParticipatedJulesb4Event, totalPlayTimeSeconds
    };
    localStorage.setItem("rngGameSave", JSON.stringify(data));
    if (loggedInUid && window.playerAccount) {
        const rarest = getRarestOwnedRarity();
        window.playerAccount.saveToCloud(loggedInUid, {
            ...data,
            username: loggedInUsername,
            updatedAt: Date.now(),
            rarestOddsNumber: rarest ? rarest.oddsNumber : 0,
            rarestName: rarest ? rarest.name : ""
        });
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
    totalPlayTimeSeconds = data.totalPlayTimeSeconds || 0;
}

function resetToFreshGameState() {
    coins = 0;
    luck = 1;
    activeLuck = 1;
    luckLevel = 1;
    luckCost = 50;
    coinMult = 1;
    coinMultLevel = 1;
    coinMultCost = 100;
    totalRolls = 0;
    rarities.forEach(r => inventory[r.name] = 0);
    achievements.forEach(a => unlockedAchievements[a.id] = false);
    eventRarities.forEach(r => eventInventory[r.name] = 0);
    hasParticipatedJulesb4Event = false;
    totalPlayTimeSeconds = 0;

    localStorage.removeItem("rngGameSave");

    updateUIStats();
    updateInventory();
    updateAutoRollUnlockStatus();
    updateEventAutoRollUnlockStatus();
    updateShopUI();
    if (achievementsWindow.style.display !== "none") updateAchievementsUI();
    if (statsWindow.style.display !== "none") updateStatsUI();
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

let isMultiRollSequenceActive = false;

rollButton.addEventListener("click", () => {
    if (isAutoRollActive || isRolling || isMultiRollSequenceActive) return;
    if (isMultiRollEventActive && multiRollCount > 1) {
        isMultiRollSequenceActive = true;
        rollButton.disabled = true;
        triggerMultiRoll(multiRollCount);
    } else {
        executeRoll();
    }
});

function triggerMultiRoll(remaining) {
    executeRoll(() => {
        remaining--;
        if (remaining > 0) {
            triggerMultiRoll(remaining);
        } else {
            isMultiRollSequenceActive = false;
            rollButton.disabled = false;
        }
    });
}

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
                    checkAchievements();
                });

                // --- Trade : écoute des demandes reçues, reprise d'un trade en cours, préférence ---
                window.playerAccount.listenTradeRequests(user.uid, (requests) => {
                    Object.keys(requests).forEach((requestId) => {
                        if (!seenTradeRequestIds.has(requestId)) {
                            seenTradeRequestIds.add(requestId);
                            enqueueTradeRequestNotification(requestId, requests[requestId]);
                        }
                    });
                    currentTradeRequests = requests;
                    if (tradeWindow.style.display !== "none" && !currentTradeId) renderTradeIncoming();
                });
                window.playerAccount.listenActiveTradePointer(user.uid, (tradeId) => {
                    if (tradeId) {
                        if (listeningTradeId !== tradeId) enterTradeSession(tradeId, false);
                    } else if (currentTradeId) {
                        exitTradeSession();
                    }
                });
                window.playerAccount.getTradesEnabled(user.uid).then((enabled) => {
                    tradesEnabledToggle.checked = enabled;
                });
            } else {
                const wasLoggedIn = loggedInUid !== null;
                loggedInUid = null;
                loggedInUsername = null;
                updateAccountUI();
                currentTradeRequests = {};
                seenTradeRequestIds = new Set();
                tradeRequestQueue = [];
                if (tradeRequestBannerTimeout) clearTimeout(tradeRequestBannerTimeout);
                tradeRequestBannerShowing = false;
                tradeRequestBanner.style.display = "none";
                if (currentTradeId) exitTradeSession();
                tradesEnabledToggle.checked = true;
                if (wasLoggedIn) {
                    // Vraie déconnexion (pas juste l'état initial en invité) : on efface la
                    // progression locale pour éviter de la dupliquer sur un nouveau compte.
                    resetToFreshGameState();
                }
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

accountChangeUsernameButton.addEventListener("click", () => {
    const newUsername = accountNewUsernameInput.value.trim();
    accountChangeUsernameMessage.style.color = "#ff6b6b";
    accountChangeUsernameMessage.textContent = "";

    if (!isValidUsername(newUsername)) {
        accountChangeUsernameMessage.textContent = "3 à 16 caractères, lettres/chiffres/_ seulement.";
        return;
    }
    if (newUsername === loggedInUsername) {
        accountChangeUsernameMessage.textContent = "C'est déjà ton pseudo actuel.";
        return;
    }
    if (!window.playerAccount || !window.playerAccount.changeUsername) return;

    window.playerAccount.changeUsername(newUsername)
        .then(() => {
            loggedInUsername = newUsername;
            accountUsernameDisplay.textContent = newUsername;
            accountNewUsernameInput.value = "";
            accountChangeUsernameMessage.style.color = "#4caf50";
            accountChangeUsernameMessage.textContent = "Pseudo changé avec succès !";
            playSound("success");
            saveGame(); // pousse le nouveau pseudo vers players/ et leaderboard/
        })
        .catch((err) => {
            console.error("Erreur changement de pseudo :", err.code, err.message);
            if (err.code === "auth/email-already-in-use") {
                accountChangeUsernameMessage.textContent = "Ce pseudo est déjà pris.";
            } else if (err.code === "auth/requires-recent-login") {
                accountChangeUsernameMessage.textContent = "Déconnecte-toi puis reconnecte-toi avant de réessayer.";
            } else {
                accountChangeUsernameMessage.textContent = "Erreur : " + (err.code || err.message || "inconnue");
            }
            playSound("click");
        });
});

// ==========================================================================
// CLASSEMENT : top 100 joueurs, par pièces / rolls totaux / rareté la plus rare.
// ==========================================================================

let lastLeaderboardData = null;
let currentLeaderboardCategory = "coins";

const leaderboardTabCoins = document.getElementById("leaderboardTabCoins");
const leaderboardTabRolls = document.getElementById("leaderboardTabRolls");
const leaderboardTabRarest = document.getElementById("leaderboardTabRarest");

const LEADERBOARD_CATEGORIES = {
    coins: {
        sortKey: (e) => e.coins || 0,
        format: (e) => `${formatNumber(e.coins || 0)} 🪙`
    },
    rolls: {
        sortKey: (e) => e.totalRolls || 0,
        format: (e) => `${formatNumber(e.totalRolls || 0)} 🎲`
    },
    rarest: {
        sortKey: (e) => e.rarestOddsNumber || 0,
        format: (e) => e.rarestName ? `${e.rarestName} (1/${formatOdds(e.rarestOddsNumber)})` : "Aucune"
    }
};

function updateLeaderboardTabStyles() {
    leaderboardTabCoins.style.background = currentLeaderboardCategory === "coins" ? "#5865f2" : "#292929";
    leaderboardTabRolls.style.background = currentLeaderboardCategory === "rolls" ? "#5865f2" : "#292929";
    leaderboardTabRarest.style.background = currentLeaderboardCategory === "rarest" ? "#5865f2" : "#292929";
}

function renderLeaderboard(data) {
    const category = LEADERBOARD_CATEGORIES[currentLeaderboardCategory];
    const entries = Object.values(data || {})
        .filter(e => e && e.username)
        .sort((a, b) => category.sortKey(b) - category.sortKey(a))
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

        const valueSpan = document.createElement("span");
        valueSpan.textContent = category.format(entry);
        valueSpan.style.color = "#ffd700";

        item.appendChild(rank);
        item.appendChild(valueSpan);
        leaderboardList.appendChild(item);
    });
}

function switchLeaderboardTab(category) {
    currentLeaderboardCategory = category;
    updateLeaderboardTabStyles();
    if (lastLeaderboardData) renderLeaderboard(lastLeaderboardData);
}

leaderboardTabCoins.addEventListener("click", () => { playSound("click"); switchLeaderboardTab("coins"); });
leaderboardTabRolls.addEventListener("click", () => { playSound("click"); switchLeaderboardTab("rolls"); });
leaderboardTabRarest.addEventListener("click", () => { playSound("click"); switchLeaderboardTab("rarest"); });

leaderboardButton.addEventListener("click", () => {
    playSound("click");
    leaderboardWindow.style.display = "flex";
    leaderboardList.innerHTML = "";
    currentLeaderboardCategory = "coins";
    updateLeaderboardTabStyles();

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
            lastLeaderboardData = data;
            renderLeaderboard(data);
        })
        .catch(() => {
            leaderboardLoading.textContent = "Erreur de chargement du classement.";
        });
});

closeLeaderboard.addEventListener("click", () => { playSound("click"); leaderboardWindow.style.display = "none"; });

// ==========================================================================
// STATISTIQUES : pièces, rolls totaux, rareté la plus rare, temps joué.
// ==========================================================================

function getRarestOwnedRarity() {
    for (let i = rarities.length - 1; i >= 0; i--) {
        if (inventory[rarities[i].name] > 0) return rarities[i];
    }
    return null;
}

function formatPlayTime(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { totalMinutes, hours, minutes };
}

function updateStatsUI() {
    statsList.innerHTML = "";

    const rarest = getRarestOwnedRarity();
    const time = formatPlayTime(totalPlayTimeSeconds);

    const rows = [
        { label: "🪙 Pièces", value: formatNumber(coins) },
        { label: "🎲 Rolls totaux", value: formatNumber(totalRolls) },
        { label: "💎 Rareté la plus rare", value: rarest ? `${rarest.name} (1/${formatOdds(rarest.oddsNumber)})` : "Aucune" },
        { label: "🕒 Temps joué", value: `${time.totalMinutes} min (${time.hours}h ${time.minutes}min)` }
    ];

    rows.forEach(row => {
        const item = document.createElement("div");
        item.className = "inventoryItem";
        const label = document.createElement("span");
        label.textContent = row.label;
        const value = document.createElement("span");
        value.textContent = row.value;
        value.style.fontWeight = "bold";
        item.appendChild(label);
        item.appendChild(value);
        statsList.appendChild(item);
    });
}

statsButton.addEventListener("click", () => {
    playSound("click");
    updateStatsUI();
    statsWindow.style.display = "flex";
});
closeStats.addEventListener("click", () => { playSound("click"); statsWindow.style.display = "none"; });

// ==========================================================================
// TRADE : échanger pièces et raretés (jeu de base) entre deux joueurs connectés.
// ==========================================================================

function getTradePartnerUsername() {
    if (!currentTradeData) return "";
    return mySide === "A" ? currentTradeData.usernameB : currentTradeData.usernameA;
}
function getMyOffer() {
    if (!currentTradeData) return { coins: 0, items: {} };
    return mySide === "A" ? currentTradeData.offerA : currentTradeData.offerB;
}
function getTheirOffer() {
    if (!currentTradeData) return { coins: 0, items: {} };
    return mySide === "A" ? currentTradeData.offerB : currentTradeData.offerA;
}
function amIConfirmed() {
    if (!currentTradeData) return false;
    return mySide === "A" ? !!currentTradeData.confirmA : !!currentTradeData.confirmB;
}
function isPartnerConfirmed() {
    if (!currentTradeData) return false;
    return mySide === "A" ? !!currentTradeData.confirmB : !!currentTradeData.confirmA;
}

function renderOfferList(container, offer) {
    container.innerHTML = "";
    const items = (offer && offer.items) || {};
    const keys = Object.keys(items).filter(k => items[k] > 0);
    if (keys.length === 0 && (!offer || !offer.coins)) {
        container.innerHTML = `<div style="color:#666;">Rien pour l'instant</div>`;
        return;
    }
    keys.forEach(name => {
        const row = document.createElement("div");
        row.textContent = `${name} x${items[name]}`;
        container.appendChild(row);
    });
    if (offer && offer.coins > 0) {
        const row = document.createElement("div");
        row.style.color = "#ffd700";
        row.textContent = `🪙 ${formatNumber(offer.coins)}`;
        container.appendChild(row);
    }
}

function renderTradeSession() {
    if (!currentTradeData) return;
    tradePartnerName.textContent = getTradePartnerUsername();
    renderOfferList(tradeMyOfferList, getMyOffer());
    renderOfferList(tradeTheirOfferList, getTheirOffer());
    tradeMyConfirmedBadge.textContent = amIConfirmed() ? "✅" : "";
    tradeTheirConfirmedBadge.textContent = isPartnerConfirmed() ? "✅" : "";
    tradeConfirmButton.textContent = amIConfirmed() ? "↩️ Annuler ma confirmation" : "✅ Confirmer";
}

function getInventoryObjectForItem(name) {
    if (rarities.some(r => r.name === name)) return inventory;
    if (eventRarities.some(r => r.name === name)) return eventInventory;
    return null;
}

function populateTradeItemSelect() {
    tradeItemSelect.innerHTML = "";

    const baseGroup = document.createElement("optgroup");
    baseGroup.label = "🎲 Jeu de Base";
    rarities.forEach(r => {
        const owned = inventory[r.name] || 0;
        if (owned <= 0) return;
        const option = document.createElement("option");
        option.value = r.name;
        option.textContent = `${r.name} (x${owned})`;
        baseGroup.appendChild(option);
    });
    if (baseGroup.children.length > 0) tradeItemSelect.appendChild(baseGroup);

    const eventGroup = document.createElement("optgroup");
    eventGroup.label = "🎉 Julesb4";
    eventRarities.forEach(r => {
        const owned = eventInventory[r.name] || 0;
        if (owned <= 0) return;
        const option = document.createElement("option");
        option.value = r.name;
        option.textContent = `${r.name} (x${owned})`;
        eventGroup.appendChild(option);
    });
    if (eventGroup.children.length > 0) tradeItemSelect.appendChild(eventGroup);

    if (tradeItemSelect.options.length === 0) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "Aucune rareté disponible";
        tradeItemSelect.appendChild(option);
    }
}

function exitTradeSession() {
    currentTradeId = null;
    currentTradeData = null;
    mySide = null;
    listeningTradeId = null;
    tradeSessionScreen.style.display = "none";
    if (tradeWindow.style.display !== "none") {
        tradeHomeScreen.style.display = "block";
        renderTradeIncoming();
        populateTradeItemSelect();
    }
}

function applyTradeExchange(tradeData) {
    const myOffer = mySide === "A" ? tradeData.offerA : tradeData.offerB;
    const theirOffer = mySide === "A" ? tradeData.offerB : tradeData.offerA;
    const partnerName = mySide === "A" ? tradeData.usernameB : tradeData.usernameA;

    Object.keys(myOffer.items || {}).forEach(name => {
        const invObj = getInventoryObjectForItem(name);
        if (invObj) invObj[name] = Math.max(0, (invObj[name] || 0) - myOffer.items[name]);
    });
    coins = Math.max(0, coins - (myOffer.coins || 0));

    Object.keys(theirOffer.items || {}).forEach(name => {
        const invObj = getInventoryObjectForItem(name);
        if (invObj) invObj[name] = (invObj[name] || 0) + theirOffer.items[name];
    });
    coins += (theirOffer.coins || 0);

    updateUIStats();
    updateInventory();
    updateEventInventoryUI();
    checkAchievements();
    saveGame();
    playSound("success");
    alert(`🔄 Trade complété avec ${partnerName} !`);

    window.playerAccount.endTrade(currentTradeId, tradeData.uidA, tradeData.uidB);
    exitTradeSession();
}

function handleTradeUpdate(tradeData) {
    if (!tradeData) {
        if (currentTradeId) exitTradeSession();
        return;
    }
    currentTradeData = tradeData;
    mySide = (loggedInUid === tradeData.uidA) ? "A" : "B";

    if (tradeData.confirmA && tradeData.confirmB && lastAppliedTradeId !== currentTradeId) {
        lastAppliedTradeId = currentTradeId;
        applyTradeExchange(tradeData);
        return;
    }
    if (tradeWindow.style.display !== "none") renderTradeSession();
}

// autoOpenWindow: true seulement pour celui qui vient de cliquer "Accepter" —
// pour l'autre joueur (notifié en temps réel via listenActiveTradePointer),
// la session se prépare silencieusement, sans lui sauter à l'écran.
function enterTradeSession(tradeId, autoOpenWindow) {
    if (listeningTradeId === tradeId) {
        if (autoOpenWindow) {
            tradeWindow.style.display = "flex";
            tradeHomeScreen.style.display = "none";
            tradeSessionScreen.style.display = "block";
            renderTradeSession();
        }
        return;
    }
    listeningTradeId = tradeId;
    currentTradeId = tradeId;
    populateTradeItemSelect();
    if (autoOpenWindow) {
        tradeWindow.style.display = "flex";
        tradeHomeScreen.style.display = "none";
        tradeSessionScreen.style.display = "block";
    }
    window.playerAccount.listenActiveTrade(tradeId, handleTradeUpdate);
}

function renderTradeIncoming() {
    tradeIncomingList.innerHTML = "";
    const ids = Object.keys(currentTradeRequests || {});
    if (ids.length === 0) {
        tradeIncomingList.innerHTML = `<p style="color:#666; font-size:12px; margin:0;">Aucune demande reçue.</p>`;
        return;
    }
    ids.forEach(requestId => {
        const req = currentTradeRequests[requestId];
        const row = document.createElement("div");
        row.className = "inventoryItem";
        row.style.flexDirection = "column";
        row.style.alignItems = "stretch";
        row.style.gap = "8px";

        const label = document.createElement("div");
        label.textContent = `${req.fromUsername} veut trader`;
        label.style.fontWeight = "bold";

        const btnRow = document.createElement("div");
        btnRow.style.display = "flex";
        btnRow.style.gap = "8px";

        const acceptBtn = document.createElement("button");
        acceptBtn.textContent = "Accepter";
        acceptBtn.style.cssText = "flex:1; padding:8px; background:#43b581; color:white; border:none; border-radius:6px; cursor:pointer; font-size:12px;";
        acceptBtn.addEventListener("click", () => {
            playSound("success");
            window.playerAccount.acceptTradeRequest(loggedInUid, loggedInUsername, requestId, req.fromUid, req.fromUsername)
                .then((tradeId) => enterTradeSession(tradeId, true));
        });

        const declineBtn = document.createElement("button");
        declineBtn.textContent = "Refuser";
        declineBtn.style.cssText = "flex:1; padding:8px; background:#ff3b30; color:white; border:none; border-radius:6px; cursor:pointer; font-size:12px;";
        declineBtn.addEventListener("click", () => {
            playSound("click");
            window.playerAccount.declineTradeRequest(loggedInUid, requestId);
        });

        btnRow.appendChild(acceptBtn);
        btnRow.appendChild(declineBtn);
        row.appendChild(label);
        row.appendChild(btnRow);
        tradeIncomingList.appendChild(row);
    });
}

tradeButton.addEventListener("click", () => {
    playSound("click");
    tradeWindow.style.display = "flex";
    if (!loggedInUid) {
        tradeNoAccountMessage.style.display = "block";
        tradeHomeScreen.style.display = "none";
        tradeSessionScreen.style.display = "none";
        return;
    }
    tradeNoAccountMessage.style.display = "none";
    if (currentTradeId) {
        tradeHomeScreen.style.display = "none";
        tradeSessionScreen.style.display = "block";
        renderTradeSession();
    } else {
        tradeHomeScreen.style.display = "block";
        tradeSessionScreen.style.display = "none";
        renderTradeIncoming();
        populateTradeItemSelect();
    }
});
closeTrade.addEventListener("click", () => { playSound("click"); tradeWindow.style.display = "none"; });

const TRADE_REQUEST_COOLDOWN_MS = 2 * 60 * 1000;

tradeSendRequestButton.addEventListener("click", () => {
    const targetUsername = tradeTargetUsernameInput.value.trim();
    tradeSendError.style.color = "#ff6b6b";
    tradeSendError.textContent = "";
    if (!targetUsername) { tradeSendError.textContent = "Entre un pseudo."; return; }
    if (targetUsername === loggedInUsername) { tradeSendError.textContent = "Tu ne peux pas te trader toi-même."; return; }
    if (!window.playerAccount) return;

    window.playerAccount.lookupUsername(targetUsername).then((targetData) => {
        if (!targetData) { tradeSendError.textContent = "Ce joueur n'existe pas."; return; }
        return window.playerAccount.getTradeCooldown(loggedInUid, targetData.uid).then((lastSent) => {
            const remainingMs = TRADE_REQUEST_COOLDOWN_MS - (Date.now() - lastSent);
            if (remainingMs > 0) {
                const remainingSec = Math.ceil(remainingMs / 1000);
                tradeSendError.textContent = `Attends encore ${remainingSec}s avant de renvoyer une demande à ce joueur.`;
                return;
            }
            return window.playerAccount.getTradesEnabled(targetData.uid).then((enabled) => {
                if (!enabled) { tradeSendError.textContent = "Ce joueur n'accepte pas les trades."; return; }
                return window.playerAccount.sendTradeRequest(targetData.uid, loggedInUid, loggedInUsername).then(() => {
                    window.playerAccount.setTradeCooldown(loggedInUid, targetData.uid);
                    playSound("success");
                    tradeTargetUsernameInput.value = "";
                    tradeSendError.style.color = "#4caf50";
                    tradeSendError.textContent = "Demande envoyée !";
                });
            });
        });
    });
});

tradeAddItemButton.addEventListener("click", () => {
    if (!currentTradeId) return;
    const name = tradeItemSelect.value;
    const qty = parseInt(tradeItemQtyInput.value) || 0;
    if (!name || qty <= 0) return;
    const invObj = getInventoryObjectForItem(name);
    const owned = invObj ? (invObj[name] || 0) : 0;
    const myOffer = getMyOffer();
    const alreadyOffered = (myOffer.items && myOffer.items[name]) || 0;
    if (alreadyOffered + qty > owned) {
        alert("Tu n'as pas assez de cette rareté.");
        return;
    }
    const newItems = { ...(myOffer.items || {}) };
    newItems[name] = (newItems[name] || 0) + qty;
    playSound("click");
    window.playerAccount.updateTradeOffer(currentTradeId, mySide, { coins: myOffer.coins || 0, items: newItems });
});

tradeCoinsInput.addEventListener("change", () => {
    if (!currentTradeId) return;
    let amount = parseInt(tradeCoinsInput.value) || 0;
    if (amount < 0) amount = 0;
    if (amount > coins) {
        alert("Tu n'as pas assez de pièces.");
        tradeCoinsInput.value = getMyOffer().coins || 0;
        return;
    }
    playSound("click");
    window.playerAccount.updateTradeOffer(currentTradeId, mySide, { coins: amount, items: getMyOffer().items || {} });
});

tradeConfirmButton.addEventListener("click", () => {
    if (!currentTradeId) return;
    playSound("click");
    window.playerAccount.setTradeConfirmation(currentTradeId, mySide, !amIConfirmed());
});

tradeCancelButton.addEventListener("click", () => {
    if (!currentTradeId || !currentTradeData) return;
    playSound("click");
    window.playerAccount.endTrade(currentTradeId, currentTradeData.uidA, currentTradeData.uidB);
    exitTradeSession();
});

tradesEnabledToggle.addEventListener("change", () => {
    if (!loggedInUid || !window.playerAccount) { tradesEnabledToggle.checked = true; return; }
    playSound("click");
    window.playerAccount.setTradesEnabled(loggedInUid, tradesEnabledToggle.checked);
});

// --- Bannière globale de demande de trade (file d'attente, 15s pour répondre) ---

function enqueueTradeRequestNotification(requestId, req) {
    tradeRequestQueue.push({ requestId, req });
    if (!tradeRequestBannerShowing) showNextTradeRequestNotification();
}

function showNextTradeRequestNotification() {
    if (tradeRequestQueue.length === 0) {
        tradeRequestBannerShowing = false;
        tradeRequestBanner.style.display = "none";
        return;
    }
    tradeRequestBannerShowing = true;
    const { requestId, req } = tradeRequestQueue.shift();
    tradeRequestBannerText.textContent = `🔄 ${req.fromUsername} veut faire un trade !`;
    tradeRequestBanner.dataset.requestId = requestId;
    tradeRequestBanner.dataset.fromUid = req.fromUid;
    tradeRequestBanner.dataset.fromUsername = req.fromUsername;
    tradeRequestBanner.style.display = "block";

    if (tradeRequestBannerTimeout) clearTimeout(tradeRequestBannerTimeout);
    tradeRequestBannerTimeout = setTimeout(() => {
        showNextTradeRequestNotification();
    }, 15000);
}

tradeRequestAcceptBtn.addEventListener("click", () => {
    const requestId = tradeRequestBanner.dataset.requestId;
    const fromUid = tradeRequestBanner.dataset.fromUid;
    const fromUsername = tradeRequestBanner.dataset.fromUsername;
    if (tradeRequestBannerTimeout) clearTimeout(tradeRequestBannerTimeout);
    playSound("success");
    window.playerAccount.acceptTradeRequest(loggedInUid, loggedInUsername, requestId, fromUid, fromUsername)
        .then((tradeId) => {
            enterTradeSession(tradeId, true);
        });
    showNextTradeRequestNotification();
});

tradeRequestDeclineBtn.addEventListener("click", () => {
    const requestId = tradeRequestBanner.dataset.requestId;
    if (tradeRequestBannerTimeout) clearTimeout(tradeRequestBannerTimeout);
    playSound("click");
    window.playerAccount.declineTradeRequest(loggedInUid, requestId);
    showNextTradeRequestNotification();
});

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
    const target = getAdminTarget();
    if (target === undefined) return alert("Entre le pseudo du joueur ciblé.");
    playSound("success");
    adminPage.style.display = "none";
    if (adminTestModeToggle.checked) {
        triggerAdminMessage(text);
    } else {
        if (!window.firebaseAdmin) return alert("Synchro Firebase non connectée.");
        window.firebaseAdmin.push({ message: { text, id: Date.now(), targetUsername: target } });
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
    const target = getAdminTarget();
    if (target === undefined) return alert("Entre le pseudo du joueur ciblé.");
    playSound("success");
    adminPage.style.display = "none";
    const eventData = { mult, endsAt: Date.now() + durationSec * 1000, targetUsername: target };
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
    const target = getAdminTarget();
    if (target === undefined) return alert("Entre le pseudo du joueur ciblé.");
    playSound("success");
    adminPage.style.display = "none";
    const eventData = { mult, endsAt: Date.now() + durationSec * 1000, targetUsername: target };
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
        const target = getAdminTarget();
        if (target === undefined) return alert("Entre le pseudo du joueur ciblé.");
        playSound("success");
        adminPage.style.display = "none";
        if (adminTestModeToggle.checked) {
            forcedRarity = found;
        } else {
            if (!window.firebaseAdmin) return alert("Synchro Firebase non connectée.");
            window.firebaseAdmin.push({ forcedRarity: { name: found.name, id: Date.now(), targetUsername: target } });
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
    const target = getAdminTarget();
    if (target === undefined) return alert("Entre le pseudo du joueur ciblé.");
    playSound("success");
    adminPage.style.display = "none";
    const countdownData = { message, endsAt: Date.now() + durationSec * 1000, targetUsername: target };
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
    const target = getAdminTarget();
    if (target === undefined) return alert("Entre le pseudo du joueur ciblé.");
    playSound("success");
    adminPage.style.display = "none";
    if (adminTestModeToggle.checked) {
        forceUnlockAchievement(id);
    } else {
        if (!window.firebaseAdmin) return alert("Synchro Firebase non connectée.");
        window.firebaseAdmin.push({ unlockAchievement: { id, requestId: Date.now(), targetUsername: target } });
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
    const target = getAdminTarget();
    if (target === undefined) return alert("Entre le pseudo du joueur ciblé.");
    playSound("success");
    adminPage.style.display = "none";
    if (adminTestModeToggle.checked) {
        isEventActive = true;
        updateEventButtonVisibility();
        triggerEventStartBanner();
    } else {
        if (!window.firebaseAdmin) return alert("Synchro Firebase non connectée.");
        window.firebaseAdmin.push({ specialEvent: { active: true, targetUsername: target } });
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
        const target = getAdminTarget();
        if (target === undefined) return alert("Entre le pseudo du joueur ciblé.");
        playSound("success");
        adminPage.style.display = "none";
        if (adminTestModeToggle.checked) {
            forcedEventRarity = found;
        } else {
            if (!window.firebaseAdmin) return alert("Synchro Firebase non connectée.");
            window.firebaseAdmin.push({ forcedEventRarity: { name: found.name, id: Date.now(), targetUsername: target } });
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

adminGiveCoinsButton.addEventListener("click", () => {
    const amount = parseInt(adminGiveCoinsInput.value) || 0;
    if (amount <= 0) return;
    const target = getAdminTarget();
    if (target === undefined) return alert("Entre le pseudo du joueur ciblé.");
    playSound("success");
    adminPage.style.display = "none";
    if (adminTestModeToggle.checked) {
        coins += amount;
        updateUIStats();
        checkAchievements();
        saveGame();
    } else {
        if (!window.firebaseAdmin) return alert("Synchro Firebase non connectée.");
        window.firebaseAdmin.push({ giveCoins: { amount, requestId: Date.now(), targetUsername: target } });
    }
});

adminStartMultiRollEvent.addEventListener("click", () => {
    const count = Math.max(2, parseInt(adminMultiRollCountInput.value) || 2);
    const durationSec = (parseInt(adminMultiRollDurationInput.value) || 1) * 60;
    const target = getAdminTarget();
    if (target === undefined) return alert("Entre le pseudo du joueur ciblé.");
    playSound("success");
    adminPage.style.display = "none";
    const eventData = { count, endsAt: Date.now() + durationSec * 1000, targetUsername: target };
    if (adminTestModeToggle.checked) {
        applyMultiRollEventFromState(eventData);
    } else {
        if (!window.firebaseAdmin) return alert("Synchro Firebase non connectée.");
        window.firebaseAdmin.push({ multiRollEvent: eventData });
    }
});

adminStopMultiRollEvent.addEventListener("click", () => {
    playSound("click");
    adminPage.style.display = "none";
    if (adminTestModeToggle.checked) {
        applyMultiRollEventFromState(null);
    } else {
        if (!window.firebaseAdmin) return;
        window.firebaseAdmin.clear("multiRollEvent");
    }
});

// ==========================================================================
// APPLICATION DES ÉTATS ADMIN REÇUS DE FIREBASE (pour tous les joueurs)
// ==========================================================================

let lastAppliedMessageId = null;
let lastAppliedForcedRarityId = null;
let lastAppliedForcedEventRarityId = null;
let lastAppliedGiveCoinsRequestId = null;
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

function applyMultiRollEventFromState(multiRollEvent) {
    if (multiRollCountdownInterval) clearInterval(multiRollCountdownInterval);

    if (!multiRollEvent || multiRollEvent.endsAt <= Date.now()) {
        isMultiRollEventActive = false;
        multiRollCount = 1;
        if (multiRollEventBanner) multiRollEventBanner.style.display = "none";
        return;
    }

    isMultiRollEventActive = true;
    multiRollCount = multiRollEvent.count;
    if (multiRollEventBanner) {
        multiRollEventBanner.style.display = "block";
        multiRollEventCountDisplay.textContent = multiRollCount;
    }

    function tick() {
        const remaining = Math.max(0, Math.round((multiRollEvent.endsAt - Date.now()) / 1000));
        const m = Math.floor(remaining / 60), s = remaining % 60;
        if (multiRollEventTimer) multiRollEventTimer.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
        if (remaining <= 0) {
            clearInterval(multiRollCountdownInterval);
            isMultiRollEventActive = false;
            multiRollCount = 1;
            if (multiRollEventBanner) multiRollEventBanner.style.display = "none";
        }
    }
    tick();
    multiRollCountdownInterval = setInterval(tick, 1000);
}

// Une action non ciblée (targetUsername null/absent) touche tout le monde.
// Une action ciblée ne s'applique que si mon pseudo correspond.
function isTargetedAtMe(targetUsername) {
    return !targetUsername || targetUsername === loggedInUsername;
}

function handleAdminState(state) {
    // Message global (ou ciblé)
    const targetedMessage = state.message && isTargetedAtMe(state.message.targetUsername) ? state.message : null;
    if (targetedMessage && targetedMessage.id !== lastAppliedMessageId) {
        lastAppliedMessageId = targetedMessage.id;
        triggerAdminMessage(targetedMessage.text);
    } else if (!targetedMessage && adminAnnouncementBanner.style.display !== "none") {
        if (adminMessageTimeout) clearTimeout(adminMessageTimeout);
        adminAnnouncementBanner.style.display = "none";
        adminMessage = "";
    }

    // Events pièces / luck / countdown (ciblés ou globaux, pilotés entièrement par l'état reçu)
    applyMoneyEventFromState(state.moneyEvent && isTargetedAtMe(state.moneyEvent.targetUsername) ? state.moneyEvent : null);
    applyLuckEventFromState(state.luckEvent && isTargetedAtMe(state.luckEvent.targetUsername) ? state.luckEvent : null);
    applyCountdownFromState(state.countdown && isTargetedAtMe(state.countdown.targetUsername) ? state.countdown : null);

    // Rareté forcée : s'applique au prochain roll de CHAQUE joueur (ou d'un joueur précis)
    const targetedForcedRarity = state.forcedRarity && isTargetedAtMe(state.forcedRarity.targetUsername) ? state.forcedRarity : null;
    if (targetedForcedRarity && targetedForcedRarity.id !== lastAppliedForcedRarityId) {
        lastAppliedForcedRarityId = targetedForcedRarity.id;
        const found = rarities.find(r => r.name === targetedForcedRarity.name);
        if (found) forcedRarity = found;
    } else if (!targetedForcedRarity && lastAppliedForcedRarityId !== null) {
        // L'admin a annulé : on retire l'effet chez ceux qui n'ont pas encore rollé
        lastAppliedForcedRarityId = null;
        forcedRarity = null;
    }

    // Déblocage forcé d'un succès (une seule fois par requestId, ciblé ou global)
    if (state.unlockAchievement && state.unlockAchievement.requestId !== lastAppliedUnlockAchievementRequestId) {
        lastAppliedUnlockAchievementRequestId = state.unlockAchievement.requestId;
        if (isTargetedAtMe(state.unlockAchievement.targetUsername)) {
            forceUnlockAchievement(state.unlockAchievement.id);
        }
    }

    // Event spécial : affiche/masque le bouton (ciblé ou chez tout le monde)
    const specialEventState = state.specialEvent;
    const specialEventIsBool = typeof specialEventState === "boolean"; // compat anciennes données
    const specialEventTargeted = specialEventState && !specialEventIsBool ? isTargetedAtMe(specialEventState.targetUsername) : !!specialEventState;
    const newEventActive = specialEventIsBool ? specialEventState : !!(specialEventState && specialEventState.active && specialEventTargeted);
    if (newEventActive && !isEventActive) triggerEventStartBanner();
    isEventActive = newEventActive;
    updateEventButtonVisibility();

    // Rareté forcée pour l'event Julesb4 : s'applique au prochain ROLL JULESB4 (ciblé ou global)
    const targetedForcedEventRarity = state.forcedEventRarity && isTargetedAtMe(state.forcedEventRarity.targetUsername) ? state.forcedEventRarity : null;
    if (targetedForcedEventRarity && targetedForcedEventRarity.id !== lastAppliedForcedEventRarityId) {
        lastAppliedForcedEventRarityId = targetedForcedEventRarity.id;
        const found = eventRarities.find(r => r.name === targetedForcedEventRarity.name);
        if (found) forcedEventRarity = found;
    } else if (!targetedForcedEventRarity && lastAppliedForcedEventRarityId !== null) {
        lastAppliedForcedEventRarityId = null;
        forcedEventRarity = null;
    }

    // Don de pièces (une seule fois par requestId, ciblé ou chez chaque joueur connecté)
    if (state.giveCoins && state.giveCoins.requestId !== lastAppliedGiveCoinsRequestId) {
        lastAppliedGiveCoinsRequestId = state.giveCoins.requestId;
        if (isTargetedAtMe(state.giveCoins.targetUsername)) {
            coins += state.giveCoins.amount;
            updateUIStats();
            checkAchievements();
            saveGame();
        }
    }

    // Event Multi-Roll (ciblé ou global, piloté entièrement par l'état reçu)
    applyMultiRollEventFromState(state.multiRollEvent && isTargetedAtMe(state.multiRollEvent.targetUsername) ? state.multiRollEvent : null);
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

// --- Suivi du temps de jeu total ---
setInterval(() => {
    totalPlayTimeSeconds++;
}, 1000);

setInterval(() => {
    saveGame();
}, 60000);

window.addEventListener("beforeunload", () => {
    saveGame();
});
