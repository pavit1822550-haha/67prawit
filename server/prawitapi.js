import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './config/firebase.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const port = 2001;

app.use(cors());
app.use(bodyParser.json());


const myshops = [
  {
    shopid: 100,
    shopname: "adidas",
    shoptype: "fashion",
    shoploc: { lat: 100, lon:150},
    shopstatus: true
  },
  {
    shopid: 200,
    shopname: "nike",
    shoptype: "shoes",
    shoploc: { lat: 102,lon:155},
    shopstatus: false
  },
  {
    shopid: 300,
    shopname: "puma",
    shoptype: "fashion",
    shoploc: { lat: 130,lon:250},
    shopstatus: true
  }
];




app.get('/', (req, res) => { res.send("web programmingin2/2569"); });

app.get('/shops', (req,res) => {
    // const shopitems = myshop.map(
    // shop =>{
    // <b>shop id:</b> ${shop.shopid}</br>
    // <b>shop location(lat,lon)</b>
    // ${shop.shoploc.lat},${shp[.shoploc.lon]}</br>
    // });
    res.set('Content-type','application/json');
        res.send(myshops);
//    let mytext ='';
//     mytext += `<b>shop id:</b> ${myshop.shopid}<br>`; 
//     mytext += `<b>shop name:</b> ${myshop.shopname}<br>`;
//     mytext += `<b>shop type:</b> ${myshop.shoptype}<br>`;
//     mytext += `<b>shop loc:</b> Lat ${myshop.shoploc.lat}, Lon ${myshop.shoploc.lon}<br>`;
//     mytext += `<b>shop status:</b> ${myshop.shopstatus}<br>`;
//     res.set('content-type','text/html');
//     res.send(mytext);
});

app.get('/shops/:shopid', (req,res) => {
    // const shopitems = myshop.map(
    // shop =>{
    // <b>shop id:</b> ${shop.shopid}</br>
    // <b>shop location(lat,lon)</b>
    // ${shop.shoploc.lat},${shp[.shoploc.lon]}</br>
    // });
    const {shopid}=req.params;
    res.set('Content-type','application/json');
        const shopitem = myshops.filter(
          shop=>{return shop.shopid===Number(shopid)}
        )
        res.send(shopitem[0])
   
//    let mytext ='';
//     mytext += `<b>shop id:</b> ${myshop.shopid}<br>`; 
//     mytext += `<b>shop name:</b> ${myshop.shopname}<br>`;
//     mytext += `<b>shop type:</b> ${myshop.shoptype}<br>`;
//     mytext += `<b>shop loc:</b> Lat ${myshop.shoploc.lat}, Lon ${myshop.shoploc.lon}<br>`;
//     mytext += `<b>shop status:</b> ${myshop.shopstatus}<br>`;
//     res.set('content-type','text/html');
//     res.send(mytext);
});

// Route สำหรับการ Read ข้อมูลจากฐานข้อมูลด้วย id
// GET : http://localhost:2001/api/shops/1
app.get('/api/shops/:id', async (req, res) => { 
  try {
    const doc = await db
      .collection("shop-026830491008-9")
      .doc(req.params.id)
      .get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.json({
      ...doc.data(),
      id: doc.id,
    });
  } catch(error) {
    res.status(500).json({
      message: "รหัสมีปํยหา",
      error: error.message
    });
  }
});

// GET : http://localhost:2001/api/shops/
app.get('/api/shops', async(req, res) => { 
  try {
    const snapshot = await db
    .collection("shop-026830491008-9")
    .orderBy("shopname", "desc")
    .get();

    const shops = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
 
    res.json(shops);
  } catch(error){
    res.status(500).json(
      {
        message:"การอ่านข้อมูลมีปัญหา",
        error:error.message
      }
    )
  }
});
// การลบข้อมูลร้านค้าจากไฟร์เบสด้วย id (Method: DELETE)
const deleteShop = async (req, res) => {
    const ShopRef = db
      .collection("shop-026830491008-9")
      .doc(req.params.id);
 
    await ShopRef.delete();
 
    res.status(200).json({
      message: "Shop deleted successfully",
      id: req.params.id,
    });
}
 
// App route: /api/shops/:id (Method: DELETE)
// Endpoint: http://localhost:xxxx/api/shops/100
app.delete('/api/shops/:id', async (req, res) => {
  try {
    await deleteShop(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Failed to deleting shop.",
      error: error.message,
    });
  }
});

// การสร้างข้อมูลร้านค้าในไฟร์เบส (Method: POST)
const createShop = async (req, res) => {
    const shopname = String(req.body.shopname ?? req.body.shopName ?? "").trim();
    const shoptype = String(req.body.shoptype ?? "").trim();
    const rawStatus = req.body.shopstatus ?? req.body.shopstats;

    if (!shopname || !shoptype || ![true, false, "true", "false"].includes(rawStatus)) {
      return res.status(400).json({
          message: "Shop name, shop type and shop status are required",
      });
    }

    const newShop = {
      shopname,
      shoptype,
      shopstats: rawStatus === true || rawStatus === "true",
    };
    const docRef = await db.collection("shop-026830491008-9").add(newShop);

    res.status(201).json({
      id: docRef.id,
      ...newShop,
    });
}
 
// App route: /api/shops (Method: POST)
// Endpoint: http://localhost:xxxx/api/shops
app.post('/api/shops', async (req, res) => {
  try {
    await createShop(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Failed to adding shop.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// การแก้ไขข้อมูลร้านค้าในไฟร์เบส (Method: PUT)
const updateShop = async (req, res) => {
  const shopRef = db
    .collection("shop-026830491008-9")
    .doc(req.params.id);
  const doc = await shopRef.get();

  if (!doc.exists) {
    return res.status(404).json({ message: "Shop not found" });
  }

  const shopname = String(req.body.shopname ?? req.body.shopName ?? "").trim();
  const shoptype = String(req.body.shoptype ?? "").trim();
  const rawStatus = req.body.shopstatus ?? req.body.shopstats;

  if (!shopname || !shoptype || ![true, false, "true", "false"].includes(rawStatus)) {
    return res.status(400).json({
      message: "Shop name, shop type and shop status are required",
    });
  }

  const updateData = {
    shopname,
    shoptype,
    shopstats: rawStatus === true || rawStatus === "true",
  };

  await shopRef.update(updateData);

  return res.status(200).json({
    id: req.params.id,
    ...updateData,
  });
};

// App route: /api/shops/:id (Method: PUT)
app.put('/api/shops/:id', async (req, res) => {
  try {
    await updateShop(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update Shop",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

 //Login Route: http://localhost:2001/api/login
app.post('/api/login', async (req, res) => {
  const JWT_SECRET = "react-prawit";

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const snapshot = await db
      .collection("user")
      .where("email", "==", email.trim())
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const userDoc = snapshot.docs[0];
    const user = { id: userDoc.id, ...userDoc.data() };
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => { console.log(`app listening on port ${port}`); });
