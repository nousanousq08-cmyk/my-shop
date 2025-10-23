import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = 'https://apkogwpcpshvttuqcuxy.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwa29nd3BjcHNodnR0dXFjdXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5Nzk1MDUsImV4cCI6MjA3NjU1NTUwNX0.lzdSz7RHpkPDK5l-lWWpeC379oOFfjJDiAIHF-m8b8g'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// نظام الترجمة الكامل
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
        ccpConditions: "⚠️ Important: Upload a clear photo of your payment receipt. Edited or unclear photos will be rejected.",
        emptyCart: "Your cart is empty",
        orderPlaced: "Order placed successfully! We'll contact you soon.",
        selectWilaya: "Select Wilaya",
        paymentUploaded: "Payment proof uploaded successfully!",
        orderWarning: "⚠️ Your order will not be confirmed unless you fill in your full name and phone number correctly.",
        payOnDelivery: "Pay on Delivery",
        payWithCCP: "Pay via CCP"
    },
    ar: {
        storeName: "أفضل متجر",
        welcomeMessage: "مرحباً بكم في متجركم المفضل",
        heroSubtext: "اكتشفوا منتجات رائعة بأسعار مميزة",
        productsTitle: "منتجاتنا",
        cartText: "السلة",
        backText: "← العودة إلى المنتجات",
        descriptionTitle: "الوصف",
        colorsTitle: "الألوان المتاحة",
        sizesTitle: "المقاسات",
        quantityTitle: "الكمية",
        addToCartBtn: "أضف إلى السلة",
        orderNowBtn: "اطلب الآن",
        cartTitle: "سلة التسوق",
        totalText: "المجموع:",
        checkoutBtn: "إتمام الطلب",
        checkoutTitle: "إتمام الطلب",
        nameLabel: "الاسم الكامل *",
        lastNameLabel: "اللقب *",
        phoneLabel: "رقم الهاتف *",
        wilayaLabel: "الولاية *",
        communeLabel: "البلدية *",
        addressLabel: "عنوان التوصيل *",
        subtotalLabel: "المجموع الجزئي:",
        deliveryLabel: "رسوم التوصيل:",
        finalTotalLabel: "المجموع النهائي:",
        paymentTitle: "طرق الدفع",
        ccpTitle: "🏦 التحويل البريدي",
        ccpConditions: "⚠️ مهم: ارفع صورة واضحة لإيصال الدفع. الصور المعدلة أو غير الواضحة سيتم رفضها.",
        emptyCart: "سلة التسوق فارغة",
        orderPlaced: "تم تقديم الطلب بنجاح! سنتواصل معك قريباً.",
        selectWilaya: "اختر الولاية",
        paymentUploaded: "تم رفع إثبات الدفع بنجاح!",
        orderWarning: "⚠️ لن يتم تأكيد طلبك إلا إذا قمت بملء الاسم الكامل ورقم الهاتف بشكل صحيح.",
        payOnDelivery: "الدفع عند الاستلام",
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
        checkoutBtn: "Passer la Commande",
        checkoutTitle: "Finaliser la Commande",
        nameLabel: "Nom Complet *",
        lastNameLabel: "Nom de Famille *",
        phoneLabel: "Numéro de Téléphone *",
        wilayaLabel: "Wilaya *",
        communeLabel: "Commune *",
        addressLabel: "Adresse de Livraison *",
        subtotalLabel: "Sous-total:",
        deliveryLabel: "Frais de Livraison:",
        finalTotalLabel: "Total Final:",
        paymentTitle: "Méthodes de Paiement",
        ccpTitle: "🏦 Virement CCP",
        ccpConditions: "⚠️ Important: Téléchargez une photo claire de votre reçu de paiement. Les photos modifiées ou floues seront rejetées.",
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
let currentLanguage = localStorage.getItem('language') || 'en';
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
    updateStoreName();
});

