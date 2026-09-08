const express = require('express');
const cors = require('cors');
const countryToCurrency = require('country-to-currency');
const geoip = require('geoip-lite-country-only');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// লাইভ স্ট্যাটাস মেমোরি (শুধুমাত্র একবার ডিক্লেয়ার করা হয়েছে)
let liveStats = { totalLikes: 0, totalComments: 0, totalOrders: 0, orderLogs: [] };

// ডেমো ইন্টারফেস এবং ১৯টি মডিউলের ভিউয়ার পেজ
app.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const geo = geoip.lookup(ip);
    const countryCode = geo ? geo.country : 'US';
    const currency = countryToCurrency[countryCode] || 'USD';

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NUR GLOBAL STORE - Dashboard Presentation</title>
        <style>
            body { font-family: Arial, sans-serif; background: #0f172a; color: white; padding: 20px; text-align: center; }
            .container { max-width: 800px; margin: auto; background: #1e293b; padding: 20px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
            h1 { color: #38bdf8; }
            .btn-group { margin: 20px 0; }
            button { background: #38bdf8; color: #0f172a; border: none; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px; cursor: pointer; margin: 5px; }
            button:hover { background: #0ea5e9; }
            .module-box { background: #334155; padding: 15px; margin: 10px 0; border-radius: 5px; text-align: left; border-left: 5px solid #38bdf8; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🌍 NUR GLOBAL STORE 🌍</h1>
            <p>Your Country: <b>${countryCode}</b> | Local Currency: <b>${currency}</b></p>
            
            <div class="btn-group">
                <button onclick="sendAction('/api/like')">👍 Give Live Like</button>
                <button onclick="sendAction('/api/comment', {comment: 'Excellent Platform!'})">💬 Test Live Comment</button>
                <button onclick="sendAction('/api/order', {customerName: 'Test Customer', customerCountry: '${countryCode}', productName: 'Premium AI Package', supplierName: 'Global Supplier', price: '99 ${currency}'})">📦 Test Live Order</button>
            </div>

            <hr style="border-color: #475569;">
            <h3>📋 19 Master Modules Status</h3>
            <div class="module-box"><b>১. গ্লোবাল সিস্টেম:</b> ২৫০টি দেশ সাপোর্ট এবং আইপি ভিত্তিক দেশ ও ভাষা নির্বাচন স্বয়ংক্রিয়ভাবে সচল।</div>
            <div class="module-box"><b>৯. পেমেন্ট গেটওয়ে:</b> লোকাল ও ইন্টারন্যাশনাল মাল্টি-কারেন্সি স্প্লিট পেমেন্ট ট্র্যাকিং।</div>
            <div class="module-box"><b>১৪. অ্যানালিটিক্স এবং ইনকাম ট্র্যাকার:</b> রিয়েল-টাইম কাস্টমার লাইক, কমেন্ট ও অর্ডার মনিটরিং।</div>
            <div class="module-box"><b>১৫. অ্যাডমিন ড্যাশবোর্ড:</b> সুপার অ্যাডমিন কন্ট্রোল প্যানেল লাইভ ট্র্যাকিং এপিআই ডেটা ভিউ।</div>
            <p style="color: #94a3b8; font-size: 12px;">Deep Machine Learning Behavior Synchronized Control Platform</p>
        </div>

        <script>
            function sendAction(url, data = {}) {
                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(d => {
                    alert('Success! Event Captured on Server. Live Status Updated.');
                    console.log(d);
                })
                .catch(err => alert('Error sending data to live tracking server'));
            }
        </script>
    </body>
    </html>
    `);
});

// লাইভ কাস্টমার ট্র্যাকিং এপিআই রুটসমূহ
app.post('/api/like', (req, res) => {
    liveStats.totalLikes += 1;
    console.log(`🟢 [LIVE EVENT] একজন কাস্টমার লাইক দিয়েছেন! মোট লাইক: \${liveStats.totalLikes}`);
    res.json({ success: true, totalLikes: liveStats.totalLikes });
});

app.post('/api/comment', (req, res) => {
    const commentText = req.body.comment || "No comment text";
    liveStats.totalComments += 1;
    console.log(`💬 [LIVE EVENT] নতুন কমেন্ট এসেছে: "\${commentText}" | মোট কমেন্ট: \${liveStats.totalComments}`);
    res.json({ success: true, totalComments: liveStats.totalComments });
});

app.post('/api/order', (req, res) => {
    const { customerName, customerCountry, productName, supplierName, price } = req.body;
    const newOrder = {
        orderId: `NUR-\${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: customerName || "Unknown Customer",
        customerCountry: customerCountry || "Unknown Country",
        productName: productName || "Unknown Product",
        supplierName: supplierName || "Unknown Supplier",
        price: price || "0",
        timestamp: new Date().toISOString()
    };
    liveStats.totalOrders += 1;
    liveStats.orderLogs.push(newOrder);
    
    console.log(`🚨 [LIVE ORDER DETECTED]!!`);
    console.log(`   📦 অর্ডার আইডি: \${newOrder.orderId}`);
    console.log(`   👤 কাস্টমার: \${newOrder.customerName} (\${newOrder.customerCountry})`);
    console.log(`   🛒 প্রোডাক্ট: \${newOrder.productName} -> সাপ্লায়ার: \${newOrder.supplierName}`);
    console.log(`   💰 পেমেন্ট: \${newOrder.price}`);
    res.json({ success: true, message: "Order Tracked Successfully", orderDetails: newOrder });
});

app.get('/api/admin/dashboard', (req, res) => {
    res.json({
        status: "Running",
        message: "NUR GLOBAL STORE - Live Control Panel Data",
        stats: { likes: liveStats.totalLikes, comments: liveStats.totalComments, orders: liveStats.totalOrders },
        recentOrders: liveStats.orderLogs
    });
});

app.listen(PORT, () => {
    console.log(`সার্ভার সফলভাবে সচল হয়েছে পোর্ট: \${PORT}`);
});
