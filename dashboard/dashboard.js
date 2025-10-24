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
        
        console.log('Loading dashboard data...');
        
        // Load all data in parallel
        const [productsRes, ordersRes, wilayasRes, settingsRes] = await Promise.all([
            fetch('/api/products', { 
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                } 
            }),
            fetch('/api/orders', { 
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                } 
            }),
            fetch('/api/wilayas', { 
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                } 
            }),
            fetch('/api/settings', { 
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                } 
            })
        ]);

        // Check if responses are OK
        if (!productsRes.ok) throw new Error(`Products API error: ${productsRes.status}`);
        if (!ordersRes.ok) throw new Error(`Orders API error: ${ordersRes.status}`);
        if (!wilayasRes.ok) throw new Error(`Wilayas API error: ${wilayasRes.status}`);
        if (!settingsRes.ok) throw new Error(`Settings API error: ${settingsRes.status}`);

        products = await productsRes.json();
        orders = await ordersRes.json();
        wilayas = await wilayasRes.json();
        storeSettings = await settingsRes.json();
        
        console.log('Data loaded successfully:', { 
            products: products.length, 
            orders: orders.length,
            wilayas: Object.keys(wilayas).length,
            settings: storeSettings 
        });
        
        updateDashboard();
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        alert('Error loading data: ' + error.message);
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
// دوال إدارة الوسائط
function loadMediaGallery() {
    const productSelect = document.getElementById('mediaProductSelect');
    const gallery = document.getElementById('mediaGallery');
    
    if (!productSelect || !gallery) return;
    
    // Update product select
    productSelect.innerHTML = '<option value="">Select a product</option>';
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.title;
        productSelect.appendChild(option);
    });
    
    // Load media gallery
    gallery.innerHTML = '';
    
    // Show all media from all products
    products.forEach(product => {
        if (product.media && product.media.length > 0) {
            product.media.forEach(media => {
                const mediaItem = document.createElement('div');
                mediaItem.className = 'media-item bg-gray-100 rounded-lg';
                
                if (media.type === 'image') {
                    mediaItem.innerHTML = `
                        <img src="${media.url}" alt="${media.description}" class="w-full h-32 object-cover">
                        <div class="media-actions">
                            <button onclick="deleteMedia('${product.id}', '${media.id}')" class="bg-red-500 text-white p-1 rounded text-xs">Delete</button>
                        </div>
                        <div class="p-2 text-xs text-gray-600">${product.title} - ${media.description || 'No description'}</div>
                    `;
                } else {
                    mediaItem.innerHTML = `
                        <video src="${media.url}" class="w-full h-32 object-cover" controls></video>
                        <div class="media-actions">
                            <button onclick="deleteMedia('${product.id}', '${media.id}')" class="bg-red-500 text-white p-1 rounded text-xs">Delete</button>
                        </div>
                        <div class="p-2 text-xs text-gray-600">${product.title} - ${media.description || 'No description'}</div>
                    `;
                }
                
                gallery.appendChild(mediaItem);
            });
        }
    });
    
    if (gallery.innerHTML === '') {
        gallery.innerHTML = '<p class="text-gray-500 text-center py-8">No media uploaded yet</p>';
    }
}

async function addMedia() {
    const productId = document.getElementById('mediaProductSelect').value;
    const mediaType = document.getElementById('mediaTypeSelect').value;
    const description = document.getElementById('mediaDescription').value;
    const fileInput = document.getElementById('mediaUpload');
    const file = fileInput.files[0];
    
    if (!productId) {
        alert('Please select a product');
        return;
    }
    
    if (!file) {
        alert('Please select a file to upload');
        return;
    }
    
    try {
        const token = localStorage.getItem('adminToken');
        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('type', mediaType);
        formData.append('description', description);
        formData.append('file', file);
        
        const response = await fetch(`/api/products/${productId}/media`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        
        if (response.ok) {
            const updatedProduct = await response.json();
            // Update the product in our local array
            const index = products.findIndex(p => p.id === productId);
            if (index !== -1) {
                products[index] = updatedProduct;
            }
            
            loadMediaGallery();
            
            // Reset form
            fileInput.value = '';
            document.getElementById('mediaDescription').value = '';
            
            alert('Media added successfully!');
        } else {
            throw new Error('Failed to add media');
        }
    } catch (error) {
        console.error('Error adding media:', error);
        alert('Error adding media. Please try again.');
    }
}

async function deleteMedia(productId, mediaId) {
    if (!confirm('Are you sure you want to delete this media?')) return;
    
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/products/${productId}/media/${mediaId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const product = products.find(p => p.id === productId);
            if (product && product.media) {
                product.media = product.media.filter(m => m.id !== mediaId);
            }
            loadMediaGallery();
            alert('Media deleted successfully!');
        } else {
            throw new Error('Failed to delete media');
        }
    } catch (error) {
        console.error('Error deleting media:', error);
        alert('Error deleting media. Please try again.');
    }
}

