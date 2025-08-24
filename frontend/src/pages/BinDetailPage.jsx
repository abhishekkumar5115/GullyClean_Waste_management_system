// src/pages/BinDetailPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import BinDetail from '../components/bincomponents/BinDetails';

export default function BinDetailPage() {
  const { id } = useParams();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Bin Detail — #{id}</h1>
      <BinDetail />
    </div>
  );
}
