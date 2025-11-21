import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsApi } from '../api/products';

interface ProductDetail {
  id: number;
  name: string;
  sku: string | null;
  barcode: string | null;
  price: number;
  cost_price: number | null;
  vat_rate: number;
  stock_quantity: number;
  min_stock_level: number;
  category_id: number | null;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
}

type Section = 'general' | 'pricing' | 'inventory' | 'supply' | 'analytics';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [activeSection, setActiveSection] = useState<Section>('general');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ProductDetail>>({});

  useEffect(() => {
    if (id) {
      loadProduct(parseInt(id));
    }
  }, [id]);

  const loadProduct = async (productId: number) => {
    const { data } = await productsApi.get(productId);
    setProduct(data);
    setFormData(data);
  };

  const handleSave = async () => {
    if (!product?.id) return;
    try {
      await productsApi.update(product.id, formData);
      await loadProduct(product.id);
      setIsEditing(false);
      // Toast notification here
      alert('Product updated successfully!');
    } catch (err) {
      alert('Error updating product');
    }
  };

  const handleDelete = async () => {
    if (!product?.id) return;
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productsApi.delete(product.id);
        navigate('/products');
      } catch (err) {
        alert('Error deleting product');
      }
    }
  };

  const scrollToSection = (section: Section) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  const calculateMargin = () => {
    if (!formData.price || !formData.cost_price) return 0;
    return ((formData.price - formData.cost_price) / formData.cost_price) * 100;
  };

  const calculateProfit = () => {
    if (!formData.price || !formData.cost_price) return 0;
    return formData.price - formData.cost_price;
  };

  if (!product) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ЗОНА Б: Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b">
          <button
            onClick={() => navigate('/products')}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Back to Products
          </button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => scrollToSection('general')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeSection === 'general' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                }`}
              >
                📦 General Info
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('pricing')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeSection === 'pricing' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                }`}
              >
                💰 Pricing & Economics
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('inventory')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeSection === 'inventory' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                }`}
              >
                📊 Inventory & Batches
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('supply')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeSection === 'supply' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                }`}
              >
                🚚 Supply Chain
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('analytics')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeSection === 'analytics' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                }`}
              >
                📈 Analytics & History
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ЗОНА А: Sticky Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex gap-4 mt-2 text-sm text-gray-600">
                <span>SKU: <strong>{product.sku || 'N/A'}</strong></span>
                <span>Price: <strong className="text-green-600">${product.price.toFixed(2)}</strong></span>
                <span>Stock: <strong className={product.stock_quantity <= 5 ? 'text-red-600' : 'text-blue-600'}>{product.stock_quantity}</strong></span>
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(product);
                    }}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
              )}
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </header>

        {/* ЗОНА В: Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Секция 1: General Info */}
          <section id="general" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">📦 General Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                <input
                  type="text"
                  value={formData.sku || ''}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Barcode</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.barcode || ''}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                    disabled={!isEditing}
                    className="flex-1 px-3 py-2 border rounded disabled:bg-gray-100"
                  />
                  {isEditing && (
                    <button className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300">
                      Generate
                    </button>
                  )}
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-3 py-2 border rounded disabled:bg-gray-100"
                />
              </div>
            </div>
          </section>

          {/* Секция 2: Pricing */}
          <section id="pricing" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">💰 Pricing & Economics</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cost Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cost_price || ''}
                  onChange={(e) => setFormData({ ...formData, cost_price: parseFloat(e.target.value) })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">VAT Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.vat_rate || ''}
                  onChange={(e) => setFormData({ ...formData, vat_rate: parseFloat(e.target.value) })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded disabled:bg-gray-100"
                />
              </div>
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Margin:</span>
                <span className="text-green-700 font-bold">{calculateMargin().toFixed(2)}%</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="font-medium">Profit per unit:</span>
                <span className="text-green-700 font-bold">${calculateProfit().toFixed(2)}</span>
              </div>
            </div>
          </section>

          {/* Секция 3: Inventory */}
          <section id="inventory" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">📊 Inventory & Stock</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Stock</label>
                <input
                  type="number"
                  value={formData.stock_quantity || 0}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Stock Level</label>
                <input
                  type="number"
                  value={formData.min_stock_level || 0}
                  onChange={(e) => setFormData({ ...formData, min_stock_level: parseInt(e.target.value) })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded disabled:bg-gray-100"
                />
              </div>
            </div>
            {product.stock_quantity <= product.min_stock_level && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-red-700 font-medium">⚠️ Low stock alert! Current stock is at or below minimum level.</p>
              </div>
            )}
          </section>

          {/* Секция 4: Supply Chain */}
          <section id="supply" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">🚚 Supply Chain</h2>
            <div className="text-center py-8 text-gray-500">
              <p>No supplier data available</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add Supplier
              </button>
            </div>
          </section>

          {/* Секция 5: Analytics */}
          <section id="analytics" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">📈 Analytics & History</h2>
            <div className="text-center py-8 text-gray-500">
              <p>Analytics data will be displayed here</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