// أضف هذه الدوال للتصدير
window.addMedia = addMedia;
window.deleteMedia = deleteMedia; 

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


// دوال إدارة الولايات
async function addWilaya() {
    const newWilaya = document.getElementById('newWilaya').value;
    const newFee = parseInt(document.getElementById('newWilayaFee').value);
    
    if (!newWilaya || isNaN(newFee)) {
        alert('Please enter both wilaya name and fee');
        return;
    }
    
    if (wilayas[newWilaya]) {
        alert('This wilaya already exists');
        return;
    }
    
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch('/api/wilayas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ wilaya: newWilaya, fee: newFee })
        });
        
        if (response.ok) {
            wilayas[newWilaya] = newFee;
            loadDeliveryFees();
            
            // Reset form
            document.getElementById('newWilaya').value = '';
            document.getElementById('newWilayaFee').value = '';
            
            alert('Wilaya added successfully!');
        } else {
            throw new Error('Failed to add wilaya');
        }
    } catch (error) {
        console.error('Error adding wilaya:', error);
        alert('Error adding wilaya. Please try again.');
    }
}

async function updateWilayaFee(wilaya, newFee) {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch('/api/wilayas', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ wilaya, fee: parseInt(newFee) })
        });
        
        if (response.ok) {
            wilayas[wilaya] = parseInt(newFee);
            alert('Delivery fee updated successfully!');
        } else {
            throw new Error('Failed to update delivery fee');
        }
    } catch (error) {
        console.error('Error updating delivery fee:', error);
        alert('Error updating delivery fee. Please try again.');
    }
}

async function removeWilaya(wilaya) {
    if (!confirm(`Are you sure you want to remove ${wilaya}?`)) return;
    
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch('/api/wilayas', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ wilaya })
        });
        
        if (response.ok) {
            delete wilayas[wilaya];
            loadDeliveryFees();
            alert('Wilaya removed successfully!');
        } else {
            throw new Error('Failed to remove wilaya');
        }
    } catch (error) {
        console.error('Error removing wilaya:', error);
        alert('Error removing wilaya. Please try again.');
    }
}

// دالة تحميل رسوم التوصيل
function loadDeliveryFees() {
    const container = document.getElementById('deliveryFeesList');
    if (!container) return;
    
    container.innerHTML = '';
    
    Object.entries(wilayas).forEach(([wilaya, fee]) => {
        const deliveryItem = document.createElement('div');
        deliveryItem.className = 'flex justify-between items-center p-3 border rounded-lg bg-white';
        deliveryItem.innerHTML = `
            <span class="font-medium">${wilaya}</span>
            <div class="flex items-center space-x-2">
                <input type="number" value="${fee}" onchange="updateWilayaFee('${wilaya}', this.value)" 
                       class="w-24 border rounded px-2 py-1 text-sm">
                <button onclick="removeWilaya('${wilaya}')" class="text-red-500 hover:text-red-700 text-sm">
                    Remove
                </button>
            </div>
        `;
        container.appendChild(deliveryItem);
    });
}

// دوال الإعدادات
function loadSettings() {
    document.getElementById('storeNameInput').value = storeSettings.store_name || '';
    document.getElementById('storeEmailInput').value = storeSettings.email || '';
    document.getElementById('storePhoneInput').value = storeSettings.phone || '';
    document.getElementById('ccpAccountInput').value = storeSettings.ccp_number || '';
}

