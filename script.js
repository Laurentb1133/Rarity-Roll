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
const inventoryWindow = document.getElementById("inventoryWindow");
const closeInventory = document.getElementById("closeInventory");
const inventoryList = document.getElementById("inventoryList");

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
const settingsWindow = document.getElementById("settingsWindow");
const closeSettings = document.getElementById("closeSettings");
const luckSlider = document.getElementById("luckSlider");
const currentLuckSetting = document.getElementById("currentLuckSetting");
const resetButton = document.getElementById("resetButton");

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

function saveGame() {
    localStorage.setItem("rngGameSave", JSON.stringify({
        coins, luck, activeLuck, luckLevel, luckCost,
        coinMult, coinMultLevel, coinMultCost,
        totalRolls, inventory, unlockedAchievements
    }));
}

function loadGame() {
    const saved = localStorage.getItem("rngGameSave");
    if (saved) {
        const data = JSON.parse(saved);
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
    }
    updateUIStats();
    updateAutoRollUnlockStatus();
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

function updateInventory() {
    inventoryList.innerHTML = "";
    rarities.forEach(r => {
        const item = document.createElement("div");
        item.className = "inventoryItem";
        const info = document.createElement("div");
        const name = document.createElement("span");
        name.textContent = r.name;
        const odds = document.createElement("small");
        odds.textContent = ` (1/${formatOdds(r.oddsNumber)})`;
        odds.style.color = "#888";
        odds.style.marginLeft = "8px";

        if (r.name === "Laurentb1133") {
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
        amount.textContent = `x${inventory[r.name]}`;
        item.appendChild(info);
        item.appendChild(amount);
        inventoryList.appendChild(item);
    });
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

inventoryButton.addEventListener("click", () => { playSound("click"); updateInventory(); inventoryWindow.style.display = "flex"; });
closeInventory.addEventListener("click", () => { playSound("click"); inventoryWindow.style.display = "none"; });
shopButton.addEventListener("click", () => { playSound("click"); updateShopUI(); shopWindow.style.display = "flex"; });
closeShop.addEventListener("click", () => { playSound("click"); shopWindow.style.display = "none"; });
achievementsButton.addEventListener("click", () => { playSound("click"); updateAchievementsUI(); achievementsWindow.style.display = "flex"; });
closeAchievements.addEventListener("click", () => { playSound("click"); achievementsWindow.style.display = "none"; hideAchievementTooltip(); });
settingsButton.addEventListener("click", () => { playSound("click"); luckSlider.max = luck; luckSlider.value = activeLuck; currentLuckSetting.textContent = `x${activeLuck}`; settingsWindow.style.display = "flex"; });
closeSettings.addEventListener("click", () => { playSound("click"); settingsWindow.style.display = "none"; });

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

// ==========================================================================
// APPLICATION DES ÉTATS ADMIN REÇUS DE FIREBASE (pour tous les joueurs)
// ==========================================================================

let lastAppliedMessageId = null;
let lastAppliedForcedRarityId = null;
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
        saveGame();
        playSound("buy");
    } else {
        alert("Pas assez de pièces !");
    }
});

loadGame();
checkAchievements();
