require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const countryToCurrency = require('country-to-currency');
const geoip = require('geoip-lite-country-only');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🛡️ MongoDB Atlas ক্লাউড ডাটাবেজ কানেকশন
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('🟢 [DATABASE STATUS] MongoDB Atlas ক্লাউড ডাটাবেজ সফলভাবে কানেক্ট হয়েছে!'))
.catch(err => console.error('🔴 [DATABASE ERROR] ডাটাবেজ কানেকশন ব্যর্থ হয়েছে:', err));

// 📦 ডাটাবেজ মডেল (Database Schemas)
const SupplierSchema = new mongoose.Schema({
    name: String,
    company: String,
    email: { type: String, unique: true },
    country: String,
    createdAt: { type: Date, default: Date.now }
});
const Supplier = mongoose.model('Supplier', SupplierSchema);

const ProductSchema = new mongoose.Schema({
    title: String,
    price: String,
    currency: String,
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    videoUrl: String,
    likes: { type: Number, default: 0 },
    comments: [String],
    createdAt: { type: Date, default: Date.now }
});
const Product = mongoose.model('Product', ProductSchema);

const OrderSchema = new mongoose.Schema({
    orderId: String,
    customerName: String,
    customerCountry: String,
    productName: String,
    price: String,
    supplierName: String,
    timestamp: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', OrderSchema);

// 🖥️ কাস্টমার এবং সাপ্লায়ারদের মূল লাইভ পেজ
app.get('/', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const geo = geoip.lookup(ip);
    const countryCode = geo ? geo.country : 'US';
    const currency = countryToCurrency[countryCode] || 'USD';

    // ডাটাবেজ থেকে লাইভ প্রোডাক্ট লিস্ট আনা
    const products = await Product.find().populate('supplierId');
    let productHTML = '';
    
    if(products.length === 0) {
        productHTML = `<p style="color: #94a3b8;">দোকানে কোনো পণ্য নেই। সাপ্লায়ার ড্যাশবোর্ড থেকে পণ্য আপলোড করুন।</p>`;
    } else {
        products.forEach(p => {
            productHTML += `
            <div style="background: #334155; padding: 15px; margin: 10px 0; border-radius: 5px; text-align: left;">
                <h3>📦 ${p.title}</h3>
                <p>💰 দাম: <b>${p.price} ${p.currency}</b></p>
                <p>🏢 সাপ্লায়ার: <b>${p.supplierId ? p.supplierId.company : 'Global Supplier'}</b></p>
                <button onclick="sendAction('/api/like', {productId: '${p._id}'})">👍 Like (${p.likes})</button>
                <button onclick="sendAction('/api/order', {productId: '${p._id}', customerName: 'Live Buyer', customerCountry: '${countryCode}'})">🛍️ Buy Now</button>
            </div>`;
        });
    }

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NUR GLOBAL STORE - Live Core System</title>
        <style>
            body { font-family: Arial, sans-serif; background: #0f172a; color: white; padding: 20px; text-align: center; }
            .container { max-width: 800px; margin: auto; background: #1e293b; padding: 20px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
            h1 { color: #38bdf8; }
            .section-box { background: #1e293b; padding: 20px; border-radius: 10px; margin-top: 20px; border: 1px solid #475569; }
            input, button { padding: 10px; font-size: 16px; margin: 5px; border-radius: 5px; border: none; }
            input { background: #334155; color: white; width: 80%; max-width: 300px; }
            button { background: #38bdf8; color: #0f172a; font-weight: bold; cursor: pointer; }
            button:hover { background: #0ea5e9; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🌍 NUR GLOBAL STORE (LIVE) 🌍</h1>
            <p>Your Country: <b>${countryCode}</b> | Local Currency: <b>${currency}</b></p>
            
            <!-- সাপ্লায়ার সেকশন -->
            <div class="section-box" style="border-left: 5px solid #a855f7;">
                <h3 style="color: #a855f7;">🏢 ১. সাপ্লায়ার রেজিস্ট্রেশন (Supplier Join)</h3>
                <input type="text" id="sName" placeholder="সাপ্লায়ারের নাম"><br>
                <input type="text" id="sCompany" placeholder="কোম্পানির নাম"><br>
                <input type="email" id="sEmail" placeholder="ইমেইল ঠিকানা"><br>
                <button onclick="registerSupplier()">📝 অ্যাকাউন্ট তৈরি করুন</button>
            </div>

            <!-- প্রোডাক্ট আপলোড সেকশন -->
            <div class="section-box" style="border-left: 5px solid #22c55e;">
                <h3 style="color: #22c55e;">📤 ২. প্রোডাক্ট ও AI ভিডিও আপলোড প্যানেল</h3>
                <input type="text" id="pTitle" placeholder="পণ্যের নাম"><br>
                <input type="text" id="pPrice" placeholder="পণ্যের দাম (পাইকারি)"><br>
                <input type="text" id="pVideo" placeholder="AI ভিডিও লিংক (MP4)"><br>
                <input type="text" id="pSupId" placeholder="সাপ্লায়ার আইডি (রেজিস্ট্রেশনের পর পাবেন)"><br>
                <button onclick="uploadProduct('${currency}')">🚀 প্রোডাক্ট লাইভ করুন</button>
            </div>

            <!-- লাইভ মার্কেটপ্লেস -->
            <div class="section-box" style="border-left: 5px solid #38bdf8;">
                <h3 style="color: #38bdf8;">🛒 ৩. লাইভ কাস্টমার স্টোরফ্রন্ট (২৫০ দেশ)</h3>
                ${productHTML}
            </div>
        </div>

        <script>
            function registerSupplier() {
                const data = { name: document.getElementById('sName').value, company: document.getElementById('sCompany').value, email: document.getElementById('sEmail').value, country: '${countryCode}' };
                fetch('/api/supplier/register', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) })
                .then(res => res.json()).then(d => { alert('সাপ্লায়ার অ্যাকাউন্ট তৈরি সফল! আইডি: ' + d.supplier._id); console.log(d); });
            }

            function uploadProduct(curr) {
                const data = { title: document.getElementById('pTitle').value, price: document.getElementById('pPrice').value, currency: curr, videoUrl: document.getElementById('pVideo').value, supplierId: document.getElementById('pSupId').value };
                fetch('/api/product/upload', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) })
                .then(res => res.json()).then(d => { alert('প্রোডাক্ট এবং AI ভিডিও লাইভ হয়েছে!'); location.reload(); });
            }

            function sendAction(url, data) {
                fetch(url, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) })
                .then(res => res.json()).then(d => { alert('CAPTURED! ডেটা ক্লাউড ডাটাবেজে সেভ হয়েছে।'); location.reload(); });
            }
        </script>
    </body>
    </html>
    `);
});

// ⚡ সাপ্লায়ার রেজিস্ট্রেশন এপিআই (API Route)
app.post('/api/supplier/register', async (req, res) => {
    try {
        const supplier = new Supplier(req.body);
        await supplier.save();
        res.json({ success: true, supplier });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ⚡ প্রোডাক্ট ও ভিডিও আপলোড এপিআই
app.post('/api/product/upload', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json({ success: true, product });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ⚡ কাস্টমার অর্ডার ট্র্যাকিং এপিআই (অটো-স্প্লিট লজিক বেস)
app.post('/api/order', async (req, res) => {
    try {
        const { productId, customerName, customerCountry } = req.body;
        const product = await Product.findById(productId).populate('supplierId');
        
        const newOrder = new Order({
            orderId: `NUR-${Math.floor(1000 + Math.random() * 9000)}`,
            customerName,
            customerCountry,
            productName: product.title,
            price: product.price + " " + product.currency,
            supplierName: product.supplierId ? product.supplierId.company : 'Unknown'
        });
        await newOrder.save();
        
        console.log(`🚨 [LIVE ORDER SAVE]!! ${newOrder.orderId} ডাটাবেজে সেভ হয়েছে!`);
        res.json({ success: true, order: newOrder });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ⚡ সুপার অ্যাডমিন লাইভ কন্ট্রোল প্যানেল এপিআই
app.get('/api/admin/dashboard', async (req, res) => {
    const totalSuppliers = await Supplier.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const recentOrders = await Order.find().sort({timestamp: -1}).limit(5);

    res.json({
        status: "Online",
        database: "MongoDB Atlas Connected",
        stats: { suppliers: totalSuppliers, products: totalProducts, orders: totalOrders },
        recentOrders
    });
});

app.listen(PORT, () => {
    console.log(`🚀 সার্ভার ডাটাবেজ সহ সচল হয়েছে পোর্ট: ${PORT}`);
});
