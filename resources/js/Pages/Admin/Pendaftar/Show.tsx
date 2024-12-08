import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';

interface Pendaftar {
  id: number;
  nama_lengkap: string;
  email: string;
  program_studi: string;
  gelombang: string;
  status: string;
  tanggal_daftar: string;
  dokumen: Dokumen[];
}

interface Dokumen {
  id: number;
  status: string;
  path: string;
  persyaratan_dokumen: {
    id: number;
    nama_dokumen: string;
  };
}

// Terima props dari controller
const Show: React.FC<{ pendaftar: Pendaftar }> = ({ pendaftar: initialPendaftar }) => {
  const [pendaftar, setPendaftar] = useState<Pendaftar>(initialPendaftar);

  return (
    <div className="space-y-6">
      {/* Informasi Pendaftar */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Informasi Pendaftar</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Nama Lengkap</p>
            <p className="font-medium">{pendaftar.nama_lengkap}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium">{pendaftar.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Program Studi</p>
            <p className="font-medium">{pendaftar.program_studi}</p>
          </div>
        </div>
      </div>

      {/* Status Pendaftaran */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Status Pendaftaran</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Gelombang</p>
            <p className="font-medium">{pendaftar.gelombang}</p>
          </div>
          <div>
            <p className="text-gray-600">Status</p>
            <span className={`px-2 py-1 rounded-full text-sm ${
              pendaftar.status === 'baru' ? 'bg-blue-100 text-blue-800' :
              pendaftar.status === 'verified' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {pendaftar.status}
            </span>
          </div>
          <div>
            <p className="text-gray-600">Tanggal Daftar</p>
            <p className="font-medium">{pendaftar.tanggal_daftar}</p>
          </div>
        </div>
      </div>

      {/* Dokumen */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Dokumen</h2>
        <div className="space-y-4">
          {pendaftar.dokumen.map((dokumen) => (
            <div key={dokumen.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">{dokumen.persyaratan_dokumen.nama_dokumen}</p>
                <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                  dokumen.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  dokumen.status === 'verified' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {dokumen.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Show; 