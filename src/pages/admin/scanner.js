
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useEffect, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Scanner() {
  const videoRef = useRef();

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    reader.decodeFromVideoDevice(null, videoRef.current, result => {
      if (result) alert(result.getText());
    });
  }, []);

  return (
    <AdminLayout>
      <video ref={videoRef} style={{ width: 400 }} />
    </AdminLayout>
  );
}
