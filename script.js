// Translations
const translations = {
    en: {
        storeName: "Best Shop",
        welcomeMessage: "Welcome to your favorite store",
        heroSubtext: "Discover amazing products at great prices",
        productsTitle: "Our Products",
        cartText: "Cart",
        backText: "← Back to Products",
        descriptionTitle: "Description",
        colorsTitle: "Available Colors",
        sizesTitle: "Sizes",
        quantityTitle: "Quantity",
        addToCartBtn: "Add to Cart",
        orderNowBtn: "Order Now",
        cartTitle: "Shopping Cart",
        totalText: "Total:",
        checkoutBtn: "Checkout",
        checkoutTitle: "Checkout",
        nameLabel: "Full Name *",
        lastNameLabel: "Last Name *",
        phoneLabel: "Phone Number *",
        wilayaLabel: "Wilaya *",
        communeLabel: "Commune *",
        addressLabel: "Delivery Address *",
        subtotalLabel: "Subtotal:",
        deliveryLabel: "Delivery Fee:",
        finalTotalLabel: "Total:",
        paymentTitle: "Payment Methods",
        ccpTitle: "🏦 CCP Transfer",
        ccpConditions: "⚠️ Important: Upload a clear photo (not scanned or edited) of your payment receipt. Edited or unclear photos will be rejected.",
        emptyCart: "Your cart is empty",
        orderPlaced: "Order placed successfully! We'll contact you soon.",
        selectWilaya: "Select Wilaya",
        paymentUploaded: "Payment proof uploaded successfully!",
        orderWarning: "⚠️ Your order will not be confirmed unless you fill in your full name and phone number correctly.",
        payOnDelivery: "Pay on Delivery",
        payWithCCP: "Pay via CCP"
    },
    ar: {
        storeName: "أفضل محل",
        welcomeMessage: "مرحبًا بمحلكم المفضل",
        heroSubtext: "اكتشف منتجات رائعة بأسعار مميزة",
        productsTitle: "منتجاتنا",
        cartText: "السلة",
        backText: "← العودة للمنتجات",
        descriptionTitle: "الوصف",
        colorsTitle: "الألوان المتاحة",
        sizesTitle: "المقاسات",
        quantityTitle: "الكمية",
        addToCartBtn: "أضف للسلة",
        orderNowBtn: "اطلب الآن",
        cartTitle: "سلة التسوق",
        totalText: "المجموع:",
        checkoutBtn: "الدفع",
        checkoutTitle: "إتمام الطلب",
        nameLabel: "الاسم الكامل *",
        lastNameLabel: "اللقب *",
        phoneLabel: "رقم الهاتف *",
        wilayaLabel: "الولاية *",
        communeLabel: "البلدية *",
        addressLabel: "عنوان التسليم *",
        subtotalLabel: "المجموع الفرعي:",
        deliveryLabel: "رسوم التوصيل:",
        finalTotalLabel: "المجموع:",
        paymentTitle: "طرق الدفع",
        ccpTitle: "🏦 تحويل بريدي",
        ccpConditions: "⚠️ مهم: ارفع صورة واضحة (غير ممسوحة أو معدلة) لإيصال الدفع. الصور المعدلة أو غير الواضحة سيتم رفضها.",
        emptyCart: "سلتك فارغة",
        orderPlaced: "تم تأكيد الطلب بنجاح! سنتواصل معك قريباً.",
        selectWilaya: "اختر الولاية",
        paymentUploaded: "تم رفع إثبات الدفع بنجاح!",
        orderWarning: "⚠️ لن يتم تأكيد طلبك إلا إذا قمت بملء اسمك الكامل ورقم هاتفك بشكل صحيح.",
        payOnDelivery: "الدفع عند التسليم",
        payWithCCP: "الدفع عبر التحويل البريدي"
    },
    fr: {
        storeName: "Meilleur Magasin",
        welcomeMessage: "Bienvenue dans votre magasin préféré",
        heroSubtext: "Découvrez des produits incroyables à des prix avantageux",
        productsTitle: "Nos Produits",
        cartText: "Panier",
        backText: "← Retour aux Produits",
        descriptionTitle: "Description",
        colorsTitle: "Couleurs Disponibles",
        sizesTitle: "Tailles",
        quantityTitle: "Quantité",
        addToCartBtn: "Ajouter au Panier",
        orderNowBtn: "Commander Maintenant",
        cartTitle: "Panier d'Achat",
        totalText: "Total:",
        checkoutBtn: "Commander",
        checkoutTitle: "Finaliser la Commande",
        nameLabel: "Nom Complet *",
        lastNameLabel: "Nom de Famille *",
        phoneLabel: "Numéro de Téléphone *",
        wilayaLabel: "Wilaya *",
        communeLabel: "Commune *",
        addressLabel: "Adresse de Livraison *",
        subtotalLabel: "Sous-total:",
        deliveryLabel: "Frais de Livraison:",
        finalTotalLabel: "Total:",
        paymentTitle: "Méthodes de Paiement",
        ccpTitle: "🏦 Virement CCP",
        ccpConditions: "⚠️ Important: Téléchargez une photo claire (non scannée ou éditée) de votre reçu de paiement. Les photos éditées ou floues seront rejetées.",
        emptyCart: "Votre panier est vide",
        orderPlaced: "Commande passée avec succès! Nous vous contacterons bientôt.",
        selectWilaya: "Sélectionner Wilaya",
        paymentUploaded: "Preuve de paiement téléchargée avec succès!",
        orderWarning: "⚠️ Votre commande ne sera pas confirmée à moins que vous ne remplissiez votre nom complet et votre numéro de téléphone correctement.",
        payOnDelivery: "Payer à la Livraison",
        payWithCCP: "Payer par CCP"
    }
};

