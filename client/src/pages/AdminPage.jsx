import { useContext, useEffect, useState } from 'react';
import { BarChart3, Plus, Trash2 } from 'lucide-react';
import { AuthContext } from '../components/AuthProvider';
import {
  achievements as defaultAchievements,
  projects as defaultProjects,
  skillCategories as defaultSkillCategories,
  timeline as defaultTimeline,
} from '../data/portfolioData';
import { Navigate } from 'react-router-dom';
import { API_URL } from '../config/api';

function AdminPage() {
  const { token, logout } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectDraft, setProjectDraft] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectSaving, setProjectSaving] = useState(false);
  const [projectStatus, setProjectStatus] = useState('');
  const [projectImageUploading, setProjectImageUploading] = useState(false);
  const [projectImageStatus, setProjectImageStatus] = useState('');
  const [careerTimeline, setCareerTimeline] = useState(defaultTimeline);
  const [timelineSaving, setTimelineSaving] = useState(false);
  const [timelineStatus, setTimelineStatus] = useState('');
  const [skillCategories, setSkillCategories] = useState(defaultSkillCategories);
  const [skillsSaving, setSkillsSaving] = useState(false);
  const [skillsStatus, setSkillsStatus] = useState('');
  const [achievements, setAchievements] = useState(defaultAchievements);
  const [achievementsSaving, setAchievementsSaving] = useState(false);
  const [achievementsStatus, setAchievementsStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const headers = {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    setError('');

    const loadAdminData = async () => {
      try {
        const initializeResponse = await fetch(`${API_URL}/projects/initialize`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ projects: defaultProjects }),
        });
        if (!initializeResponse.ok) {
          const errorBody = await initializeResponse.json().catch(() => null);
          throw new Error(errorBody?.message || 'Failed to initialize portfolio projects');
        }

        const [messagesRes, projectsRes, contentRes] = await Promise.all([
          fetch(`${API_URL}/messages`, { headers }),
          fetch(`${API_URL}/projects`, { headers }),
          fetch(`${API_URL}/content`),
        ]);
        if (!messagesRes.ok) {
          const errorBody = await messagesRes.json().catch(() => null);
          throw new Error(errorBody?.message || 'Failed to fetch messages');
        }
        if (!projectsRes.ok) {
          const errorBody = await projectsRes.json().catch(() => null);
          throw new Error(errorBody?.message || 'Failed to fetch projects');
        }
        if (!contentRes.ok) {
          const errorBody = await contentRes.json().catch(() => null);
          throw new Error(errorBody?.message || 'Failed to fetch portfolio content');
        }

        const [messagesData, projectsData, contentData] = await Promise.all([
          messagesRes.json(),
          projectsRes.json(),
          contentRes.json(),
        ]);

        setMessages(messagesData);
        setProjects(projectsData);
        if (Array.isArray(contentData.skillCategories)) {
          setSkillCategories(contentData.skillCategories);
        }
        if (Array.isArray(contentData.timeline)) {
          setCareerTimeline(contentData.timeline.filter((item) => item.title !== 'Achievements'));
        }
        if (Array.isArray(contentData.achievements)) setAchievements(contentData.achievements);
      } catch (fetchError) {
        setError(fetchError.message || 'Failed to fetch admin data');
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, [token]);

  const updateSkillCategory = (categoryIndex, field, value) => {
    setSkillCategories((current) => current.map((category, index) => (
      index === categoryIndex ? { ...category, [field]: value } : category
    )));
    setSkillsStatus('');
  };

  const updateSkill = (categoryIndex, skillIndex, field, value) => {
    setSkillCategories((current) => current.map((category, index) => {
      if (index !== categoryIndex) return category;

      return {
        ...category,
        skills: category.skills.map((skill, itemIndex) => (
          itemIndex === skillIndex ? {
            ...skill,
            [field]: field === 'level' && value !== ''
              ? Math.min(100, Math.max(0, Number(value) || 0))
              : value,
          } : skill
        )),
      };
    }));
    setSkillsStatus('');
  };

  const addSkill = (categoryIndex) => {
    setSkillCategories((current) => current.map((category, index) => (
      index === categoryIndex
        ? { ...category, skills: [...category.skills, { name: 'New skill', level: 85 }] }
        : category
    )));
    setSkillsStatus('');
  };

  const removeSkill = (categoryIndex, skillIndex) => {
    setSkillCategories((current) => current.map((category, index) => {
      if (index !== categoryIndex) return category;
      return {
        ...category,
        skills: category.skills.filter((_, itemIndex) => itemIndex !== skillIndex),
      };
    }));
    setSkillsStatus('');
  };

  const addSkillCategory = () => {
    setSkillCategories((current) => [
      ...current,
      { title: 'New Category', icon: 'BarChart3', skills: [{ name: 'New skill', level: 85 }] },
    ]);
    setSkillsStatus('');
  };

  const removeSkillCategory = (categoryIndex) => {
    setSkillCategories((current) => current.filter((_, index) => index !== categoryIndex));
    setSkillsStatus('');
  };

  const saveSkillCategories = async () => {
    setSkillsSaving(true);
    setSkillsStatus('');
    try {
      const response = await fetch(`${API_URL}/content`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          skillCategories: skillCategories.map((category) => ({
            ...category,
            skills: category.skills.map((skill) => ({
              ...skill,
              level: Math.min(100, Math.max(0, Number(skill.level) || 0)),
            })),
          })),
        }),
      });
      const content = await response.json().catch(() => null);
      if (!response.ok) throw new Error(content?.message || 'Failed to save skill categories');
      setSkillCategories(content.skillCategories || skillCategories);
      setSkillsStatus('Skills saved.');
    } catch (saveError) {
      setSkillsStatus(saveError.message || 'Failed to save skill categories');
    } finally {
      setSkillsSaving(false);
    }
  };

  const projectToDraft = (project) => ({
    title: project.title || '',
    description: project.description || '',
    image: project.image || '',
    category: project.category || 'Full Stack',
    features: Array.isArray(project.features) ? project.features.join(', ') : '',
    tech: Array.isArray(project.tech) ? project.tech.join(', ') : '',
    github: project.github || '',
    demo: project.demo || '',
    live: project.live || '',
  });

  const startProjectEdit = (project) => {
    setEditingProjectId(project._id || 'new');
    setProjectDraft(projectToDraft(project));
    setProjectStatus('');
  };

  const updateProjectDraft = (field, value) => {
    setProjectDraft((current) => ({ ...current, [field]: value }));
  };

  const saveProject = async (event) => {
    event.preventDefault();
    setProjectSaving(true);
    setProjectStatus('');
    const payload = {
      ...projectDraft,
      features: projectDraft.features.split(',').map((item) => item.trim()).filter(Boolean),
      tech: projectDraft.tech.split(',').map((item) => item.trim()).filter(Boolean),
    };
    try {
      const isNew = editingProjectId === 'new';
      const response = await fetch(`${API_URL}/projects${isNew ? '' : `/${editingProjectId}`}`, {
        method: isNew ? 'POST' : 'PUT',
        headers,
        body: JSON.stringify(payload),
      });
      const project = await response.json().catch(() => null);
      if (!response.ok) throw new Error(project?.message || 'Failed to save project');
      setProjects((current) => (isNew
        ? [project, ...current]
        : current.map((item) => item._id === project._id ? project : item)));
      setEditingProjectId(null);
      setProjectDraft(null);
      setProjectStatus(isNew ? 'Project added.' : 'Project changes saved.');
    } catch (saveError) {
      setProjectStatus(saveError.message || 'Failed to save project');
    } finally {
      setProjectSaving(false);
    }
  };

  const uploadProjectImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setProjectImageUploading(true);
    setProjectImageStatus('Uploading image…');
    const uploadForm = new FormData();
    uploadForm.append('image', file);
    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: { Authorization: token ? `Bearer ${token}` : '' },
        body: uploadForm,
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.message || 'Image upload failed');
      updateProjectDraft('image', data.url);
      setProjectImageStatus('Image uploaded. Save the project to keep it.');
    } catch (uploadError) {
      setProjectImageStatus(uploadError.message || 'Image upload failed');
    } finally {
      setProjectImageUploading(false);
      event.target.value = '';
    }
  };

  const updateAchievement = (index, field, value) => {
    setAchievements((current) => current.map((item, itemIndex) => (
      itemIndex === index ? { ...item, [field]: value } : item
    )));
    setAchievementsStatus('');
  };

  const addAchievement = () => {
    setAchievements((current) => [...current, { year: '', title: '', organization: '', details: '' }]);
    setAchievementsStatus('');
  };

  const saveAchievements = async () => {
    setAchievementsSaving(true);
    setAchievementsStatus('');
    try {
      const response = await fetch(`${API_URL}/content`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ achievements }),
      });
      const content = await response.json().catch(() => null);
      if (!response.ok) throw new Error(content?.message || 'Failed to save achievements');
      setAchievements(content.achievements || achievements);
      setAchievementsStatus('Achievements saved.');
    } catch (saveError) {
      setAchievementsStatus(saveError.message || 'Failed to save achievements');
    } finally {
      setAchievementsSaving(false);
    }
  };

  const updateTimelineItem = (index, field, value) => {
    setCareerTimeline((currentTimeline) => currentTimeline.map((item, itemIndex) => (
      itemIndex === index ? { ...item, [field]: value } : item
    )));
    setTimelineStatus('');
  };

  const addTimelineItem = () => {
    setCareerTimeline((currentTimeline) => [
      ...currentTimeline,
      { date: '', title: '', organization: '', details: '' },
    ]);
    setTimelineStatus('');
  };

  const removeTimelineItem = (index) => {
    setCareerTimeline((currentTimeline) => currentTimeline.filter((_, itemIndex) => itemIndex !== index));
    setTimelineStatus('');
  };

  const saveTimeline = async () => {
    setTimelineSaving(true);
    setTimelineStatus('');
    try {
      const response = await fetch(`${API_URL}/content`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ timeline: careerTimeline }),
      });
      const content = await response.json().catch(() => null);
      if (!response.ok) throw new Error(content?.message || 'Failed to save career timeline');
      setCareerTimeline(content.timeline || careerTimeline);
      setTimelineStatus('Career timeline saved.');
    } catch (saveError) {
      setTimelineStatus(saveError.message || 'Failed to save career timeline');
    } finally {
      setTimelineSaving(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    await fetch(`${API_URL}/messages/${id}`, { method: 'DELETE', headers });
    setMessages(messages.filter((message) => message._id !== id));
  };

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-glow backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
            <p className="mt-2 text-slate-400">Manage projects and incoming messages securely.</p>
          </div>
          <button onClick={logout} className="btn-secondary">Logout</button>
        </div>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-3xl border border-slate-700 p-6 shadow-xl lg:col-span-2">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Technical expertise</h2>
                <p className="mt-2 text-slate-400">Edit the skill groups and percentages shown in the portfolio.</p>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={addSkillCategory} className="btn-secondary">Add category</button>
                <button type="button" onClick={saveSkillCategories} disabled={skillsSaving} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
                  {skillsSaving ? 'Saving…' : 'Save skills'}
                </button>
              </div>
            </div>
            <div className="grid gap-6 xl:grid-cols-2">
              {skillCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="rounded-[2rem] border border-slate-700 bg-slate-950/60 p-6 shadow-xl">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/15 text-cyan-300 shadow-glow">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <div>
                        <input
                          value={category.title || ''}
                          onChange={(event) => updateSkillCategory(categoryIndex, 'title', event.target.value)}
                          className="w-full border-none bg-transparent text-3xl font-semibold text-white outline-none"
                        />
                        <p className="mt-1 text-sm text-slate-400">{category.skills.length} strong tools</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => removeSkillCategory(categoryIndex)} className="rounded-full border border-rose-500/80 p-2 text-rose-300 transition hover:bg-rose-500/10">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center gap-3">
                        <input
                          value={skill.name || ''}
                          onChange={(event) => updateSkill(categoryIndex, skillIndex, 'name', event.target.value)}
                          className="flex-1 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-base font-medium text-white outline-none transition focus:border-cyan-400"
                        />
                        <div className="flex w-28 items-center justify-end gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={skill.level ?? ''}
                            onChange={(event) => updateSkill(categoryIndex, skillIndex, 'level', event.target.value)}
                            className="w-12 bg-transparent text-right text-base font-medium text-white outline-none"
                          />
                          <span className="text-sm text-slate-400">%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <button type="button" onClick={() => addSkill(categoryIndex)} className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-500/60 bg-cyan-500/5 px-4 py-3 text-base font-medium text-cyan-300 transition hover:bg-cyan-500/10">
                      <Plus className="h-4 w-4" />
                      Add skill
                    </button>
                    {category.skills.length > 1 && (
                      <button type="button" onClick={() => removeSkill(categoryIndex, category.skills.length - 1)} className="rounded-full border border-rose-500/70 bg-rose-500/5 px-4 py-3 text-base font-medium text-rose-300 transition hover:bg-rose-500/10">
                        Remove last
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {skillsStatus && <p className={`mt-4 text-sm ${skillsStatus.includes('saved') ? 'text-emerald-400' : 'text-rose-400'}`}>{skillsStatus}</p>}
          </div>
          <div className="glass rounded-3xl border border-slate-700 p-6 shadow-xl lg:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Career Timeline</h2>
                <p className="mt-2 text-slate-400">Update the experience and education shown on your portfolio.</p>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={addTimelineItem} className="btn-secondary">Add entry</button>
                <button type="button" onClick={saveTimeline} disabled={timelineSaving} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
                  {timelineSaving ? 'Saving…' : 'Save timeline'}
                </button>
              </div>
            </div>
            <div className="mt-6 space-y-5">
              {careerTimeline.map((item, index) => (
                <div key={item._id || index} className="rounded-3xl border border-slate-700 bg-slate-950/70 p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="font-semibold text-white">Entry {index + 1}</p>
                    <button type="button" onClick={() => removeTimelineItem(index)} className="rounded-full border border-rose-500 px-3 py-1 text-rose-300 transition hover:bg-rose-500/10">Delete</button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      ['date', 'Date'],
                      ['title', 'Title'],
                      ['organization', 'Organization'],
                    ].map(([field, label]) => (
                      <label key={field} className="block text-sm text-slate-300">
                        {label}
                        <input
                          value={item[field] || ''}
                          onChange={(event) => updateTimelineItem(index, field, event.target.value)}
                          className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                        />
                      </label>
                    ))}
                  </div>
                  <label className="mt-4 block text-sm text-slate-300">
                    Details
                    <textarea
                      value={item.details || ''}
                      onChange={(event) => updateTimelineItem(index, 'details', event.target.value)}
                      rows="3"
                      className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                    />
                  </label>
                </div>
              ))}
            </div>
            {timelineStatus && <p className={`mt-4 text-sm ${timelineStatus.includes('saved') ? 'text-emerald-400' : 'text-rose-400'}`}>{timelineStatus}</p>}
          </div>

          <div className="glass rounded-3xl border border-slate-700 p-6 shadow-xl lg:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Achievements</h2>
                <p className="mt-2 text-slate-400">Manage awards, qualifications, and other recognition shown in its own portfolio section.</p>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={addAchievement} className="btn-secondary">Add achievement</button>
                <button type="button" onClick={saveAchievements} disabled={achievementsSaving} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
                  {achievementsSaving ? 'Saving…' : 'Save achievements'}
                </button>
              </div>
            </div>
            <div className="mt-6 space-y-5">
              {achievements.map((item, index) => (
                <div key={item._id || index} className="rounded-3xl border border-slate-700 bg-slate-950/70 p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="font-semibold text-white">Achievement {index + 1}</p>
                    <button type="button" onClick={() => setAchievements((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="rounded-full border border-rose-500 px-3 py-1 text-rose-300 transition hover:bg-rose-500/10">Delete</button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      ['year', 'Year'],
                      ['title', 'Achievement'],
                      ['organization', 'Organization'],
                    ].map(([field, label]) => (
                      <label key={field} className="block text-sm text-slate-300">
                        {label}
                        <input value={item[field] || ''} onChange={(event) => updateAchievement(index, field, event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400" />
                      </label>
                    ))}
                  </div>
                  <label className="mt-4 block text-sm text-slate-300">
                    Details
                    <textarea value={item.details || ''} onChange={(event) => updateAchievement(index, 'details', event.target.value)} rows="2" className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400" />
                  </label>
                </div>
              ))}
            </div>
            {achievementsStatus && <p className={`mt-4 text-sm ${achievementsStatus.includes('saved') ? 'text-emerald-400' : 'text-rose-400'}`}>{achievementsStatus}</p>}
          </div>

          <div className="glass rounded-3xl border border-slate-700 p-6 shadow-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Project Management</h2>
                <p className="mt-2 text-slate-400">Add and edit the projects shown on your portfolio.</p>
              </div>
              <button type="button" onClick={() => startProjectEdit({})} className="btn-primary">Add project</button>
            </div>
            {projectStatus && <p className={`mt-4 text-sm ${projectStatus.includes('saved') || projectStatus.includes('added') ? 'text-emerald-400' : 'text-rose-400'}`}>{projectStatus}</p>}
            {projectDraft && (
              <form onSubmit={saveProject} className="mt-6 space-y-4 rounded-3xl border border-cyan-500/30 bg-slate-950/80 p-5">
                <h3 className="font-semibold text-white">{editingProjectId === 'new' ? 'New project' : 'Edit project'}</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ['title', 'Project title'],
                    ['category', 'Category'],
                    ['image', 'Image URL or path'],
                    ['tech', 'Technologies (comma separated)'],
                    ['github', 'GitHub URL'],
                    ['demo', 'Demo URL'],
                    ['live', 'Live application URL'],
                  ].map(([field, label]) => (
                    <label key={field} className="block text-sm text-slate-300">
                      {label}
                      <input
                        value={projectDraft[field]}
                        onChange={(event) => updateProjectDraft(field, event.target.value)}
                        required={['title', 'category', 'image'].includes(field)}
                        className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                      />
                    </label>
                  ))}
                </div>
                <label className="block text-sm text-slate-300">
                  Upload project image (JPG, PNG, GIF, WebP, AVIF; max 8 MB)
                  <input type="file" accept="image/jpeg,image/png,image/gif,image/webp,image/avif" onChange={uploadProjectImage} disabled={projectImageUploading} className="mt-2 block w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500/15 file:px-4 file:py-2 file:text-cyan-300" />
                </label>
                {projectImageStatus && <p className={`text-sm ${projectImageStatus.startsWith('Image uploaded') ? 'text-emerald-400' : projectImageStatus === 'Uploading image…' ? 'text-slate-400' : 'text-rose-400'}`}>{projectImageStatus}</p>}
                {projectDraft.image && <img src={projectDraft.image} alt="Project preview" className="h-40 w-full rounded-2xl border border-slate-700 object-cover sm:max-w-sm" />}
                <label className="block text-sm text-slate-300">
                  Description
                  <textarea value={projectDraft.description} onChange={(event) => updateProjectDraft('description', event.target.value)} required rows="3" className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400" />
                </label>
                <label className="block text-sm text-slate-300">
                  Features (comma separated)
                  <textarea value={projectDraft.features} onChange={(event) => updateProjectDraft('features', event.target.value)} rows="2" className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400" />
                </label>
                <div className="flex flex-wrap gap-3">
                  <button type="submit" disabled={projectSaving} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">{projectSaving ? 'Saving…' : 'Save project'}</button>
                  <button type="button" onClick={() => { setProjectDraft(null); setEditingProjectId(null); }} className="btn-secondary">Cancel</button>
                </div>
              </form>
            )}
            <div className="mt-6 space-y-4">
              {loading ? (
                <p className="text-slate-400">Loading projects…</p>
              ) : (
                projects.map((project) => (
                  <div key={project._id} className="rounded-3xl border border-slate-700 bg-slate-950/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-white">{project.title}</h3>
                        <p className="text-sm text-slate-400">{project.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => startProjectEdit(project)}
                          className="rounded-full border border-cyan-500 px-3 py-1 text-cyan-300 transition hover:bg-cyan-500/10"
                        >
                          Edit
                        </button>
                      <button
                        onClick={async () => {
                          const response = await fetch(`${API_URL}/projects/${project._id}`, {
                            method: 'DELETE',
                            headers,
                          });
                          if (!response.ok) {
                            setProjectStatus('Failed to delete project.');
                            return;
                          }
                          setProjects(projects.filter((item) => item._id !== project._id));
                        }}
                        className="rounded-full border border-rose-500 px-3 py-1 text-rose-300 transition hover:bg-rose-500/10"
                      >
                        Delete
                      </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass rounded-3xl border border-slate-700 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white">Messages</h2>
            <p className="mt-2 text-slate-400">Review contact submissions from your portfolio visitors.</p>
            <div className="mt-6 space-y-3">
              {loading ? (
                <p className="text-slate-400">Loading messages…</p>
              ) : messages.length === 0 ? (
                <p className="text-slate-400">No messages yet.</p>
              ) : (
                messages.map((message) => (
                  <div key={message._id} className="rounded-3xl border border-slate-700 bg-slate-950/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{message.name}</p>
                        <p className="text-sm text-slate-400">{message.email}</p>
                      </div>
                      <button onClick={() => handleDeleteMessage(message._id)} className="rounded-full border border-rose-500 px-3 py-1 text-rose-300 hover:bg-rose-500/10">Delete</button>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{message.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminPage;
