import React, { useState } from 'react';
import { Upload, Trash2, Copy, Check, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { api } from '../../services/api';

export const ImageManager: React.FC = () => {
    const [images, setImages] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const handleUpload = async (event: any) => {
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) return;
            const file = event.target.files[0];
            const url = await api.upload.image(file);
            setImages(prev => [{ name: file.name, url }, ...prev]);
        } catch (error) {
            alert('Error uploading image!');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = () => {
        setImages(prev => prev.filter(img => img.name !== deleteId));
        setDeleteId(null);
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedId(url);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredImages = images.filter(img => img.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="bg-white rounded-lg shadow p-6 relative">
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><AlertCircle size={24} /></div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Delete Image?</h3>
                                <p className="text-sm text-gray-500 mt-1">This action cannot be undone.</p>
                            </div>
                            <div className="flex gap-3 w-full mt-2">
                                <Button variant="outline" onClick={() => setDeleteId(null)} className="flex-1">Cancel</Button>
                                <Button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white">Delete</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold font-serif text-gray-800">Project Images (Cloudflare R2 Placeholder)</h2>
                <div className="flex gap-4">
                    <input type="text" placeholder="Search images..." className="px-3 py-2 border rounded-md" value={search} onChange={e => setSearch(e.target.value)} />
                    <div className="relative">
                        <input type="file" id="imageUpload" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
                        <label htmlFor="imageUpload" className="cursor-pointer bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90 transition-colors flex items-center gap-2">
                            <Upload size={18} />{uploading ? 'Uploading...' : 'Upload Image'}
                        </label>
                    </div>
                </div>
            </div>
            {filteredImages.length === 0 ? (
                <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <p>{search ? 'No images match your search.' : 'No images uploaded yet.'}</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredImages.map((file) => (
                        <div key={file.name} className="group relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200 aspect-square">
                            <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button onClick={() => copyToClipboard(file.url)} className="p-2 bg-white/20 hover:bg-white text-white hover:text-primary rounded-full"><Copy size={16} /></button>
                                <button onClick={() => setDeleteId(file.name)} className="p-2 bg-white/20 hover:bg-red-500 text-white rounded-full"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
