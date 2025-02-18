import { Injectable, Type, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private state = signal<ModalState>({
        isOpen: false,
        config: {
            width: ModalWidth.MD,
            height: 'tw-h-auto'
        }
    });

    get modalState() {
        return this.state;
    }

    open<T, R = any>(config: ModalConfig<T, R>) {
        this.state.set({
            isOpen: true,
            component: config.component,
            config: {
                width: config.width || ModalWidth.MD,
                height: config.height,
            },
            data: config.data
        });
    }

    close(result?: any) {
        const currentState = this.state();
        if (currentState.config.onClose) {
            currentState.config.onClose(result);
        }

        this.state.set({
            ...currentState,
            isOpen: false
        });
    }
}

export enum ModalWidth {
    SM = 'tw-w-[500px]',
    MD = 'tw-w-[800px]',
    LG = 'tw-w-[1200px]',
    XL = 'tw-w-[1600px]'
}

export interface ModalConfig<T = any, R = any> {
    component: Type<T>;
    width?: string;
    height?: string;
    data?: R;
    onClose?: (result?: any) => void;
}

export interface ModalState {
    isOpen: boolean;
    component?: Type<any>;
    config: Partial<ModalConfig>;
    data?: any;
}
