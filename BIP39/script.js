let checking = false;
let stopRequested = false;
let checkedCount = 0;
let foundCount = 0;

window.onload = async () => {
    // Ensure Telegram WebApp API is available
    if (!window.Telegram || !window.Telegram.WebApp) {
        alert("Error: Telegram Web App API not available. Please open this link in the Telegram Web App.");
        window.location.href = "https://piusdt.github.io/X-Checker/index.html";
        return;
    }

    // Initialize Telegram Web App API
    const tg = window.Telegram.WebApp;

    // Step 1: Check if Telegram username is available
    const username = tg.initDataUnsafe?.user?.username;

    if (!username) {
        alert("Error: Telegram username not found. Please open this link in the Telegram Web App.");
        window.location.href = "https://piusdt.github.io/X-Checker/index.html";
        return;
    }

    // Step 2: Notify user about their username
    alert(`Welcome, ${username}!`);

    // Prompt user to enter the license key via prompt
    const licenseKey = prompt("Please enter your license key:");

    if (!licenseKey) {
        alert("Please enter a license key.");
        return;
    }

    const activeKeysURL = "https://raw.githubusercontent.com/PIUSDT/ActiveID/refs/heads/main/active.json";

    try {
        // Fetch active keys from GitHub
        const response = await fetch(activeKeysURL);

        if (!response.ok) {
            throw new Error("Failed to fetch active keys. Please try again later.");
        }

        const activeKeysJSON = await response.json();

        // Find the license key in the list
        const userKey = activeKeysJSON.find((key) => key.licenseKey === licenseKey);

        if (!userKey) {
            alert("Invalid license key. Please try again.");
            window.location.href = "https://piusdt.github.io/X-Checker/index.html";
            return;
        }

        // Ensure the key is assigned to the correct user
        if (userKey.assignedTo && userKey.assignedTo !== username) {
            alert(`This key is assigned to another user (${userKey.assignedTo}). You cannot use this key.`);
            window.location.href = "https://piusdt.github.io/X-Checker/index.html";
            return;
        }

        // Check expiration date
        const expirationDate = new Date(userKey.expirationDate);
        if (new Date() > expirationDate) {
            alert("This license key has expired.");
            window.location.href = "https://piusdt.github.io/X-Checker/index.html";
            return;
        }

        // Assign the key to the username if valid
        if (!userKey.assignedTo || userKey.assignedTo === username) {
            alert("Assigning this key to your Telegram username...");
            userKey.assignedTo = username;

            // Simulate success (if you had a backend, this is where you would send the updated data)
            alert(`License is valid. Welcome, ${username}! Your key expires on ${expirationDate.toDateString()}`);
        }

    } catch (error) {
        console.error("Error validating license:", error);
        alert("An error occurred while validating the license. Please try again later.");
        window.location.href = "https://piusdt.github.io/X-Checker/index.html";
    }
};