async function loadData() {
    try {
        // Load products from API
        const productsResponse = await fetch('/api/products');
        if (!productsResponse.ok) throw new Error('Failed to load products');
        products = await productsResponse.json();
        
        // Load wilayas from API
        const wilayasResponse = await fetch('/api/wilayas');
        if (!wilayasResponse.ok) throw new Error('Failed to load wilayas');
        const wilayasData = await wilayasResponse.json();
        wilayas = wilayasData;
        
        // Load store settings
        const settingsResponse = await fetch('/api/settings');
        if (!settingsResponse.ok) throw new Error('Failed to load settings');
        storeSettings = await settingsResponse.json();
        
        loadProducts();
        loadWilayas();
        updateStoreName();
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
            title: "Classic T-Shirt",
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
            description: "Comfortable cotton t-shirt perfect for everyday wear",
            colors: "Blue,Red,Black,White",
            sizes: "S,M,L,XL"
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
        store_name: "Best Shop",
        ccp_number: "0012345678",
        ccp_key: "90",
        rip: "0012345678901234567890"
    };
    
    loadProducts();
    loadWilayas();
    updateStoreName();
}

function updateStoreName() {
    const storeNameElement = document.getElementById('storeName');
    if (storeNameElement && storeSettings.store_name) {
        storeNameElement.textContent = storeSettings.store_name;
    }
    
    // Update account holder name in payment section
    const accountHolderElement = document.getElementById('accountHolderName');
    if (accountHolderElement && storeSettings.store_name) {
        accountHolderElement.textContent = storeSettings.store_name;
    }
    
    // Update CCP account number
    const ccpAccountElement = document.getElementById('ccpAccountNumber');
    if (ccpAccountElement && storeSettings.ccp_number && storeSettings.ccp_key) {
        ccpAccountElement.textContent = `${storeSettings.ccp_number}${storeSettings.ccp_key}`;
    }
}

function setupEventListeners() {
    setupBackButtons();
    
    // Language selector
    document.getElementById('languageSelector').addEventListener('change', function(e) {
        currentLanguage = e.target.value;
        localStorage.setItem('language', currentLanguage);
        updateLanguage();
        loadProducts(); // Reload products with new language
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
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
                element.value = t[key];
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = t[key];
            } else {
                element.textContent = t[key];
            }
        }
    });

    // Update RTL
    if (currentLanguage === 'ar') {
        document.body.classList.add('rtl');
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.classList.remove('rtl');
        document.body.setAttribute('dir', 'ltr');
    }

    // Update language selector
    const langSelector = document.getElementById('languageSelector');
    if (langSelector) {
        langSelector.value = currentLanguage;
    }
}

function loadProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    products.forEach(product => {
        const discountedPrice = product.discount > 0 ? 
            Math.round(product.price * (1 - product.discount / 100)) : product.price;
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer relative';
        productCard.innerHTML = `
            ${product.discount > 0 ? `<div class="discount-badge absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">-${product.discount}%</div>` : ''}
            <img src="${product.media && product.media.length > 0 ? product.media[0].url : product.image}" 
                 alt="${product.title}" 
                 class="w-full h-48 object-cover">
            <div class="p-4">
                <h4 class="font-semibold text-lg mb-2">${product.title}</h4>
                <div class="flex items-center space-x-2">
                    <p class="text-indigo-600 font-bold text-xl">${discountedPrice} DA</p>
                    ${product.discount > 0 ? `<p class="text-gray-500 line-through text-sm">${product.price} DA</p>` : ''}
                </div>
                <p class="text-sm text-gray-500 mt-1">${product.stock} in stock</p>
                ${product.colors ? `<p class="text-sm text-gray-600 mt-1">Colors: ${product.colors}</p>` : ''}
                ${product.sizes ? `<p class="text-sm text-gray-600">Sizes: ${product.sizes}</p>` : ''}
            </div>
        `;
        productCard.addEventListener('click', () => showProductDetails(product));
        grid.appendChild(productCard);
    });
}

