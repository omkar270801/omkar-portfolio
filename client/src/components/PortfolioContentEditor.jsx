import { useEffect, useState } from 'react';
import { API_URL } from '../config/api';
import { portfolioContentDefaults } from '../data/portfolioData';
import { usePortfolioContent } from './PortfolioContentProvider';

const editableSections = Object.keys(portfolioContentDefaults);

function PortfolioContentEditor({ headers }) {
  const { content, updateContent, isLoading } = usePortfolioContent();
  const [draft, setDraft] = useState(() => JSON.stringify(portfolioContentDefaults, null, 2));
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isLoading) {
      setDraft(JSON.stringify(
        Object.fromEntries(editableSections.map((section) => [section, content[section]])),
        null,
        2,
      ));
    }
  }, [content, isLoading]);

  const saveContent = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus('');

    try {
      let updated;
      try {
        updated = JSON.parse(draft);
      } catch {
        throw new Error('Content must be valid JSON. Check the formatting and try again.');
      }

      if (!updated || typeof updated !== 'object' || Array.isArray(updated)) {
        throw new Error('Content must be a JSON object.');
      }

      for (const section of editableSections) {
        const expected = portfolioContentDefaults[section];
        const value = updated[section];
        if (
          value === undefined ||
          value === null ||
          typeof value !== 'object' ||
          Array.isArray(value) !== Array.isArray(expected)
        ) {
          throw new Error(`The "${section}" section must be ${Array.isArray(expected) ? 'an array' : 'an object'}.`);
        }
      }

      const response = await fetch(`${API_URL}/content`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updated),
      });
      const saved = await response.json().catch(() => null);
      if (!response.ok) throw new Error(saved?.message || 'Failed to save portfolio content');

      updateContent(updated);
      setDraft(JSON.stringify(updated, null, 2));
      setStatus('Portfolio content saved.');
    } catch (saveError) {
      setStatus(saveError.message || 'Failed to save portfolio content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="glass rounded-3xl border border-slate-700 p-6 shadow-xl">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-white">Portfolio Content</h2>
        <p className="mt-2 text-slate-400">
          Edit the hero, about, skills, section headings, navigation, contact details, and footer below.
          Projects, career timeline, and achievements have their own editors.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Keep the JSON valid. You can change text, links, reorder items, or add and remove list entries.
        </p>
      </div>
      <form onSubmit={saveContent}>
        <label className="sr-only" htmlFor="portfolio-content-json">Portfolio content JSON</label>
        <textarea
          id="portfolio-content-json"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            setStatus('');
          }}
          disabled={isLoading || saving}
          rows="28"
          spellCheck="false"
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 font-mono text-sm text-white outline-none transition focus:border-cyan-400 disabled:opacity-60"
        />
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button type="submit" disabled={isLoading || saving} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
            {isLoading ? 'Loading content…' : saving ? 'Saving…' : 'Save portfolio content'}
          </button>
          {status && <p role="status" className={`text-sm ${status.includes('saved') ? 'text-emerald-400' : 'text-rose-400'}`}>{status}</p>}
        </div>
      </form>
    </section>
  );
}

export default PortfolioContentEditor;
