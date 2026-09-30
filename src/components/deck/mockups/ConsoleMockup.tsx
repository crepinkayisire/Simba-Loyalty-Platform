import React from 'react';
import { SearchIcon } from 'lucide-react';
import { SimbaWordmark } from '../SimbaWordmark';
import { consoleNav, recentTransactions, topItems } from '../../../data/deck/platform';

const KPIS = [
{ label: 'Card balance', value: 'RWF 48,500' },
{ label: 'Simba+ points', value: '3,175' },
{ label: 'Lifetime spend', value: 'RWF 4.2M' },
{ label: 'Visits · 90 days', value: '18' }];


const SPEND = [
{ month: 'Apr', value: 58 },
{ month: 'May', value: 64 },
{ month: 'Jun', value: 71 },
{ month: 'Jul', value: 66 },
{ month: 'Aug', value: 82 },
{ month: 'Sep', value: 94 }];


export function ConsoleMockup() {
  return (
    <div className="deck-ui flex h-full w-full flex-col overflow-hidden rounded-[1vw] border border-line bg-white text-[0.82vw] shadow-[0_3vh_6vh_-3vh_rgba(28,23,20,0.35)]">
      <div className="flex h-[3.6vh] shrink-0 items-center gap-[0.45vw] border-b border-line bg-cream px-[1vw]">
        <span className="h-[0.6vw] w-[0.6vw] rounded-full bg-line" />
        <span className="h-[0.6vw] w-[0.6vw] rounded-full bg-line" />
        <span className="h-[0.6vw] w-[0.6vw] rounded-full bg-line" />
        <span className="ml-[1.4vw] rounded-full bg-white px-[1vw] py-[0.2vh] text-[0.75vw] text-muted">console.simbaplus.rw</span>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[10.5vw] shrink-0 flex-col border-r border-line bg-white px-[0.8vw] py-[2.2vh]">
          <div className="flex items-baseline gap-[0.4vw] px-[0.5vw]">
            <SimbaWordmark className="text-[1.15vw]" />
            <span className="text-[0.75vw] text-muted">Console</span>
          </div>
          <nav className="mt-[3vh] flex flex-col gap-[0.4vh]">
            {consoleNav.map(({ label, icon: Icon }) => {
              const active = label === 'Customers';
              return (
                <div
                  key={label}
                  className={`flex items-center gap-[0.6vw] rounded-[0.5vw] px-[0.6vw] py-[1vh] ${
                  active ? 'bg-simba-soft font-semibold text-simba' : 'text-muted'}`
                  }>
                  
                  <Icon className="h-[1vw] w-[1vw]" strokeWidth={1.9} />
                  <span>{label}</span>
                </div>);

            })}
          </nav>
          <div className="mt-auto border-t border-line px-[0.5vw] pt-[1.6vh] text-[0.75vw] text-muted">Powered by Kayko</div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-[1.6vh] bg-canvas p-[1.3vw]">
          <div className="flex items-center justify-between">
            <p className="text-muted">
              Customers / <span className="font-semibold text-ink">Joseph Mutabazi</span>
            </p>
            <span className="flex items-center gap-[0.4vw] rounded-full border border-line bg-white px-[0.9vw] py-[0.5vh] text-muted">
              <SearchIcon className="h-[0.85vw] w-[0.85vw]" /> Search customers
            </span>
          </div>

          <div className="flex items-center justify-between rounded-[0.8vw] bg-white px-[1.1vw] py-[1.5vh]">
            <div className="flex items-center gap-[0.9vw]">
              <span className="flex h-[2.8vw] w-[2.8vw] items-center justify-center rounded-full bg-[#E6B34A] font-display text-[1vw] font-bold">JM</span>
              <div>
                <p className="font-display text-[1.25vw] font-bold leading-tight">Joseph Mutabazi</p>
                <p className="text-muted">
                  <span className="font-semibold text-gold">Simba+ Gold</span> · Active · Customer since Mar 2024
                </p>
              </div>
            </div>
            <div className="flex gap-[0.5vw]">
              <span className="rounded-[0.5vw] border border-line px-[0.9vw] py-[0.8vh] font-semibold">Adjust points</span>
              <span className="rounded-[0.5vw] bg-simba px-[0.9vw] py-[0.8vh] font-semibold text-white">Change membership</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-[0.7vw]">
            {KPIS.map((k) =>
            <div key={k.label} className="rounded-[0.8vw] bg-white px-[1vw] py-[1.3vh]">
                <p className="text-muted">{k.label}</p>
                <p className="tnum mt-[0.4vh] font-display text-[1.3vw] font-bold">{k.value}</p>
              </div>
            )}
          </div>

          <div className="grid min-h-0 grid-cols-[1.1fr_1fr] gap-[0.7vw]">
            <div className="rounded-[0.8vw] bg-white px-[1.1vw] py-[1.5vh]">
              <p className="font-semibold">Shopping habits · top items</p>
              <ul className="mt-[1.1vh] flex flex-col gap-[0.9vh]">
                {topItems.map((item) =>
                <li key={item.name} className="grid grid-cols-[8.5vw_1fr_2.4vw] items-center gap-[0.6vw]">
                    <span className="truncate">{item.name}</span>
                    <span className="h-[0.8vh] rounded-full bg-cream">
                      <span className="block h-full rounded-full bg-simba" style={{ width: `${item.share}%` }} />
                    </span>
                    <span className="tnum text-right text-muted">{item.share}%</span>
                  </li>
                )}
              </ul>
            </div>
            <div className="rounded-[0.8vw] bg-white px-[1.1vw] py-[1.5vh]">
              <p className="font-semibold">Spending, last 6 months</p>
              <ul className="mt-[1.1vh] flex flex-col gap-[0.7vh]">
                {SPEND.map((s) =>
                <li key={s.month} className="grid grid-cols-[2.2vw_1fr] items-center gap-[0.5vw]">
                    <span className="text-muted">{s.month}</span>
                    <span className="h-[1.3vh] rounded-[0.3vw] bg-gold-bright" style={{ width: `${s.value}%` }} />
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="rounded-[0.8vw] bg-white px-[1.1vw] py-[1.3vh]">
            <p className="font-semibold">Transaction history</p>
            <div className="mt-[0.8vh] grid grid-cols-[4vw_1fr_7vw_6.5vw_4vw] gap-[0.6vw] border-b border-line pb-[0.6vh] text-muted">
              <span>Date</span>
              <span>Store / Partner</span>
              <span>Type</span>
              <span className="text-right">Amount</span>
              <span className="text-right">Points</span>
            </div>
            {recentTransactions.map((t) =>
            <div key={t.date} className="tnum grid grid-cols-[4vw_1fr_7vw_6.5vw_4vw] gap-[0.6vw] border-b border-line py-[0.7vh] last:border-0">
                <span className="text-muted">{t.date}</span>
                <span className="font-medium">{t.store}</span>
                <span className="text-muted">{t.type}</span>
                <span className="text-right">{t.amount}</span>
                <span className="text-right font-semibold text-simba">{t.points}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}