// Global state
let currentLanguage = 'en';
let cart = [];
let currentProduct = null;
let selectedColor = '';
let selectedSize = '';
let products = [];
let wilayas = {};
let storeSettings = {};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupEventListeners();
    updateLanguage();
});

async function loadData() {
    try {
        // Load products from API
        const productsResponse = await fetch('/api/products');
        products = await productsResponse.json();
        
        // Load wilayas from API
        const wilayasResponse = await fetch('/api/wilayas');
        wilayas = await wilayasResponse.json();
        
        // Load store settings
        const settingsResponse = await fetch('/api/settings');
        storeSettings = await settingsResponse.json();
        
        loadProducts();
        loadWilayas();
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to default data
        loadDefaultData();
    }
}

function loadDefaultData() {
    // Default products data
    products = [
        {
            id: 1,
            name: { en: "Classic T-Shirt", ar: "تيشيرت كلاسيكي", fr: "T-Shirt Classique" },
            price: 2500,
            discount: 20,
            stock: 50,
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f3f4f6'/%3E%3Cpath d='M75 100h150v150H75z' fill='%236366f1'/%3E%3Cpath d='M100 80h100v40H100z' fill='%234f46e5'/%3E%3C/svg%3E",
            media: [
                {
                    id: 1,
                    type: "image",
                    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f3f4f6'/%3E%3Cpath d='M75 100h150v150H75z' fill='%236366f1'/%3E%3Cpath d='M100 80h100v40H100z' fill='%234f46e5'/%3E%3C/svg%3E",
                    description: "Blue T-Shirt front view"
                }
            ],
            description: { en: "Comfortable cotton t-shirt perfect for everyday wear", ar: "تيشيرت قطني مريح مثالي للارتداء اليومي", fr: "T-shirt en coton confortable parfait pour un usage quotidien" },
            colors: ["Blue", "Red", "Black", "White"],
            sizes: ["S", "M", "L", "XL"]
        }
    ];
    
    // Default wilayas data
    wilayas = {
        "Algiers": 400,
        "Oran": 500,
        "Constantine": 600
    };
    
    // Default store settings
    storeSettings = {
        ccpAccount: "0012345678901234567890",
        storeName: "Best Shop"
    };
    
    loadProducts();
    loadWilayas();
}

