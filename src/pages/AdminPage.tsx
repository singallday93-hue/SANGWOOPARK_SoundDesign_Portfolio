import { useState, useEffect } from 'react';
import { Reorder, motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, Save, X, ExternalLink, GripVertical, Database } from 'lucide-react';
import { PortfolioItem, portfolioItems as initialItems } from '../data/portfolio';
import { Button } from '../components/ui/Button';
import { portfolioService } from '../services/portfolioService';

export function AdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PortfolioItem>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showSeedConfirm, setShowSeedConfirm] = useState(false);

  useEffect(() => {
    const unsubscribe = portfolioService.subscribe((data) => {
      setItems(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const saveToStorage = async (newItems: PortfolioItem[]) => {
    setItems(newItems);
    await portfolioService.saveAll(newItems);
  };

  const seedDatabase = async () => {
    await portfolioService.saveAll(initialItems);
    setShowSeedConfirm(false);
  };

  const handleAdd = async () => {
    const newItem: PortfolioItem = {
      id: `project-${Date.now()}`,
      title: 'New Project',
      category: 'In-gameplay',
      gameInfo: 'Platform / Engine',
      tags: [],
      description: 'New Description',
      videoUrl: '',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
      details: {
        overview: '',
        myRole: [],
        designIntent: '',
        tools: []
      },
      order: items.length > 0 ? Math.min(...items.map(i => i.order)) - 1 : 0
    };
    const newItems = [newItem, ...items];
    setItems(newItems);
    await portfolioService.save(newItem);
    setEditingId(newItem.id);
    setEditForm(newItem);
  };

  const handleDelete = async (id: string) => {
    const filtered = items.filter(i => i.id !== id);
    setItems(filtered);
    await portfolioService.delete(id);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const updateYoutubeData = (url: string) => {
    if (!url) {
      setEditForm({ ...editForm, videoUrl: '', thumbnail: '' });
      return;
    }
    const id = getYoutubeId(url);
    const thumbnail = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    setEditForm({ ...editForm, videoUrl: id, thumbnail });
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSaveEdit = async () => {
    if (!editingId) return;
    setIsSaving(true);
    setSaveError(null);
    try {
      const updatedItem = { ...items.find(i => i.id === editingId), ...editForm } as PortfolioItem;
      const updated = items.map(i => i.id === editingId ? updatedItem : i);
      setItems(updated);
      await portfolioService.save(updatedItem);
      setEditingId(null);
    } catch (err: any) {
      setSaveError('Failed to save. Please try again.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5efe6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5efe6] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 mb-2 uppercase tracking-tight">Management Dashboard</h1>
            <p className="text-zinc-600 font-medium">Changes are saved permanently to the database.</p>
          </div>
          <div className="flex gap-4">
            {items.length === 0 && (
              showSeedConfirm ? (
                <div className="flex items-center gap-2 bg-[#faf6ee] border border-[#e2d7c0] rounded-xl p-1.5 px-3">
                  <span className="text-xs text-zinc-700 font-bold uppercase tracking-wider">Seed database?</span>
                  <button 
                    type="button"
                    className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer" 
                    onClick={() => seedDatabase()}
                  >
                    Confirm
                  </button>
                  <button 
                    type="button"
                    className="bg-[#e8ded0] hover:bg-[#d8cdbe] text-zinc-800 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer" 
                    onClick={() => setShowSeedConfirm(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <Button variant="secondary" onClick={() => setShowSeedConfirm(true)}>
                  <Database className="w-4 h-4 mr-2" />
                  Seed Initial Data
                </Button>
              )
            )}
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4" />
              Add New Project
            </Button>
          </div>
        </div>

        <Reorder.Group axis="y" values={items} onReorder={saveToStorage} className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <Reorder.Item
                key={item.id}
                value={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#faf6ee] border border-[#e2d7c0] rounded-xl p-6 flex items-center gap-6 cursor-grab active:cursor-grabbing group relative shadow-sm"
              >
                <div className="text-zinc-400 group-hover:text-zinc-700 transition-colors">
                  <GripVertical className="w-5 h-5" />
                </div>
                
                <div className="w-48 aspect-video rounded overflow-hidden bg-[#f2e9db] flex-shrink-0 border border-[#d8cdbe]">
                  <img src={item.thumbnail} alt="" className="w-full h-full object-cover opacity-80" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-zinc-900 mb-1">{item.title}</h3>
                  <div className="flex gap-2 mb-2">
                    <span className="text-[10px] bg-[#e8ded0] text-zinc-800 px-2 py-0.5 rounded border border-[#d8cdbe] uppercase font-bold">
                       {item.category}
                    </span>
                    <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-wider">{item.gameInfo}</span>
                  </div>
                </div>

                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  {deleteConfirmId === item.id ? (
                    <div className="flex items-center gap-2 bg-[#f2e9db] border border-red-500/30 rounded-xl p-1.5 px-3">
                      <span className="text-[10px] font-black text-red-600 uppercase tracking-wider">Delete?</span>
                      <button 
                        type="button"
                        className="bg-red-500 hover:bg-red-600 text-white font-black text-[10px] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer animate-pulse"
                        onClick={() => {
                          handleDelete(item.id);
                          setDeleteConfirmId(null);
                        }}
                      >
                        Delete
                      </button>
                      <button 
                        type="button"
                        className="bg-[#e8ded0] hover:bg-[#d8cdbe] text-zinc-800 font-bold text-[10px] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        onClick={() => {
                          setDeleteConfirmId(null);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <Button variant="secondary" onClick={() => handleEdit(item)}>
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-red-500 border-red-500/20 hover:bg-red-500/10" 
                        onClick={() => setDeleteConfirmId(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </div>

      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#faf6ee] border border-[#e2d7c0] w-full max-w-4xl p-8 rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 uppercase tracking-tight">Edit Project</h2>
              <button onClick={() => setEditingId(null)} className="text-zinc-600 hover:text-zinc-900 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-600 uppercase mb-1 block">Project Title</label>
                  <input
                    value={editForm.title}
                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full bg-[#f2e9db] border border-[#d8cdbe] rounded px-4 py-2 text-zinc-900 focus:border-sky-500 outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 uppercase mb-1 block">Game Info</label>
                  <input
                    value={editForm.gameInfo}
                    onChange={e => setEditForm({ ...editForm, gameInfo: e.target.value })}
                    className="w-full bg-[#f2e9db] border border-[#d8cdbe] rounded px-4 py-2 text-zinc-900 focus:border-sky-500 outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 uppercase mb-1 block">Category</label>
                  <select
                    value={editForm.category}
                    onChange={e => setEditForm({ ...editForm, category: e.target.value as any })}
                    className="w-full bg-[#f2e9db] border border-[#d8cdbe] rounded px-4 py-2 text-zinc-900 focus:border-sky-500 outline-none font-medium"
                  >
                    <option value="In-gameplay">In-gameplay</option>
                    <option value="Skill">Skill</option>
                    <option value="Creature">Creature</option>
                    <option value="UI/GACHA">UI/GACHA</option>
                    <option value="Voice">Voice</option>
                    <option value="Engine">Engine</option>
                    <option value="Cinematic">Cinematic</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 uppercase mb-1 block">YouTube Link / URL</label>
                  <input
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={editForm.videoUrl}
                    onChange={e => updateYoutubeData(e.target.value)}
                    className="w-full bg-[#f2e9db] border border-[#d8cdbe] rounded px-4 py-2 text-zinc-900 focus:border-sky-500 outline-none font-medium"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">Paste full YouTube link or video ID</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-600 uppercase mb-1 block">Short Description (Grid View)</label>
                  <textarea
                    value={editForm.description}
                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full bg-[#f2e9db] border border-[#d8cdbe] rounded px-4 py-2 text-zinc-900 focus:border-sky-500 outline-none h-20 resize-none font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 uppercase mb-1 block">Project Overview</label>
                  <textarea
                    value={editForm.details?.overview || ''}
                    onChange={e => setEditForm({ 
                      ...editForm, 
                      details: { 
                        ...(editForm.details || { overview: '', myRole: [], designIntent: '', tools: [] }), 
                        overview: e.target.value 
                      } 
                    })}
                    className="w-full bg-[#f2e9db] border border-[#d8cdbe] rounded px-4 py-2 text-zinc-900 focus:border-sky-500 outline-none h-24 resize-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-600 uppercase mb-1 block">Thumbnail (Automatic)</label>
                  <div className="w-full aspect-video rounded-lg bg-[#f2e9db] border border-[#d8cdbe] overflow-hidden relative group">
                    {editForm.thumbnail ? (
                      <img src={editForm.thumbnail} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs italic">
                        Thumbnail will be generated from URL
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] text-white/90 uppercase font-black tracking-widest">Auto-Generated</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 uppercase mb-1 block">Design Intent</label>
                  <textarea
                    value={editForm.details?.designIntent || ''}
                    onChange={e => setEditForm({ 
                      ...editForm, 
                      details: { 
                        ...(editForm.details || { overview: '', myRole: [], designIntent: '', tools: [] }), 
                        designIntent: e.target.value 
                      } 
                    })}
                    className="w-full bg-[#f2e9db] border border-[#d8cdbe] rounded px-4 py-2 text-zinc-900 focus:border-sky-500 outline-none h-24 resize-none font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-[#e2d7c0]">
              <div className="flex items-center gap-2">
                {saveError && <span className="text-red-500 text-xs font-bold">{saveError}</span>}
                {isSaving && (
                  <div className="flex items-center gap-2 text-sky-500 text-xs font-bold animate-pulse">
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-ping" />
                    Synchronizing with Database...
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <Button variant="secondary" onClick={() => setEditingId(null)} disabled={isSaving}>Cancel</Button>
                <Button onClick={handleSaveEdit} disabled={isSaving}>
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
