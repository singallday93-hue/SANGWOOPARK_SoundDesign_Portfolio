import { useState, useEffect } from 'react';
import { Reorder, motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, Save, X, ExternalLink, GripVertical } from 'lucide-react';
import { PortfolioItem, portfolioItems as initialItems } from '../data/portfolio';
import { Button } from '../components/ui/Button';

export function AdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PortfolioItem>>({});
  const [toolsInput, setToolsInput] = useState('');
  const [rolesInput, setRolesInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_data');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(initialItems);
    }
  }, []);

  const saveToStorage = (newItems: PortfolioItem[]) => {
    localStorage.setItem('portfolio_data', JSON.stringify(newItems));
    setItems(newItems);
  };

  const handleAdd = () => {
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
      }
    };
    saveToStorage([newItem, ...items]);
    setEditingId(newItem.id);
    setEditForm(newItem);
    setToolsInput('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const filtered = items.filter(i => i.id !== id);
      saveToStorage(filtered);
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setEditForm(item);
    setToolsInput(item.details?.tools?.join(', ') || '');
    setRolesInput(item.details?.myRole?.join(', ') || '');
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

  const handleSaveEdit = () => {
    const updated = items.map(i => i.id === editingId ? { ...i, ...editForm } as PortfolioItem : i);
    saveToStorage(updated);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 uppercase tracking-tight">Management Dashboard</h1>
            <p className="text-zinc-500">Edit and manage your portfolio projects</p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4" />
            Add New Project
          </Button>
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
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex items-center gap-6 cursor-grab active:cursor-grabbing group relative"
              >
                <div className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  <GripVertical className="w-5 h-5" />
                </div>
                
                <div className="w-48 aspect-video rounded overflow-hidden bg-zinc-800 flex-shrink-0">
                  <img src={item.thumbnail} alt="" className="w-full h-full object-cover opacity-50" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <div className="flex gap-2 mb-2">
                    <span className="text-[10px] bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded border border-sky-500/30 uppercase font-bold">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{item.gameInfo}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => handleEdit(item)}>
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button variant="outline" className="text-red-500 border-red-500/20 hover:bg-red-500/10" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </div>

      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-4xl p-8 rounded-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Edit Project</h2>
              <button onClick={() => setEditingId(null)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Project Title</label>
                  <input
                    value={editForm.title}
                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-2 text-white focus:border-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Game Info</label>
                  <input
                    value={editForm.gameInfo}
                    onChange={e => setEditForm({ ...editForm, gameInfo: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-2 text-white focus:border-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Category</label>
                  <select
                    value={editForm.category}
                    onChange={e => setEditForm({ ...editForm, category: e.target.value as any })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-2 text-white focus:border-sky-500 outline-none"
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
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">YouTube Link / URL</label>
                  <input
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={editForm.videoUrl}
                    onChange={e => updateYoutubeData(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-2 text-white focus:border-sky-500 outline-none"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">Paste full YouTube link or video ID</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Short Description (Grid View)</label>
                  <textarea
                    value={editForm.description}
                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-2 text-white focus:border-sky-500 outline-none h-20 resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Project Overview</label>
                  <textarea
                    value={editForm.details?.overview || ''}
                    onChange={e => setEditForm({ 
                      ...editForm, 
                      details: { 
                        ...(editForm.details || { overview: '', myRole: [], designIntent: '', tools: [] }), 
                        overview: e.target.value 
                      } 
                    })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-2 text-white focus:border-sky-500 outline-none h-24 resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Thumbnail (Automatic)</label>
                  <div className="w-full aspect-video rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden relative group">
                    {editForm.thumbnail ? (
                      <img src={editForm.thumbnail} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs italic">
                        Thumbnail will be generated from URL
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] text-white/70 uppercase font-black tracking-widest">Auto-Generated</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">My Role (Comma separated)</label>
                  <input
                    value={rolesInput}
                    onChange={e => {
                      const val = e.target.value;
                      setRolesInput(val);
                      setEditForm({ 
                        ...editForm, 
                        details: { 
                          ...(editForm.details || { overview: '', myRole: [], designIntent: '', tools: [] }), 
                          myRole: val.split(',').map(s => s.trim()).filter(Boolean)
                        } 
                      });
                    }}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-2 text-white focus:border-sky-500 outline-none"
                    placeholder="e.g. Sound Design, Mixing, Implementation"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Design Intent</label>
                  <textarea
                    value={editForm.details?.designIntent || ''}
                    onChange={e => setEditForm({ 
                      ...editForm, 
                      details: { 
                        ...(editForm.details || { overview: '', myRole: [], designIntent: '', tools: [] }), 
                        designIntent: e.target.value 
                      } 
                    })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-2 text-white focus:border-sky-500 outline-none h-24 resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Tools Used (Comma separated)</label>
                  <input
                    value={toolsInput}
                    onChange={e => {
                      const val = e.target.value;
                      setToolsInput(val);
                      setEditForm({ 
                        ...editForm, 
                        details: { 
                          ...(editForm.details || { overview: '', myRole: [], designIntent: '', tools: [] }), 
                          tools: val.split(',').map(s => s.trim()).filter(Boolean)
                        } 
                      });
                    }}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-2 text-white focus:border-sky-500 outline-none"
                    placeholder="e.g. Unreal Engine, FMOD, Cubase"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-zinc-800">
              <Button variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
              <Button onClick={handleSaveEdit}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