function setupEventListeners() {
    setupBackButtons();
    // Language selector
    document.getElementById('languageSelector').addEventListener('change', function(e) {
        currentLanguage = e.target.value;
        updateLanguage();
        if (currentLanguage === 'ar') {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }
    });

    // Navigation
    document.getElementById('cartBtn').addEventListener('click', showCart);
    document.getElementById('backToProducts').addEventListener('click', showHomepage);

    // Product details
    document.getElementById('decreaseQty').addEventListener('click', () => changeQuantity(-1));
    document.getElementById('increaseQty').addEventListener('click', () => changeQuantity(1));
    document.getElementById('addToCartBtn').addEventListener('click', addToCart);
    document.getElementById('orderNowBtn').addEventListener('click', orderNow);

    // Checkout
    document.getElementById('checkoutBtn').addEventListener('click', showCheckout);
    document.getElementById('wilayaSelect').addEventListener('change', updateDeliveryFee);
    document.getElementById('payOnDeliveryBtn').addEventListener('click', payOnDelivery);
    document.getElementById('payWithCCPBtn').addEventListener('click', payWithCCP);
}

function updateLanguage() {
    const t = translations[currentLanguage];
    
    // Update all translatable elements
    Object.keys(t).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = t[key];
            } else {
                element.innerHTML = t[key];
            }
        }
    });

    // Update products and wilaya options
    loadProducts();
    loadWilayas();
}

function loadProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    products.forEach(product => {
        const discountedPrice = product.discount > 0 ? 
            Math.round(product.price * (1 - product.discount / 100)) : product.price;
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer relative';
        productCard.innerHTML = `
            ${product.discount > 0 ? `<div class="discount-badge absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">-${product.discount}%</div>` : ''}
            <img src="${product.image}" alt="${product.name[currentLanguage]}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h4 class="font-semibold text-lg mb-2">${product.name[currentLanguage]}</h4>
                <div class="flex items-center space-x-2">
                    <p class="text-indigo-600 font-bold text-xl">${discountedPrice} DA</p>
                    ${product.discount > 0 ? `<p class="text-gray-500 line-through text-sm">${product.price} DA</p>` : ''}
                </div>
                <p class="text-sm text-gray-500 mt-1">${product.stock} in stock</p>
            </div>
        `;
        productCard.addEventListener('click', () => showProductDetails(product));
        grid.appendChild(productCard);
    });
}

function loadWilayas() {
    const select = document.getElementById('wilayaSelect');
    const currentValue = select.value;
    select.innerHTML = `<option value="">${translations[currentLanguage].selectWilaya}</option>`;
    
    Object.keys(wilayas).forEach(wilaya => {
        const option = document.createElement('option');
        option.value = wilaya;
        option.textContent = wilaya;
        select.appendChild(option);
    });
    
    if (currentValue) select.value = currentValue;
}

function showProductDetails(product) {
    currentProduct = product;
    selectedColor = '';
    selectedSize = '';
    
    const discountedPrice = product.discount > 0 ? 
        Math.round(product.price * (1 - product.discount / 100)) : product.price;
    
    // Load product media
    loadProductMedia(product);
    
    document.getElementById('productDetailName').textContent = product.name[currentLanguage];
    document.getElementById('productDetailPrice').textContent = `${discountedPrice} DA`;
    document.getElementById('productDetailDescription').textContent = product.description[currentLanguage];
    document.getElementById('stockInfo').textContent = `${product.stock} available in stock`;
    
    // Show/hide discount elements
    const discountBadge = document.getElementById('productDiscount');
    const originalPrice = document.getElementById('productOriginalPrice');
    
    if (product.discount > 0) {
        discountBadge.textContent = `-${product.discount}%`;
        discountBadge.classList.remove('hidden');
        originalPrice.textContent = `${product.price} DA`;
        originalPrice.classList.remove('hidden');
    } else {
        discountBadge.classList.add('hidden');
        originalPrice.classList.add('hidden');
    }
    
    // Load colors
    const colorOptions = document.getElementById('colorOptions');
    colorOptions.innerHTML = '';
    product.colors.forEach(color => {
        const colorBtn = document.createElement('button');
        colorBtn.className = 'color-bubble w-8 h-8 rounded-full border-2 border-gray-300 hover:border-indigo-500';
        colorBtn.style.backgroundColor = getColorCode(color);
        colorBtn.setAttribute('data-color', color);
        colorBtn.addEventListener('click', () => selectColor(color, colorBtn));
        colorOptions.appendChild(colorBtn);
    });
    
    // Load sizes
    const sizeOptions = document.getElementById('sizeOptions');
    sizeOptions.innerHTML = '';
    product.sizes.forEach(size => {
        const sizeBtn = document.createElement('button');
        sizeBtn.className = 'px-3 py-1 border border-gray-300 rounded hover:border-indigo-500 hover:bg-indigo-50';
        sizeBtn.textContent = size;
        sizeBtn.addEventListener('click', () => selectSize(size, sizeBtn));
        sizeOptions.appendChild(sizeBtn);
    });
    
    document.getElementById('quantity').textContent = '1';
    showPage('productDetails');
}