function loadWilayas() {
    const select = document.getElementById('wilayaSelect');
    if (!select) return;
    
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
    
    document.getElementById('productDetailName').textContent = product.title;
    document.getElementById('productDetailPrice').textContent = `${discountedPrice} DA`;
    document.getElementById('productDetailDescription').textContent = product.description;
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
    if (product.colors) {
        const colorsArray = product.colors.split(',').map(c => c.trim());
        colorsArray.forEach(color => {
            const colorBtn = document.createElement('button');
            colorBtn.type = 'button';
            colorBtn.className = 'color-bubble w-8 h-8 rounded-full border-2 border-gray-300 hover:border-indigo-500 transition-colors';
            colorBtn.style.backgroundColor = getColorCode(color);
            colorBtn.setAttribute('data-color', color);
            colorBtn.addEventListener('click', () => selectColor(color, colorBtn));
            colorOptions.appendChild(colorBtn);
        });
    }
    
    // Load sizes
    const sizeOptions = document.getElementById('sizeOptions');
    sizeOptions.innerHTML = '';
    if (product.sizes) {
        const sizesArray = product.sizes.split(',').map(s => s.trim());
        sizesArray.forEach(size => {
            const sizeBtn = document.createElement('button');
            sizeBtn.type = 'button';
            sizeBtn.className = 'px-3 py-1 border border-gray-300 rounded hover:border-indigo-500 hover:bg-indigo-50 transition-colors';
            sizeBtn.textContent = size;
            sizeBtn.addEventListener('click', () => selectSize(size, sizeBtn));
            sizeOptions.appendChild(sizeBtn);
        });
    }
    
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
            thumbnail.className = 'media-thumbnail flex-shrink-0 w-16 h-16 cursor-pointer border-2 border-transparent hover:border-indigo-500 rounded transition-colors';
            
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
        gallery.innerHTML = `<img src="${product.image}" alt="${product.title}" class="w-full h-96 object-cover rounded-lg">`;
    }
}

function getColorCode(color) {
    const colors = {
        'blue': '#3b82f6',
        'red': '#ef4444',
        'black': '#000000',
        'white': '#ffffff',
        'green': '#10b981',
        'yellow': '#eab308',
        'purple': '#8b5cf6',
        'pink': '#ec4899',
        'gray': '#6b7280',
        'orange': '#f97316',
        'أزرق': '#3b82f6',
        'أحمر': '#ef4444',
        'أسود': '#000000',
        'أبيض': '#ffffff',
        'أخضر': '#10b981',
        'أصفر': '#eab308',
        'بنفسجي': '#8b5cf6',
        'وردي': '#ec4899',
        'رمادي': '#6b7280',
        'برتقالي': '#f97316'
    };
    return colors[color.toLowerCase()] || '#6b7280';
}

function selectColor(color, btn) {
    selectedColor = color;
    document.querySelectorAll('#colorOptions button').forEach(b => {
        b.classList.remove('ring-2', 'ring-indigo-500');
    });
    btn.classList.add('ring-2', 'ring-indigo-500');
}

function selectSize(size, btn) {
    selectedSize = size;
    document.querySelectorAll('#sizeOptions button').forEach(b => {
        b.classList.remove('bg-indigo-500', 'text-white');
    });
    btn.classList.add('bg-indigo-500', 'text-white');
}

function changeQuantity(delta) {
    const qtyElement = document.getElementById('quantity');
    let qty = parseInt(qtyElement.textContent) + delta;
    if (qty < 1) qty = 1;
    if (currentProduct && qty > currentProduct.stock) qty = currentProduct.stock;
    qtyElement.textContent = qty;
}

