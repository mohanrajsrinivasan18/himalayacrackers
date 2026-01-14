import { useState } from "react";

export default function ProductImageUploader({ productId, onChange }) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const form = new FormData();
    form.append("file", file);
    form.append("productId", productId);

    const uploadRes = await fetch(
      "/api/admin/products/upload-image",
      { method: "POST", body: form }
    );

    const uploadData = await uploadRes.json();
    if (!uploadRes.ok) {
      alert(uploadData.error);
      setUploading(false);
      return;
    }

    await fetch("/api/admin/products/add-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: productId,
        imageUrl: uploadData.url
      })
    });

    setUploading(false);
    onChange();
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={handleUpload}
      />
      {uploading && <p>Uploading…</p>}
    </div>
  );
}