async function updateStoreSettings() {
    const settings = {
        store_name: document.getElementById('storeNameInput').value,
        email: document.getElementById('storeEmailInput').value,
        phone: document.getElementById('storePhoneInput').value
    };
    
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch('/api/settings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(settings)
        });
        
        if (response.ok) {
            Object.assign(storeSettings, settings);
            alert('Store settings updated successfully!');
        } else {
            throw new Error('Failed to update store settings');
        }
    } catch (error) {
        console.error('Error updating store settings:', error);
        alert('Error updating store settings. Please try again.');
    }
}

async function updateCCPAccount() {
    const newAccount = document.getElementById('ccpAccountInput').value;
    
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch('/api/settings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ ccp_number: newAccount })
        });
        
        if (response.ok) {
            storeSettings.ccp_number = newAccount;
            alert('CCP account updated successfully!');
        } else {
            throw new Error('Failed to update CCP account');
        }
    } catch (error) {
        console.error('Error updating CCP account:', error);
        alert('Error updating CCP account. Please try again.');
    }
}

// دوال إدارة الطلبات
function viewOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const modalContent = document.getElementById('orderDetailsContent');
    modalContent.innerHTML = `
        <div class="mb-4">
            <h4 class="font-semibold">Order #${order.id.slice(-8)}</h4>
            <p class="text-sm text-gray-600">Date: ${new Date(order.created_at).toLocaleDateString()}</p>
            <p class="text-sm text-gray-600">Status: ${order.status}</p>
        </div>
        
        <div class="mb-4">
            <h4 class="font-semibold">Customer Information</h4>
            <p class="text-sm">${order.customer_name}</p>
            <p class="text-sm">Phone: ${order.customer_phone}</p>
            <p class="text-sm">Address: ${order.customer_address}, ${order.commune}, ${order.wilaya}</p>
        </div>
        
        <div class="mb-4">
            <h4 class="font-semibold">Order Items</h4>
            <div class="space-y-2 mt-2">
                ${order.items.map(item => `
                    <div class="flex justify-between border-b pb-2">
                        <div>
                            <p class="font-medium">${item.name}</p>
                            <p class="text-sm text-gray-600">${item.color || ''} ${item.size || ''} - Qty: ${item.qty}</p>
                        </div>
                        <p class="font-medium">${item.discount > 0 ? 
                            Math.round(item.price * (1 - item.discount / 100)) * item.qty : 
                            item.price * item.qty} DA</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="mb-4">
            <h4 class="font-semibold">Payment Information</h4>
            <p class="text-sm">Method: ${order.payment_method}</p>
            <p class="text-sm font-bold">Total: ${order.total} DA</p>
        </div>
        
        ${order.payment_proof ? `
        <div class="mb-4">
            <h4 class="font-semibold">Payment Proof</h4>
            <img src="${order.payment_proof}" alt="Payment Proof" class="max-w-full h-auto border rounded max-h-48">
        </div>
        ` : ''}
        
        <div class="flex space-x-2 mt-4">
            <button onclick="updateOrderStatus('${order.id}', 'confirmed')" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Confirm Order
            </button>
            <button onclick="updateOrderStatus('${order.id}', 'shipped')" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Mark as Shipped
            </button>
            <button onclick="updateOrderStatus('${order.id}', 'cancelled')" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Cancel Order
            </button>
        </div>
    `;
    
    document.getElementById('orderDetailsModal').classList.remove('hidden');
}

function closeOrderDetails() {
    document.getElementById('orderDetailsModal').classList.add('hidden');
}

async function updateOrderStatus(orderId, status) {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/orders?id=${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });
        
        if (response.ok) {
            const order = orders.find(o => o.id === orderId);
            if (order) {
                order.status = status;
            }
            closeOrderDetails();
            loadOrdersTable();
            alert('Order status updated successfully!');
        } else {
            throw new Error('Failed to update order status');
        }
    } catch (error) {
        console.error('Error updating order status:', error);
        alert('Error updating order status. Please try again.');
    }
}

// تأكد من تصدير جميع الدوال للاستخدام في HTML
window.addWilaya = addWilaya;
window.updateWilayaFee = updateWilayaFee;
window.removeWilaya = removeWilaya;
window.updateCCPAccount = updateCCPAccount;
window.updateStoreSettings = updateStoreSettings;
window.viewOrderDetails = viewOrderDetails;
window.closeOrderDetails = closeOrderDetails;
window.updateOrderStatus = updateOrderStatus;