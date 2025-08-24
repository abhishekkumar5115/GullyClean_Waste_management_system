// src/pages/BinsPage.jsx
import React from 'react';
import BinList from '../components/bincomponents/BinList';

export default function BinsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Bins</h1>
      <BinList />
    </div>
  );
}