function loadProductMedia(product) {
    const gallery = document.getElementById('productMediaGallery');
    const thumbnails = document.getElementById('productThumbnails');
    
    gallery.innerHTML = '';
    thumbnails.innerHTML = '';
    
    if (product.media && product.media.length > 0) {
        // Set main media
        const mainMedia = product.media[0];
        if (mainMedia.type === 'image') {
            gallery.innerHTML = `<img src="${mainMedia.url}" alt="${mainMedia.description}" class="w-full h-96 object-cover rounded-lg">`;
        } else {
            gallery.innerHTML = `<video src="${mainMedia.url}" controls class="w-full h-96 object-cover rounded-lg"></video>`;
        }
        
        // Create thumbnails
        product.media.forEach((media, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'media-thumbnail flex-shrink-0 w-16 h-16 cursor-pointer border-2 border-transparent hover:border-indigo-500 rounded';
            
            if (media.type === 'image') {
                thumbnail.innerHTML = `<img src="${media.url}" alt="${media.description}" class="w-full h-full object-cover rounded">`;
            } else {
                thumbnail.innerHTML = `<div class="w-full h-full bg-gray-200 flex items-center justify-center rounded"><span class="text-gray-600">▶</span></div>`;
            }
            
            thumbnail.addEventListener('click', () => {
                // Update main media
                if (media.type === 'image') {
                    gallery.innerHTML = `<img src="${media.url}" alt="${media.description}" class="w-full h-96 object-cover rounded-lg">`;
                } else {
                    gallery.innerHTML = `<video src="${media.url}" controls class="w-full h-96 object-cover rounded-lg"></video>`;
                }
                
                // Update active thumbnail
                document.querySelectorAll('.media-thumbnail').forEach(thumb => {
                    thumb.classList.remove('border-indigo-500');
                });
                thumbnail.classList.add('border-indigo-500');
            });
            
            if (index === 0) {
                thumbnail.classList.add('border-indigo-500');
            }
            
            thumbnails.appendChild(thumbnail);
        });
    } else {
        // Default image if no media
        gallery.innerHTML = `<img src="${product.image}" alt="${product.name[currentLanguage]}" class="w-full h-96 object-cover rounded-lg">`;
    }
}

function getColorCode(color) {
    const colors = {
        'Blue': '#3b82f6',
        'Red': '#ef4444',
        'Black': '#000000',
        'White': '#ffffff',
        'Dark Blue': '#1e40af',
        'Light Blue': '#60a5fa',
        'Pink': '#ec4899',
        'Yellow': '#eab308',
        'Green': '#10b981',
        'Gray': '#6b7280',
        'Navy': '#1e3a8a'
    };
    return colors[color] || '#6b7280';
}

function selectColor(color, btn) {
    selectedColor = color;
    document.querySelectorAll('#colorOptions button').forEach(b => b.classList.remove('ring-2', 'ring-indigo-500'));
    btn.classList.add('ring-2', 'ring-indigo-500');
}

function selectSize(size, btn) {
    selectedSize = size;
    document.querySelectorAll('#sizeOptions button').forEach(b => b.classList.remove('bg-indigo-500', 'text-white'));
    btn.classList.add('bg-indigo-500', 'text-white');
}

function changeQuantity(delta) {
    const qtyElement = document.getElementById('quantity');
    let qty = parseInt(qtyElement.textContent) + delta;
    if (qty < 1) qty = 1;
    if (qty > currentProduct.stock) qty = currentProduct.stock;
    qtyElement.textContent = qty;
}

function validateProductSelection() {
    if (!selectedColor || !selectedSize) {
        alert('Please select color and size');
        return false;
    }
    
    const quantity = parseInt(document.getElementById('quantity').textContent);
    if (quantity < 1) {
        alert('Please select a valid quantity');
        return false;
    }
    
    if (quantity > currentProduct.stock) {
        alert(`Only ${currentProduct.stock} items available in stock`);
        return false;
    }
    
    return true;
}

