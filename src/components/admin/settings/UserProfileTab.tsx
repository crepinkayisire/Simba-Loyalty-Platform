import React, { useState } from 'react';
import { CircleCheckIcon, KeyRoundIcon } from 'lucide-react';
import { Panel } from '../Panel';
import { languages } from '../../../data/admin/customers';
import { initials } from '../../../utils/format';
import { buttonPrimary, buttonSecondary, inputClass, labelClass } from '../../../utils/styles';

interface Profile {
  name: string;
  email: string;
  phone: string;
  title: string;
  language: string;
}

const seed: Profile = { name: 'Diane Mutesi', email: 'diane.mutesi@simba.rw', phone: '+250 788 300 114', title: 'Loyalty Manager', language: 'English' };

/** The signed-in staff member's own details and password. */
export function UserProfileTab() {
  const [saved, setSaved] = useState<Profile>(seed);
  const [draft, setDraft] = useState<Profile>(seed);
  const [notice, setNotice] = useState<string | null>(null);
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  const pwOk = pw.current.length > 0 && pw.next.length >= 8 && pw.next === pw.confirm;

  const field = (key: keyof Profile, label: string, type = 'text') =>
  <div>
      <label htmlFor={`profile-${key}`} className={labelClass}>
        {label}
      </label>
      {key === 'language' ?
    <select id="profile-language" value={draft.language} onChange={(e) => setDraft({ ...draft, language: e.target.value })} className={inputClass}>
          {languages.map((l) =>
      <option key={l}>{l}</option>
      )}
        </select> :

    <input id={`profile-${key}`} type={type} value={draft[key]} onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} className={inputClass} />
    }
    </div>;


  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
      <Panel title="Your profile" subtitle="How you appear in the audit log and to your team">
        <div className="mb-5 flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-lg font-extrabold text-white">{initials(draft.name || '?')}</span>
          <div>
            <p className="font-extrabold text-ink">{saved.name}</p>
            <p className="text-sm text-muted">{saved.title} · All stores</p>
          </div>
        </div>
        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(draft);
            setNotice('Profile saved.');
          }}>
          
          {field('name', 'Full name')}
          {field('title', 'Job title')}
          {field('email', 'Email', 'email')}
          {field('phone', 'Phone', 'tel')}
          {field('language', 'Console language')}
          <div className="flex items-end justify-end gap-2 md:col-span-2">
            {notice && !dirty &&
            <span role="status" className="mr-auto flex items-center gap-1.5 text-sm font-bold text-leaf">
                <CircleCheckIcon className="h-4 w-4" aria-hidden="true" /> {notice}
              </span>
            }
            <button type="button" disabled={!dirty} onClick={() => setDraft(saved)} className={`${buttonSecondary} disabled:opacity-50`}>
              Discard
            </button>
            <button type="submit" disabled={!dirty} className={`${buttonPrimary} disabled:cursor-not-allowed disabled:opacity-50`}>
              Save profile
            </button>
          </div>
        </form>
      </Panel>

      <Panel title="Password" subtitle="Last changed Aug 2, 2026">
        {showPw ?
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!pwOk) return;
            setShowPw(false);
            setPw({ current: '', next: '', confirm: '' });
            setNotice('Password changed.');
          }}>
          
            {(['current', 'next', 'confirm'] as const).map((k) =>
          <div key={k}>
                <label htmlFor={`pw-${k}`} className={labelClass}>
                  {k === 'current' ? 'Current password' : k === 'next' ? 'New password' : 'Confirm new password'}
                </label>
                <input id={`pw-${k}`} type="password" value={pw[k]} onChange={(e) => setPw({ ...pw, [k]: e.target.value })} className={inputClass} />
              </div>
          )}
            {pw.next && pw.next.length < 8 && <p className="text-xs font-semibold text-simba-dark">At least 8 characters</p>}
            {pw.confirm && pw.next !== pw.confirm && <p className="text-xs font-semibold text-simba-dark">Passwords don't match</p>}
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowPw(false)} className={buttonSecondary}>
                Cancel
              </button>
              <button type="submit" disabled={!pwOk} className={`${buttonPrimary} disabled:cursor-not-allowed disabled:opacity-50`}>
                Update password
              </button>
            </div>
          </form> :

        <button type="button" onClick={() => setShowPw(true)} className={buttonSecondary}>
            <KeyRoundIcon className="h-4 w-4" aria-hidden="true" />
            Change password
          </button>
        }
      </Panel>
    </div>);

}