function validateProductSelection() {
    if (!selectedColor && currentProduct.colors) {
        alert('Please select color');
        return false;
    }
    
    if (!selectedSize && currentProduct.sizes) {
        alert('Please select size');
        return false;
    }
    
    const quantity = parseInt(document.getElementById('quantity').textContent);
    if (quantity < 1) {
        alert('Please select a valid quantity');
        return false;
    }
    
    if (currentProduct && quantity > currentProduct.stock) {
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
    alert('Product added to cart!');
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
                    <img src="${item.product.media && item.product.media.length > 0 ? item.product.media[0].url : item.product.image}" 
                         alt="${item.product.title}" 
                         class="w-16 h-16 object-cover rounded">
                    <div>
                        <h4 class="font-semibold">${item.product.title}</h4>
                        <p class="text-sm text-gray-600">${item.color || 'No color'} - ${item.size || 'No size'}</p>
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
        alert(translations[currentLanguage].emptyCart);
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
    const deliveryFee = wilaya ? (wilayas[wilaya] || 0) : 0;
    const total = subtotal + deliveryFee;
    
    document.getElementById('deliveryFee').textContent = `${deliveryFee} DA`;
    document.getElementById('finalTotal').textContent = `${total} DA`;
}

function validateCheckoutForm() {
    const name = document.getElementById('customerName').value.trim();
    const lastName = document.getElementById('customerLastName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const wilaya = document.getElementById('wilayaSelect').value;
    const commune = document.getElementById('customerCommune').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    
    if (!name || !lastName || !phone || !wilaya || !commune || !address) {
        alert('Please fill all required fields');
        return false;
    }
    
    // Simple phone validation for Algeria
    const phoneRegex = /^(\+213|0)(5|6|7)[0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid Algerian phone number (e.g., 0551234567 or +213551234567)');
        return false;
    }
    
    return true;
}

async function payOnDelivery() {
    if (!validateCheckoutForm()) return;
    
    const subtotal = cart.reduce((sum, item) => {
        const discountedPrice = item.product.discount > 0 ? 
            Math.round(item.product.price * (1 - item.product.discount / 100)) : item.product.price;
        return sum + (discountedPrice * item.quantity);
    }, 0);
    
    const wilaya = document.getElementById('wilayaSelect').value;
    const deliveryFee = wilaya ? (wilayas[wilaya] || 0) : 0;
    const total = subtotal + deliveryFee;
    
    const orderData = {
        items: cart.map(item => ({
            product_id: item.product.id,
            name: item.product.title,
            price: item.product.price,
            discount: item.product.discount,
            qty: item.quantity,
            color: item.color,
            size: item.size
        })),
        customer_name: document.getElementById('customerName').value.trim() + ' ' + document.getElementById('customerLastName').value.trim(),
        customer_email: '',
        customer_phone: document.getElementById('customerPhone').value.trim(),
        customer_address: document.getElementById('customerAddress').value.trim(),
        wilaya: wilaya,
        commune: document.getElementById('customerCommune').value.trim(),
        payment_method: 'Cash on Delivery',
        total: total,
        status: 'pending'
    };
    
    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
            const newOrder = await response.json();
            alert(translations[currentLanguage].orderPlaced);
            
            // Clear cart and redirect to homepage
            cart = [];
            updateCartCount();
            showHomepage();
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Failed to place order');
        }
    } catch (error) {
        console.error('Error placing order:', error);
        alert('Error placing order: ' + error.message);
    }
}

function payWithCCP() {
    if (!validateCheckoutForm()) return;
    
    // Show CCP payment page
    document.getElementById('ccpAccountNumber').textContent = storeSettings.ccp_number + storeSettings.ccp_key;
    showPage('paymentPage');
    
    // Store order data temporarily for after payment
    const subtotal = cart.reduce((sum, item) => {
        const discountedPrice = item.product.discount > 0 ? 
            Math.round(item.product.price * (1 - item.product.discount / 100)) : item.product.price;
        return sum + (discountedPrice * item.quantity);
    }, 0);
    
    const wilaya = document.getElementById('wilayaSelect').value;
    const deliveryFee = wilaya ? (wilayas[wilaya] || 0) : 0;
    const total = subtotal + deliveryFee;
    
    window.pendingOrder = {
        items: cart.map(item => ({
            product_id: item.product.id,
            name: item.product.title,
            price: item.product.price,
            discount: item.product.discount,
            qty: item.quantity,
            color: item.color,
            size: item.size
        })),
        customer_name: document.getElementById('customerName').value.trim() + ' ' + document.getElementById('customerLastName').value.trim(),
        customer_email: '',
        customer_phone: document.getElementById('customerPhone').value.trim(),
        customer_address: document.getElementById('customerAddress').value.trim(),
        wilaya: wilaya,
        commune: document.getElementById('customerCommune').value.trim(),
        payment_method: 'CCP',
        total: total,
        status: 'pending_payment'
    };
}

