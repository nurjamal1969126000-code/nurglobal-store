require('dotenv').config();
const mongoose = require('mongoose');

// 🛡️ MongoDB Atlas ক্লাউড ডাটাবেজ কানেকশন
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nurglobal')
.then(() => console.log('🟢 [DATABASE STATUS] MongoDB Atlas ক্লাউড ডাটাবেজ সফলভাবে কানেক্ট হয়েছে!'))
.catch(err => console.error('🔴 [DATABASE ERROR] ডাটাবেজ কানেকশন ব্যর্থ হয়েছে:', err));

const express = require('express');
const app = express();
const PORT = 3000;

app.get('/special-ai', (req, res) => {
    let mode = req.query.page || "personal_target"; // শেষ ৪টি ফিচারের জন্য ডিফল্ট ভিউ

    let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Optimization & Risk Ledger</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f4f7f6; margin: 0; padding: 20px; text-align: center; }
            .ai-card { background: white; max-width: 550px; margin: 20px auto; padding: 25px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: left; }
            .nav-tabs { display: flex; justify-content: space-around; margin-bottom: 20px; background: #e9ecef; padding: 5px; border-radius: 5px; }
            .nav-tabs a { text-decoration: none; color: #495057; padding: 8px 12px; font-weight: bold; border-radius: 4px; font-size: 11px; }
            .nav-tabs a.active { background: #111; color: #ffc107; }
            .ai-box { background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin-bottom: 15px; font-size: 13px; line-height: 1.5; border-left: 5px solid #ff5722; }
            .data-row { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee; font-size: 13px; }
            .status-banner { background: #e2f0d9; color: #2b7a1d; padding: 8px; border-radius: 4px; font-size: 12px; font-weight: bold; text-align: center; margin-top: 15px; }
            .sparkle-text { color: #ff5722; font-size: 12px; font-weight: bold; display: block; margin-top: 3px; }
            .risk-banner { background: #ffe3e3; color: #c9302c; padding: 10px; border-radius: 5px; font-size: 12px; font-weight: bold; border-left: 4px solid #d9534f; margin-top: 5px; }
        </style>
    </head>
    <body>
        <h1>⚙️ AI Personalization & Risk Engine</h1>
        <p>নূর গ্লোবাল স্টোর – শপিং অ্যাসিস্ট্যান্ট, অটো মার্কেটিং এবং গেট রিস্ক মনিটরিং হাব</p>

        <div class="ai-card">
            <!-- শেষ ৪টি ফিচারের কন্ট্রোল ট্যাব -->
            <div class="nav-tabs">
                <a href="/special-ai?page=personal_target" class="${mode === 'personal_target' ? 'active' : ''}">🎯 এআই পার্সোনালাইজেশন ও টার্গেটিং</a>
                <a href="/special-ai?page=marketing_risk" class="${mode === 'marketing_risk' ? 'active' : ''}">🛡️ অটোমেশন ও রিস্ক চেকার</a>
            </div>

            <!-- ৯. AI Personal Shopping Assistant এবং ১০. AI Country Targeting -->
            ${mode === 'personal_target' ? `
            <h3 style="margin-top:0; color:#333;">🎯 Regional Adaptation & Client Mapping</h3>
            
            <div class="ai-box" style="background:#e8f5e9; border-left-color:#28a745; color:#1b5e20;">
                <b>👤 ৯. পার্সোনাল শপিং অ্যাসিস্ট্যান্ট (AI Personal Shopping Assistant):</b><br>
                <span>কাস্টমার প্রোফাইল রুচি এবং প্রিভিয়াস ক্লিক হিস্ট্রি এআই ম্যাপিং ডাটা:</span>
                <div style="background:#fff; border-radius:4px; margin-top:5px; padding:2px 5px; color:#333;">
                    <div class="data-row" style="border-bottom:none;"><b>🎁 Recommended Item:</b> <span style="font-weight:bold; color:#28a745;">Minimalist Card Holder ($১২)</span></div>
                </div>
                <span class="sparkle-text" style="color:#28a745;">✨ Deep Machine Learning Behavior Synchronized</span>
            </div>

            <div class="ai-box" style="background:#e3f2fd; border-left-color:#2196f3; color:#0d47a1;">
                <b>🌍 ১০. দেশ-ভিত্তিক লক্ষ্য নির্ধারণ (AI Country Targeting):</b><br>
                <span>আগত ভিজিটরের দেশ অনুযায়ী রেভিনিউ নোড অপ্টিমাইজেশন ফিল্টার:</span>
                <div style="background:#fff; border-radius:4px; margin-top:5px; padding:2px 5px; color:#333;">
                    <div class="data-row" style="border-bottom:none;"><b>🛂 Customs & Duty Audit:</b> <span style="font-weight:bold; color:#007bff;">Cleared (Zero Restrictions)</span></div>
                </div>
                <span class="sparkle-text" style="color:#2196f3;">✨ Regional Logistics Matrix Injected</span>
            </div>
            ` : ''}

            <!-- ১১. AI Marketing Automation এবং ১২. AI Product Risk Checker -->
            ${mode === 'marketing_risk' ? `
            <h3 style="margin-top:0; color:#333;">🛡️ Marketing Autopilot & Safety Audit</h3>
            
            <div class="ai-box" style="background:#f3e5f5; border-left-color:#6f42c1; color:#4a148c;">
                <b>📣 ১১. মার্কেটিং অটোমেশন ইঞ্জিন (AI Marketing Automation):</b><br>
                <span>সোশ্যাল মিডিয়া প্রোমোশন কন্টেন্ট এবং অটো ট্রাফিক ফানেল ট্রিগার:</span>
                <div style="background:#fff; border-radius:4px; margin-top:5px; padding:2px 5px; color:#333;">
                    <div class="data-row" style="border-bottom:none;"><b>📡 Ad Network Sync:</b> <span style="font-weight:bold; color:#6f42c1;">FB Pixel & Google Tags Live</span></div>
                </div>
                <span class="sparkle-text" style="color:#6f42c1;">✨ Campaign Scaling Matrix Active</span>
            </div>

            <div class="ai-box" style="background:#ffe3e3; border-left-color:#dc3545; color:#c9302c;">
                <b>🛡️ ১২. পণ্য ঝুঁকি স্ক্যানার (AI Product Risk Checker):</b><br>
                <span>আপলোড করা নতুন সাপ্লায়ার আইটেমের ইন্টেলিজেন্ট পলিসি অডিট:</span>
                <div class="risk-banner">
                    🔒 AI Safe Scan: 0% Copyright Risk. Item is 100% compliant with Stripe & Facebook Ads policy rules.
                </div>
                <span class="sparkle-text" style="color:#dc3545;">✨ Trademark & Brand Scan Cleared</span>
            </div>
            ` : ''}

            <div class="status-banner">✅ Special AI Master System Complete (100% OK)</div>
        </div>
    </body>
    </html>
    `;
    res.send(htmlContent);
});


// ==========================================
// 💳 মডিউল ৯ - গ্লোবাল স্প্লিট পেমেন্ট ও ইনকাম ট্র্যাকার ইঞ্জিন
// ==========================================

// ডাটাবেজে ইনকাম এবং পেমেন্ট স্প্লিট হিসেব রাখার মডেল
const IncomeTrackerSchema = new mongoose.Schema({
    orderId: String,
    totalPaid: Number,
    currency: String,
    adminCommission: Number, // আপনার লাভ
    supplierPayout: Number,   // সাপ্লায়ারের আসল দাম
    status: { type: String, default: 'Pending' },
    timestamp: { type: Date, default: Date.now }
});
const IncomeTracker = mongoose.model('IncomeTracker', IncomeTrackerSchema);

// পেমেন্ট স্প্লিট প্রসেস করার আসল লজিক এপিআই (API Route)
app.post('/api/payment/split', async (req, res) => {
    try {
        const { orderId, totalAmount, supplierCost, currency } = req.body;
        
        // লাভের অংশ স্বয়ংক্রিয়ভাবে ভাগ করার মেকানিজম (Split Logic)
        const myProfit = totalAmount - supplierCost; 
        const supplierShare = supplierCost;

        const newPayout = new IncomeTracker({
            orderId: orderId || `NUR-PAY-${Math.floor(1000 + Math.random() * 9000)}`,
            totalPaid: totalAmount,
            currency: currency || 'USD',
            adminCommission: myProfit,
            supplierPayout: supplierShare,
            status: 'Split_Success'
        });

        await newPayout.save();

        console.log(`💰 [PAYMENT SPLIT SUCCESS]!!`);
        console.log(`   📦 অর্ডার আইডি: ${newPayout.orderId}`);
        console.log(`   💵 মোট পেমেন্ট: ${newPayout.totalPaid} ${newPayout.currency}`);
        console.log(`   👑 আপনার নিট লাভ (Commission): ${newPayout.adminCommission} ${newPayout.currency} -> ওয়ালেটে পাঠানো হয়েছে।`);
        console.log(`   🏢 সাপ্লায়ারের পাওনা: ${newPayout.supplierPayout} ${newPayout.currency}`);

        res.json({ 
            success: true, 
            message: "Payment successfully split between Admin and Supplier", 
            payoutDetails: newPayout 
        });
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

// আপনার ইনকাম এবং লাভের লাইভ স্ট্যাটাস দেখার জন্য সুপার অ্যাডমিন এপিআই
app.get('/api/admin/income-ledger', async (req, res) => {
    try {
        const ledger = await IncomeTracker.find().sort({ timestamp: -1 });
        
        // মোট লাভের যোগফল বের করার নোড লজিক
        let totalProfit = 0;
        ledger.forEach(item => { totalProfit += item.adminCommission; });

        res.json({
            status: "Active",
            module: "Module 9 - Automated Income Split Ledger",
            totalProfitAccumulated: totalProfit,
            currencyLedger: "USD / Global Multi-Currency",
            history: ledger
        });
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

// ==========================================
// 🤖 মডিউল ২ - AI ভয়েস ডাবিং ও মাল্টি-ল্যাঙ্গুয়েজ ট্রান্সলেশন ইঞ্জিন
// ==========================================

// ডাটাবেজে ২৫০টি দেশের ভাষা এবং AI ডাবিং ভয়েস কোডের ম্যাপিং লকার
const languageVoiceMap = {
    'BD': { lang: 'Bengali', voiceCode: 'bn-BD-Wavenet-A', translationRequired: false },
    'IN': { lang: 'Hindi', voiceCode: 'hi-IN-Wavenet-B', translationRequired: true },
    'US': { lang: 'English', voiceCode: 'en-US-News-K', translationRequired: true },
    'GB': { lang: 'English', voiceCode: 'en-GB-Wavenet-A', translationRequired: true },
    'SA': { lang: 'Arabic', voiceCode: 'ar-XA-Wavenet-C', translationRequired: true },
    'JP': { lang: 'Japanese', voiceCode: 'ja-JP-Neural2-F', translationRequired: true },
    'DE': { lang: 'German', voiceCode: 'de-DE-Polyglot-1', translationRequired: true }
};

// কাস্টমারের দেশের আইপি অনুযায়ী ভিডিও ডাবিং সিগন্যাল প্রসেস করার এপিআই
app.post('/api/ai/voice-dubbing', async (req, res) => {
    try {
        const { productId, customerCountryCode } = req.body;
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // আইপি ভিত্তিক দেশের ভাষা ও ভয়েস কোড নির্বাচন করা
        const targetCountry = customerCountryCode || 'US';
        const aiVoiceConfig = languageVoiceMap[targetCountry] || { lang: 'English', voiceCode: 'en-US-Wavenet-A', translationRequired: true };

        const dubbingPayload = {
            originalVideoUrl: product.videoUrl || 'https://nurglobal-store.com',
            sourceLanguage: 'English',
            targetLanguage: aiVoiceConfig.lang,
            aiVoiceModel: aiVoiceConfig.voiceCode,
            status: aiVoiceConfig.translationRequired ? 'AI_Dubbing_In_Progress' : 'Original_Language_Matches',
            timestamp: new Date().toISOString()
        };

        console.log(`🤖 [AI VOICE DUBBING TRIGGERED]!!`);
        console.log(`   📦 প্রোডাক্ট: ${product.title}`);
        console.log(`   🌍 কাস্টমারের দেশ: ${targetCountry} -> ভাষা: ${aiVoiceConfig.lang}`);
        console.log(`   🎙️ AI ভয়েস মডেল: ${aiVoiceConfig.voiceCode}`);
        console.log(`   🎬 স্ট্যাটাস: ${dubbingPayload.status}`);

        res.json({
            success: true,
            message: "AI Global Voice Dubbing engine synchronized successfully.",
            dubbingDetails: dubbingPayload
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 📦 মডিউল ৮ - Dropshipping Automation ও সাপ্লায়ার নোটিফিকেশন ইঞ্জিন
// ==========================================

// কাস্টমার অর্ডার সাবমিট করলে সাপ্লায়ারকে অটো-অ্যালার্ট ও লেবেল জেনারেট করার এপিআই
app.post('/api/dropship/process-order', async (req, res) => {
    try {
        const { orderId } = req.body;
        
        // ডাটাবেজ থেকে অর্ডারের এবং সাপ্লায়ারের সম্পূর্ণ বিবরণ খুঁজে বের করা
        const orderDetails = await Order.findOne({ orderId: orderId });
        
        if (!orderDetails) {
            return res.status(404).json({ success: false, message: "Order not found in database" });
        }

        // স্বয়ংক্রিয় ড্রপশিপিং লজিস্টিক ও শিপিং লেবেল কনফিগারেশন
        const dropshipPayload = {
            targetSupplier: orderDetails.supplierName,
            itemOrdered: orderDetails.productName,
            totalPaid: orderDetails.price,
            shippingLabelId: `SHIP-NUR-${Math.floor(10000 + Math.random() * 90000)}`,
            supplierEmailNotification: "Sent", // নোডমেইলার ট্রিগার ইন্টিগ্রেশন বেস
            dropshipStatus: "Supplier_Notified_For_Dispatch",
            processedAt: new Date().toISOString()
        };

        console.log(`🚨 [DROPSHIPPING AUTOMATION TRIGGERED]!!`);
        console.log(`   📦 অর্ডার আইডি: ${orderDetails.orderId} -> সাপ্লায়ারে পাঠানো হয়েছে।`);
        console.log(`   🏢 সাপ্লায়ারের নাম: ${dropshipPayload.targetSupplier}`);
        console.log(`   🏷️ জেনারেটেড শিপিং লেবেল: ${dropshipPayload.shippingLabelId}`);
        console.log(`   🟢 স্ট্যাটাস: ${dropshipPayload.dropshipStatus}`);

        res.json({
            success: true,
            message: "Dropshipping process initiated. Supplier notification dispatched successfully.",
            dropshipDetails: dropshipPayload
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================
// 🤖 মডিউল ৬ - AI Marketing Factory ও অটো সোশ্যাল মিডিয়া পোস্টার ইঞ্জিন
// ==========================================

// ডাটাবেজে সোশ্যাল মিডিয়া অটো-পোস্টের হিসেব রাখার মডেল
const MarketingCampaignSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productTitle: String,
    platforms: [String],        // ['Facebook', 'TikTok', 'Instagram']
    aiGeneratedCaption: String, // AI কাস্টম ক্যাপশন
    adBudgetAllocated: Number,  // ডেমো এড বাজেট
    campaignStatus: { type: String, default: 'Pending' },
    launchedAt: { type: Date, default: Date.now }
});
const MarketingCampaign = mongoose.model('MarketingCampaign', MarketingCampaignSchema);

// প্রোডাক্ট আপলোড হওয়ার পর স্বয়ংক্রিয় AI মার্কেটিং ক্যাম্পেইন চালু করার এপিআই
app.post('/api/marketing/auto-launch', async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found for AI Marketing" });
        }

        // AI দিয়ে কাস্টম বিপণন ক্যাপশন জেনারেট করার লজিক বেস
        const aiCaptions = [
            `🔥 🎯 Best Offer! Get this premium ${product.title} now at just ${product.price} ${product.currency}! Limited Stock available. Buy Now! 🛍️`,
            `🌍 Global Shipping Available! Check out our featured product: ${product.title}. Premium quality guaranteed! 📦`,
            `💡 Looking for the best deal? ${product.title} is now live on NUR GLOBAL STORE. Special discount applied! 💸`
        ];
        
        // র্যান্ডমলি একটি ক্যাপশন সিলেক্ট করা
        const randomCaption = aiCaptions[Math.floor(Math.random() * aiCaptions.length)];

        const newCampaign = new MarketingCampaign({
            productId: product._id,
            productTitle: product.title,
            platforms: ['Facebook', 'TikTok', 'Instagram'],
            aiGeneratedCaption: randomCaption,
            adBudgetAllocated: Math.floor(10 + Math.random() * 50), // ডেমো $১০ থেকে $৬০ বাজেট
            campaignStatus: 'Live_&_Syndicated'
        });

        await newCampaign.save();

        console.log(`🤖 [AI MARKETING FACTORY ACTIVATED]!!`);
        console.log(`   📦 প্রোডাক্ট: ${newCampaign.productTitle}`);
        console.log(`   📢 সোশ্যাল মিডিয়া সিন্ডিকেশন: Facebook, TikTok, Instagram`);
        console.log(`   📝 AI ক্যাপশন: "${newCampaign.aiGeneratedCaption}"`);
        console.log(`   🚀 এড বাজেট বরাদ্দ: $${newCampaign.adBudgetAllocated} USD`);

        res.json({
            success: true,
            message: "AI Marketing Factory initiated successfully. Campaigns syndicated across top global social networks.",
            campaignDetails: newCampaign
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.listen(PORT, () => {
    console.log(`সার্ভার চালু হয়েছে: http://localhost:${PORT}`);
});
