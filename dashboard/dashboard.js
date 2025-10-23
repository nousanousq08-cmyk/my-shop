// Global state
let products = [];
let orders = [];
let wilayas = {};
let storeSettings = {};
let currentLanguage = localStorage.getItem('language') || 'en';

// Translations
const translations = {
    en: {
        storeName: "Best Shop",
        welcomeMessage: "Welcome to your favorite store",
        productsManagement: "Products Management",
        ordersManagement: "Orders Management",
        deliveryPayment: "Delivery & Payment",
        storeSettings: "Store Settings",
        addNewProduct: "Add New Product",
        productName: "Product Name",
        price: "Price (DA)",
        discount: "Discount %",
        stock: "Stock Quantity",
        colors: "Colors (comma separated)",
        sizes: "Sizes (comma separated)",
        description: "Description",
        addProduct: "Add Product",
        existingProducts: "Existing Products",
        edit: "Edit",
        delete: "Delete",
        customerOrders: "Customer Orders",
        orderId: "Order ID",
        customer: "Customer",
        phone: "Phone",
        wilaya: "Wilaya",
        payment: "Payment",
        status: "Status",
        actions: "Actions",
        view: "View",
        deliveryFees: "Delivery Fees Management",
        addNewWilaya: "Add New Wilaya",
        wilayaName: "Wilaya Name",
        deliveryFee: "Delivery Fee (DA)",
        addWilaya: "Add Wilaya",
        paymentSettings: "Payment Settings",
        ccpAccount: "CCP Account Number",
        update: "Update",
        contactEmail: "Contact Email",
        contactPhone: "Contact Phone",
        updateSettings: "Update Settings",
        logout: "Logout"
    },
    ar: {
        storeName: "أفضل متجر",
        productsManagement: "إدارة المنتجات",
        ordersManagement: "إدارة الطلبات",
        deliveryPayment: "التوصيل والدفع",
        storeSettings: "إعدادات المتجر",
        addNewProduct: "إضافة منتج جديد",
        productName: "اسم المنتج",
        price: "السعر (دج)",
        discount: "الخصم %",
        stock: "الكمية في المخزن",
        colors: "الألوان (مفصولة بفاصلة)",
        sizes: "المقاسات (مفصولة بفاصلة)",
        description: "الوصف",
        addProduct: "إضافة المنتج",
        existingProducts: "المنتجات الحالية",
        edit: "تعديل",
        delete: "حذف",
        customerOrders: "طلبات العملاء",
        orderId: "رقم الطلب",
        customer: "العميل",
        phone: "الهاتف",
        wilaya: "الولاية",
        payment: "طريقة الدفع",
        status: "الحالة",
        actions: "الإجراءات",
        view: "عرض",
        deliveryFees: "إدارة رسوم التوصيل",
        addNewWilaya: "إضافة ولاية جديدة",
        wilayaName: "اسم الولاية",
        deliveryFee: "رسوم التوصيل (دج)",
        addWilaya: "إضافة الولاية",
        paymentSettings: "إعدادات الدفع",
        ccpAccount: "رقم الحساب البريدي",
        update: "تحديث",
        contactEmail: "البريد الإلكتروني",
        contactPhone: "رقم الهاتف",
        updateSettings: "تحديث الإعدادات",
        logout: "تسجيل الخروج"
    },
    fr: {
        storeName: "Meilleur Magasin",
        productsManagement: "Gestion des Produits",
        ordersManagement: "Gestion des Commandes",
        deliveryPayment: "Livraison et Paiement",
        storeSettings: "Paramètres du Magasin",
        addNewProduct: "Ajouter un Nouveau Produit",
        productName: "Nom du Produit",
        price: "Prix (DA)",
        discount: "Remise %",
        stock: "Quantité en Stock",
        colors: "Couleurs (séparées par des virgules)",
        sizes: "Tailles (séparées par des virgules)",
        description: "Description",
        addProduct: "Ajouter le Produit",
        existingProducts: "Produits Existants",
        edit: "Modifier",
        delete: "Supprimer",
        customerOrders: "Commandes Clients",
        orderId: "ID Commande",
        customer: "Client",
        phone: "Téléphone",
        wilaya: "Wilaya",
        payment: "Paiement",
        status: "Statut",
        actions: "Actions",
        view: "Voir",
        deliveryFees: "Gestion des Frais de Livraison",
        addNewWilaya: "Ajouter une Nouvelle Wilaya",
        wilayaName: "Nom de la Wilaya",
        deliveryFee: "Frais de Livraison (DA)",
        addWilaya: "Ajouter la Wilaya",
        paymentSettings: "Paramètres de Paiement",
        ccpAccount: "Numéro de Compte CCP",
        update: "Mettre à jour",
        contactEmail: "Email de Contact",
        contactPhone: "Téléphone de Contact",
        updateSettings: "Mettre à jour les Paramètres",
        logout: "Déconnexion"
    }
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadDashboardData();
    setupEventListeners();
    updateLanguage();
});

