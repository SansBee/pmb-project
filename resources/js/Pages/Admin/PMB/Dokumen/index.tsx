import React, { useState, useMemo, useCallback, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Form from './Form';
import DeleteConfirmation from '@/Components/DeleteConfirmation';
import Alert from '@/Components/Alert';
import debounce from 'lodash/debounce';

interface Dokumen {
    id: number;
    nama_dokumen: string;
    deskripsi?: string;
    kategori: string;
    urutan: number;
    format_file: string;
    format_helper?: string;
    max_size: number;
    size_type: string;
    is_wajib: boolean;
    is_active: boolean;
    formatted_size: string;
    format_description: string;
    format_example: string;
}

interface Props {
    dokumen: Dokumen[];
    kategori_list: Record<string, string>;
    format_list: Record<string, string>;
    size_type_list: Record<string, string>;
    filters: {
        search?: string;
        kategori?: string;
    };
}

export default function DokumenIndex({ dokumen, kategori_list, format_list, size_type_list, filters }: Props) {
    const [search, setSearch] = useState('');
    const [selectedKategori, setSelectedKategori] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState<Dokumen | null>(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const { flash } = usePage().props as any;

    // Reset filters saat komponen mount
    useEffect(() => {
        // Reset search dan kategori ke empty string jika ada filters
        if (filters.search || filters.kategori) {
            setSearch('');
            setSelectedKategori('');
            
            // Hapus query string dari URL hanya jika ada filters
            router.get(
                route('admin.dokumen'),
                {},
                { 
                    preserveState: true,
                    replace: true,
                    only: ['dokumen'] // Hanya refresh data dokumen
                }
            );
        }
    }, []); // Dependency array kosong agar hanya dijalankan sekali

    // Fungsi untuk filter dokumen
    const filteredDokumen = useMemo(() => {
        return dokumen.filter(doc => {
            const searchLower = search.toLowerCase().trim();
            const matchSearch = !searchLower || 
                doc.nama_dokumen.toLowerCase().includes(searchLower) ||
                (doc.deskripsi?.toLowerCase().includes(searchLower) ?? false);
            
            const matchKategori = !selectedKategori || doc.kategori === selectedKategori;
            
            return matchSearch && matchKategori;
        });
    }, [dokumen, search, selectedKategori]);

    // Fungsi untuk mendapatkan kategori yang akan ditampilkan
    const getVisibleCategories = () => {
        if (search.trim()) {
            // Jika ada pencarian, hanya tampilkan kategori yang memiliki dokumen yang cocok
            const kategoriBerisi = new Set(filteredDokumen.map(doc => doc.kategori));
            return Object.entries(kategori_list).filter(([key]) => kategoriBerisi.has(key));
        }
        
        if (selectedKategori) {
            // Jika kategori dipilih, hanya tampilkan kategori tersebut
            return Object.entries(kategori_list).filter(([key]) => key === selectedKategori);
        }
        
        // Jika tidak ada pencarian dan kategori, tampilkan semua
        return Object.entries(kategori_list);
    };

    // Handle search dengan debounce
    const handleSearch = useCallback(debounce((value: string) => {
        setSearch(value);
        if (!value.trim()) {
            // Jika pencarian kosong, reset tampilan
            setSelectedKategori('');
        }
    }, 300), []);

    // Handle perubahan kategori
    const handleKategoriChange = (value: string) => {
        setSelectedKategori(value);
        setSearch(''); // Reset pencarian ketika kategori berubah
    };

    // Handle clear search
    const handleClearSearch = () => {
        setSearch('');
        setSelectedKategori('');
    };

    // Handle pengurutan
    const handleSort = (kategori: string) => {
        const sortedDokumen = [...filteredDokumen].sort((a, b) => {
            if (a.kategori === kategori && b.kategori !== kategori) return -1;
            if (a.kategori !== kategori && b.kategori === kategori) return 1;
            return a.urutan - b.urutan;
        });
        
        // Update urutan ke backend
        router.post(route('admin.dokumen.reorder'), {
            updates: sortedDokumen.map((doc, index) => ({
                id: doc.id,
                urutan: index
            }))
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    // Handle drag & drop
    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const sourceKategori = result.source.droppableId;
        const destinationKategori = result.destination.droppableId;

        // Gunakan filteredDokumen untuk mendapatkan dokumen yang sedang ditampilkan
        const dokumenKategori = filteredDokumen.filter(doc => doc.kategori === sourceKategori);
        
        // Dapatkan item yang di-drag dan posisi barunya
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        const draggedItem = dokumenKategori[sourceIndex];

        // Buat array baru dengan urutan yang diperbarui
        const updatedDokumen = [...dokumen].map(doc => {
            if (doc.kategori !== sourceKategori) {
                return doc;
            }

            // Jika ini adalah item yang di-drag
            if (doc.id === draggedItem.id) {
                return {
                    ...doc,
                    urutan: destinationIndex + 1
                };
            }

            // Atur ulang urutan item lain dalam kategori yang sama
            const currentIndex = dokumenKategori.findIndex(d => d.id === doc.id);
            if (currentIndex === -1) return doc;

            let newUrutan = currentIndex + 1;
            
            if (currentIndex >= destinationIndex && currentIndex < sourceIndex) {
                newUrutan = currentIndex + 2; // Geser ke bawah
            } else if (currentIndex <= destinationIndex && currentIndex > sourceIndex) {
                newUrutan = currentIndex; // Geser ke atas
            }

            return {
                ...doc,
                urutan: newUrutan
            };
        });

        // Siapkan updates untuk backend
        const updates = updatedDokumen
            .filter(doc => doc.kategori === sourceKategori)
            .map(doc => ({
                id: doc.id,
                urutan: doc.urutan
            }));

        // Kirim ke backend
        router.post(route('admin.dokumen.reorder'), {
            updates
        }, {
            preserveState: true,
            preserveScroll: true,
            only: ['dokumen']
        });
    };

    return (
        <AdminLayout>
            <Head title="Persyaratan Dokumen - Admin" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Alerts */}
                    {flash?.message && (
                        <div className="mb-4">
                            <Alert type="success" message={flash.message} />
                        </div>
                    )}

                    {/* Search & Filter */}
                    <div className="mb-6 flex gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Cari dokumen..."
                                value={search}
                                onChange={e => {
                                    const value = e.target.value;
                                    setSearch(value);
                                    handleSearch(value);
                                }}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {search && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <div className="w-64">
                            <select
                                value={selectedKategori}
                                onChange={e => handleKategoriChange(e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Semua Kategori</option>
                                {Object.entries(kategori_list).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button 
                            onClick={() => setShowForm(true)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Tambah Dokumen
                        </button>
                    </div>

                    {/* Dokumen List with Drag & Drop */}
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="space-y-8">
                            {getVisibleCategories().map(([kategori, label]) => {
                                const dokumenKategori = filteredDokumen.filter(
                                    doc => doc.kategori === kategori
                                );

                                return (
                                    <div key={kategori} className="bg-white rounded-lg shadow">
                                        <div className="p-4 border-b">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-lg font-medium">
                                                    {kategori_list[kategori]}
                                                </h3>
                                                <span className="text-sm text-gray-500">
                                                    {dokumenKategori.length} dokumen
                                                </span>
                                            </div>
                                        </div>

                                        <Droppable droppableId={kategori} type="dokumen">
                                            {(provided) => (
                                                <div 
                                                    ref={provided.innerRef} 
                                                    {...provided.droppableProps}
                                                    className="space-y-4"
                                                >
                                                    {dokumenKategori.map((item, index) => (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={String(item.id)}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    className={`mb-4 p-4 rounded-lg border ${
                                                                        snapshot.isDragging ? 'bg-gray-50' : 'bg-white'
                                                                    }`}
                                                                >
                                                                    <div className="flex items-start">
                                                                        {/* Drag Handle */}
                                                                        <div
                                                                            {...provided.dragHandleProps}
                                                                            className="mr-4 cursor-move"
                                                                        >
                                                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                                                            </svg>
                                                                        </div>

                                                                        {/* Content */}
                                                                        <div className="flex-1">
                                                                            <div className="flex justify-between items-start">
                                                                                <div>
                                                                                    <h4 className="font-medium">{item.nama_dokumen}</h4>
                                                                                    {item.deskripsi && (
                                                                                        <p className="text-sm text-gray-500 mt-1">
                                                                                            {item.deskripsi}
                                                                                        </p>
                                                                                    )}
                                                                                </div>
                                                                                <div className="flex gap-2">
                                                                                    <button
                                                                                        onClick={() => setEditData(item)}
                                                                                        className="text-indigo-600 hover:text-indigo-900"
                                                                                    >
                                                                                        Edit
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => setItemToDelete(item.id)}
                                                                                        className="text-red-600 hover:text-red-900"
                                                                                    >
                                                                                        Hapus
                                                                                    </button>
                                                                                    <button 
                                                                                        onClick={() => router.post(route('admin.dokumen.verify', item.id))}
                                                                                        className="text-green-600 hover:text-green-900"
                                                                                    >
                                                                                        Verifikasi
                                                                                    </button>
                                                                                </div>
                                                                            </div>

                                                                            {/* Format & Size Info */}
                                                                            <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                                                                                <div>
                                                                                    <span className="text-gray-500">Format:</span>
                                                                                    <div className="mt-1">
                                                                                        {format_list[item.format_file]}
                                                                                        <div className="text-xs text-gray-500">
                                                                                            {item.format_example}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div>
                                                                                    <span className="text-gray-500">Ukuran:</span>
                                                                                    <div className="mt-1">
                                                                                        {item.formatted_size}
                                                                                    </div>
                                                                                </div>
                                                                                <div>
                                                                                    <span className="text-gray-500">Status:</span>
                                                                                    <div className="mt-1 space-x-2">
                                                                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                                                                            item.is_wajib 
                                                                                            ? 'bg-red-100 text-red-800' 
                                                                                            : 'bg-gray-100 text-gray-800'
                                                                                        }`}>
                                                                                            {item.is_wajib ? 'Wajib' : 'Opsional'}
                                                                                        </span>
                                                                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                                                                            item.is_active 
                                                                                            ? 'bg-green-100 text-green-800' 
                                                                                            : 'bg-gray-100 text-gray-800'
                                                                                        }`}>
                                                                                            {item.is_active ? 'Aktif' : 'Nonaktif'}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            {/* Helper Text */}
                                                                            <div className="mt-2 text-sm text-gray-500">
                                                                                {item.format_description}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                );
                            })}
                        </div>
                    </DragDropContext>
                </div>
            </div>

            {/* Modals */}
            {(showForm || editData) && (
                <Form 
                    isEdit={!!editData}
                    dokumen={editData || undefined}
                    kategori_list={kategori_list}
                    format_list={format_list}
                    size_type_list={size_type_list}
                    onClose={() => {
                        setShowForm(false);
                        setEditData(null);
                    }}
                />
            )}

            <DeleteConfirmation
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={() => {
                    if (itemToDelete) {
                        router.delete(route('admin.dokumen.destroy', itemToDelete), {
                            onSuccess: () => setItemToDelete(null)
                        });
                    }
                }}
                title="Hapus Dokumen"
                message="Apakah Anda yakin ingin menghapus dokumen ini?"
            />
        </AdminLayout>
    );
} 