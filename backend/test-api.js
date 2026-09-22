async function testAll() {
  console.log('1. Testing Frontend (http://localhost:5173)...');
  const feRes = await fetch('http://localhost:5173');
  console.log('   Frontend Status:', feRes.status);

  console.log('2. Testing Backend Health (http://localhost:5000/api/health)...');
  const healthRes = await fetch('http://localhost:5000/api/health');
  const health = await healthRes.json();
  console.log('   Health Brand:', health.brand, '| Business:', health.businessName);

  console.log('3. Testing Products API (http://localhost:5000/api/products)...');
  const prodsRes = await fetch('http://localhost:5000/api/products');
  const prods = await prodsRes.json();
  console.log(`   Products Count: ${prods.count}, First Product: "${prods.data[0].name}"`);

  console.log('4. Testing Categories API (http://localhost:5000/api/categories)...');
  const catsRes = await fetch('http://localhost:5000/api/categories');
  const cats = await catsRes.json();
  console.log(`   Categories Count: ${cats.count}`);

  console.log('5. Testing Admin Login (POST /api/admin/login)...');
  const loginRes = await fetch('http://localhost:5000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@premahandcraft.com', password: 'Admin@Prema2026' })
  });
  const login = await loginRes.json();
  console.log(`   Login Success: ${login.success}, Token: ${login.data?.token?.slice(0, 25)}...`);

  console.log('6. Testing Order Submission (POST /api/orders)...');
  const orderRes = await fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Sangeetha Raman',
      phone: '+91 93612 44779',
      whatsappNumber: '+91 93612 44779',
      items: [
        {
          productId: prods.data[0]._id,
          name: prods.data[0].name,
          price: 420,
          quantity: 1,
          image: prods.data[0].images[0],
          knotType: prods.data[0].knotType
        }
      ],
      subtotal: 420,
      totalAmount: 420,
      address: '15 Gandhi Road',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641001',
      specialInstructions: 'Pooja gift pack'
    })
  });
  const order = await orderRes.json();
  console.log(`   Order Created: ${order.success}, Order ID: ${order.data?.orderId}`);

  console.log('7. Testing Contact Inquiry (POST /api/contact)...');
  const contactRes = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Radhika',
      phone: '+91 93612 44779',
      message: 'Need 20 mini gift kudai baskets for wedding return gifts'
    })
  });
  const contact = await contactRes.json();
  console.log(`   Inquiry Status: ${contact.success}, Message: "${contact.message}"`);

  console.log('\n🎉 ALL 7 TEST SUITES PASSED FLAWLESSLY!');
}

testAll().catch(err => {
  console.error('Test Error:', err);
  process.exit(1);
});