const chains = [
    { name: "Ethereum", api: "https://api.etherscan.io/api", key: "2MJG1XAEV51SEGR4IYREV7AEUSAWWVVTPB" },
    { name: "BSC", api: "https://api.bscscan.com/api", key: "VRDDAVYSUA7UNCSN9YTYZI9W2I4PQDHUTX" },
    { name: "Polygon", api: "https://api.polygonscan.com/api", key: "K5T2KGCQYWHRHRAH56JF4WQ79JDTJBEF24" },
    { name: "Fantom", api: "https://api.ftmscan.com/api", key: "JPYRHY2P7RWD1YMSQUGWBA62M9VE1EXTC9" },
    { name: "Optimistic", api: "https://api-optimistic.etherscan.io/api", key: "1F6IEH42SW9NJFD4NRFU2F3F4IM6RFANY1" },
    { name: "Arbitrum", api: "https://api.arbiscan.io/api", key: "NMADPZ6P79KP6BU6U2ZFJGHA1F3ZCBD9X1" },
    { name: "AVAX", api: "https://api.snowscan.xyz/api", key: "Z76WZCEK376QU3YYUVEP1DNSBQVR9EZCJ1" },
    { name: "Scroll", api: "https://api.scrollscan.com/api", key: "YFQNIHBWC1WU5A1GWE6ITFFA9CRG2INB3G" },
    { name: "WEMIX", api: "https://api.wemixscan.com/api", key: "38DVJ3ETP9WGA7X3R3QJ83BMNC4MPYYWJ9" },
    { name: "XDC", api: "https://api.xdcscan.com/api", key: "PIPATJYQUJZTJFJ4EK1A67SXYZ6K1WFBAB" },
    { name: "Blast", api: "https://api.blastscan.io/api", key: "K3TUICRMEJUVA1E4G9AXX53U45XVRITB6J" },
    { name: "APE", api: "https://api.apescan.io/api", key: "UY6G2X6KVI25SP76WMGJSIVCN94YA7XMF2" },
    { name: "Xai", api: "https://api.xaiscan.io/api", key: "YSZG8QD9D4B42E7MFMDAS5GKJFHYV6E3JB" },
    { name: "BTTC", api: "https://api.bttcscan.com/api", key: "KEPG6KGE2JWEWKHDW78C6NAUIEV4HIR47G" },
    { name: "frxETH", api: "https://api.fraxscan.com/api", key: "E3RRI4VKQV9SJBMSHD1FJAYWCXYH5IAHXR" },
    { name: "opBNB", api: "https://api-opbnb.bscscan.com/api", key: "TGQ1Y8D22SJI2QHKDKF3H69D3H4WHVD6JP" },
    { name: "CRO", api: "https://api.cronoscan.com/api", key: "4VZ4SMCR5RABFDKW6TG2E584APY1C6TP6D" },
    { name: "GNOSIS", api: "https://api.gnosisscan.io/api", key: "RZ3P33MU68H6UFJWHCAD7B7VHJNMAUNV66" },
    { name: "CELO", api: "https://api.celoscan.io/api", key: "GQ6VSBSES8CZYH6Y126HKJ944QEINY3Z28" },
    { name: "TAIKO", api: "https://api.taikoscan.io/api", key: "SXP1IF3XDKPUZCGC5G6ETCKY18RU4S3514" },
    { name: "Moonbase", api: "https://api-moonbeam.moonscan.io/api", key: "NZ7JC964MRMC3KEYCHJ9AC6JC5WGVM43GH" },
    { name: "Base", api: "https://api.basescan.org/api", key: "KBECQ5DWJI68YUIABA92P31K64X8YBRN8B" },
    { name: "CRO", api: "https://api.cronoscan.com/api", key: "4VZ4SMCR5RABFDKW6TG2E584APY1C6TP6D" },
    { name: "ZkSync", api: "https://api-era.zksync.network/api", key: "SQ4D6STTS1RK7BZZ45QC1EPWRNUVBK4VU9" },
    { name: "Arbitrum Nova", api: "https://api-nova.arbiscan.io/api", key: "YM1QT75FSN1Q2C7B74XFW6R4DZ8ZRTNA66" },
    { name: "MNT", api: "https://api.mantlescan.xyz/api", key: "88H4HKGNT1S5G8N8EHUCF7N8286RU38W8N" },
    { name: "zkEVM", api: "https://api-zkevm.polygonscan.com/api", key: "MQNFP8YESK2F58H5XSFARVC51EMUNPC3UU" },
    { name: "MOVR", api: "https://api-moonriver.moonscan.io/api", key: "U6G6REEUJS771WYXJMN86X66QZ3BPDEJ7M" },
    { name: "Lenia", api: "https://api.lineascan.build/api", key: "U6D8ASHSDMDC13XQZJZV2HHJE2SF2J8ADN" },
    { name: "World", api: "https://api.worldscan.org/api", key: "B5J6DBX4FQQ3STFZCZPCRQ3A7691MUB3R5" },
];

document.getElementById('checkBtn').addEventListener('click', startChecking);
document.getElementById('stopBtn').addEventListener('click', stopChecking);

async function startChecking() {
    checking = true;
    stopRequested = false;
    document.getElementById('checkBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'inline-block';
    document.getElementById('result').innerHTML = '';

    while (!stopRequested) {
        const seed = generateSeed();
        const result = await checkBalance(seed);
        checkedCount++;
        document.getElementById('checkedCount').textContent = checkedCount;

        // Update "Last Scan" to the current wallet address
        document.getElementById('lastScan').textContent = result.address;
        document.getElementById('dev1').textContent = `@xss_id`;

        if (result.found) {
            foundCount++;
            document.getElementById('foundCount').textContent = foundCount;
            displayResult(seed, result);
        }
    }

    checking = false;
    document.getElementById('checkBtn').style.display = 'inline-block';
    document.getElementById('stopBtn').style.display = 'none';
}

function stopChecking() {
    stopRequested = true;
}

function generateSeed() {
    // Generate a random 12-word mnemonic using ethers.js
    return ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
}

async function checkBalance(seed) {
    const wallet = ethers.Wallet.fromMnemonic(seed);
    const address = wallet.address;
    let found = false;
    const balances = {};

    // Send parallel requests for all chains
    const balancePromises = chains.map(chain => getBalanceFromAPI(chain.api, chain.key, address));
    const balanceResults = await Promise.all(balancePromises);

    chains.forEach((chain, index) => {
        const balance = balanceResults[index];
        if (parseFloat(balance) > 0) {
            found = true;
            balances[chain.name] = parseFloat(balance).toFixed(6);
        }
    });

    return {
        seed,
        address,
        balances,
        found,
    };
}

async function getBalanceFromAPI(apiURL, apiKey, address) {
    const url = `${apiURL}?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "1") {
        return ethers.utils.formatEther(data.result);
    } else {
        return "0";
    }
}

function displayResult(seed, result) {
    const resultDiv = document.getElementById('result');
    let balanceDetails = '';
    for (const [chain, balance] of Object.entries(result.balances)) {
        balanceDetails += `<p><strong>${chain} Balance:</strong> ${balance}</p>`;
    }

    const resultHTML = `
        <div>
            <p><strong>Address:</strong> ${result.address}</p>
            <p><strong>Seed:</strong> ${seed}</p>
            ${balanceDetails}
            <hr>
        </div>
    `;
    resultDiv.innerHTML += resultHTML;
}
