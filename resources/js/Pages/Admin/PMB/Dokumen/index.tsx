import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Form from './Form';
import DeleteConfirmation from '@/Components/DeleteConfirmation';
import Alert from '@/Components/Alert';

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
    const [search, setSearch] = useState(filters.search || '');
    const [selectedKategori, setSelectedKategori] = useState(filters.kategori || '');
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState<Dokumen | null>(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const { flash } = usePage().props as any;

    // Handle search & filter
    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route('admin.dokumen'),
            { search: value, kategori: selectedKategori },
            { preserveState: true }
        );
    };

    const handleKategoriChange = (value: string) => {
        setSelectedKategori(value);
        router.get(
            route('admin.dokumen'),
            { search, kategori: value },
            { preserveState: true }
        );
    };

    // Handle drag & drop
    const handleDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(dokumen);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update urutan
        const updates = items.map((item, index) => ({
            id: item.id,
            urutan: index
        }));

        router.post(route('admin.dokumen.reorder'), {
            updates
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    // Group dokumen by kategori
    const dokumenByKategori = dokumen.reduce((acc, doc) => {
        if (!acc[doc.kategori]) {
            acc[doc.kategori] = [];
        }
        acc[doc.kategori].push(doc);
        return acc;
    }, {} as Record<string, Dokumen[]>);

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
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Cari dokumen..."
                                value={search}
                                onChange={e => handleSearch(e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
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
                            {Object.entries(dokumenByKategori).map(([kategori, docs]) => (
                                <div key={kategori} className="bg-white rounded-lg shadow">
                                    <div className="p-4 border-b">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-medium">
                                                {kategori_list[kategori]}
                                            </h3>
                                            <span className="text-sm text-gray-500">
                                                {docs.length} dokumen
                                            </span>
                                        </div>
                                    </div>

                                    <Droppable droppableId={kategori}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                                <div className="p-4">
                                                    {docs.map((item, index) => (
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
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            ))}
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