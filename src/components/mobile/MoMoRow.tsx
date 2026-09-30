import React from 'react';
import { SmartphoneIcon } from 'lucide-react';
import { customer } from '../../data/customer';

export function MoMoRow() {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-2xl bg-canvas p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-bright text-ink">
        <SmartphoneIcon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="flex-1 text-sm">
        <p className="font-bold text-ink">Pay with MTN MoMo</p>
        <p className="num text-muted">{customer.phone}</p>
      </div>
    </div>);

}