async function uploadPaymentProof(method) {
    const fileInput = document.getElementById('ccpProof');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file first');
        return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }
    
    // For CCP payment, complete the order
    if (method === 'ccp' && window.pendingOrder) {
        try {
            // Convert file to base64 for upload
            const reader = new FileReader();
            reader.onload = async function(e) {
                try {
                    // Create FormData for file upload
                    const formData = new FormData();
                    formData.append('paymentProof', file);
                    formData.append('orderData', JSON.stringify({
                        ...window.pendingOrder,
                        id: Date.now().toString(),
                        status: 'pending_confirmation'
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
                        const error = await response.json();
                        throw new Error(error.message || 'Failed to upload payment proof');
                    }
                } catch (error) {
                    console.error('Error uploading payment proof:', error);
                    alert('Error uploading payment proof: ' + error.message);
                }
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Error processing payment. Please try again.');
        }
    }
}

function showHomepage() {
    showPage('homepage');
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        targetPage.classList.add('fade-in');
    }
}

// تحسين التنقل - إضافة زر Back في كل الصفحات
function setupBackButtons() {
    // زر Back في صفحة المنتج
    document.getElementById('backToProducts').addEventListener('click', showHomepage);
    
    // زر Back في صفحة السلة
    const backFromCart = document.createElement('button');
    backFromCart.innerHTML = '← <span data-i18n="backText">Back to Products</span>';
    backFromCart.className = 'mb-6 text-indigo-600 hover:text-indigo-800 flex items-center';
    backFromCart.addEventListener('click', showHomepage);
    const cartPage = document.getElementById('cartPage');
    if (cartPage) {
        cartPage.insertBefore(backFromCart, cartPage.firstChild);
    }
    
    // زر Back في صفحة الدفع
    const backFromCheckout = document.createElement('button');
    backFromCheckout.innerHTML = '← <span data-i18n="backText">Back to Cart</span>';
    backFromCheckout.className = 'mb-6 text-indigo-600 hover:text-indigo-800 flex items-center';
    backFromCheckout.addEventListener('click', showCart);
    const checkoutPage = document.getElementById('checkoutPage');
    if (checkoutPage) {
        checkoutPage.insertBefore(backFromCheckout, checkoutPage.firstChild);
    }
    
    // زر Back في صفحة الدفع
    const backFromPayment = document.createElement('button');
    backFromPayment.innerHTML = '← <span data-i18n="backText">Back to Checkout</span>';
    backFromPayment.className = 'mb-6 text-indigo-600 hover:text-indigo-800 flex items-center';
    backFromPayment.addEventListener('click', showCheckout);
    const paymentPage = document.getElementById('paymentPage');
    if (paymentPage) {
        paymentPage.insertBefore(backFromPayment, paymentPage.firstChild);
    }
}

// Export functions for HTML
window.showHomepage = showHomepage;
window.showCart = showCart;
window.showCheckout = showCheckout;
window.addToCart = addToCart;
window.orderNow = orderNow;
window.removeFromCart = removeFromCart;
window.payOnDelivery = payOnDelivery;
window.payWithCCP = payWithCCP;
window.uploadPaymentProof = uploadPaymentProof;
window.changeQuantity = changeQuantity;
window.selectColor = selectColor;
window.selectSize = selectSize;
