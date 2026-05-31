'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Edit2, Loader2, Plus, Save, Tag, Trash2, X } from 'lucide-react';
import { showSuccess, showError, confirmAction } from '@/components/ToastUtils';

const emptyForm = { name: '', description: '' };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showError('Category name is required');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(editingId ? `/api/categories/${editingId}` : '/api/categories', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Category save failed');
      }

      resetForm();
      await fetchCategories();
    } catch (error) {
      showError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (category) => {
    setEditingId(category._id);
    setFormData({
      name: category.name || '',
      description: category.description || '',
    });
  };

  const handleDelete = async (category) => {
    const ok = await confirmAction(`Delete category "${category.name}"?`);
    if (!ok) return;

    try {
      const response = await fetch(`/api/categories/${category._id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Category delete failed');
      }

      if (editingId === category._id) resetForm();
      await fetchCategories();
      showSuccess('Category deleted successfully');
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Create, edit, and manage product categories.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-100 p-5 h-fit space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <Tag size={18} className="text-indigo-600" />
              <h2 className="font-semibold text-gray-900">{editingId ? 'Edit Category' : 'New Category'}</h2>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Example: Electronics"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                rows={3}
                placeholder="Optional"
              />
            </div>

            <div className="flex gap-3 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition inline-flex items-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : editingId ? <Save size={16} /> : <Plus size={16} />}
                {editingId ? 'Save Changes' : 'Create Category'}
              </button>
            </div>
          </form>

          <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <Loader2 size={28} className="animate-spin text-indigo-600" />
              </div>
            ) : categories.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                        <td className="px-4 py-3 font-medium text-gray-900">{category.name}</td>
                        <td className="px-4 py-3 text-gray-500">{category.description || 'No description'}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => startEdit(category)}
                              className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition"
                              title="Edit"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(category)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Tag size={44} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm">No categories yet. Create one to publish products under it.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
