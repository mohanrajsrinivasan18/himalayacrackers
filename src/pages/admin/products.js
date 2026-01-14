import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import styles from "./AdminProducts.module.scss";
import useUserRole from "@/lib/useUserRole";

export default function AdminProducts() {
  const role = useUserRole();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const res = await fetch("/api/products/list");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
    
    // Group products by category
    const grouped = data.reduce((acc, product) => {
      const category = product.category_slug || 'uncategorized';
      if (!acc[category]) acc[category] = [];
      acc[category].push(product);
      return acc;
    }, {});
    setGroupedProducts(grouped);
    
    setLoading(false);
  }

  function openAddModal() {
    setEditingProduct(null);
    setShowModal(true);
  }

  function openEditModal(product) {
    setEditingProduct(product);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingProduct(null);
  }

  // ✅ CREATE PRODUCT + UPLOAD IMAGE
  async function handleAddProduct(e) {
    e.preventDefault();
    const form = e.target;

    // 1️⃣ CREATE PRODUCT (NO IMAGE)
    const res = await fetch("/api/admin/products/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name.value,
        per: form.per.value,
        mrp: Number(form.mrp.value),
        price: Number(form.price.value),
        stock: Number(form.stock.value),
        category_slug: form.category.value
      })
    });

    const data = await res.json();
    if (!data.success) {
      alert(data.error || "Failed to create product");
      return;
    }

    const productId = data.product.id;
    console.log("Created product:", productId);

    // 2️⃣ UPLOAD IMAGE (IF PROVIDED)
    const file = form.image.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch(
        `/api/admin/products/upload-image?productId=${productId}`,
        {
          method: "POST",
          body: formData
        }
      );

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        alert(uploadData.error || "Image upload failed");
        return;
      }
    }

    alert("Product added successfully");
    form.reset();
    closeModal();
    loadProducts();
  }

  // ✅ UPDATE PRODUCT
  async function handleUpdateProduct(e) {
    e.preventDefault();
    const form = e.target;

    const res = await fetch("/api/admin/products/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingProduct.id,
        name: form.name.value,
        per: form.per.value,
        mrp: Number(form.mrp.value),
        price: Number(form.price.value),
        stock: Number(form.stock.value),
        category_slug: form.category.value
      })
    });

    const data = await res.json();
    if (!data.success) {
      alert(data.error || "Failed to update product");
      return;
    }

    // Handle image upload if provided
    const file = form.image.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch(
        `/api/admin/products/upload-image?productId=${editingProduct.id}`,
        {
          method: "POST",
          body: formData
        }
      );

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        alert(uploadData.error || "Image upload failed");
        return;
      }
    }

    alert("Product updated successfully");
    closeModal();
    loadProducts();
  }

  return (
    <AdminLayout>
      <h1 className={styles.title}>Products</h1>
      
      <button onClick={openAddModal} className={styles.addBtn}>
        + Add Product
      </button>

      {/* PRODUCT LIST BY CATEGORY */}
      {loading ? (
        <p>Loading products…</p>
      ) : (
        Object.entries(groupedProducts).map(([category, categoryProducts]) => (
          <div key={category} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>
              {category.toUpperCase().replace('-', ' ')} ({categoryProducts.length})
            </h2>
            
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.previewCol}>Preview</th>
                    <th className={styles.productCol}>Product</th>
                    <th className={styles.perCol}>Per</th>
                    <th className={styles.priceCol}>M.R.P</th>
                    <th className={styles.priceCol}>Our Price</th>
                    <th className={styles.qtyCol}>Stock</th>
                    <th className={styles.actionCol}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryProducts.map(p => (
                    <tr key={p.id}>
                      <td className={styles.previewCol}>
                        {p.image ? (
                          <img 
                            src={p.image} 
                            alt={p.name}
                            className={styles.thumb}
                          />
                        ) : (
                          <div className={styles.noImg}>No img</div>
                        )}
                      </td>
                      <td className={styles.productCol}>
                        <div className={styles.productInfo}>
                          <div className={styles.productName}>{p.name}</div>
                          <div className={styles.productPer}>{p.per}</div>
                        </div>
                      </td>
                      <td className={styles.perCol}>{p.per}</td>
                      <td className={styles.priceCol}>₹{p.mrp}</td>
                      <td className={styles.priceCol}>₹{p.price}</td>
                      <td className={styles.qtyCol}>{p.stock}</td>
                      <td className={styles.actionCol}>
                        <button 
                          onClick={() => openEditModal(p)}
                          className={styles.editBtn}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      {/* MODAL */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <form 
              key={editingProduct?.id || 'new'} 
              onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            >
              <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>

              <div className={styles.formGrid}>
                <input 
                  name="name" 
                  placeholder="Product name" 
                  defaultValue={editingProduct?.name || ""}
                  required 
                />
                <input 
                  name="per" 
                  placeholder="Per (e.g., 1pkt, 1box)" 
                  defaultValue={editingProduct?.per || ""}
                  required 
                />
                <input 
                  name="mrp" 
                  type="number" 
                  placeholder="MRP" 
                  defaultValue={editingProduct?.mrp || ""}
                  required 
                />
                <input 
                  name="price" 
                  type="number" 
                  placeholder="Selling Price" 
                  defaultValue={editingProduct?.price || ""}
                  required 
                />
                <input 
                  name="stock" 
                  type="number" 
                  placeholder="Stock" 
                  defaultValue={editingProduct?.stock || ""}
                  required 
                />
                <input 
                  name="category" 
                  placeholder="Category slug" 
                  defaultValue={editingProduct?.category_slug || ""}
                />
                <div>
                  <input name="image" type="file" accept="image/*" />
                  {editingProduct?.image && (
                    <div style={{ marginTop: '8px' }}>
                      <img 
                        src={editingProduct.image} 
                        alt="Current" 
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <small style={{ display: 'block', color: '#666' }}>Current image</small>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="submit">
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
                <button 
                  type="button" 
                  onClick={closeModal}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
