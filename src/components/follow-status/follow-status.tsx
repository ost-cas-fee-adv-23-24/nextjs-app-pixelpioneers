'use client';

import {
    Button,
    ButtonSize,
    IconCancel,
    Label,
    LabelSize,
    Variant,
} from '@ost-cas-fee-adv-23-24/design-system-pixelpioneers';

export default function FollowStatus() {
    return (
        <div className="flex flex-row items-center gap-x-xs">
            <Label
                size={LabelSize.M}
                title={'Vorname Nachname'}
                aria-label={'Vorname Nachname'}
                className="pr-m text-slate-400"
            >
                Du folgst: Vorname Nachname
            </Label>
            <Button
                type="button"
                Icon={IconCancel}
                size={ButtonSize.M}
                variant={Variant.SECONDARY}
                label="Unfollow"
            />
        </div>
    );
}
