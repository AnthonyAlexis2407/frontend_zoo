import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'animales',
    renderMode: RenderMode.Server
  },
  {
    path: 'animales/nuevo',
    renderMode: RenderMode.Server
  },
  {
    path: 'animales/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'animales/:id/editar',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
