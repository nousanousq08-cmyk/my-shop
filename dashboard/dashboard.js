let products = [];
let orders = [];
let wilayas = {};
let storeSettings = {};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadDashboardData();
    setupEventListeners();
});

function checkAuth() {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        window.location.href = 'auth.html';
        return;
    }
}

async function loadDashboardData() {
    try {
        const token = localStorage.getItem('adminToken');
        
        // Load products
        const productsResponse = await fetch('/api/products', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        products = await productsResponse.json();
        
        // Load orders
        const ordersResponse = await fetch('/api/orders', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        orders = await ordersResponse.json();
        
        // Load wilayas
        const wilayasResponse = await fetch('/api/wilayas', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        wilayas = await wilayasResponse.json();
        
        // Load settings
        const settingsResponse = await fetch('/api/settings', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        storeSettings = await settingsResponse.json();
        
        updateDashboard();
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        alert('Error loading data. Please check your connection.');
    }
}

function setupEventListeners() {
    // Add product form
    document.getElementById('addProductForm').addEventListener('submit', addProduct);
}

function updateDashboard() {
    loadProductsList();
    loadOrdersTable();
    loadDeliveryFees();
    loadSettings();
    loadMediaGallery();
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
        name: {
            en: document.getElementById('productNameEn').value,
            ar: document.getElementById('productNameAr').value,
            fr: document.getElementById('productNameFr').value
        },
        price: parseInt(document.getElementById('productPrice').value),
        discount: parseInt(document.getElementById('productDiscount').value) || 0,
        stock: parseInt(document.getElementById('productStock').value),
        description: {
            en: document.getElementById('productDescEn').value,
            ar: document.getElementById('productDescAr').value,
            fr: document.getElementById('productDescFr').value
        },
        colors: document.getElementById('productColors').value.split(',').map(c => c.trim()).filter(c => c),
        sizes: document.getElementById('productSizes').value.split(',').map(s => s.trim()).filter(s => s),
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f3f4f6'/%3E%3Ctext x='150' y='150' text-anchor='middle' fill='%236b7280' font-size='16'%3ENew Product%3C/text%3E%3C/svg%3E",
        media: []
    };
    
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
            throw new Error('Failed to add product');
        }
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Error adding product. Please try again.');
    }
}

function loadProductsList() {
    const container = document.getElementById('productsList');
    container.innerHTML = '';
    
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'flex items-center justify-between p-4 border rounded-lg';
        productItem.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${product.image}" alt="${product.name.en}" class="w-16 h-16 object-cover rounded">
                <div>
                    <h4 class="font-semibold">${product.name.en}</h4>
                    <p class="text-gray-600">${product.price} DA ${product.discount > 0 ? `(-${product.discount}%)` : ''}</p>
                    <p class="text-sm text-gray-500">Stock: ${product.stock}</p>
                </div>
            </div>
            <div class="flex space-x-2">
                <button onclick="editProduct(${product.id})" class="text-blue-500 hover:text-blue-700">
                    Edit
                </button>
                <button onclick="deleteProduct(${product.id})" class="text-red-500 hover:text-red-700">
                    Delete
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
        const response = await fetch(`/api/products/${productId}`, {
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
    container.innerHTML = '';
    
    if (orders.length === 0) {
        container.innerHTML = '<tr><td colspan="7" class="py-4 text-center text-gray-500">No orders yet</td></tr>';
        return;
    }
    
    orders.forEach(order => {
        const orderRow = document.createElement('tr');
        orderRow.className = 'border-b hover:bg-gray-50';
        orderRow.innerHTML = `
            <td class="py-2 px-4">#${order.id}</td>
            <td class="py-2 px-4">${order.customer.name} ${order.customer.lastName}</td>
            <td class="py-2 px-4">${order.customer.phone}</td>
            <td class="py-2 px-4">${order.customer.wilaya}</td>
            <td class="py-2 px-4">${order.paymentMethod}</td>
            <td class="py-2 px-4">
                <span class="px-2 py-1 text-xs rounded ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Pending Payment' ? 'bg-orange-100 text-orange-800' :
                    order.status === 'Pending Confirmation' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                }">${order.status}</span>
            </td>
            <td class="py-2 px-4">
                <button onclick="viewOrderDetails(${order.id})" class="text-blue-500 hover:text-blue-700 text-sm">View</button>
            </td>
        `;
        container.appendChild(orderRow);
    });
}

function viewOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const modalContent = document.getElementById('orderDetailsContent');
    modalContent.innerHTML = `
        <div class="mb-4">
            <h4 class="font-semibold">Order #${order.id}</h4>
            <p class="text-sm text-gray-600">Date: ${order.date}</p>
            <p class="text-sm text-gray-600">Status: ${order.status}</p>
        </div>
        
        <div class="mb-4">
            <h4 class="font-semibold">Customer Information</h4>
            <p class="text-sm">${order.customer.name} ${order.customer.lastName}</p>
            <p class="text-sm">Phone: ${order.customer.phone}</p>
            <p class="text-sm">Address: ${order.customer.address}, ${order.customer.commune}, ${order.customer.wilaya}</p>
        </div>
        
        <div class="mb-4">
            <h4 class="font-semibold">Order Items</h4>
            <div class="space-y-2 mt-2">
                ${order.items.map(item => `
                    <div class="flex justify-between border-b pb-2">
                        <div>
                            <p class="font-medium">${item.product.name.en}</p>
                            <p class="text-sm text-gray-600">${item.color} - ${item.size} - Qty: ${item.quantity}</p>
                        </div>
                        <p class="font-medium">${item.product.discount > 0 ? 
                            Math.round(item.product.price * (1 - item.product.discount / 100)) * item.quantity : 
                            item.product.price * item.quantity} DA</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="mb-4">
            <h4 class="font-semibold">Payment Information</h4>
            <p class="text-sm">Method: ${order.paymentMethod}</p>
            <p class="text-sm font-bold">Total: ${order.total}</p>
        </div>
        
        ${order.paymentProof ? `
        <div class="mb-4">
            <h4 class="font-semibold">Payment Proof</h4>
            <img src="${order.paymentProof}" alt="Payment Proof" class="max-w-full h-auto border rounded">
        </div>
        ` : ''}
        
        <div class="flex space-x-2 mt-4">
            <button onclick="updateOrderStatus(${order.id}, 'Confirmed')" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Confirm Order
            </button>
            <button onclick="updateOrderStatus(${order.id}, 'Shipped')" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Mark as Shipped
            </button>
            <button onclick="updateOrderStatus(${order.id}, 'Cancelled')" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
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
        const response = await fetch(`/api/orders/${orderId}`, {
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

function loadDeliveryFees() {
    const container = document.getElementById('deliveryFeesList');
    container.innerHTML = '';
    
    Object.entries(wilayas).forEach(([wilaya, fee]) => {
        const deliveryItem = document.createElement('div');
        deliveryItem.className = 'flex justify-between items-center p-3 border rounded-lg';
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
    
    // Load CCP account
    document.getElementById('ccpAccountInput').value = storeSettings.ccpAccount || '';
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
            body: JSON.stringify({ ccpAccount: newAccount })
        });
        
        if (response.ok) {
            storeSettings.ccpAccount = newAccount;
            alert('CCP account updated successfully!');
        } else {
            throw new Error('Failed to update CCP account');
        }
    } catch (error) {
        console.error('Error updating CCP account:', error);
        alert('Error updating CCP account. Please try again.');
    }
}

function loadSettings() {
    document.getElementById('storeNameInput').value = storeSettings.storeName || '';
    document.getElementById('storeEmailInput').value = storeSettings.email || '';
    document.getElementById('storePhoneInput').value = storeSettings.phone || '';
}

async function updateStoreSettings() {
    const settings = {
        storeName: document.getElementById('storeNameInput').value,
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

function loadMediaGallery() {
    const productSelect = document.getElementById('mediaProductSelect');
    const gallery = document.getElementById('mediaGallery');
    
    // Update product select
    productSelect.innerHTML = '<option value="">Select a product</option>';
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name.en;
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
                        <img src="${media.url}" alt="${media.description}">
                        <div class="media-actions">
                            <button onclick="deleteMedia(${product.id}, ${media.id})" class="bg-red-500 text-white p-1 rounded text-xs">Delete</button>
                        </div>
                        <div class="p-2 text-xs text-gray-600">${product.name.en} - ${media.description || 'No description'}</div>
                    `;
                } else {
                    mediaItem.innerHTML = `
                        <video src="${media.url}" class="w-full h-full object-cover"></video>
                        <div class="media-actions">
                            <button onclick="deleteMedia(${product.id}, ${media.id})" class="bg-red-500 text-white p-1 rounded text-xs">Delete</button>
                        </div>
                        <div class="p-2 text-xs text-gray-600">${product.name.en} - ${media.description || 'No description'}</div>
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
    const productId = parseInt(document.getElementById('mediaProductSelect').value);
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
        
        const response = await fetch('/api/products/media', {
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

function logout() {
    localStorage.removeItem('adminToken');
    window.location.href = 'auth.html';
}