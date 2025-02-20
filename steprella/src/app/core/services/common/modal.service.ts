import { Injectable, Type, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private state = signal<ModalState>({
        isOpen: false,
        title: '',
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
            title: config.title,
            component: config.component,
            config: {
                width: config.width || ModalWidth.MD,
                height: config.height,
                onClose: config.onClose
            },
            data: config.data
        });
    }

    close(result?: any) {
        const currentState = this.state();
        
        if (currentState.config?.onClose) {
            currentState.config.onClose(result);
        }

        this.state.set({
            isOpen: false,
            title: '',
            config: {
                width: ModalWidth.MD,
                height: 'tw-h-auto'
            }
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
    title: string;
    width?: string;
    height?: string;
    data?: R;
    onClose?: (result?: any) => void;
}

export interface ModalState {
    isOpen: boolean;
    title: string;
    component?: Type<any>;
    config: Partial<ModalConfig>;
    data?: any;
}
