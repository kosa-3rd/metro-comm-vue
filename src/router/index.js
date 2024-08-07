import { createWebHistory, createRouter } from 'vue-router';
import contentRoute from './content-route';

const routes = [...contentRoute];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