function checkAuth() {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        window.location.href = 'auth.html';
        return;
    }
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
}

async function loadDashboardData() {
    try {
        const token = localStorage.getItem('adminToken');
        
        // Load all data in parallel
        const [productsRes, ordersRes, wilayasRes, settingsRes] = await Promise.all([
            fetch('/api/products', { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch('/api/orders', { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch('/api/wilayas', { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch('/api/settings', { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (!productsRes.ok) throw new Error('Failed to load products');
        if (!ordersRes.ok) throw new Error('Failed to load orders');
        if (!wilayasRes.ok) throw new Error('Failed to load wilayas');
        if (!settingsRes.ok) throw new Error('Failed to load settings');

        products = await productsRes.json();
        orders = await ordersRes.json();
        wilayas = await wilayasRes.json();
        storeSettings = await settingsRes.json();
        
        updateDashboard();
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        alert('Error loading data. Please check your connection.');
    }
}

function setupEventListeners() {
    // Add product form
    document.getElementById('addProductForm').addEventListener('submit', addProduct);
    
    // Language selector
    const langSelector = document.getElementById('languageSelector');
    if (langSelector) {
        langSelector.value = currentLanguage;
        langSelector.addEventListener('change', function(e) {
            currentLanguage = e.target.value;
            localStorage.setItem('language', currentLanguage);
            updateLanguage();
            updateDashboard();
        });
    }
}

function updateDashboard() {
    loadProductsList();
    loadOrdersTable();
    loadDeliveryFees();
    loadSettings();
}

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('text-purple-600', 'border-b-2', 'border-purple-600');
        tab.classList.add('text-gray-600');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.remove('hidden');
    
    // Add active class to clicked tab
    event.target.classList.add('text-purple-600', 'border-b-2', 'border-purple-600');
    event.target.classList.remove('text-gray-600');
}

async function addProduct(e) {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        discount: document.getElementById('productDiscount').value ? parseFloat(document.getElementById('productDiscount').value) : null,
        stock: parseInt(document.getElementById('productStock').value) || 0,
        colors: document.getElementById('productColors').value,
        sizes: document.getElementById('productSizes').value,
        description: document.getElementById('productDescription').value,
        media: []
    };
    
    // Validation
    if (!formData.title || !formData.price || formData.price < 0) {
        alert('Please enter valid product name and price');
        return;
    }

    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            const newProduct = await response.json();
            products.push(newProduct);
            loadProductsList();
            document.getElementById('addProductForm').reset();
            alert('Product added successfully!');
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Failed to add product');
        }
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Error adding product: ' + error.message);
    }
}

function loadProductsList() {
    const container = document.getElementById('productsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 py-8">No products found</p>';
        return;
    }
    
    products.forEach(product => {
        const discountedPrice = product.discount > 0 ? 
            Math.round(product.price * (1 - product.discount / 100)) : product.price;
        
        const productItem = document.createElement('div');
        productItem.className = 'flex items-center justify-between p-4 border rounded-lg bg-white';
        productItem.innerHTML = `
            <div class="flex items-center space-x-4">
                ${product.media && product.media.length > 0 ? 
                    `<img src="${product.media[0].url}" alt="${product.title}" class="w-16 h-16 object-cover rounded">` :
                    `<div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span class="text-gray-500">No image</span>
                    </div>`
                }
                <div>
                    <h4 class="font-semibold">${product.title}</h4>
                    <div class="flex items-center space-x-2">
                        <p class="text-indigo-600 font-bold">${discountedPrice} DA</p>
                        ${product.discount > 0 ? 
                            `<p class="text-gray-500 line-through text-sm">${product.price} DA</p>
                             <span class="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">-${product.discount}%</span>` : 
                            ''
                        }
                    </div>
                    <p class="text-sm text-gray-500">Stock: ${product.stock}</p>
                    ${product.colors ? `<p class="text-sm text-gray-600">Colors: ${product.colors}</p>` : ''}
                    ${product.sizes ? `<p class="text-sm text-gray-600">Sizes: ${product.sizes}</p>` : ''}
                </div>
            </div>
            <div class="flex space-x-2">
                <button onclick="editProduct('${product.id}')" class="text-blue-500 hover:text-blue-700 px-3 py-1 border border-blue-500 rounded">
                    ${translations[currentLanguage].edit}
                </button>
                <button onclick="deleteProduct('${product.id}')" class="text-red-500 hover:text-red-700 px-3 py-1 border border-red-500 rounded">
                    ${translations[currentLanguage].delete}
                </button>
            </div>
        `;
        container.appendChild(productItem);
    });
}

async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/products?id=${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            products = products.filter(p => p.id !== productId);
            loadProductsList();
            alert('Product deleted successfully!');
        } else {
            throw new Error('Failed to delete product');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
    }
}

function loadOrdersTable() {
    const container = document.getElementById('ordersTable');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (orders.length === 0) {
        container.innerHTML = '<tr><td colspan="7" class="py-4 text-center text-gray-500">No orders yet</td></tr>';
        return;
    }
    
    orders.forEach(order => {
        const orderRow = document.createElement('tr');
        orderRow.className = 'border-b hover:bg-gray-50';
        orderRow.innerHTML = `
            <td class="py-2 px-4">#${order.id.slice(-8)}</td>
            <td class="py-2 px-4">${order.customer_name}</td>
            <td class="py-2 px-4">${order.customer_phone}</td>
            <td class="py-2 px-4">${order.wilaya}</td>
            <td class="py-2 px-4">${order.payment_method}</td>
            <td class="py-2 px-4">
                <span class="px-2 py-1 text-xs rounded ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'shipped' ? 'bg-indigo-100 text-indigo-800' :
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                }">${order.status}</span>
            </td>
            <td class="py-2 px-4">
                <button onclick="viewOrderDetails('${order.id}')" class="text-blue-500 hover:text-blue-700 text-sm">
                    ${translations[currentLanguage].view}
                </button>
            </td>
        `;
        container.appendChild(orderRow);
    });
}

// باقي الدوال محدثة بنفس المنطق...

function logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('language');
    window.location.href = 'auth.html';
}

// Export for HTML
window.showTab = showTab;
window.logout = logout;
window.addWilaya = addWilaya;
window.updateWilayaFee = updateWilayaFee;
window.removeWilaya = removeWilaya;
window.updateCCPAccount = updateCCPAccount;
window.updateStoreSettings = updateStoreSettings;
window.viewOrderDetails = viewOrderDetails;
window.closeOrderDetails = closeOrderDetails;
window.updateOrderStatus = updateOrderStatus;