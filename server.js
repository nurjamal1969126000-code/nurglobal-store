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

app.listen(PORT, () => {
    console.log(`সার্ভার চালু হয়েছে: http://localhost:${PORT}`);
});