function addToCart() {
    if (!validateProductSelection()) return;
    
    const quantity = parseInt(document.getElementById('quantity').textContent);
    const cartItem = {
        id: Date.now(),
        product: currentProduct,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity
    };
    
    cart.push(cartItem);
    updateCartCount();
    showHomepage();
}

function orderNow() {
    if (!validateProductSelection()) return;
    
    const quantity = parseInt(document.getElementById('quantity').textContent);
    const orderItem = {
        id: Date.now(),
        product: currentProduct,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity
    };
    
    // Add to cart and proceed to checkout
    cart = [orderItem];
    updateCartCount();
    showCheckout();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cartCount');
    if (count > 0) {
        countElement.textContent = count;
        countElement.classList.remove('hidden');
    } else {
        countElement.classList.add('hidden');
    }
}

function showCart() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="text-center text-gray-500 py-8">${translations[currentLanguage].emptyCart}</p>`;
        document.getElementById('cartTotal').textContent = '0 DA';
    } else {
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            const discountedPrice = item.product.discount > 0 ? 
                Math.round(item.product.price * (1 - item.product.discount / 100)) : item.product.price;
            const itemTotal = discountedPrice * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'flex items-center justify-between border-b pb-4 mb-4';
            cartItem.innerHTML = `
                <div class="flex items-center space-x-4">
                    <img src="${item.product.image}" alt="${item.product.name[currentLanguage]}" class="w-16 h-16 object-cover rounded">
                    <div>
                        <h4 class="font-semibold">${item.product.name[currentLanguage]}</h4>
                        <p class="text-sm text-gray-600">${item.color} - ${item.size}</p>
                        <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
                        ${item.product.discount > 0 ? `<span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">-${item.product.discount}%</span>` : ''}
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-semibold">${itemTotal} DA</p>
                    <button onclick="removeFromCart(${index})" class="text-red-500 text-sm hover:text-red-700">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        document.getElementById('cartTotal').textContent = `${total} DA`;
    }
    
    showPage('cartPage');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    showCart();
}

function showCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => {
        const discountedPrice = item.product.discount > 0 ? 
            Math.round(item.product.price * (1 - item.product.discount / 100)) : item.product.price;
        return sum + (discountedPrice * item.quantity);
    }, 0);
    
    document.getElementById('subtotalAmount').textContent = `${subtotal} DA`;
    document.getElementById('deliveryFee').textContent = '0 DA';
    document.getElementById('finalTotal').textContent = `${subtotal} DA`;
    
    showPage('checkoutPage');
}

function updateDeliveryFee() {
    const wilaya = document.getElementById('wilayaSelect').value;
    const subtotal = cart.reduce((sum, item) => {
        const discountedPrice = item.product.discount > 0 ? 
            Math.round(item.product.price * (1 - item.product.discount / 100)) : item.product.price;
        return sum + (discountedPrice * item.quantity);
    }, 0);
    const deliveryFee = wilaya ? wilayas[wilaya] : 0;
    const total = subtotal + deliveryFee;
    
    document.getElementById('deliveryFee').textContent = `${deliveryFee} DA`;
    document.getElementById('finalTotal').textContent = `${total} DA`;
}

function validateCheckoutForm() {
    const name = document.getElementById('customerName').value;
    const lastName = document.getElementById('customerLastName').value;
    const phone = document.getElementById('customerPhone').value;
    const wilaya = document.getElementById('wilayaSelect').value;
    const commune = document.getElementById('customerCommune').value;
    const address = document.getElementById('customerAddress').value;
    
    if (!name || !lastName || !phone || !wilaya || !commune || !address) {
        alert('Please fill all required fields');
        return false;
    }
    
    // Simple phone validation
    const phoneRegex = /^(\+213|0)(5|6|7)[0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid Algerian phone number');
        return false;
    }
    
    return true;
}

