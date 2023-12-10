import * as React from 'react';

interface NavigationParams {
  [key: string]: any;
}

export const navigationRef: React.RefObject<any> = React.createRef();

export function navigate(name: string, params?: NavigationParams): void {
  navigationRef.current?.navigate(name, params);
}

export function reset(): void {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });
}

export function resetLogin(): void {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: 'Dashboard' }],
  });
}