async function payOnDelivery() {
    if (!validateCheckoutForm()) return;
    
    const orderData = {
        id: Date.now(),
        customer: {
            name: document.getElementById('customerName').value,
            lastName: document.getElementById('customerLastName').value,
            phone: document.getElementById('customerPhone').value,
            wilaya: document.getElementById('wilayaSelect').value,
            commune: document.getElementById('customerCommune').value,
            address: document.getElementById('customerAddress').value
        },
        items: [...cart],
        total: document.getElementById('finalTotal').textContent,
        paymentMethod: 'Cash on Delivery',
        date: new Date().toLocaleDateString(),
        status: 'Pending'
    };
    
    try {
        // Send order to API
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
            alert(translations[currentLanguage].orderPlaced);
            
            // Clear cart and redirect to homepage
            cart = [];
            updateCartCount();
            showHomepage();
        } else {
            throw new Error('Failed to place order');
        }
    } catch (error) {
        console.error('Error placing order:', error);
        alert('Error placing order. Please try again.');
    }
}

function payWithCCP() {
    if (!validateCheckoutForm()) return;
    
    // Show CCP payment page
    document.getElementById('ccpAccountNumber').textContent = storeSettings.ccpAccount;
    showPage('paymentPage');
    
    // Store order data temporarily for after payment
    window.pendingOrder = {
        customer: {
            name: document.getElementById('customerName').value,
            lastName: document.getElementById('customerLastName').value,
            phone: document.getElementById('customerPhone').value,
            wilaya: document.getElementById('wilayaSelect').value,
            commune: document.getElementById('customerCommune').value,
            address: document.getElementById('customerAddress').value
        },
        items: [...cart],
        total: document.getElementById('finalTotal').textContent,
        paymentMethod: 'CCP',
        date: new Date().toLocaleDateString(),
        status: 'Pending Payment'
    };
}

async function uploadPaymentProof(method) {
    const fileInput = document.getElementById('ccpProof');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file first');
        return;
    }
    
    // For CCP payment, complete the order
    if (method === 'ccp' && window.pendingOrder) {
        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('paymentProof', file);
            formData.append('orderData', JSON.stringify({
                ...window.pendingOrder,
                id: Date.now(),
                status: 'Pending Confirmation'
            }));
            
            // Send order with payment proof
            const response = await fetch('/api/orders', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                // Clear cart and pending order
                cart = [];
                updateCartCount();
                window.pendingOrder = null;
                
                alert(translations[currentLanguage].paymentUploaded);
                showHomepage();
            } else {
                throw new Error('Failed to upload payment proof');
            }
        } catch (error) {
            console.error('Error uploading payment proof:', error);
            alert('Error uploading payment proof. Please try again.');
        }
    }
}

function showHomepage() {
    showPage('homepage');
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
    document.getElementById(pageId).classList.add('fade-in');
}



// تحسين التنقل - إضافة زر Back في كل الصفحات
function setupBackButtons() {
    // زر Back في صفحة المنتج
    document.getElementById('backToProducts').addEventListener('click', showHomepage);
    
    // زر Back في صفحة السلة
    const backFromCart = document.createElement('button');
    backFromCart.innerHTML = '← <span id="backText">Back to Products</span>';
    backFromCart.className = 'mb-6 text-indigo-600 hover:text-indigo-800 flex items-center';
    backFromCart.addEventListener('click', showHomepage);
    document.getElementById('cartPage').insertBefore(backFromCart, document.getElementById('cartPage').firstChild);
    
    // زر Back في صفحة الدفع
    const backFromCheckout = document.createElement('button');
    backFromCheckout.innerHTML = '← <span id="backText">Back to Cart</span>';
    backFromCheckout.className = 'mb-6 text-indigo-600 hover:text-indigo-800 flex items-center';
    backFromCheckout.addEventListener('click', showCart);
    document.getElementById('checkoutPage').insertBefore(backFromCheckout, document.getElementById('checkoutPage').firstChild);
    
    // زر Back في صفحة الدفع
    const backFromPayment = document.createElement('button');
    backFromPayment.innerHTML = '← <span id="backText">Back to Checkout</span>';
    backFromPayment.className = 'mb-6 text-indigo-600 hover:text-indigo-800 flex items-center';
    backFromPayment.addEventListener('click', showCheckout);
    document.getElementById('paymentPage').insertBefore(backFromPayment, document.getElementById('paymentPage').firstChild);
}